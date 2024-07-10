<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $ItemID
 * @property int    $InvoiceID
 * @property int    $ProductID
 * @property int    $Quantity
 * @property int    $Type
 * @property int    $Status
 * @property int    $PrescriptionID
 * @property int    $Date
 * @property int    $DoctorID
 * @property string $ReferenceNumber
 * @property string $Description
 * @property string $ProductCode
 * @property float  $UnitCost
 * @property float  $VAT
 */
class Invoiceitem extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'InvoiceItem';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ItemID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'InvoiceID',
        'ReferenceNumber',
        'ProductID',
        'Description',
        'ProductCode',
        'UnitCost',
        'Quantity',
        'Type',
        'Status',
        'VAT',
        'PrescriptionID',
        'Date',
        'DoctorID'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'ItemID' => 'int',
        'InvoiceID' => 'int',
        'ReferenceNumber' => 'string',
        'ProductID' => 'int',
        'Description' => 'string',
        'ProductCode' => 'string',
        'UnitCost' => 'float',
        'Quantity' => 'int',
        'Type' => 'int',
        'Status' => 'int',
        'VAT' => 'float',
        'PrescriptionID' => 'int',
        'Date' => 'int',
        'DoctorID' => 'int'
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
