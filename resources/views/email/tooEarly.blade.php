<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $subject }}</title>
</head>

<body>

Dear <span style="text-transform: capitalize;">{{ $order->DoctorName }}</span>,
<br><br>
The responsible pharmacist has declined order number {{ $order->ReferenceNumber }} because they
deem that the patient has ordered too early.
<br><br>
Please see the Pharmacist comments here:
<br><br>
<b>
    <i>
        <u>
            {!! $input['form']['message'] !!}
        </u>
    </i>
</b>
<br><br>
The order will be cancelled and you will not be billed for this. If you are able to
edit the order then please do so and simply send a new order to process.
<br><br>
Kind Regards
<br><br>
HR Healthcare Dispensing Team.

</body>

</html>