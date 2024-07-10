<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $TestKitID
 * @property int    $PrescriptionID
 * @property int    $Type
 * @property int    $Total
 * @property int    $Count
 * @property int    $CreatedAt
 * @property int    $UpdatedAt
 * @property int    $Status
 * @property string $ParentReferenceNumber
 * @property string $ReferenceNumber
 * @property string $Name
 * @property string $Surname
 * @property string $DOB
 * @property string $Sex
 * @property string $Postcode
 * @property string $Code
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Mobile
 */
class Testkit extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'TestKit';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'TestKitID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'PrescriptionID',
        'ParentReferenceNumber',
        'ReferenceNumber',
        'Type',
        'Total',
        'Count',
        'Name',
        'Surname',
        'DOB',
        'Sex',
        'Postcode',
        'CreatedAt',
        'UpdatedAt',
        'Code',
        'Address1',
        'Address2',
        'Address3',
        'Address4',
        'Mobile',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'TestKitID' => 'int',
        'PrescriptionID' => 'int',
        'ParentReferenceNumber' => 'string',
        'ReferenceNumber' => 'string',
        'Type' => 'int',
        'Total' => 'int',
        'Count' => 'int',
        'Name' => 'string',
        'Surname' => 'string',
        'DOB' => 'string',
        'Sex' => 'string',
        'Postcode' => 'string',
        'CreatedAt' => 'timestamp',
        'UpdatedAt' => 'timestamp',
        'Code' => 'string',
        'Address1' => 'string',
        'Address2' => 'string',
        'Address3' => 'string',
        'Address4' => 'string',
        'Mobile' => 'string',
        'Status' => 'int'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'CreatedAt',
        'UpdatedAt'
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
