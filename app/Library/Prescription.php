<?php

namespace App\Library;

use Illuminate\Support\Facades\DB;
use App\Library\Country;
use App\Library\Doctor;
use App\Library\Order;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

/**
 * Prescription Model used for import
 */
class Prescription
{
    protected $table = 'Prescription';

    /**
     * Prescription template
     *
     * @var array
     */
    protected $template = [
        'PrescriptionID' => NULL,
        'DoctorID' => 0,
        'GMCNO' => '',
        'DoctorName' => '',
        'ClientID' => 49,
        'ReferenceNumber' => 0,
        'Email' => '',
        'GUID' => '',
        'TokenID' => '',
        'Title' => '',
        'Name' => '',
        'Middlename' => '',
        'Surname' => '',
        'DOB' => '',
        'Sex' => '',
        'BMI' => '',
        'Address1' => '',
        'Address2' => '',
        'Address3' => '',
        'Address4' => '',
        'Postcode' => '',
        'CountryCode' => 0,
        'DAddress1' => '',
        'DAddress2' => '',
        'DAddress3' => '',
        'DAddress4' => '',
        'DPostcode' => '',
        'DCountryCode' => 0,
        'Telephone' => '',
        'Mobile' => '',
        'PaymentMethod' => 0,
        'Exemption' => 0,
        'CreatedDate' => 0,
        'Notes' => '',
        'Repeats' => '',
        'Status' => 1,
        'TrackingCode' => '',
        'AirwayBillNumber' => '',
        'PaymentStatus' => 0,
        'DeliveryID' => 10,
        'UpdatedDate' => 0,
        'UserID' => 0,
        'Message' => '',
        'SaturdayDelivery' => 0,
        'UPSAccessPointAddress' => 0,
        'TrackingSent' => 0,
        'CSNotes' => '',
        'DoctorAddressID' => '',
        'Company' => '',
        'CustomerID' => 0,
        'JVM' => 0,
        // 'VideoURL' => '',
    ];

    public $id = false;

    public $exists = false;

    public $childPrescription = false;

    public $testKit = false;

    protected $accessPointData = [];

    protected $prescription;

    protected $errors = [];

    protected $xml;

    protected $accessPoint = false;


    public function __construct($xml = false)
    {
        $this->xml = $xml;

        $this->prescription = $this->template;
    }

    /**
     * Validate XML
     *
     */
    public function validate(\SimpleXMLElement|false $xml = false): self
    {
        if (!$xml && !$this->xml) {
            throw new \Exception("No XML set", 500);
        } else if (!$xml && $this->xml) {
            $xml = $this->xml;
        }

        return $this;
    }

    /**
     * Get prescription template
     *
     * @return array
     */
    public function getTemplate()
    {
        return $this->template;
    }

    /**
     * Fetch a prescription by ID from the database
     *
     * @param int $id
     * @return \App\Library\Prescription
     */
    public function fetch($id)
    {
        $prescription = DB::table($this->table)->where('PrescriptionID', $id)->first();

        if ($prescription) {
            $this->prescription = (array) $prescription;
        }

        return $this;
    }

    /**
     * Set a prescription value
     *
     */
    public function set(string $key, mixed $value): self
    {
        $this->prescription[$key] = $value;

        return $this;
    }

    /**
     * Get current prescription array
     *
     * @return array
     */
    public function get($withId = false)
    {
        $prescription = $this->prescription;

        if ($withId) {
            $prescription['PrescriptionID'] = $this->id;
        }

        return $this->prescription;
    }

    /**
     * Delete a prescription by id
     *
     */
    public function delete(int|false $id = false): self
    {
        if (!$id && !$this->id) {
            throw new \Exception("No prescription set", 500);
        } else if (!$id && $this->id) {
            $id = $this->id;
        }

        $deleted = DB::table('Prescription')->where('PrescriptionID', $id)->delete();

        if ($deleted) {
            $this->id = false;
            $this->prescription = $this->template;
        }

        return $this;
    }

    /**
     * Set multiple prescription data from array
     *
     * @param array $data
     * @return \App\Library\Prescription
     */
    public function setFields($data)
    {
        foreach ($data as $key => $value) {
            $this->prescription[$key] = $value;
        }

        return $this;
    }

