<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('modules')->insert([
            ['name' => 'Clients'],
            ['name' => 'Logs'],
            ['name' => 'Blacklist'],
            ['name' => 'Labels'],
            ['name' => 'Overview'],
            ['name' => 'Invoices'],
            ['name' => 'FMD'],
            ['name' => 'Inventory Logs'],
            ['name' => 'Manual Printing'],
            ['name' => 'Import Tracking'],
            ['name' => 'Shipping Reports'],
        ]);
    }
}
