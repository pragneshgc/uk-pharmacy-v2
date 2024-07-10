<?php

namespace App\Http\Controllers;

use App\Library\JVM;
use App\Library\Activity;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Notifications\Action;

/**
 * Controller used for communication with the JVM machine
 */
class JVMController extends Controller
{
    /**
     * Send prescription for processing by the JVM machine
     *
     * @return JsonResponse
     */
    public function send($id, JVM $jvm)
    {
        $activity = new Activity;

        if ($ocs = $jvm->generateOcs($id)) {
            if ($jvm->sendToMachine($id, $ocs)) {
                $activity->log($id, 'OCS file transfered for machine processing', [], 900); //type 900 for JVM

                return $this->sendResponse(true, 'OCS file transfered to JVM machine');
            }
        }

        $activity->log($id, 'Failed to process OCS file', [], 904); //type 904 for JVM fail

        return $this->sendError(false, 'Unable to create or send the ocs file');
    }

    /**
     * Check the prescription status
     *
     * @return JsonResponse
     */
    public function status($id, JVM $jvm)
    {
        $statuses = [0 => 'not found', 1 => 'pending', 2 => 'processed', 3 => 'failed'];
        $status = $jvm->status($id);

        return $this->sendResponse($status, "Prescription status $statuses[$status]");
    }
}