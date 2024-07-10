<?php

namespace App\Http\Controllers;

use App\Library\API;
use App\Library\Order;
use App\Library\Activity;
use App\Models\Prescription;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

/**
 * Undocumented class
 */
class APIController extends Controller
{
    private $activity;
    private $api;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->activity = new Activity;
        $this->api = new API;
    }

    /**
     * Respond with current API
     *
     * @return JsonResponse
     */
    public function ping(): JsonResponse
    {
        return $this->sendResponse(['status' => 'online']);
    }

    /**
     * Echo the request input back
     *
     * @param Request $request
     * @return array
     */
    public function echo(Request $request)
    {
        return $request->input();
    }

    /**
     * Checks sent orders on Treated and returns the results from API call
     */
    public function checkOrders(): JsonResponse
    {
        $response = $this->api->checkStatus();

        if (!$response) {
            return $this->sendError('', ['Request to external server failed'], 504);
        }

        return $this->sendResponse($response);
    }

    /**
     * Get results from API calls to check orders
     *
     */
    public function getCheckOrdersResults(): JsonResponse
    {
        $response = $this->api->checkOrders();

        return $this->sendResponse($response);
    }

    /**
     * Approve an order with reference number
     *
     * @param int $referenceNumber
     * @return JsonResponse
     */
    public function approve($referenceNumber)
    {
        $response = $this->api->processApproval($referenceNumber);

        if (!$response) {
            return $this->sendError('', ['Request to EveAdam failed'], 504);
        }

        return $this->sendResponse(['data' => $response]);
    }

    /**
     * Process an order payment from EveAdam
     *
     * @return JsonResponse
     */
    public function process($ref)
    {
        $update = false;
        //check if the reference number exists, is duplicated, or has other issues
        $check = $this->api->checkOrder($ref);

        if ($check['error']) {
            return $this->sendError($check['message'], [$check['message']], $check['code']);
        }

        $orderService = new OrderService;
        //update the order status to approved and log as successful payment
        if ($orderService->canUpdateOrderStatus($check['order']->PrescriptionID, 2)) {
            $update = Prescription::updateStatus($check['order']->PrescriptionID, 2);
        } else {
            return $this->sendError('You are not allow to update order status');
        }

        $this->activity->log($check['order']->PrescriptionID, 'Approved (Payment Successful)', json_encode($check['order']), 1000); //what order type for payment confirmed

        //change payment state
        return $this->sendResponse(['updated' => $update]);
    }

    /**
     * Process multiple orders in bulk
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function bulkProcess(Request $request)
    {
        $orders = $request->ordersArray;
        $errors = [];
        $update = NULL;
        foreach ($orders as $order) {
            $check = $this->api->checkOrder($order);

            if ($check['error']) {
                array_push($errors, ['message' => $check['message'], 'id' => $order]);
            } else {
                if ((new OrderService)->canUpdateOrderStatus($check['order']->PrescriptionID, 2)) {
                    $update = Prescription::updateStatus($check['order']->PrescriptionID, 2);
                } else {
                    return $this->sendError('You are not allow to update order status');
                }

                $this->activity->log($check['order']->PrescriptionID, 'Approved (Payment Successful)', json_encode($check['order']), 1000); //what order type for payment confirmed
            }
        }

        if (count($errors) > 0) {
            return $this->sendError('Errors were found in one or more orders', $errors, 400);
        }

        return $this->sendResponse(['updated' => $update]);
    }

    /**
     * Processes a cancelation request from EveAdam
     *
     * @return JsonResponse
     */
    public function cancel($ref, Request $request)
    {
        //get cancelation reason
        $reason = $request->message; //where should i store this??

        //check if the reference number exists, is duplicated, or has other issues
        $check = $this->api->checkOrder($ref);
        $update = null;

        if ($check['error']) {
            return $this->sendError($check['message'], [$check['message']], $check['code']);
        }

        //change payment state and log in activity
        if ((new OrderService)->canUpdateOrderStatus($check['order']->PrescriptionID, 6)) {
            $update = Prescription::updateStatus($check['order']->PrescriptionID, 6);
        } else {
            return $this->sendError('You are not allow to update order status');
        }

        $this->activity->log($check['order']->PrescriptionID, 'Canceled (Payment Failed)', json_encode($check['order']), 1001); //what order type for payment confirmed

        return $this->sendResponse(['data' => $update]);
    }

    /**
     * Validate address of an order
     *
     * @param int $id
     * @return JsonResponse
     */
    public function validateAddress($id, Request $request)
    {
        $response = $this->api->validateAddress($id, isset($request->addressChange) ? $request->addressChange : false);

        if ($response['status']) {
            return $this->sendResponse("", $response['message']);
        } else {
            return $this->sendError((array) $response['message']);
        }
    }
}
