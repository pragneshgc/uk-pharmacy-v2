<?php

namespace App\Http\Controllers;

use DomPDF;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\PrescriptionFile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;


class DownloadController extends Controller
{
    /**
     * Download the printer file
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function printer()
    {
        return response()->download(storage_path("app/executables/4sm-printer Setup 0.3.0.exe"));
    }

    /**
     * Download a blank pathology form PDF
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function blankPathologyForm(Request $request)
    {
        // $editable = false;


        // $snappy = \App::make('snappy.pdf');
        // //To file
        // $html = '<h1>Bill</h1><p>You owe me money, dude.</p>';
        // // $snappy->generateFromHtml($html, 'bill-123.pdf');
        // // $snappy->generate('http://www.github.com', '/github.pdf');
        // // return $snappy->stream(); // stream pdf file
        // //Or output:
        // return new \Response(
        //     $snappy->getOutputFromHtml($html),
        //     200,
        //     array(
        //         'Content-Type'          => 'application/pdf',
        //         'Content-Disposition'   => 'attachment; filename="file.pdf"'
        //     )
        // );

        // $view = \View::make('pathology_form', compact('editable'))->render();
        // $command = '%s --headless --disable-gpu --print-to-pdf=%s %s 2>&1';
        // $binary = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";

        // $process = new Process(sprintf(
        //     $command,
        //     escapeshellarg($binary),
        //     escapeshellarg($path = tempnam(sys_get_temp_dir(), Str::random())),
        //     'https://esa-pharmacist.test/view/form'
        // ));

        // $process->mustRun();

        // $file = \File::get($path);

        // return response($file, 200)->withHeaders([
        //     'Content-Type' => 'application/pdf',
        //     'Content-Disposition' => ($request->has('download') ? 'attachment' : 'inline') . "; filename='form.pdf'",
        // ]);

        // $pdf = \App::make('snappy.pdf.wrapper');
        // $html = view('pathology_form', compact('editable'))->render();
        // $pdf->loadHTML($html);
        // return $pdf->inline();

        // $pdf = DomPDF::setOptions(['dpi' => 80])->loadView('pathology_form', compact('editable')); //load view page
        // return $pdf->stream(); // stream pdf file

        return response()->download(public_path("form.pdf"));
    }

    /**
     * Download a test OCS file for JVM
     *
     * @return \Illuminate\Http\Response
     */
    public function downloadOcs(): Response
    {
        $ids = [718038, 718375, 718366, 718356, 717912, 718563, 718617, 718493];

        $text = '';

        foreach ($ids as $id) {
            $prescription = DB::table('Prescription AS p')->selectRaw('p.*, d.Name AS DName, d.Surname AS DSurname')->where('PrescriptionID', $id)
                ->leftJoin('Doctor AS d', 'd.DoctorID', '=', 'p.DoctorID')
                ->first();
            $products = DB::table('Product AS p')->select('pc.*', 'im.GTIN')->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'p.Code')
                ->leftJoin('InventoryMatch AS im', 'im.ProductCodeID', '=', 'pc.ProductCodeID')->where('PrescriptionID', $id)->first();
            $text .= "$prescription->Name,$prescription->Surname,UNIT 18 WATERS MEETING BRITANNIA WAY BOLTON BL2 2HH UNITED KINGDOM,$prescription->DName $prescription->DSurname,$id,test,020,0848,08:00,201220,201220;\r\n";
        }

        // $content = "Logs \n";
        // foreach ($logs as $log) {
        // $content .= $logs->id;
        // $content .= "\n";
        // }

        // file name that will be used in the download

        // use headers in order to generate the download
        $headers = [
            'Content-type' => 'text/plain',
            'Content-Disposition' => sprintf('attachment; filename="%s"', "test" . time() . ".txt"),
            'Content-Length' => strlen($text)
        ];

        // make a response, with the content, a 200 response code and the headers
        return \Response::make($text, 200, $headers);
    }

    /**
     * View a blank pathology form PDF
     *
     * @return \Illuminate\Http\Response
     */
    public function viewBlankPathologyForm()
    {
        $editable = true;

        return response()->view('pathology_form', compact('editable'));
    }

    /**
     * View a blank pathology form PDF
     *
     * @return \Illuminate\Http\Response
     */
    public function viewBlankPrescription()
    {
        $prescription = [];
        return response()->view('prescription', compact('prescription'));
    }

    /**
     * Download a prescription XML
     *
     * @param int $id
     * @return JsonResponse|\Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function downloadXML($id)
    {
        $prescription = DB::table('Prescription')->where('PrescriptionID', $id)->first();

        $filename = $prescription->PrescriptionID . '-Ref-' . $prescription->ReferenceNumber . '--' . $prescription->CreatedDate . '.xml';
        //$filename = $prescription->PrescriptionID . '-Ref-' . $prescription->ReferenceNumber . '.xml';
        return downloadRemoteFile("xml/$filename", $filename);
        if (Storage::disk('azure')->exists("xml/$filename")) {
            return downloadRemoteFile("xml/$filename", $filename);
        } else {
            //find file
            $file = getXMLFromStorage($prescription->PrescriptionID);

            if (!$file) {
                return $this->sendError("Failed to fetch XML File", ['Failed to fetch XML File']);
            } else {
                if (isAzureStorageEnabled()) {
                    return downloadRemoteFile($file, $filename);
                } else {
                    $headers = [
                        "Content-Type: text/xml",
                        "Cache-Control: public",
                    ];
                    return response()->download($file, $filename, $headers);
                }
            }
        }
    }

    public function downloadFile($id)
    {
        $file = PrescriptionFile::where('prescription_id', $id)->latest()->first();
        if ($file) {
            $path = $file['file_path'];
            $filename = explode('/', $path);
            return downloadRemoteFile($file['file_path'], $filename[1]);
        } else {
            return $this->downloadXML($id);
        }
    }

    /**
     * Download a product import template
     *
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    public function importTemplate()
    {
        return response()->download(public_path("product_import_template.xls"));
    }
}
