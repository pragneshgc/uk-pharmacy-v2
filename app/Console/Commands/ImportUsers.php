<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ImportUsers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'import:users {start} {end}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import customers (users) from the prescriptions';

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
        $start = $this->argument('start');
        $end = $this->argument('end');

        $count = DB::table('Prescription')->where('PrescriptionID', '>', $start)->where('PrescriptionID', '<=', $end)->count();
        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $prescriptions = DB::table('Prescription')->select(['PrescriptionID', 'Name', 'Surname', 'DOB', 'Sex', 'CreatedDate'])
        ->where('PrescriptionID', '>', $start)->where('PrescriptionID', '<=', $end)/*->limit(10000)->get()*/;

        // while(!$prescriptions->isEmpty()){
            foreach($prescriptions->cursor() as $prescription){
                $existingCustomer = DB::table('CustomerPrescriptions')->whereRaw("
                (Name LIKE CONCAT('%', ?, '%') OR Surname LIKE CONCAT('%', ?, '%'))
                AND DOB LIKE CONCAT('%', ?, '%')
                AND Sex LIKE CONCAT('%', ?, '%')
                ", [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])->first();

                if(!$existingCustomer){
                    $customerId = DB::table('CustomerPrescriptions')->insertGetId([
                        'Name' => $prescription->Name,
                        'Surname' => $prescription->Surname,
                        'DOB' => $prescription->DOB,
                        'Sex' => $prescription->Sex,
                        'CreatedDate' => $prescription->CreatedDate,
                        'ModifiedDate' => time(),
                        'AccessedDate' => time(),
                        'Prescriptions' => $prescription->PrescriptionID,
                    ]);

                    DB::table('Prescription')->where('PrescriptionID', $prescription->PrescriptionID)->update(['CustomerID' => $customerId]);
                } else {
                    if(!in_array($prescription->PrescriptionID, explode(',',$existingCustomer->Prescriptions))){
                        DB::table('CustomerPrescriptions')->where('CustomerPrescriptionID', $existingCustomer->CustomerPrescriptionID)->update([
                            'Prescriptions' => "$existingCustomer->Prescriptions,$prescription->PrescriptionID",
                        ]);
                    }

                    DB::table('Prescription')->where('PrescriptionID', $prescription->PrescriptionID)->update([
                        'CustomerID' => $existingCustomer->CustomerPrescriptionID
                    ]);
                }

                $bar->advance();
            }

            // $prescriptions = DB::table('Prescription')->where('PrescriptionID', '>', $prescription->PrescriptionID)->limit(10000)->get();
        // }
        $bar->finish();

        $this->info('---------------------------------------------------------');
        $this->info('FINISHED');        
    }
}
