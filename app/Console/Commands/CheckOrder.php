<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CheckOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'order:decomissioned {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check if an order is decomissioned (0 - not decomissioned, 1 - decomissioned)';

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

        $products = DB::table('Product AS p')
        ->selectRaw("p.Description as Description, p.Code, p.Quantity, p.Dosage, p.ProductID, pc.ProductCodeID, pc.Units")
        ->selectRaw("pc.Quantity AS 'SingleProductDosage'")
        ->selectRaw("(SELECT ii.GTIN FROM InventoryItem ii WHERE pc.ProductCodeID = ii.ProductCodeID LIMIT 1) AS SuggestedBarcode")
        ->selectRaw("(SELECT COUNT(ii.InventoryItemID) FROM InventoryItem ii WHERE ii.ProductCodeID = pc.ProductCodeID AND ii.ProductID IS NULL) AS StoredProducts")
        ->leftJoin('ProductCode AS pc', 'p.Code', '=', 'pc.Code')
        ->where('p.PrescriptionID', '=', $id)->get();

        $notshipped = 0;

        foreach ($products as $product) {
            $product->AttachedProducts = DB::table('InventoryItem')->where('ProductID', $product->ProductID)->where('Status', '!=', 'DESTROYED')
            ->orderBy('Quantity', 'DESC')->get();

            // Check if the order is already completed
            if(!$product->AttachedProducts->isEmpty()){
                foreach($product->AttachedProducts as $attached){
                    if($attached->Status != 'SHIPPED'){
                        $notshipped++;
                    }
                }
            } else {
                $notshipped++;
            }
        }

        if($notshipped > 0){
            echo 0; // not decomissioned
        } else {
            echo 1; // decomissioned
        }
    }
}
