<?php

namespace App\Listeners;

use Carbon\Carbon;
use App\Models\Safeip;
use App\Models\SafeipAudit;
use App\Events\SafeipRequested;


class LogSafeip
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SafeipRequested $event): void
    {
        $event->safeip = Safeip::create([
            'SafeIP' => $event->data['ip_address'],
            'SafeKey' => $event->data['token'],
            'Status' => 0,
        ]);

        $event->safeip_audit = SafeipAudit::create([
            'request_from' => $event->data['name'],
            'requested_at' => Carbon::now(),
            'ip_address' => $event->data['ip_address']
        ]);
    }
}
