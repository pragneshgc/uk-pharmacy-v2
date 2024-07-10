<?php
namespace App\Library;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

/**
 * Helper class for managing system logs
 */
class SystemLog
{
    /**
     * Store a system log
     *
     * System log types are: 1 - scan errors, 2 - import log, 3 - item logs, 4 - batch logs, 5 - product logs, 6 - cautionary and advisory labels, 7 - additional information
     *
     */
    public function store(string $action, array|object $arguments, int $type, bool $id = false): bool
    {

        $esaUserID = 0;
        $name = 'SYSTEM(USER NOT RECOGNIZED)';

        if (Auth::check()) {
            $esaUserID = Auth::user()->esa_user_id;
            $esaUserDetails = DB::table('User')->where('UserID', $esaUserID)->first();
            $name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
        }

        return DB::table('SystemActivity')->insert([
            'UserID' => $esaUserID,
            'ReferenceID' => !$id ? $arguments['data']['OrderID'] : $id,
            'Name' => $name,
            'Action' => $action,
            'Arguments' => json_encode($arguments),
            'Type' => $type,
            'Status' => 1
        ]);
    }
}