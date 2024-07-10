<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum OrderStatus: int
{
    use EnumToArray;

    case NEW = 1;
    case APPROVED = 2;
    case REJECTED = 3;
    case QUERIED = 4;
    case CANCELLED = 6;
    case AWAITING_SHIPPING = 7;
    case SHIPPED = 8;
    case SAFETY_CHECK = 9;
    case ONHOLD = 10;
    case QUERIED_DISPENSED = 12;
    case QUERIED_NOT_DISPENSED = 13;
    case RETURNED = 16;

    public function slug(): string
    {
        return strtolower($this->name);
    }
}
