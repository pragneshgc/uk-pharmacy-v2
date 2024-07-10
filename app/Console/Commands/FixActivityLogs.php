<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixActivityLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'activity:fix-users {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Fix user id references in activity logs';

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
        $id = $this->argument('id');

        $count = DB::table('Activity')->where('ActivityID', '>=', $id)->count();
        $counter = 0;
        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $activities = DB::table('Activity')->where('ActivityID', '>=', $id)->limit(10000)->get();

        while (!$activities->isEmpty()) {
            foreach ($activities as $activity) {
                //fix users
                $user = DB::table('User')->where('UserID', $activity->UserID)->first();

                if (!$user) {
                    $pUser = DB::table('PharmacyUser')->where('id', $activity->UserID)->first();

                    if (!$pUser) {
                        continue;
                    }

                    $user = DB::table('User')->where('UserID', $pUser->esa_user_id)->first();
                }

                if (($user->Name . ' ' . $user->Surname) != $activity->Name) {
                    //now get the real user
                    $realUser = DB::table('User')->whereRaw("CONCAT(Name, ' ', Surname) = ?", [$activity->Name])->first();

                    DB::table('Activity')->where('ActivityID', $activity->ActivityID)->update([
                        'UserID' => $realUser->UserID
                    ]);
                }

                $counter++;
                $bar->advance();
            }

            //$activities = DB::table('Activity')->where('ActivityID', '>', $activity->ActivityID)->limit(10000)->get();
            //$counter = 0;
        }

        $bar->finish();

        $this->info('---------------------------------------------------------');
        $this->info('FINISHED');
    }
}