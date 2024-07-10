<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CaptchaServiceController extends Controller
{
    public function capthcaFormValidate(Request $request)
    {
        $request->validate([
            'captcha' => 'required|captcha'
        ]);
    }
    public function reloadCaptcha()
    {
        return response()->json(['captcha' => captcha_img('flat')]);
    }
}
