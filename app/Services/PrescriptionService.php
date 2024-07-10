<?php

namespace App\Services;

use Exception;
use Carbon\Carbon;
use App\Models\Note;
use App\Models\Doctor;
use App\Models\Country;
use App\Helpers\Generic;
use App\Models\Activity;
use App\Models\Productcode;
use Illuminate\Support\Arr;
use App\Models\Prescription;
use App\Models\Doctoraddress;
use App\Models\Upsaccesspoint;
use App\Exceptions\OrderException;
use App\Models\Condition;
use Illuminate\Support\Facades\DB;
use App\Models\Prescriptionhistory;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Http;

class PrescriptionService
{
    protected $accessPointData = [];
    protected $accessPoint = false;
    public bool $childPrescription = false;
    private array $data = [];
    public array $errors = [];
    public ?int $id = null;
    public bool $testKit = false;

    private string $ref;
    public $exists = false;
    public array $validationErrors = [];


    public function __construct(public array $arr, private string $contentType)
    {
    }

    /**
     * Validate data
     *
     * @return self
     */
    public function validate()
    {
        $arr = $this->arr;

        if (empty($arr['Date'])) {
            throw new OrderException('Import error: Date is missing', 400);
        }
        if (empty($arr['PatientDetail']) || empty($arr['PatientDetail']['Patient'])) {
            throw new OrderException('Import error: Patient data not found', 400);
        }
        if (empty($arr['Prescription'])) {
            throw new OrderException('Import error: Prescription data not found', 400);
        }

        $arrList = Arr::dot($arr);

        if (!empty($arrList['PatientDetail.Patient.PatientId.ReferenceNumber'])) {
            $this->ref = $arrList['PatientDetail.Patient.PatientId.ReferenceNumber'];
        } else {
            $this->ref = 'no-ref';
        }

        $this->validatePatientFields($arrList);
        //$this->validatePatientHomeAddress($arrList);
        $this->validatePatientDeliveryAddress($arrList);
        $this->validatePatientOtherFields($arrList);

        $this->validateDoctor($arrList);
        //$this->validatePrescription($arrList);
        $this->validateProducts($arrList);
        $this->validateQuestionnaire();

        return $this;
    }

    private function validatePatientFields($list)
    {
        $required = [
            "PatientDetail.Patient.PatientId.ReferenceNumber",
            "PatientDetail.Patient.PatientId.UserId",
            "PatientDetail.Patient.PatientName.FirstName",
            "PatientDetail.Patient.PatientName.Surname",
            "PatientDetail.Patient.PatientName.Title",
            "PatientDetail.Patient.DOB",
            "PatientDetail.Patient.Sex",
            "PatientDetail.Patient.BMI",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Patient field(s) missing', 400, $error);
        }
    }

    /* private function validatePatientHomeAddress($list)
    {
        $required = [
            "PatientDetail.Patient.HomeAddress.CountryCode",
            "PatientDetail.Patient.HomeAddress.PostCode",
            "PatientDetail.Patient.HomeAddress.AddressLine1",
            //"PatientDetail.Patient.HomeAddress.AddressLine2",
            "PatientDetail.Patient.HomeAddress.AddressLine3",
            //"PatientDetail.Patient.HomeAddress.AddressLine4",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Patient HomeAddress field(s) missing', 400, $error);
        }
    } */

    private function validatePatientDeliveryAddress($list)
    {
        $required = [
            "PatientDetail.Patient.DeliveryAddress.CountryCode",
            "PatientDetail.Patient.DeliveryAddress.PostCode",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Patient DeliveryAddress field(s) missing', 400, $error);
        }

        if (
            empty($list["PatientDetail.Patient.DeliveryAddress.AddressLine1"])
            && empty($list["PatientDetail.Patient.DeliveryAddress.AddressLine2"])
            && empty($list["PatientDetail.Patient.DeliveryAddress.AddressLine3"])
        ) {
            throw new OrderException('Import error: Patient DeliveryAddress field(s) missing', 400, $error);
        }
    }

    private function validatePatientOtherFields($list)
    {
        $required = [
            "PatientDetail.Patient.SaturdayDelivery",
            "PatientDetail.Patient.UPSAccessPointDelivery",
            "PatientDetail.Patient.Telephone",
            "PatientDetail.Patient.Mobile",
            "PatientDetail.Patient.Email",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Patient field(s) missing', 400, $error);
        }
    }

