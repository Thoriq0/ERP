<?php

namespace Database\Factories;

use App\Models\AccountPayable;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        return [
            'account_payable_id' => AccountPayable::inRandomOrder()->first()?->id ?? AccountPayable::factory(),
            'payment_code' => 'PAY-' . strtoupper(Str::random(5)),
            'status_payment' => fake()->randomElement(['paid', 'unpaid', 'partial']),
        ];
    }
}
