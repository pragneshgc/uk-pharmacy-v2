<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NewOrderValidationTest extends TestCase
{
    public function test_show_error_if_date_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Date' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Date is missing']);
    }

    public function test_show_error_if_date_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = ['Date'];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Date is missing']);
    }

    public function test_show_error_if_patientdetails_are_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient data not found']);
    }

    public function test_show_error_if_patientdetails_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = ['PatientDetail'];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient data not found']);
    }

    public function test_show_error_if_prescription_are_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'Prescription' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Prescription data not found']);
    }
    public function test_show_error_if_prescription_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = ['Prescription'];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Prescription data not found']);
    }

    public function test_show_error_if_patient_reference_not_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.PatientId.ReferenceNumber' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_reference_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.PatientId.ReferenceNumber'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_userid_not_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.PatientId.UserId' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_userid_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.PatientId.UserId'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_firstname_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.PatientName.FirstName' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_firstname_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.PatientName.FirstName'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_surname_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.PatientName.Surname' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_surname_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.PatientName.Surname'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_title_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.PatientName.Title' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_title_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.PatientName.Title'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_dob_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.DOB' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_dob_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.DOB'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_sex_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.Sex' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_sex_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.Sex'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_bmi_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.BMI' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_bmi_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.BMI'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_saturday_delivery_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.SaturdayDelivery' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_saturday_delivery_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.SaturdayDelivery'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_ups_access_point_delivery_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.UPSAccessPointDelivery' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_ups_access_point_delivery_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.UPSAccessPointDelivery'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_telephone_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.Telephone' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_telephone_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.Telephone'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_mobile_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.Mobile' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_mobile_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.Mobile'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_email_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            'PatientDetail.Patient.Email' => ''
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_patient_email_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            'PatientDetail.Patient.Email'
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Patient field(s) missing']);
    }

    public function test_show_error_if_doctor_gmc_no_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Prescriber.Doctor.GMCNO" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Doctor field(s) missing']);
    }

    public function test_show_error_if_doctor_gmc_no_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Prescriber.Doctor.GMCNO"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Doctor field(s) missing']);
    }

    public function test_show_error_if_doctor_name_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Prescriber.Doctor.DoctorName" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Doctor field(s) missing']);
    }

    public function test_show_error_if_doctor_name_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Prescriber.Doctor.DoctorName"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Doctor field(s) missing']);
    }

    public function test_show_error_if_product_code_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.ProductCode" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_code_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.ProductCode"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_description_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.Description" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_description_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.Description"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.ProductQuantity.Quantity" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.ProductQuantity.Quantity"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_unit_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.ProductQuantity.Units" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_unit_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.ProductQuantity.Units"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_dosage_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.ProductQuantity.Dosage" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_quantity_dosage_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.ProductQuantity.Dosage"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_product_instructions_is_empty()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Product.Instructions" => ""
        ];
        $xml = $this->getOrderXML($overRideXML);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }
    public function test_show_error_if_product_instructions_is_not_set()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $without = [
            "Prescription.Product.Instructions"
        ];
        $xml = $this->getOrderXML(without: $without);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Product field(s) missing']);
    }

    public function test_show_error_if_questionnaire_question_answer_are_not_same()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $overRideXML = [
            "Prescription.Questionnaire" => [
                [
                    "Question" => "Do you have any pre-condition?",
                    "Answer" => "Not Declared",
                ],
                [
                    //"Question" => "Do you have an allergy?",
                    "Answer" => "Not Declared"
                ],
                [
                    "Question" => "Did you undergone any surgery?",
                    "Answer" => "Not Declared"
                ]
            ],
        ];
        $xml = $this->getOrderXML($overRideXML, ['Prescription.Questionnaire']);
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(400);
        $response->assertJson(['message' => 'Import error: Invalid Questions/Answers in XML']);
    }
}
