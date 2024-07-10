<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $AIID
 * @property int    $Type
 * @property int    $Status
 * @property int    $CountryID
 * @property string $Name
 * @property string $Description
 */
class Additionalinformation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'AdditionalInformation';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'AIID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Name',
        'Description',
        'Type',
        'Status',
        'CountryID'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'AIID' => 'int',
        'Name' => 'string',
        'Description' => 'string',
        'Type' => 'int',
        'Status' => 'int',
        'CountryID' => 'int'
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
