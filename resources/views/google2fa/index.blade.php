@extends('layouts.auth')

@section('content')
    <div class="logo"></div>
    <div class="loginBox">
        <p class="info">Your IP: <span>{{ \App\Helpers\Generic::getIP() }}</span></p>
        <h1>Authenticator Code</h1>
        @if (config('app.env') != 'production')
            <p class="demo-warning">The Application is running in DEMO mode!</p>
        @endif
        <br>
        <form id="2fa" method="POST" action="{{ route('2faVerify') }}" aria-label="2FA Verify">
            @csrf
            <div class="formItemsGroup">
                <div class="formItem">
                    <label class="formItemLabel">One Time Password:</label>
                    <input id="one_time_password" type="text" autocomplete="false" class="tBox tBoxSize01"
                        name="one_time_password" value="{{ old('one_time_password') }}" required autofocus />

                    @if (session('error'))
                        <span class="invalid-feedback danger">
                            <strong>{{ session('error') }}</strong>
                        </span>
                    @endif
                    @if (session('success'))
                        <span class="valid-feedback">
                            <strong>{{ session('success') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="footer">
                <div class="formItemsGroup"><button type="submit" class="btn btnSize01 primaryBtn">Authenticate</button>
                </div>
            </div>
        </form>
    </div>
@endsection

<style>
    @font-face {
        font-family: 'dotsfont';
        src: url('/fonts/dotsfont.eot');
        src: url('/fonts/dotsfont.eot?#iefix') format('embedded-opentype'),
            url('/fonts/dotsfont.woff') format('woff'),
            url('/fonts/dotsfont.ttf') format('truetype'),
            url('/fonts/dotsfont.svg#dotsfontregular') format('svg');
    }

    [conceal] {
        font-family: 'dotsfont';
        font-size: 12px;
    }

    .logo {
        background: url(../images/logo_white.png) 0 0 no-repeat !important;
    }

    .login {
        display: flex;
        flex-direction: column;
    }

    .loginBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex-grow: 1;
    }

    .loginBox h1 {
        text-align: center !important;
    }

    .nav {
        justify-content: center;
        display: inline-flex;
        width: 100%;
    }

    .nav-button {
        margin: 10px;
    }

    .formItemLabel {
        font-weight: 700 !important;
    }

    .checkboxElement {
        font-weight: 700 !important;

    }

    .page-login {
        background: #3ca5a8 !important;
    }

    .page-login .login .loginBox .footer {
        background: white !important;
    }

    .demo-warning {
        margin: 0;
        background: red;
        color: white;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
    }
</style>
