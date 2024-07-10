<?php

namespace App\Http\Controllers;

use App\Library\Country;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    private $country;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->country = new Country;
    }

    /**
     * Get country pricing list
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $deliveries = $this->country->getCountriesPricing($request);
        $deliveries = $this->country->formatCountries($deliveries);

        return $this->sendResponse($deliveries, 'Country pricing list');
    }

    /**
     * Get a list of countries
     *
     * @return JsonResponse
     */
    public function list()
    {
        return $this->sendResponse($this->country->list(), 'Country list');
    }

    /**
     * Add new country pricing
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addCountryPricing(Request $request)
    {
        return $this->sendResponse($this->country->addPricing($request), 'Added default country pricing');
    }

    /**
     * Update country pricing by id
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateCountryPricing($id, Request $request)
    {
        return $this->sendResponse($this->country->updatePricing($id, $request), 'Updated pricing');
    }

    /**
     * Return a CSV of country details
     *
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function csv(Request $request)
    {
        $headers = [
            "Content-Type" => "data:text/csv;charset=utf-8,\uFEFF",
            "Content-Disposition" => "attachment; filename=file.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];

        $data = $this->country->getCountriesPricing($request);
        $data = $this->country->formatCountries($data);

        $columns = ['Code', 'Name', 'Price'];

        $callback = function () use ($data, $columns) {
            $file = fopen('php://output', 'w');
            echo chr(0xEF) . chr(0xBB) . chr(0xBF); // this allows us to show pound signs. Why? No idea

            fputcsv($file, $columns, ',');

            $i = 0;
            foreach ($data as $product) {
                if ($i == 0) {
                    fputcsv($file, [
                        $product->Code, $product->Name, $product->Price
                    ], ',');
                } else {
                    fputcsv($file, [
                        $product->Code, $product->Name, $product->Price
                    ], ',');
                }
                $i++;
            }

            fclose($file);
        };

        return response()->streamDownload($callback, 'delivery-' . date('d-m-Y-H:i:s') . '.csv', $headers);
    }
}