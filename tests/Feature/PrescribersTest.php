<?php

namespace Tests\Feature;

use App\Models\Doctor;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PrescribersTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_it_should_return_validation_error_if_prescriber_fields_empty(): void
    {
        $this->userLogin();

        $response = $this->postJson('/doctors', []);

        $response->assertStatus(422);
        $errors = $response['errors'];
        $this->assertEquals($errors['Name'][0], "The name field is required.");
        $this->assertEquals($errors['Surname'][0], "The surname field is required.");
        $this->assertEquals($errors['Address1'][0], "The address1 field is required.");
        $this->assertEquals($errors['Postcode'][0], "The postcode field is required.");
        $this->assertEquals($errors['CountryID'][0], "The country id field is required.");
        $this->assertEquals($errors['Status'][0], "The status field is required.");
        $this->assertEquals($errors['GMCNO'][0], "The gmcno field is required.");
        $this->assertEquals($errors['DoctorType'][0], "The doctor type field is required.");
    }

    public function test_can_create_a_prescriber()
    {
        $this->userLogin();
        $doctorData = Doctor::factory()->make();

        $response = $this->postJson('/doctors', $doctorData->toArray());

        $response->assertOk();
        $this->assertDatabaseHas('Doctor', [
            'Name' => $doctorData->Name,
            'Mobile' => $doctorData->Mobile,
            'Email' => $doctorData->Email
        ]);
    }
}