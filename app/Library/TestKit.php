<?php
namespace App\Library;

use Illuminate\Support\Facades\DB;

class TestKit
{
    /**
     * Update test kit statuses with a specific prescription ID
     *
     * @param int $id
     * @param int $status
     * @return void
     */
    public function updateTestKitStatuses($id, $status)
    {
        DB::table('TestKit')->where('PrescriptionID', $id)->update(['Status' => $status]);
    }
}