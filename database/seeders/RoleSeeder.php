<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('roles')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        DB::table('roles')->insert([
            ['name' => 'Admin', 'value' => 50],
            ['name' => 'Sysadmin', 'value' => 60],
            ['name' => 'Product Management', 'value' => 4],
            ['name' => 'Shipping', 'value' => 5],
            ['name' => 'Locum Dispenser (invoice)', 'value' => 6],
            ['name' => 'Locum Dispenser', 'value' => 19],
            ['name' => 'PXP', 'value' => 10],
            ['name' => 'Dispenser', 'value' => 20],
            ['name' => 'Senior Dispenser', 'value' => 25],
            ['name' => 'Locum Pharmacist', 'value' => 29],
            ['name' => 'Pharmacist', 'value' => 30],
            ['name' => 'Superintendent Pharmacist', 'value' => 35],
            ['name' => 'Customer Service', 'value' => 40],
            ['name' => 'Not Allowed', 'value' => 0]
        ]);
    }
}