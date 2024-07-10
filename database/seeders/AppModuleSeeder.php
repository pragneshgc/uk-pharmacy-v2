<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AppModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('app_module')
            ->insert([
                ['app_id' => 1, 'module_id' => 1, 'status' => 1],
                ['app_id' => 1, 'module_id' => 2, 'status' => 1],
                ['app_id' => 1, 'module_id' => 3, 'status' => 1],
                ['app_id' => 1, 'module_id' => 4, 'status' => 1],
                ['app_id' => 1, 'module_id' => 5, 'status' => 1],
                ['app_id' => 1, 'module_id' => 6, 'status' => 1],

                ['app_id' => 2, 'module_id' => 7, 'status' => 1],
                ['app_id' => 2, 'module_id' => 8, 'status' => 1],

                ['app_id' => 3, 'module_id' => 9, 'status' => 1],
                ['app_id' => 3, 'module_id' => 10, 'status' => 1],
                ['app_id' => 3, 'module_id' => 11, 'status' => 1],
            ]);
    }
}