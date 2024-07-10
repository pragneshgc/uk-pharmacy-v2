<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $NoteID
 * @property int    $ParentNoteID
 * @property int    $CustomerID
 * @property int    $PrescriptionID
 * @property int    $UserID
 * @property int    $DeletedByUserID
 * @property int    $EditedByUserID
 * @property int    $Type
 * @property int    $OrderSpecific
 * @property int    $Alert
 * @property int    $Pending
 * @property int    $CreatedAt
 * @property int    $UpdatedAt
 * @property int    $DeletedAt
 * @property int    $EditedAt
 * @property string $ReferenceNumber
 * @property string $Subscription
 * @property string $Note
 */
class Note extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Note';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'NoteID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'ParentNoteID',
        'CustomerID',
        'PrescriptionID',
        'ReferenceNumber',
        'Subscription',
        'UserID',
        'DeletedByUserID',
        'EditedByUserID',
        'Type',
        'OrderSpecific',
        'Alert',
        'Pending',
        'Note',
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt',
        'EditedAt'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'NoteID' => 'int',
        'ParentNoteID' => 'int',
        'CustomerID' => 'int',
        'PrescriptionID' => 'int',
        'ReferenceNumber' => 'string',
        'Subscription' => 'string',
        'UserID' => 'int',
        'DeletedByUserID' => 'int',
        'EditedByUserID' => 'int',
        'Type' => 'int',
        'OrderSpecific' => 'int',
        'Alert' => 'int',
        'Pending' => 'int',
        'Note' => 'string',
        'CreatedAt' => 'timestamp',
        'UpdatedAt' => 'timestamp',
        'DeletedAt' => 'timestamp',
        'EditedAt' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt',
        'EditedAt'
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
