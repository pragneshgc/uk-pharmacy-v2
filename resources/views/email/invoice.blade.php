<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Invoice #{{ $id }} for {{ $toCompanyName }} from {{ $fromCompanyName }}</title>
    </head>

    <body>
        Dear {{ $toCompanyName }}</span>,
        <br><br>
        In the attachment is the invoice #{{ $id }}
        <br><br>
        Kind Regards
        <br><br>
        {{ $fromCompanyName }}.
    </body>
</html>