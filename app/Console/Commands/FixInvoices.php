<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class FixInvoices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'fix:invoices {id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Enter the invoice ID as argument to add missing pharmacy labels';

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

        $this->info('Starting');

        if(!DB::table('Invoice')->where('InvoiceID', $id)->where('Status', 0)->exists()){
            $this->info("No incomplete invoice with id $id exists");
            
            return;
        }

        $invoiceItems = DB::table('InvoiceItem')->select(['ItemID', 'PrescriptionID','ProductID'])->where('UnitCost', 0)
        ->where('InvoiceID', $id)->get();

        foreach ($invoiceItems as $item) {
            $this->info('Processing '.$item->PrescriptionID);

            $product = DB::table('Product')->select('Product.*', 'ProductCode.Name', 'ProductCode.Units', 'ProductCode.Quantity AS ProductCodeQuantity')
            ->leftJoin('ProductCode', 'ProductCode.Code', '=', 'Product.Code')
            ->where('ProductID', $item->ProductID)->first();

            if(!DB::table('PharmacyLabel')->where('ProductID', $product->ProductID)->first()){
                $quantity = (int) $product->Dosage * (int) $product->Quantity;
                $remainder = $quantity % (int) $product->ProductCodeQuantity;
                $oddPack = false;

                if($quantity < $product->ProductCodeQuantity || $remainder != 0){
                    $oddPack = true;
                }

                $labelCount = ceil($quantity / (int) $product->ProductCodeQuantity);

                for ($i=0; $i < $labelCount; $i++) { 
                    $insert = [
                        'ProductID' => $product->ProductID,
                        'Instruction' => explode(';', $product->Instructions)[0],
                        'Pack' => 1,
                        'Type' => 1,
                        'Status' => 1,
                        'Code' => $product->Code,
                    ];

                    if($oddPack){
                        $insert['Dosage'] = $remainder;
                        $insert['Description'] = $product->Name . ' ' . $remainder . ' ' . $product->Units;
                    } else {
                        $insert['Dosage'] = $product->ProductCodeQuantity;
                        $insert['Description'] = $product->Name . ' ' . $product->ProductCodeQuantity . ' ' . $product->Units;
                    }

                    DB::table('PharmacyLabel')->insert($insert);
                }
            }

            //clean out the item so regenerating invoices is easier
            DB::table('InvoiceItem')->where('ItemID', $item->ItemID)->delete();
        }

        $this->info('---------------------------------------------------------');
        $this->info('FINISHED');    
    }
}
