<?php

namespace App\Library;

use App\Enums\OrderStatus;
use App\Enums\Role;
use App\Models\User;
use App\Helpers\Constants;
use App\Models\Prescription;
use App\Services\OrderService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use App\Services\OrderProcessingService;

// use Carbon\Carbon;

/**
 * Helper class for getting and filling order data
 */
class Order
{
    /**
     * All the genders used in Prescription table
     *
     * @var array
     */
    public $genders = ['1' => 'Male', '2' => 'Female', '3' => 'Transgender', '4' => 'For school use'];

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

    private $searchHistory = [
        OrderStatus::SHIPPED->value,
        OrderStatus::QUERIED->value,
        OrderStatus::REJECTED->value,
        OrderStatus::RETURNED->value
    ];

    /**
     * Get order details from the prescription and country table
     * including the country name
     * @param int $id
     */
    public function getOrderDetails(int $id)
    {
        return Prescription::query()
            ->selectRaw("prescription.*, c.CodeName2 AS 'CountryCodeName', c.Name AS 'CountryName', c.RegionID")
            ->where('prescription.PrescriptionID', $id)
            ->leftJoin('Country AS c', 'prescription.DCountryCode', '=', 'c.CountryID')
            ->first();
    }

    /**
     * Undocumented function
     *
     * @param object $order
     * @return boolean
     */
    public function isCOD($order)
    {
        return $order->PaymentMethod != '0';
    }

    /**
     * Does the order require a commercial invoice
     *
     * @param object $order
     * @return boolean
     */
    public function isCI($order)
    {
        return in_array($order->DCountryCode, ['143', '162', '205', '243']) && $order->Repeats != '0' && $order->Repeats != '';
    }

    /**
     * Do we need to print out a physical commercial invoice
     *
     * @return boolean
     */
    public function isCIPaper($order)
    {
        return in_array($order->DCountryCode, ['143']) && $order->Repeats != '0' && $order->Repeats != '';
    }

    /**
     * Undocumented function
     *
     * @param mixed $order
     * @return boolean
     */
    public function isDutiable($order)
    {
        return in_array($order->DCountryCode, ['143', '162', '205', '243']);
    }

    /**
     * Get order columns by id
     *
     * @param int $id
     * @param array $columns
     * @return mixed
     */
    public function getOrderColumns(int $id, array $columns): mixed
    {
        return DB::table('Prescription')->select($columns)->where('PrescriptionID', $id)->first();
    }

    /**
     * Setup the product string to a format suitable for tables
     *
     * @param object $product
     * @param boolean $register
     * @return string
     */
    public function setupProductString($product, $register = false)
    {
        $string = '<b style="display: inline-block; max-width: 350px;">' . $product->Name . ' - ' . $product->Quantity . 'x' . $product->Dosage . ' ' . $product->Unit . '</b>';

        if ($register) {
            $string .= "<br><div style='max-width:350px; font-size: 11px;'>$product->Instructions</div>";
        }

        return $string;
    }

    /**
     * Get customer details via prescription ID
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|object|static|null
     */
    public function getCustomerDetails($id)
    {
        return DB::table('Prescription')
            ->select(['Name', 'Middlename', 'Surname', 'Sex', 'DOB', 'CustomerID', 'UserID', 'ClientID'])
            ->where('PrescriptionID', $id)
            ->first();
    }

    /**
     * Get prescriptions reference number
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|object|static|null
     */
    public function getReferenceNumber($id)
    {
        return DB::table('Prescription')->where('PrescriptionID', $id)->value('ReferenceNumber');
    }

    /**
     * Set import to awaiting shipped
     *
     * @param int $id
     * @return int
     */
    public function setToImportAwaiting($id)
    {
        return DB::table('Prescription')->where('PrescriptionID', $id)->update(['Exemption' => 3]);
    }

    /**
     * Get first product from the product table by prescription id
     *
     * @param int $id
     * @return mixed
     */
    public function getProduct(int $id): mixed
    {
        return DB::table('Product AS p')->selectRaw("p.*")->where('PrescriptionID', $id)->first();
    }

    /**
     * Get product code from ProductCode table using the Code column
     *
     * @param string $code
     * @return mixed
     */
    public function getProductCode(string $code): mixed
    {
        return DB::table('ProductCode AS pc')->selectRaw("pc.*")->where('Code', $code)->first();
    }

    /**
     * Get all of the products related to the prescription
     *
     * @param int $id
     * @return \Illuminate\Support\Collection
     */
    public function getProducts($id, $detailed = false, $brief = false)
    {
        $data = DB::table('Product AS p');

        if ($detailed) {
            $data = $data->select([
                'p.Description',
                'pc.Code',
                'pc.Fridge',
                'pc.ProductType',
                'pc.Name',
                'pc.Units',
                'pc.OTC',
                'p.Quantity',
                'pc.Quantity AS ProductQuantity',
                'p.Dosage',
                'p.Instructions',
                'p.ProductID'
            ])
                ->leftJoin('ProductCode as pc', 'pc.Code', '=', 'p.Code')
                ->where('p.PrescriptionID', $id);
        } else if ($brief) {
            $data = $data->selectRaw("p.ProductID")->where('PrescriptionID', $id);
        } else {
            $data = $data->selectRaw("p.*")->where('PrescriptionID', $id);
        }

        return $data->orderBy('p.ProductID', 'DESC')->get();
    }

    public function getAttachedProducts($ids)
    {
        return DB::table('InventoryItem')
            ->selectRaw("ProductID, FMDBatchID, COALESCE(DATE_FORMAT(STR_TO_DATE(FMDExpiryDate, '%y%m%d'), '%m/%Y'), FMDExpiryDate) AS 'FMDExpiryDate'")
            ->whereIn('ProductID', $ids)->where('Status', 'SHIPPED')->get();
    }

    /**
     * Check if the reference number is duplicated
     *
     * @param int $id
     * @param object $prescription
     * @return mixed
     */
    public function checkDuplicate(int $id, object $prescription): mixed
    {
        return DB::table('Prescription')
            ->select(['PrescriptionID', 'ReferenceNumber', 'Status', 'SubStatus'])
            ->where('PrescriptionID', '!=', $id)->where('ClientID', '=', $prescription->ClientID)
            ->where('ReferenceNumber', '=', $prescription->ReferenceNumber)->first();
    }

    /**
     * Get all of the products related to the prescription, but detailed
     *
     * @param int $id
     */
    public function getProductsDetailed(int $id): Collection
    {
        return DB::table('Product AS p')
            ->select(['p.Description', 'pc.Code', 'pc.Fridge', 'pc.Name', 'pc.Units', 'p.Quantity', 'p.Dosage', 'p.Instructions', 'p.ProductID'])
            ->leftJoin('ProductCode as pc', 'pc.Code', '=', 'p.Code')
            ->where('p.PrescriptionID', $id)->get();
    }

