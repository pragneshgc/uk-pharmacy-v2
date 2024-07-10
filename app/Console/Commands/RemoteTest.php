<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use GuzzleHttp;

class RemoteTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'remote:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $baseURI = 'https://syscare.technology';
        $endpoint = '/esa/orders';

        if (\App::environment('local')) {
            $baseURI = 'https://treated-admin-staging.azurewebsites.net';
            $endpoint = '/Esa/Orders';
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

        $referenceNumbers = $response->pendingPharmacyOrders; // (array) $response['pendingPharmacyOrders']; //tells us what is processed
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

        // if(count($referenceNumbers) != count($localCountArray)){
        // for ($i=0; $i < count($referenceNumbers); $i++) {
        //     if(in_array($referenceNumbers[$i], $localCountArray)){
        //         array_push($difference, $referenceNumbers[$i]);
        //     }
        // }

        $difference = array_diff($referenceNumbers, $localCountArray); //this gives us the difference between two arrays
        // }

        // if($success){
        //     DB::table('SyncOrder')->delete();

        //     foreach ($difference as $number) {
        //         DB::table('SyncOrder')->insert(['ClientID' => 50,'Type' => 1, 'Value' => $number]);
        //     }

        //     DB::table('SyncOrder')->insert(['ClientID' => 50,'Type' => 2, 'Value' => $orderCount]);
        // }

        return $response;
    }
}