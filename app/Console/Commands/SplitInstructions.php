<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SplitInstructions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'instructions:split';

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
        $count = DB::table('Product')->count();
        $bar = $this->output->createProgressBar($count);
        $bar->start();

        $instructions = DB::table('Product')->select(['ProductID', 'Instructions', 'Instructions2'])->limit(10000)->get();

        while (!$instructions->isEmpty()) {
            foreach ($instructions as $instruction) {
                $array = explode(';', $instruction->Instructions);

                $update = [
                    'Instructions' => $array[0],
                ];

                if ($instruction->Instructions2 == NULL) {
                    $update['Instructions2'] = isset($array[1]) ? $array[1] : '';
                }

                $update = DB::table('Product')->where('ProductID', $instruction->ProductID)->update($update);

                $bar->advance();
            }

            //$instructions = DB::table('Product')->where('ProductID', '>', $instruction->ProductID)->limit(10000)->get();
        }

        $bar->finish();

        $this->info('---------------------------------------------------------');
        $this->info('FINISHED');
    }
}