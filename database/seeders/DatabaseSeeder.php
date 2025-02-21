<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Inbound;
use App\Models\Category;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Outbound;
use App\Models\Supplier;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{   
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Category::factory(10)->create();
        Supplier::factory(10)->create();
        // Inbound::factory(8)->create();
        // Outbound::factory(8)->create();
    }
}
