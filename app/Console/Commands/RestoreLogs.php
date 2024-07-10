<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class RestoreLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'restore:logs';

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
        $input = 'clean_pxp_sql.sql';
        $file = Storage::disk('logs')->get($input);
        $logArray = [];
        $line = strtok($file, "\r\n");
        $previousLine = null;

        while ($line !== false) {
            $logArray[] = $line;

            $line = strtok("\r\n");

            $hasMatch = preg_match('/\[(.*?)\] ;/',$line, $match);
            $split = preg_split('/\[(.*?)\] ;/',$line);

            if($hasMatch && isset($match[1]) && isset($split[0])){
                $bindings = json_decode( "[$match[1]]", true );

                for ($i=0; $i < count($bindings); $i++) { 
                    if(strpos($bindings[$i], '[object] (SimpleXMLElement:') !== false){
                        $bindings[$i] = utf8_decode(trim(str_replace(['[object] (SimpleXMLElement:', ')'], '', $bindings[$i])));
                    }

                    if(is_string($bindings[$i])){
                        $bindings[$i] = '"'.str_replace('"', "'", $bindings[$i]).'"';
                    }

                    if($bindings[$i] === null){
                        $bindings[$i] = 'NULL';
                    }
                    
                    if($bindings[$i] === false){
                        $bindings[$i] = 0;
                    }
                }

                $sql = trim($split[0]);
                $replaced = vsprintf(str_replace('?', '%s', $sql), $bindings).';';
                
                if(File::exists(storage_path('logs/restore_pxp.sql'))){
                    File::append(storage_path('logs/restore_pxp.sql'), $replaced . PHP_EOL);
                } else {
                    File::put(storage_path('logs/restore_pxp.sql'), $replaced . PHP_EOL);
                }
            } else {
                dd($line, $previousLine);
            }

            $previousLine = $line;
        }

        $logArray = array_reverse($logArray);

        dd($logArray);
    }
}
