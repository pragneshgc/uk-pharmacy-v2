<?php

namespace App\Library;

use App\Library\Order;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Class that handles Prescription Pool DB operations
 */
class PrescriptionPool
{
    /**
     * Get prescription Pool Orders
     *
     * @return \Illuminate\Support\Collection
     */
    public function getOrders()
    {
        $this->cleanPool(); //for some reason, every so often, an order gets stuck in the pool, even though it's status changed

        $items = [];

        $orders = DB::table('DispenserPool as d')
            ->select(['d.*', 'u.name', 'u.surname', 'p.DeliveryID', 'p.ClientID', 'p.PaymentMethod', 'p.JVM'])
            ->leftJoin('PharmacyUser as u', 'd.UserID', '=', 'u.esa_user_id')
            ->leftJoin('Prescription AS p', 'p.PrescriptionID', '=', 'd.PrescriptionID')
            ->groupBy('d.PrescriptionID')
            ->get();

        foreach ($orders as $item) {
            array_push($items, $item->PrescriptionID);
        }

        $products = DB::table('Product')
            ->select(['Product.PrescriptionID', 'ProductCode.JVM'])
            ->leftJoin('ProductCode', 'Product.Code', '=', 'ProductCode.Code')
            ->groupBy('Product.ProductID')
            ->whereIn('PrescriptionID', $items)
            ->get();

        $orders->transform(function ($item) use ($products) {
            foreach ($products as $product) {
                if ($item->PrescriptionID == $product->PrescriptionID) {
                    if ($product->JVM == 1) {
                        $item->JVM = 1;
                    } else if ($product->JVM == 2) {
                        $item->JVM = 0;
                    }
                }
            }

            return $item;
        });

        return $orders;
    }

    /**
     * Clean the dispenser pool from orders that are not in status approved
     *
     */
    public function cleanPool()
    {
        return DB::table('DispenserPool')->leftJoin('Prescription', 'Prescription.PrescriptionID', '=', 'DispenserPool.PrescriptionID')
            ->where('Prescription.Status', '!=', '2')->delete();
    }

    /**
     * Undocumented function
     *
     */
    public function getDispensers()
    {
        return DB::table('PharmacyUser AS u')
            ->select(['u.*'])
            ->selectRaw('COALESCE(COUNT(d.UserID), 0) AS count')
            ->leftJoin('DispenserPool as d', 'd.UserID', '=', 'u.esa_user_id')
            ->where('Role', 20)->groupBy('u.id')->whereNull('deleted_at')->get();
    }

    /**
     * Undocumented function
     *
     * @param array $input
     */
    public function allocate($input): int|false
    {
        $user = Auth::user();

        if ($input['userID']) {
            return DB::table('DispenserPool')->where('UserID', $input['userID'])->update([
                'UserID' => $user->esa_user_id
            ]);
        } else if ($input['deliveryID']) {
            $query = DB::table('DispenserPool AS d')->where('d.UserID', 0)
                ->leftJoin('Prescription AS p', 'p.PrescriptionID', '=', 'd.PrescriptionID');

            switch ($input['deliveryID']) {
                case 'rml':
                    $query = $query->where('p.DeliveryID', 5) /*->where('p.ClientID', '!=', 51)*/;
                    break;
                case 'dpd':
                    $query = $query->where('p.DeliveryID', 4) /*->where('p.ClientID', '!=', 51)*/;
                    break;
                case 'ups':
                    $query = $query->whereRaw("(p.DeliveryID = 7 AND p.PaymentMethod = 0)") /*->where('p.ClientID', '!=', 51)*/;
                    break;
                case 'upscod':
                    $query = $query->whereRaw("(p.DeliveryID = 7 AND p.PaymentMethod != 0)") /*->where('p.ClientID', '!=', 51)*/;
                    break;
                case 'dhl':
                    $query = $query->where('p.DeliveryID', 10) /*->where('p.ClientID', '!=', 51)*/;
                    break;
                case 'eveadam':
                    $query = $query->where('p.ClientID', 51)
                        ->whereRaw("((p.JVM = 0 AND pc.JVM = 0) OR (pc.JVM = 2 AND p.JVM = 0))")
                        ->leftJoin('Product AS pr', 'pr.PrescriptionID', '=', 'd.PrescriptionID')
                        ->leftJoin('ProductCode AS pc', 'pr.Code', '=', 'pc.Code');
                    break;
                case 'jvm':
                    $query = $query
                        ->leftJoin('Product AS pr', 'pr.PrescriptionID', '=', 'd.PrescriptionID')
                        ->leftJoin('ProductCode AS pc', 'pr.Code', '=', 'pc.Code')
                        ->whereRaw("((p.JVM = 0 AND pc.JVM = 1) OR (p.JVM = 1 AND pc.JVM = 0) OR (p.JVM = 1 AND pc.JVM = 1)) AND pc.JVM != 2 AND p.ClientID = 51");
                    break;
                default:
                    # code...
                    break;
            }

            $array = $query->groupBy("d.DispenserPoolID")
                ->limit(15)
                ->orderBy('DispenserPoolID', 'ASC')
                ->pluck('d.DispenserPoolID')
                ->toArray();

            return DB::table('DispenserPool')->whereIn('DispenserPoolID', $array)
                ->update([
                    'UserID' => $user->esa_user_id
                ]);
        } else if ($input['orderID']) {
            return DB::table('DispenserPool')->where('DispenserPoolID', $input['orderID'])
                ->update([
                    'UserID' => $user->esa_user_id
                ]);
        } else {
            return false;
        }
    }

