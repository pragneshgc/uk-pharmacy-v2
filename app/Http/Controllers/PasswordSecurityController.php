<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use PragmaRX\Google2FAQRCode\Google2FA;

class PasswordSecurityController extends Controller
{

    /**
     *
     * @param Request $request
     * @return \Illuminate\View\View|\Illuminate\Contracts\View\Factory
     */
    public function show2faForm(Request $request)
    {
        $user = Auth::user();

        $google2fa_url = "";
        if ($user->passwordSecurity()->exists()) {
            $google2fa = app('pragmarx.google2fa');

            $google2fa_url = $google2fa->getQRCodeInline(
                'ESA',
                $user->email,
                $user->passwordSecurity->google2fa_secret
            );
        }
        $data = array(
            'user' => $user,
            'google2fa_url' => $google2fa_url
        );
        return view('google2fa.form')->with('data', $data);
    }

    /**
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function generate2faSecret(Request $request)
    {
        $user = Auth::user();
        // Initialise the 2FA class
        $google2fa = app('pragmarx.google2fa');

        // Add the secret key to the registration data
        $user->passwordSecurity()->create([
            'user_id' => $user->id,
            'google2fa_enable' => 0,
            'google2fa_secret' => $google2fa->generateSecretKey(),
        ]);

        return redirect('/2fa')->with('success', "Secret Key is generated, Please verify Code to Enable 2FA");
    }

    /**
     *
     * @param int $id
     * @return JsonResponse
     */
    public function enable2fa(int $id): JsonResponse
    {
        $user = User::where('id', $id)->first();
        $passwordSecurity = DB::table('password_securities')->where('user_id', $id)->first();
        // $secret = $request->input('verify-code');
        // $valid = $google2fa->verifyKey($user->passwordSecurity->google2fa_secret, $secret);

        if (!$passwordSecurity) {
            $google2fa = app('pragmarx.google2fa');
            $user->passwordSecurity()->create([
                'google2fa_enable' => 1,
                'google2fa_secret' => $google2fa->generateSecretKey(),
            ]);

            return $this->sendResponse('success', "2FA is now enabled.");
        } else {
            $user->passwordSecurity->google2fa_enable = 1;
            $user->passwordSecurity->save();

            return $this->sendResponse('success', "2FA is now enabled.");
        }
    }

    /**
     *
     * @param int $id
     * @return JsonResponse
     */
    public function disable2fa($id)
    {
        $user = User::where('id', $id)->first();
        $user->passwordSecurity->google2fa_enable = 0;
        $user->passwordSecurity->save();

        return $this->sendResponse('success', "2FA is now disabled.");
    }

    /**
     *
     * @param int $id
     * @return JsonResponse
     */
    public function twoFactorVerifyStatus($id): JsonResponse
    {
        $passwordSecurity = DB::table('password_securities')->where('user_id', $id)->first();

        if (!$passwordSecurity) {
            return $this->sendResponse(false);
        } else if ($passwordSecurity->google2fa_enable == 1) {
            return $this->sendResponse(true);
        } else {
            return $this->sendResponse(false);
        }
    }

    /**
     *
     * @param int $id
     * @return JsonResponse
     */
    public function code($id)
    {
        $user = User::where('id', $id)->first();

        $google2fa_url = "";
        $data = [];
        if ($user->passwordSecurity()->exists()) {
            //$google2fa = app('pragmarx.google2fa');
            $google2fa = new Google2FA();
            $google2fa_url = $google2fa->getQRCodeInline(
                config('app.name'),
                $user->email,
                $user->passwordSecurity->google2fa_secret
            );

            if (str_contains($google2fa_url, '<?xml')) {
                $data = [
                    'type' => 'svg',
                    'code' => $google2fa_url
                ];
            } else {
                $data = [
                    'type' => 'base64',
                    'code' => $google2fa_url
                ];
            }
        }

        return $this->sendResponse($data);
    }

    /**
     * This is just a redirect for when 2FA is verified
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function twoFaVerify()
    {
        return redirect('/');
    }

    public function showOTPForm()
    {
        return view('google2fa.index');
    }
}
