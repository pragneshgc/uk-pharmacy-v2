<?php
namespace App\Library;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Undocumented class
 */
class Blacklist
{
    /**
     * Get a paginated list of blacklist entries
     *
     * @param string $q
     * @param string $s
     * @return object
     */
    public function getBlacklistEntriesPaginated($q, $s, $o)
    {
        $data = DB::table('BlackList AS b')->selectRaw("b.BlackListID")
            ->selectRaw("CONCAT(b.Name,' ',b.Surname) AS Name")
            ->selectRaw("CONCAT(b.DOB,'<br>','<i>(',CASE WHEN b.Sex=1 THEN 'M' WHEN b.Sex=2 THEN 'F' WHEN b.Sex=3 THEN 'T' ELSE 'S' END, ')</i>') AS 'DOB/Sex'")
            // ->selectRaw("CASE WHEN b.Sex=1 THEN 'M' WHEN b.Sex=2 THEN 'F' WHEN b.Sex=3 THEN 'T' ELSE 'S' END AS Sex")
            ->selectRaw("CONCAT(COALESCE(b.DAddress1, ''),', ',COALESCE(b.DAddress2,''),', ',COALESCE(b.DAddress3,''),', ', COALESCE(b.DAddress4,'')) AS Address")
            ->selectRaw("b.DPostcode AS 'Post Code'")
            ->selectRaw("FROM_UNIXTIME(b.CreatedDate) AS 'Created Date'")
            ->selectRaw("CASE COALESCE(Status, 0) WHEN 1 THEN 'Denied' ELSE 'Allowed' END AS 'Status'");

        if ($q != '') {
            $data = $data->where('b.Name', 'LIKE', '%' . $q . '%')
                ->orWhere('b.Surname', 'LIKE', '%' . $q . '%');
        }

        if ($s != '') {
            $data = $data->orderBy($s, $o);
        } else {
            $data = $data->orderBy("BlackListID", "DESC");
        }

        return $data;
    }

    /**
     * Set search parameters for doctors
     *
     * @param string $f
     * @param Request $request
     * @param object $data
     * @return object
     */
    public function setSearchParameters($f, Request $request, $data)
    {
        $filters = json_decode($f);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';

        if (!property_exists($filters, 'status')) {
            $data = $data->where('b.Status', 1);
        } else if (property_exists($filters, 'status')) {
            $data = $data->where('b.Status', $filters->status);
        }

        foreach ($filters as $key => $value) {
            if ($value != '') {
                switch ($key) {
                    case 'name':
                        $data = $data->where('b.Name', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'surname':
                        $data = $data->where('b.Surname', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'status':
                        $data = $data->where('b.Status', $value);
                        break;
                    default:
                        break;
                }
            }
        }

        return $data;
    }

    /**
     * Deactivate a blacklist entry with ID
     *
     * @param int $id
     * @return int
     */
    public function deactivate($id)
    {
        return DB::table('BlackList')->where('BlackListID', $id)->update([
            'Status' => 0
        ]);
    }

    /**
     * Add blacklist entries
     *
     * @param array $ids
     * @return bool
     */
    public function addEntries($ids)
    {
        foreach ($ids as $id) {
            $data = (array) DB::table('Prescription')
                ->where('PrescriptionID', $id)
                ->select(['Name', 'Surname', 'DOB', 'Sex', 'DAddress1', 'DAddress2', 'DAddress3', 'DAddress4', 'DPostcode', 'DCountryCode'])
                ->first();

            $data['CreatedDate'] = time();
            $data['Status'] = 1;

            // TODO: PC:could use single query with multiple records
            DB::table('BlackList')->insert($data);
        }

        return true;
    }

    /**
     * Remove blacklist entries
     *
     * @param array $ids
     * @return bool
     */
    public function removeEntries($ids)
    {
        foreach ($ids as $id) {
            $this->deactivate($id);
        }

        return true;
    }

    /**
     * Insert new data
     *
     * @param array $data
     * @return bool
     */
    public function insert($data)
    {
        return DB::table('BlackList')->insert($data); // 0 on no changes, 1 on success
    }
}