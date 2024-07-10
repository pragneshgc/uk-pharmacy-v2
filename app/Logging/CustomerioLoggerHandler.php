<?php

namespace App\Logging;

use Monolog\Handler\AbstractProcessingHandler;

class CustomerioLoggerHandler extends AbstractProcessingHandler
{
    public function write(\Monolog\LogRecord $record): void
    {
        $data = [
            'from' => $record['channel'],
            'message' => $record['message'],
            'context' => join(', ', $record['context'])
        ];
        sendCustomerIOMail(config('esa.send_test_mail_to'), 'esa-error', $data);
    }
}
