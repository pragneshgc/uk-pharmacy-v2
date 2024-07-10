<?php

namespace App\Logging;

use Monolog\Logger;

class CustomerioLogger
{
    public function __invoke(array $config): Logger
    {
        return new Logger(
            config('app.name'),
            [new CustomerioLoggerHandler()]
        );
    }
}
