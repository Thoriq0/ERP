<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        static $usedCategories = [];
        $categories = [
            'Electronics', 'Fashion', 'Home Appliances', 'Health & Beauty',
            'Sports & Outdoors', 'Toys & Games', 'Automotive', 'Books',
            'Groceries', 'Furniture', 'Musical Instruments', 'Pet Supplies',
            'Gaming', 'Office Supplies', 'Gardening Tools'
        ];
    
        // Pilih kategori yang belum digunakan
        $availableCategories = array_diff($categories, $usedCategories);
    
        if (empty($availableCategories)) {
            throw new \Exception('Tidak cukup kategori unik untuk dibuat.');
        }
    
        $category = fake()->randomElement($availableCategories);
        $usedCategories[] = $category;
    
        return [
            'name' => $category,
        ];
    }
}
