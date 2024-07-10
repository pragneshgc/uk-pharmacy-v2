<?php

namespace App\Library;

use GuzzleHttp;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;


/**
 * Undocumented class
 */
class API
{
    /**
     * Check order statuses on external server
     *
     * @return boolean|string
     */
    public function checkStatus()
    {
        // $clients = DB::table('Client')->where('Status', 1)->whereNotNull('PendingPharmacyURL')->whereNotNull('PendingPharmacyEndpoint')->get();

        // foreach ($clients as $client) {
        //     $options = [
        //         'base_uri' => $client->PendingPharmacyURL,
        //         'headers' => [
        //             'Content-Type' => 'application/x-www-form-urlencoded; charset=UTF8',//JSON or XML?
        //         ]
        //     ];

        //     $client = new GuzzleHttp\Client($options);

        //     try {
        //         $response = $client->request('GET', $client->PendingPharmacyEndpoint, $options)->getBody()->getContents();
        //     } catch (\Throwable $th) {
        //         return false;
        //     }

        //     $response = json_decode($response);
        //     $difference = [];

        //     if($response == null){
        //         return false;
        //     }
        // }

        $baseURI = 'https://syscare.technology';
        $endpoint = '/esa/orders';

        // $baseURIEA = 'https://treateduk.azurewebsites.net';
        // $endpointEA = '/api/ESAPendingPharmacyOrder?code=sX6y7dbwzUaDYMG/KW6njhn8amzTapOWqP9TtpX7Pi8SZtlj7kiqLQ==';

        $baseURIEA = 'https://treateduk.azurewebsites.net';
        $endpointEA = '/api/ESAPendingPharmacyOrder?code=sX6y7dbwzUaDYMG/KW6njhn8amzTapOWqP9TtpX7Pi8SZtlj7kiqLQ==';

        if (App::environment('local')) {
            // $baseURI = 'https://treated-admin-staging.azurewebsites.net';
            // $endpoint = '/Esa/Orders';
            $baseURI = 'https://syscare.technology';
            $endpoint = '/esa/orders';
        }

        $options = [
            'base_uri' => $baseURI,
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded; charset=UTF8',
                //JSON or XML?
            ]
        ];

        //send a GET request to the endpoint
        $client = new GuzzleHttp\Client($options);

        try {
            $response = $client->request('GET', $endpoint, $options)->getBody()->getContents();
        } catch (\Throwable $th) {
            return false;
        }

        $response = json_decode($response);
        $difference = [];

        if ($response == null) {
            return false;
        }

