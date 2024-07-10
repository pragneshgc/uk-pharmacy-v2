<?php

namespace Tests\Feature;

use Tests\TestCase;
use SimpleXMLElement;
use App\Helpers\Generic;
use Illuminate\Support\Arr;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewOrderCredentialXmlTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_unauthorize_error_for_not_whitelisted_ip()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '192.0.1.1']);

        $url = $this->newOrderUrl();
        $xml = $this->getOrderXML();

        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    public function test_show_unauthorize_error_for_invalid_username()
    {
        $client = $this->addClient();
        $data = [
            'USERNAME' => "some-invalid-username",
            'PASSWORD' => $client->Password,
            'KEY' => $client->APIKey
        ];
        $querystring = Arr::query($data);
        $url = '?receivePrescription&' . $querystring;

        $xml = $this->getOrderXML();

        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    public function test_show_unauthorize_error_for_invalid_password()
    {
        $client = $this->addClient();
        $data = [
            'USERNAME' => $client->Username,
            'PASSWORD' => "some-invalid-password",
            'KEY' => $client->APIKey
        ];
        $querystring = Arr::query($data);
        $url = '?receivePrescription&' . $querystring;

        $xml = $this->getOrderXML();

        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    public function test_show_unauthorize_error_for_invalid_apikey()
    {
        $client = $this->addClient();
        $data = [
            'USERNAME' => $client->Username,
            'PASSWORD' => $client->Password,
            'KEY' => "some-invalid-key"
        ];
        $querystring = Arr::query($data);
        $url = '?receivePrescription&' . $querystring;

        $xml = $this->getOrderXML();

        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(401);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    public function test_show_error_for_empty_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $xml = Generic::arrayToXml([], new SimpleXMLElement('<ESAPrescription/>'));

        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: no data found']);
    }

    public function test_show_error_for_invalid_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $xml = '<?xml version="1.0" encoding="utf-8"?>
<ESAPrescription>
	<MessageID>9c701b08-490f-4865-9174-cfd8be8b194a</MessageID>
	<Version>V1.0</Version>
    <missingendtag>
</ESAPrescription>';

        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: invalid data received']);
    }

    public function test_show_error_if_patient_details_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail' => []
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient data not found']);
    }

    public function test_show_error_if_patient_details_patient_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient' => []
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient data not found']);
    }

    public function test_show_error_if_prescription_data_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'Prescription' => []
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Prescription data not found']);
    }

    public function test_show_error_if_date_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'Date' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Date is missing']);
    }
}
