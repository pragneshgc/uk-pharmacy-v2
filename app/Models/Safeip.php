<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $SafeIPID
 * @property int    $Status
 * @property string $SafeIP
 * @property string $SafeKey
 */
class Safeip extends Model
{
    use HasFactory;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'SafeIP';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'SafeIPID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'SafeIP',
        'SafeKey',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'SafeIPID' => 'int',
        'SafeIP' => 'string',
        'SafeKey' => 'string',
        'Status' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...

    // Relations ...
}
