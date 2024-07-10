<?php

namespace App\Http\Controllers;

use App\Models\SafeipAudit;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IpAuditController extends Controller
{
    public function search(Request $request)
    {
        $filters = json_decode($request->f, true);

        $result = SafeipAudit::query()
            ->select(['request_from', 'requested_at', 'ip_address', 'action_by', 'action_at', 'status'])
            ->when(!empty($filters['start_date']) && !empty($filters['end_date']), function ($q) use ($filters) {
                $start = Carbon::parse($filters['start_date'])->format('Y-m-d');
                $end = Carbon::parse($filters['end_date'])->format('Y-m-d');
                return $q->whereRaw('date(requested_at) >= ? and date(requested_at) <= ?', [$start, $end]);
            })->when(!empty($filters['audit-status'] && $filters['audit-status'] != 'all'), function ($q) use ($filters) {
                return $q->where('status', $filters['audit-status']);
            })->paginate($this->l);

        return $this->sendResponse($result);
    }
}
