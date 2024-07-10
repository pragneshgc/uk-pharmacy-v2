<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class NewOrderJsonTest extends TestCase
{
    use RefreshDatabase;
    public function test_send_order_using_json()
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.1.0.1']);
        $url = $this->newOrderUrl();
        $data = $this->getOrderJSON();

        $response = $this->postJson($url, $data);

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
