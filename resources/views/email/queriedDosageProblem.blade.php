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
    The responsible pharmacist is unable to process the order number {{ $order->ReferenceNumber }}.
    Please see the pharmacist's comments here:
    <br><br>
    <b>
        <i>
            <u>
                {!! $input['form']['message'] !!}
            </u>
        </i>
    </b>
    <br><br>
    Please amend the order based on the comments highlighted by the pharmacist.
    <br><br>
    This order will be cancelled and you will have to re-send another order.
    <br><br>
    Kind Regards
    <br><br>
    HR Healthcare Dispensing Team.

</body>

</html>
