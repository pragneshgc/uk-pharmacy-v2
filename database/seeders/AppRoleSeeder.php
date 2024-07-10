<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AppRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('app_role')->insert([
            ['app_id' => 1, 'role_id' => 1],
            ['app_id' => 1, 'role_id' => 2],
            ['app_id' => 1, 'role_id' => 3],
            ['app_id' => 1, 'role_id' => 4],
            ['app_id' => 1, 'role_id' => 5],
            ['app_id' => 1, 'role_id' => 6],
            ['app_id' => 1, 'role_id' => 7],
            ['app_id' => 1, 'role_id' => 9],
            ['app_id' => 1, 'role_id' => 10],
            ['app_id' => 1, 'role_id' => 11],
            ['app_id' => 1, 'role_id' => 12],
            ['app_id' => 1, 'role_id' => 13],

            ['app_id' => 2, 'role_id' => 1],
            ['app_id' => 2, 'role_id' => 2],
            ['app_id' => 2, 'role_id' => 4],
            ['app_id' => 2, 'role_id' => 6],
            ['app_id' => 2, 'role_id' => 7],
            ['app_id' => 2, 'role_id' => 8],
            ['app_id' => 2, 'role_id' => 10],
            ['app_id' => 2, 'role_id' => 12],
            ['app_id' => 2, 'role_id' => 13],
            ['app_id' => 2, 'role_id' => 14],

            ['app_id' => 3, 'role_id' => 1],
            ['app_id' => 3, 'role_id' => 2],
            ['app_id' => 3, 'role_id' => 4],
            ['app_id' => 3, 'role_id' => 6],
            ['app_id' => 3, 'role_id' => 7],
            ['app_id' => 3, 'role_id' => 10],
            ['app_id' => 3, 'role_id' => 12],
            ['app_id' => 3, 'role_id' => 13],
        ]);
    }
}