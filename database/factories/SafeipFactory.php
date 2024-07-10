<?php

namespace Database\Factories;

use App\Models\Safeip;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Safeip>
 */
class SafeipFactory extends Factory
{
    protected $model = Safeip::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'SafeIP' => fake()->ipv4(),
            'SafeKey' => Str::random(32),
            'Status' => 0
        ];
    }
}