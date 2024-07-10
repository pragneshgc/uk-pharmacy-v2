<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(CountryTableSeeder::class);
        $this->call(ClientTableSeeder::class);
        $this->call(SettingTableSeeder::class);

        $this->call(AppSeeder::class);
        $this->call(RoleSeeder::class);
        $this->call(ModuleSeeder::class);
        $this->call(AppRoleSeeder::class);
        $this->call(AppModuleSeeder::class);

        $this->call(PharmacyuserTableSeeder::class);
    }
}