    /**
     * Get a field from the prescription object
     *
     * @param string $key
     * @return mixed
     */
    public function getField($key)
    {
        return $this->prescription[$key];
    }

    /**
     * Get prescription errors
     *
     * @return array/boolean
     */
    public function getErrors()
    {
        return $this->errors;
    }

    /**
     * Insert a new prescription
     *
     */
    public function insert(): self
    {
        $this->prescription['CreatedDate'] = time();

        if ($this->childPrescription) {
            return $this;
        }

        //if order exists just update the order
        $exists = $this->orderExists($this->prescription['ReferenceNumber']);
        $message = 'SYSTEM (API RECEIVED)';

        if ($exists && in_array($exists->Status, [1, 9])) {
            $this->exists = $exists;
            $this->id = $exists->PrescriptionID;
            $this->prescription['PrescriptionID'] = $exists->PrescriptionID;

            DB::table($this->table)->where('PrescriptionID', $this->id)->update($this->prescription);
            //refresh the PDF here
            $this->deletePDF($this->id);

            $message = 'SYSTEM (API UPDATED)';
        } else if ($exists && in_array($exists->Status, [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16])) {
            $this->exists = false;

            array_push($this->errors, "<span class=\"highlight_red\">********* POSSIBLE DUPLICATE ORDER **********</span>");

            $this->id = DB::table($this->table)->insertGetId($this->prescription);
        } else {
            $this->exists = $exists;

            $this->id = DB::table($this->table)->insertGetId($this->prescription);
        }

        if ($this->accessPoint) {
            $this->insertUPSAccessPoint();
        }

        //add a log in activity
        DB::table('Activity')->insert([
            'UserID' => 0,
            'Name' => $message,
            'OrderID' => $this->id,
            'Action' => 'order received',
            'Date' => Carbon::now()->format('d/m/Y H:i'),
            'Date2' => Carbon::now()->format('Y-m-d'),
            'Min' => date('H:i', floor(time() / (5 * 60)) * (5 * 60)),
            'Hour' => (int) Carbon::now()->format('H'),
            'Type' => 1,
            'Status' => 1,
        ]);

        //check reference number if there is a subscription note waiting to be inserted
        $matches = explode('-', $this->prescription['ReferenceNumber']);
        $subscriptionNotes = DB::table('Note')->whereNull('DeletedAt')->where('Type', 4)->where('Pending', 1)
            ->where('Subscription', '=', $matches[0] . '-' . $matches[1])
            ->get();

        foreach ($subscriptionNotes as $note) {
            DB::table('Note')->where('NoteID', $note->NoteID)->update([
                'Type' => 3,
                'PrescriptionID' => $this->id,
                'Pending' => 0,
                'OrderSpecific' => 1,
            ]);
        }

        (new Order)->updateOrderHistory($this->id, 1, NULL, 0); //make sure we have an initial entry for order history

        return $this;
    }

    /**
     * Update prescription with data array
     *
     * @param array $data
     * @return self
     */
    public function update($data): self
    {
        DB::table($this->table)->where('PrescriptionID', $this->id)->update($data);

        return $this;
    }

    /**
     * Save the imported XML file
     *
     * @param boolean $id
     * @param string $xml
     * @return self
     */
    public function saveXml($id = false, $ref = '', $xml = ''): self
    {
        $time = time();

        if (!$id && $this->id) {
            $id = $this->id;
        } else if (!$id && !$this->id) {
            Storage::put("xml/CHILD-Ref-$ref--$time.xml", $xml);
            array_push($this->errors, 'Child prescription saved');
            // throw new \Exception("No prescription set", 500);
        }

        Storage::put("xml/$id-Ref-$ref--$time.xml", $xml);

        return $this;
    }

    /**
     * Save XML pre-import
     *
     * @param string $ref
     * @param string $xml
     */
    public function preImportSave($ref, $xml): self
    {
        $time = time();

        Storage::put("xml/$ref--$time.xml", $xml);

        return $this;
    }

