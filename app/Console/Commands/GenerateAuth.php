<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class GenerateAuth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:2fa';

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
        $this->info('Generating 2fa authentications');

        $users = DB::table('PharmacyUser')->where('email', '!=', 'tposcic@gmail.com')->get();

        foreach($users as $user){
            if(!DB::table('password_securities')->where('user_id', $user->id)->exists()){
                $google2fa = app('pragmarx.google2fa');

                DB::table('password_securities')->insert(
                    [
                        'user_id' => $user->id,
                        'google2fa_enable' => 1,
                        'google2fa_secret' => $google2fa->generateSecretKey(),
                    ]
                );
            }
        }

        $this->info('Done');
    }
}
