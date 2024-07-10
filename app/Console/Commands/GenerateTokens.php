<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;
use DB;

class GenerateTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:tokens';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate user tokens for API access';

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
        $this->info('Generating Tokens');

        $users = DB::table('PharmacyUser')->get();

        $tokens = [];
        $new_token = '';

        foreach($users as $user){
            $new_token = Str::random(32);

            while (in_array($new_token, $tokens)) {
                $new_token = Str::random(32);
            }

            $token = $new_token;

            DB::table('PharmacyUser')->where('id', $user->id)->update(
                [
                    'token' => $new_token
                ]
            );
        }

        $this->info('Done');
    }
}