    /**
     * Get the list of delivery companies - type 2 of the setting table
     *
     */
    public function getDeliveryCompanies(): Collection
    {
        return DB::table('Setting')->where('Type', 2)->orderBy('Name', 'desc')->get();
    }

    /**
     * Get delivery company name
     *
     */
    public function getDeliveryCompanyName($id): mixed
    {
        return DB::table('Setting')->where('SettingID', $id)->value('Name');
    }

    /**
     * Get shipper data
     * Hardcoded type to 1
     * The shipper is actually HRhealthcare, this should be refactored
     *
     */
    public function getShipperData(): mixed
    {
        return DB::table('Client AS p')->selectRaw("p.*, c.CodeName2 AS 'CountryCodeName', c.Name AS 'CountryName', c.RegionID")
            ->leftJoin('Country AS c', 'p.CountryID', '=', 'c.CountryID')->where('Type', 1)->first();
    }

    /**
     * Get return data
     *
     */
    public function getReturnData($id): mixed
    {
        return DB::table('Client AS p')->selectRaw("p.*, c.CodeName2 AS 'CountryCodeName', c.Name AS 'CountryName'")
            ->leftJoin('Country AS c', 'p.CountryID', '=', 'c.CountryID')->where('Type', 1)->first();
    }

    /**
     * @param int $id
     */
    public function getAlternateShipperData(int $id): mixed
    {
        return DB::table('UPSAccessPoint AS u')->selectRaw("u.*, c.CodeName2 AS 'CountryCodeName', c.Name AS 'CountryName'")
            ->leftJoin('Country AS c', 'u.CountryCode', '=', 'c.CountryID')
            ->where('PrescriptionID', $id)->first();
    }

    /**
     * Update the order creation time
     *
     * @param int $id
     * @param string $date
     * @return int|bool
     */
    public function updateOrderDate($id, $date)
    {
        $timestamp = strtotime($date);

        return DB::table('Prescription')->where('PrescriptionID', $id)->update(
            [
                'CreatedDate' => $timestamp
            ]
        );
    }

    /**
     * Change the status of the prescription in the Tray pool
     *
     * @param int $id
     * @param int $status
     * @return void
     */
    public function changePoolStatus($id, $status)
    {
        if ($status == 2) {
            DB::table('DispenserPool')->where('PrescriptionID', $id)->delete();

            DB::table('DispenserPool')->insert([
                'PrescriptionID' => $id,
                'Date' => time(),
                'UserID' => 0,
                'Type' => 0,
                'Status' => 0,
            ]);
        } else {
            DB::table('DispenserPool')->where('PrescriptionID', $id)->delete();
        }
    }

    /**
     * Update order to status with number
     *
     */
    public function updateOrderStatus(int $id, int $status, ?int $substatus = NULL, bool $wipeTracking = false): int
    {
        $update = [
            'Status' => $status,
            'UpdatedDate' => time()
        ];

        $update['SubStatus'] = $substatus;

        if (in_array($status, [8, 3, 6, 12])) {
            $update['Email'] = '';
            $update['Telephone'] = '';
            $update['Mobile'] = '';
        }

        //if already shipped and status changed to awaitingship email, phone and mobile fetch from xml
        $oldStatus = $this->getOrderStatus($id);
        if ($status == 7 && $oldStatus == 8) {
            $data = getEmailPhoneFromXML($id);
            $update['Email'] = $data['email'];
            $update['Telephone'] = $data['Telephone'] ? $data['Telephone'] : $data['Mobile'];
            $update['Mobile'] = $data['Mobile'];
        }

        if ($wipeTracking) {
            $update['TrackingCode'] = '';
        }

        $this->updateOrderHistory($id, $status, $substatus);

        return DB::table('Prescription')->where('PrescriptionID', $id)->update($update);
    }

    /**
     * Update order history with certain status and substatus
     *
     * @param int $id
     * @param int $status
     * @param int $substatus
     * @return bool
     */
    public function updateOrderHistory($id, $status, $substatus = NULL, $user = true)
    {
        return DB::table('PrescriptionHistory')->insert([
            'PrescriptionID' => $id,
            'Status' => $status,
            'SubStatus' => $substatus,
            'UpdatedBy' => $user ? Auth::id() : 0,
            'UpdatedDate' => time()
        ]);
    }

    /**
     * Update the message in prescription
     *
     * @param int $id
     * @param string $message
     * @return int
     */
    public function updateOrderMessage($id, $message)
    {
        return DB::table('Prescription')->where('PrescriptionID', $id)->update(
            [
                'Message' => $message
            ]
        );
    }

    /**
     * Get the status of a specific prescription
     *
     * @param int $id
     */
    public function getOrderStatus(int $id): mixed
    {
        return DB::table('Prescription')->where('PrescriptionID', $id)->value('Status');
    }

    /**
     * Get order details from the prescription table
     *
     * @param int $id
     * @param bool $additionalInfo
     * @return object|null
     */
    public function orderDetails($id, $additionalInfo = false)
    {
        $prescription = DB::table('Prescription AS p')
            // ->select(['p.*', '', 'c.CompanyName', 'co.Name AS CountryName', 'do.DoctorType'])
            ->select([
                'p.*',
                'c.CompanyName',
                'co.Name AS CountryName',
                'do.Name as DName',
                'do.Surname as DSurname',
                'do.Title as DTitle',
                'do.DoctorType',
                'do.Address1 as DoctorAddress1',
                'do.Address2 as DoctorAddress2',
                'do.Address3 as DoctorAddress3',
                'do.Address4 as DoctorAddress4',
                'do.Postcode as DoctorPostCode',
                'pf.file_type'
            ])
            ->selectRaw("(YEAR(CURDATE())-YEAR(STR_TO_DATE(REPLACE(DOB,'/',','),'%d,%m,%Y'))) - (RIGHT(CURDATE(),5)<RIGHT(STR_TO_DATE(REPLACE(DOB,'/',','),'%d,%m,%Y'),5)) AS Age")
            ->where('PrescriptionID', $id)
            ->leftJoin('Client AS c', 'c.ClientID', '=', 'p.ClientID')
            ->leftJoin('Country as co', 'p.DCountryCode', '=', 'co.CountryID')
            // ->leftJoin('Doctor as do', 'do.DoctorID', '=', 'p.DoctorID');
            ->leftJoin('DoctorAddress as do', 'do.DoctorAddressID', '=', 'p.DoctorAddressID')
            ->leftJoin('prescription_files as pf', 'pf.prescription_id', '=', 'p.PrescriptionID');

        if ($additionalInfo) {
            $prescription = $prescription->selectRaw("do.DoctorID, co2.Name as DCName, do.Notes as DNotes, do.DoctorType")
                ->leftJoin('Country AS co2', 'co2.CountryID', '=', 'do.CountryID');
        }

        $prescription = $prescription->first();
        if (!empty($prescription->Frequency)) {
            $prescription->Frequency = getFrequency($prescription->Frequency);
        }

        return $prescription;
    }

