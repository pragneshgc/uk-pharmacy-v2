<?php

namespace App\Library;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

// use Carbon\Carbon;

/**
 * Undocumented class
 */
class Correspondence
{
    /**
     * Get option from selected value
     *
     * @param array $options
     * @param mixed $value
     */
    public function getFromOptions(array $options, $value): array|false
    {
        foreach ($options as $option) {
            if ($option['value'] == $value) {
                return $option;
            }
        }

        return false;
    }

    /**
     * Store new correspondence
     *
     * @param array $input
     * @param mixed $option
     * @param mixed $order
     * @param mixed $mail
     * @return bool
     */
    public function storeCorrespondence($order, $mail)
    {
        return DB::table('Correspondence')->insert(
            [
                'ClientID' => $order->ClientID,
                'PrescriptionID' => $order->PrescriptionID,
                'Message' => $mail->render(),
                'CreatedDate' => time(),
                'Status' => 1,
                'Subject' => $mail->subject,
                'ReferenceNumber' => 1,
                'Type' => 1,
                'UserID' => Auth::user()->esa_user_id,
                'DoctorID' => $order->DoctorID
            ]
        );
    }
}
