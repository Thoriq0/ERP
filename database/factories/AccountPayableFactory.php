<?php

namespace Database\Factories;

use App\Models\BilledParty;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class AccountPayableFactory extends Factory
{
    public function definition(): array
    {
        return [
            'ap_code' => 'AP-' . strtoupper(Str::random(6)),
            'inbound_id' => null, // Kalau ingin relasi ke inbound, bisa disesuaikan
            'unit_price' => fake()->randomFloat(2, 100_000, 1_000_000),
            'tax' => fake()->numberBetween(5, 15),
            'total_amount' => fake()->randomFloat(2, 1_000_000, 5_000_000),
            'status_payment' => fake()->randomElement(['paid', 'unpaid', 'partial']),
            'due_date' => fake()->dateTimeBetween('-2 months', '+2 months'),
            'status_inbound' => fake()->randomElement(['received', 'pending', 'returned']),
            'item_description' => json_encode([
                'item' => fake()->word(),
                'qty' => fake()->numberBetween(1, 10),
            ]),
            'discount' => fake()->numberBetween(0, 20),
            'note' => fake()->sentence(),
            'terms_condition' => fake()->sentence(6),
            'billed_party_id' => BilledParty::inRandomOrder()->first()?->id ?? 1,
        ];
    }
}
