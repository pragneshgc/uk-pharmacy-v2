<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $DoctorAddressID
 * @property int    $DoctorID
 * @property int    $CountryID
 * @property int    $CreatedDate
 * @property int    $ModifiedDate
 * @property int    $AccessedDate
 * @property int    $Status
 * @property int    $DoctorType
 * @property int    $Type
 * @property int    $ParentID
 * @property string $Title
 * @property string $CompanyName
 * @property string $Name
 * @property string $Surname
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Postcode
 * @property string $Telephone
 * @property string $Mobile
 * @property string $Email
 * @property string $Notes
 * @property string $GMCNO
 * @property string $MedicalInsuranceNo
 * @property string $Password
 * @property string $Username
 */
class Doctoraddress extends Model
{
    use HasFactory;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'DoctorAddress';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'DoctorAddressID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'DoctorID',
        'Title',
        'CompanyName',
        'Name',
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
        'CreatedDate',
        'ModifiedDate',
        'AccessedDate',
        'Status',
        'Notes',
        'GMCNO',
        'MedicalInsuranceNo',
        'Password',
        'Username',
        'DoctorType',
        'Type',
        'ParentID'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'DoctorAddressID' => 'int',
        'DoctorID' => 'int',
        'Title' => 'string',
        'CompanyName' => 'string',
        'Name' => 'string',
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
        'CreatedDate' => 'int',
        'ModifiedDate' => 'int',
        'AccessedDate' => 'int',
        'Status' => 'int',
        'Notes' => 'string',
        'GMCNO' => 'string',
        'MedicalInsuranceNo' => 'string',
        'Password' => 'string',
        'Username' => 'string',
        'DoctorType' => 'int',
        'Type' => 'int',
        'ParentID' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    // Functions ...
    public static function getDoctorAddressID(int $id): mixed
    {
        return self::where('DoctorID', $id)
            ->where('Status', 1)
            ->orderBy('DoctorAddressID', 'DESC')
            ->value('DoctorAddressID');
    }

    // Relations ...
}
