<?php

namespace App\Services;

use Exception;
use App\Models\Client;
use App\Helpers\Generic;
use App\Enums\OrderStatus;
use App\Models\Prescription;
use Illuminate\Http\Request;
use App\Exceptions\OrderException;
use Illuminate\Support\Facades\Log;
use App\Services\PrescriptionService;
use Illuminate\Database\QueryException;

class OrderProcessingService
{
    private array $data = [];
    private $file;
    private int $clientId;

    public function __construct(public Request $request)
    {
    }

    /**
     * validate username, password, key and IP address
     *
     * @return self
     */
    public function validateOrderRequest()
    {
        $ipaddress = Generic::getIP();

        if (!$this->request->filled('USERNAME') || !$this->request->filled('PASSWORD') || !$this->request->filled('KEY')) {
            Log::channel('import')->info('Import error: Missing parameters');
            throw new OrderException("Missing parameters from IP: $ipaddress", 400);
        }

        if (!$ipaddress) {
            Log::channel('import')->info('Import error: Invalid Request');
            throw new OrderException('Invalid IP Address', 400);
        }

        $username = $this->request->USERNAME;
        $password = $this->request->PASSWORD;
        $key = $this->request->KEY;
        //Validate Username, Password, Key and IP Address
        /**
         * @var client \App\Models\Client
         */
        $client = Client::query()
            ->where('APIKey', $key)
            ->where('Username', $username)
            ->where('Password', $password)
            ->whereRaw("IP LIKE '%$ipaddress%'")
            ->first();
        if (!$client) {
            Log::channel('import')->info("Import error: Unauthorized for username: $username, ip: $ipaddress");
            throw new OrderException("Unauthorized or in-valid IP", 401, ['username' => $username, 'ip' => $ipaddress]);
        }

        $this->clientId = $client->ClientID;

        return $this;
    }

    /**
     * extract data from request
     *
     * @return self
     */
    public function extractData()
    {
        $type = $this->request->headers->get('Content-Type');
        $this->file = $this->request->getContent();
        $data = Generic::readFile($this->file, $type);

        if (!empty($data['error'])) {
            throw new OrderException('Import error: invalid data received', 400, $data['error']);
        }
        if (empty($data['data'])) {
            throw new OrderException('Import error: no data found', 400, $data['error']);
        }

        $this->data = $data['data'];

        return $this;
    }

    public function readXMLFile($file)
    {
        $this->file = $file;
        $data = Generic::readFile($this->file, 'application/xml');

        if (!empty($data['error'])) {
            throw new OrderException('Import error: invalid data received', 400, $data['error']);
        }
        if (empty($data['data'])) {
            throw new OrderException('Import error: no data found', 400, $data['error']);
        }

        $this->data = $data['data'];

        return $this;
    }

    /**
     * Process request
     *
     * @return array
     */
    public function process()
    {
        Log::channel('import')->info("Import Started for User: " . $this->request->USERNAME);
        $contentType = $this->request->headers->get('Content-Type') ?? 'application/xml';

        $errors = [];
        $productErrors = [];
        $questionnaireErrors = [];

        if (!empty($this->clientId)) {
            $this->data['ClientID'] = $this->clientId;
        } elseif (empty($this->data['SenderID'])) {
            throw new OrderException('Import error: SenderID Not set', 400);
        } else {
            $this->data['ClientID'] = $this->data['SenderID'];
        }

        $prescription = new PrescriptionService($this->data, $contentType);
        $productService = new ProductService();
        $questionnaire = new QuestionService($contentType);

        $message = "Prescription successfully received and validated";

        try {
            $prescriptionErrors = $prescription
                ->validate()
                ->mapOrderData()
                ->insert()
                ->saveFile($this->file, $contentType)
                ->getErrors();

            if (!$prescription->childPrescription) {
                $productErrors = $productService->importProductFromArray($prescription->id, $this->data);
                if (isset($this->data['Prescription']['Questionnaire'])) {
                    $questionnaireErrors = $questionnaire->importFromArray($prescription->id, $this->data['Prescription']['Questionnaire']);
                }
            }

            if ($prescription->testKit) {
                //new TestKit();
            }

            //prescription generation
            $errors = array_merge(
                $productErrors,
                $prescriptionErrors,
                $questionnaireErrors
            );
        } catch (OrderException $oe) {
            throw $oe;
        } catch (QueryException $qe) {
            throw $qe;
        } catch (Exception $e) {
            $errors[] = $e->getMessage();
            throw $e;
        }

        if (!empty($errors)) {
            $message = 'Prescription recieved partially with errors';
            if (!empty($prescription->id)) {
                Prescription::updateStatus($prescription->id, OrderStatus::SAFETY_CHECK->value);
                Prescription::updateMessage($prescription->id, implode('</br></br>', $errors));
            }
        }

        $id = $prescription->id;
        Log::channel('import')->info("Import finished for $id");

        return [
            'id' => $id,
            'errors' => $errors,
            'message' => $message
        ];
    }

    public function getOrderReference()
    {
        if (isset($this->data['PatientDetail']['Patient']['PatientId']['ReferenceNumber'])) {
            return $this->data['PatientDetail']['Patient']['PatientId']['ReferenceNumber'];
        }
        return 'no-ref';
    }
}