    private function validateDoctor($list)
    {
        $required = [
            "Prescription.Prescriber.Doctor.GMCNO",
            "Prescription.Prescriber.Doctor.DoctorName",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Doctor field(s) missing', 400, $error);
        }
    }

    /* private function validatePrescription($list)
    {
        $required = [
            "Prescription.CommercialInvoiceValue",
            "Prescription.Repeats"
        ];
    } */

    private function validateProducts($list)
    {
        $required = [
            "Prescription.Product.ProductCode",
            "Prescription.Product.Description",
            "Prescription.Product.ProductQuantity.Quantity",
            "Prescription.Product.ProductQuantity.Units",
            "Prescription.Product.ProductQuantity.Dosage",
            "Prescription.Product.Instructions",
        ];

        $error = validateArrayWithRequired($list, $required);

        if (!empty($error)) {
            throw new OrderException('Import error: Product field(s) missing', 400, $error);
        }
    }

    private function validateQuestionnaire()
    {
        if (isset($this->arr['Prescription']['Questionnaire'])) {
            $questionnaire = $this->arr['Prescription']['Questionnaire'];

            if ($this->contentType != 'application/json') {
                $questions = $questionnaire['Question'];
                $answers = $questionnaire['Answer'];
                if (is_array($questions) && is_array($answers)) {
                    if (count($questions) != count($answers)) {
                        $error[] = 'Invalid Questions/Answers in XML';
                        throw new OrderException('Import error: Invalid Questions/Answers in XML', 400, $error);
                    }
                }
            }
        }
    }

    public function mapOrderData()
    {
        $patientDetail = $this->arr['PatientDetail'];
        $prescription = $this->arr['Prescription'];
        $products = $this->arr['Prescription']['Product'];

        if (isset($products['TestKit'])) {
            $this->testKit = true;
            if (
                $products['TestKit']['ParentReferenceNumber']
                != $patientDetail['PatientId']['ReferenceNumber']
            ) {
                $this->childPrescription = true;
                return $this;
            }
        }

        $this->data['ClientID'] = $this->arr['ClientID'];

        $this->setPatient($patientDetail);
        $this->setCountry($patientDetail['Patient']);
        $this->checkAge($patientDetail['Patient']);
        $this->checkAccessPoint($patientDetail['Patient']);
        $this->setDeliveryProvider();
        $this->checkDeliveryCountry();
        $this->validateDeliveryAddress($patientDetail['Patient']);

        $this->setPrescriber($prescription);
        $this->checkOrderPayment($prescription);

        $this->setAdditionalPrescription($prescription);

        return $this;
    }

