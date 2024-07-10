<?php

namespace App\Library;

use GuzzleHttp;
use App\Library\Order;
use App\Library\Client;
use App\Library\Setting;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use phpDocumentor\Reflection\Types\Boolean;

/**
 * Handle tracking sending/resending
 */
class Tracking
{
    private $order;
    private $setting;
    private $client;
    private string $invoiceEndpoint = '';

    public function __construct()
    {
        $this->order = new Order;
        $this->setting = new Setting;
        $this->client = new Client;
        if (config('app.url')) {
            $this->invoiceEndpoint = config('app.url') . '/invoices/generate/';
        }
    }

    /**
     * Add a tracking code and send tracking to clients
     *
     * @param int $id
     * @param string $code
     */
    public function addTracking($id, $code): bool
    {
        $update = DB::table('Prescription')->where('PrescriptionID', $id)->update([
            'TrackingCode' => $code
        ]);

        if ($update) {
            return $this->sendTracking($id, true);
        } else {
            return false;
        }
    }

    /**
     * Send tracking
     *
     * @param int $id
     * @param bool $request
     */
    public function sendTracking(int $id, bool $request = true, bool $resend = false): mixed
    {
        $order = $this->order->getOrderDetails($id);
        $setting = $this->setting->getSetting($order->DeliveryID);
        $client = $this->client->getClient($order->ClientID);

        if (!$order || !$setting || !$client) {
            return false;
        }
   
        // Check if the client ID is such that JSON should be used
        if (isJSONClient($client->ClientID)) {
            
            $json = json_decode(file_get_contents('xml_return/general.json'), true);

            // Fill in the JSON template with actual data
            $json['ESATracking']['DeliveryCompany'] = $setting->Name;
            $json['ESATracking']['TrackingLink'] = $setting->Value;
            $json['ESATracking']['TrackingCode'] = $order->TrackingCode;
            $json['ESATracking']['RefID'] = $order->ReferenceNumber;
            $json['ESATracking']['TrackingRef'] = $order->ReferenceNumber . '-' . $order->PrescriptionID;
            $json['ESATracking']['Username'] = $client->ReturnUsername;
            $json['ESATracking']['Password'] = $client->ReturnPassword;

            $body = json_encode($json);
            $contentType = 'application/json';
           
        } else {

            $xml = simplexml_load_file('xml_return/general.xml');
            
            $xml->DeliveryCompany = $setting->Name;
            $xml->TrackingLink = $setting->Value;
            $xml->TrackingCode = $order->TrackingCode;
            $xml->RefID = $order->ReferenceNumber;
            $xml->TrackingRef = $order->ReferenceNumber . '-' . $order->PrescriptionID;
            $xml->Username = $client->ReturnUsername;
            $xml->Password = $client->ReturnPassword;
            
            $body = $xml->asXML();
            $contentType = 'text/xml; charset=UTF8';
        }

        // Set options array
        $options = [
            'headers' => [
                'Content-Type' => $contentType,
            ],
            'body' => $body,
        ];


        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put('ups_xml/tracking-code-send-' . $id . '.xml', $body);
        } else {
            Storage::put('ups_xml/tracking-code-send-' . $id . '.xml', $body);
        }

        $returnURL = App::environment('local') ? config('app.esa') : $client->ReturnURL;

        if ($request) {
            //call external endpoint
            try {
                $req = new GuzzleHttp\Client($options);
                $req->request('POST', $returnURL, $options)->getBody()->getContents();
            } catch (GuzzleHttp\Exception\RequestException $exception) {
                return $exception->getResponse()->getBody()->getContents();
            }

            if (!$resend) {
                //call ESA invoice endpoint if not resend
                try {
                    $req = new GuzzleHttp\Client();
                    $req->request('GET', $this->invoiceEndpoint . $id);
                } catch (GuzzleHttp\Exception\RequestException $exception) {
                    return $exception->getResponse()->getBody()->getContents();
                }
            }
        }

        return true;
    }
}