    /**
     * Setup query builder object for order
     *
     * @param bool $patientDetails
     * @param bool $trayStatus
     * @param bool $csv
     * @return \Illuminate\Database\Query\Builder
     */
    public function order($patientDetails = false, $trayStatus = false, $csv = false)
    {
        $columns = [
            'Prescription.PrescriptionID',
            'Prescription.ReferenceNumber',
            'Prescription.DeliveryID',
            'Client.CompanyName',
            'Prescription.Status',
            'Prescription.SubStatus',
            'Prescription.JVM',
            'Prescription.ClientID'
        ];

        $query = DB::table('Prescription')->select($columns);

        if ($patientDetails) {
            $query = $this->withPatientDetails($query);
        }

        if ($trayStatus) {
            $query = $this->withTrayStatus($query);
        } else {
            $query = $query->selectRaw("Prescription.CreatedDate AS received_date")
                ->selectRaw("ph.oldest AS processed_date");
        }

        if ($csv) {
            $query = $this->withCSV($query);
        }

        return $query->leftJoin('Client', 'Prescription.ClientID', '=', 'Client.ClientID')
            ->leftJoin(DB::raw("(SELECT PrescriptionID, MIN(UpdatedDate) AS oldest, Status, SubStatus
            FROM `prescriptionhistory`
            GROUP BY PrescriptionID) as ph"), 'ph.PrescriptionID', '=', 'prescription.PrescriptionID')
            ->groupBy('prescription.PrescriptionID');
    }

    private function withPatientDetails($query)
    {
        return $query->selectRaw("CONCAT('<b>',Prescription.Name, ' ', Prescription.Surname, '</b><br>',
        COALESCE(Prescription.DAddress1, ''), ' ', COALESCE(Prescription.DAddress2,''), ' ', COALESCE(Prescription.DAddress3, ''), ' ', COALESCE(Prescription.DAddress4, ''),
        '<br>', COALESCE(Prescription.Postcode,''),', ' , c.Name) AS 'Patient Name/Address', Prescription.AirwayBillNumber")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'Prescription.DCountryCode');
    }
    private function withTrayStatus($query)
    {
        $user = Auth::user();
        $query = $query->selectRaw("Prescription.CreatedDate AS 'Received Date'");

        if (in_array($user->role, [Role::DISPENSER->value, Role::LOCUM_DISPENSER->value])) {
            $query = $query->selectRaw("Prescription.Exemption, Prescription.PaymentMethod, Prescription.UPSAccessPointAddress"); //checkboxes are not used here so no need
        } else {
            $query = $query->selectRaw("Prescription.Exemption, Prescription.PaymentMethod, COALESCE((SELECT Status FROM Tray WHERE Tray.PrescriptionID = Prescription.PrescriptionID AND Status = 1 LIMIT 1),0) AS disabled, Prescription.UPSAccessPointAddress");
        }
        return $query;
    }
    private function withCSV($query)
    {
        return $query->selectRaw("CONCAT(COALESCE(Prescription.DAddress1, ''), ' ',
        COALESCE(Prescription.DAddress2,''), ' ', COALESCE(Prescription.DAddress3, ''), ' ', COALESCE(Prescription.DAddress4, ''),
        COALESCE(Prescription.Postcode,'')) AS 'Patient Address'")
            ->selectRaw("c.Name AS Country, Prescription.TrackingCode")
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'Prescription.DCountryCode')
            ->selectRaw("Prescription.Name AS Name, Prescription.Surname AS Surname");
    }

    /**
     * Undocumented function
     *
     * @param boolean $csv
     * @return \Illuminate\Database\Query\Builder
     */
    public function register($csv = false)
    {
        $data = DB::table('Prescription')
            ->selectRaw("Prescription.PrescriptionID, Prescription.ReferenceNumber, Prescription.CreatedDate as 'Date Recieved', ph.oldest as 'Date Supplied'")
            ->leftJoin('DoctorAddress as do', 'do.DoctorAddressID', '=', 'Prescription.DoctorAddressID')
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'Prescription.DCountryCode')
            ->leftJoin('Country AS c2', 'c2.CountryID', '=', 'do.CountryID')
            ->leftJoin(DB::raw("(SELECT PrescriptionID, MIN(UpdatedDate) AS oldest, Status, SubStatus
            FROM `prescriptionhistory`
            WHERE Status = 8
            GROUP BY PrescriptionID) as ph"), 'ph.PrescriptionID', '=', 'prescription.PrescriptionID')
            ->where('ph.Status', OrderStatus::SHIPPED->value);

        if ($csv) {
            $data = $data->selectRaw("Prescription.ReferenceNumber")
                ->selectRaw("c.Name AS Country")
                ->selectRaw("c2.Name AS PrescriberCountry")
                ->selectRaw("CONCAT(COALESCE(Prescription.DAddress1, ''), ' ', COALESCE(Prescription.DAddress2,''), ' ', COALESCE(Prescription.DAddress3, ''), ' ', COALESCE(Prescription.DAddress4, ''),
            COALESCE(Prescription.DPostcode,'')) AS 'Patient Address'")
                ->selectRaw("CONCAT(COALESCE(do.Address1,''), ' ', COALESCE(do.Address2,''), ' ', COALESCE(do.Address3,''), ' ', COALESCE(do.Address4,''),
            COALESCE(do.Postcode,'')) AS 'Prescriber Address'")
                ->selectRaw("CONCAT(CASE WHEN DoctorType = 1 THEN 'GMC: ' WHEN DoctorType = 2 THEN 'EU: ' WHEN DoctorType = 3 THEN 'GPHC:' WHEN DoctorType = 4 THEN 'Test: ' WHEN DoctorType = 5 THEN 'IMC: '  ELSE 'Not Set: ' END, ' ', COALESCE(do.GMCNO,'')) AS DType")
                ->selectRaw("Prescription.Name AS Name, Prescription.Surname AS Surname, do.Name AS PrescriberName, do.Surname AS PrescriberSurname");
        } else {
            $data = $data
                ->selectRaw("CONCAT('<b>', Prescription.PrescriptionID, '</b></br>', ' (<i>Ref No: </i>', Prescription.ReferenceNumber, ')') AS ReferenceID")
                ->selectRaw("CONCAT('<b>',Prescription.Name, ' ', Prescription.Surname, '</b><br>',
            COALESCE(Prescription.DAddress1, ''), ' ', COALESCE(Prescription.DAddress2,''), ' ', COALESCE(Prescription.DAddress3, ''), ' ', COALESCE(Prescription.DAddress4, ''),
            '<br>', COALESCE(Prescription.DPostcode,''),', ' , c.Name) AS 'Patient Name/Address'")
                ->selectRaw("CONCAT('<b>',do.Name, ' ', do.Surname, '</b> (<i>',
            CASE WHEN DoctorType = 1 THEN 'GMC: ' WHEN DoctorType = 2 THEN 'EU: ' WHEN DoctorType = 3 THEN 'GPHC:' WHEN DoctorType = 4 THEN 'Test: '  WHEN DoctorType = 5 THEN 'IMC: ' ELSE 'Not Set: ' END,
            '</i>',COALESCE(do.GMCNO,''), ')' , '<br>',
            COALESCE(do.Address1,''), ' ', COALESCE(do.Address2,''), ' ', COALESCE(do.Address3,''), ' ', COALESCE(do.Address4,''),
            '<br>', COALESCE(do.Postcode,''),', ' , COALESCE(c2.Name,'')) AS 'Prescriber Name/Address'");
        }

        return $data;
    }

