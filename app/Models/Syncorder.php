<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $SyncOrderID
 * @property int    $ClientID
 * @property int    $Type
 * @property int    $CreatedAt
 * @property string $Value
 */
class Syncorder extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'SyncOrder';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'SyncOrderID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'ClientID',
        'Value',
        'Type',
        'CreatedAt'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'SyncOrderID' => 'int',
        'ClientID' => 'int',
        'Value' => 'string',
        'Type' => 'int',
        'CreatedAt' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'CreatedAt'
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
