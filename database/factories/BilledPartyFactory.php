<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BilledParty>
 */
class BilledPartyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'bill_to' => fake()->company,
            'address_bill' => fake()->address,
            'contact_bill' => fake()->phoneNumber,
            'email_bill' => fake()->unique()->safeEmail,
            'account_bill' => fake()->randomNumber(8, true),
            'account_bill_name' => fake()->name,
            'account_bank_name' => fake()->company,
        ];
    }
}