    /**
     * Get product list via PrescriptionID
     *
     * @param array $items
     * @param bool $register
     * @param bool $prescriptionPool
     * @return \Illuminate\Support\Collection
     */
    public function products($items, $register = false, $prescriptionPool = false)
    {
        $fields = [
            'Product.PrescriptionID',
            'ProductCode.Name',
            'ProductCode.JVM',
            'ProductCode.ProductCodeID',
            'Product.Dosage',
            'Product.Quantity',
            'Product.Unit',
            'ProductCode.Units as product_units'
        ];

        if ($register) {
            array_push($fields, 'Product.Instructions');
        }

        if ($prescriptionPool) {
            array_push($fields, 'Product.Description');
            array_push($fields, 'ProductCode.Fridge');
        }

        return DB::table('Product')->select($fields)
            ->leftJoin('ProductCode', 'Product.Code', '=', 'ProductCode.Code')
            ->groupBy('Product.ProductID')
            ->orderBy('Product.ProductID', 'DESC')
            ->whereIn('PrescriptionID', $items)
            ->get();
    }

    /**
     * Setup order filters
     *
     * @param object $query
     * @param string $f
     * @return object
     */
    public function filterOrderByStatus($query, $f)
    {
        switch ($f) {
            case 'new':
                $query = $query->where('Prescription.Status', '1')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'safety':
                $query = $query->where('Prescription.Status', '9')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'postponed':
                $query = $query->where('Prescription.Status', '5')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'approved':
                $query = $query->where('Prescription.Status', '2')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'dpd':
                $query = $query->where('Prescription.Status', '7')
                    ->where('Prescription.DeliveryID', '4')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'ups':
                $query = $query->where('Prescription.Status', '7')
                    ->where('Prescription.DeliveryID', '7')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'dhl':
                $query = $query->where('Prescription.Status', '7')
                    ->where('Prescription.DeliveryID', '10')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'rml':
                $query = $query->where('Prescription.Status', '7')
                    ->where('Prescription.DeliveryID', '5')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'awaiting':
                $query = $query->where('Prescription.Status', '7')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'shipped':
                $query = $query->where('Prescription.Status', '8')
                    ->whereRaw("UpdatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())");
                break;
            case 'rejected':
                $query = $query->where('Prescription.Status', '3')
                    ->whereRaw("UpdatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())");
                break;
            case 'queried':
                $query = $query->where('Prescription.Status', '4')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'call':
                $query = $query->where('Prescription.Status', '11')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'cancelled':
                $query = $query->where('Prescription.Status', '6')
                    ->whereRaw("UpdatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY) AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())");
                break;
            case 'onhold':
                $query = $query->where('Prescription.Status', '10')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            case 'return':
                $query = $query->where('Prescription.Status', '16')
                    ->whereRaw("Prescription.CreatedDate<=UNIX_TIMESTAMP(CURDATE() + INTERVAL 1 DAY)");
                break;
            default:
                break;
        }

        return $query;
    }

    public function filterOrderByClient($query, $f)
    {
        return $query->where('Prescription.ClientID', $f);
    }


    public function filterOrderByDeliveryCompany($query, $f)
    {
        return $query->where('Prescription.DeliveryID', $f);
    }

