<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Productcode>
 */
class ProductcodeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Code' => fake()->regexify("[0-9]{7}"),
            'FDBID' => 0,
            'Name' => "Some Med 5mg",
            'Type' => fake()->numberBetween(1, 2),
            'Status' => fake()->numberBetween(0, 1),
            'Quantity' => fake()->numberBetween(1, 100),
            'Units' => 'TABLETS',
            'Fridge' => fake()->numberBetween(0, 1),
            'VAT' => 20.0,
            'Pack' => 0,
            'OTC' => 0,
            'ProductType' => 1,
            'JVM' => 2,
            'TariffCode' => 0,
            'PrintForm' => 0
        ];
    }
}