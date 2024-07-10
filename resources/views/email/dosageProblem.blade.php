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
The responsible pharmacist is unable to send your order number {{ $order->ReferenceNumber }} as the medicine dosage is incorrect.
<br><br>
Please see the pharmacist comments here:
<br><br>
<b>
    <i>
        <u>
            {!! $input['form']['message'] !!}
        </u>
    </i>
</b>
<br><br>
This order will be cancelled and you will not be billed for this.
<br><br>
If you are able to make the changes mentioned by the pharmacist above, please re-send another new order with the changes.
<br><br>
Kind Regards
<br><br>
HR Healthcare Dispensing Team.

</body>

</html>