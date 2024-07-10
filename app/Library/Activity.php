<?php

namespace App\Library;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Undocumented class
 */
class Activity
{
    /**
     * Log a change into the activity table
     *
     * @param int $id
     * @param string $action
     * @param array $arguments
     * @return bool
     */
    public function log($id, $action = '', $arguments = [], $type = 1, $token = false)
    {
        if (!$token) {
            $esaUserID = 0;
            $name = 'SYSTEM(USER NOT RECOGNIZED)';
            if (Auth::check()) {
                //$esaUserID = Auth::user()->esa_user_id;
                //$esaUserDetails = DB::table('User')->where('UserID', $esaUserID)->first();
                //$name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
                $user = Auth::user();
                $esaUserID = $user->esa_user_id;
                $name = $user->name . ' ' . $user->surname;
            }
        } else {
            $user = DB::table('PharmacyUser')->where('token', $token)->first();

            if (!$user) {
                return false;
            }

            $esaUserID = $user->esa_user_id;
            $esaUserDetails = DB::table('User')->where('UserID', $esaUserID)->first();
            $name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
        }

        $date = Carbon::now()->format('d/m/Y H:i');
        $data = [
            'UserID' => $esaUserID,
            'Name' => $name,
            'OrderID' => $id,
            'Date' => $date,
            'Date2' => Carbon::now()->format('Y-m-d'),
            'Min' => $this->round(),
            'Hour' => (int) Carbon::now()->format('H'),
            'Action' => $action,
            'Arguments' => json_encode($arguments),
            'Type' => $type,
            'Status' => 1
        ];

        return DB::table('Activity')->insert($data);
    }

    /**
     * Round a date
     *
     * @return string
     */
    public function round()
    {
        return date('H:i', (time() / (5 * 60)) * (5 * 60));
    }

    /**
     * Get list of activities for the order
     *
     * @param int $id
     * @return Collection
     */
    public function list(int $id): Collection
    {
        return DB::table('Activity')->where('OrderID', $id)->get();
    }

    /**
     * Check if the order was previously approved
     *
     * @param int $id
     * @return boolean
     */
    public function checkPreApproved($id)
    {
        return DB::table('Activity')->where('OrderID', $id)->where('Action', '=', 'Order changed to APPROVED')->exists();
    }

    /**
     * Record a print action
     *
     * @param int $id
     */
    public function recordPrinting(int $id, $type = 'DeliveryNote', $token = false): int|bool
    {
        if ($token) {
            $user = DB::table('PharmacyUser')->where('token', $token)->first();

            if (!$user) {
                return false;
            }

            $esaUserID = $user->esa_user_id;
        } else {
            $esaUserID = Auth::user()->esa_user_id;
        }

        $check = DB::table('PrintRecord')->where('PrescriptionID', $id)->where('UserID', $esaUserID)->first();

        if (!$check) {
            $record = DB::table('PrintRecord')->insert([
                'PrescriptionID' => $id,
                'UserID' => $esaUserID,
                'TNTLabel' => 0,
                'DeliveryNote' => $type == 'DeliveryNote' ? 1 : 0,
                'PharmacyLabel' => $type == 'PharmacyLabel' ? 1 : 0,
                'Invoice' => 0,
                'Consignment' => 0,
                'Type' => 0,
                'Status' => 1,
                'DoctorLetter' => 0,
                'UPSLabel' => 0
            ]);
        } else {
            if ($type == 'DeliveryNote') {
                $update = [
                    'DeliveryNote' => 1
                ];
            } else {
                $update = [
                    'PharmacyLabel' => 1,
                ];
            }

            $record = DB::table('PrintRecord')->where('PrintRecordID', $check->PrintRecordID)->update($update);
        }

        return $record;
    }
}
