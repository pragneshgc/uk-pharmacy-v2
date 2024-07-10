<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $ProductCodeID
 * @property int    $Type
 * @property int    $Status
 * @property int    $Fridge
 * @property int    $Pack
 * @property int    $OTC
 * @property int    $ProductType
 * @property int    $JVM
 * @property int    $TariffCode
 * @property int    $PrintForm
 * @property string $Code
 * @property string $FDBID
 * @property string $Name
 * @property string $Units
 * @property float  $Quantity
 * @property float  $VAT
 */
class Productcode extends Model
{
    use HasFactory;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ProductCode';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ProductCodeID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Code',
        'FDBID',
        'Name',
        'Type',
        'Status',
        'Quantity',
        'Units',
        'Fridge',
        'VAT',
        'Pack',
        'OTC',
        'ProductType',
        'JVM',
        'TariffCode',
        'PrintForm'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'ProductCodeID' => 'int',
        'Code' => 'string',
        'FDBID' => 'string',
        'Name' => 'string',
        'Type' => 'int',
        'Status' => 'int',
        'Quantity' => 'float',
        'Units' => 'string',
        'Fridge' => 'int',
        'VAT' => 'float',
        'Pack' => 'int',
        'OTC' => 'int',
        'ProductType' => 'int',
        'JVM' => 'int',
        'TariffCode' => 'int',
        'PrintForm' => 'int'
    ];
    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...
    public static function checkIfActive(string $id): mixed
    {
        return self::where('Type', 2)->where('Code', $id)->value('Status');
    }

    // Relations ...
}
