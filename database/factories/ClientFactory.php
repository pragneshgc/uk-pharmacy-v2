<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'CompanyName' => fake()->company(),
            'Title' => fake()->title(),
            'Name' => fake()->name(),
            'Middlename' => '',
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
            'CreditLimit' => 0,
            'CreatedDate' => fake()->unixTime(),
            'ModifiedDate' => fake()->unixTime(),
            'AccessedDate' => fake()->unixTime(),
            'IP' => '127.0.0.1',
            'Type' => fake()->numberBetween(0, 1),
            'Status' => fake()->numberBetween(0, 2),
            'Notes' => NULL,
            'CompanyNumber' => fake()->ean8(),
            'GPHCNO' => fake()->ean13(),
            'ReturnURL' => NULL,
            'Username' => fake()->regexify("[a-z]{5}[0-9]{3}"),
            'Password' => 'password',
            'APIKey' => fake()->ean13(),
            'ITName' => fake()->companySuffix(),
            'ITEmail' => fake()->companyEmail(),
            'TradingName' => fake()->company(),
            'AdditionalComment' => null,
            'ReturnUsername' => null,
            'ReturnPassword' => null,
            'PendingPharmacyURL' => null,
            'PendingPharmacyEndpoint' => null,
            'VAT' => 0
        ];
    }
}