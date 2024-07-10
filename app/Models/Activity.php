<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $ActivityID
 * @property int    $UserID
 * @property int    $OrderID
 * @property int    $Hour
 * @property int    $Status
 * @property int    $Type
 * @property string $Arguments
 * @property string $Name
 * @property string $Date
 * @property string $Action
 * @property string $Min
 * @property string $Date2
 */
class Activity extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Activity';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ActivityID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Arguments',
        'UserID',
        'Name',
        'OrderID',
        'Date',
        'Action',
        'Min',
        'Hour',
        'Date2',
        'Status',
        'Type'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'ActivityID' => 'int',
        'UserID' => 'int',
        'Name' => 'string',
        'OrderID' => 'int',
        'Date' => 'string',
        'Action' => 'string',
        'Arguments' => 'string',
        'Type' => 'int',
        'Status' => 'int',
        'Date2' => 'string',
        'Hour' => 'int',
        'Min' => 'string',
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
