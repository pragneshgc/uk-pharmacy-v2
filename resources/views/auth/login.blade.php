@extends('layouts.auth')

@section('content')
    <div class="logo"></div>
    <div class="loginBox">
        <p class="info">Your IP: <span>{{ \App\Helpers\Generic::getIP() }}</span></p>
        <h1>Login</h1>
        @if (config('app.env') != 'production')
            <p class="demo-warning">The Application is running in DEMO mode!</p>
        @endif

        @if (session()->has('success'))
            <div class="infoBox alert">
                {{ session()->get('success') }}
            </div>
        @endif

        @if (session()->has('error'))
            <div class="infoBox warning">
                {{ session()->get('error') }}
            </div>
        @endif

        <br>
        <ul class="nav nav-pills mt-3 mb-3" id="pills-tab" role="tablist">
            <li class="nav-item">
                <button onclick="changeTab('code')" class="btn btnSize01 primaryBtn active nav-button" id="pills-home-tab"
                    data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true">
                    Code
                </button>
            </li>
            <li class="nav-item">
                <button onclick="changeTab('password')" class="btn btnSize01 primaryBtn nav-button" id="pills-profile-tab"
                    data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false">
                    Email/Password
                </button>
            </li>
        </ul>

        <form id="code-login" method="POST" style="display: none;" action="{{ route('login_code') }}"
            aria-label="{{ __('Login Code') }}">
            <div class="formItemsGroup">
                <div class="formItem">
                    <label class="formItemLabel">Code:</label>
                    <input conceal id="code" type="text" autocomplete="false" class="tBox tBoxSize01" name="code"
                        value="{{ old('email') }}" required autofocus />
                    @if ($errors->has('code'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('code') }}</strong>
                        </span>
                    @endif
                </div>
            </div>
            <div class="footer">
                <div class="formItemsGroup"><button type="submit" class="btn btnSize01 primaryBtn">Login</button></div>
            </div>
            @csrf
        </form>

        <form id="password-login" method="POST" action="{{ route('login') }}" aria-label="{{ __('Login') }}">
            @csrf
            <div class="formItemsGroup">
                <div class="formItem">
                    <label class="formItemLabel">Username:</label>
                    <input id="email" type="email" class="tBox tBoxSize01" name="email" value="{{ old('email') }}"
                        required autofocus />
                    @if ($errors->has('email'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('email') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="formItem">
                    <label class="formItemLabel">Password:</label>
                    <input id="password" type="password" class="tBox tBoxSize01" name="password" required />
                    @if ($errors->has('password'))
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $errors->first('password') }}</strong>
                        </span>
                    @endif
                </div>
                <div class="formItem">
                    <label class="checkboxElement">
                        <input class="custom-control-input" type="checkbox" name="remember" id="remember"
                            {{ old('remember') ? 'checked' : '' }}>
                        <span class="checkmark"></span>Remember me</label>
                </div>
            </div>
            <div class="footer">
                <div class="formItemsGroup">
                    <button type="submit" class="btn btnSize01 primaryBtn">Login</button>
                </div>
            </div>
        </form>
    </div>
@endsection

<script>
    function changeTab(tab) {
        switch (tab) {
            case 'code':
                document.getElementById('code-login').style.display = 'block';
                document.getElementById('password-login').style.display = 'none';
                break;
            case 'password':
                document.getElementById('password-login').style.display = 'block';
                document.getElementById('code-login').style.display = 'none';
                break;
            default:
                break;
        }

        window.setTimeout(() => {
            focusInput(tab);
        }, 0);
    }

    function focusInput(type) {
        switch (type) {
            case 'code':
                document.getElementById('code').focus();
                break;
            case 'password':
                document.getElementById('email').focus();
                break;
            default:
                break;
        }
    }

    window.setTimeout(() => {
        focusInput('code');
    }, 0);
</script>

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
