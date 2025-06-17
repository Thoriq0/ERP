<?php

use Illuminate\Http\Request;
use App\Http\Middleware\RoleChecking;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);
        $middleware->alias([
            'rolechecking' => RoleChecking::class
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (\Exception $e, $request) {
            // if (
            //     $e->getPrevious() instanceof TokenMismatchException ||
            //     $e instanceof TokenMismatchException
            // ) {
            //     return redirect()
            //         ->route('login') 
            //         ->with('error', 'Session expired. Please log in again.');
            // }
        });
    })
    ->create();

