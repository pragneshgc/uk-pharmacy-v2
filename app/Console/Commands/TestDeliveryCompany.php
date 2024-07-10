<?php

namespace App\Console\Commands;

use App\Library\Order;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class TestDeliveryCompany extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:deliverycompany';

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
        $this->info('Checking');
        $o = new Order;

        $orders = DB::table('Prescription')->where('PrescriptionID', '>', 500000)->where('PrescriptionID', '<', 510000)->get();

        foreach ($orders as $order) {
            $this->info($order->DeliveryID);
            $this->info($o->getDeliveryCompany($order->PrescriptionID, false, true)['DeliveryID']);
            $this->info('-------------------');
        }
    }
}
