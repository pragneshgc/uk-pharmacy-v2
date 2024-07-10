<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Client;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Database\Seeders\PharmacyuserTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ClientTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_it_should_return_validation_error_if_client_fields_empty(): void
    {
        $this->userLogin();

        $response = $this->postJson('/clients', []);

        $response->assertStatus(422);
        $errors = $response['errors'];
        $this->assertEquals($errors['Surname'][0], "The surname field is required.");
        $this->assertEquals($errors['Address1'][0], "The address1 field is required.");
        $this->assertEquals($errors['Postcode'][0], "The postcode field is required.");
        $this->assertEquals($errors['CountryID'][0], "The country id field is required.");
        $this->assertEquals($errors['CreditLimit'][0], "The credit limit field is required.");
        $this->assertEquals($errors['IP'][0], "The ip field is required.");
        $this->assertEquals($errors['Status'][0], "The status field is required.");
        $this->assertEquals($errors['Username'][0], "The username field is required.");
        $this->assertEquals($errors['Password'][0], "The password field is required.");
        $this->assertEquals($errors['ITName'][0], "The it name field is required.");
        $this->assertEquals($errors['ITEmail'][0], "The it email field is required.");
        $this->assertEquals($errors['TradingName'][0], "The trading name field is required.");
        $this->assertEquals($errors['VAT'][0], "The vat field is required.");
    }

    public function test_can_create_a_client()
    {
        $this->userLogin();

        $clientData = Client::factory()->make();

        $response = $this->postJson('/clients', $clientData->toArray());
        $response->assertOk();
        $this->assertDatabaseHas('Client', [
            'Username' => $clientData->Username,
            'Password' => $clientData->Password
        ]);
    }
}
