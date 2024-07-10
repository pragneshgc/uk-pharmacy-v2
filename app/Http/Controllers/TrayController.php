<?php

namespace App\Http\Controllers;

use App\Library\Tray;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

/**
 * Statuses
 * 1 = active
 * 2 = inactive
 */

class TrayController extends Controller
{
    private $tray;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->tray = new Tray;
    }

    /**
     * Can recieve a user id for a specific user tray
     * $id can be false or an integer
     *
     * @param mixed $id
     * @return JsonResponse
     */
    public function index($id = false)
    {
        return $this->sendResponse($this->tray->getTray($id));
    }

    /**
     * Insert a new item into the
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $input = $request->input();
        $user = Auth::user();

        $data = [
            'UserID' => $user->id,
            'Type' => 1,
            'Status' => 1
        ];

        if ($user->role == 20 || $user->role == 19) {
            $response = $this->tray->insertDispenserItem($user->esa_user_id, $input['PrescriptionID']);
        } else {
            $response = $this->tray->insertTrayItem($data, $input['PrescriptionID']);
        }

        if (count($response) > 0) {
            return $this->sendError('Some of the orders already exist in another tray and were not added!', $response);
        }

        return $this->sendResponse([], 'Added to tray!');
    }

    /**
     * Check if a tray item exists in other users tray
     *
     * @param int $id
     * @return JsonResponse
     */
    public function check($id)
    {
        return $this->sendResponse($this->tray->checkExistance($id), 'Check complete');
    }

    /**
     * Insert all prescriptions with status new into the tray
     *
     * @return JsonResponse
     */
    public function insertAllNew($count = false)
    {
        $user = Auth::user();

        $data = [
            'UserID' => $user->id,
            'Type' => 1,
            'Status' => 1
        ];

        $prescriptions = $this->tray->getNew($count);

        if (count($prescriptions) == 0) {
            return $this->sendResponse([], 'No new prescriptions could be added to tray!');
        }

        $response = $this->tray->insertTrayItem($data, $prescriptions);

        if (count($response) > 0) {
            return $this->sendError('Some of the orders already exist in another tray and were not added!', $response);
        }

        return $this->sendResponse([], 'New prescriptions added to tray!');
    }

    /**
     * Delete an item from the tray
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        return $this->sendResponse($this->tray->deleteTrayItem($id), 'Order removed from tray');
    }

    /**
     * Clear a user tray
     *
     * @return JsonResponse
     */
    public function clear($id = false)
    {
        return $this->sendResponse($this->tray->clearTray($id));
    }

    /**
     * Take over a users tray
     *
     * @param int $id
     * @return JsonResponse
     */
    public function takeover($id)
    {
        return $this->sendResponse($this->tray->takeover($id));
    }

    /**
     * Lower the priority for an order in tray
     *
     * @param int $id
     * @return JsonResponse
     */
    public function lowerPriority($id)
    {
        return $this->sendResponse($this->tray->lowerPriority($id));
    }
}