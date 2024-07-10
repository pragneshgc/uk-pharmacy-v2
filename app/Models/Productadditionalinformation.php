<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $PAIID
 * @property int    $Type
 * @property int    $Status
 * @property string $AIID
 * @property string $ProductID
 */
class Productadditionalinformation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ProductAdditionalInformation';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PAIID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'AIID',
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
        'PAIID' => 'int',
        'AIID' => 'string',
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
