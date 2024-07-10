<?php
namespace App\Library;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

/**
 * Country table helper
 */
class Country
{
    /**
     * Get a list of countries
     *
     */
    public function getCountries(): Collection
    {
        return DB::table('Country')->get();
    }

    /**
     * Get a country by id
     *
     * @param int $id
     * @return object
     */
    public function getCountry($id)
    {
        return DB::table('Country')->where('Status', $id)->get();
    }

    /**
     * Get a country id by code
     *
     * @param string $code
     * @return int
     */
    public function getId($code, $type = 'CodeName3')
    {
        return DB::table('Country')->where($type, $code)->value('CountryID');
    }

    /**
     * Check if country is active or inactive
     *
     * @param int $id
     * @return int
     */
    public function checkIfActive($id)
    {
        return DB::table('ProductCode')->where('Type', 2)->where('Code', $id)->value('Status');
    }

    /**
     * Undocumented function
     *
     * @param object $filters
     * @return object
     */
    public function getCountriesPricing($filters)
    {
        $columns = [
            "pc.ProductCodeID",
            "pc.Code",
            "pc.Name",
            "p.Price"
        ];

        $data = DB::table('ProductCode AS pc')->select($columns)->leftJoin('Pricing AS p', 'p.Code', '=', 'pc.Code');

        if ($filters->letter && $filters->letter != 'all') {
            $data = $data->whereRaw("pc.Name REGEXP '^[$filters->letter].*$'");
        }

        if ($filters->letter && $filters->letter == 'number') {
            $data = $data->whereRaw("pc.Name not regexp '[^A-Za-z]'");
        }

        if (isset($filters->company)) {
            switch ($filters->company) {
                case 'DISCONTINUED':
                    $data = $data->where('pc.Status', 2);
                    break;
                case 'INACTIVE':
                    $data = $data->where('pc.Status', 0);
                    break;
                default:
                    $data = $data->where('pc.Status', 1)->where('p.ClientID', $filters->company);
                    break;
            }
        }

        return $data->where('pc.Type', 2)->groupBy("pc.ProductCodeID")->orderBy('pc.Name', 'ASC')->get();
    }

    /**
     * Format ProductCode entries for frontend display
     *
     * @param object $data
     * @return object
     */
    public function formatCountries($data)
    {
        foreach ($data as $value) {
            if (isset($value->Price)) {
                $value->Price = '£' . number_format((float) $value->Price, 2, '.', ',');
            }
        }

        return $data;
    }

    /**
     * Get a list of countries
     *
     * @return object
     */
    public function list()
    {
        return DB::table('Country')->select(['CountryID', 'Name'])->get();
    }

    /**
     * Undocumented function
     *
     * @param object $request
     * @return int|false
     */
    public function addPricing($request)
    {
        $countryName = DB::table('Country')->where('CountryID', $request->country)->value('Name');

        $productCode = DB::table('ProductCode')->insertGetId(
            [
                'Code' => $request->country,
                'Name' => $countryName,
                'Type' => 2,
                'Status' => 1,
                'Quantity' => 1,
                'Units' => 'SHIPPING',
                'Fridge' => null,
                'VAT' => 20,
                'Pack' => 0,
                'OTC' => 0,
                'ProductType' => 1,
                'TariffCode' => 0,
            ]
        );

        if ($productCode) {
            DB::table('Pricing')->insert([
                'Type' => 2,
                'Status' => 1,
                'ClientID' => 0,
                'Code' => $request->country,
                'Price' => number_format($request->price, 2),
                'Quantity' => 1,
            ]);

            return $productCode;
        } else {
            return false;
        }
    }

    /**
     * Undocumented function
     *
     */
    public function updatePricing(int $id, Request $request): int
    {
        return DB::table('Pricing')->where('PricingID', $id)->update(
            [
                'Price' => number_format($request->price, 2),
            ]
        );
    }
}