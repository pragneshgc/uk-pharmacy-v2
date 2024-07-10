<?php

namespace App\Builders;

use App\Enums\OrderStatus;
use Illuminate\Support\Facades\DB;

class PomBuilder
{
    private $query;
    private string $dateFilter = '';
    private $searchHistory = [
        OrderStatus::SHIPPED->value,
        OrderStatus::QUERIED->value,
        OrderStatus::REJECTED->value,
        OrderStatus::RETURNED->value
    ];
    public function register()
    {
        $this->query = DB::table('Prescription')
            ->selectRaw("Prescription.PrescriptionID, Prescription.ReferenceNumber, Prescription.CreatedDate, ph.UpdatedDate")
            ->leftJoin('DoctorAddress as do', 'do.DoctorAddressID', '=', 'Prescription.DoctorAddressID')
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'Prescription.DCountryCode')
            ->leftJoin('Country AS c2', 'c2.CountryID', '=', 'do.CountryID')
            ->leftJoin(DB::raw("(SELECT PrescriptionID, MIN(UpdatedDate) AS UpdatedDate, Status, SubStatus
            FROM `prescriptionhistory`
            WHERE Status = 8
            GROUP BY PrescriptionID) as ph"), 'ph.PrescriptionID', '=', 'prescription.PrescriptionID')
            ->where('ph.Status', OrderStatus::SHIPPED->value);

        return $this;
    }

    public function withCSV()
    {
        $this->query = $this->query
            ->addSelect([
                "c.Name AS Country",
                "c2.Name AS PrescriberCountry",
                "Prescription.Name AS Name",
                "Prescription.Surname AS Surname",
                "Prescription.DAddress1",
                "Prescription.DAddress2",
                "Prescription.DAddress3",
                "Prescription.DAddress4",
                "Prescription.DPostcode",
                "do.Name AS PrescriberName",
                "do.Surname AS PrescriberSurname",
                "do.DoctorType", "do.GMCNO",
                "do.Address1 as doctor_address1",
                "do.Address2 as doctor_address2",
                "do.Address3 as doctor_address3",
                "do.Address4 as doctor_address4",
                "do.Postcode as doctor_postcode",
            ]);

        return $this;
    }

    public function withoutCSV()
    {
        $this->query = $this->query
            ->addSelect([
                "c.Name AS Country",
                "Prescription.Name",
                "Prescription.Surname",
                "Prescription.DAddress1",
                "Prescription.DAddress2",
                "Prescription.DAddress3",
                "Prescription.DAddress4",
                "Prescription.DPostcode",
                "do.Name AS PrescriberName",
                "do.Surname AS PrescriberSurname",
                "do.DoctorType",
                "do.GMCNO",
                "do.Address1 as doctor_address1",
                "do.Address2 as doctor_address2",
                "do.Address3 as doctor_address3",
                "do.Address4 as doctor_address4",
                "do.Postcode as doctor_postcode",
                "c2.Name as PrescriberCountry"
            ]);

        return $this;
    }

