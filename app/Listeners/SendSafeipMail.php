<?php

namespace App\Listeners;

use App\Models\Setting;
use App\Mail\SafeIPMail;
use Illuminate\Support\Str;
use App\Services\CustomerIO;
use App\Events\SafeipRequested;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\App;

class SendSafeipMail
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
        if (!App::environment(['testing'])) {
            //upgrade this so it takes the list from the Setting entry in the database
            $list = Setting::query()->where('Type', 902)->value('Value');
            if (!empty($list)) {
                $list = array_map('trim', explode(',', $list));
                $customerio = new CustomerIO();
                foreach ($list as $email) {
                    $url = "https://track.customer.io/api/v1/customers/" . $email . "/events";
                    $eventName = 'ip-whitelist';
                    $by = Crypt::encryptString($email);
                    $action_id = $event->safeip_audit->id;
                    $token = $event->data['token'];
                    $data = [
                        'ip' => $event->data['ip_address'],
                        'name' => $event->data['name'],
                        'approve_url' => config('app.esa') . "/approve-safe-ip?key=" . $token . '&by=' . $by . '&id=' . $action_id,
                        'reject_url' => config('app.esa') . "/reject-safe-ip?key=" . $token . '&by=' . $by . '&id=' . $action_id,
                        'app' => config('app.name')
                    ];
                    $customerio->setURL($url)
                        ->setEvent($eventName)
                        ->setData($data)
                        ->send();
                }
            }
        }
    }
}
