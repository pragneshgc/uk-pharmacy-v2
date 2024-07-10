<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int   $InvoiceID
 * @property int   $ParentInvoiceID
 * @property int   $SequenceID
 * @property int   $DateCreated
 * @property int   $DatePaid
 * @property int   $ClientID
 * @property int   $Status
 * @property int   $Type
 * @property int   $PaymentMethod
 * @property float $GrossAmount
 * @property float $AmountReceived
 * @property float $VAT
 * @property float $NetAmount
 */
class Invoice extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Invoice';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'InvoiceID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'ParentInvoiceID',
        'SequenceID',
        'DateCreated',
        'DatePaid',
        'ClientID',
        'GrossAmount',
        'AmountReceived',
        'Status',
        'Type',
        'PaymentMethod',
        'VAT',
        'NetAmount'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'InvoiceID' => 'int',
        'ParentInvoiceID' => 'int',
        'SequenceID' => 'int',
        'DateCreated' => 'int',
        'DatePaid' => 'int',
        'ClientID' => 'int',
        'GrossAmount' => 'float',
        'AmountReceived' => 'float',
        'Status' => 'int',
        'Type' => 'int',
        'PaymentMethod' => 'int',
        'VAT' => 'float',
        'NetAmount' => 'float'
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
