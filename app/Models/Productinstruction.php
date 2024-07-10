<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $PILID
 * @property int    $Status
 * @property int    $Type
 * @property string $InstructionID
 * @property string $ProductID
 */
class Productinstruction extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ProductInstruction';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PILID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'InstructionID',
        'ProductID',
        'Status',
        'Type'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'PILID' => 'int',
        'InstructionID' => 'string',
        'ProductID' => 'string',
        'Status' => 'int',
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
