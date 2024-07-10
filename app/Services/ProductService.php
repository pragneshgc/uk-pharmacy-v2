<?php

namespace App\Services;

use App\Models\Product;
use App\Models\Packproduct;
use App\Models\Productcode;
use App\Models\Prescription;

class ProductService
{
    public function importProductFromArray(int $id, array $data): array
    {
        $errors = [];
        $isFridgeOrder = false;

        if (empty($data['Prescription']['Product'])) {
            $errors[] = "No products found in XML";
            return $errors;
        }

        $products[] = $data['Prescription']['Product'];
        $upsAccessPointDelivery = $data['PatientDetail']['Patient']['UPSAccessPointDelivery'];

        Product::where('PrescriptionID', $id)->delete();
        $prescription = Prescription::query()
            ->select(['CustomerID', 'ClientID', 'ReferenceNumber'])
            ->where('PrescriptionID', $id)
            ->first();

        foreach ($products as $product) {
            $code = $product['ProductCode'];
            $productCode = Productcode::where('Code', trim($code))->first();
            if (!$productCode) {
                $errors[] = "<span class=\"highlight_red\">********* PRODUCT (CODE: $code) DOES NOT EXIT **********</span>";
            } else {
                //SAFETY CHECK FOR PRODUCTS
                if ($productCode->Status == 2 || $productCode->Status == 0) {
                    $description = $product['Description'];
                    $productStatus = $productCode->Status == 2 ? 'DISCONTINUED' : 'INACTIVE';
                    $errors[] = "<span class=\"highlight_red\">********* PRESCRIPTION CONTAINTS DRUG $description (CODE: $code) THAT IS $productStatus **********</span>";
                }

                $accessPoint = strtoupper($upsAccessPointDelivery) == 'N'
                    ? 0
                    : (strtoupper($upsAccessPointDelivery) == 'Y' ? 1 : 0);

                if ($accessPoint && $productCode->Fridge == 1) {
                    $errors[] = "<span class=\"highlight_red\">********* A FRIDGE ITEM GOING TO UPS ACCESS POINT**********</span>";
                }

                if ($productCode->Fridge == 1) {
                    $isFridgeOrder = true;
                }

                if ($productCode->Pack == 1) {
                    //only add enabled products for the pack
                    $packProducts = Packproduct::where('Code', trim($product['ProductCode']))
                        ->orderBy('Order', 'DESC')
                        ->orderBy('PackProductID', 'DESC')
                        ->where('Status', 1)->get();

                    //$productsToInsert = [];

                    foreach ($packProducts as $key => $packProduct) {
                        $productsToInsert = [
                            'PrescriptionID' => $id,
                            'GUID' => $product['Guid'],
                            'Code' => $packProduct->ProductCode,
                            'Description' => $packProduct->Description,
                            'Quantity' => $packProduct->Quantity,
                            'Unit' => $packProduct->Unit,
                            'Dosage' => $packProduct->Dosage,
                        ];

                        if ($packProduct->Instruction == 1) {
                            $productsToInsert['Instructions'] = $product['Instructions'];
                            $productsToInsert['Instructions2'] = empty($product['Instructions2']) ? '' : $product['Instructions2'];
                        }

                        Product::create($productsToInsert);
                    }
                    $isFridgeOrder = isPackContainsFridgeProduct($product['ProductCode']);
                } else {
                    Product::insert([
                        'PrescriptionID' => $id,
                        'GUID' => !empty($product['Guid']) ? trim($product['Guid']) : NULL,
                        'Code' => trim($product['ProductCode']),
                        'Description' => $product['Description'],
                        'Instructions' => $product['Instructions'] ?? '',
                        'Instructions2' => empty($product['Instructions2']) ? '' : $product['Instructions2'],
                        'Quantity' => $product['ProductQuantity']['Quantity'],
                        'Unit' => $product['ProductQuantity']['Units'],
                        'Dosage' => $product['ProductQuantity']['Dosage'],
                    ]);
                }
            }
        }


        if ($prescription->ClientID == 53 && !$isFridgeOrder) {
            //     //did the subscriber already receive products?
            $matches = explode('-', $prescription->ReferenceNumber);

            if (isset($matches[2]) && $matches[2] != '01') {
                $subscription = $matches[0] . '-' . $matches[1] . '-';

                $previousPrescription = Prescription::query()
                    ->where('ReferenceNumber', 'LIKE', "$subscription%")
                    ->where('PrescriptionID', '!=', $id)
                    ->orderBy('PrescriptionID', 'DESC')->first();

                if ($previousPrescription && $previousPrescription->ClientID == 53) {
                    Prescription::query()->where('PrescriptionID', $id)->update([
                        'DeliveryID' => 5, //goes to rml if the subscription reference is more than 01 for that subscription
                    ]);
                }
            }
        }

        return $errors;
    }
}
