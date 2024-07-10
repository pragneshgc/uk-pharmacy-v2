<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $PricingID
 * @property int    $ClientID
 * @property int    $Type
 * @property int    $Status
 * @property string $Code
 * @property float  $Price
 * @property float  $Quantity
 */
class Pricing extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Pricing';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PricingID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Code',
        'ClientID',
        'Price',
        'Type',
        'Status',
        'Quantity'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'PricingID' => 'int',
        'Code' => 'string',
        'ClientID' => 'int',
        'Price' => 'float',
        'Type' => 'int',
        'Status' => 'int',
        'Quantity' => 'float'
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
