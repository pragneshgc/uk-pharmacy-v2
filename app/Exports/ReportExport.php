<?php

namespace App\Exports;

use Generator;
use Illuminate\Contracts\Support\Responsable;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromGenerator;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ReportExport implements FromGenerator, Responsable, WithHeadings
{
    use Exportable;
    private $fileName = 'report.csv';
    private $writerType = Excel::CSV;
    private $headers = [
        'Content-Type' => 'text/csv',
    ];
    private $chunk_size = 1000;
    public function __construct(protected array $headings, protected array $data)
    {
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function generator(): Generator
    {
        foreach (array_chunk($this->data, $this->chunk_size) as $data) {
            yield $data;
        }
    }
}
