<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class PharmacyuserTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('PharmacyUser')->truncate();

        DB::table('PharmacyUser')->insert(
            [
                [
                    'code' => 'lE6uvQLy][4dgo',
                    'created_at' => date('Y-m-d H:i:s'),
                    'default_app' => 'pharmacy',
                    'deleted_at' => NULL,
                    'email' => 'admin@goodcareit.com',
                    'esa_user_id' => 90,
                    'inventory_role' => 60,
                    'last_login_at' => NULL,
                    'name' => 'Admin',
                    'password' => Hash::make('password'),
                    'remember_token' => 'NLZoOSnj1ObGfwuylikX3FpszKslp5f65TNlgWxNlOE8eWOGA99LAr8Sfhaj',
                    'role' => 60,
                    'shipping_role' => 60,
                    'pharmacy_role_id' => 2,
                    'inventory_role_id' => 2,
                    'shipping_role_id' => 2,
                    'surname' => 'System',
                    'token' => 'ZfHilO9u224bxglBdLiCh3ZaVSWKMIUY',
                    'two_factor_secret' => NULL,
                    'updated_at' => date('Y-m-d H:i:s'),
                    'viewing' => '',
                ],
                [
                    'code' => 'POwsoW3o6rOddF',
                    'created_at' => date('Y-m-d H:i:s'),
                    'default_app' => 'pharmacy',
                    'deleted_at' => NULL,
                    'email' => 'admin@treated.com',
                    'esa_user_id' => 91,
                    'inventory_role' => 50,
                    'last_login_at' => NULL,
                    'name' => 'Staff',
                    'password' => Hash::make('password'),
                    'remember_token' => 'JbPKfoo0D4Q3oAePXc9HaPOpdnQ4Vlu5Y1iEVYhF6Z2mMaHieQxtjlQUs7W5',
                    'role' => 50,
                    'shipping_role' => 50,
                    'pharmacy_role_id' => 1,
                    'inventory_role_id' => 1,
                    'shipping_role_id' => 1,
                    'surname' => 'User',
                    'token' => 'NrkjAdf68g9cuSfxlZ8jdUllevP8aLek',
                    'two_factor_secret' => NULL,
                    'updated_at' => date('Y-m-d H:i:s'),
                    'viewing' => '',
                ],
            ]
        );
    }
}