<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $CountryID
 * @property int    $RegionID
 * @property int    $Status
 * @property string $Name
 * @property string $CodeName2
 * @property string $CodeName3
 * @property float  $Digital
 * @property float  $Physical
 */
class Country extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Country';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'CountryID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Name',
        'RegionID',
        'Status',
        'CodeName2',
        'CodeName3',
        'Digital',
        'Physical'
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
