<?php

namespace App\Http\Middleware;

use Closure;

class CheckPassword
{

    public function handle($request, Closure $next)
    {
        if($request ->api_token!==env('Api_Token','AhmedLimatrix')){
            return response()->json(['messages'=>'Unauthenticated']);
        }
        return $next($request);
    }
}
