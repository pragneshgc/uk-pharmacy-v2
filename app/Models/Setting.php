<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $SettingID
 * @property int    $Type
 * @property int    $Status
 * @property string $Name
 * @property string $Value
 */
class Setting extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Setting';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'SettingID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Name',
        'Value',
        'Type',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'SettingID' => 'int',
        'Name' => 'string',
        'Value' => 'string',
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