    private function setPatient($patientArr)
    {
        $patient = $patientArr['Patient'];
        //$familyDoctor = $patientArr['FamilyDoctor'];

        $this->data['ReferenceNumber'] = $patient['PatientId']['ReferenceNumber'];
        $this->data['UserID'] = $patient['PatientId']['UserId'];

        $this->data['Title'] = !empty($patient['PatientName']['Title']) ? $patient['PatientName']['Title'] : '';
        $this->data['Name'] = $patient['PatientName']['FirstName'];
        $this->data['Surname'] = $patient['PatientName']['Surname'];
        $this->data['Middlename'] = !empty($patient['PatientName']['Middlename']) ? $patient['PatientName']['Middlename'] : '';

        $this->data['DOB'] = $patient['DOB'];
        $this->data['BMI'] = !empty($patient['BMI']) ? $patient['BMI'] : '';
        $this->data['Sex'] = $patient['Sex'];

        $deliveryAddress = $patient['DeliveryAddress'];
        $homeAddress = $patient['HomeAddress'];

        //home address
        $this->data['Address1'] = !empty($homeAddress['AddressLine1']) ? $homeAddress['AddressLine1'] : '';
        $this->data['Address2'] = !empty($homeAddress['AddressLine2']) ? $homeAddress['AddressLine2'] : '';
        $this->data['Address3'] = !empty($homeAddress['AddressLine3']) ? $homeAddress['AddressLine3'] : '';
        $this->data['Address4'] = !empty($homeAddress['AddressLine4']) ? $homeAddress['AddressLine4'] : '';
        $this->data['Postcode'] = !empty($homeAddress['PostCode']) ? $homeAddress['PostCode'] : '';
        $this->data['CountryCode'] = $homeAddress['CountryCode'];

        //delivery address
        $this->data['DAddress1'] = !empty($deliveryAddress['AddressLine1']) ? $deliveryAddress['AddressLine1'] : '';
        $this->data['DAddress2'] = !empty($deliveryAddress['AddressLine2']) ? $deliveryAddress['AddressLine2'] : '';
        $this->data['DAddress3'] = !empty($deliveryAddress['AddressLine3']) ? $deliveryAddress['AddressLine3'] : '';
        $this->data['DAddress4'] = !empty($deliveryAddress['AddressLine4']) ? $deliveryAddress['AddressLine4'] : '';
        $this->data['DPostcode'] = $deliveryAddress['PostCode'];
        $this->data['DCountryCode'] = $deliveryAddress['CountryCode'];

        $this->data['SaturdayDelivery'] = strtoupper($patient['SaturdayDelivery']) == 'Y' ? 1 : 0;

        $this->data['UPSAccessPointAddress'] = strtoupper($patient['UPSAccessPointDelivery']) == 'N'
            ? 0
            : (strtoupper($patient['UPSAccessPointDelivery']) == 'Y' ? 1 : 0);

        $this->data['Notes'] = !empty($patient['Notes']) ? $patient['Notes'] : '';

        $this->data['Telephone'] = $patient['Telephone'];
        $this->data['Mobile'] = $patient['Mobile'];
        $this->data['Email'] = $patient['Email'];

        if (isset($patient['PatientId']['UserId'])) {
            $this->data['CustomerID'] = $patient['PatientId']['UserId']; // Patient user id from the client side
        }
    }


    private function setPrescriber($prescription)
    {
        if (empty($prescription)) {
            $this->errors[] = 'Import error: Prescriber data not found';
            return;
        }
        $this->data['GUID'] = $prescription['Guid'] ?? NULL;

        $repeats = '';
        if (isset($prescription['Repeats'])) {
            $repeats = $prescription['Repeats'];
        } else if (isset($prescription['CommercialInvoiceValue'])) {
            $repeats = $prescription['CommercialInvoiceValue'];
        }

        $this->data['Repeats'] = $repeats;

        if (!empty($prescription['PrescriptionNotes'])) {
            $this->data['Notes'] .= $prescription['PrescriptionNotes'];
        }

        $this->data['DoctorName'] = $prescription['Prescriber']['Doctor']['DoctorName'];
        $this->data['GMCNO'] = $prescription['Prescriber']['Doctor']['GMCNO'];
        $this->data['JVM'] = isset($prescription['Pouch']) ? $prescription['Pouch'] : 0;
        $this->data['Status'] = 1;

        $this->setDoctor($prescription);
    }

    private function setDoctor($prescription)
    {
        $this->data['DoctorID'] = 0;

        $doctorData = Doctor::query()
            ->where('GMCNO', $prescription['Prescriber']['Doctor']['GMCNO'])
            ->first();

        if (!$doctorData) {
            $this->errors[] = "<span class=\"highlight_red\">********* PRESCRIBER DOES NOT EXIST IN ESA OR THE DETAILS PROVIDED ARE INCORRECT **********</span>";
        } else {
            $this->data['DoctorID'] = $doctorData->DoctorID;
            //get latest doctor address ID
            $this->data['DoctorAddressID'] = Doctoraddress::getDoctorAddressID($doctorData->DoctorID);

            if ($doctorData->Status != 1) {
                $this->errors[] = "<span class=\"highlight_red\">********* THIS PRESCRIBER IS INACTIVE **********</span>";
            }

            if ($doctorData->DoctorType == 4) {
                $this->errors[] = "<span class=\"highlight_red\">********* THIS IS A TEST ORDER (PRESCRIBER IS A TEST DOCTOR) **********</span>";
            }
        }
    }

