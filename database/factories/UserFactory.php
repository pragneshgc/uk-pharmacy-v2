<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName,
            'surname' => fake()->lastName,
            'email' => fake()->email(),
            'role' => fake()->numberBetween(1, 14),
            'password' => 'password',
            'pharmacy_role_id' => fake()->numberBetween(1, 14),
            'inventory_role_id' => fake()->numberBetween(1, 14),
            'shipping_role_id' => fake()->numberBetween(1, 14),
        ];
    }
}
