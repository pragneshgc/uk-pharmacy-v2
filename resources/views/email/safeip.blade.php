<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Safe IP Email</title>
</head>

<body>

    Dear Admin</span>,
    <br><br>
    <b>{{ $name }}</b> requested to have the IP <b>{{ $ip }}</b> whitelisted.
    <br><br>
    IP Address : click to check <a
        href="https://community.spiceworks.com/tools/ip-lookup/results?hostname={{ $ip }}">https://community.spiceworks.com/tools/ip-lookup/results?hostname={{ $ip }}</a>
    <br><br>
    Click below to Apporve or Reject IP
    <br><br>
    <a style="background: #449a44; margin: 10px; padding: 10px; text-decoration: none; color: white; border: 1px solid; text-transform: uppercase;"
        href="{{ url('/approve-safe-ip') }}?key={{ $token }}&by={{ $by }}&id={{ $action_id }}">Approve</a>
    <a style="background: #b76161; margin: 10px; padding: 10px; text-decoration: none; color: white; border: 1px solid; text-transform: uppercase;"
        href="{{ url('/reject-safe-ip') }}?key={{ $token }}&by={{ $by }}&id={{ $action_id }}">Reject</a>
    <br><br>
    Kind Regards
    <br><br>
    ESA System.

</body>

</html>
