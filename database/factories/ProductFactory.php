<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Supplier;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\products>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $category = Category::inRandomOrder()->first() ?? Category::factory()->create(); // Ambil kategori acak atau buat baru
        $supplier = Supplier::inRandomOrder()->first() ?? Supplier::factory()->create(); // Ambil supplier acak atau buat baru
        
        // Nama produk berdasarkan kategori
        $productNames = [
            'Electronics' => ['Samsung 4K Smart TV', 'Apple MacBook Pro', 'Sony Wireless Headphones', 'Logitech Gaming Mouse', 'Canon EOS Camera'],
            'Fashion' => ['Nike Running Shoes', 'Adidas Hoodie', 'Levi’s Slim Fit Jeans', 'Gucci Sunglasses', 'Puma Sports Jacket'],
            'Home Appliances' => ['Sharp Air Conditioner', 'Philips Electric Kettle', 'LG Washing Machine', 'Panasonic Rice Cooker', 'Samsung Refrigerator'],
            'Health & Beauty' => ['L’Oréal Face Serum', 'Dove Moisturizing Shampoo', 'Maybelline Matte Lipstick', 'Nivea Body Lotion', 'Neutrogena Sunscreen'],
            'Sports & Outdoors' => ['Wilson Tennis Racket', 'Decathlon Mountain Bike', 'Adidas Soccer Ball', 'Nike Yoga Mat', 'Puma Training Gloves'],
            'Toys & Games' => ['Lego Star Wars Set', 'Barbie Dream House', 'Hot Wheels Race Track', 'Monopoly Board Game', 'Nintendo Switch Console'],
            'Automotive' => ['Michelin Car Tires', 'Mobil 1 Engine Oil', 'Bosch Spark Plugs', 'Yamaha Motorcycle Helmet', 'Thule Roof Rack'],
            'Books' => ['Atomic Habits by James Clear', 'The Alchemist by Paulo Coelho', 'Harry Potter Box Set', 'Rich Dad Poor Dad', 'The Subtle Art of Not Giving a F*ck'],
            'Groceries' => ['Organic Almond Milk', 'Nestlé Breakfast Cereal', 'Tropicana Orange Juice', 'Folgers Coffee Beans', 'Heinz Tomato Ketchup'],
            'Furniture' => ['IKEA Wooden Table', 'Modern Leather Sofa', 'Minimalist Bookshelf', 'Ergonomic Office Chair', 'King Size Bed Frame'],
            'Musical Instruments' => ['Yamaha Acoustic Guitar', 'Roland Digital Piano', 'Fender Electric Guitar', 'Casio Keyboard', 'Pearl Drum Set'],
            'Pet Supplies' => ['Royal Canin Dog Food', 'Tetra Aquarium Filter', 'Cat Scratching Post', 'Pet Grooming Kit', 'Rabbit Cage with Feeder'],
            'Gaming' => ['Gaming Mouse', 'Mechanical Keyboard', 'Gaming Monitor', 'Gaming Headset', 'RGB Mouse Pad'],
            'Musical Instruments' => ['Yamaha Acoustic Guitar', 'Roland Digital Piano', 'Fender Electric Guitar', 'Casio Keyboard', 'Pearl Drum Set'],
            'Pet Supplies' => ['Royal Canin Dog Food', 'Tetra Aquarium Filter', 'Cat Scratching Post', 'Pet Grooming Kit', 'Rabbit Cage with Feeder'],
            'Office Supplies' => ['Ballpoint Pens', 'Notebook', 'Office Chair', 'Stapler', 'Desk Lamp'],
            'Gardening Tools' => ['Garden Shovel', 'Watering Can', 'Pruning Shears', 'Lawn Mower', 'Plant Pots'],
        ];

        $productName = $productNames[$category->name][array_rand($productNames[$category->name])];

        return [
            'name' => $productName,
            'category_id' => $category->id,
            'supplier_id' => $supplier->id,
        ];
    }
}
