<?php

namespace App\Enums;

use App\Traits\EnumToArray;

enum InventoryLogType: int
{
    case IMPORT = 1;
    case DELETE = 2;
    case DECOMMISSION = 3;
    case RECOMMISSION = 4;
    case MANUAL_DECOMMISSION = 5;
    case MANUAL_RECOMMISSION = 6;
    case DOOP_EXPIRED = 7;
    case DOOP_DAMAGED = 8;
    case DOOP_OTHER = 9;
}
