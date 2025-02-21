<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Supplier>
 */
class SupplierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $suppliers = [
            'Samsung Electronics', 'Apple Inc.', 'Sony Corporation', 'Logitech International', 'Canon Inc.', // Electronics
            'Nike Inc.', 'Adidas Global', 'Puma International', 'Gucci Fashion', 'Levi’s Co.', // Fashion
            'Philips Home', 'LG Appliances', 'Sharp Corporation', 'Panasonic Systems', 'Samsung Home', // Home Appliances
            'L’Oréal Paris', 'Dove Cosmetics', 'Maybelline New York', 'Nivea Skincare', 'Neutrogena Beauty', // Health & Beauty
            'Wilson Sporting Goods', 'Decathlon Sports', 'Adidas Sports', 'Nike Sports', 'Puma Training', // Sports & Outdoors
            'Lego Group', 'Mattel Toys', 'Hasbro Games', 'Nintendo Co.', 'Monopoly Board Games', // Toys & Games
            'Michelin Tires', 'Mobil 1 Lubricants', 'Bosch Automotive', 'Yamaha Motors', 'Thule Car Accessories', // Automotive
            'Penguin Books', 'HarperCollins', 'Scholastic', 'Macmillan Publishers', 'Simon & Schuster', // Books
            'Nestlé Food', 'Tropicana Beverages', 'Folgers Coffee', 'Heinz Condiments', 'Organic Farms', // Groceries
            'IKEA Furniture', 'Ashley HomeStore', 'Wayfair Home', 'Minimalist Designs', 'Ergo Chairs', // Furniture
            'Yamaha Music', 'Roland Instruments', 'Fender Guitars', 'Casio Keyboards', 'Pearl Drums', // Musical Instruments
            'Royal Canin', 'Tetra Pet Supplies', 'PetSmart Accessories', 'Purina Pet Food', 'Zoo Med Reptile', // Pet Supplies
            'Razer Gaming', 'Corsair Gaming', 'MSI Gaming', 'HyperX Accessories', 'SteelSeries Gear', // Gaming
            'Staples Office', 'Office Depot', '3M Office Supplies', 'Fellowes Products', 'Duracell Office', // Office Supplies
            'Fiskars Gardening', 'Husqvarna Tools', 'John Deere Lawn', 'Gardena Equipment', 'Stanley Tools' // Gardening Tools
        ];

        return [
            'name' => fake()->unique()->randomElement($suppliers),
        ];
    }
}
