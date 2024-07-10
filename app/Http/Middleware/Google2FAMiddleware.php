<?php

namespace App\Http\Middleware;

use Closure;
use App\Helpers\Generic;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Library\Google2FAAuthenticator;

class Google2FAMiddleware
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

        $office_ips = explode(',', config('app.office_ip'));
        if (in_array($ipaddress, $office_ips)) {
            return $next($request);
        }

        /** @var \App\Library\Google2FAAuthenticator $authenticator */
        $authenticator = app(Google2FAAuthenticator::class)->boot($request);

        if ($authenticator->isAuthenticated()) {
            return $next($request);
        }

        return $authenticator->makeRequestOneTimePasswordResponse();
    }
}
