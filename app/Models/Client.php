<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $ClientID
 * @property int    $CountryID
 * @property int    $CreatedDate
 * @property int    $ModifiedDate
 * @property int    $AccessedDate
 * @property int    $Type
 * @property int    $Status
 * @property string $CompanyName
 * @property string $Title
 * @property string $Name
 * @property string $Middlename
 * @property string $Surname
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Postcode
 * @property string $Telephone
 * @property string $Mobile
 * @property string $Email
 * @property string $IP
 * @property string $Notes
 * @property string $CompanyNumber
 * @property string $GPHCNO
 * @property string $ReturnURL
 * @property string $Username
 * @property string $Password
 * @property string $APIKey
 * @property string $ITName
 * @property string $ITEmail
 * @property string $TradingName
 * @property string $AdditionalComment
 * @property string $ReturnUsername
 * @property string $ReturnPassword
 * @property string $PendingPharmacyURL
 * @property string $PendingPharmacyEndpoint
 * @property float  $CreditLimit
 * @property float  $VAT
 */
class Client extends Model
{
    use HasFactory;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Client';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ClientID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'CompanyName',
        'Title',
        'Name',
        'Middlename',
        'Surname',
        'Address1',
        'Address2',
        'Address3',
        'Address4',
        'Postcode',
        'CountryID',
        'Telephone',
        'Mobile',
        'Email',
        'CreditLimit',
        'CreatedDate',
        'ModifiedDate',
        'AccessedDate',
        'IP',
        'Type',
        'Status',
        'Notes',
        'CompanyNumber',
        'GPHCNO',
        'ReturnURL',
        'Username',
        'Password',
        'APIKey',
        'ITName',
        'ITEmail',
        'TradingName',
        'AdditionalComment',
        'ReturnUsername',
        'ReturnPassword',
        'PendingPharmacyURL',
        'PendingPharmacyEndpoint',
        'VAT'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'ClientID' => 'int',
        'CompanyName' => 'string',
        'Title' => 'string',
        'Name' => 'string',
        'Middlename' => 'string',
        'Surname' => 'string',
        'Address1' => 'string',
        'Address2' => 'string',
        'Address3' => 'string',
        'Address4' => 'string',
        'Postcode' => 'string',
        'CountryID' => 'int',
        'Telephone' => 'string',
        'Mobile' => 'string',
        'Email' => 'string',
        'CreditLimit' => 'float',
        'CreatedDate' => 'int',
        'ModifiedDate' => 'int',
        'AccessedDate' => 'int',
        'IP' => 'string',
        'Type' => 'int',
        'Status' => 'int',
        'Notes' => 'string',
        'CompanyNumber' => 'string',
        'GPHCNO' => 'string',
        'ReturnURL' => 'string',
        'Username' => 'string',
        'Password' => 'string',
        'APIKey' => 'string',
        'ITName' => 'string',
        'ITEmail' => 'string',
        'TradingName' => 'string',
        'AdditionalComment' => 'string',
        'ReturnUsername' => 'string',
        'ReturnPassword' => 'string',
        'PendingPharmacyURL' => 'string',
        'PendingPharmacyEndpoint' => 'string',
        'VAT' => 'float'
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
