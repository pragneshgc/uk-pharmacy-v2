<?php

namespace App\Library;

use Illuminate\Support\Facades\DB;

/**
 * Undocumented class
 */
class Dispensing
{
    /**
     * Get a paginated list of blacklist entries
     *
     * @param string $q
     * @param string $s
     * @return object
     */
    public function getDispensingDataPaginated($q, $s, $o)
    {
        $data = DB::table('Product AS pr')
            ->leftJoin("Prescription AS p", 'p.PrescriptionID', '=', 'pr.PrescriptionID')
            ->leftJoin("ProductCode AS pc", 'pc.Code', '=', 'pr.Code')
            //->leftJoin("prescriptionhistory as ph", "ph.PrescriptionID", "=", "p.PrescriptionID")
            ->leftJoin(DB::raw("(SELECT PrescriptionID, MIN(UpdatedDate) AS oldest, Status, SubStatus
            FROM `prescriptionhistory`
            WHERE Status = 8
            GROUP BY PrescriptionID) as ph"), 'ph.PrescriptionID', '=', 'p.PrescriptionID')
            ->where("ph.Status", 8)
            ->where("pc.Status", 1);

        if ($q != '') {
            $data = $data->where('pc.Name', 'LIKE', '%' . $q . '%');
        }

        if ($s != '') {
            $data = $data->orderBy($s, $o);
        } else {
            $data = $data->orderBy("pc.Name", "ASC");
        }

        return $data;
    }

    /**
     * Set search parameters for doctors
     *
     * @param string $f
     * @param \Illuminate\Http\Request $request
     * @param object $data
     * @return object
     */
    public function setSearchParameters($f, $request, $data)
    {
        $filters = json_decode($f);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';
        $groupBy = ["pr.Code"];

        $data = $data->selectRaw("pc.Name AS Name");

        if (property_exists($filters, 'country') && property_exists($filters, 'client')) {
            $data = $data->selectRaw("CONCAT(pr.Code,p.CountryCode,p.ClientID) AS 'Code'");
        } else if (property_exists($filters, 'country')) {
            $data = $data->selectRaw("CONCAT(pr.Code,p.CountryCode) AS 'Code'");
        } else if (property_exists($filters, 'client')) {
            $data = $data->selectRaw("CONCAT(pr.Code,p.ClientID) AS 'Code'");
        } else {
            $data = $data->selectRaw("pr.Code");
        }

        $data = $data->selectRaw("pc.Quantity AS 'Pack Size', pc.Units AS Unit, SUM(pr.Dosage * pr.Quantity) AS Dispensed, ROUND(SUM(pr.Dosage * pr.Quantity) / pc.Quantity, 1) AS 'Packs Dispensed'");

        foreach ($filters as $key => $value) {
            if ($value != '') {
                switch ($key) {
                    case 'start_date':
                        $date = new \DateTime($value);
                        $date->setTime(00, 00, 00);
                        $date = $date->getTimestamp();

                        $data = $data->where("ph.oldest", '>', $date);

                        break;
                    case 'end_date':
                        $date = new \DateTime($value);
                        $date->setTime(23, 59, 59);
                        $date = $date->getTimestamp();

                        $data = $data->where("ph.oldest", '<', $date);

                        break;
                    case 'country':
                        array_push($groupBy, 'p.DCountryCode');

                        if (in_array(1, $value, true)) {
                            array_push($value, 244);
                            array_push($value, 245);
                        }

                        if (in_array('1-northern-ireland', $value, true) && !in_array('1-great-britain', $value, true)) {
                            $data = $data->where('p.DPostCode', 'LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-northern-ireland']);
                        } else if (!in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $data = $data->where('p.DPostCode', 'NOT LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-great-britain']);
                        } else if (in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $value = array_diff($value, ['1-northern-ireland', '1-great-britain']);
                            array_push($value, 1);
                        }

                        $marks = implode(',', array_fill(0, sizeof($value), '?'));

                        if (count($value) > 0) {
                            $data = $data->whereRaw("p.DCountryCode IN (SELECT CountryID FROM Country WHERE Country.CountryID IN ($marks))", [$value]);
                            $data = $data->selectRaw("c.Name AS 'Country'")->leftJoin('Country AS c', 'c.CountryID', '=', 'p.CountryCode');
                        }

                        break;
                    case 'product':
                        $data = $data->whereRaw("p.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code = '$value')");

                        break;
                    case 'product-multiple':
                        $marks = implode(',', array_fill(0, sizeof($value), '?'));

                        if (sizeof($value) > 0) {
                            $data = $data->whereRaw("p.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code IN ($marks))", [$value])->whereRaw("pc.Code IN ($marks)", [$value]);
                        }

                        break;
                    case 'client':
                        array_push($groupBy, 'p.ClientID');

                        $marks = implode(',', array_fill(0, sizeof($value), '?'));

                        if (count($value) > 0) {
                            $data = $data->selectRaw("cl.CompanyName AS 'Client'")->leftJoin('Client AS cl', 'cl.ClientID', '=', 'p.ClientID');
                            $data = $data->whereRaw("p.ClientID IN (SELECT ClientID FROM Client WHERE Client.ClientID IN ($marks))", [$value]);
                        }

                        break;

                    case 'additional':
                        $doSearch = true;
                        $format = '%Y/%m/%d';
                        if ($value == 1) {
                            $format = '%m/%Y';
                        } else if ($value == 2) {
                            $format = '%d/%m/%Y';
                        } else {
                            $doSearch = false;
                        }

                        if ($doSearch) {
                            $data = $data->selectRaw("FROM_UNIXTIME(p.UpdatedDate, '$format') AS Date")
                                ->groupBy(DB::raw("FROM_UNIXTIME(p.UpdatedDate, '$format')"))
                                ->orderByRaw("p.UpdatedDate ASC");
                        }
                    default:
                        break;
                }
            }
        }

        if (!isset($filters->start_date) || !isset($filters->end_date)) {
            $startDate = new \DateTime("-6 months");
            $startDate->setTime(00, 00, 00);
            $startDate = $startDate->getTimestamp();

            $data = $data->where("p.UpdatedDate", '>', $startDate);

            $endDate = new \DateTime();
            $endDate->setTime(23, 59, 59);
            $endDate = $endDate->getTimestamp();

            $data = $data->where("p.UpdatedDate", '<', $endDate);
        }

        $data = $data->groupBy($groupBy);

        return $data;
    }
}
