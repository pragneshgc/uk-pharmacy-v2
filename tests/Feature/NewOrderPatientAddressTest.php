<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Country;
use App\Enums\OrderStatus;
use App\Models\Prescriptionhistory;
use App\Models\Productcode;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewOrderPatientAddressTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_error_invalid_delivery_addresslines()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "",
                "AddressLine2" => "",
                "AddressLine3" => "",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient DeliveryAddress field(s) missing']);
    }

    public function test_show_error_too_long_delivery_addressline1()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => fake()->text(100),
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY ADDRESS LINE 1 LONGER THAN 35 CHARACTERS **********</span>'
        ]);
    }

    public function test_show_error_too_long_delivery_addressline2()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "10-12 Caxton",
                "AddressLine2" => fake()->text(100),
                "AddressLine3" => "Watford",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY ADDRESS LINE 2 LONGER THAN 35 CHARACTERS **********</span>'
        ]);
    }

    public function test_show_error_too_long_delivery_addressline3()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "10-12 Caxton",
                "AddressLine2" => "Watford",
                "AddressLine3" => fake()->text(100),
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY TOWN LONGER THAN 35 CHARACTERS **********</span>'
        ]);
    }

    public function test_show_error_too_long_delivery_addressline4()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "10-12 Caxton",
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => fake()->text(100),
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY PROVINCE LONGER THAN 35 CHARACTERS **********</span>'
        ]);
    }

    public function test_show_error_for_invalid_delivery_contrycode()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "10-12 Caxton Way",
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => "West Yorkshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient DeliveryAddress field(s) missing']);
    }

    public function test_show_error_for_invalid_delivery_postcode()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "",
                "AddressLine1" => "10-12 Caxton Way",
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => "West Yorkshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient DeliveryAddress field(s) missing']);
    }

    public function test_show_error_delivery_country_inactive_if_notset()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "NLD",
                "PostCode" => "755 4MG",
                "AddressLine1" => "10-12 Caxton Way",
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => "West Yorkshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY COUNTRY IS INACTIVE **********</span>'
        ]);
    }

    public function test_show_error_delivery_country_inactive_if_set_and_inactive()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $productCodeData = [
            'Code' => 152,
            'Type' => 2,
            'Status' => 0
        ];

        Productcode::create($productCodeData);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "NLD",
                "PostCode" => "755 4MG",
                "AddressLine1" => "10-12 Caxton Way",
                "AddressLine2" => " Caxton Way",
                "AddressLine3" => "Watford",
                "AddressLine4" => "West Yorkshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $response->assertJson([
            "message" => "Prescription recieved partially with errors",
        ]);
        $data = $response->json();
        $id = $data['data'];
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::SAFETY_CHECK->value,
            'Message' => '<span class="highlight_red">********* DELIVERY COUNTRY IS INACTIVE **********</span>'
        ]);
    }

    public function test_proccess_order_if_addressline1_not_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "10-12 Caxton Way",
                "AddressLine2" => "",
                "AddressLine3" => "",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(200);
    }

    public function test_proccess_order_if_addressline2_not_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "",
                "AddressLine2" => "Caxton Way",
                "AddressLine3" => "",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(200);
    }

    public function test_proccess_order_if_addressline3_not_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DeliveryAddress' => [
                "CountryCode" => "GBR",
                "PostCode" => "WD18 8JY",
                "AddressLine1" => "",
                "AddressLine2" => "",
                "AddressLine3" => "Bolton",
                "AddressLine4" => "Hertfordshire",
            ]
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(200);
    }
}
