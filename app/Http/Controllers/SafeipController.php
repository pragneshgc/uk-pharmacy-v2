<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\SafeipAudit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

class SafeipController extends Controller
{
    public function approve(Request $request)
    {
        $safeipAudit = SafeipAudit::where('id', $request->id)->whereNull('action_at')->first();
        if ($safeipAudit) {
            $safeipAudit->action_by = Crypt::decryptString($request->by);
            $safeipAudit->action_at = Carbon::now();
            $safeipAudit->status = 'approved';
            $safeipAudit->save();

            DB::table('SafeIP')->where('SafeKey', $request->key)->update([
                'Status' => 1,
            ]);

            return redirect('/login')->with('success', 'IP address Approved!');
        }
        return redirect('/login')->with('error', 'IP address already approved/rejected!');
    }

    public function reject(Request $request)
    {
        $safeipAudit = SafeipAudit::where('id', $request->id)->whereNull('action_at')->first();
        if ($safeipAudit) {
            $safeipAudit->action_by = Crypt::decryptString($request->by);
            $safeipAudit->action_at = Carbon::now();
            $safeipAudit->status = 'rejected';
            $safeipAudit->save();

            return redirect('/login')->with('success', 'IP address Rejected!');
        }
        return redirect('/login')->with('error', 'IP address already approved/rejected!');
    }
}
