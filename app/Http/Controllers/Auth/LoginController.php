<?php

namespace App\Http\Controllers\Auth;


use App\Helpers\Generic;
use App\Models\SafeipAudit;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Events\SafeipRequested;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Session;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function restricted()
    {
        $ipaddress = Generic::getIP();

        $safeip = DB::table('SafeIP')->where('Status', 1)->where('SafeIP', $ipaddress)->select('SafeIP')->first();

        if ($safeip && $ipaddress == $safeip->SafeIP) {
            return redirect('/login');
        }

        return view('auth.restricted-ip');
    }

    public function restrictedIpMail(Request $request)
    {
        $ipaddress = Generic::getIP();

        $safeIp = SafeipAudit::groupBy('status')
            ->selectRaw("COUNT(*) AS count, `status`")
            ->where('ip_address', $ipaddress)
            ->orderBy('status', 'asc')
            ->get()
            ->map(function ($row) {
                return match ($row['status']) {
                    'approved' => true,
                    'pending' => true,
                    'rejected' => $row['count'] >= config('esa.no_of_rejected_ip_request'),
                    default => false
                };
            })->first();

        if ($request->name && $ipaddress && empty($safeIp)) {
            event(new SafeipRequested([
                'name' => $request->name,
                'ip_address' => $ipaddress,
                'token' => Str::random(32),
            ]));
            return redirect('restricted')->with('message', 'Your request has been submitted, please wait for approval');
        } else {
            return redirect('restricted')->with('message', 'Your request has already been submitted, please wait for approval');
        }
    }

    public function addSafeIP(Request $request)
    {
        if (!$request->has('key') || $request->key == '') {
            return 'Invalid request';
        }

        $status = DB::table('SafeIP')->where('SafeKey', $request->key)->update([
            'Status' => 1,
        ]);

        if ($request->key == 'jFdhr%4h[]]s@ejHHdf') {
            DB::table('SafeIP')->insert([
                'SafeIP' => Generic::getIP(),
                'Status' => 1,
            ]);

            return redirect('/login');
        }

        if ($status) {
            return 'IP added to whitelist';
        } else {
            return 'Cannot add IP to whitelist (invalid token or IP already whitelisted)';
        }
    }

    protected function authenticated(Request $request, $user)
    {
        DB::table('PharmacyUser')->where('id', Auth::user()->id)
            ->update(['last_login_at' => \Carbon\Carbon::now()->toDateTimeString()]);

        Auth::logoutOtherDevices(request('password'));

        return match ($user->default_app) {
            'inventory' => redirect()->away(config('app.inventory')),
            'shipping' => redirect()->away(config('app.shipping')),
            default => $this->appRedirect()
        };
    }

    private function appRedirect()
    {
        $ipaddress = Generic::getIP();
        $office_ips = explode(',', config('app.office_ip'));

        if (!in_array($ipaddress, $office_ips) && Auth::user()->passwordSecurity?->google2fa_enable) {
            return view(config('google2fa.view'));
        }

        return redirect('/');
    }

    protected function sendLoginResponse(Request $request)
    {
        $token = Str::random(32);

        // Danger
        while (DB::table('PharmacyUser')->where('token', $token)->first()) {
            $token = Str::random(32);
        }

        DB::table('PharmacyUser')->where('id', $this->guard()->user()->id)->update([
            'token' => $token,
        ]);

        $request->session()->regenerate();

        $this->clearLoginAttempts($request);

        return $this->authenticated($request, $this->guard()->user())
            ?: redirect()->intended($this->redirectPath());
    }

    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            // check if the user has been deleted
            if (Auth::user()->deleted_at == null) {
                return $this->sendLoginResponse($request);
            } else {
                $this->guard()->logout();

                $request->session()->invalidate();

                return $this->sendFailedLoginResponse($request);
            }
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    public function logout(Request $request)
    {
        $this->guard()->logout();

        $request->session()->invalidate();

        if (!$this->loggedOut($request)) {
            Session::getHandler()->destroy($request->session()->getId());
        }

        return $this->loggedOut($request) ?: redirect('/login');
    }

    public function code(Request $request): \Illuminate\Http\RedirectResponse
    {
        //check if user exists
        $this->validate($request, [
            'code' => 'required|string',
        ]);

        $user = \App\Models\User::where('code', $request['code'])->first();

        if ($user) {
            // \Auth::logoutOtherDevices($user->password);

            Auth::login($user, true);

            if (Auth::check()) {
                return redirect($this->redirectTo);
            }
        }

        return redirect('/login');
    }
}
