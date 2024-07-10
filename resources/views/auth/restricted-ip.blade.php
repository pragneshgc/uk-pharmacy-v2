@extends('layouts.auth')

@section('content')
    <div class="logo"></div>
    <div class="loginBox">
        <p class="info">Your IP: <span>{{ \App\Helpers\Generic::getIP() }}</span></p>
        @if (config('app.env') != 'production')
            <p class="demo-warning">The Application is running in DEMO mode!</p>
        @endif
        <br>

        <form id="code-login" method="POST" action="{{ route('restricted-ip-mail') }}" aria-label="{{ __('Login Code') }}">
            @csrf
            <div class="formItemsGroup">
                <div class="formItem">
                    <div class="warning">
                        <b>THIS IS IP RESTRICTED ZONE. IF YOU ARE A MEMBER OF ESA CLICK BELOW TO REQUEST ACCESS.</b>
                    </div>
                    <label class="formItemLabel">Name:</label>
                    <input id="name" type="text" autocomplete="false" class="tBox tBoxSize01" name="name"
                        value="{{ old('name') }}" required autofocus />
                    @if ($errors->has('name'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('name') }}</strong>
                        </span>
                    @endif
                </div>
            </div>

            <div class="footer">
                <div class="formItemsGroup"><button type="submit" class="btn btnSize01 primaryBtn">Whitelist My IP</button>
                </div>
            </div>
        </form>

        @if (session('message'))
            <div class="safe-warning">
                <b>{{ session('message') }}</b>
            </div>
        @endif

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

    .safe-warning {
        margin: 0;
        background: orange;
        color: white;
        padding: 5px;
        text-align: center;
        font-weight: 700;
        font-size: 16px;
    }
</style>
