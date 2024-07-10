<?php

namespace App\Http\Middleware;

use App\Helpers\Generic;
use App\Models\Safeip;
use Closure;
use Illuminate\Support\Facades\DB;

/**
 * Check if the incoming ip is in the safeIP list
 */
class CheckIP
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $ipaddress = Generic::getIP();

        $safeip = Safeip::query()
            ->where(['Status' => 1, 'SafeIP' => $ipaddress])
            ->select('SafeIP')
            ->first();

        if (!isset($safeip->SafeIP) || $ipaddress != $safeip->SafeIP) {
            return redirect('/restricted');
        }

        return $next($request);
    }
}
