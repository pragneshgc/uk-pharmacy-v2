<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Client;
use App\Helpers\Generic;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Exceptions\OrderException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Database\QueryException;
use App\Services\OrderProcessingService;

class ImportController extends Controller
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Import XML file manually by sending an XML file
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function manual(Request $request): JsonResponse
    {
        $file = File::get($request->file('file')); // get the XML

        try {
            $orderService = new OrderProcessingService($request);
            $response = $orderService
                ->readXMLFile($file)
                ->process();

            //get errors from importing prescription,questionnaire and product
            if (count($response['errors']) > 0) {
                return $this->sendError('Import not finished properly, or finished partially', $response['errors']);
            }

            $id = $response['id'];

            return $this->sendResponse($id, "XML successfully uploaded. Inserted prescription with id <a href='#/prescription/$id'> $id </a>");
        } catch (OrderException $ex) {
            return $this->sendError($ex->getMessage(), $ex->getError(), $ex->getCode());
        }
    }

    /**
     * Import routine used by clients
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function client(Request $request): JsonResponse
    {
        $type = $request->headers->get('Content-Type');
        $file = $request->getContent();

        $ipaddress = $request->ip();

        Log::channel('import')->info("Import Started from $ipaddress");
        Log::channel('import')->info($file);

        if (!$request->has('receivePrescription')) {
            Log::channel('import')->info('Import error: Not Allowed');
            return $this->sendError('Not Allowed', '', 400);
        }

        if (!$request->filled('USERNAME') || !$request->filled('PASSWORD') || !$request->filled('KEY')) {
            Log::channel('import')->info('Import error: Missing parameters');
            return $this->sendError('Missing parameters', '', 400);
        }

        $username = $request->USERNAME;
        $password = $request->PASSWORD;
        $key = $request->KEY;

        if (!$ipaddress) {
            Log::channel('import')->info('Import error: Invalid Request');
            return $this->sendError('Invalid IP ' . $ipaddress, '', 400);
        }

        //add ip check here
        $client = Client::query()
            ->where('APIKey', $key)
            ->where('Username', $username)
            ->where('Password', $password)
            ->where('IP', 'LIKE', '%' . $ipaddress . '%')
            ->first();
        if ($client) {
            Log::channel('import')->info('Import error: Unauthorized');
            return $this->sendError('Unauthorized or not valid ip', ['ip' => $ipaddress], 401);
        }

        $data = Generic::readFile($file, $type);

        if (!$data) {
            return $this->sendError('Prescription recieved with errors', '', 400);
        }

        //$response = $this->process($data);
        $response = $this->importRoutine($file);

        if (count($response['errors']) > 0) {
            return $this->sendResponse($response['errors'], 'Prescription recieved partially with errors');
        }

        $id = $response['id'];

        Log::channel('import')->info("Import finished for $id");

        return $this->sendResponse($id, "Prescription successfully received and validated");
    }

    public function importOrder(Request $request)
    {
        $ipaddress = Generic::getIP();
        $file = $request->getContent();

        Log::channel('import')->info("Import Started from $ipaddress");
        Log::channel('import')->info($file);

        try {
            $orderService = new OrderProcessingService($request);
            $response = $orderService->validateOrderRequest()
                ->extractData()
                ->process();
            return $this->sendResponse($response['id'], $response['message']);
        } catch (OrderException $ex) {
            if ((bool)config('esa.send_error_to_slack')) {
                $referenceNo = $orderService->getOrderReference();
                Log::channel('customerio')->info($referenceNo . ": " . $ex->getMessage(), $ex->getError());
            } else {
                Log::error($ex->getMessage());
            }
            return $this->sendError($ex->getMessage(), [], $ex->getCode());
        } catch (QueryException $qe) {
            return $this->sendError('SQL error ', [], 400);
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), [], 400);
        }
    }

    public function newOrder(Request $request)
    {
        $ipaddress = Generic::getIP();
        $file = $request->getContent();

        Log::channel('import')->info("Import Started from $ipaddress");
        Log::channel('import')->info($file);

        try {
            $client = $this->validateRequest($request);

            /* $orderService = new OrderProcessingService($request);
            $response = $orderService->validateOrderRequest()
                ->extractData()
                ->process();
            return $this->sendResponse($response['id'], $response['message']); */
        } catch (OrderException $ex) {
            if (config('esa.slack_webhook_url') != '') {
                //$errors = join(',', $ex->getError());
                Log::channel('slack')->error(config('app.name') . ': ' . $ex->getMessage());
            } else {
                Log::error($ex->getMessage());
            }
            return $this->sendError($ex->getMessage(), [], $ex->getCode());
        } catch (QueryException $qe) {
            return $this->sendError('SQL error ', [], 400);
        } catch (Exception $e) {
            return $this->sendError($e->getMessage(), [], 400);
        }
    }

    private function validateRequest(Request $request)
    {
        $ipaddress = Generic::getIP();
        $token = $request->bearerToken();

        if (!$token) {
            Log::channel('import')->info('Import error: Bearer token missing.');
            throw new OrderException("Bearer token missing", 400);
        }

        if (!$ipaddress) {
            Log::channel('import')->info('Import error: Invalid Request');
            throw new OrderException('Invalid IP Address', 400);
        }
        /**
         * @var client \App\Models\Client
         */
        $client = Client::query()
            ->where('APIKey', $token)
            ->whereRaw("IP LIKE '%$ipaddress%'")
            ->first();
        if (!$client) {
            Log::channel('import')->info("Import error: Unauthorized user.");
            throw new OrderException("Unauthorized or in-valid IP", 401);
        }

        return $client;
    }
}
