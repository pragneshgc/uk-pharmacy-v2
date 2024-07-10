<?php

namespace Tests\Feature\Http\Controllers\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class NewOrderControllerTest extends TestCase
{
    /** @test */
    public function error_invalid_auth_token(): void
    {
        $this->withServerVariables(['REMOTE_ADDR' => '192.0.1.1']);
        $this->addClient();
        $data = $this->getOrderJSON();
        $headers = [
            'Authorization' => 'Bearer invalid_bearer_token',
            'Accept' => 'application/json'
        ];
        $response = $this->postJson('/api/new-order', $data, $headers);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    /** @test */
    public function error_ip_not_whitelisted(): void
    {
        $this->withServerVariables(['REMOTE_ADDR' => '192.0.1.1']);
        $client = $this->addClient();
        $data = $this->getOrderJSON();
        $headers = [
            'Authorization' => 'Bearer ' . $client->APIKey,
            'Accept' => 'application/json'
        ];
        $response = $this->postJson('/api/new-order', $data, $headers);

        $response->assertStatus(Response::HTTP_UNAUTHORIZED);
        $response->assertJson(['message' => 'Unauthorized or in-valid IP']);
    }

    /** @test */
    public function error_invalid_json_data()
    {
        $client = $this->addClient();
        $this->withServerVariables(['REMOTE_ADDR' => $client->IP]);

        $data = $this->getOrderJSON();
        $headers = [
            'Authorization' => 'Bearer ' . $client->APIKey,
            'Accept' => 'application/json'
        ];
        $response = $this->postJson('/api/new-order', $data, $headers);

        $response->assertStatus(Response::HTTP_BAD_REQUEST);
        $response->assertJson(['message' => 'Import error: no data found']);
    }

    /** @test */
    public function order_received_successfully()
    {
        $client = $this->addClient();
        $this->withServerVariables(['REMOTE_ADDR' => $client->IP]);

        $data = $this->getOrderJSON();
        $headers = [
            'Authorization' => 'Bearer ' . $client->APIKey,
            'Accept' => 'application/json'
        ];
        $response = $this->postJson('/api/new-order', $data, $headers);

        $response->assertStatus(Response::HTTP_OK);
        $response->assertJson(['message' => 'success']);
    }
}
