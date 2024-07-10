<?php

namespace App\Library;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Tray class
 */
class Tray
{
    /**
     * @var array<mixed,string> $orderStatuses
     */
    private array $orderStatuses = [
        '1' => 'NEW',
        '2' => 'APPROVED',
        '4' => 'QUERIED',
        '3' => 'REJECTED',
        '5' => 'POSTPONED',
        '6' => 'CANCELLED',
        '7' => 'AWAITINGSHIPPED',
        '8' => 'SHIPPED',
        '9' => 'SAFETYCHECK',
        '10' => 'ONHOLD',
        '11' => 'CALL',
        '12' => 'QUERIEDDISPENSED',
        '13' => 'QUERIEDNOTDISPENSED',
        '14' => 'QUERIEDNOREPLY',
        '15' => 'QUERIEDARCHIVED'
    ];

    /**
     * Get user tray, depending on the user id set
     * If no user id set get the currently authenticated user
     *
     * @param mixed $id
     * @return \Illuminate\Support\Collection
     */
    public function getTray($id = false)
    {
        $user = Auth::user();

        if (!$id) {
            $id = $user->id;
        }

        $type = 1;

        if ($user->role == 20 || $user->role == 19) {
            $type = 2;
        }

        if ($id == 'new') {
            $data = DB::table('Prescription')
                ->select([
                    'Prescription.PrescriptionID',
                    'Prescription.UPSAccessPointAddress',
                    'Prescription.DeliveryID',
                    'Prescription.ReferenceNumber',
                    'Client.CompanyName',
                    'Prescription.Status',
                    'Prescription.PrescriptionID AS TrayID',
                    'JVM',
                    'Prescription.CreatedDate'
                ])
                ->leftJoin('Client', 'Prescription.ClientID', '=', 'Client.ClientID')
                ->whereRaw("Prescription.PrescriptionID NOT IN (SELECT PrescriptionID FROM Tray WHERE Status = 1)")
                ->where('Prescription.Status', '1')
                ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)")
                ->get();
        } else if ($type == 1) {
            $data = DB::table('Tray')->select([
                'Prescription.PrescriptionID',
                'Prescription.UPSAccessPointAddress',
                'Prescription.DeliveryID',
                'Prescription.ReferenceNumber',
                'Client.CompanyName',
                'Prescription.Status',
                'TrayID',
                'JVM',
                'Prescription.CreatedDate'
            ])
                ->leftJoin('Prescription', 'Prescription.PrescriptionID', '=', 'Tray.PrescriptionID')
                ->leftJoin('Client', 'Prescription.ClientID', '=', 'Client.ClientID')
                ->whereNull('Tray.DeletedAt')
                ->where('Tray.UserID', $id)
                ->orderBy('Priority', 'ASC')
                ->where('Tray.Status', 1)
                ->where('Tray.Type', 1)
                ->whereNotNull('Prescription.PrescriptionID')
                ->get();
        } else {
            $data = DB::table('DispenserPool')->select([
                'Prescription.PrescriptionID',
                'Prescription.UPSAccessPointAddress',
                'Prescription.DeliveryID',
                'Prescription.ReferenceNumber',
                'Client.CompanyName',
                'Prescription.Status',
                'DispenserPoolID AS TrayID',
                'Prescription.PaymentMethod',
                'JVM',
                'Prescription.CreatedDate'
            ])
                ->leftJoin('Prescription', 'Prescription.PrescriptionID', '=', 'DispenserPool.PrescriptionID')
                ->leftJoin('Client', 'Prescription.ClientID', '=', 'Client.ClientID')
                ->where('DispenserPool.Status', 0)
                ->where('DispenserPool.UserID', $user->esa_user_id)
                ->whereNotNull('Prescription.PrescriptionID')
                ->orderBy('DispenserPoolID', 'ASC')
                ->where('DispenserPool.Type', 0)->get();
        }

        $items = [];
        foreach ($data as $item) {
            array_push($items, $item->PrescriptionID);
        }

        $products = DB::table('Product')
            ->select([
                'Product.PrescriptionID',
                'ProductCode.Name',
                'Product.Dosage',
                'Product.Quantity',
                'Product.Unit',
                'ProductCode.JVM'
            ])
            ->leftJoin('ProductCode', 'Product.Code', '=', 'ProductCode.Code')
            ->groupBy('Product.ProductID')
            ->whereIn('Product.PrescriptionID', $items)
            ->get();

        $data->transform(function ($item) use ($products) {
            $item->Products = [];

            $item->Status = $this->orderStatuses[$item->Status];

            $item->{"Date/Time"} = convertTimestamp($item->CreatedDate, 'd M Y H:i');
            unset($item->CreatedDate);

            foreach ($products as $product) {
                if ($product->PrescriptionID == $item->PrescriptionID) {
                    $total = $product->Dosage * $product->Quantity;

                    $name = "$product->Name $total $product->Unit";

                    array_push($item->Products, $name);
                }

                if ($product->JVM == 1 && $item->CompanyName == 'EveAdam') {
                    $item->JVM = 1;
                } else if ($product->JVM == 2) {
                    $item->JVM = 0;
                }
            }

            return $item;
        });

