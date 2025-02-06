<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inbound>
 */
class InboundFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'qty' => fake()->numberBetween(0, 100),
            'supplier' =>fake()->unique()->safeEmail(),
            'category' =>fake()->word()
        ];
    }
}