    /**
     * Set search parameters for orders and reference numbers
     *
     * @param mixed $f
     * @param mixed $request
     * @param mixed $data
     * @return object
     */
    public function setSearchParameters($f, $request, $data)
    {
        $filters = json_decode($f);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';

        if (isset($filters->timestamp)) {
            $dateFilter = $filters->timestamp == 'recieved_date' ? 'Prescription.CreatedDate' : 'ph.oldest';
        } else {
            $dateFilter = 'Prescription.CreatedDate';
        }

        foreach ($filters as $key => $value) {
            if ($value != '') {
                switch ($key) {
                    case 'start_date':
                        $date = new \DateTime($value);
                        $date->setTime(00, 00, 00);
                        $date = $date->getTimestamp();
                        $data = $data->where($dateFilter, '>', $date);
                        break;
                    case 'end_date':
                        $date = new \DateTime($value);
                        $date->setTime(23, 59, 59);
                        $date = $date->getTimestamp();
                        $data = $data->where($dateFilter, '<', $date);
                        break;
                    case 'order_id':
                        $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                        $valueArray = preg_split('/[\ \n\,]+/', $value);

                        $data = $data->whereIn('Prescription.PrescriptionID', $valueArray);

                        break;
                    case 'country':
                        if (in_array(1, $value, true)) {
                            array_push($value, 244);
                            array_push($value, 245);
                        }

                        if (in_array('1-northern-ireland', $value, true) && !in_array('1-great-britain', $value, true)) {
                            $data = $data->where('Prescription.DPostCode', 'LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-northern-ireland']);
                        } else if (!in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $data = $data->where('Prescription.DPostCode', 'NOT LIKE', "BT%");
                            array_push($value, 1);
                            $value = array_diff($value, ['1-great-britain']);
                        } else if (in_array('1-northern-ireland', $value, true) && in_array('1-great-britain', $value, true)) {
                            $value = array_diff($value, ['1-northern-ireland', '1-great-britain']);
                            array_push($value, 1);
                        }

                        $data = $data->whereIn('Prescription.DCountryCode', $value);

                        break;
                    case 'status':
                        if (!isset($filters->return_history) || $filters->return_history != 'yes') {
                            $data = $data->where('Prescription.Status', '=', $value);
                        }
                        break;
                    case 'status-extended':
                        if (in_array($value, $this->searchHistory)) {
                            $data->addSelect(['ph.Status as history_status', 'ph.SubStatus as history_sub_status', 'ph.oldest as history_date']);
                        } else {
                            $data->whereRaw('(Prescription.Status = ? OR Prescription.SubStatus = ?)', [$value, $value]);
                        }
                        break;
                    case 'statuses':
                        $data = $data->whereIn('Prescription.Status', $value);
                        break;
                    case 'dashboard':
                        $data = $data->whereRaw("
                            ( Prescription.Status IN(3,5,6,8,12,13,14)
                            AND  Prescription.UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                            AND  Prescription.UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                            OR  ( Prescription.Status IN(1)
                            AND  Prescription.CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                            OR  (Prescription.Status IN(2,4,7,9,10,11,16))
                        ");
                        break;
                    case 'delivery':
                        $data = $data->where('Prescription.DeliveryID', '=', $value);
                        break;
                    case 'doctor':
                        $data = $data->where('Prescription.DoctorID', '=', $value);
                        break;
                    case 'reference':
                        $value = preg_replace('/\t/', '', ltrim(rtrim($value)));
                        $valueArray = preg_split('/[\ \n\,]+/', $value);

                        $data = $data->whereIn('Prescription.ReferenceNumber', $valueArray);

                        break;
                    case 'name':
                        $data = $data->where('Prescription.Name', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'surname':
                        $data = $data->where('Prescription.Surname', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'address':
                        $data = $data
                            ->where('Prescription.Address1', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.Address2', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.Address3', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.Address4', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.Postcode', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.DAddress1', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.DAddress2', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.DAddress3', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.DAddress4', $operator, $strict ? $value : "%$value%")
                            ->orWhere('Prescription.DPostcode', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'client':
                        $data = $data->where('Prescription.ClientID', '=', $value);
                        break;
                    case 'product':
                        $data = $data->whereRaw("Prescription.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code = '$value')");
                        break;
                    case 'gender':
                        $data = $data->where('Sex', $value);
                        break;
                    case 'product-multiple':
                        $marks = implode(',', array_fill(0, sizeof($value), '?'));

                        if (sizeof($value) > 0) {
                            $data = $data->whereRaw("Prescription.PrescriptionID IN (SELECT PrescriptionID FROM Product WHERE Product.Code IN ($marks))", [$value]);
                        }
                        break;
                    case 'additional':
                        foreach ($value as $f) {
                            if ($f == '1') {
                                $data = $data->whereRaw("Prescription.PaymentMethod != 0");
                            } else if ($f == '2') {
                                $data = $data->whereRaw("Prescription.Repeats != 0 AND Prescription.Repeats != '' AND Prescription.DCountryCode IN (143,162,205,243)");
                            } else if ($f == '3') {
                                $data = $data->whereRaw("Prescription.SaturdayDelivery != 0");
                            } else if ($f == '4') {
                                $data = $data->whereRaw("Prescription.UPSAccessPointAddress != 0");
                            } else if (in_array($f, ['50', '51'])) {
                                $data = $data->leftJoin("Product", 'Product.PrescriptionID', '=', 'Prescription.PrescriptionID')
                                    ->leftJoin("ProductCode", 'ProductCode.Code', '=', 'Product.Code');

                                if ($f == '51') {
                                    $data = $data->whereRaw("ProductCode.Fridge = 1");
                                } else if ($f == '50') {
                                    $data = $data->whereRaw("ProductCode.Fridge = 0");
                                }
                            } else if (in_array($f, ['60', '61'])) {
                                $data = $data->leftJoin("Product", 'Product.PrescriptionID', '=', 'Prescription.PrescriptionID')
                                    ->leftJoin("ProductCode", 'ProductCode.Code', '=', 'Product.Code');

                                if ($f == '61') {
                                    $data = $data
                                        ->whereRaw("(
                                    ((Prescription.JVM = 0 AND ProductCode.JVM = 1)
                                    OR (Prescription.JVM = 1 AND ProductCode.JVM = 0)
                                    OR (Prescription.JVM = 1 AND ProductCode.JVM = 1)
                                    OR (SELECT Barcode FROM InventoryItem WHERE ProductID = Product.ProductID LIMIT 1) = 'CANISTER')
                                    AND Prescription.ClientID = 51
                                    )");
                                } else if ($f == '60') {
                                    $data = $data->whereRaw("(
                                    ProductCode.JVM = 2 OR
                                    (Prescription.JVM = 1 AND ProductCode.JVM = 2) OR
                                    (Prescription.JVM = 0 AND ProductCode.JVM = 0)
                                    )");
                                }
                            } else if ($f == 7) {
                                //frequency
                                $data = $data->whereNotNull("Prescription.Frequency");
                            } else if ($f == 8) {
                                //condition
                                $data = $data->whereNotNull("Prescription.Condition");
                            }
                        }

                        break;
                    case 'return_history':
                        if ($value == 'yes') {
                            $data = $data->join('PrescriptionHistory as ph', 'ph.PrescriptionID', '=', 'Prescription.PrescriptionID')
                                ->addSelect(['ph.Status as return_status', 'ph.SubStatus as return_sub_status', 'ph.UpdatedDate as return_date'])
                                ->where('ph.Status', OrderStatus::RETURNED->value);
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return $data;
    }

    /**
     * Speed up the register pagination by using simplePagination
     *
     * @param mixed $data
     * @param mixed $l
     * @param mixed $f
     * @param mixed $q
     */
    public function registerPagination($data, $l, $f, $q)
    {
        $filters = json_decode($f);

        $filtersExist = false;
        // $total = false;

        foreach ($filters as $filter) {
            if ($filter != '') {
                $filtersExist = true;
            }
        }

        if ($q != '') {
            $filtersExist = true;
        }

        if ($filtersExist) {
            $data = $data->paginate($l);
        } else {
            $data = $data->simplePaginate($l);

            // $total = DB::table('Prescription')->where('Status', 8)->count();
        }

        return $data;
        // return ['data' => $data, 'total' => $total];
    }

    /**
     * Undocumented function
     *
     * @param mixed $data
     * @param mixed $items
     * @param mixed $filters
     * @param mixed $target
     * @param string $caller
     * @return object
     */
    public function displayUnknownSearchParameters($data, $items, $filters, $target, $caller = 'search')
    {
        $searchedIds = [];
        $notFoundIds = [];

        if (isset($filters->{$target})) {
            //get not found searches
            $filters->{$target} = preg_replace('/\t/', '', rtrim($filters->{$target}));
            $searchedIds = preg_split('/[\ \n\,]+/', $filters->{$target});


            $notFoundIds = array_diff($searchedIds, $items);

            if ($data->count() > 0 && count($searchedIds) > 0 && $searchedIds[0] != '') {
                foreach ($notFoundIds as $id) {
                    $blankItem = clone ($data->items()[0]);

                    foreach ($blankItem as $key => $value) {
                        if ($target == 'order_id') {

                            if ($key == 'PrescriptionID') {
                                $blankItem->$key = $id;
                            } else if ($key == 'ReferenceID') {

                                if ($caller == 'pom') {
                                    $blankItem->$key = "<b>$id</b></br> (<i>Ref No: </i>Unknown)";
                                } else {
                                    $blankItem->ReferenceNumber = 'Unknown';
                                    $blankItem->$key = 'Unknown';
                                }
                            } else if ($key == 'DeliveryID' || $key == 'Status') {
                                $blankItem->$key = 0;
                            } else {
                                $blankItem->$key = 'Unknown';
                            }
                        } else if ($target == 'reference') {

                            if ($key == 'PrescriptionID') {
                                $blankItem->$key = 'Unknown';
                            } else if ($key == 'ReferenceID') {
                                if ($caller == 'pom') {
                                    $blankItem->$key = "<b>$id</b></br> (<i>Ref No: </i>Unknown)";
                                } else {
                                    $blankItem->$key = $id;
                                }
                            } else if ($key == 'ReferenceNumber') {
                                $blankItem->$key = $id;
                            } else if ($key == 'DeliveryID' || $key == 'Status') {
                                $blankItem->$key = 0;
                            } else {
                                $blankItem->$key = 'Unknown';
                            }
                        }

                        $blankItem->NotFound = true;
                    }

                    $data->getCollection()->push($blankItem);
                }
            }
        }

        return $data;
    }

    /**
     * Get test kits by prescriptionID
     *
     */
    public function getTestKits(int $id): Collection
    {
        return DB::table('TestKit')->where('PrescriptionID', $id)->where('Count', '!=', 1)->orderBy('Count', 'ASC')
            ->get();
    }

    /**
     * Get print record using the prescriptionID
     *
     * @param int $id
     */
    public function getPrintRecord($id): Collection
    {
        return DB::table('PrintRecord')->where('PrescriptionID', $id)->get();
    }

    /**
     * Check the products to see which documentation the delivery note will need to contain
     * This needs to be used when generating prescription too
     * Additional information is bugged
     *
     * @param mixed $id
     */
    public function getPrintDetails($id): mixed
    {
        return DB::table('Prescription AS p')
            ->selectRaw("
        CAST(SUM(IF(p.ClientID=51, 1, 0)) AS UNSIGNED) AS 'EveAdamLetter',
        CAST(SUM(IF(pc.ProductType=2, 1, 0)) AS UNSIGNED) AS 'PathologyRequestForm',
        CAST(SUM(IF((pai.PAIID OR pwl.PWLID AND p.CountryCode!=1), 1, 0)) AS UNSIGNED) AS 'ProductAdditionalInformation',
        CAST(SUM(IF((i.Lang=p.DCountryCode AND p.DCountryCode!=1), 1, 0)) AS UNSIGNED) AS 'ProductInformationLeaflet'
        ")
            ->leftJoin('Product AS pr', 'pr.PrescriptionID', '=', 'p.PrescriptionID')
            ->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'pr.Code')
            ->leftJoin('ProductInstruction AS pil', 'pil.ProductID', '=', 'pc.ProductCodeID')
            ->leftJoin('Instruction AS i', 'i.InstructionID', '=', 'pil.InstructionID')
            ->leftJoin('ProductAdditionalInformation AS pai', 'pai.ProductID', '=', 'pr.Code')
            ->leftJoin('AdditionalInformation AS ai', 'ai.Type', '=', 'pai.Type')
            ->leftJoin('ProductWarningLabel AS pwl', 'pwl.ProductID', '=', 'pr.Code')
            ->where('p.PrescriptionID', $id)
            ->first();
    }

    /**
     * Get a count of prescriptions with requested status
     *
     * @param int $status
     */
    public function getCountWithStatus(int $status): int
    {
        return DB::table('Prescription')->where('Status', $status)->count();
    }

    /**
     * Insert labels in pharmacy label table for each product belonging to the prescription id
     *
     * @param int $id
     * @return void
     */
    public function insertLabel($id)
    {
        $products = DB::table('Product')->select('Product.*', 'ProductCode.Name', 'ProductCode.Units', 'ProductCode.Quantity AS ProductCodeQuantity')
            ->leftJoin('ProductCode', 'ProductCode.Code', '=', 'Product.Code')
            ->where('PrescriptionID', $id)->get();

        foreach ($products as $product) {
            if (!DB::table('PharmacyLabel')->where('ProductID', $product->ProductID)->first()) {
                $quantity = (int) $product->Dosage * (int) $product->Quantity;
                $remainder = $quantity % (int) $product->ProductCodeQuantity;
                $oddPack = false;

                if ($quantity < $product->ProductCodeQuantity || $remainder != 0) {
                    $oddPack = true;
                }

                $labelCount = ceil($quantity / (int) $product->ProductCodeQuantity);

                for ($i = 0; $i < $labelCount; $i++) {
                    $insert = [
                        'ProductID' => $product->ProductID,
                        'Instruction' => explode(';', $product->Instructions)[0],
                        'Pack' => 1,
                        'Type' => 1,
                        'Status' => 1,
                        'Code' => $product->Code,
                    ];

                    if ($oddPack) {
                        $insert['Dosage'] = $remainder;
                        $insert['Description'] = $product->Name . ' ' . $remainder . ' ' . $product->Units;
                    } else {
                        $insert['Dosage'] = $product->ProductCodeQuantity;
                        $insert['Description'] = $product->Name . ' ' . $product->ProductCodeQuantity . ' ' . $product->Units;
                    }

                    DB::table('PharmacyLabel')->insert($insert);
                }
            }
        }
    }

    /**
     * Match language to a value (id or string)
     * Replace this with proper mapping so it can be translated to a db easly
     *
     * @return mixed
     */
    public function matchLanguageMapping($needle, $language = true)
    {
        $map = [
            '1' => 'ENU',
            '2' => 'ENU',
            '15' => 'ENU',
            '58' => 'CES',
            '59' => 'DAN',
            '83' => 'DEU',
            '86' => 'ELL',
            '69' => 'EST',
            '74' => 'FIN',
            '75' => 'FRA',
            '106' => 'HEB',
            '99' => 'HUN',
            '107' => 'ITA',
            '119' => 'LAV',
            '125' => 'LIT',
            '152' => 'NLD',
            '162' => 'NOR',
            '172' => 'POL',
            '173' => 'POR',
            '177' => 'RON',
            '178' => 'RUS',
            '191' => 'SLK',
            '192' => 'SLV',
            '196' => 'SPE',
            '204' => 'SWE',
            '216' => 'TUR',
        ];

        foreach ($map as $key => $value) {
            if ((int) $key == $needle && $language) {
                return $value;
            } else if ($value == $needle && !$language) {
                return (int) $key;
            }
        }

        return $language ? 'ENU' : 1;
    }

    /**
     * Count deliveries in a country for a delivery company
     * start date and enddate is today
     * string sqlstring = "SELECT COUNT(1) AS count FROM Prescription WHERE DeliveryID=" + DeliveryID + " AND DCountryCode=" + CountryID + " AND CreatedDate>" + SDate + " AND CreatedDate<" + EDate;
     * @param mixed $countryCode
     * @param mixed $deliveryId
     * @return int
     */
    public function countTodaysDeliveries($countryCode, $deliveryId)
    {
        return DB::table('Prescription')
            ->where(['DCountryCode' => $countryCode, 'DeliveryID' => $deliveryId])
            ->where('CreatedDate', '>', strtotime("today"))
            ->where('CreatedDate', '<', (strtotime("tomorrow") - 1))
            ->count();
    }

    /**
     * Call postcode formatting
     *
     * @param int $id
     * @param bool $order
     * @return array
     */
    public function formatPostcode($id = 0, $order = false)
    {
        if (!$id && !$order) {
            return [];
        } else if ($id && !$order) {
            $order = $this->getOrderDetails($id);
        } else if ($id && $order) {
            $order = (object) $order;

            if (!property_exists($order, 'CountryCodeName')) {
                $order->CountryCodeName = DB::table('Country')->where('CountryID', $order->DCountryCode)->value('CodeName2');
            }
        }

        $postcode = $this->formatPostcodeCountry($order->CountryCodeName, $order->Postcode);
        $dPostcode = $this->formatPostcodeCountry($order->CountryCodeName, $order->DPostcode);

        return [
            'Postcode' => $postcode,
            'DPostcode' => $dPostcode
        ];
    }

    /**
     * Format postcode by countrycode
     *
     * @param mixed $countryCode
     * @param mixed $postcode
     * @return string
     */
    public function formatPostcodeCountry($countryCode, $postcode)
    {
        if ($countryCode == "NL") {
            $postcode = str_replace(" ", "", $postcode);
            $postcode = str_replace("-", "", $postcode);
            $postcode = substr($postcode, 0, 4) . " " . substr($postcode, 4, strlen($postcode) - 4);
        } else if ($countryCode == "SE") {
            $postcode = str_replace(" ", "", $postcode);
            $postcode = str_replace("-", "", $postcode);
            $postcode = substr($postcode, 0, 3) . " " . substr($postcode, 3, strlen($postcode) - 3);
        } else if ($countryCode == "PL") {
            $postcode = str_replace(" ", "", $postcode);
            $postcode = str_replace("-", "", $postcode);
            $postcode = substr($postcode, 0, 2) . "-" . substr($postcode, 2, strlen($postcode) - 2);
        } else if ($countryCode == "PT") {
            $postcode = str_replace(" ", "", $postcode);
            $postcode = str_replace("-", "", $postcode);
            $postcode = substr($postcode, 0, 3) . "-" . substr($postcode, 3, strlen($postcode) - 3);
        }

        return $postcode;
    }

    /**
     * Get and/or update delivery company for a country with supplied id
     *
     */
    public function getDeliveryCompany($id = false, $order = false, $fetch = false): mixed
    {
        if (!$id && !$order) {
            return false;
        } else if ($id && !$order) {
            $order = $this->getOrderDetails($id);
        } else if ($id && $order) {
            $order = (object) $order;

            if (!property_exists($order, 'ClientID')) {
                $order->ClientID = DB::table('Prescription')->where('PrescriptionID', $id)->value('ClientID');
            }

            if (!property_exists($order, 'SaturdayDelivery')) {
                $order->SaturdayDelivery = DB::table('Prescription')->where('PrescriptionID', $id)->value('SaturdayDelivery');
            }

            if (!property_exists($order, 'PaymentMethod')) {
                $order->PaymentMethod = DB::table('Prescription')->where('PrescriptionID', $id)->value('PaymentMethod');
            }
        }

        $update = [
            'DeliveryID' => 10,
        ];

        $irelandDelivery = false;
        $postcodeTwo = substr($order->DPostcode, 0, 2);
        $exceptions = [75, 83, 152, 204, 196, 172];
        $rmlOnly = [136, 176, 77, 89, 244, 245];

        if ($order->DCountryCode == 1 && $postcodeTwo == 'BT') {
            $irelandDelivery = true;
        }

        // if order is cod or ups access only ups
        if ($this->isCOD($order) || $order->UPSAccessPointAddress != 0) {
            $update['DeliveryID'] = 7;
            // if the order is going to the UK the first 2 letters of that postcode are GY AND JE
            // these are not part of the mainland so they go to RML and the country code will have to be changed GY = 245 , JE = 244
        } else if ($order->DCountryCode == 1 && ($postcodeTwo == 'GY' || $postcodeTwo == 'JE')) {
            $update['DeliveryID'] = 5;
            $update['CountryCode'] = $postcodeTwo == 'GY' ? 245 : 244;
            // if we are shipping to an island RML only
        } else if (in_array($order->DCountryCode, $rmlOnly)) {
            $update['DeliveryID'] = 5;
            // if the country UK, saturday delivery or ireland = DPD
        } else if ($order->DCountryCode == 1 || $order->SaturdayDelivery != 0 || $irelandDelivery) {
            $update['DeliveryID'] = 4;
            // if (CountryID = 59 && ClientID = 49) OR (ClientID = 50 && CountryID = 59) = DHL
            // if(CountryID == 59 && (ClientID == 49 || ClientID == 50))
        } else if ($order->DCountryCode == 59 && ($order->ClientID == 49 || $order->ClientID == 50)) {
            $update['DeliveryID'] = 10;
            // if client id 49 or 50 AND delivery going to any of these countries
            // 75  = France, 83, = Germany, 152 = Netherlands, 204 = Sweden, 196 = Spain, 172 = Poland
            // AND if DHL count for that country < 5 then give the orders to dhl
        } else if (($order->ClientID == "49" || $order->ClientID == "50") && in_array($order->DCountryCode, $exceptions) && $this->countTodaysDeliveries($order->DCountryCode, 10) < 5) {
            $update['DeliveryID'] = 10;
        } else {
            // any other case use UPS
            // $update['DeliveryID'] = 7;
            //for now only use DHL
            $update['DeliveryID'] = 10;
        }

        if ($fetch) {
            return $update;
        } else {
            return DB::table('Prescription')->where('PrescriptionID', $order->PrescriptionID)->update($update);
        }
    }

    /**
     * Get prescription View html
     *
     * @param int $id
     * @return string
     */
    public function prescriptionView($id)
    {
        $prescription = $this->orderDetails($id, true);
        $pharmacy = (new \App\Library\Doctor())->getPharmacy();
        $products = $this->getProducts($id, true);
        $genders = $this->genders;
        $testkits = $this->getTestKits($id);
        $params = [
            'warningLabelsCount' => 0,
            'testKitsCount' => 0,
            'eveadamletter' => 0,
            'otc' => 0,
            'pil' => 0,
        ];
        $additionalInformationExists = false;
        $showCautionaryAdvice = true;

        foreach ($products as $product) {
            //check if this product has a warning label
            $product->WarningLabels = DB::table('ProductWarningLabel')
                ->select('WarningLabel.Description', 'Country.CodeName2')
                ->where('ProductID', $product->Code)
                ->whereRaw("(WarningLabel.CountryID = ? OR WarningLabel.CountryID = ?)", [1, $prescription->DCountryCode])
                ->leftJoin('WarningLabel', 'ProductWarningLabel.WLID', '=', 'WarningLabel.WLID')
                ->leftJoin('Country', 'Country.CountryID', '=', 'WarningLabel.CountryID')
                ->orderBy('WarningLabel.CountryID', 'ASC')
                ->get();

            if (!$product->WarningLabels->isEmpty()) {
                $params['warningLabelsCount']++;
            }

            //check if this product has additional information
            $product->AdditionalInformation = DB::table('ProductAdditionalInformation AS pai')->select('ai.Description', 'c.CodeName2')
                ->where('pai.ProductID', $product->Code)->leftJoin('AdditionalInformation AS ai', 'ai.Type', '=', 'pai.Type')
                ->whereRaw("(ai.CountryID = ? OR ai.CountryID = ?)", [1, $prescription->DCountryCode])
                ->leftJoin('Country AS c', 'c.CountryID', '=', 'ai.CountryID')->orderBy('ai.CountryID', 'ASC')->get();

            if (!$product->AdditionalInformation->isEmpty()) {
                $params['warningLabelsCount']++;
                $additionalInformationExists = true;
            }

            //if product is test kit
            if ($product->ProductType == 2) {
                $params['testKitsCount']++;
            }

            //if product is prescription or delivery note
            if ($product->OTC == 0) { //if 0 then POM else P
                $params['otc']++;
            }
        }

        //check if there is an eveadam letter to include
        if ($prescription->ClientID == 51 || $prescription->ClientID == 53) {
            $params['eveadamletter'] = 1;
        }

        $doctorTypes = [
            0 => 'Not Set',
            1 => 'GMC',
            2 => 'EU',
            3 => 'GPHC',
            4 => 'Test',
            5 => 'IMC',
        ];

        if ($prescription->DCountryCode == 1 && !$additionalInformationExists) {
            $showCautionaryAdvice = false;
        }

        $prescriptionPath = 'prescription.layout';

        if ($prescription->CreatedDate < 1647906715) {
            $prescriptionPath = 'old_prescription.layout';
        }
        $prescriptionPath = 'prescription.layout-new';
        return View::make($prescriptionPath, compact('prescription', 'genders', 'doctorTypes', 'products', 'pharmacy', 'testkits', 'params', 'showCautionaryAdvice'))
            ->render();
    }

    /**
     * Set an order for redelivery
     *
     * @param int $id
     * @return int
     */
    public function redeliver(int $id): int
    {
        //create a note
        $originalPrescription = DB::table('Prescription AS p')
            ->select(['p.TrackingCode', 'p.DeliveryID', 'h.UpdatedDate'])
            ->leftJoin('PrescriptionHistory AS h', 'p.PrescriptionID', '=', 'h.PrescriptionID')
            ->orderBy('h.PrescriptionHistoryID', 'DESC')
            ->where('p.PrescriptionID', $id)
            ->where('h.Status', 8)->first();


        $date = date("d/m/Y H:i", $originalPrescription->UpdatedDate);
        $deliveryCompany = $this->deliveryCompanies[$originalPrescription->DeliveryID];
        $trackingCode = $originalPrescription->TrackingCode;

        $count = DB::table('Note')
            ->whereRaw('Note LIKE CONCAT("%", "order_redelivery" ,"%")')
            ->where('PrescriptionID', $id)
            ->where('Type', 3)
            ->count();

        // $formatter = new \NumberFormatter('en_US', \NumberFormatter::SPELLOUT);
        // $formatter->setTextAttribute(\NumberFormatter::DEFAULT_RULESET,"%spellout-ordinal");
        // $order = ucfirst($formatter->format($count+1));
        $order = $count + 1;

        $note = "
            <p style='display: none;'>order_redelivery</p>
            <p>Delivery #$order</p>
            <p>Shipped Date: $date </p>
            <p>Courier: $deliveryCompany </p>
            <p>Tracking Number: $trackingCode </p>
        ";

        DB::table('Note')->insert([
            'PrescriptionID' => $id,
            'UserID' => Auth::id(),
            'Type' => 3,
            'OrderSpecific' => 1,
            'Alert' => 0,
            'Note' => $note
        ]);

        $note = $note . "<p>ESA Order ID: $id </p>";

        DB::table('Note')->insert([
            'PrescriptionID' => $id,
            'UserID' => Auth::id(),
            'Type' => 1,
            'OrderSpecific' => 1,
            'Alert' => 0,
            'Note' => $note
        ]);

        //set the order to awaiting shipped
        if ((new OrderService)->canUpdateOrderStatus($id, 7)) {
            return Prescription::updateStatus($id, 7, NULL, true);
        } else {
            return 0;
        }
    }

    /**
     * Match a user to prescription or create a new one
     */
    public function matchUserToPrescription($id): bool
    {
        $prescription = DB::table('Prescription')->where('PrescriptionID', $id)->first();

        if ($prescription) {
            $existingCustomer = DB::table('CustomerPrescriptions')->whereRaw("
            (Name LIKE CONCAT('%', ?, '%') OR Surname LIKE CONCAT('%', ?, '%'))
            AND DOB LIKE CONCAT('%', ?, '%')
            AND Sex LIKE CONCAT('%', ?, '%')
            ", [$prescription->Name, $prescription->Surname, $prescription->DOB, $prescription->Sex])->first();

            if (!$existingCustomer) {
                $customerId = DB::table('CustomerPrescriptions')->insertGetId([
                    'Name' => $prescription->Name,
                    'Surname' => $prescription->Surname,
                    'DOB' => $prescription->DOB,
                    'Sex' => $prescription->Sex,
                    'CreatedDate' => $prescription->CreatedDate,
                    'ModifiedDate' => time(),
                    'AccessedDate' => time(),
                    'Prescriptions' => $prescription->PrescriptionID,
                ]);

                DB::table('Prescription')->where('PrescriptionID', $prescription->PrescriptionID)->update(['CustomerID' => $customerId]);
            } else {
                if (!in_array($prescription->PrescriptionID, explode(',', $existingCustomer->Prescriptions))) {
                    DB::table('CustomerPrescriptions')->where('CustomerPrescriptionID', $existingCustomer->CustomerPrescriptionID)->update([
                        'Prescriptions' => "$existingCustomer->Prescriptions,$prescription->PrescriptionID",
                    ]);
                }

                DB::table('Prescription')->where('PrescriptionID', $prescription->PrescriptionID)->update([
                    'CustomerID' => $existingCustomer->CustomerPrescriptionID
                ]);
            }

            return true;
        } else {
            return false;
        }
    }
}
