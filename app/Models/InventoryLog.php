<?php

namespace App\Models;

use App\Enums\InventoryLogType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InventoryLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reference_id',
        'action',
        'arguments',
        'type',
        'created_at'
    ];

    protected $casts = [
        'user_id' => 'int',
        'reference_id' => 'int',
        'action' => 'string',
        'arguments' => 'array',
        'type' => InventoryLogType::class,
        'created_at' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'created_at',
    ];
}
