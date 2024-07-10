<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Services\Pdf;
use App\Library\Order;
use App\Models\Product;
use App\Library\TestKit;
use App\Library\Activity;
use App\Library\Tracking;
use App\Enums\OrderStatus;
use App\Helpers\Constants;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use App\Builders\PomBuilder;
use App\Models\Prescription;
use App\Services\CustomerIO;
use Illuminate\Http\Request;
use App\Exports\ReportExport;
use App\Builders\OrderBuilder;
use App\Services\OrderService;
use App\Library\Correspondence;
use App\Mail\CorrespondenceMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\View;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf as DomPDF;

// use SnappyPDF;

class OrderController extends Controller
{
    private $activity;
    private $order;
    private $testKit;

    /**
     * Delivery company ID's used in Prescription table
     *
     * @var array
     */
    private $deliveryCompanies = [
        '0' => 'Unknown',
        '3' => 'TNT',
        '4' => 'DPD',
        '5' => 'Royal Mail',
        '7' => 'UPS',
        '8' => 'TNT',
        '10' => 'DHL',
    ];

    /**
     * Order statuses mapping
     *
     * @var array
     */
    private $orderStatuses = [
        '1' => 'NEW',
        '2' => 'APPROVED',
        '4' => 'QUERIED',
        '3' => 'REJECTED',
        '5' => 'POSTPONED',
        '6' => 'CANCELLED',
        '7' => 'AWAITINGSHIPPED',
        '8' => 'SHIPPED',
        '9' => 'SAFETYCHECK',
        '10' => 'ONHOLD',
        '11' => 'CALL',
        '12' => 'QUERIEDDISPENSED',
        '13' => 'QUERIEDNOTDISPENSED',
        '14' => 'QUERIEDNOREPLY',
        '15' => 'QUERIEDARCHIVED',
        '16' => 'RETURNED',
        // '17' => 'REDELIVERY',
        '160' => 'RETURNED - Multiple Deliveries Attempted by Courier',
        '161' => 'RETURNED - Incorrect/Incomplete Address',
        '162' => 'RETURNED - Customer Refused Delivery',
        '163' => 'RETURNED - Shipment Not Collected by Customer',
        '164' => 'RETURNED - Other (%s)',
        '20' => 'PAYMENTPENDING',
        '101' => 'ONHOLD - Awaiting stock',
        '102' => 'ONHOLD - Awaiting customer expiry date confirmation (%s)',
        '103' => 'ONHOLD - Fridge item (To be processed on next available shipping day)',
        '104' => 'ONHOLD - Out of stock',
        '105' => 'ONHOLD - Incorrect XML details',
        '106' => 'ONHOLD - %s',
        '108' => 'ONHOLD - Order Received After Courier Left',
        '61' => 'CANCELLED - Customer/Client cancelled order',
        '62' => 'CANCELLED - Duplicate XML',
        '63' => 'CANCELLED - Returned and Cancelled',
        '64' => 'CANCELLED - Product Out Of Stock',
        '66' => 'CANCELLED - Expiry date confirmation not received from customer',
        '67' => 'CANCELLED - Shipping Address Undeliverable',
        '68' => 'CANCELLED - Test Order',
        '69' => 'CANCELLED - %s',
        '107' => 'ONHOLD - Postponed Shipping Request (%s)',
        '630' => 'CANCELLED - Returned and Cancelled (No Response Received from Client/Customer)',
        '631' => 'CANCELLED - Returned and Cancelled (Order Not Suitable for Redelivery)',
        // '632' => 'CANCELLED - Returned and Cancelled (Redelivery Refused by Client/Customer)',
        '633' => 'CANCELLED - Returned and Cancelled (Multiple Redeliveries Attempted)',
        '634' => 'CANCELLED - Returned and Cancelled (%s)',
        '91' => 'SAFETYCHECK - Product Name Mismatch',
        '92' => 'SAFETYCHECK - Formulation Mismatch',
    ];

    /**
     * Order substatuses mapping
     *
     * @var array
     */
    private $orderSubStatuses = [
        '101' => 'Awaiting stock',
        '102' => 'Awaiting customer expiry date confirmation',
        '103' => 'Fridge item (To be processed on next available shipping day)',
        '104' => 'Out of stock',
        '105' => 'Incorrect XML details',
        '106' => 'Other',
        '61' => 'Customer/Client cancelled order',
        '62' => 'Duplicate XML',
        '63' => 'Returned and Cancelled',
        '64' => 'Product Out Of Stock',
        '66' => 'Expiry date confirmation not received from customer',
        '67' => 'Shipping Address Undeliverable',
        '68' => 'Test Order',
        '69' => 'Other',
        '107' => 'Postponed Shipping Request',
        '108' => 'Order Received After Courier Left',
        '630' => 'Returned and Cancelled (No Response Received from Client/Customer)',
        '631' => 'Returned and Cancelled (Order Not Suitable for Redelivery)',
        // '632' => 'Returned and Cancelled (Redelivery Refused by Client/Customer)',
        '633' => 'Returned and Cancelled (Multiple Redeliveries Attempted)',
        '634' => 'Returned and Cancelled (Other)',
        '91' => 'Product Name Mismatch',
        '92' => 'Formulation Mismatch',
        '160' => 'Multiple Deliveries Attempted by Courier',
        '161' => 'Incorrect/Incomplete Address',
        '162' => 'Customer Refused Delivery',
        '163' => 'Shipment Not Collected by Customer',
        '164' => 'Other',
    ];

    /**
     * Contact options mapping
     *
     * @var array
     */
    private $options = [
        '1' => 3,
        '2' => 3,
        '3' => 5,
        '4' => 4,
        '5' => 4,
        '6' => 4,
    ];

    /**
     * Map of delivery company ID's and their logo paths
     *
     * @var array
     */
    private $imgMap = [
        '' => '',
        '0' => '',
        '3' => 'images/logo/tnt.png',
        '4' => 'images/logo/dpd.png',
        '5' => 'images/logo/rmail.png',
        '7' => 'images/logo/ups.png',
        '70' => 'images/logo/ups_access_point.jpg',
        '71' => 'images/logo/ups_cod.jpg',
        '8' => 'images/logo/tnt.png',
        '10' => 'images/logo/dhl.png',
    ];

