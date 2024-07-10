<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthorizeTelescope
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (app()->environment('local', 'staging')) {
            $auth = auth()->user();
            $allow_access_to = explode(',', config('esa.telescope_access_email'));
            if ($auth && in_array($auth->email, $allow_access_to)) {
                return $next($request);
            }
        }

        return abort(403);
    }
}
