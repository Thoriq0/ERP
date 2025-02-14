<?php

namespace Database\Seeders;

use App\Models\Inbound;
use App\Models\Outbound;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{   
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();
        Inbound::factory(8)->create();
        Outbound::factory(8)->create();
    }
}
