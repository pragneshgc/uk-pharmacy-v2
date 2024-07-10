<?php

namespace App\Console\Commands;

use Illuminate\Support\Facades\File;
use Illuminate\Console\Command;
use GuzzleHttp;
use DB;

class ImportTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the import system';

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
        $directory = storage_path('app\xml_testing');
        $scanned_directory = array_diff(scandir($directory), array('..', '.'));
        $appUrl = env('APP_URL');

        foreach ($scanned_directory as $file) {
            $string = File::get(storage_path('app\xml_testing') . '/' . $file); // get the XML
            $xml = simplexml_load_string(utf8_encode($string));

            $options = [
                'headers' => [
                    'Content-Type' => 'text/xml; charset=UTF8',
                ],
                'body' => $string
            ];

            $client = DB::table('Client')->where('ClientID', $xml->SenderID)->first();

            $credentials = "&USERNAME=$client->Username&PASSWORD=$client->Password&KEY=$client->APIKey";
            $returnURL = $appUrl . '/?receivePrescription' . $credentials;

            try {
                $req = new GuzzleHttp\Client($options);
                $req->request('POST', $returnURL, $options)->getBody()->getContents();
            } catch (GuzzleHttp\Exception\RequestException $exception) {
                return $exception->getResponse()->getBody()->getContents();
            }
        }
    }
}