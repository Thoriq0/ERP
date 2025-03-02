<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Inbound;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Category;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{   
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(12)->create();
        Category::factory(15)->create();
        Supplier::factory(15)->create();
        Product::factory(30)->create();
        // Inbound::factory(8)->create();
        // Outbound::factory(8)->create();

        $users = [
            ['name' => 'admin', 'email' => 'admin@admin.com', 'role' => 'admin'],
            ['name' => 'wrhs', 'email' => 'wrhs@wrhs.com', 'role' => 'wrhs'],
            ['name' => 'fnc', 'email' => 'fnc@fnc.com', 'role' => 'fnc'],
            ['name' => 'logistik', 'email' => 'logistik@logistik.com', 'role' => 'logistik'],
            ['name' => 'hr', 'email' => 'hr@hr.com', 'role' => 'hr'],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role'],
                'password' => Hash::make('password'),
                'status' => 'active',
            ]);
        }
    }
}