    private function setCountry($patient)
    {
        /** SETUP COUNTRY */
        $deliveryAddress = $patient['DeliveryAddress'];
        $countryCode = $patient['HomeAddress']['CountryCode'];
        $dCountryCode = $deliveryAddress['CountryCode'];

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

        $this->data['CountryCode'] = Country::where('CodeName2', $countryCode)->value('CountryID');

        if ($countryCode != $dCountryCode) {
            $this->data['DCountryCode'] = Country::where('CodeName2', $dCountryCode)->value('CountryID');
        } else {
            $this->data['DCountryCode'] = $this->data['CountryCode'];
        }

        //if france check if Monaco is selected
        if (
            $this->data['DCountryCode'] == "75"
            && (strtoupper($deliveryAddress['AddressLine3']) == "MONACO"
                || (strtoupper($deliveryAddress['AddressLine3']) == "MONACO"))
        ) {
            $this->data['DCountryCode'] = "143";
        }

        //check delivery address length
        if (mb_strlen($this->data['DAddress1']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY ADDRESS LINE 1 LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (mb_strlen($this->data['DAddress2']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY ADDRESS LINE 2 LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (empty($this->data['DAddress3'])) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY TOWN IS BLANK **********</span>");
        } elseif (mb_strlen($this->data['DAddress3']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY TOWN LONGER THAN 35 CHARACTERS **********</span>");
        }

        if (mb_strlen($this->data['DAddress4']) > 35) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY PROVINCE LONGER THAN 35 CHARACTERS **********</span>");
        }
    }

    private function validateDeliveryAddress($patient)
    {
        $deliveryAddress = $patient['DeliveryAddress'];

        $dCountryCode = $deliveryAddress['CountryCode'];

        if ($dCountryCode == "" || $dCountryCode == "EN" || $dCountryCode == 'GBR') {
            $dCountryCode = "GB";
        } else {
            if (strlen($dCountryCode) > 2) {
                $dCountryCode = Country::where('CodeName3', $dCountryCode)->value('CodeName2');
            }
        }


        try {
            $response = Http::withHeaders([
                'Authorization' => 'Basic ' . base64_encode(config('services.mydhl.username') . ":" . config('services.mydhl.password'))
            ])->get(config('services.mydhl.endpoint'), [
                'type' => 'delivery',
                'countryCode' => $dCountryCode,
                'postalCode' => $deliveryAddress['PostCode'],
                // 'cityName' => $deliveryAddress['AddressLine3'],
                'strictValidation' => 'true',
            ]);

            if ($response->successful()) {
                //$orderLibrary->updateOrderMessage($id, "Address Validated Successfully");
            } else {
                $responseData = json_decode($response->body());

                if (isset($responseData->detail)) {
                    array_push($this->errors, "<span class=\"highlight_red\">********* " . $responseData->detail . "**********</span>");
                } else {
                    array_push($this->errors, "<span class=\"highlight_red\">********* Could not validate address. Unknown error. **********</span>");
                }
            }
        } catch (\Illuminate\Http\Client\RequestException $e) {
            array_push($this->errors, "<span class=\"highlight_red\">********* Request failed for validate delivery address: " . $e->getMessage() . "**********</span>");
        } catch (\Exception $e) {
            array_push($this->errors, "<span class=\"highlight_red\">********* An unexpected error occurred (validate delivery address): " . $e->getMessage() . "**********</span>");
        }
    }

    private function checkAge($patient)
    {
        $date = (new \DateTime)::createFromFormat('d/m/Y', $patient['DOB']);
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
        if (!in_array($patient['Sex'], [1, 2, 3, 4])) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UNKNOWN GENDER **********</span>");
        }
    }

    private function checkOrderPayment($prescription)
    {
        if (isset($prescription['COD']) && !empty($prescription['COD'])) {
            $this->data['PaymentMethod'] = strtoupper($prescription['COD']['CashOnly']) == 'Y' ? 1 : 0;

            if ($this->data['PaymentMethod']) {
                $this->data['TokenID'] = $prescription['COD']['Amount'] . '-' . $prescription['COD']['Currency'];
            }
        } else {
            $this->data['PaymentMethod'] = 0;
        }
    }

    private function checkAccessPoint($patient)
    {
        if ($this->data['UPSAccessPointAddress'] == '1' && isset($patient['UPSAccessPointAddress'])) {
            $this->accessPoint = true;
            $this->mapUPSAccessPoint($patient['UPSAccessPointAddress']);
        } else {
            $this->accessPoint = false;
        }
    }

    private function mapUPSAccessPoint($upsAccessPointData)
    {
        $countryID = Country::where('CodeName2', $upsAccessPointData->CountryCode)->value('CountryID');
        $notificationLanguage = Generic::matchLanguageMapping($countryID, false);

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

    private function setDeliveryProvider()
    {
        $irelandDelivery = false;
        $postcodeTwo = substr($this->data['DPostcode'], 0, 2);
        $exceptions = [75, 83, 152, 204, 196, 172];
        $rmlOnly = [136, 176, 77, 89, 244, 245];

        if ($this->data['DCountryCode'] == 1 && $postcodeTwo == 'BT') {
            $irelandDelivery = true;
        }

        // if order is cod or ups access only ups
        if (isset($this->data['PaymentMethod']) || $this->accessPoint != 0) {
            $this->data['DeliveryID'] = 7;
            // if the order is going to the UK the first 2 letters of that postcode are GY AND JE
            // these are not part of the mainland so they go to RML and the country code will have to be changed GY = 245 , JE = 244
        } else if ($this->data['DCountryCode'] == 1 && (strtoupper($postcodeTwo) == 'GY' || strtoupper($postcodeTwo) == 'JE')) {
            $this->data['DeliveryID'] = 5;
            $this->data['CountryCode'] = $postcodeTwo == 'GY' ? 245 : 244;
            // if we are shipping to an island RML only
        } else if (in_array($this->data['DCountryCode'], $rmlOnly)) {
            $this->data['DeliveryID'] = 5;
            // if the country UK, saturday delivery or ireland = DPD
        } else if ($this->data['DCountryCode'] == 1 || $this->data['SaturdayDelivery'] != 0 || $irelandDelivery) {
            $this->data['DeliveryID'] = 4;
            // if (CountryID = 59 && ClientID = 49) OR (ClientID = 50 && CountryID = 59) = DHL
            // if(CountryID == 59 && (ClientID == 49 || ClientID == 50))
        } else if ($this->data['DCountryCode'] == 59 && ($this->data['ClientID'] == 49 || $this->data['ClientID'] == 50)) {
            $this->data['DeliveryID'] = 10;
            // if client id 49 or 50 AND delivery going to any of these countries
            // 75  = France, 83, = Germany, 152 = Netherlands, 204 = Sweden, 196 = Spain, 172 = Poland
            // AND if DHL count for that country < 5 then give the orders to dhl
        } else if (
            ($this->data['ClientID'] == "49" || $this->data['ClientID'] == "50")
            && in_array($this->data['DCountryCode'], $exceptions)
            && Prescription::countTodaysDeliveries($this->data['DCountryCode'], 10) < 5
        ) {
            $this->data['DeliveryID'] = 10;
        } else {
            // any other case use UPS
            // $this->data['DeliveryID'] = 7;
            //for now only use DHL
            $this->data['DeliveryID'] = 10;
        }
    }

    private function checkDeliveryCountry()
    {

        $country = Productcode::query()
            ->where('Type', 2)
            ->where('Code', $this->data['DCountryCode'])
            ->first();

        if (!$country) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY COUNTRY IS INACTIVE **********</span>");
        }
        if ($country && $country->Status != 1) {
            array_push($this->errors, "<span class=\"highlight_red\">********* DELIVERY COUNTRY IS INACTIVE **********</span>");
        }

        //check ups access point direction for switzerland
        if ($this->accessPoint && $this->data['DCountryCode'] == 205) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UPS ACCESS POINT ORDER GOING TO SWITZERLAND **********</span>");
        }

        //check ups access point direction for monaco
        if ($this->accessPoint && $this->data['DCountryCode'] == 143) {
            array_push($this->errors, "<span class=\"highlight_red\">********* UPS ACCESS POINT ORDER GOING TO MONACO **********</span>");
        }
    }

    private function setAdditionalPrescription($prescription)
    {
        $this->data['Condition'] = $prescription['Condition'] ?? '';
        $this->data['Frequency'] = $prescription['Frequency'] ?? '';
        if (!empty($prescription['Condition']) && Condition::where('name', $prescription['Condition'])->doesntExist()) {
            Condition::create([
                'name' => $prescription['Condition']
            ]);
        }
    }

    public function insert()
    {
        $this->data['CreatedDate'] = Carbon::now()->timestamp;

        if ($this->childPrescription) {
            return $this;
        }

        //if order exists just update the order
        $exists = Prescription::orderExists($this->data['ReferenceNumber']);
        $message = 'SYSTEM (API RECEIVED)';

        DB::beginTransaction();

        try {
            if ($exists && in_array($exists->Status, [1, 9])) {
                $this->exists = $exists;
                $this->id = $exists->PrescriptionID;
                $this->data['PrescriptionID'] = $exists->PrescriptionID;

                $prescription = Prescription::find($this->id);
                $prescription->update($this->data);

                //refresh the PDF here
                $this->deletePDF($this->id);

                $message = 'SYSTEM (API UPDATED)';
            } else if ($exists && in_array($exists->Status, [2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16])) {
                $this->exists = false;
                array_push($this->errors, "<span class=\"highlight_red\">********* POSSIBLE DUPLICATE ORDER **********</span>");

                $this->id = Prescription::insertGetId($this->data);
            } else {
                $this->exists = $exists;
                $this->id = Prescription::insertGetId($this->data);
            }

            if ($this->accessPoint) {
                $this->insertUPSAccessPoint();
            }

            Activity::create([
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
            $matches = explode('-', $this->data['ReferenceNumber']);

            if (count($matches) > 1) {
                $subscriptionNotes = Note::where('Type', 4)
                    ->where('Pending', 1)
                    ->where('Subscription', $matches[0] . '-' . $matches[1])
                    ->get();

                foreach ($subscriptionNotes as $note) {
                    $note->update([
                        'Type' => 3,
                        'PrescriptionID' => $this->id,
                        'Pending' => 0,
                        'OrderSpecific' => 1,
                    ]);
                }
            }


            //make sure we have an initial entry for order history
            Prescriptionhistory::updateHistory($this->id, 1, NULL, 0);

            DB::commit();
        } catch (QueryException $qe) {
            Log::channel('sql')->info($qe->getSql());
            Log::channel('sql')->info(print_r($qe->getBindings(), true));
            DB::rollBack();
            throw $qe;
        } catch (Exception $ex) {
            $this->errors[] = $ex->getMessage();
            DB::rollBack();
            throw $ex;
        }

        return $this;
    }

    private function deletePDF($id)
    {
        if (isAzureStorageEnabled() && Storage::disk('azure')->exists("pdf/$id.pdf")) {
            Storage::disk('azure')->delete("pdf/$id.pdf");
        } else if (file_exists(storage_path("app/pdf/$id.pdf"))) {
            //Storage::delete("app/pdf/$id.pdf");
            unlink(storage_path("app/pdf/$id.pdf"));
            return true;
        }

        return false;
    }

    public function insertUPSAccessPoint()
    {
        $this->accessPointData['PrescriptionID'] = $this->id;
        Upsaccesspoint::create($this->accessPointData);
    }

    public function saveXML($file, $id = false)
    {
        $ref = $this->data['ReferenceNumber'];
        $time = time();

        if ($this->id) {
            $id = $this->id;
        } else if (!$this->id) {
            //Storage::put("xml/CHILD-Ref-$ref--$time.xml", $file);
            saveToStorage("xml/", $file, "CHILD-Ref-$ref--$time.xml");
            $this->errors[] = 'Child prescription saved';
            // throw new \Exception("No prescription set", 500);
        }
        //Storage::put("xml/$id-Ref-$ref--$time.xml", $file);
        saveToStorage("xml/", $file, "$id-Ref-$ref--$time.xml");

        return $this;
    }

    public function saveFile($file, $type, $id = false)
    {
        $ref = $this->data['ReferenceNumber'];
        $time = time();

        if ($this->id) {
            $id = $this->id;
        } else if (!$this->id) {
            if ($type == 'application/json') {
                saveToStorage("json/", $file, "CHILD-Ref-$ref--$time.json");
            } else {
                saveToStorage("xml/", $file, "CHILD-Ref-$ref--$time.xml");
            }

            $this->errors[] = 'Child prescription saved';
            // throw new \Exception("No prescription set", 500);
        }
        if ($type == 'application/json') {
            saveToStorage("json/", $file, "$id-Ref-$ref--$time.json", $id);
        } else {
            saveToStorage("xml/", $file, "$id-Ref-$ref--$time.xml", $id);
        }

        return $this;
    }

    public function getErrors()
    {
        return $this->errors;
    }
}
