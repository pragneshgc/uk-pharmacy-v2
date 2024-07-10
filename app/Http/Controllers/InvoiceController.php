<?php

namespace App\Http\Controllers;

use App\Services\Pdf;
use App\Library\Order;
use App\Library\Invoice;
use App\Mail\InvoiceEmail;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as DomPDF;

class InvoiceController extends Controller
{
    private $invoiceStatus = [
        0 => 'INCOMPLETE',
        1 => 'UNPAID',
        2 => 'PAID',
        3 => 'CREDITNOTE',
        4 => 'DELETED',
    ];

    private $invoiceType = [
        0 => 'ESA',
        //only this type is used
        1 => 'PXP',
    ];

    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $invoice = new Invoice();

        $data = $invoice->invoice();
        $data = $invoice->setSearchParameters($this->f, $request, $data);

        if ($this->q != '') {
            $data = $data->where('i.InvoiceID', 'LIKE', "%$this->q%");
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        } else {
            $data = $data->orderBy('i.InvoiceID', 'DESC');
        }

        $data = $data->groupBy(['i.InvoiceID'])->paginate($this->l);

        $invoiceStatus = $this->invoiceStatus;
        $invoiceType = $this->invoiceType;

        $data->transform(function ($item) use ($invoiceStatus, $invoiceType) {
            $item->Status = $invoiceStatus[$item->Status];
            $item->Type = $invoiceType[$item->Type];
            $item->GrossAmount = "&#163;" . $item->GrossAmount;
            $item->AmountReceived = "&#163;" . $item->AmountReceived;
            $item->NetAmount = "&#163;" . $item->NetAmount;
            $item->VAT = "&#163;" . $item->VAT;
            return $item;
        });

        return $this->sendResponse($data);
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateInvoiceStatus($id, Request $request)
    {
        return $this->sendResponse((new Invoice())->updateInvoiceStatus($request->id, $request->status));
    }

    /**
     * Get Invoice Items and details
     *
     * @param int $id
     * @return JsonResponse
     */
    public function invoice($id)
    {
        $invoice = new Invoice();

        $invoiceItems = $invoice->invoiceItems($id)->get();

        $invoiceItems->transform(function ($item) {
            $item->Date = date('d/m/Y', $item->Date);

            return $item;
        });

        return $this->sendResponse([
            'invoice' => $invoice->invoice($id)->first(),
            'invoiceItems' => $invoiceItems
        ]);
    }

    /**
     * Generate Invoice using PrescriptionID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function generateInvoice($id)
    {
        $invoice = new Invoice();

        if ($invoice->generate($id)) {
            return $this->sendResponse('Successfully created invoice item');
        } else {
            return $this->sendError('Error creating invoice (Item already exists or pricing not set properly)');
        }
    }

    /**
     * Preview invoice HTML
     *
     * @param int $id
     * @return \Illuminate\Http\Response|string
     */
    public function previewInvoice($id, Request $request)
    {
        $token = $request->token;

        if (!$token || !(new Invoice())->checkToken($token)) {
            return $this->sendError('Token error');
        }
        return (new Invoice)->previewInvoice($id);
    }

    public function addItem($id, Request $request): JsonResponse
    {
        return $this->sendResponse((new Invoice())->addItem($id, $request));
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param Request $request
     * @return mixed
     */
    public function viewInvoice($id, Request $request)
    {
        //$invoice = $this->invoice($id);
        $token = $request->token;

        if (!$token || !(new Invoice())->checkToken($token)) {
            return $this->sendError('Token error');
        }

        if (config('app.chrome') == '') {
            ini_set('memory_limit', '-1');
            set_time_limit(0);
            $view = $this->previewInvoice($id, request());
            $pdf = DomPDF::loadHTML($view);
            $pdf->setPaper('A4', 'portrait');
            $pdf->render();
            return $pdf->stream();
        } else {
            $pdf = new Pdf; //In case no PDF exists this shall render
            $url = url('/', secure: false);
            $pdf->render($id, "$url/invoice/$id/preview?token=$token", 'invoices');
        }

        header("Content-Type: application/pdf");
        header("Content-Disposition: inline; filename=invoice-$id.pdf");
        $file = Storage::disk('invoices')->get("$id.pdf");
        echo $file;
        die();
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param Request $request
     * @return mixed
     */
    public function sendEmail($id, Request $request)
    {
        $invoice = (new Invoice())->invoice($id, true)->first();
        $company = (new Order())->getShipperData();

        if (!(new Invoice())->generatePDF($id, $request)) {
            return $this->sendError('Error generating PDF and sending emails');
        }
        if (isAzureStorageEnabled()) {
            $pdf = Storage::disk('azure')->url("invoices/$id.pdf");
        } else {
            $pdf = storage_path("app/invoices/$id.pdf");
        }

        $mail = new InvoiceEmail($id, $invoice->Client, $company->CompanyName, $pdf);
        Mail::to(explode(',', $invoice->ClientEmail))->send($mail);

        return $this->sendResponse('Email sent');
    }
}
