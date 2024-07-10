<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $UPSAccessPointID
 * @property int    $PrescriptionID
 * @property int    $APNotificationType
 * @property string $Name
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Postcode
 * @property string $CountryCode
 * @property string $APNotificationValue
 * @property string $APNotificationFailedEmailAddress
 * @property string $APNotificationCountryTerritory
 * @property string $APNotificationPhoneCountryCode
 * @property string $APNotificationLanguage
 * @property string $UPSAccessPoint
 */
class Upsaccesspoint extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'UPSAccessPoint';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'UPSAccessPointID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'PrescriptionID',
        'Name',
        'Address1',
        'Address2',
        'Address3',
        'Address4',
        'Postcode',
        'CountryCode',
        'APNotificationType',
        'APNotificationValue',
        'APNotificationFailedEmailAddress',
        'APNotificationCountryTerritory',
        'APNotificationPhoneCountryCode',
        'APNotificationLanguage',
        'UPSAccessPoint'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'UPSAccessPointID' => 'int',
        'PrescriptionID' => 'int',
        'Name' => 'string',
        'Address1' => 'string',
        'Address2' => 'string',
        'Address3' => 'string',
        'Address4' => 'string',
        'Postcode' => 'string',
        'CountryCode' => 'string',
        'APNotificationType' => 'int',
        'APNotificationValue' => 'string',
        'APNotificationFailedEmailAddress' => 'string',
        'APNotificationCountryTerritory' => 'string',
        'APNotificationPhoneCountryCode' => 'string',
        'APNotificationLanguage' => 'string',
        'UPSAccessPoint' => 'string'
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
