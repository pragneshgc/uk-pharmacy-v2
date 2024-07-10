<?php

namespace App\Library;

use Illuminate\Support\Facades\Session;
use PragmaRX\Google2FALaravel\Support\Authenticator;
use PragmaRX\Google2FALaravel\Exceptions\InvalidSecretKey;

/**
 * @method boot($request)
 * @method isAuthenticated();
 */
class Google2FAAuthenticator extends Authenticator
{
    protected function canPassWithoutCheckingOTP()
    {
        if (!$this->getUser()->passwordSecurity)
            return true;
        return
            !$this->getUser()->passwordSecurity->google2fa_enable ||
            !$this->isEnabled() ||
            $this->noUserIsAuthenticated() ||
            $this->twoFactorAuthStillValid();
    }

    protected function getGoogle2FASecretKey()
    {
        $secret = $this->getUser()->passwordSecurity->{$this->config('otp_secret_column')};

        if (is_null($secret) || empty($secret)) {
            throw new InvalidSecretKey('Secret key cannot be empty.');
        }

        return $secret;
    }

    protected function verifyAndStoreOneTimePassword($one_time_password)
    {
        $verified = $this->verifyGoogle2FA(
            $this->getGoogle2FASecretKey(),
            $one_time_password
        );
        if (!$verified) {
            Session::put('error', 'Invalid OTP.');
            return false;
        }
        return $this->storeOldTimestamp($verified);
    }
}