    /**
     * Release orders from the pharmacist pool
     *
     */
    public function release($input)
    {
        if ($input['userID']) {
            return DB::table('DispenserPool')->where('UserID', $input['userID'])
                ->update([
                    'UserID' => 0
                ]);
        } else if ($input['dispenserPoolID']) {
            return DB::table('DispenserPool')->where('DispenserPoolID', $input['dispenserPoolID'])
                ->update([
                    'UserID' => 0
                ]);
        } else if ($input['all']) {
            return DB::table('DispenserPool')->update([
                'UserID' => 0
            ]);
        } else {
            return false;
        }
    }

    public function getOrdersDetailed($ids)
    {
        $order = new Order;

        $data = DB::table('Prescription AS p')
            ->selectRaw("p.PrescriptionID, p.ReferenceNumber, p.Sex, p.DOB, p.BMI, cl.CompanyName, p.ClientID")
            ->selectRaw("CONCAT('<b>', p.PrescriptionID, '</b>', ' (', p.ReferenceNumber, ')') AS ReferenceID")
            ->selectRaw("CONCAT('<b>',p.Name, ' ', p.Surname, '</b>') AS 'Patient Name'")
            ->selectRaw("CONCAT(COALESCE(p.DAddress1, ''), ' ', COALESCE(p.DAddress2,''), ' ', COALESCE(p.DAddress3, ''), ' ', COALESCE(p.DAddress4, ''),
        '<br>', COALESCE(p.DPostcode,''),', ' , c.Name) AS 'Patient Address'")
            ->selectRaw("CONCAT('<b>',do.Name, ' ', do.Surname, '</b> (<i>',
        CASE WHEN DoctorType = 1 THEN 'GMC: ' WHEN DoctorType = 2 THEN 'EU: ' WHEN DoctorType = 3 THEN 'GPHC:' WHEN DoctorType = 4 THEN 'Test: '  WHEN DoctorType = 5 THEN 'IMC: ' ELSE 'Not Set: ' END,
        '</i>',COALESCE(do.GMCNO,''), ')') AS 'Prescriber'")
            ->selectRaw("(YEAR(CURDATE())-YEAR(STR_TO_DATE(REPLACE(DOB,'/',','),'%d,%m,%Y'))) - (RIGHT(CURDATE(),5)<RIGHT(STR_TO_DATE(REPLACE(DOB,'/',','),'%d,%m,%Y'),5)) AS Age")
            ->leftJoin('DoctorAddress as do', 'do.DoctorAddressID', '=', 'p.DoctorAddressID')
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'p.DCountryCode')
            ->leftJoin('Country AS c2', 'c2.CountryID', '=', 'do.CountryID')
            ->leftJoin('Client AS cl', 'cl.ClientID', '=', 'p.ClientID')
            ->whereIn('p.PrescriptionID', $ids)
            ->orderBy('p.UpdatedDate', 'DESC')
            ->get();

        //get id's and references of items
        $items = [];

        foreach ($data as $item) {
            array_push($items, $item->PrescriptionID);
        }

        $products = $order->products($items, true, true);

        foreach ($data as $item) {
            // $item->Products = [];
            $item->ShortProducts = [];
            $item->Products = [];

            foreach ($products as $product) {
                if ($product->PrescriptionID == $item->PrescriptionID) {
                    // $name = $order->setupProductString($product, true);
                    // array_push($item->Products, $name);
                    $shortName = $order->setupProductString($product, false);
                    $product->ShortName = $shortName;
                    array_push($item->ShortProducts, $shortName);
                    array_push($item->Products, $product);
                }
            }
        }

        $sortedData = [];

        foreach ($ids as $id) {
            foreach ($data as $item) {
                if ($item->PrescriptionID == $id) {
                    array_push($sortedData, $item);
                }
            }
        }

        return $sortedData;
    }
}
