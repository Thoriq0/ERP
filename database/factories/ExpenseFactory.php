<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ExpenseFactory extends Factory
{
    public function definition(): array
    {
        // Set start dan end date
        $startDate = Carbon::create(2024, 1, 1);
        $endDate = Carbon::create(2025, 12, 31);

        // Generate tanggal random di antara rentang tersebut
        $createdAt = $this->faker->dateTimeBetween($startDate, $endDate);

        return [
            'payment_id' => Payment::inRandomOrder()->first()?->id ?? Payment::factory(),
            'paid_code' => 'PC-' . strtoupper(Str::random(5)),
            'references' => 'REF-' . strtoupper(Str::random(8)),
            'total' => $this->faker->numberBetween(1_000_000, 5_000_000),
            'created_at' => $createdAt,
            'updated_at' => $createdAt,
        ];
    }
}
