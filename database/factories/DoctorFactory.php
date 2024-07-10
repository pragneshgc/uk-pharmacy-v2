<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Title' => fake()->title(),
            'CompanyName' => fake()->company(),
            'Name' => fake()->name(),
            'Surname' => fake()->lastName(),
            'Address1' => fake()->buildingNumber(),
            'Address2' => fake()->streetName(),
            'Address3' => fake()->streetAddress(),
            'Address4' => fake()->city(),
            'Postcode' => fake()->postcode(),
            'CountryID' => fake()->numberBetween(1, 245),
            'Telephone' => fake()->phoneNumber(),
            'Mobile' => fake()->e164PhoneNumber(),
            'Email' => fake()->email(),
            'CreatedDate' => fake()->unixTime(),
            'ModifiedDate' => fake()->unixTime(),
            'AccessedDate' => fake()->unixTime(),
            'Status' => fake()->numberBetween(0, 2),
            'Notes' => NULL,
            'GMCNO' => fake()->regexify("[0-9]{6}"),
            'MedicalInsuranceNo' => NULL,
            'Password' => NULL,
            'Username' => NULL,
            'DoctorType' => fake()->numberBetween(1, 5),
            'ParentID' => NULL,
        ];
    }
}