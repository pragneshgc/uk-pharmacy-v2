<?php

namespace App\Library;

use App\Services\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as DomPDF;

class Invoice
{
    private $invoiceStatus = [
        0 => 'INCOMPLETE',
        1 => 'UNPAID',
        2 => 'PAID',
        3 => 'CREDITNOTE',
        4 => 'DELETED',
    ];
    /**
     * Get single invoice
     *
     * @param int $id
     * @return object
     */
    public function invoice($id = 0, $clientInfo = false)
    {
        $columns = ['*'];
        $user = Auth::user();

        // if($user->role < 50){
        //     $columns = ['i.GrossAmount', 'i.AmountReceived', 'i.Status', 'i.Type', 'i.PaymentMethod', 'i.VAT', 'i.NetAmount'];
        // } else {
        $columns = [
            'i.InvoiceID AS Invoice #',
            'i.InvoiceID',
            'c.CompanyName AS Client',
            'i.GrossAmount',
            'i.AmountReceived',
            'i.Status',
            'i.Type',
            'i.VAT',
            'i.NetAmount'
        ];
        // }

        if ($clientInfo) {
            $columns[] = 'c.CompanyName';
            $columns[] = 'c.Address1 AS ClientAddress1';
            $columns[] = 'c.Address2 AS ClientAddress2';
            $columns[] = 'c.Address3 AS ClientAddress3';
            $columns[] = 'c.Address4 AS ClientAddress4';
            $columns[] = 'c.Postcode AS ClientPostcode';
            $columns[] = 'c.CountryID AS ClientCountryID';
            $columns[] = 'c.Telephone AS ClientTelephone';
            $columns[] = 'c.Mobile AS ClientMobile';
            $columns[] = 'c.Email AS ClientEmail';
            $columns[] = 'c.VAT AS ClientVAT';
            $columns[] = 'co.Name AS ClientCountryName';
        }

        $data = DB::table('Invoice AS i')->select($columns);
        $data = $data
            ->selectRaw("DATE_FORMAT(FROM_UNIXTIME(i.DateCreated), '%d/%m/%Y') AS 'Created Date'")
            ->selectRaw("IF(i.DatePaid=0, 'Not Paid', DATE_FORMAT(FROM_UNIXTIME(i.DatePaid), '%d/%m/%Y')) AS 'Paid Date'");

        if (!empty($id)) {
            $data = $data->where('i.InvoiceID', $id);
        }

        $data = $data->leftJoin('Client AS c', 'i.ClientID', '=', 'c.ClientID');

        if ($clientInfo) {
            $data = $data->leftJoin('Country AS co', 'c.CountryID', '=', 'co.CountryID');
        }

        return $data;
    }

