<?php

namespace App\Library;

use GuzzleHttp;
use Illuminate\Support\Facades\DB;

class Label
{
    /**
     * Get warning labels list
     *
     * @return \Illuminate\Support\Collection
     */
    public function getLabels($product)
    {
        $data = DB::table('WarningLabel AS wl')->select(['wl.Type AS Group', 'c.Name AS Country', 'wl.CountryID', 'wl.Description', 'wl.WLID', 'wl.Status'])
            ->selectRaw("false as 'editing', false as 'new'")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'wl.CountryID')->orderBy('Group', 'ASC')->orderBy('Country', 'DESC');

        if ($product && $product != null) {
            $array = explode(',', $product);

            $code = DB::table('ProductCode')->whereIn('ProductCodeID', $array)->pluck('Code');

            $data = $data->leftJoin('ProductWarningLabel AS pwl', 'pwl.WLID', '=', 'wl.WLID')
                ->whereIn('pwl.ProductID', $code)->where('pwl.Status', 1);
        }

        return $data->get();
    }

    /**
     * Get a single label by ID
     *
     * @param int $id
     * @return object
     */
    public function getLabel($id)
    {
        return DB::table('WarningLabel AS wl')
            ->select(['wl.Type AS Group', 'c.Name AS Country', 'wl.CountryID', 'wl.Description', 'wl.WLID', 'wl.Status'])
            ->selectRaw("false as 'editing', false as 'new'")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'wl.CountryID')
            ->where('wl.WLID', $id)
            ->first();
    }

    /**
     * Update a label by id
     *
     * @param int $id
     * @param array $input
     * @return int
     */
    public function updateLabel($id, $input)
    {
        return DB::table('WarningLabel')->where('WLID', $id)->update($input);
    }

    /**
     * Disable a warning label by ID
     *
     * @param int $id
     * @return int
     */
    public function disable($id)
    {
        return DB::table('WarningLabel')->where('WLID', $id)->update(['Status' => 0]);
    }

    /**
     * Enable a warning label by ID
     *
     * @param int $id
     * @return int
     */
    public function enable($id)
    {
        return DB::table('WarningLabel')->where('WLID', $id)->update(['Status' => 1]);
    }

    /**
     * Disable a product for a warning label by ID
     *
     * @param int $id
     * @return int
     */
    public function disableProduct($id, $code)
    {
        return DB::table('ProductWarningLabel')
            ->whereRaw("WLID IN (SELECT WLID FROM WarningLabel WHERE Type = ?)", $id)
            ->where('ProductID', $code)->update(['Status' => 0]);
    }

    /**
     * Enable a product for a warning label by ID
     *
     * @param int $id
     * @return int
     */
    public function enableProduct($id, $code)
    {
        return DB::table('ProductWarningLabel')
            ->whereRaw("WLID IN (SELECT WLID FROM WarningLabel WHERE Type = ?)", $id)
            ->where('ProductID', $code)->update(['Status' => 1]);
    }


    /**
     * Save a warning label
     * Can return the saved label in result
     *
     * @param array $data
     * @param boolean $return
     * @return mixed
     */
    public function save($data, $return = false)
    {
        if ($return) {
            $id = DB::table('WarningLabel')->insertGetId($data);

            //after adding it match it to products
            $products = DB::table('ProductWarningLabel AS pwl')
                ->leftJoin('WarningLabel AS wl', 'wl.WLID', '=', 'pwl.WLID')
                ->where('wl.Type', $data['Type'])
                ->groupBy('pwl.ProductID')
                ->pluck('pwl.ProductID');

            foreach ($products as $product) {
                DB::table('ProductWarningLabel')->insert([
                    'ProductID' => $product,
                    'WLID' => $id,
                    'Type' => 1,
                    'Status' => 1
                ]);
            }

            return DB::table('WarningLabel AS wl')
                ->select(['wl.Type AS Group', 'c.Name AS Country', 'wl.CountryID', 'wl.Description', 'wl.WLID', 'wl.Status'])
                ->selectRaw("false as 'editing', false as 'new'")
                ->leftJoin('Country AS c', 'c.CountryID', '=', 'wl.CountryID')
                ->where('wl.WLID', $id)
                ->first();
        } else {
            return DB::table('WarningLabel')->insert($data);
        }
    }

    /**
     * Delete a warning label by ID
     *
     * @param int $id
     * @return int
     */
    public function delete($id)
    {
        //remove from productwarninglabel
        DB::table('ProductWarningLabel')->where('WLID', $id)->delete();

        return DB::table('WarningLabel')->where('WLID', $id)->delete();
    }

    /**
     * Check if a label for the country already exists
     *
     * @param int $countryID
     * @param int $group
     * @return boolean
     */
    public function exists($countryID, $group)
    {
        return DB::table('WarningLabel')->where('CountryID', $countryID)->where('Type', $group)->exists();
    }

    /**
     * Get products by group id
     *
     * @param int $id
     * @return \Illuminate\Support\Collection
     */
    public function products($id)
    {
        return DB::table('ProductCode AS pc')
            ->select(['pwl.Status', 'pc.Code', 'pc.ProductCodeID', 'pc.Name', 'pc.Quantity', 'pc.Units'])
            ->leftJoin('ProductWarningLabel AS pwl', 'pc.Code', '=', 'pwl.ProductID')
            ->leftJoin('WarningLabel AS wl', 'wl.WLID', '=', 'pwl.WLID')
            ->where('wl.Type', $id)
            ->where('pwl.Status', 1)
            ->groupBy(['pc.Code', 'pwl.Status'])
            ->orderBy('pc.Name', 'ASC')
            ->get();
    }

    /**
     * Remove a product from warning labels match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return int
     */
    public function removeProduct($id, $productCodeId)
    {
        $code = DB::table('ProductCode')->where('ProductCodeID', $productCodeId)->value('Code');

        return DB::table('ProductWarningLabel')
            ->whereRaw("WLID IN (SELECT WLID FROM WarningLabel WHERE Type = ?)", $id)
            ->where('ProductID', $code)
            ->update([
                'Status' => 0
            ]);
    }

    /**
     * Add a product to warning labels match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return bool
     */
    public function addProduct($id, $productCodeId)
    {
        $code = DB::table('ProductCode')->where('ProductCodeID', $productCodeId)->value('Code');
        $warningLabelIds = DB::table('WarningLabel')->where('Type', $id)->pluck('WLID');

        $exists = DB::table('ProductWarningLabel')->where('ProductID', $code)->whereIn('WLID', $warningLabelIds)->exists();

        if ($exists) {
            DB::table('ProductWarningLabel')->where('ProductID', $code)->whereIn('WLID', $warningLabelIds)->update([
                'Status' => 1,
            ]);

            return true;
        }

        foreach ($warningLabelIds as $label) {
            DB::table('ProductWarningLabel')->insert([
                'WLID' => $label,
                'ProductID' => $code,
                'Type' => 1,
                'Status' => 1,
            ]);
        }

        return true;
    }

    /**
     * Get last group by order
     *
     * @return mixed
     */
    public function getLastGroup()
    {
        return DB::table('WarningLabel')->orderBy('Type', 'DESC')->value('Type');
    }
}