<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $AttachmentID
 * @property int    $UserID
 * @property int    $ReferenceID
 * @property int    $Type
 * @property int    $Status
 * @property int    $CreatedAt
 * @property int    $UpdatedAt
 * @property int    $DeletedAt
 * @property string $Name
 * @property string $Filename
 */
class Attachment extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Attachment';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'AttachmentID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'UserID',
        'ReferenceID',
        'Name',
        'Filename',
        'Type',
        'Status',
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'AttachmentID' => 'int',
        'UserID' => 'int',
        'ReferenceID' => 'int',
        'Name' => 'string',
        'Filename' => 'string',
        'Type' => 'int',
        'Status' => 'int',
        'CreatedAt' => 'timestamp',
        'UpdatedAt' => 'timestamp',
        'DeletedAt' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'CreatedAt',
        'UpdatedAt',
        'DeletedAt'
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
