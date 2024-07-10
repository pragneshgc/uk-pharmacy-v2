<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NewOrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_send_order_with_all_valid_data()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $xml = $this->getOrderXML();
        $response = $this->call(method: 'POST', uri: $url, content: $xml);

        $response->assertStatus(200);
        $id = $response['data'];
        $response->assertJson(['message' => 'Prescription successfully received and validated']);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => 1,
        ]);
        $this->assertDatabaseHas('PrescriptionHistory', [
            'PrescriptionID' => $id
        ]);
        $this->assertDatabaseHas('Product', [
            'PrescriptionID' => $id
        ]);
        $this->assertDatabaseHas('Questionnaire', [
            'PrescriptionID' => $id
        ]);
    }

    public function test_send_order_using_file()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();

        $xml = file_get_contents(__DIR__ . '../../xml_required_field.xml');
        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(200);
        $id = $response['data'];
        $response->assertJson(['message' => 'Prescription successfully received and validated']);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => 1,
        ]);
        $this->assertDatabaseHas('PrescriptionHistory', [
            'PrescriptionID' => $id
        ]);
        $this->assertDatabaseHas('Product', [
            'PrescriptionID' => $id
        ]);
        $this->assertDatabaseHas('Questionnaire', [
            'PrescriptionID' => $id
        ]);
    }
}
