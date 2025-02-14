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
        $products = [
            'Indomie Goreng' => 'Makanan',
            'Teh Botol Sosro' => 'Minuman',
            'Kopi Kapal Api' => 'Minuman',
            'ABC Kecap Manis' => 'Bumbu Dapur',
            'Bimoli Minyak Goreng' => 'Bahan Pokok',
            'Gula Pasir Gulaku' => 'Bahan Pokok',
            'Sabun Lifebuoy' => 'Kebutuhan Rumah Tangga',
            'Shampoo Pantene' => 'Kebutuhan Rumah Tangga',
            'Obat Paracetamol' => 'Obat-obatan',
            'Vitamin C Redoxon' => 'Obat-obatan',
        ];
    
        $suppliers = [
            'PT Indofood Sukses Makmur', 'PT Mayora Indah', 'PT Wings Surya',
            'PT Unilever Indonesia', 'PT Kalbe Farma', 'PT Sido Muncul', 
            'PT Nutrifood Indonesia', 'PT Ultra Jaya Milk', 'PT ABC President Indonesia'
        ];
        
        $product = fake()->randomElement(array_keys($products));
        $category = $products[$product];

        return [
            'product' => $product,
            'qty' => fake()->numberBetween(1, 100),
            'receiver' => fake()->randomElement($suppliers),
            'category' => $category,
            'pic' => fake()->name(),
            'image' => null,
        ];
    }
}
