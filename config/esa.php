<?php
return [
    'slack_webhook_url' => env('LOG_SLACK_WEBHOOK_URL', ''),
    'send_test_mail_to' => env('TEST_EMAIL_TO', 'pragnesh@goodcareit.com'),
    'no_of_rejected_ip_request' => env('NO_OF_REJECTED_IP_REQUEST', 2),
    'telescope_access_email' => env('TELESCOPE_ACCESS_EMAIL'),
    'send_error_to_slack' => env('SEND_ERROR_TO_SLACK', false),
    'translate_key' => env('TRANSLATE_KEY'),
];
