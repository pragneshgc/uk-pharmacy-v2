<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class RandomizePrescriptions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'randomize:prescription';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Randomize all prescription data, except product information';

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
        if (config('app.env') != 'production') {
            $count = DB::table('Prescription')->count();
            $counter = 0;
            $bar = $this->output->createProgressBar($count);
            $bar->start();

            $prescriptions = DB::table('Prescription')->where('PrescriptionID', '>', 700000)
                ->limit(10000)->get();

            while (!$prescriptions->isEmpty()) {
                foreach ($prescriptions as $prescription) {
                    $faker = \Faker\Factory::create();

                    $update = [
                        'Name' => $prescription->Sex == 1 ? $faker->firstNameMale : ($prescription->Sex == 2 ? $faker->firstNameFemale : $faker->firstName),
                        'Surname' => $faker->lastName,
                        'Address1' => $faker->streetAddress,
                        'Address2' => '',
                        'Address3' => $faker->city,
                        'Address4' => '',
                        'Postcode' => $faker->postcode,
                        'DAddress1' => '',
                        'DAddress2' => '',
                        'DAddress3' => '',
                        'DAddress4' => '',
                        'DPostcode' => '',
                        'Telephone' => $faker->e164PhoneNumber,
                        'Mobile' => $faker->e164PhoneNumber,
                        'Email' => $faker->email,
                    ];

                    $update['DAddress1'] = $update['Address1'];
                    $update['DAddress3'] = $update['Address3'];
                    $update['DPostcode'] = $update['Postcode'];

                    if (in_array($counter, [0, 394, 584, 889, 1938, 3584, 5948, 8499, 9901])) {
                        $update['DAddress1'] = $faker->streetAddress;
                        $update['DAddress3'] = $faker->city;
                        $update['DPostcode'] = $faker->postcode;
                    }

                    $update = DB::table('Prescription')->where('PrescriptionID', $prescription->PrescriptionID)->update($update);

                    $counter++;
                    $bar->advance();
                }

                //$prescriptions = DB::table('Prescription')->where('PrescriptionID', '>', $prescription->PrescriptionID)->limit(10000)->get();
                //$counter = 0;
            }

            $bar->finish();

            $this->info('---------------------------------------------------------');
            $this->info('FINISHED');
        } else {
            $this->info('Not allowed to run script if app is set to production env.');
        }
    }
}