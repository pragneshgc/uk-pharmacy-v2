<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class ImportEveAdamUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:eveadamusers';

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
        $records = file(storage_path('app\eveadamusers.csv'), FILE_IGNORE_NEW_LINES);

        foreach ($records as $record) {
            $pair = explode(',',$record);

            $result = DB::table('Prescription')->where('ReferenceNumber', $pair[0])->where('UserID', 0)->where('ClientID', 51)
            ->update(['UserID' => $pair[1]]);

            if($result){
                $this->info("Updated reference number $pair[0]");
            }
        }
    }
}