        return $data;
    }

    /**
     * Insert a tray item
     *
     * @param array<mixed,mixed> $data
     * @param array<int,int> $prescriptionID
     * @return array<int,mixed>
     */
    public function insertTrayItem($data, $prescriptionID)
    {
        $error = [];

        foreach ($prescriptionID as $id) {
            $existing = DB::table('Tray')->select('PrescriptionID')->where('PrescriptionID', $id)
                ->whereNull('DeletedAt')->where('Status', 1)->first();

            $data['PrescriptionID'] = $id;

            if (!$existing) {
                DB::table('Tray')->insert($data);
            } else {
                array_push($error, $existing->PrescriptionID);
            }
        }

        return $error;
    }

    /**
     * Insert multiple prescriptions into a dispenser pool by id
     *
     * @param int $userId
     * @param array<int, int> $prescriptionID
     * @return array
     */
    public function insertDispenserItem($userId, $prescriptionID)
    {
        $error = [];

        foreach ($prescriptionID as $id) {
            $existing = DB::table('DispenserPool')
                ->select('PrescriptionID')
                ->where('PrescriptionID', $id)
                ->where('UserID', '!=', 0)->first();

            if (!$existing) {
                DB::table('DispenserPool')->where('PrescriptionID', $id)->update([
                    'UserID' => $userId
                ]);
            } else {
                array_push($error, $existing->PrescriptionID);
            }
        }

        return $error;
    }

    /**
     * Delete tray item by id
     *
     * @param int $id
     * @return int
     */
    public function deleteTrayItem($id)
    {
        $user = Auth::user();

        $dispenser = false;

        if ($user->role == 20 || $user->role == 19) {
            $dispenser = true;
        }

        if (!$dispenser) {
            DB::table('Tray')->where('TrayID', $id)->update(
                ['DeletedAt' => Carbon::now(), 'Status' => 0]
            );
        } else {
            DB::table('DispenserPool')->where('DispenserPoolID', $id)->update(
                ['UserID' => 0]
            );
        }

        return $id;
    }

    /**
     * Soft delete active tray items belonging to the logged in user
     *
     * @return int
     */
    public function clearTray($id = false)
    {
        $user = Auth::user();

        if (!$id) {
            $id = $user->id;
        }

        $dispenser = false;

        if ($user->role == 20 || $user->role == 19) {
            $dispenser = true;
        }

        if (!$dispenser) {
            $delete = DB::table('Tray')
                ->where('Tray.UserID', $id)
                ->whereNull('DeletedAt')
                ->where('Status', 1)
                ->update(
                    [
                        'Status' => 0,
                        'DeletedAt' => Carbon::now()
                    ]
                );
        } else {
            $delete = DB::table('DispenserPool')
                ->where('UserID', $user->esa_user_id)
                ->update([
                    'UserID' => 0
                ]);
        }

        return $delete;
    }

    /**
     * Lower priority of a tray item
     *
     * @param int $id
     * @return int
     */
    public function lowerPriority($id)
    {
        return DB::table('Tray')->where('TrayID', $id)->increment('Priority');
    }

    /**
     * Take over a users tray
     *
     * @param int $id
     * @return bool
     */
    public function takeover($id)
    {
        $tray = DB::table('Tray')->where('Tray.UserID', $id)->where('Tray.Status', 1)->whereNull('Tray.DeletedAt')->get();

        if ($tray->isNotEmpty()) {
            $tray = $tray->toArray();

            for ($i = 0; $i < count($tray); $i++) {
                $tray[$i]->UserID = Auth::id();
                unset($tray[$i]->TrayID);
                $tray[$i] = (array) $tray[$i]; // we have to cast this to array to directly insert it back
            }

            $this->clearTray($id);

            return DB::table('Tray')->insert($tray);
        } else {
            return false;
        }
    }

    /**
     * Get all available new prescription id's
     * @param int $count
     * @return array
     */
    public function getNew($count)
    {
        $data = DB::table('Prescription')
            ->whereRaw("Prescription.PrescriptionID NOT IN (SELECT PrescriptionID FROM Tray WHERE Status = 1)")
            ->where('Prescription.Status', '1')
            ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");

        if ($count) {
            $data = $data->limit($count);
        }

        $data = $data->pluck('PrescriptionID')->toArray();

        return $data;
    }

    /**
     * Check if a prescription exists in a tray other then the current user's one
     *
     * @param int $id
     * @return bool
     */
    public function checkExistance($id)
    {
        return DB::table('Tray')
            ->select('PrescriptionID')
            ->where('PrescriptionID', $id)
            ->where('UserID', '!=', Auth::user()->id)
            ->whereNull('DeletedAt')
            ->where('Status', 1)
            ->count() > 0 ? true : false;
    }
}