    public function applySearchFilters($filter, $request): self
    {
        $filters = json_decode($filter, true);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';

        if (isset($filters["status-extended"])) {
            $this->dateFilter = 'ph.UpdatedDate';
        } else if (isset($filters['start_date'], $filters['end_date'])) {
            $this->dateFilter = 'ph.UpdatedDate';
        } else {
            $this->dateFilter = 'Prescription.CreatedDate';
        }

        if (isset($filters['timestamp']) && $filters['timestamp'] == 'processed_date') {
            $this->dateFilter = 'Prescription.UpdatedDate';
        } else if (isset($filters['timestamp']) && $filters['timestamp'] == 'recieved_date') {
            $this->dateFilter = 'Prescription.CreatedDate';
        }

        if (!empty($filters)) {
            foreach ($filters as $key => $value) {
                if ($value != '') {
                    switch ($key) {
                        case 'start_date':
                            $date = new \DateTime($value);
                            $date->setTime(00, 00, 00);
                            $date = $date->getTimestamp();
                            $this->query = $this->query->where($this->dateFilter, '>', $date);
                            break;
                        case 'end_date':
                            $date = new \DateTime($value);
                            $date->setTime(23, 59, 59);
                            $date = $date->getTimestamp();
                            $this->query = $this->query->where($this->dateFilter, '<', $date);
                            break;
                        case 'order_id':
                            $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                            $valueArray = preg_split('/[\ \n\,]+/', $value);

                            $this->query = $this->query->whereIn('Prescription.PrescriptionID', $valueArray);

                            break;
                        case 'country':
                            if (in_array(1, $value, true)) {
                                array_push($value, 244);
                                array_push($value, 245);
                            }

                            if (in_array('1-northern-ireland', $value, true) && !in_array('1-great-britain', $value, true)) {
                                $this->query = $this->query->where('Prescription.DPostCode', 'LIKE', "BT%");
                                array_push($value, 1);
                                $value = array_diff($value, ['1-northern-ireland']);
                            } else if (!in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                                $this->query = $this->query->where('Prescription.DPostCode', 'NOT LIKE', "BT%");
                                array_push($value, 1);
                                $value = array_diff($value, ['1-great-britain']);
                            } else if (in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                                $value = array_diff($value, ['1-northern-ireland', '1-great-britain']);
                                array_push($value, 1);
                            }

                            $this->query = $this->query->whereIn('Prescription.DCountryCode', $value);

                            break;
                        case 'status':
                            if (!isset($filters->return_history) || $filters->return_history != 'yes') {
                                $this->query = $this->query->where('Prescription.Status', '=', $value);
                            }
                            break;
                        case 'status-extended':
                            if (in_array($value, $this->searchHistory)) {
                                $this->query->addSelect(['ph.Status as history_status', 'ph.SubStatus as history_sub_status', 'ph.UpdatedDate as history_date']);
                            } else {
                                $this->query->whereRaw('(Prescription.Status = ? OR Prescription.SubStatus = ?)', [$value, $value]);
                            }
                            break;
                        case 'statuses':
                            $this->query = $this->query->whereIn('Prescription.Status', $value);
                            break;
                        case 'dashboard':
                            $this->query = $this->query->whereRaw("
                                        ( Prescription.Status IN(3,5,6,8,12,13,14)
                                        AND  Prescription.UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                                        AND  Prescription.UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                                        OR  ( Prescription.Status IN(1)
                                        AND  Prescription.CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                                        OR  (Prescription.Status IN(2,4,7,9,10,11,16))
                                    ");
                            break;
                        case 'delivery':
                            $this->query = $this->query->where('Prescription.DeliveryID', '=', $value);
                            break;
                        case 'doctor':
                            $this->query = $this->query->where('Prescription.DoctorID', '=', $value);
                            break;
                        case 'reference':
                            $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                            $valueArray = preg_split('/[\ \n\,]+/', $value);

                            $this->query = $this->query->whereIn('Prescription.ReferenceNumber', $valueArray);

                            break;
                        case 'name':
                            $this->query = $this->query->where('Prescription.Name', $operator, $strict ? $value : "%$value%");
                            break;
                        case 'surname':
                            $this->query = $this->query->where('Prescription.Surname', $operator, $strict ? $value : "%$value%");
                            break;
                        case 'address':
                            $this->query = $this->query
                                ->where('Prescription.Address1', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.Address2', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.Address3', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.Address4', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.Postcode', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.DAddress1', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.DAddress2', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.DAddress3', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.DAddress4', $operator, $strict ? $value : "%$value%")
                                ->orWhere('Prescription.DPostcode', $operator, $strict ? $value : "%$value%");
                            break;
                        case 'client':
                            $this->query = $this->query->where('Prescription.ClientID', '=', $value);
                            break;
                        case 'product':
                            $this->query = $this->query->whereRaw("Prescription.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code = '$value')");
                            break;
                        case 'gender':
                            $this->query = $this->query->where('Sex', $value);
                            break;
                        case 'product-multiple':
                            $marks = implode(',', array_fill(0, sizeof($value), '?'));

                            if (sizeof($value) > 0) {
                                $this->query = $this->query->whereRaw("Prescription.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code IN ($marks))", [$value]);
                            }
                            break;
                        case 'additional':
                            foreach ($value as $f) {
                                if ($f == '1') {
                                    $this->query = $this->query->whereRaw("Prescription.PaymentMethod != 0");
                                } else if ($f == '2') {
                                    $this->query = $this->query->whereRaw("Prescription.Repeats != 0 AND Prescription.Repeats != '' AND Prescription.DCountryCode IN (143,162,205,243)");
                                } else if ($f == '3') {
                                    $this->query = $this->query->whereRaw("Prescription.SaturdayDelivery != 0");
                                } else if ($f == '4') {
                                    $this->query = $this->query->whereRaw("Prescription.UPSAccessPointAddress != 0");
                                } else if (in_array($f, ['50', '51'])) {
                                    $this->query = $this->query->leftJoin("Product", 'Product.PrescriptionID', '=', 'Prescription.PrescriptionID')
                                        ->leftJoin("ProductCode", 'ProductCode.Code', '=', 'Product.Code');

                                    if ($f == '51') {
                                        $this->query = $this->query->whereRaw("ProductCode.Fridge = 1");
                                    } else if ($f == '50') {
                                        $this->query = $this->query->whereRaw("ProductCode.Fridge = 0");
                                    }
                                } else if (in_array($f, ['60', '61'])) {
                                    $this->query = $this->query->leftJoin("Product", 'Product.PrescriptionID', '=', 'Prescription.PrescriptionID')
                                        ->leftJoin("ProductCode", 'ProductCode.Code', '=', 'Product.Code');

                                    if ($f == '61') {
                                        $this->query = $this->query
                                            ->whereRaw("(
                                                ((Prescription.JVM = 0 AND ProductCode.JVM = 1)
                                                OR (Prescription.JVM = 1 AND ProductCode.JVM = 0)
                                                OR (Prescription.JVM = 1 AND ProductCode.JVM = 1)
                                                OR (SELECT Barcode FROM InventoryItem WHERE ProductID = Product.ProductID LIMIT 1) = 'CANISTER')
                                                AND Prescription.ClientID = 51
                                                )");
                                    } else if ($f == '60') {
                                        $this->query = $this->query->whereRaw("(
                                                ProductCode.JVM = 2 OR
                                                (Prescription.JVM = 1 AND ProductCode.JVM = 2) OR
                                                (Prescription.JVM = 0 AND ProductCode.JVM = 0)
                                                )");
                                    }
                                }
                            }

                            break;

                        default:
                            break;
                    }
                }
            }
        }

        return $this;
    }

    public function build()
    {
        return $this->query;
    }
}
