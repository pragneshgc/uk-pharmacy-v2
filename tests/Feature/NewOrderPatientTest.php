<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use Tests\TestCase;
use App\Models\Prescription;
use App\Models\Prescriptionhistory;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewOrderPatientTest extends TestCase
{
    use RefreshDatabase;

    public function test_show_error_reference_number_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.PatientId.ReferenceNumber' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_userid_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);

        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.PatientId.UserId' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_first_name_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.PatientName.FirstName' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_surname_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.PatientName.Surname' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_title_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.PatientName.Title' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_dob_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.DOB' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_gender_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.Sex' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_bmi_missing_from_xml()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Version' => 'V1.1',
            'PatientDetail.Patient.BMI' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }
}
