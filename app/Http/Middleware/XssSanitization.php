<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class XssSanitization
{
    private array $skipKeys = ['f'];
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $requests = $this->sanitize($request->all());
        $request->merge($requests);
        return $next($request);
    }

    private function sanitize(array $arr): array
    {
        foreach ($arr as $key => $val) {
            if (is_array($val)) {
                $arr[$key] = $this->sanitize($val);
            } else if (!in_array($key, $this->skipKeys)) {
                if (is_string($val)) {
                    $arr[$key] = htmlentities($val);
                }
            }
        }
        return $arr;
    }
}
