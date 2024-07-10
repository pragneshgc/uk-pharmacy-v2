<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $PWLID
 * @property int    $Type
 * @property int    $Status
 * @property string $WLID
 * @property string $ProductID
 */
class Productwarninglabel extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ProductWarningLabel';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PWLID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'WLID',
        'ProductID',
        'Type',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'PWLID' => 'int',
        'WLID' => 'string',
        'ProductID' => 'string',
        'Type' => 'int',
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
