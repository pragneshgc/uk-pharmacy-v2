<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $BlackListID
 * @property int    $CreatedDate
 * @property int    $UpdatedDate
 * @property int    $Status
 * @property string $Name
 * @property string $Surname
 * @property string $DOB
 * @property string $Sex
 * @property string $DAddress1
 * @property string $DAddress2
 * @property string $DAddress3
 * @property string $DAddress4
 * @property string $DPostcode
 * @property string $DCountryCode
 */
class Blacklist extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'BlackList';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'BlackListID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Name',
        'Surname',
        'DOB',
        'Sex',
        'DAddress1',
        'DAddress2',
        'DAddress3',
        'DAddress4',
        'DPostcode',
        'DCountryCode',
        'CreatedDate',
        'UpdatedDate',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'BlackListID' => 'int',
        'Name' => 'string',
        'Surname' => 'string',
        'DOB' => 'string',
        'Sex' => 'string',
        'DAddress1' => 'string',
        'DAddress2' => 'string',
        'DAddress3' => 'string',
        'DAddress4' => 'string',
        'DPostcode' => 'string',
        'DCountryCode' => 'string',
        'CreatedDate' => 'int',
        'UpdatedDate' => 'int',
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
