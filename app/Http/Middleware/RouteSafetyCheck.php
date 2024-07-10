<?php

namespace App\Http\Middleware;

use Closure;

class RouteSafetyCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        if (config('app.env') != 'testing') {
            if (str_replace(url('/'), '', url()->previous()) !== '/') {
                return 'nope';
            }
        }

        return $next($request);
    }
}