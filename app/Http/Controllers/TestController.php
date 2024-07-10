<?php

namespace App\Http\Controllers;

use Tests\XmlHelper;
use App\Models\Doctor;
use App\Models\Productcode;
use Illuminate\Support\Facades\Storage;

class TestController extends Controller
{
    public function generateXML()
    {
        $xml = new XmlHelper();

        $prescriber = Doctor::query()
            ->selectRaw("concat(Title, ' ', Name, ' ', Surname) as name, GMCNO")
            ->where('Status', 1)
            ->get()
            ->random()
            ->toArray();

        //$doctor = Arr::random($prescribers);

        $product = Productcode::query()
            ->select(['Name', 'Code', 'Quantity', 'Units'])
            ->where('Status', 1)
            ->where('Type', 1)
            ->get()
            ->random()
            ->toArray();

        $overRideXML = [
            "Prescription" => [
                "Prescriber" => [
                    "Doctor" => [
                        "GMCNO" => $prescriber['GMCNO'],
                        "DoctorName" => $prescriber['name'],
                    ],
                ],
                "Product" => [
                    "Guid" => bin2hex(date('now')),
                    "ProductCode" => $product['Code'],
                    "Description" => $product['Name'],
                    "ProductQuantity" => [
                        "Quantity" => $product['Quantity'],
                        "Units" => $product['Units'],
                        "Dosage" => "1",
                    ],
                    "Instructions" => "Take ONE tablet Daily",
                    "Instructions2" => "",
                ]
            ],

        ];
        dd($xml->generateOrderXML($overRideXML));
    }

    public function generateJSON()
    {
        $xml = new XmlHelper();

        $prescriber = Doctor::query()
            ->selectRaw("concat(Title, ' ', Name, ' ', Surname) as name, GMCNO")
            ->where('Status', 1)
            ->get()
            ->random()
            ->toArray();

        //$doctor = Arr::random($prescribers);

        $product = Productcode::query()
            ->select(['Name', 'Code', 'Quantity', 'Units'])
            ->where('Status', 1)
            ->where('Type', 1)
            ->get()
            ->random()
            ->toArray();

        $overRideXML = [
            "Prescription" => [
                "Prescriber" => [
                    "Doctor" => [
                        "GMCNO" => $prescriber['GMCNO'],
                        "DoctorName" => $prescriber['name'],
                    ],
                ],
                "Product" => [
                    "Guid" => bin2hex(date('now')),
                    "ProductCode" => $product['Code'],
                    "Description" => $product['Name'],
                    "ProductQuantity" => [
                        "Quantity" => $product['Quantity'],
                        "Units" => $product['Units'],
                        "Dosage" => "1",
                    ],
                    "Instructions" => "Take ONE tablet Daily",
                    "Instructions2" => "",
                ]
            ],

        ];

        return $xml->generateOrderJSON($overRideXML);
    }

    public function testAzure()
    {
        $url = Storage::disk('azure')->url('logo.png');

        echo "<img src='" . $url . "' alt='logo'/>";
    }

    public function testAzurePath($dir, $path)
    {
        $url = Storage::disk('azure')->url($dir . "/" . $path);

        echo $url;
    }
}