    private $searchHistory = [
        OrderStatus::RETURNED->value,
        OrderStatus::SHIPPED->value,
        OrderStatus::QUERIED->value,
        OrderStatus::REJECTED->value
    ];

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->activity = new Activity;
        $this->order = new Order;
        $this->testKit = new TestKit;
    }


    /**
     * Orders table index for dashboard
     *
     * @return JsonResponse
     */
    public function index()
    {
        $filter = $this->f ?? 'new';

        $orderBuilder = new OrderBuilder;
        $data = $orderBuilder->order()
            ->withTrayStatus()
            ->filterByOrderStatus($filter)
            ->build()
            ->when($this->q != '', function ($sql) {
                return $sql->where('Prescription.PrescriptionID', 'LIKE', "%$this->q%")
                    ->orWhere('Prescription.ReferenceNumber', 'LIKE', "%$this->q%");
            })
            ->when($this->s != '', function ($sql) {
                return $sql->orderBy($this->s, $this->o);
            }, function ($sql) {
                return $sql->orderBy('Prescription.PrescriptionID', 'ASC');
            })
            ->paginate($this->l);

        $data = $this->processData($data);

        return $this->sendResponse($data);
    }

    private function processData($data)
    {
        $items = array_column($data->items(), 'PrescriptionID');

        $products = Product::query()
            ->select([
                'Product.PrescriptionID',
                'ProductCode.Name',
                'Product.Description', //added on 17th Nov 2023
                'ProductCode.JVM',
                'ProductCode.ProductCodeID',
                'Product.Dosage',
                'Product.Quantity',
                'Product.Unit',
                'ProductCode.Units' //added on 20th Nov 2023
            ])
            ->leftJoin('ProductCode', 'Product.Code', '=', 'ProductCode.Code')
            ->groupBy('Product.ProductID')
            ->orderBy('Product.ProductID', 'DESC')
            ->whereIn('PrescriptionID', $items)
            ->get();

        $data->getCollection()->transform(function ($item) use ($products) {
            if ($item->UPSAccessPointAddress != 0) {
                $item->DeliveryID = 70;
            }

            if ($item->PaymentMethod != '0') {
                $item->DeliveryID = 71;
            }

            if ($item->Exemption == 3) {
                $checkboxString = '<i title="Waiting for tracking code upload" class="fa fa-check import-awaiting-check"></i>';
            } else {
                $checkboxString = '';
            }

            unset($item->Exemption);
            unset($item->PaymentMethod);

            $item->{"Received Date"} = convertTimestamp($item->CreatedDate, 'd M Y H:i');
            unset($item->CreatedDate);

            $item->DeliveryID = '
            <div style="display: inline-flex; align-items: center; position: relative;">
                    ' . $checkboxString . '
                <div style="margin-right: 5px;text-align: center;min-width: 85px; height:25px; display: inline-block;">
                    <img height="25" src="' . $this->imgMap[$item->DeliveryID] . '"/>
                </div>
            </div>';

            $item->Status = isset($this->orderStatuses[$item->Status]) ? '' . $this->orderStatuses[$item->Status] . '' : 'UNKNOWN';

            if (isset($item->SubStatus)) {
                $item->Status = $item->Status . '</br>' . (isset($this->orderSubStatuses[$item->SubStatus]) ? '<i><small>' . $this->orderSubStatuses[$item->SubStatus] . '</small></i>' : 'UNKNOWN');
            }

            unset($item->SubStatus);

            $hasJVMProduct = false;
            $neverJVM = false;

            $productName = [];
            foreach ($products as $product) {
                if ($product->PrescriptionID == $item->PrescriptionID) {
                    $total = $product->Dosage * $product->Quantity;
                    //$name = "$product->Name $total $product->Unit";
                    $name = "$product->Name $total $product->Units";
                    if ($product->JVM == 1) {
                        $hasJVMProduct = true;
                    }
                    if ($product->JVM == 2) {
                        $neverJVM = true;
                    }
                    array_push($productName, $name);
                }
            }
            $item->Products = join('<br/>', $productName);

            if (
                (($hasJVMProduct && $item->ClientID == 51)
                    || (!$hasJVMProduct && $item->JVM == 1 && $item->ClientID == 51))
                && !$neverJVM
            ) {
                $item->CompanyName = "$item->CompanyName <br/> <b>Pouch Order</b>";
            }

            unset($item->JVM, $item->ClientID, $item->Name, $item->Dosage, $item->Quantity, $item->Unit);

            return $item;
        });

        return $data;
    }

    /**
     * Orders table duplicates
     *
     * @param int $referenceNumber
     * @return JsonResponse
     */
    public function duplicate($referenceNumber)
    {
        $data = $this->order->order(false, true);

        $data = $data->where('Prescription.ReferenceNumber', '=', $referenceNumber);

        if ($this->q != '') {
            $data = $data->where('Prescription.PrescriptionID', 'LIKE', "%$this->q%");
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        } else {
            $data = $data->orderBy('Prescription.PrescriptionID', 'ASC');
        }

        $data = $data->paginate($this->l);

        //get id's of items
        $items = [];
        foreach ($data->items() as $item) {
            array_push($items, $item->PrescriptionID);
        }

        $products = $this->order->products($items);

        $data->getCollection()->transform(function ($item) use ($products) {
            $item->Products = [];
            $item->DeliveryID = '<div style="display: inline-flex; align-items: center;"><div style="margin-right: 5px;text-align: center;min-width: 85px; height:25px; display: inline-block;"><img height="25" src="' . $this->imgMap[$item->DeliveryID] .
                '"/></div></div>';

            $item->Status = isset($this->orderStatuses[$item->Status]) ? '' . $this->orderStatuses[$item->Status] . '' : 'UNKNOWN';

            if (isset($item->SubStatus)) {
                $item->Status = $item->Status . '</br>' . (isset($this->orderSubStatuses[$item->SubStatus]) ? '<i><small>' . $this->orderSubStatuses[$item->SubStatus] . '</small></i>' : 'UNKNOWN');
            }

            unset($item->SubStatus);
            $item->{'Date Recieved'} = convertTimestamp($item->received_date, 'd M Y H:i');
            $item->{'Date Supplied'} = convertTimestamp($item->processed_date, 'd M Y H:i');

            foreach ($products as $product) {
                if ($product->PrescriptionID == $item->PrescriptionID) {
                    array_push($item->Products, $product->Name);
                }
            }

            return $item;
        });

        return $this->sendResponse($data);
    }

    /**
     * Search orders endpoint handler
     * Used in reports
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function search(Request $request)
    {
        $data = $this->reportSearch($request);
        $data = $data->paginate($this->l);

        //get id's of items
        $items = [];
        $references = [];

        foreach ($data->items() as $item) {
            array_push($items, $item->PrescriptionID);
            array_push($references, $item->ReferenceNumber);
        }

        $filters = json_decode($this->f);

        $data = $this->order->displayUnknownSearchParameters($data, $items, $filters, 'order_id', 'search');
        $data = $this->order->displayUnknownSearchParameters($data, $references, $filters, 'reference', 'search');

        $products = $this->order->products($items);

        $data->getCollection()->transform(function ($item) use ($products) {
            $column_name = '';
            $item->Products = [];
            $item->DeliveryID = $this->deliveryCompanies[$item->DeliveryID];

            $status = isset($this->orderStatuses[$item->Status]) ? '<b>' . $this->orderStatuses[$item->Status] . '</b>' : 'UNKNOWN';

            if (isset($item->SubStatus)) {
                $status = $status . '</br>' . (isset($this->orderSubStatuses[$item->SubStatus]) ?
                    '<i style="display: block; max-width: 180px;"><small>' . $this->orderSubStatuses[$item->SubStatus] . '</small></i>' : 'UNKNOWN');
            }

            if (isset($item->history_status) &&  in_array($item->history_status, $this->searchHistory)) {
                $column_name = $this->orderStatuses[$item->history_status];
                $return_status = isset($this->orderStatuses[$item->history_status]) ? '<b>' . $this->orderStatuses[$item->history_status] . '</b>' : 'UNKNOWN';

                if (isset($item->history_sub_status)) {
                    $return_status = $return_status . '</br>' . (isset($this->orderSubStatuses[$item->history_sub_status]) ?
                        '<i style="display: block; max-width: 180px;"><small>' . $this->orderSubStatuses[$item->history_sub_status] . '</small></i>' : 'UNKNOWN');
                }
                $item->Status = $return_status;
                $item->current_status = $status;
            } else {
                $item->Status = $status;
            }
            $item->{"Received Date"} = convertTimestamp($item->CreatedDate, 'd M Y H:i');
            unset($item->CreatedDate);

            if (!empty($item->UpdatedDate)) {
                $item->{"Processed Date"} = convertTimestamp($item->UpdatedDate, 'd M Y H:i');
                unset($item->UpdatedDate);
            }

            if (isset($item->{'Processed Date'}) && $item->{'Processed Date'} == '1 Jan 1970 01:00') {
                $item->{'Processed Date'} = 'Not processed';
            }

            $hasJVMProduct = false;
            $neverJVM = false;

            if ($products->isNotEmpty()) {
                foreach ($products as $product) {
                    if ($product->PrescriptionID == $item->PrescriptionID) {
                        $name = $this->order->setupProductString($product);
                        //array_push($item->Products, $name);

                        if ($product->JVM == 1) {
                            $hasJVMProduct = true;
                        }

                        if ($product->JVM == 2) {
                            $neverJVM = true;
                        }
                    }
                }
            }

            if ((($hasJVMProduct && $item->ClientID == 51) || (!$hasJVMProduct && $item->JVM == 1 && $item->ClientID == 51)) && !$neverJVM) {
                $item->CompanyName = "$item->CompanyName <br/> <b>Pouch Order</b>";
            }

            $data = [
                'PrescriptionID' => $item->PrescriptionID,
                'Ref' => $item->ReferenceNumber,
                'Courier' => $item->DeliveryID,
                'Client' => $item->CompanyName,
                'Patient Name/Address' => '<b>' . string_join([$item->Name, $item->Surname]) . '</b><br/>' . string_join([
                    $item->DAddress1, $item->DAddress2, $item->DAddress3, $item->DAddress4
                ]) . '<br/>' . string_join([$item->Postcode, $item->Country], ', '),
                'Received Date' => $item->{'Received Date'},
                'Processed Date' => $item->{'Processed Date'},
                'Products' => $item->Products,
            ];
            $data['Condition'] = '';
            if (!empty($item->Condition)) {
                $data['Condition'] = '<b>' . $item->Condition . '</b><br/>' . getFrequency($item->Frequency);
            }

            if (isset($item->current_status)) {
                $data['History Date'] = !empty($item->history_date) ? convertTimestamp($item->history_date, 'd M Y H:i') : '';
                $data['History'] = $item->Status;
                $data['Current Status'] = $item->current_status;
            } else {
                $data['Status'] = $item->Status;
            }

            return $this->arrangeColumns($data, $column_name);
        });

        return $this->sendResponse($data);
    }

    private function reportSearch(Request $request)
    {
        $orderBuilder = new OrderBuilder;
        $data = $orderBuilder->order()
            ->withPatient()
            ->withoutTrayStatus()
            ->applySearchFilters($this->f, $request)
            ->build();

        if ($this->q != '') {
            $data = $data->where('Prescription.PrescriptionID', 'LIKE', "%$this->q%");
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        } else {
            $data = $data->orderBy($orderBuilder->getDateFilter(), 'DESC');
        }

        return $data;
    }

    private function arrangeColumns($arr, $column)
    {
        $keyOrder = [
            'PrescriptionID',
            'Ref',
            'Courier',
            'Client',
            'Patient Name/Address',
            "Condition",
            'Received Date',
            'History Date',
            'Processed Date',
            'Status',
            'History',
            'Current Status'
        ];

        $orderedArray = [];
        foreach ($keyOrder as $key) {
            if (array_key_exists($key, $arr)) {
                $arr_key = Str::replace('History', $column, $key);
                $orderedArray[$arr_key] = $arr[$key];
            }
        }
        return $orderedArray;
    }

    /**
     * Register endpoint handler
     * horridly slow, fix
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request)
    {
        $pomQuery = new PomBuilder;
        $data = $pomQuery->register()
            ->withoutCSV()
            ->applySearchFilters($this->f, $request)
            ->build();

        if ($this->q != '') {
            $data = $data->where('Prescription.PrescriptionID', 'LIKE', "%$this->q%");
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        } else {
            $data = $data->orderBy('ph.UpdatedDate', 'DESC');
        }

        $data = $data->groupBy('Prescription.PrescriptionID');
        $data = $this->order->registerPagination($data, $this->l, $this->f, $this->q);

        //get id's and references of items
        $items = [];
        $references = [];

        foreach ($data->items() as $item) {
            array_push($items, $item->PrescriptionID);
            array_push($references, $item->ReferenceNumber);
        }

        $filters = json_decode($this->f);

        $data = $this->order->displayUnknownSearchParameters($data, $items, $filters, 'order_id', 'pom');
        $data = $this->order->displayUnknownSearchParameters($data, $references, $filters, 'reference', 'pom');

        $products = $this->order->products($items, true);

        $data->getCollection()->transform(function ($item) use ($products) {
            $item->Products = [];

            $products_details = $products->where('PrescriptionID', $item->PrescriptionID);
            foreach ($products_details as $product) {
                $name[] = $product->Name . ' - ' . $product->Quantity . 'x' . $product->Dosage . ' ' . $product->Unit;
            }

            $doctor_type = match ($item->DoctorType) {
                1 => 'GMC:',
                2 => 'EU:',
                3 => 'GPHC:',
                4 => 'Test:',
                5 => 'IMC:',
                default => 'Not Set:'
            };

            return [
                'PrescriptionID' => $item->PrescriptionID,
                'Date Recieved' => convertTimestamp($item->CreatedDate, 'd M Y H:i'),
                'Date Supplied' => convertTimestamp($item->UpdatedDate, 'd M Y H:i'),
                'ID' => "<b>" . $item->PrescriptionID .
                    "</b><br/>(<i>Ref No: </i>" . $item->ReferenceNumber . ")",
                'Patient Name/Address' => '<b>' . string_join([$item->Name, $item->Surname]) . '</b><br/>' . string_join([
                    $item->DAddress1, $item->DAddress2, $item->DAddress3, $item->DAddress4
                ]) . '<br/>' . string_join([$item->DPostcode, $item->Country], ', '),
                "Prescriber Name/Address" => '<b>' . string_join([$item->PrescriberName, $item->PrescriberSurname]) . '</b>'
                    . ' (<i>' . $doctor_type . '</i>' . $item->GMCNO . ')<br/>'
                    . string_join([
                        $item->doctor_address1, $item->doctor_address2, $item->doctor_address3, $item->doctor_address4
                    ])
                    . '<br/>' . string_join([$item->doctor_postcode, $item->PrescriberCountry], ', '),
                "products" => Arr::join($name, '<br/>'),
            ];
        });

        return $this->sendResponse($data);
    }

    /**
     * Get all selectable prescription IDs from the currently selected table
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getIds(Request $request)
    {
        $data = DB::table('Prescription');

        //if false we remove prescriptions that are in one of the trays
        if (isset($request->intray) && $request->intray == 'false') {
            $data = $data->whereRaw("Prescription.PrescriptionID NOT IN (SELECT PrescriptionID FROM Tray WHERE Status = 1)");
        }

        if ($this->f != '') {
            $data = $this->order->filterOrderByStatus($data, $this->f);
        } else {
            $data = $this->order->filterOrderByStatus($data, 'new');
        }

        if (isset($request->limit) && $request->limit != 'false') {
            $data = $data->limit($request->limit);
        }

        if (isset($request->type) && isset($request->property)) {
            if ($request->type == 'client') {
                $data = $this->order->filterOrderByClient($data, $request->property);
            } else if ($request->type == 'delivery') {
                $data = $this->order->filterOrderByDeliveryCompany($data, $request->property);
            }
        }

        $data = $data->pluck('PrescriptionID');

        if ($data) {
            return $this->sendResponse($data->toArray());
        } else {
            return $this->sendResponse([]);
        }
    }

    /**
     * Show root page
     *
     * @param int $id
     * @return JsonResponse
     */
    public function details($id)
    {
        $data = $this->order->orderDetails($id);

        if (!$data) {
            return $this->sendError('Prescription not found', ["Prescription with order number $id not found, please check your order number"]);
        } else {
            $data->restrictedStatus = Constants::getRestrictedStatus($data->Status, $id);
            $data->Courier = $this->deliveryCompanies[$data->DeliveryID];
            $data->Sex = isset($this->order->genders[$data->Sex]) ? $this->order->genders[$data->Sex] : $data->Sex;

            $data->Products = DB::table('Product AS p')
                ->select([
                    'p.Description',
                    'pc.Code',
                    'pc.Fridge',
                    'pc.Name',
                    'pc.JVM',
                    'pc.Units',
                    'pc.ProductCodeID',
                    'p.Unit',
                    'p.Quantity',
                    'p.Dosage',
                    'p.Instructions',
                    'p.Instructions2',
                    'p.ProductID'
                ])
                ->selectRaw('pc.ProductType AS Type')
                ->selectRaw('true AS CorrectName')
                ->selectRaw('true AS CorrectUnitName')
                ->leftJoin('ProductCode as pc', 'pc.Code', '=', 'p.Code')
                ->orderBy('p.ProductID', 'DESC')
                ->where('p.PrescriptionID', $id)
                ->get();
        }

        if ($data->Name == '' || $data->Surname == '') {
            $data->Name = 'UNKNOWN NAME. CONTACT SUPPORT';
            $data->Surname = 'UNKNOWN SURNAME. CONTACT SUPPORT';
        }

        return $this->sendResponse($data, 'Prescription details');
    }

    /**
     * Get order test kits
     *
     * @param int $id
     * @return JsonResponse
     */
    public function testKits($id)
    {
        $kits = $this->order->getTestKits($id);

        foreach ($kits as $kit) {
            if ($kit->Name == '' || $kit->Name == NULL) {
                $kit->Name = 'Not set';
            }

            if ($kit->Surname == '' || $kit->Surname == NULL) {
                $kit->Surname = 'Not set';
            }

            if ($kit->DOB == '' || $kit->DOB == NULL) {
                $kit->DOB = 'Not set';
            }

            if ($kit->Sex == '' || $kit->Sex == NULL) {
                $kit->Sex = 'Not set';
            } else {
                $kit->Sex = $this->order->genders[$kit->Sex];
            }
        }

        return $this->sendResponse($kits, 'Test kits');
    }

    /**
     * Get order history for PrescriptionID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function orderHistory($id)
    {
        $customer = $this->order->getCustomerDetails($id);

        if ($customer == null) {
            return $this->sendError('Could not fetch order history. Prescription not found!', ["Prescription with order number $id not found, please check your order number"]);
        }

        if ($customer->Name == '' || $customer->Surname == '') {
            return $this->sendResponse([]);
        }

        $history = DB::table('Prescription AS p')
            ->where('p.PrescriptionID', '!=', $id)
            ->select(['p.PrescriptionID', 'c.CompanyName', 'p.CreatedDate', 'p.UpdatedDate', 'p.Status', 'pr.Description', 'pc.Name', 'pc.Units', 'pr.Quantity', 'pr.Dosage'])
            ->leftJoin('Product AS pr', 'p.PrescriptionID', '=', 'pr.PrescriptionID')
            ->leftJoin('ProductCode as pc', 'pc.Code', '=', 'pr.Code')
            ->leftJoin('Client AS c', 'c.ClientID', '=', 'p.ClientID');

        $excludeName = ['Nicholas', 'Mark', 'Caitlin', 'Ana', 'Sarah'];
        $excludeSurname = ['Bevington', 'Sheridan', 'Davies', 'Mancos', 'Moghal'];

        // if($customer->ClientID != 51 || $customer->UserID == 0){
        if (in_array($customer->Name, $excludeName) && in_array($customer->Surname, $excludeSurname)) {
            $history = $history->whereRaw("
                (p.Name LIKE CONCAT('%', ?, '%') AND p.Surname LIKE CONCAT('%', ?, '%'))
                AND p.DOB = ?
                AND p.Sex = ?
                ", [$customer->Name, $customer->Surname, $customer->DOB, $customer->Sex]);
        } else {
            $history = $history->whereRaw("
                (p.Name LIKE CONCAT('%', ?, '%') OR p.Surname LIKE CONCAT('%', ?, '%'))
                AND p.DOB = ?
                AND p.Sex = ?
                ", [$customer->Name, $customer->Surname, $customer->DOB, $customer->Sex]);
        }
        // } else {
        //     $history = $history->where('p.UserID', $customer->UserID);
        // }

        $history = $history->orderBy('pr.ProductID', 'DESC')
            ->groupBy('pr.ProductID')
            ->get();

        $orders = [];

        foreach ($history as $entry) {
            $product = [
                'Description' => $entry->Description,
                'Name' => $entry->Name,
                'Units' => $entry->Units,
                'Quantity' => $entry->Quantity,
                'Dosage' => $entry->Dosage
            ];
            if (isset($orders[$entry->PrescriptionID])) {
                array_push($orders[$entry->PrescriptionID]['Products'], $product);
            } else {
                $orders[$entry->PrescriptionID] = [
                    'PrescriptionID' => $entry->PrescriptionID,
                    'Client' => $entry->CompanyName,
                    'CreatedDate' => convertTimestamp($entry->CreatedDate, "d/m/Y H:i"),
                    'ShippedDate' => $entry->UpdatedDate ? convertTimestamp($entry->UpdatedDate, "d/m/Y H:i") : '',
                    'Status' => $entry->Status,
                    'Products' => [$product]
                ];
            }
        }

        return $this->sendResponse(array_values($orders)); //have to remove the keys to order everything by date
    }

    /**
     * Get order history for PrescriptionID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function orderHistoryNew($id)
    {
        $customer = $this->order->getCustomerDetails($id);

        if ($customer == null) {
            return $this->sendError('Could not fetch order history. Prescription not found!', ["Prescription with order number $id not found, please check your order number"]);
        }

        if ($customer->Name == '' || $customer->Surname == '') {
            return $this->sendResponse([]);
        }

        $prescriptions = DB::table('CustomerPrescriptions')->select('Prescriptions')->where('CustomerPrescriptionID', $customer->CustomerID)->first();

        $history = DB::table('Prescription AS p')
            ->select(['p.PrescriptionID', 'c.CompanyName', 'p.CreatedDate', 'p.UpdatedDate', 'p.Status', 'pr.Description', 'pc.Name', 'pc.Units', 'pr.Quantity', 'pr.Dosage'])
            ->leftJoin('Product AS pr', 'p.PrescriptionID', '=', 'pr.PrescriptionID')
            ->leftJoin('ProductCode as pc', 'pc.Code', '=', 'pr.Code')
            ->leftJoin('Client AS c', 'c.ClientID', '=', 'p.ClientID')
            ->where('p.PrescriptionID', '!=', $id)
            ->whereIn('p.PrescriptionID', explode(',', $prescriptions->Prescriptions))
            ->orderBy('p.CreatedDate', 'DESC')
            ->groupBy('pr.ProductID')
            ->get();

        $orders = [];

        foreach ($history as $entry) {
            $product = [
                'Description' => $entry->Description,
                'Name' => $entry->Name,
                'Units' => $entry->Units,
                'Quantity' => $entry->Quantity,
                'Dosage' => $entry->Dosage
            ];
            if (isset($orders[$entry->PrescriptionID])) {
                array_push($orders[$entry->PrescriptionID]['Products'], $product);
            } else {
                $orders[$entry->PrescriptionID] = [
                    'PrescriptionID' => $entry->PrescriptionID,
                    'Client' => $entry->CompanyName,
                    'CreatedDate' => date("d/m/Y H:i", $entry->CreatedDate),
                    'ShippedDate' => date("d/m/Y H:i", $entry->UpdatedDate),
                    'Status' => $entry->Status,
                    'Products' => [$product]
                ];
            }
        }

        return $this->sendResponse(array_values($orders)); //have to remove the keys to order everything by date
    }


    /**
     * Check if the order was previously approved
     *
     * @param int $id
     * @return JsonResponse
     */
    public function orderPreApproved(int $id): JsonResponse
    {
        $check = $this->activity->checkPreApproved($id);

        return $this->sendResponse($check, 'Checked if order has been approved previously');
    }

    /**
     * Check order for previous statuses
     *
     * @param int $id
     * @return JsonResponse
     */
    public function orderCheck(int $id): JsonResponse
    {
        //check if the order was previously approved
        $previousCheck = $this->activity->checkPreApproved($id);
        //check if there is a duplicate order
        $prescription = $this->order->getOrderColumns($id, ['ReferenceNumber', 'ClientID']);

        if (!$prescription) {
            return $this->sendError("Could not check order statuses. Prescription not found!");
        }

        //get the order details + ref number
        $duplicateCheck = $this->order->checkDuplicate($id, $prescription);

        return $this->sendResponse(
            [
                'approved' => $previousCheck,
                'duplicate' => $duplicateCheck
            ],
            'Order status check'
        );
    }

    /**
     * Get an OrderID via reference number
     *
     * @param string $referenceNo
     * @return JsonResponse
     */
    public function getOrderID(string $referenceNo): JsonResponse
    {
        $referenceNo = trim($referenceNo);

        $orders = DB::table('Prescription')->select(['PrescriptionID'])
            ->where('ReferenceNumber', $referenceNo)
            ->union(DB::table('TestKit')->select(['PrescriptionID'])->where('ReferenceNumber', $referenceNo)->where('Count', '!=', 1))
            ->get();

        if (count($orders) > 0) {
            if (count($orders) == 1) {
                return $this->sendResponse($orders->first()->PrescriptionID, 'Order ID');
            } else {
                return $this->sendResponse($orders, 'Order ID');
            }
        } else {
            return $this->sendError("No orders with reference number $referenceNo found!");
        }
    }

    /**
     * Get list of delivery companies
     *
     * @return JsonResponse
     */
    public function deliveryCompanies(): JsonResponse
    {
        return $this->sendResponse($this->order->getDeliveryCompanies(), 'delivery companies list');
    }

    /**
     * Handle editing of delivery details for prescriptions
     *
     * @param int $id
     * @return JsonResponse
     */
    public function editAddress(int $id): JsonResponse
    {
        $order = DB::table('Prescription')->select(
            [
                'Name',
                'Surname',
                'DAddress1',
                'DAddress2',
                'DAddress3',
                'DAddress4',
                'DPostcode',
                'SaturdayDelivery',
                'DCountryCode',
                'Address1',
                'Address2',
                'Address3',
                'Address4',
                'Postcode',
                'CountryCode',
                'ClientID',
                'Telephone',
                'Email',
                'Notes',
                'Repeats',
                'TokenID',
                'TrackingCode',
                'DeliveryID',
                'UPSAccessPointAddress',
                'JVM'
            ]
        )->where('PrescriptionID', $id)->first();

        if (!in_array($order->DCountryCode, ['143', '162', '205', '243'])) {
            unset($order->Repeats);
        }

        $ups = DB::table('UPSAccessPoint')->select(
            ['Name', 'Address1', 'Address2', 'Address3', 'Address4', 'CountryCode', 'Postcode', 'APNotificationValue', 'UPSAccessPoint', 'APNotificationLanguage']
        )->where('PrescriptionID', $id)->first();

        if (!is_null($ups)) {
            $ups->APNotificationLanguage = $this->order->matchLanguageMapping($ups->APNotificationLanguage, false);
        }

        $details = DB::table('Prescription AS p')->select(['p.ClientID', 'pc.JVM'])->where('p.PrescriptionID', $id)
            ->leftJoin('Product AS pr', 'pr.PrescriptionID', '=', 'p.PrescriptionID')
            ->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'pr.Code')
            ->first();

        return $this->sendResponse([
            'order' => $order,
            'oldOrder' => $order,
            'ups' => $ups,
            'oldUPS' => $ups,
            'details' => $details
        ], 'Order details');
    }

    /**
     * Get delivery company with prescription id and prescription data
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function getDeliveryCompany(int $id, Request $request): JsonResponse
    {
        $data = $request->input();

        return $this->sendResponse($this->order->getDeliveryCompany($id, $data, true), 'Delivery company changed');
    }

    /**
     * Get delivery company with prescription id and prescription data
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function getPostcodeFormatting($id, Request $request): JsonResponse
    {
        $data = $request->input();

        return $this->sendResponse($this->order->formatPostcode($id, $data), 'Delivery company changed');
    }

    /**
     * Update an order
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateOrder(int $id, Request $request): JsonResponse
    {
        $data = $request->input();
        $order = $data['order'];
        $ups = $data['ups'];

        $oldOrder = DB::table('Prescription')->select(
            [
                'Repeats',
                'Name',
                'Surname',
                'DAddress1',
                'DAddress2',
                'DAddress3',
                'DAddress4',
                'DPostcode',
                'SaturdayDelivery',
                'DCountryCode',
                'Address1',
                'Address2',
                'Address3',
                'Address4',
                'Postcode',
                'CountryCode',
                'UPSAccessPointAddress',
                'Telephone',
                'Email',
                'Notes',
                'TokenID',
                'TrackingCode',
                'DeliveryID',
                'JVM'
            ]
        )->where('PrescriptionID', $id)->first();

        if (!is_null($order)) {
            DB::table('Prescription')->where('PrescriptionID', $id)->update($order);
        }

        $oldUPS = DB::table('UPSAccessPoint')->select(
            ['Name', 'Address1', 'Address2', 'Address3', 'Address4', 'CountryCode', 'Postcode', 'APNotificationValue', 'UPSAccessPoint', 'APNotificationLanguage']
        )->where('PrescriptionID', $id)->first();

        if (!is_null($ups)) {
            if ($order['UPSAccessPointAddress'] == 1) {
                $ups['APNotificationLanguage'] = $this->order->matchLanguageMapping($ups['APNotificationLanguage']);

                DB::table('UPSAccessPoint')->where('PrescriptionID', $id)->update($ups);
            } else {
                DB::table('UPSAccessPoint')->where('PrescriptionID', $id)->delete();
            }
        } else {
            if ($order['UPSAccessPointAddress'] == 1 && !DB::table('UPSAccessPoint')->where('PrescriptionID', $id)->exists()) {
                DB::table('UPSAccessPoint')->insert([
                    'PrescriptionID' => $id,
                    'APNotificationType' => 1,
                    'APNotificationFailedEmailAddress' => 'info@natcol.com',
                ]);
            }

            $oldUPS = [];
        }

        $update = [
            'oldOrder' => $oldOrder,
            'oldUPS' => $oldUPS
        ];

        // $this->activity->log($id, 'Updated order details', json_encode($oldOrder), 750);//type 750 for update on pharmacist
        $this->activity->log($id, 'Updated order details', json_encode($update), 750); //type 750 for update on pharmacist

        return $this->sendResponse($order, 'Updated successfully');
    }

    /**
     * Check if all the update details on the order are correct
     * Return differences in update details for confirmation
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function checkUpdateDetail(int $id, Request $request): JsonResponse
    {
        $data = $request->input();
        $order = $data['order'];
        $ups = $data['ups'];

        $oldOrder = DB::table('Prescription')->select(
            [
                'Repeats',
                'Name',
                'Surname',
                'DAddress1',
                'DAddress2',
                'DAddress3',
                'DAddress4',
                'DPostcode',
                'SaturdayDelivery',
                'DCountryCode',
                'Address1',
                'Address2',
                'Address3',
                'Address4',
                'Postcode',
                'CountryCode',
                'UPSAccessPointAddress',
                'Telephone',
                'Email',
                'Notes',
                'TokenID',
                'TrackingCode',
                'DeliveryID',
                'JVM'
            ]
        )->where('PrescriptionID', $id)->first();

        if (!$oldOrder) {
            $oldOrder = [];
        }

        if (!in_array($oldOrder->DCountryCode, ['143', '162', '205', '243'])) {
            unset($oldOrder->Repeats);
        }

        $oldUPS = DB::table('UPSAccessPoint')->select(
            ['Name', 'Address1', 'Address2', 'Address3', 'Address4', 'CountryCode', 'Postcode', 'APNotificationValue', 'APNotificationLanguage', 'UPSAccessPoint']
        )->where('PrescriptionID', $id)->first();

        if (!$oldUPS) {
            $oldUPS = [];
        } else {
            $oldUPS->APNotificationLanguage = $this->order->matchLanguageMapping($oldUPS->APNotificationLanguage, false);
        }

        if ($ups) {
            $changesUPS = array_diff($ups, (array) $oldUPS);
        } else {
            $changesUPS = [];
        }

        $changes = array_diff_assoc((array) $order, (array) $oldOrder);

        return $this->sendResponse(['changes' => $changes, 'old' => (array) $oldOrder, 'changesUPS' => $changesUPS, 'oldUPS' => (array) $oldUPS], 'List of changed');
    }

    /**
     * Revert an order update using the activity log
     *
     * @param int $id
     * @return JsonResponse
     */
    public function revertOrderUpdate(int $id): JsonResponse
    {
        $activity = DB::table('Activity')->select(['OrderID', 'Arguments'])->where('ActivityID', $id)->first();

        if (!$activity) {
            return $this->sendError('Activity not found');
        }

        $json = (array) json_decode(json_decode($activity->Arguments));
        $orderID = $activity->OrderID;

        $orderUpdate = DB::table('Prescription')->where('PrescriptionID', $orderID)->update((array) $json['oldOrder']);
        $upsUpdate = false;

        if (!empty($json['oldUPS'])) {
            if (DB::table('UPSAccessPoint')->where('PrescriptionID', $orderID)->exists()) {
                $upsUpdate = DB::table('UPSAccessPoint')->where('PrescriptionID', $orderID)->update((array) $json['oldUPS']);
            } else {
                $insert = ['PrescriptionID' => $orderID, 'APNotificationType' => 1];
                $insert = array_merge($insert, (array) $json['oldUPS']);

                $upsUpdate = DB::table('UPSAccessPoint')->insert($insert);
            }
        }

        if ($orderUpdate || $upsUpdate) {
            $this->activity->log($orderID, 'Reverted update on order details', json_encode($json), 760); //type 760 for reverted update
            return $this->sendResponse('Order successfully reverted');
        } else {
            return $this->sendError('Nothing to revert');
        }
    }

    public function getUPSAccessPointDetails($id): JsonResponse
    {
        $details = DB::table('UPSAccessPoint')->select(
            ['Name', 'Address1', 'Address2', 'Address3', 'Address4', 'CountryCode', 'Postcode', 'APNotificationValue']
        )->where('PrescriptionID', $id)->first();

        if (!$details) {
            $details = [];
        }

        return $this->sendResponse($details, 'Details fetched');
    }

    /**
     * Updates the status of the order with ID
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function updateStatus($id, Request $request)
    {
        $status = $request->input()['status'];
        $statusName = $this->orderStatuses[$status];

        if (!is_null($status) && isset($this->orderStatuses[$status])) {
            //check if order is already in status
            $oldStatus = $this->order->getOrderStatus($id);

            if ($oldStatus == $status) {
                return $this->sendError("Prescription $id is already set to status $statusName");
            }

            if ($status == 2) {
                $this->activity->log($id, 'Order changed to ' . $this->orderStatuses[$status], [], 22);
            } else if ($status == 20) { //EveAdam order
                $api = new \App\Library\API;

                $this->activity->log($id, 'Approved (Payment Pending)', $id, 1002); //what activity type for payment pending

                //relay this to EveAdam
                if (!$api->processApproval($this->order->getReferenceNumber($id))) {
                    return $this->sendError('', ['Request to EveAdam server failed'], 504);
                }
            } else {
                if (in_array($status, [69, 102, 107, 106, 634, 164])) {
                    $text = $request->input()['text'];

                    $this->activity->log($id, 'Order changed to ' . sprintf($this->orderStatuses[$status], $text));
                    $statusName = sprintf($statusName, $text);
                } else {
                    $this->activity->log($id, 'Order changed to ' . $this->orderStatuses[$status]);
                }
            }

            //we want to do this last in case something went wrong
            $substatus = NULL;

            if (in_array($status, [101, 102, 103, 104, 105, 106, 107, 108])) {
                $substatus = $status;
                $status = 10;
            } else if (in_array($status, [61, 62, 63, 64, 66, 67, 68, 69, 630, 631, 632, 633, 634])) {
                $substatus = $status;
                $status = 6;
            } else if (in_array($status, [91, 92])) {
                $substatus = $status;
                $status = 9;
            } else if (in_array($status, [160, 161, 162, 163, 164])) {
                $substatus = $status;
                $status = 16;
            }

            $this->order->updateOrderStatus($id, $status, $substatus);
            $this->order->changePoolStatus($id, $status);

            $this->testKit->updateTestKitStatuses($id, 1);
        } else {
            return $this->sendError('Error while updating prescription. Please try again.');
        }

        return $this->sendResponse($status, "Prescription $id updated to status $statusName");
    }

    /**
     * Get activity list for order with ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getActivity(int $id): JsonResponse
    {
        $data = DB::table('Activity')->select(['ActivityID', 'Date', 'Action', 'Name', 'Type', 'Arguments'])
            ->where('OrderID', $id)->orderBy('ActivityID', 'DESC')->get();

        return $this->sendResponse($data, 'Activity log for order ' . $id);
    }

    /**
     * Get products attached via inventory
     *
     */
    public function getAttachedProducts(Request $request): JsonResponse
    {
        $ids = [];

        foreach ($request->products as $product) {
            array_push($ids, $product['ProductID']);
        }

        return $this->sendResponse($this->order->getAttachedProducts($ids));
    }

    /**
     * Send a contact email and save contact details in correspondence
     * Move to contact controller
     *
     * @param Request $request
     * @param int $id
     * @param Request $request
     * @param Correspondence $correspondence
     * @return JsonResponse
     */
    public function contact($id, Request $request, Correspondence $correspondence)
    {
        $input = $request->input();
        $option = $correspondence->getFromOptions($input['form']['options'], $input['form']['select']);
        $order = $this->order->getOrderDetails($id);

        if (!$order) {
            return $this->sendError('Prescription not found or not properly set. Contact tech support!');
        }

        $mail = new CorrespondenceMail($input, $option, $order);
        $this->sendCustomerIOMail($input, $option, $order);

        $date = '';
        $status = $this->options[$input['form']['select']];

        if ($input['form']['date']) {
            $this->order->updateOrderDate($id, $input['form']['date']);
            $this->order->changePoolStatus($id, $status);
            $date = date('d/m/Y', strtotime($input['form']['date']));
        }

        $stored = $correspondence->storeCorrespondence($order, $mail);

        $this->order->updateOrderStatus($id, $status);

        //add a routine to remove item from tray
        $this->order->changePoolStatus($id, $status);

        $status = $this->orderStatuses[$status];
        $this->activity->log($id, 'Order changed to ' . $status);

        if (!$stored) {
            return $this->sendError('Error sending/storing correspondence!');
        } else {
            return $this->sendResponse(true, "Correspondence for order $id successfully submitted");
        }
    }

    private function sendCustomerIOMail($input, $option, $order)
    {
        $customerio = new CustomerIO();
        $eventName = '';
        $subject = '';
        switch ($option['value']) {
            case '1':
                $eventName = 'too-many';
                $subject = $order->ReferenceNumber . " has ordered too many (" . $order->CountryName . ")";
                break;
            case '2':
                $eventName = 'dosage-problem';
                $subject = $order->ReferenceNumber . " dosage discrepancy (" . $order->CountryName . ")";
                break;
            case '3':
                $eventName = 'too-early';
                $subject = $order->ReferenceNumber . " has ordered too early (" . $order->CountryName . ")";
                break;
            case '4':
                $eventName = 'miscellaneous';
                $subject = $order->ReferenceNumber . " dosage discrepancy (" . $order->CountryName . ")";
                break;
            case '5':
                $eventName = 'dosage-problem';
                $subject = $order->ReferenceNumber . " dosage discrepancy (" . $order->CountryName . ")";
                break;
            case '6':
                $eventName = 'potential-name-discrepancy';
                $subject = $order->ReferenceNumber . " has name discrepancy (" . $order->CountryName . ")";
                break;
            default:
                return $this;
        }
        if (App::environment(['local'])) {
            $email = config('esa.send_test_mail_to');
        } else {
            $client = DB::table('Client')->where('ClientID', $order->ClientID)->first();
            $email = str_replace(' ', '', $client->Email);
        }
        $data = [
            'subject' => $subject,
            'doctor_name' => $order->DoctorName,
            'reference_number' => $order->ReferenceNumber,
            'message' => $input['form']['message'],
            'from_bottom' => 'HR Healthcare Dispensing Team.',
            'from' => config('app.name')
        ];
        if (!empty($email)) {
            $url = "https://track.customer.io/api/v1/customers/" . $email . "/events";
            return $customerio->setURL($url)
                ->setEvent($eventName)
                ->setData($data)
                ->send();
        }

        return false;
    }

    /**
     * Stream an CSV with orders
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function csv(Request $request)
    {
        $data = $this->reportSearch($request);
        $data = $data->get();

        //get id's of items
        $items = [];
        $references = [];

        foreach ($data as $item) {
            array_push($items, $item->PrescriptionID);
            array_push($references, $item->ReferenceNumber);
        }

        $filters = json_decode($this->f);

        $data = $this->order->displayUnknownSearchParameters($data, $items, $filters, 'order_id', 'search');
        $data = $this->order->displayUnknownSearchParameters($data, $references, $filters, 'reference', 'search');

        $products = $this->order->products($items);

        $data->transform(function ($item) use ($products) {
            $name = [];
            $column_name = '';
            $item->Products = [];
            $item->DeliveryID = $this->deliveryCompanies[$item->DeliveryID];

            $status = isset($this->orderStatuses[$item->Status]) ?  $this->orderStatuses[$item->Status] : 'UNKNOWN';
            $sub_status = '';

            if (!empty($item->SubStatus)) {
                $sub_status = isset($this->orderSubStatuses[$item->SubStatus]) ? $this->orderSubStatuses[$item->SubStatus] : '';
            }

            if (isset($item->history_status) &&  in_array($item->history_status, $this->searchHistory)) {
                $column_name = $this->orderStatuses[$item->history_status];
                $return_status = isset($this->orderStatuses[$item->history_status]) ? $this->orderStatuses[$item->history_status] : 'UNKNOWN';

                if (isset($item->history_sub_status)) {
                    $return_status = $return_status . (isset($this->orderSubStatuses[$item->history_sub_status]) ?
                        $this->orderSubStatuses[$item->history_sub_status] : 'UNKNOWN');
                }
                $item->Status = $return_status;
                $item->SubStatus = $sub_status;
                $item->current_status = $status;
            } else {
                $item->Status = $status;
                $item->SubStatus = $sub_status;
            }
            $item->{"Received Date"} = convertTimestamp($item->CreatedDate, 'd M Y H:i');
            unset($item->CreatedDate);

            if (!empty($item->UpdatedDate)) {
                $item->{"Processed Date"} = convertTimestamp($item->UpdatedDate, 'd M Y H:i');
                unset($item->UpdatedDate);
            }

            if (isset($item->{'Processed Date'}) && $item->{'Processed Date'} == '1 Jan 1970 01:00') {
                $item->{'Processed Date'} = 'Not processed';
            }

            $hasJVMProduct = false;
            $neverJVM = false;

            if ($products->isNotEmpty()) {
                foreach ($products as $product) {
                    if ($product->PrescriptionID == $item->PrescriptionID) {
                        $name[] = $product->Name . ' - ' . $product->Quantity . 'x' . $product->Dosage . ' ' . $product->Unit;

                        if ($product->JVM == 1) {
                            $hasJVMProduct = true;
                        }

                        if ($product->JVM == 2) {
                            $neverJVM = true;
                        }
                    }
                }
            }

            if ((($hasJVMProduct && $item->ClientID == 51) || (!$hasJVMProduct && $item->JVM == 1 && $item->ClientID == 51)) && !$neverJVM) {
                $item->CompanyName = "$item->CompanyName <br/> Pouch Order";
            }

            $data = [
                'ID' => $item->PrescriptionID,
                'Ref' => $item->ReferenceNumber,
                'Courier' => $item->DeliveryID,
                'Client' => $item->CompanyName,
                'Patient Name' => $item->Name,
                'Patient Surname' => $item->Surname,
                'Patient Address' => string_join([
                    $item->DAddress1, $item->DAddress2,
                    $item->DAddress3, $item->DAddress4,
                    $item->Postcode
                ]),
                'Country' => $item->Country,
                'Tracking Number' => $item->TrackingCode,
                'Received Date' => $item->{'Received Date'},
                'Processed Date' => $item->{'Processed Date'},
                'Products' => Arr::join($name, ','),
            ];
            $data['Condition'] = '';
            $data['Frequency'] = '';
            if (!empty($item->Condition)) {
                $data['Condition'] = $item->Condition;
            }
            if (!empty($item->Frequency)) {
                $data['Frequency'] = getFrequency($item->Frequency);
            }
            if (isset($item->current_status)) {
                $data['History Date'] = !empty($item->history_date) ? convertTimestamp($item->history_date, 'd M Y H:i') : '';
                $data['History'] = $item->Status;
                $data['Current Status'] = $item->current_status;
            } else {
                $data['Status'] = $status;
                $data['SubStatus'] = $sub_status;
            }

            return $this->arrangeCsvColumns($data, $column_name);
        });

        $columns = array_keys($data[0]);

        $export = new ReportExport($columns, $data->toArray());
        $filename = 'report-' . date('Ymdhis') . '.csv';
        return Excel::download($export, $filename);
    }

    private function arrangeCsvColumns($arr, $column)
    {
        $keyOrder = [
            'ID',
            'Ref',
            'Courier',
            'Client',
            'Patient Name',
            'Patient Surname',
            'Patient Address',
            'Country',
            'Condition',
            'Frequency',
            'Tracking Number',
            'Received Date',
            'History Date',
            'Processed Date',
            'Status',
            'SubStatus',
            'History',
            'Current Status',
            'Products'
        ];

        $orderedArray = [];
        foreach ($keyOrder as $key) {
            if (array_key_exists($key, $arr)) {
                $arr_key = Str::replace('History', $column, $key);
                $orderedArray[$arr_key] = !empty($arr[$key]) ? $arr[$key] : '';
            }
        }
        return $orderedArray;
    }

    /**
     * Stream a CSV with orders for the register
     *
     * @param Request $request
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function csvRegister(Request $request)
    {
        $pomQuery = new PomBuilder;
        $data = $pomQuery->register()
            ->withCSV()
            ->applySearchFilters($this->f, $request)
            ->build();

        if ($this->q != '') {
            $data = $data->where('Prescription.PrescriptionID', 'LIKE', "%$this->q%");
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        } else {
            $data = $data->orderBy('ph.UpdatedDate', 'DESC');
        }

        $data = $data->groupBy('Prescription.PrescriptionID');
        $data = $data->get();

        //get id's and references of items
        $items = [];
        $references = [];

        foreach ($data as $item) {
            array_push($items, $item->PrescriptionID);
            array_push($references, $item->ReferenceNumber);
        }

        $filters = json_decode($this->f);

        $data = $this->order->displayUnknownSearchParameters($data, $items, $filters, 'order_id', 'pom');
        $data = $this->order->displayUnknownSearchParameters($data, $references, $filters, 'reference', 'pom');

        $products = $this->order->products($items, true);

        $data->transform(function ($item) use ($products) {
            $item->Products = [];

            foreach ($products as $product) {
                if ($product->PrescriptionID == $item->PrescriptionID) {
                    $item->Products[] = $product->Name . ' - ' . $product->Quantity . 'x' . $product->Dosage . ' ' . $product->Unit;
                }
            }

            $doctor_type = match ($item->DoctorType) {
                1 => 'GMC:',
                2 => 'EU:',
                3 => 'GPHC:',
                4 => 'Test:',
                5 => 'IMC:',
                default => 'Not Set:'
            };

            return [
                'ID' => $item->PrescriptionID,
                "ReferenceNumber" => $item->ReferenceNumber,
                'PatientName' => $item->Name,
                'PatientSurname' => $item->Surname,
                'PatientAddress' => string_join([
                    $item->DAddress1, $item->DAddress2, $item->DAddress3, $item->DAddress4, $item->DPostcode
                ]),
                'PatientCountry' => $item->Country,
                'PrescriberName' => $item->PrescriberName,
                'PrescriberSurname' => $item->PrescriberSurname,
                'GMCNO' => $doctor_type . ' ' . $item->GMCNO,
                'PrescriberAddress' => string_join([
                    $item->doctor_address1, $item->doctor_address2, $item->doctor_address3, $item->doctor_address4, $item->doctor_postcode
                ]),
                'PrescriberCountry' => $item->PrescriberCountry,
                'DateRecieved' => $item->{"Date Recieved"},
                'DateSupplied' => $item->{"Date Supplied"},
                "Products" => strip_tags(implode(',', $item->Products))
            ];
        });

        $columns = [
            'ID',
            'Reference Number',
            'Patient Name',
            'Patient Surname',
            'Patient Address',
            'Patient Country',
            'Prescriber Name',
            'Prescriber Surname',
            'GMCNO',
            'Prescriber Address',
            'Prescriber Country',
            'Date Recieved',
            'Date Supplied',
            'Products'
        ];

        $callback = function () use ($data, $columns) {
            $file = fopen('php://output', 'w');
            echo chr(0xEF) . chr(0xBB) . chr(0xBF); // this allows us to show pound signs. Why? No idea

            fputcsv($file, $columns, ',');

            foreach ($data as $order) {
                fputcsv($file, [
                    $order['ID'],
                    $order['ReferenceNumber'],
                    $order['PatientName'],
                    $order['PatientSurname'],
                    $order['PatientAddress'],
                    $order['PatientCountry'],
                    $order['PrescriberName'],
                    $order['PrescriberSurname'],
                    $order['GMCNO'],
                    $order['PrescriberAddress'],
                    $order['PrescriberCountry'],
                    $order['DateRecieved'],
                    $order['DateSupplied'],
                    $order['Products']
                ], ',');
            }

            fclose($file);
        };
        $headers = [
            "Content-Type" => "data:text/csv;charset=utf-8,\uFEFF",
            "Content-Disposition" => "attachment; filename=file.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];
        return response()->streamDownload($callback, 'orders-' . date('d-m-Y-H:i:s') . '.csv', $headers);
    }

    /**
     * To be replaced with view prescription
     *
     * @param int $id
     * @return JsonResponse
     */
    public function view($id)
    {
        $origin = url('/');

        $url = "$origin/prescription/$id/view";

        $type = 'pdf';

        if (
            isAzureStorageEnabled()
            && (Storage::disk('azure')->exists("pdf/$id.pdf") && Storage::disk('azure')->size("pdf/$id.pdf") > 0)
        ) {
            $type = 'pdf';
        } else if (Storage::disk('pdf')->exists("$id.pdf") && Storage::disk('pdf')->size("$id.pdf") > 0) {
            $type = 'pdf';
        }

        if (config('app.chrome') != '') {
            // if (\App::environment('local')) {
            $type = 'pdf';
        }

        $response = [
            'url' => $url,
            'type' => $type
        ];

        return $this->sendResponse($response);
    }

    /**
     * Return Label URL
     *
     * @param int $id
     * @return JsonResponse
     */
    public function label(int $id): JsonResponse
    {
        $origin = url('/');

        $url = "$origin/prescription/$id/label";

        $type = 'html';

        if (isAzureStorageEnabled() && Storage::disk('azure')->exists("pdf/$id.pdf")) {
            $type = 'pdf';
        } else if (Storage::disk('pdf')->exists("$id.pdf")) {
            $type = 'pdf';
        }

        $response = [
            'url' => $url,
            'type' => $type
        ];

        return $this->sendResponse($response);
    }

    /**
     * Get id label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function idLabel($id)
    {
        $origin = url('/');

        return $this->sendResponse([
            'url' => "$origin/prescription/$id/id-label",
            'type' => 'pdf'
        ]);
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param Request $request
     * @return \Illuminate\Http\Response|JsonResponse
     */
    public function viewIdLabel($id, Request $request)
    {
        $token = $request->token;
        $print = $request->print;

        if (!$token) {
            return $this->sendError('Token error');
        }

        if ($print) {
            $logCheck = $this->activity->log($id, 'printed Order ID Label', [], 1, $token);

            $logCheck = $this->activity->recordPrinting($id, 'PharmacyLabel', $token);
        }

        //make sure the labels are inserted into PharmacyLabel
        $this->order->insertLabel($id);

        $prescription = $this->order->orderDetails($id, true);
        $products = $this->order->getProducts($id, true);

        $company = isset($this->deliveryCompanies[$prescription->DeliveryID]) ? $this->deliveryCompanies[$prescription->DeliveryID] : 'UNKNOWN';

        $pdf = DomPDF::setOptions(['dpi' => 80])->loadView('id_label', compact(['prescription', 'company'])); //load view page
        return $pdf->stream(); // stream pdf file
    }

    /**
     * Log delivery note print in case the note was printed externally
     *
     * @param int $id
     * @param Request $request
     * @return void|JsonResponse
     */
    public function logDeliveryNotePrint($id, Request $request)
    {
        $token = $request->token;

        $logCheck = $this->activity->log($id, 'printed Delivery Note', [], 1, $token);

        if (!$logCheck) {
            return $this->sendError('Token error');
        }

        $logCheck = $this->activity->recordPrinting($id, 'DeliveryNote', $token);
    }

    /**
     * Show a blade rendering of a prescription by prescription id
     *
     * @param int $id
     * @return string|JsonResponse
     */
    public function viewPrescription($id, Request $request)
    {
        $token = $request->token;
        $print = $request->print;

        if (!$token) {
            return $this->sendError('Token error');
        }

        if ($print) {
            $logCheck = $this->activity->log($id, 'printed Delivery Note', [], 1, $token);

            if (!$logCheck) {
                return $this->sendError('Token error');
            }

            $logCheck = $this->activity->recordPrinting($id, 'DeliveryNote', $token);
        }

        $view = $this->order->prescriptionView($id);

        if (isAzureStorageEnabled()) {
            return $this->generateAzurePDF($id, $view);
        }

        if (!Storage::disk('pdf')->exists("$id.pdf")) {
            /* if (config('app.chrome') == '') {
                return $view;
            } */

            //$url = url("prescription/$id/view/html?token=$token");
            //$path = storage_path() . "/app/pdf/$id.pdf";

            //In case no PDF exists this shall render
            if (config('app.chrome') != '') {
                $pdf = new Pdf;
                $url = url('/', secure: false);
                $pdf->render($id, "$url/prescription/$id/view/html?token=$token");
            } else {
                $this->generatePDF($id, $view);
            }

            header("Content-Type: application/pdf");
            header("Content-Disposition: inline; filename=$id.pdf");
            $file = Storage::disk('pdf')->get("$id.pdf");
            echo $file;
            die();

            //return $this->order->prescriptionView($id);
        } else {
            $title = $id;

            if (isset($request->title)) {
                $title = $request->title;
            }

            header("Content-Type: application/pdf");
            header("Content-Disposition: inline; filename=$title.pdf");
            $file = Storage::disk('pdf')->get("$id.pdf");
            echo $file;
            die();
        }
    }

    /**
     * Show a blade rendering of a prescription by prescription id
     *
     * @param int $id
     * @return string|JsonResponse
     */
    public function viewPrescriptionHTML($id, Request $request)
    {
        $token = $request->token;
        $print = $request->print;
        $html = $request->html;

        if (!$token) {
            return $this->sendError('Token error');
        }

        if ($print) {
            $logCheck = $this->activity->log($id, 'printed Delivery Note', [], 1, $token);

            if (!$logCheck) {
                return $this->sendError('Token error');
            }

            $logCheck = $this->activity->recordPrinting($id, 'DeliveryNote', $token);
        }

        return $this->order->prescriptionView($id);
    }

    /**
     * Show a blade rendering of a prescription by prescription id
     *
     * @param int $id
     * @return \Illuminate\Http\Response|JsonResponse
     */
    public function viewLabel($id, Request $request)
    {
        $token = $request->token;
        $print = $request->print;

        if (!$token) {
            return $this->sendError('Token error');
        }

        if ($print) {
            $logCheck = $this->activity->log($id, 'printed Pharmacy Label', [], 1, $token);

            // if(!$logCheck){
            //     return $this->sendError('Token error');
            // }

            $logCheck = $this->activity->recordPrinting($id, 'PharmacyLabel', $token);
        }

        //make sure the labels are inserted into PharmacyLabel
        $this->order->insertLabel($id);

        $prescription = $this->order->orderDetails($id, true);
        $products = $this->order->getProducts($id, true);

        $genders = $this->order->genders;
        $company = $this->order->getDeliveryCompanyName($prescription->DeliveryID);

        $company = isset($this->deliveryCompanies[$prescription->DeliveryID]) ? $this->deliveryCompanies[$prescription->DeliveryID] : 'UNKNOWN';

        foreach ($products as $product) {
            $product->WarningLabels = DB::table('ProductWarningLabel')->select('WarningLabel.Description')
                ->where('ProductID', $product->Code)->where('WarningLabel.CountryID', '=', 1)
                ->leftJoin('WarningLabel', 'ProductWarningLabel.WLID', '=', 'WarningLabel.WLID')->get();

            $product->Pages = 1;
            $product->DisplayedQuantity = (int) $product->Quantity * $product->Dosage;

            if ((int) $product->Quantity * $product->Dosage > $product->ProductQuantity) {
                $product->Pages = (int) floor((int) $product->Quantity * $product->Dosage / $product->ProductQuantity);

                if ($product->Pages > 1) {
                    $product->DisplayedQuantity = (int) $product->ProductQuantity;
                }
            }

            $product->ExtraPageQuantity = 0;

            if (floor((int) $product->Quantity * $product->Dosage / $product->ProductQuantity) != $product->Quantity * $product->Dosage / $product->ProductQuantity) {

                $product->ExtraPageQuantity = $product->Dosage - ($product->DisplayedQuantity * $product->Pages);
            }

            //get the character count
            $length = 0;
            $length += strlen($product->Instructions); //only use the english instructions

            foreach ($product->WarningLabels as $warningLabel) {
                $length += strlen($warningLabel->Description);
            }

            $product->InstructionLength = $length;
        }

        //$label_view = 'pharmacy_label';
        $label_view = 'labels.pharmacy';
        //$label_view = 'labels.uk_pharmacy';

        $pharmacy = (new \App\Library\Doctor)->getPharmacy();

        $hasSpecialCharacters = "";

        // Load the view without $hasSpecialCharacters for now
        $html = View::make($label_view, compact('prescription', 'pharmacy', 'products', 'genders', 'company', 'hasSpecialCharacters'))->render();

        // Check if special characters are present
        $hasSpecialCharacters = preg_match('/[ășțîâĂȘȚÎÂ]/u', $html) > 0;


        // Pass the variable to the view and render it again
        $html = View::make($label_view, compact('prescription', 'pharmacy', 'products', 'genders', 'company', 'hasSpecialCharacters'))->render();

        // Load the HTML into DomPDF
        $pdf = DomPDF::loadHtml($html);

        return $pdf->stream();
    }

    /**
     * Get order print record using the order id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function printRecord($id): JsonResponse
    {
        $records = $this->order->getPrintRecord($id);
        $response = [
            'DeliveryNote' => 0,
            'PharmacyLabel' => 0
        ];

        //this will be long and ugly
        foreach ($records as $record) {
            if ($record->DeliveryNote > 0) {
                $response['DeliveryNote'] += $record->DeliveryNote;
            }
            if ($record->PharmacyLabel > 0) {
                $response['PharmacyLabel'] += $record->PharmacyLabel;
            }
        }

        return $this->sendResponse($response, 'Print Record Fetched');
    }

    /**
     * Get details on which files will be printed
     *
     * @return JsonResponse
     */
    public function printDetails($id): JsonResponse
    {
        $details = $this->order->getPrintDetails($id);

        return $this->sendResponse($details, 'Print Record Fetched');
    }

    /**
     * Check if an order with reference number exists
     *
     * @param string $referenceNumber
     * @return JsonResponse
     */
    public function exists(string $referenceNumber): JsonResponse
    {
        return $this->sendResponse(DB::table('Prescription')->where('ReferenceNumber', $referenceNumber)->exists());
    }

    /**
     * Get a count of how many prescriptions there are with the requested count
     *
     * @param int $status
     * @return JsonResponse
     */
    public function getCountWithStatus(int $status): JsonResponse
    {
        return $this->sendResponse($this->order->getCountWithStatus($status));
    }

    /**
     * Fetch the order related email from XML files
     * Create a general xml function from this that would return any number of properties
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getEmail(int $id): JsonResponse
    {
        $prescription = DB::table('Prescription')->where('PrescriptionID', $id)->first();

        return $this->sendResponse((string) $prescription->email, 'Email Fetched');

        /* $filename = $prescription->PrescriptionID . '-Ref-' . $prescription->ReferenceNumber . '--' . ((int) $prescription->CreatedDate) . '.xml';
        //find file
        $files = File::glob(storage_path() . "/app/xml/$prescription->PrescriptionID*.xml");
        if (count($files) < 1) {
        return $this->sendError("Failed to fetch order email", ['Failed to fetch order email']);
        } else {
        $xmlString = file_get_contents($files[0]);
        }
        $xmlObject = simplexml_load_string(utf8_encode($xmlString));
        return $this->sendResponse((string) $xmlObject->PatientDetail->Patient->Email, 'Email Fetched'); */
    }

    /**
     * Resend tracking information to the client
     *
     * @param int $id
     * @return JsonResponse
     */
    public function resendTracking(int $id): JsonResponse
    {
        $tracking = new Tracking;

        return $this->sendResponse($tracking->sendTracking($id, true, true), 'Tracking resent');
    }

    /**
     * Add a tracking code to prescription and send tracking
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function addTracking(int $id, Request $request): JsonResponse
    {
        $code = $request->code;

        if (!$code) {
            return $this->sendResponse(false, 'Tracking not set or invalid tracking code');
        }

        $tracking = new Tracking;

        if ($tracking->addTracking($id, $code)) {
            if ((new OrderService)->canUpdateOrderStatus($id, 8)) {
                Prescription::updateStatus($id, 8);
            } else {
                return $this->sendError('You are not allow to update order status');
            }

            $this->activity->log($id, 'Order changed to SHIPPED (manually added tracking)');
        } else {
            return $this->sendError('Problem on sending tracking code');
        }

        return $this->sendResponse(true, 'Tracking sent');
    }

    /**
     * Set an order for redelivery
     *
     * @param int $id
     * @return JsonResponse
     */
    public function redeliver(int $id): JsonResponse
    {
        $response = $this->order->redeliver($id);
        $this->activity->log($id, 'Order changed to ' . $this->orderStatuses[7]);

        return $this->sendResponse($response, 'Order set for redelivery');
    }

    /**
     * Get a list of onhold posponed orders for today
     *
     */
    public function onHoldPostponed(): JsonResponse
    {
        $orders = DB::table('Prescription')->where('Status', 10)->where('SubStatus', 107)->get();
        $response = [];

        foreach ($orders as $order) {
            $activityLog = DB::table('Activity')
                ->where('OrderID', $order->PrescriptionID)
                ->where('Action', 'LIKE', 'Order changed to ONHOLD - Postponed Shipping Request%')
                ->orderBy('ActivityID', 'DESC')
                ->first();

            if ($activityLog) {
                preg_match('!\(([^\)]+)\)!', $activityLog->Action, $match);
                $matchDate = $match[1];
                $currentDate = date('d/m/Y');

                $dtMatch = \DateTime::createFromFormat('d/m/Y', $matchDate)->getTimestamp();
                $dtCurrent = \DateTime::createFromFormat('d/m/Y', $currentDate)->getTimestamp();

                if ($match[1] == date('d/m/Y') || $dtCurrent > $dtMatch) {
                    $order->PostponedTo = $match[1];
                    $order->PostponedBy = $activityLog->Name;
                    $order->PostponedAt = $activityLog->Date;
                    array_push($response, $order);
                }
            }
        }

        return $this->sendResponse($response);
    }

    public function download($id, Request $request)
    {
        $token = $request->token;
        $print = $request->print;

        if (!$token) {
            return $this->sendError('Token error');
        }

        $view = $this->order->prescriptionView($id);
        $pdf = DomPDF::loadHTML($view);
        $pdf->setPaper('A4', 'landscape');
        $pdf->render();
        return $pdf->stream();
    }

    private function generatePDF($id, $view)
    {
        $pdf = DomPDF::loadHTML($view);
        $pdf->setPaper('A4', 'portrait');
        $pdf->render();

        if (isAzureStorageEnabled()) {
            Storage::disk('azure')->put("pdf/$id.pdf", $pdf->output());
        } else {
            $path = storage_path() . "/app/pdf/$id.pdf";
            $pdf->save($path);
        }
    }

    private function generateAzurePDF($id, $view)
    {
        if (!Storage::disk('azure')->exists("pdf/$id.pdf")) {
            $this->generatePDF($id, $view);
        }

        $file = Storage::disk('azure')->url("pdf/$id.pdf");
        header("Content-Type: application/pdf");
        header("Content-Disposition: inline; filename=$id.pdf");
        echo file_get_contents($file);
        die();
    }
}
