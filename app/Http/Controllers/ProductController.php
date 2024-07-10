<?php

namespace App\Http\Controllers;

use App\Library\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class ProductController extends Controller
{
    private $product;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->product = new Product;
    }

    /**
     * Get a list of products
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $products = $this->product->getProducts($request);
        $products = $this->product->formatProducts($products);

        return $this->sendResponse($products, 'Product list');
    }

    /**
     * Fetch product details by EAN
     *
     * @param string $code
     * @return \Illuminate\Http\Response
     */
    public function findByEan($code)
    {
        return $this->product->getProductDetails('ean', $code);
    }

    /**
     * Get an index of fdb database items directly from FDB API
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function fdbIndex(Request $request)
    {
        return $this->product->fdbProductsList($request);
    }

    /**
     * Fetch a list of products
     *
     * @return JsonResponse
     */
    public function list()
    {
        return $this->sendResponse($this->product->productList(), 'Product list');
    }

    /**
     * Fetch a list of prices
     *
     * @param int $id
     * @return JsonResponse
     */
    public function priceList($id)
    {
        $data = $this->product->priceList($id);
        $data = $this->product->formatProducts($data);

        return $this->sendResponse($data, 'Product price list');
    }

    /**
     * Delete a product by ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        //log delete
        return $this->sendResponse($this->product->delete($id), 'Product deleted');
    }

    /**
     * Reactivate a deleted product
     *
     * @param int $id
     * @return JsonResponse
     */
    public function reactivate($id)
    {
        //log update - reactivation
        return $this->sendResponse($this->product->reactivate($id), 'Product reactivated');
    }

    /**
     * Get a product by ProductCodeID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function product($id)
    {
        return $this->sendResponse($this->product->getProduct($id), 'Product fetched');
    }

    /**
     * Delete a pricing for a product
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deletePricing($id)
    {
        //log update - pricing change
        return $this->sendResponse($this->product->deletePricing($id), 'Pricing removed');
    }

    /**
     * Delete a pack product
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deletePackProduct($id)
    {
        //log delete
        return $this->sendResponse($this->product->deletePackProduct($id), 'Product removed');
    }

    /**
     * Save a pack product
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function savePackProduct(Request $request)
    {
        //log update
        return $this->sendResponse($this->product->savePackProduct($request->input()), 'Product saved');
    }

    /**
     * Get delivery company list
     *
     * @return JsonResponse
     */
    public function getDeliveryCompanies()
    {
        return $this->sendResponse($this->product->getDeliveryCompanies(), 'Delivery Company List');
    }

    /**
     * Add and validate a product
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addProduct(Request $request)
    {
        $input = $request->validate([
            'Code' => 'required|unique:ProductCode,Code',
            'Name' => 'required',
            'Quantity' => 'required',
            'Units' => 'required',
            'TariffCode' => 'required',
            'Fridge' => 'required',
            'ProductType' => 'required',
            'OTC' => 'required',
            'Pack' => 'required',
            'Status' => 'required',
            'VAT' => 'required',
            'JVM' => 'nullable|required',
            'PrintForm' => 'required',
            'Price' => 'required'
        ]);

        //log create

        return $this->sendResponse($this->product->addProduct($input), 'Product Added');
    }

    /**
     * Add and validate a product from FDB database
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addProductFDB(Request $request)
    {
        $input = $request->validate([
            'Code' => 'required',
            'Name' => 'required',
            'Quantity' => 'required',
            'Units' => 'required',
            'TariffCode' => 'required',
            'Fridge' => 'required',
            'ProductType' => 'required',
            'OTC' => 'required',
            'Pack' => 'required',
            'Status' => 'required',
            'VAT' => 'required',
            'FDBID' => 'required',
        ]);

        return $this->sendResponse($this->product->addProduct($input), 'Product Added');
    }

    /**
     * Update product information
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateProduct($id, Request $request)
    {
        if ($request->type == 1) {
            $input = $request->validate([
                'Code' => 'required',
                'Name' => 'required',
                'Quantity' => 'required',
                'Units' => 'required',
                'TariffCode' => 'required',
                'Fridge' => 'required',
                'ProductType' => 'required',
                'OTC' => 'required',
                'Pack' => 'required',
                'Status' => 'required',
                'VAT' => 'required',
                'JVM' => 'required',
                'PrintForm' => 'required'
            ]);
        } else {
            $input = $request->validate([
                'Code' => 'required',
                'Name' => 'nullable',
                'Quantity' => 'nullable',
                'Units' => 'nullable',
                'TariffCode' => 'nullable',
                'Fridge' => 'nullable',
                'ProductType' => 'nullable',
                'OTC' => 'nullable',
                'Pack' => 'nullable',
                'Status' => 'required',
                'VAT' => 'nullable',
                'JVM' => 'nullable',
                'PrintForm' => 'nullable'
            ]);
        }

        return $this->sendResponse($this->product->updateProduct($id, $input), 'Product Updated');
    }

    /**
     * Add new product pricing
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addProductPricing(Request $request)
    {
        return $this->sendResponse($this->product->addProductPricing($request), 'Pricing added');
    }

    /**
     * Get clients list
     *
     * @return JsonResponse
     */
    public function getClients()
    {
        return $this->sendResponse($this->product->getClients(), 'Client List');
    }

    /**
     * Get a list of alternative product names
     *
     * @param int $id
     * @return JsonResponse
     */
    public function alternativeNameList($id)
    {
        return $this->sendResponse($this->product->getAlternativeNames($id), 'Alternative name list');
    }

    /**
     * Get a list of alternative units
     *
     * @param int $id
     * @return JsonResponse
     */
    public function alternativeUnitList($id)
    {
        return $this->sendResponse($this->product->getAlternativeUnits($id), 'Alternative unit list');
    }

    /**
     * Check for alternative product names
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function alternativeCheck(Request $request)
    {
        return $this->sendResponse($this->product->checkAlternativeNames($request), 'Alternative name check result');
    }

    /**
     * Check for alternative unit
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function alternativeUnitCheck(Request $request)
    {
        return $this->sendResponse($this->product->checkAlternativeUnits($request), 'Alternative unit check result');
    }

    /**
     * Approve a product name discrepancy
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function approveDiscrepancy(Request $request)
    {
        return $this->sendResponse($this->product->approveAlternativeName($request), 'Alternative name approval');
    }

    /**
     * Approve an unit discrepancy
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function approveDiscrepancyUnit(Request $request)
    {
        return $this->sendResponse($this->product->approveAlternativeUnit($request), 'Alternative unit approval');
    }

    /**
     * Remove an alternative product name
     *
     * @param int $id
     * @return JsonResponse
     */
    public function removeAlternativeProductName($id)
    {
        return $this->sendResponse($this->product->deleteAlternativeName($id), 'Alternative name deleted');
    }

    /**
     * Remove an alternative unit
     *
     * @param int $id
     * @return JsonResponse
     */
    public function removeAlternativeUnit($id)
    {
        return $this->sendResponse($this->product->deleteAlternativeUnit($id), 'Alternative unit deleted');
    }

    /**
     * Get product specific system logs
     *
     * @param int $id
     * @return JsonResponse
     */
    public function logs($id)
    {
        return $this->sendResponse($this->product->logs($id), 'Product Logs');
    }

    /**
     * Return a CSV of inventory details
     *
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function csv(Request $request)
    {
        $headers = array(
            "Content-Type" => "data:text/csv;charset=utf-8,\uFEFF",
            "Content-Disposition" => "attachment; filename=file.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        );

        $data = $this->product->getProducts($request);
        $data = $this->product->formatProducts($data);

        $columns = ['Code', 'Name', 'Quantity', 'Units', 'Product Type', 'Pack', 'Reclassification', 'Fridge', 'TariffCode', 'Price'];

        $callback = function () use ($data, $columns) {
            $file = fopen('php://output', 'w');
            echo chr(0xEF) . chr(0xBB) . chr(0xBF); // this allows us to show pound signs. Why? No idea

            fputcsv($file, $columns, ',');

            $i = 0;
            foreach ($data as $product) {
                if ($i == 0) {
                    fputcsv($file, [
                        $product->Code, $product->Name, $product->Quantity, $product->Units,
                        $product->{'Product Type'}, $product->Package, $product->Reclassification
                        , $product->Fridge, $product->TariffCode, $product->Price
                    ], ',');
                } else {
                    fputcsv($file, [
                        $product->Code, $product->Name, $product->Quantity, $product->Units,
                        $product->{'Product Type'}, $product->Package, $product->Reclassification
                        , $product->Fridge, $product->TariffCode, $product->Price
                    ], ',');
                }
                $i++;
            }

            fclose($file);
        };

        return response()->streamDownload($callback, 'products-' . date('d-m-Y-H:i:s') . '.csv', $headers);
    }

    /**
     * Change a pack product status
     *
     * @param int $id
     * @return JsonResponse
     */
    public function changePackProductStatus($id)
    {
        if ($this->product->changePackProductStatus($id)) {
            return $this->sendResponse('Pack product changes successfully');
        }

        return $this->sendError('Could not update pack product');
    }

    /**
     * Get a list of packs this product belongs to
     *
     * @return JsonResponse
     */
    public function listPacks(Request $request)
    {
        $code = $request->code;

        return $this->sendResponse($this->product->listPacks($code));
    }

    /**
     * Update pack product ordering
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function updatePackOrdering(Request $request)
    {
        $packs = $request->input()['list'];

        foreach ($packs as $key => $value) {
            $this->product->changePackProductOrder($value['PackProductID'], $key);
        }

        return $this->sendResponse('Pack products updated');
    }

    /**
     * Preview product imports
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function importPreview(Request $request)
    {
        return $this->sendResponse($this->product->productImportPreview($request), 'Preview');
    }

    /**
     * Preview product imports
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function importFinish(Request $request)
    {
        return $this->sendResponse($this->product->productImportFinish($request), 'Finish');
    }
}