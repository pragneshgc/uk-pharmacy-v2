<?php

namespace App\Services;

class Pdf
{
    /**
     * The command.
     *
     * @var string
     */
    //protected $command = '%s --headless --disable-gpu --print-to-pdf=%s %s';
    protected $command = '%s --headless --disable-gpu --print-to-pdf=%s %s 2>&1';

    /**
     * Render the prescription PDF file
     *
     * @param int $id
     * @param string $url
     * @return void
     */
    public function render(int $id, string $url, string $type = 'pdf')
    {
        $path = storage_path() . "/app/$type/$id.pdf";

        $command = sprintf(
            $this->command,
            escapeshellarg(config('app.chrome')),
            escapeshellarg($path),
            $url
        );
        exec($command);
    }

    public function execute(int $id, $url)
    {
        $path = storage_path() . "/app/pdf/$id.pdf";
        $file = fopen($path, 'w') or die("can't open file");

        $command = sprintf(
            $this->command,
            escapeshellarg(config('app.chrome')),
            escapeshellarg($path),
            escapeshellarg(rawurlencode($url))
        );
        exec($command);
        fclose($file);
    }
}
