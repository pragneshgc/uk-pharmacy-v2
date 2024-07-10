<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Pdf;

class GeneratePDF extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate:pdf';

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
        $pdf = new Pdf;
        $pdf->render(800007, 'https://esa-pharmacist.test/prescription/800007/view?token=TpgfcEjr82pQKaE2dMtsRNIwhMuTyFNt');
    }
}
