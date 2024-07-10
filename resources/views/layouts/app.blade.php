<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta http-equiv="content-type" content="text/html;charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Styles -->
    <link href="css/site.css" rel="stylesheet" type="text/css" />
    {{-- <link href="{{ mix('/css/app.css') }}" rel="stylesheet" type="text/css"> --}}
    @vite(['resources/assets/sass/app.scss'])


    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i" rel="stylesheet">
    <script>
        let userInfo = {
            id: {!! auth()->user()?->id !!},
            esa_user_id: {!! auth()->user()->esa_user_id != null ? auth()->user()->esa_user_id : '0' !!},
            name: "{!! auth()->user()->name !!}",
            surname: "{!! auth()->user()->surname !!}",
            role: {!! auth()->user()->role !!},
            inventory_role: {!! auth()->user()->inventory_role !!},
            shipping_role: {!! auth()->user()->shipping_role !!},
            pharmacy_role_id: {!! auth()->user()->pharmacy_role_id ?? 0 !!},
            inventory_role_id: {!! auth()->user()->inventory_role_id ?? 0 !!},
            shipping_role_id: {!! auth()->user()->shipping_role_id ?? 0 !!},
            loginAt: "{!! auth()->user()->last_login_at !!}",
            token: "{!! auth()->user()->token !!}",
        };

        const appInfo = {
            name: "{!! config('app.name') !!}",
            inventory: "{!! config('app.inventory') !!}",
            shipping: "{!! config('app.shipping') !!}",
            hidden: {!! $hidden !!},
            mode: "{!! config('app.env') !!}",
            active_modules: {!! $active_modules !!},
            module_roles: {!! $active_module_roles !!}
        }

        const version = {
            currentVersion: "{!! config('app.version') !!}",
            previousVersion: localStorage.getItem('settings.version')
        }

        if (!version.previousVersion && version.currentVersion != version.previousVersion) {
            localStorage.setItem('settings.version', version.currentVersion);
        }

        if (!localStorage.getItem('settings.application')) {
            localStorage.setItem('settings.application', JSON.stringify({
                labelPrinter: 'ZDesigner GK420d',
                deliveryNotePrinter: ''
            }))
        }
    </script>
</head>

<body>
    <div id="app">
        <app-layout></app-layout>
    </div>
    <!-- Scripts -->
    <script type="text/javascript" src="mdb/js/jquery-3.3.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    {{-- <script type="text/javascript" src="{{ mix('/js/app.js') }}"></script> --}}
    @vite(['resources/assets/js/app.js'])

</body>

</html>
