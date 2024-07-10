<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum Role: int
{
    use EnumToArray;

    case NOT_ALLOWED = 0;
    case PRODUCT_MANAGEMENT = 4;
    case SHIPPING = 5;
    case LOCUM_DISPENSER_INVOICE = 6;
    case PXP = 10;
    case LOCUM_DISPENSER = 19;
    case DISPENSER = 20;
    case SENIOR_DISPENSER = 25;
    case LOCUM_PHARMACIST = 29;
    case PHARMACIST = 30;
    case SUPER_INTENDENT_PHARMACIST = 35;
    case CUSTOMER_SERVICE = 40;
    case ADMIN = 50;
    case SYSTEM_ADMIN = 60;
}
