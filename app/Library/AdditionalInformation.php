<?php

namespace App\Library;

use GuzzleHttp;
use Illuminate\Support\Facades\DB;

class AdditionalInformation
{
    /**
     * Get additional informations list
     *
     * @return object
     */
    public function getLabels($product)
    {
        $data = DB::table('AdditionalInformation AS ai')->select(['ai.Type AS Group', 'c.Name AS Country', 'ai.CountryID', 'ai.Description', 'ai.AIID', 'ai.Status'])
            ->selectRaw("false as 'editing', false as 'new'")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'ai.CountryID')->orderBy('Group', 'ASC')->orderBy('Country', 'DESC');

        if ($product && $product != null) {
            $array = explode(',', $product);

            $code = DB::table('ProductCode')->whereIn('ProductCodeID', $array)->pluck('Code');

            $data = $data->leftJoin('ProductAdditionalInformation AS pai', 'pai.Type', '=', 'ai.Type')
                ->whereIn('pai.ProductID', $code)->where('pai.Status', 1);
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
        return DB::table('AdditionalInformation AS ai')
            ->select(['ai.Type AS Group', 'c.Name AS Country', 'ai.CountryID', 'ai.Description', 'ai.AIID', 'ai.Status'])
            ->selectRaw("false as 'editing', false as 'new'")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'ai.CountryID')
            ->where('ai.AIID', $id)
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
        return DB::table('AdditionalInformation')->where('AIID', $id)->update($input);
    }

    /**
     * Disable a additional information by ID
     *
     * @param int $id
     * @return int
     */
    public function disable($id)
    {
        return DB::table('AdditionalInformation')->where('AIID', $id)->update(['Status' => 0]);
    }

    /**
     * Enable a additional information by ID
     *
     * @param int $id
     * @return int
     */
    public function enable($id)
    {
        return DB::table('AdditionalInformation')->where('AIID', $id)->update(['Status' => 1]);
    }

    /**
     * Disable a product for a additional information by ID
     *
     * @param int $id
     * @return int
     */
    public function disableProduct($id, $code)
    {
        return DB::table('ProductAdditionalInformation')
            ->where('Type', $id)
            // ->whereRaw("AIID IN (SELECT AIID FROM AdditionalInformation WHERE Type = ?)", $id)
            ->where('ProductID', $code)->update(['Status' => 0]);
    }

    /**
     * Enable a product for a additional information by ID
     *
     * @param int $id
     * @return int
     */
    public function enableProduct($id, $code)
    {
        return DB::table('ProductAdditionalInformation')
            ->where('Type', $id)
            // ->whereRaw("AIID IN (SELECT AIID FROM AdditionalInformation WHERE Type = ?)", $id)
            ->where('ProductID', $code)->update(['Status' => 1]);
    }


    /**
     * Save a additional information
     * Can return the saved label in result
     *
     * @param array $data
     * @param boolean $return
     * @return mixed
     */
    public function save($data, $return = false)
    {
        if ($return) {
            $id = DB::table('AdditionalInformation')->insertGetId($data);

            //after adding it match it to products
            $products = DB::table('ProductAdditionalInformation AS pai')
                ->leftJoin('AdditionalInformation AS ai', 'ai.AIID', '=', 'pai.AIID')
                ->where('ai.Type', $data['Type'])
                ->groupBy('pai.ProductID')
                ->pluck('pai.ProductID');

            foreach ($products as $product) {
                DB::table('ProductAdditionalInformation')->insert([
                    'ProductID' => $product,
                    'AIID' => $data['Type'],
                    'Type' => 1,
                    'Status' => 1
                ]);
            }

            return DB::table('AdditionalInformation AS ai')
                ->select(['ai.Type AS Group', 'c.Name AS Country', 'ai.CountryID', 'ai.Description', 'ai.AIID', 'ai.Status'])
                ->selectRaw("false as 'editing', false as 'new'")
                ->leftJoin('Country AS c', 'c.CountryID', '=', 'ai.CountryID')
                ->where('ai.AIID', $id)
                ->first();
        } else {
            return DB::table('AdditionalInformation')->insert($data);
        }
    }

    /**
     * Delete a additional information by ID
     *
     * @param int $id
     * @return int
     */
    public function delete($id)
    {
        //remove from productAdditionalInformation
        //it has to use type
        DB::table('ProductAdditionalInformation')->where('AIID', $id)->delete();

        return DB::table('AdditionalInformation')->where('AIID', $id)->delete();
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
        return DB::table('AdditionalInformation')->where('CountryID', $countryID)->where('Type', $group)->exists();
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
            ->select(['pai.Status', 'pc.Code', 'pc.ProductCodeID', 'pc.Name', 'pc.Quantity', 'pc.Units'])
            ->leftJoin('ProductAdditionalInformation AS pai', 'pc.Code', '=', 'pai.ProductID')
            // ->leftJoin('AdditionalInformation AS ai', 'ai.AIID', '=', 'pai.AIID')
            ->leftJoin('AdditionalInformation AS ai', 'ai.Type', '=', 'pai.Type')
            ->where('ai.Type', $id)
            ->groupBy(['pc.Code', 'pai.Status'])
            ->get();
    }

    /**
     * Remove a product from additional informations match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return int
     */
    public function removeProduct($id, $productCodeId)
    {
        $code = DB::table('ProductCode')->where('ProductCodeID', $productCodeId)->value('Code');

        return DB::table('ProductAdditionalInformation')
            // ->whereRaw("AIID IN (SELECT AIID FROM AdditionalInformation WHERE Type = ?)", $id)
            ->whereRaw("Type = ?", $id)
            ->where('ProductID', $code)
            ->delete();
    }

    /**
     * Add a product to additional informations match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return boolean
     */
    public function addProduct($id, $productCodeId)
    {
        $code = DB::table('ProductCode')->where('ProductCodeID', $productCodeId)->value('Code');
        $AdditionalInformationIds = DB::table('AdditionalInformation')->where('Type', $id)->pluck('AIID');

        $exists = DB::table('ProductAdditionalInformation')->where('ProductID', $code)->whereIn('AIID', $AdditionalInformationIds)->exists();

        if ($exists) {
            return false;
        }

        DB::table('ProductAdditionalInformation')->insert([
            'AIID' => NULL,
            'ProductID' => $code,
            'Type' => $id,
            'Status' => 1,
        ]);

        return true;
    }

    /**
     * Get last group by order
     *
     * @return int
     */
    public function getLastGroup()
    {
        return DB::table('AdditionalInformation')->orderBy('Type', 'DESC')->value('Type');
    }
}
