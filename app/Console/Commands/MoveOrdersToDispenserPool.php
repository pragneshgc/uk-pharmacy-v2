<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MoveOrdersToDispenserPool extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:orders-to-dispenser';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Move orders to dispenser pool';

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
        $orders = [
            758213,
            758214,
            758225,
            758227,
            758228,
            758229,
            758240,
            758245,
            758246,
            758248,
            758252,
            758258,
            758271,
            758279,
            758281,
            758282,
            758283,
            758284,
            758285,
            758289,
            758290,
            758291,
            758294,
            758304,
            758305,
            758306,
            758309,
            758312,
            758310,
            758311,
            758319,
            758315,
            758317,
            758318,
            758320,
            758321,
            758322,
            758323,
            758359,
            758360,
            758361,
            758362,
            758371,
            758372,
            758373,
            758374,
            758387,
            758375,
            758376,
            758377,
            758378,
            758383,
            758384,
            758385,
            758390,
            758391,
            758392,
            758396,
            758397,
            758398,
            758402,
            758403,
            758404,
            758408,
            758409,
            758417,
            758418,
            758421,
            758424,
            758425,
            758427,
            758428,
            758429,
            758430,
            758431,
            758440,
            758441,
            758443,
            758444,
            758447,
            758452,
            758453,
            758454,
            758457,
            758458,
            758459,
            758465                        
        ];

        $status = DB::table('Prescription')->whereIn('PrescriptionID', $orders)->update(['Status' => 2]);
    
        foreach ($orders as $order) {
            $this->info("OrderID $order");
            
            DB::table('DispenserPool')->insert([
                'PrescriptionID' => $order,
                'UserID' => 0,
                'Date' => time(),
                'Type' => 0,
                'Status' => 0
            ]);
        }

        $this->info('---------------------------------------------------------');
        $this->info('FINISHED');    
    }
}