    /**
     * Map prescription information and set errors
     *
     * @return self
     */
    public function mapPrescription(\SimpleXMLElement|false $xml = false): self
    {
        if (!$xml && !$this->xml) {
            throw new \Exception("No XML set", 500);
        } else if (!$xml && $this->xml) {
            $xml = $this->xml;
        }

        //insert test kits and
        //stop the import in case the received prescription is not the parent one (if it's a child prescription)
        if ($xml->Prescription->Product->TestKit) {
            $this->testKit = true;

            if ($xml->Prescription->Product->TestKit->ParentReferenceNumber != $xml->PatientDetail->Patient->PatientId->ReferenceNumber) {
                $this->childPrescription = true;

                return $this;
            }
        }

        $this->errors = [];

        //init singletons
        $country = new Country;
        $doctor = new Doctor;

        $mapping = [
            //account details
            // 'ClientID' => $xml->AccountID, //what would accountid be?
            'ClientID' => $xml->SenderID,

            //patient details
            'ReferenceNumber' => $xml->PatientDetail->Patient->PatientId->ReferenceNumber,
            //reference number needs to be an integer (not anymore!)
            'UserID' => $xml->PatientDetail->Patient->PatientID->UserId,
            'Name' => utf8_decode($xml->PatientDetail->Patient->PatientName->FirstName),
            'Surname' => utf8_decode($xml->PatientDetail->Patient->PatientName->Surname),
            'Middlename' => $xml->PatientDetail->Patient->PatientName->Middlename,
            'Title' => $xml->PatientDetail->Patient->PatientName->Title,
            'DOB' => $xml->PatientDetail->Patient->DOB,
            'BMI' => 0,
            'Sex' => $xml->PatientDetail->Patient->Sex,

            //home address
            'Address1' => utf8_decode($xml->PatientDetail->Patient->HomeAddress->AddressLine1),
            'Address2' => utf8_decode($xml->PatientDetail->Patient->HomeAddress->AddressLine2),
            'Address3' => utf8_decode($xml->PatientDetail->Patient->HomeAddress->AddressLine3),
            'Address4' => utf8_decode($xml->PatientDetail->Patient->HomeAddress->AddressLine4),
            'Postcode' => $xml->PatientDetail->Patient->HomeAddress->PostCode,
            'CountryCode' => 1,

            //delivery address
            'DAddress1' => utf8_decode($xml->PatientDetail->Patient->DeliveryAddress->AddressLine1),
            'DAddress2' => utf8_decode($xml->PatientDetail->Patient->DeliveryAddress->AddressLine2),
            'DAddress3' => utf8_decode($xml->PatientDetail->Patient->DeliveryAddress->AddressLine3),
            'DAddress4' => utf8_decode($xml->PatientDetail->Patient->DeliveryAddress->AddressLine4),
            'DPostcode' => $xml->PatientDetail->Patient->DeliveryAddress->PostCode,
            'DCountryCode' => 1,
            'UPSAccessPointAddress' => strtoupper($xml->PatientDetail->Patient->UPSAccessPointDelivery) == 'N'
                ? 0
                : (strtoupper($xml->PatientDetail->Patient->UPSAccessPointDelivery) == 'Y' ? 1 : 0),
            //email and notes
            'Notes' => '',
            //these order notes are sometimes JSON, what to do with that
            'Telephone' => $xml->PatientDetail->Patient->Telephone,
            'Mobile' => $xml->PatientDetail->Patient->Mobile,
            'Email' => $xml->PatientDetail->Patient->Email,

            //doctor
            'DoctorName' => $xml->Prescription->Prescriber->Doctor->DoctorName,
            'GMCNO' => $xml->Prescription->Prescriber->Doctor->GMCNO,
            'DoctorID' => 0,

            //prescription
            'GUID' => $xml->Prescription->Guid,
            'Repeats' => '',
            'JVM' => isset($xml->Prescription->Pouch) ? $xml->Prescription->Pouch : 0,
        ];

        /** SETUP COUNTRY */
        $countryCode = $xml->PatientDetail->Patient->HomeAddress->CountryCode;
        $dCountryCode = $xml->PatientDetail->Patient->DeliveryAddress->CountryCode;

        if ($countryCode == "" || $countryCode == "EN" || $countryCode == 'GBR') {
            $countryCode = "GB";
        }

        if ($dCountryCode == "" || $dCountryCode == "EN" || $dCountryCode == 'GBR') {
            $dCountryCode = "GB";
        }

        if ($dCountryCode == "IRE") {
            $dCountryCode = "IE";
        }

        if ($countryCode == "IRE") {
            $countryCode = "IE";
        }

        $mapping['CountryCode'] = $country->getId($countryCode, 'CodeName2');

        if ($countryCode != $dCountryCode) {
            $mapping['DCountryCode'] = $country->getId($dCountryCode, 'CodeName2');
        } else {
            $mapping['DCountryCode'] = $mapping['CountryCode'];
        }

        //if france check if Monaco is selected
        if (
            $mapping['DCountryCode'] == "75"
            && (strtoupper($xml->PatientDetail->Patient->DeliveryAddress->DAddress3) == "MONACO"
                || (strtoupper($xml->PatientDetail->Patient->DeliveryAddress->DAddress3) == "MONACO"))
        ) {
            $mapping['DCountryCode'] = "143";
        }

        //check delivery address length
        if (strlen($mapping['DAddress1']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY ADDRESS LINE 1 LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (strlen($mapping['DAddress2']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY ADDRESS LINE 2 LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (strlen($mapping['DAddress3']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY TOWN LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (strlen($mapping['DAddress4']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY PROVINCE LONGER THAN 35 CHARACTERS **********</span>");
        }

        /** /SETUP COUNTRY */

        /*PROCESS NOTES*/
        $mapping['Notes'] = '';

        if (isset($xml->Prescription->PrescriptionNotes)) {
            $mapping['Notes'] .= $xml->Prescription->PrescriptionNotes;
        }

        if (isset($xml->PatientDetail->Patient->BMI)) {
            $mapping['BMI'] .= $xml->PatientDetail->Patient->BMI;
        }

        // Enable these notes only if requested
        // if(isset($xml->PatientDetail->Patient->Notes)){
        //     $notes = json_decode($xml->PatientDetail->Patient->Notes);

        //     if(json_last_error() === 0){
        //         foreach ($notes as $n) {
        //             if($n->Note != null){
        //                 if($mapping['Notes'] == ''){
        //                     $mapping['Notes'] .= '</br>';
        //                 }

        //                 $mapping['Notes'] .= $n->Note.'</br>';
        //             }
        //         }
        //     } else {
        //         $mapping['Notes'] = $xml->PatientDetail->Patient->Notes;
        //     }
        // }
        /*/PROCESS NOTES*/

        /* SETUP REPEATS */
        $mapping['Repeats'] = $this->returnRepeats($xml->Prescription);
        /*/SETUP REPEATS*/

        /**SETUP DOCTOR */
        $doctorData = $doctor->getDoctorGmcno((string) $xml->Prescription->Prescriber->Doctor->GMCNO);
        $mapping['DoctorID'] = 0;

        if (!$doctorData) {
            array_push($this->errors, "<span class=\"highlight_red\">********* PRESCRIBER DOES NOT EXIST IN ESA OR THE DETAILS PROVIDED ARE INCORRECT **********</span>");
        } else {
            $mapping['DoctorID'] = $doctorData->DoctorID;
            //get latest doctor address ID
            $mapping['DoctorAddressID'] = $doctor->getDoctorAddressID($doctorData->DoctorID);

            if ($doctorData->Status != 1) {
                array_push($this->errors, "<span class=\"highlight_red\">********* THIS PRESCRIBER IS INACTIVE **********</span>");
            }

            if ($doctorData->DoctorID == 50) {
                array_push($this->errors, "<span class=\"highlight_red\">********* THIS IS A TEST ORDER (PRESCRIBER IS A TEST DOCTOR) **********</span>");
            }
        }
        /* /SETUP DOCTOR */

        $date = (new \DateTime)::createFromFormat('d/m/Y', $xml->PatientDetail->Patient->DOB);
        $now = new \DateTime();
        $interval = $now->diff($date);
        $age = $interval->y;

        if ($age < 18) {
            array_push($this->errors, "<span class=\"highlight_red\">********* PATIENT AGE IS UNDER 18 **********</span>");
        }

        if ($age > 89) {
            array_push($this->errors, "<span class=\"highlight_red\">********* PATIENT AGE IS OLDER THAN 89 **********</span>");
        }

        //add gender check
        if (!in_array($mapping['Sex'], [1, 2, 3, 4])) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UNKNOWN GENDER **********</span>");
        }

        /*SETUP Customer*/
        if (isset($xml->PatientDetail->Patient->PatientId->UserId)) {
            $mapping['CustomerID'] = $xml->PatientDetail->Patient->PatientId->UserId; // Patient user id from the client side
            $mapping['UserID'] = $xml->PatientDetail->Patient->PatientId->UserId; // Patient user id from the client side
        }
        /*/SETUP Customer*/

        /** SATURDAY DELIVERY */
        $mapping['SaturdayDelivery'] = strtoupper($xml->PatientDetail->Patient->SaturdayDelivery) == 'Y' ? 1 : 0;
        /* /SATURDAY DELIVERY */

        /** UPS ACCESS */
        $mapping['UPSAccessPointAddress'] = strtoupper($xml->PatientDetail->Patient->UPSAccessPointDelivery) == 'Y' ? 1 : 0;
        // add method to populate the upsaddress
        /* /UPS ACCESS */

        /* COD */
        if (isset($xml->Prescription->COD)) {
            $mapping['PaymentMethod'] = strtoupper($xml->Prescription->COD->CashOnly) == 'Y' ? 1 : 0;

            if ($mapping['PaymentMethod']) {
                $mapping['TokenID'] = $xml->Prescription->COD->Amount . '-' . $xml->Prescription->COD->Currency;
            }
        } else {
            $mapping['PaymentMethod'] = 0;
        }
        /* /COD */

        /* UPS ACCESS POINT SETUP */
        if ($mapping['UPSAccessPointAddress'] == '1' && isset($xml->PatientDetail->Patient->UPSAccessPointAddress)) {
            $this->accessPoint = true;
            $this->mapUPSAccessPoint($xml->PatientDetail->Patient->UPSAccessPointAddress);
        } else {
            $this->accessPoint = false;
        }
        /* /UPS ACCESS POINT SETUP */

        $irelandDelivery = false;
        $postcodeTwo = substr($mapping['DPostcode'], 0, 2);
        $exceptions = [75, 83, 152, 204, 196, 172];
        $rmlOnly = [136, 176, 77, 89, 244, 245];
        $order = new Order;

        if ($mapping['DCountryCode'] == 1 && $postcodeTwo == 'BT') {
            $irelandDelivery = true;
        }

        // if order is cod or ups access only ups
        if ($mapping['PaymentMethod'] || $this->accessPoint != 0) {
            $mapping['DeliveryID'] = 7;
            // if the order is going to the UK the first 2 letters of that postcode are GY AND JE
            // these are not part of the mainland so they go to RML and the country code will have to be changed GY = 245 , JE = 244
        } else if ($mapping['DCountryCode'] == 1 && (strtoupper($postcodeTwo) == 'GY' || strtoupper($postcodeTwo) == 'JE')) {
            $mapping['DeliveryID'] = 5;
            $mapping['CountryCode'] = $postcodeTwo == 'GY' ? 245 : 244;
            // if we are shipping to an island RML only
        } else if (in_array($mapping['DCountryCode'], $rmlOnly)) {
            $mapping['DeliveryID'] = 5;
            // if the country UK, saturday delivery or ireland = DPD
        } else if ($mapping['DCountryCode'] == 1 || $mapping['SaturdayDelivery'] != 0 || $irelandDelivery) {
            $mapping['DeliveryID'] = 4;
            // if (CountryID = 59 && ClientID = 49) OR (ClientID = 50 && CountryID = 59) = DHL
            // if(CountryID == 59 && (ClientID == 49 || ClientID == 50))
        } else if ($mapping['DCountryCode'] == 59 && ($mapping['ClientID'] == 49 || $mapping['ClientID'] == 50)) {
            $mapping['DeliveryID'] = 10;
            // if client id 49 or 50 AND delivery going to any of these countries
            // 75  = France, 83, = Germany, 152 = Netherlands, 204 = Sweden, 196 = Spain, 172 = Poland
            // AND if DHL count for that country < 5 then give the orders to dhl
        } else if (
            ($mapping['ClientID'] == "49" || $mapping['ClientID'] == "50")
            && in_array($mapping['DCountryCode'], $exceptions)
            && $order->countTodaysDeliveries($mapping['DCountryCode'], 10) < 5
        ) {
            $mapping['DeliveryID'] = 10;
        } else {
            // any other case use UPS
            // $mapping['DeliveryID'] = 7;
            //for now only use DHL
            $mapping['DeliveryID'] = 10;
        }

        //check delivery country if active
        if ($country->checkIfActive($mapping['DCountryCode']) != 1) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY COUNTRY IS INACTIVE**********</span>");
        }

        //check ups access point direction for switzerland
        if ($this->accessPoint && $mapping['DCountryCode'] == 205) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UPS ACCESS POINT ORDER GOING TO SWITZERLAND**********</span>");
        }

        //check ups access point direction for monaco
        if ($this->accessPoint && $mapping['DCountryCode'] == 143) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UPS ACCESS POINT ORDER GOING TO MONACO**********</span>");
        }

        $this->setFields($mapping);

        return $this;
    }

    /**
     * Return repeats string
     *
     * @param object $prescription
     * @return string
     */
    public function returnRepeats($prescription)
    {
        if (isset($prescription->Repeats)) {
            return $prescription->Repeats;
        } else if (isset($prescription->CommercialInvoiceValue)) {
            return $prescription->CommercialInvoiceValue;
        }

        return '';
    }

    /**
     * Check if an order with this reference number and new or safetycheck status already exists in the system
     *
     * @param string $referenceNumber
     * @return mixed
     */
    public function orderExists($referenceNumber)
    {
        return DB::table($this->table)->select('PrescriptionID', 'Status')
            ->where('ReferenceNumber', $referenceNumber)->first();
    }

    /**
     * Map UPS access point data
     *
     * @param object $upsAccessPointData
     * @return void
     */
    public function mapUPSAccessPoint($upsAccessPointData)
    {
        $order = new Order;
        $country = new Country;

        $countryID = $country->getId($upsAccessPointData->CountryCode, 'CodeName2');
        $notificationLanguage = $order->matchLanguageMapping($countryID, false);


        $this->accessPointData = [
            'PrescriptionID' => NULL,
            'Name' => $upsAccessPointData->CompanyOrName,
            'Address1' => $upsAccessPointData->AddressLine1,
            'Address2' => $upsAccessPointData->AddressLine2,
            'Address3' => $upsAccessPointData->CityOrTown,
            'Address4' => '',
            'Postcode' => $upsAccessPointData->PostCode,
            'CountryCode' => $countryID,
            'APINotificationType' => 1,
            'APINotificationValue' => $upsAccessPointData->APNotificationEmail,
            'APINotificationFailedEmailAddress' => 'info@natcol.com',
            'APINotificationCountryTerritory' => $upsAccessPointData->APNotificationCountryTerritory,
            'APINotificationPhoneCountryCode' => '44',
            'APINotificationLanguage' => $notificationLanguage,
            'UPSAccessPoint' => $upsAccessPointData->UPSAccessPointID,
        ];
    }

    /**
     * Insert UPS access point data
     */
    public function insertUPSAccessPoint(): self
    {
        $this->accessPointData['PrescriptionID'] = $this->id;

        DB::table('UPSAccessPoint')->insert($this->accessPointData);

        return $this;
    }

    /**
     * Delete the prescription PDF if it exists
     *
     * @param int $id
     * @return bool
     */
    public function deletePDF($id)
    {
        if (file_exists(storage_path("app/pdf/$id.pdf"))) {
            Storage::delete("pdf/$id.pdf");

            return true;
        }

        return false;
    }
}
