<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Library\PrescriptionPool;
use Illuminate\Http\JsonResponse;

class PrescriptionPoolController extends Controller
{
    private $pool;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->pool = new PrescriptionPool;
    }

    /**
     * Get a list of orders
     *
     * @return JsonResponse
     */
    public function orders()
    {
        return $this->sendResponse($this->pool->getOrders());
    }

    /**
     * Get a list of orders with details for Quick Prescription Pool
     *
     * @return JsonResponse
     */
    public function quickTray(Request $request)
    {
        $ids = $request->ids;

        return $this->sendResponse($this->pool->getOrdersDetailed($ids));
    }

    /**
     * Get a list of dispensers
     *
     * @return JsonResponse
     */
    public function dispensers()
    {
        $dispensers = User::query()
            ->select('PharmacyUser.id', 'PharmacyUser.name', 'PharmacyUser.esa_user_id')
            ->selectRaw('COALESCE(COUNT(d.UserID), 0) AS count')
            ->join('Roles as r', 'r.id', '=', 'PharmacyUser.pharmacy_role_id')
            ->leftJoin('DispenserPool as d', 'd.UserID', '=', 'PharmacyUser.esa_user_id')
            ->whereIn('r.name', ['Dispenser', 'Locum Dispenser', 'Senior Dispenser'])
            ->whereNull('PharmacyUser.deleted_at')
            ->groupBy('PharmacyUser.id')
            ->get();

        return $this->sendResponse($dispensers);
    }

    /**
     * Allocate orders to pool
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function allocate(Request $request)
    {
        $input = $request->input();

        return $this->sendResponse($this->pool->allocate($input));
    }

    /**
     * Release orders from pool
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function release(Request $request)
    {
        $input = $request->input();

        return $this->sendResponse($this->pool->release($input));
    }
}