        //check eve adam
        $optionsEA = [
            'base_uri' => $baseURIEA,
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded; charset=UTF8',
                //JSON or XML?
            ]
        ];

        //send a GET request to the endpoint
        $clientEA = new GuzzleHttp\Client($optionsEA);

        try {
            $responseEA = $clientEA->request('GET', $endpointEA, $optionsEA)->getBody()->getContents();
        } catch (\Throwable $th) {
            return false;
        }

        $orderNumbersEA = [];
        $responseEA = json_decode($responseEA);

        if ($responseEA->success) {
            $orderNumbersEA = $responseEA->orderNumbers;
        }

        $referenceNumbers = array_merge($response->pendingPharmacyOrders, $orderNumbersEA); // (array) $response['pendingPharmacyOrders']; //tells us what is processed
        $orderCount = $response->pendingPrescriberCount; // $response['pendingPrescriberCount']; //that tells us what needs to be processed
        $success = $response->isSuccess; // $response['isSuccess'];

        $localCount = DB::table('Prescription')->select('ReferenceNumber')->whereIn('ReferenceNumber', $referenceNumbers)->get();

        if ($localCount->isNotEmpty()) {
            $localCountArray = $localCount->pluck('ReferenceNumber')->all();
        } else {
            $localCountArray = [];
        }

        //hack for testkits
        $localCountTestKit = DB::table('TestKit')->select('ReferenceNumber')
            ->where('Count', '!=', 1)->whereIn('ReferenceNumber', $referenceNumbers)->get();

        if ($localCountTestKit->isNotEmpty()) {
            $testKitArray = $localCountTestKit->pluck('ReferenceNumber')->all();
            $localCountArray = array_merge($localCountArray, $testKitArray);
        }

        $difference = array_diff($referenceNumbers, $localCountArray); //this gives us the difference between two arrays

        if ($success) {
            DB::table('SyncOrder')->delete();

            foreach ($difference as $number) {
                if (in_array($number, $orderNumbersEA)) {
                    DB::table('SyncOrder')->insert(['ClientID' => 51, 'Type' => 1, 'Value' => $number]);
                } else {
                    DB::table('SyncOrder')->insert(['ClientID' => 50, 'Type' => 1, 'Value' => $number]);
                }
            }

            DB::table('SyncOrder')->insert(['ClientID' => 50, 'Type' => 2, 'Value' => $orderCount]);
        }

        return $response;
    }

    /**
     * Get the pending orders and count from database
     */
    public function checkOrders(): array
    {
        $response = [
            'pendingPharmacyOrders' => [],
            'pendingPrescriberCount' => 0,
            'pendingPharmacyOrdersCount' => 0,
        ];

        $pendingPharmacyOrders = DB::table('SyncOrder')
            ->select(['SyncOrder.SyncOrderID', 'SyncOrder.ClientID', 'SyncOrder.Value', 'Client.CompanyName'])
            ->leftJoin('Client', 'Client.ClientID', '=', 'SyncOrder.ClientID')
            ->where('SyncOrder.Type', 1)
            ->get();

        $pendingPrescriberCount = DB::table('SyncOrder')
            ->where('Type', 2)
            ->value('Value');

        if ($pendingPharmacyOrders->isNotEmpty()) {
            $response['pendingPharmacyOrders'] = $pendingPharmacyOrders;
            $response['pendingPharmacyOrdersCount'] = count($pendingPharmacyOrders);
        }

        if ($pendingPrescriberCount) {
            $response['pendingPrescriberCount'] = $pendingPrescriberCount;
        }

        return $response;
    }

    /**
     * Process an order approval with EveAdam
     *
     * @param int $referenceNumber
     * @return boolean|string
     */
    public function processApproval($referenceNumber)
    {
        $baseURI = 'http://localhost:1003';

        //might need to be in JSON
        $data = [
            'OrderID' => $referenceNumber,
            'Status' => 'Approved',
        ];

        $options = [
            'base_uri' => $baseURI,
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded; charset=UTF8',
                //JSON or XML?
            ],
            'form_params' => $data,
        ];

        //send a POST request to the endpoint
        $endpoint = '/api/echo';
        $client = new GuzzleHttp\Client($options);

        try {
            $response = $client->request('POST', $endpoint, $options)->getBody()->getContents();
        } catch (\Throwable $th) {
            return false;
        }

        return $response;
    }

    /**
     * Check if the prescription with reference number exist or is duplicated
     *
     * @param int $referenceNumber
     * @return array
     */
    public function checkOrder($referenceNumber)
    {
        $count = DB::table('Prescription')->where('ReferenceNumber', $referenceNumber)->where('Status', 20)->count();

        if ($count == 0) {
            return ['error' => true, 'message' => "Order with reference number $referenceNumber not found or in wrong status", 'code' => 404];
        } else if ($count > 1) {
            return ['error' => true, 'message' => "Multiple orders with reference number $referenceNumber found", 'code' => 409];
        } else {
            $order = DB::table('Prescription')->where('ReferenceNumber', $referenceNumber)->where('Status', 20)->first();
            return ['error' => false, 'order' => $order];
        }
    }

    /**
     * Validate an order address
     * This entire function needs to be refactored
     *
     * @param int $id
     * @return array
     */
    public function validateAddress($id, $addressChange = false)
    {
        $orderLibrary = new \App\Library\Order;

        $order = $orderLibrary->getOrderDetails($id);

        if (!$order) {
            return ['status' => false, 'message' => "Order with ID $id not found"];
        }

        if ($addressChange) {
            $order->DAddress1 = $addressChange['DAddress1'];
            $order->DAddress2 = $addressChange['DAddress2'];
            $order->DAddress3 = $addressChange['DAddress3'];
            $order->DAddress4 = $addressChange['DAddress4'];
            $order->DPostcode = $addressChange['DPostcode'];
            $order->DCountryCode = $addressChange['DCountryCode'];
        }       
        
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . base64_encode(config('services.mydhl.username') . ":" . config('services.mydhl.password'))               
            ])->get(config('services.mydhl.endpoint'), [
                'type' => 'delivery',
                'countryCode' => $order->CountryCodeName,
                'postalCode' => $order->DPostcode,
               // 'cityName' => $order->DAddress3,
                'strictValidation' => 'true',
            ]);

            if ($response->successful()) {                
                $orderLibrary->updateOrderMessage($id, "Address Validated Successfully");
                return ['status' => true, 'message' => "Address Validated Successfully"];
            } else {                                
                $responseData = json_decode($response->body());

                if(isset($responseData->detail)){                   
                    $orderLibrary->updateOrderMessage($id, $responseData->detail);
                    return ['status' => false, 'message' => $responseData->detail];
                }else{
                    $orderLibrary->updateOrderMessage($id, 'Could not validate address. Unknown error.');
                    return ['status' => false, 'message' => 'Could not validate address. Unknown error.'];
                }
            }
        } catch (\Illuminate\Http\Client\RequestException $e) {            
            return ['status' => false, 'message' => "Request failed: ". $e->getMessage() ];
        } catch (\Exception $e) {           
            return ['status' => false, 'message' => "An unexpected error occurred: ". $e->getMessage() ];
        }

    }
}
