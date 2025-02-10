<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Outbound>
 */
class OutboundFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->name(),
            'qty' => fake()->numberBetween(0, 100),
            'costumer' =>fake()->unique()->safeEmail(),
            'category' =>fake()->word()
        ];
    }
}
