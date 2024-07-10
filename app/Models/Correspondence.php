<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $Correspondence
 * @property int    $CreatedDate
 * @property int    $Status
 * @property int    $UserID
 * @property int    $DoctorID
 * @property int    $Type
 * @property string $ClientID
 * @property string $PrescriptionID
 * @property string $Message
 * @property string $Subject
 * @property string $ReferenceNumber
 */
class Correspondence extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Correspondence';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'Correspondence';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'ClientID',
        'PrescriptionID',
        'Message',
        'CreatedDate',
        'Status',
        'Subject',
        'ReferenceNumber',
        'UserID',
        'DoctorID',
        'Type'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'Correspondence' => 'int',
        'ClientID' => 'string',
        'PrescriptionID' => 'string',
        'Message' => 'string',
        'CreatedDate' => 'int',
        'Status' => 'int',
        'Subject' => 'string',
        'ReferenceNumber' => 'string',
        'UserID' => 'int',
        'DoctorID' => 'int',
        'Type' => 'int'
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