    public function checkToken($token)
    {
        $user = DB::table('PharmacyUser')->where('token', $token)->first();

        if (!$user) {
            return false;
        }

        return true;
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @return \Illuminate\Database\Query\Builder
     */
    public function invoiceItems($id)
    {
        return DB::table('InvoiceItem')->where('InvoiceID', $id);
    }

    public function setSearchParameters($f, $request, $data)
    {
        $filters = json_decode($f);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';

        if (isset($filters->timestamp)) {
            $dateFilter = $filters->timestamp == 'created_date' ? 'DateCreated' : 'DatePaid';
        } else {
            $dateFilter = 'DateCreated';
        }

        $itemsQueried = false;
        $prescriptionQueried = false;

        foreach ($filters as $key => $value) {
            if ($value != '') {
                switch ($key) {
                    case 'start_date':
                        $date = new \DateTime($value);
                        $date->setTime(00, 00, 00);
                        $date = $date->getTimestamp();

                        $data = $data->where("i.$dateFilter", '>', $date);

                        break;
                    case 'end_date':
                        $date = new \DateTime($value);
                        $date->setTime(23, 59, 59);
                        $date = $date->getTimestamp();

                        $data = $data->where("i.$dateFilter", '<', $date);

                        break;
                    case 'order_id':
                        if (!$itemsQueried) {
                            $data = $data->leftJoin('InvoiceItem AS ii', 'i.InvoiceID', '=', 'ii.InvoiceID');
                            $itemsQueried = true;
                        }

                        $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                        $valueArray = preg_split('/[\ \n\,]+/', $value);

                        $data = $data->whereIn('ii.PrescriptionID', $valueArray);

                        break;
                    case 'country':
                        if (!$itemsQueried) {
                            $data = $data->leftJoin('InvoiceItem AS ii', 'i.InvoiceID', '=', 'ii.InvoiceID');
                            $itemsQueried = true;
                        }

                        if (!$prescriptionQueried) {
                            $data = $data->leftJoin('Prescription AS p', 'ii.PrescriptionID', '=', 'p.PrescriptionID');
                            $prescriptionQueried = true;
                        }

                        if (in_array(1, $value, true)) {
                            array_push($value, 244);
                            array_push($value, 245);
                        }

                        if (in_array('1-northern-ireland', $value, true) && !in_array('1-great-britain', $value, true)) {
                            $data = $data->where('p.DPostCode', 'LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-northern-ireland']);
                        } else if (!in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $data = $data->where('p.DPostCode', 'NOT LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-great-britain']);
                        } else if (in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $value = array_diff($value, ['1-northern-ireland', '1-great-britain']);
                            array_push($value, 1);
                        }

                        $data = $data->whereIn('p.DCountryCode', $value);

                        break;
                    case 'status':
                        $data = $data->where('i.Status', '=', $value);
                        break;

                    case 'delivery':
                        if (!$itemsQueried) {
                            $data = $data->leftJoin('InvoiceItem AS ii', 'i.InvoiceID', '=', 'ii.InvoiceID');
                            $itemsQueried = true;
                        }

                        if (!$prescriptionQueried) {
                            $data = $data->leftJoin('Prescription AS p', 'ii.PrescriptionID', '=', 'p.PrescriptionID');
                            $prescriptionQueried = true;
                        }

                        $data = $data->where('p.DeliveryID', '=', $value);
                        break;

                    case 'statuses':
                        if (count($value) > 0) {
                            $data = $data->whereIn('i.Status', $value);
                        }

                        break;
                    case 'reference':
                        if (!$itemsQueried) {
                            $data = $data->leftJoin('InvoiceItem AS ii', 'i.InvoiceID', '=', 'ii.InvoiceID');
                            $itemsQueried = true;
                        }

                        $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                        $valueArray = preg_split('/[\ \n\,]+/', $value);

                        $data = $data->whereIn('ii.ReferenceNumber', $valueArray);

                        break;
                    case 'client':
                        $data = $data->where('i.ClientID', '=', $value);
                        break;

                    default:
                        break;
                }
            }
        }
        return $data;
    }

    public function createOrGetInvoice($clientID)
    {
        $invoice = DB::table('Invoice')->where('ClientID', $clientID)->where('Status', 0)->where('Type', 0)->first();

        if (!$invoice) {
            $invoice = [
                'ParentInvoiceID' => 0,
                'SequenceID' => 0,
                'ClientID' => $clientID,
                'DateCreated' => time(),
                'DatePaid' => 0,
                'GrossAmount' => 0,
                'AmountReceived' => 0,
                'Status' => 0,
                'Type' => 0,
                'PaymentMethod' => 0,
                'VAT' => 0,
                'NetAmount' => 0,
            ];

            return DB::table('Invoice')->where('InvoiceID', DB::table('Invoice')->insertGetId($invoice))->first();
        }

        return $invoice;
    }
    /**
     * Generate an invoice from a prescription
     *
     * @param int $id
     */
    public function generate($id)
    {
        $prescription = DB::table('Prescription AS p')
            ->select(['p.*', 'do.Type AS DoctorType', 'c.VAT AS ClientVAT', 'co.Name AS CountryName'])
            ->where('PrescriptionID', $id)
            ->leftJoin('Client as c', 'c.ClientID', '=', 'p.ClientID')
            ->leftJoin('DoctorAddress as do', 'do.DoctorAddressID', '=', 'p.DoctorAddressID')
            ->leftJoin('Country as co', 'co.CountryID', '=', 'p.DCountryCode')
            ->first();
        if ($prescription) {
            $invoice = $this->createOrGetInvoice($prescription->ClientID);

            //if the invoice item already exists don't insert it again or update it?
            if (DB::table('InvoiceItem')->where('PrescriptionID', $id)->exists()) {
                return false;
            }

            $products = DB::table('Product AS p')
                ->select(['p.*'])
                ->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'p.Code')
                ->where('p.PrescriptionID', $id)->get();

            if ($products->isEmpty()) {
                return false;
            }

            foreach ($products as $product) {
                $price = 0;
                $vat = 0;
                // prices are set per pack, but how some product packs are sent to us does not match how we
                //store pack details in productCode/price table. Since multiple online doctors had their
                //own version, the controlled version happened at the label printing stage. So to be accurate
                //the quantity level issued at label stage is the most accurate to get the exact price. This is why the code below uses label to get quantity

                $inventoryItems = DB::table('InventoryItem AS ii')
                    ->select(['ii.*', 'p.Code', 'pc.VAT'])
                    ->where('ii.ProductID', $product->ProductID)
                    ->where('ii.Status', 'SHIPPED')
                    ->whereNull('ii.DeletedAt')
                    ->leftJoin('Product as p', 'p.ProductID', '=', 'ii.ProductID')
                    ->leftJoin('ProductCode as pc', 'pc.ProductCodeID', '=', 'ii.ProductCodeID')
                    ->get();

                foreach ($inventoryItems as $item) {
                    //this is a bit ugly, move to a method
                    if (
                        $pricing = DB::table('Pricing')
                        ->where('Code', $item->Code)
                        ->where('Quantity', $item->Quantity)
                        ->where('ClientID', $prescription->ClientID)
                        ->first()
                        ||
                        $pricing = DB::table('Pricing')
                        ->where('Code', $item->Code)
                        ->where('ClientID', $prescription->ClientID)
                        ->first()
                        ||
                        $pricing = DB::table('Pricing')
                        ->where('Code', $item->Code)
                        ->where('Quantity', $item->Quantity)
                        ->where('Price', 0)
                        ->first()
                        ||
                        $pricing = DB::table('Pricing')
                        ->where('Code', $item->Code)
                        ->where('Price', 0)
                        ->first()
                    ) {
                        $dosage = $item->Quantity;

                        if ($item->Code == '1159813' && $dosage < 10) {
                            $dosage = 10 * $dosage;
                        }

                        if ($pricing->Dosage == $item->Quantity) {
                            $price += $pricing->Price;
                        } else {
                            $price += (($pricing->Price / $pricing->Quantity) * $dosage);
                        }
                    }
                }

                if ($prescription->DoctorType == 1) {
                    $vat = 0;
                } else {
                    $vat = $vat / 100 * $price;
                }

                //insert invoice item for product entry
                $invoiceItem = DB::table('InvoiceItem')->insert([
                    'InvoiceID' => $invoice->InvoiceID,
                    'PrescriptionID' => $id,
                    'Description' => $product->Description . ' (Dosage: ' . $product->Dosage . ')',
                    'Date' => $prescription->UpdatedDate,
                    'DoctorID' => $prescription->DoctorID,
                    'ProductID' => $product->ProductID,
                    'ProductCode' => $product->Code,
                    'UnitCost' => $price,
                    'Quantity' => $product->Quantity,
                    'VAT' => $vat,
                    'ReferenceNumber' => $prescription->ReferenceNumber,
                    'Type' => 1,
                    'Status' => 1,
                ]);

                //insert invoice item for shipping entry
                $postcodeTwo = strtoupper(substr($prescription->DPostcode, 0, 2));
                $price = 0;
                $shippingVat = 0;
                $description = '';

                //start insertion shipping entry
                if ($prescription->DCountryCode == 1 && in_array($postcodeTwo, ['BT', 'GY', 'JE'])) {
                    $description = 'SHIPPING(British Channel Islands)';
                    //242 is North Ireland
                    if ($shippingPricing = DB::table('Pricing')->where('Code', '242')->where('ClientID', $prescription->ClientID)->where('Type', 2)->first()) {
                        $price = $shippingPricing->Price;
                    } else {
                        $shippingPricing = DB::table('Pricing')
                            ->where('Code', $prescription->DCountryCode)
                            ->where('ClientID', $prescription->ClientID)
                            ->where('Type', 2)
                            ->first();

                        if (!$shippingPricing) {
                            //look for a bug here
                            $shippingPricing = DB::table('Pricing')
                                ->where('Code', $prescription->DCountryCode)
                                ->where('Type', 2)
                                ->first();
                        }

                        $price = $shippingPricing->Price;

                        if ($postcodeTwo == 'BT') {
                            $description = 'SHIPPING Northern Ireland';
                        }
                    }
                } else {
                    $description = "SHIPPING ($prescription->CountryName)";

                    if ($shippingPricing = DB::table('Pricing')->where('Code', $prescription->DCountryCode)->where('ClientID', $prescription->ClientID)->first()) {
                        $price = $shippingPricing->Price;
                    } else {
                        $shippingPricing = DB::table('Pricing')
                            ->where('Code', $prescription->DCountryCode)
                            ->where('Type', 2)
                            ->first();

                        if (!$shippingPricing) {
                            return false;
                        }

                        $price = $shippingPricing->Price;
                    }
                }

                if ($prescription->DoctorType == 1) {
                    if ($prescription->DCountryCode != 1) {
                        $shippingVat = ($prescription->ClientVAT / 100) * $price;
                    }
                }

                //check the actual values
                $invoiceItem = DB::table('InvoiceItem')->insert([
                    'InvoiceID' => $invoice->InvoiceID,
                    'PrescriptionID' => $id,
                    'Description' => $description,
                    'Date' => $prescription->UpdatedDate,
                    'DoctorID' => $prescription->DoctorID,
                    'ProductID' => $product->ProductID,
                    'ProductCode' => $product->Code,
                    'UnitCost' => $price,
                    'Quantity' => $product->Quantity,
                    'VAT' => $shippingVat,
                    'ReferenceNumber' => $prescription->ReferenceNumber,
                    'Type' => 2,
                    'Status' => 1,
                ]);
                //end insertion for shipping entry
            }
        } else {
            return false;
        }

        return true;
    }

    /**
     * Undocumented function
     *
     */
    public function updateInvoiceStatus(int $id, int $status): mixed
    {
        $invoice = DB::table('Invoice')->where('InvoiceID', $id)->first();

        $update = ['Status' => $status];

        if ($status == 2) {
            $update['DatePaid'] = time();
            $update['AmountReceived'] = $invoice->GrossAmount;
        }

        if ($status == 1) {
            //recalculate VAT, Gross amount and Net amount
            $invoiceItems = DB::table('InvoiceItem')->where('InvoiceID', $id)->get();

            $vat = 0;
            $grossAmount = 0;
            $netAmount = 0;

            foreach ($invoiceItems as $item) {
                $vat += $item->VAT;
                $grossAmount += $item->UnitCost + $item->VAT;
                $netAmount += $item->UnitCost;
            }

            $update['VAT'] = $vat;
            $update['GrossAmount'] = $grossAmount;
            $update['NetAmount'] = $netAmount;

            //create a new invoice if one does not already exist for this company

        }

        DB::table('Invoice')->where('InvoiceID', $id)->update($update);

        return $status != 0 ? $this->createOrGetInvoice($invoice->ClientID) : true;
    }

    /**
     * Undocumented function
     *
     */
    public function addItem(int $id, Request $request): bool
    {
        $item = $request->all();
        $item['InvoiceID'] = $id;
        $item['Status'] = 0;
        $item['Quantity'] = 1;
        $item['Date'] = time();

        return DB::table('InvoiceItem')->insert($item);
    }

    public function previewInvoice($id)
    {
        $invoice = (new Invoice())->invoice($id, true)->first();
        $invoice->Items = (new Invoice())->invoiceItems($id)
            ->select([
                'InvoiceItem.*',
                'ProductCode.VAT AS VATRate'
            ])
            ->leftJoin('ProductCode', 'ProductCode.Code', '=', 'InvoiceItem.ProductCode')
            ->orderBy('Date', 'DESC')
            ->get();
        $invoice->Company = (new Order())->getShipperData();
        $invoice->ShippingCount = 0;
        $invoice->ShippingPrice = 0;
        $invoice->ShippingVAT = 0;
        $invoice->ProductsCount = 0;
        $invoice->ProductsPrice = 0;
        $invoice->ProductsVAT = 0;
        $invoice->VATCounter = [];

        foreach ($invoice->Items as $item) {
            $item->Date = date('d/m/Y', $item->Date);

            $item->UnitCost = number_format((float) $item->UnitCost, 2);
            $item->VAT = number_format((float) $item->VAT, 2);
            $item->Total = number_format(((float) $item->UnitCost + (float) $item->VAT), 2);

            if ($item->Type == 1) {
                $invoice->ProductsCount++;
                $previousProductItem = $item;
                $invoice->ProductsPrice += $item->UnitCost;
                $invoice->ProductsVAT += $item->VAT;

                if (!property_exists($invoice, 'ProductToDate')) {
                    $invoice->ProductToDate = $item->Date;
                }
            } else if ($item->Type == 2) {
                $invoice->ShippingCount++;
                $previousShippingItem = $item;
                $invoice->ShippingPrice += $item->UnitCost;
                $invoice->ShippingVAT += $item->VAT;

                if (!property_exists($invoice, 'ShippingToDate')) {
                    $invoice->ShippingToDate = $item->Date;
                }
            }

            if (isset($invoice->VATCounter[$item->VATRate])) {
                $invoice->VATCounter[$item->VATRate] += $item->VAT;
            } else {
                $invoice->VATCounter[$item->VATRate] = $item->VAT;
            }
        }

        //format absolutely everything
        if (isset($previousProductItem) && isset($previousShippingItem)) {
            $invoice->ProductFromDate = $previousProductItem->Date;
            $invoice->ShippingFromDate = $previousShippingItem->Date;
        } else {
            $invoice->ProductFromDate = date('d/m/Y');
            $invoice->ProductToDate = date('d/m/Y');
            $invoice->ShippingFromDate = date('d/m/Y');
            $invoice->ShippingToDate = date('d/m/Y');
        }

        $invoice->CalculatedSubTotal = number_format((float) $invoice->ProductsPrice + (float) $invoice->ShippingPrice, 2);
        $invoice->CalculatedVAT = number_format((float) $invoice->ProductsVAT + (float) $invoice->ShippingVAT, 2);
        $invoice->CalculatedTotal = number_format((float) $invoice->CalculatedSubTotal + (float) $invoice->CalculatedVAT, 2);
        $invoice->BalanceDue = number_format((float) $invoice->CalculatedTotal - (float) $invoice->AmountReceived, 2);
        $invoice->StatusString = $this->invoiceStatus[$invoice->Status];

        $invoice->ShippingCount = number_format((float) $invoice->ShippingCount, 2);
        $invoice->ShippingPrice = number_format((float) $invoice->ShippingPrice, 2);
        $invoice->ShippingVAT = number_format((float) $invoice->ShippingVAT, 2);
        $invoice->ProductsCount = number_format((float) $invoice->ProductsCount, 2);
        $invoice->ProductsPrice = number_format((float) $invoice->ProductsPrice, 2);
        $invoice->ProductsVAT = number_format((float) $invoice->ProductsVAT, 2);

        $layout = 'invoice.layout';
        return View::make($layout, compact(['invoice']))->render();
    }

    function generatePDF($id, $request)
    {
        if (isAzureStorageEnabled() && !Storage::disk('azure')->exists("invoices/$id.pdf")) {
            $view = $this->previewInvoice($id);

            $pdf = DomPDF::loadHTML($view);
            $pdf->setPaper('A4', 'portrait');
            $pdf->render();
            Storage::disk('azure')->put("invoices/$id.pdf", $pdf->output());
            return true;
        } else if (!Storage::disk('invoices')->exists("$id.pdf")) {
            $token = $request->token;

            if (!$token || !(new Invoice())->checkToken($token)) {
                return false;
            }

            if (config('app.chrome') != '') {
                $pdf = new Pdf; //In case no PDF exists this shall render
                $url = url('/');
                $pdf->render($id, "$url/invoice/$id/preview?token=$token", 'invoices');
                return true;
            } else {
                $view = $this->previewInvoice($id);

                $pdf = DomPDF::loadHTML($view);
                $pdf->setPaper('A4', 'portrait');
                $pdf->render();
                Storage::disk('invoices')->put("$id.pdf", $pdf->output());
                return true;
            }
        }

        return true;
    }
}
