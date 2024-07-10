<?php

namespace App\Http\Controllers\API;

use App\Helpers\Generic;
use Illuminate\Http\Request;
use App\Services\NewOrderService;
use Illuminate\Http\JsonResponse;
use App\Exceptions\OrderException;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpFoundation\Response;

class NewOrderController extends Controller
{
    public function newOrder(Request $request): JsonResponse
    {
        try {
            $newOrderService = new NewOrderService($request);
            $newOrderService->validateToken()
                ->readData()
                ->process();
            return sendResponse([], 'success', Response::HTTP_OK);
        } catch (OrderException $ex) {
            Log::error($ex->getMessage());
            return sendError($ex->getMessage(), [], $ex->getCode());
        }
    }
}
