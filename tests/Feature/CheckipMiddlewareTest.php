<?php

namespace Tests\Feature;

use Mockery;
use Tests\TestCase;
use App\Models\Safeip;
use Illuminate\Http\Response;
use App\Http\Middleware\CheckIP;
use Illuminate\Support\Facades\Request;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;

class CheckipMiddlewareTest extends TestCase
{
    use RefreshDatabase;

    public function test_should_redirect_to_restricted_isolated(): void
    {
        //$fakeIP = fake()->ipv4();
        //$this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);

        $called = false;
        $request = Request::create('https://pharmacy.v1-esa.test/invoices/generate/1', 'get');
        $next = function ($request) use (&$called) {
            $called = true;
        };

        $response = (new CheckIP())->handle($request, $next);
        $this->assertEquals($response->getStatusCode(), 302);
        $this->assertFalse($called);
    }

    public function test_should_redirect_to_restricted_with_url_call()
    {
        $response = $this->get('/invoices/generate/1');
        $response->assertStatus(302);
        $response->assertRedirect('/restricted');
    }

    public function test_allow_access_to_url_without_middleware()
    {
        $response = $this->get('/restricted');
        $response->assertStatus(200);
    }

    public function test_should_redirect_to_restricted_page()
    {
        $fakeIP = fake()->ipv4();
        Safeip::factory()->create([
            'SafeIP' => $fakeIP,
            'Status' => 0,
        ]);

        Route::get('/my-test-route', fn () => 'it works!')->middleware(CheckIP::class);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);
        $response = $this->get('/my-test-route');
        $response->assertRedirect('/restricted');
    }

    public function test_should_call_next_callback_if_everything_works()
    {
        $fakeIP = fake()->ipv4();
        Safeip::factory()->create([
            'SafeIP' => $fakeIP,
            'Status' => 1,
        ]);

        Route::get('/my-test-route', fn () => 'it works!')->middleware(CheckIP::class);

        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);
        $response = $this->get('/my-test-route');
        $response->assertContent('it works!');
    }
}
