<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class Test extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test';

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
        $i = 0;
        $lastPrescriptionID = DB::table('Prescription')->latest('PrescriptionID')->value('PrescriptionID');

        while ($i <= $lastPrescriptionID) {
            $prescription = DB::table('Prescription')->where('PrescriptionID', $i)
            ->where('CustomerID', '=', 0)
            ->first();

            if($prescription){
                echo $i.'/'.$lastPrescriptionID.' - '.$prescription->Name.' '.$prescription->Surname.PHP_EOL;

                $matchingPrescriptionsCount = DB::table('Prescription')->whereRaw("Name = ? AND Surname = ? AND DOB = ? AND Sex = ?", 
                [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])
                ->where('PrescriptionID', '!=', $i)
                ->count();

                $customer = [
                    'Name' => $prescription->Name,
                    'Surname' => $prescription->Surname,
                    'DOB' => $prescription->DOB,
                    'Sex' => $prescription->Sex,
                    'Postcode' => $prescription->Postcode,
                    'CountryID' => $prescription->CountryCode,
                    'DPostcode' => $prescription->DPostcode,
                    'DCountryID' => $prescription->DCountryCode,
                    'Mobile' => $prescription->Mobile,
                    'Email' => $prescription->Email,
                    'Telephone' => $prescription->Telephone,
                    'CreatedDate' => time(),
                    'Address1' => $prescription->Address1,
                    'Address2' => $prescription->Address2,
                    'Address3' => $prescription->Address3,
                    'Address4' => $prescription->Address4,
                    'DAddress1' => $prescription->DAddress1,
                    'DAddress2' => $prescription->DAddress2,
                    'DAddress3' => $prescription->DAddress3,
                    'DAddress4' => $prescription->DAddress4,
                ];

                $newCustomer = DB::table('Customer')->insert($customer);  

                $customerId = DB::getPdo()->lastInsertId();                

                if($matchingPrescriptionsCount > 0){
                    $matchingPrescriptions = DB::table('Prescription')->whereRaw("Name = ? AND Surname = ? AND DOB = ? AND Sex = ?", 
                    [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])
                    ->update(['CustomerID' => $customerId, 'CustomerMatch' => 4]);
                }

                //search for partial
                $matchingPrescriptionsCount = DB::table('Prescription')->whereRaw("(Name = ? OR Surname = ?) AND DOB = ? AND Sex = ?", 
                [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])
                ->where('PrescriptionID', '!=', $i)
                ->where('CustomerID', 0)
                ->count();     
                
                if($matchingPrescriptionsCount > 0){
                    $matchingPrescriptions = DB::table('Prescription')->whereRaw("(Name = ? OR Surname = ?) AND DOB = ? AND Sex = ?", 
                    [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])
                    ->where('PrescriptionID', '!=', $i)
                    ->where('CustomerID', 0)                    
                    ->update(['CustomerID' => $customerId, 'CustomerMatch' => 3]);
                }
            } else {
                echo $i.'/'.$lastPrescriptionID.' - not found'.PHP_EOL;    
            }

            $i++;
        }
    }
}
