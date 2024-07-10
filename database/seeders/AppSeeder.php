<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AppSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('apps')->insert([
            ['name' => 'Pharmacy', 'slug' => 'pharmacy'],
            ['name' => 'Inventory', 'slug' => 'inventory'],
            ['name' => 'Shipping', 'slug' => 'shipping'],
        ]);
    }
}
