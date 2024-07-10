<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateUserRoles extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:user-roles';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $inventoryUsers = DB::table('InventoryUser')->get();
        $shippingUsers = DB::table('PxpUser')->get();

        foreach ($inventoryUsers as $user) {
            if(DB::table('PharmacyUser')->where('email', $user->email)->exists()){
               DB::table('PharmacyUser')->where('email', $user->email)->update(['inventory_role' => $user->role]);
            } else {
                DB::table('PharmacyUser')->insert([
                    'esa_user_id' => $user->esa_user_id,
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'default_app' => 'inventory',
                    'email' => $user->email,
                    'role' => 0,
                    'password' => $user->password,
                    'code' => $user->code,
                    'token' => $user->token,
                    'created_at' => $user->created_at,
                    'last_login_at' => $user->last_login_at,
                    'inventory_role' => $user->role,
                    'shipping_role' => 0,
                ]);
            }
        }

        foreach ($shippingUsers as $user) {
            if(DB::table('PharmacyUser')->where('email', $user->email)->exists()){
               DB::table('PharmacyUser')->where('email', $user->email)->update(['shipping_role' => $user->role]);
            } else {
                DB::table('PharmacyUser')->insert([
                    'esa_user_id' => $user->esa_user_id,
                    'name' => $user->name,
                    'surname' => $user->surname,
                    'default_app' => 'inventory',
                    'email' => $user->email,
                    'role' => 0,
                    'password' => $user->password,
                    'code' => $user->code,
                    'token' => $user->token,
                    'created_at' => $user->created_at,
                    'last_login_at' => $user->last_login_at,
                    'inventory_role' => 0,
                    'shipping_role' => $user->role
                ]);
            }
        }
    }
}
