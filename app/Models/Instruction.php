<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $InstructionID
 * @property int    $Lang
 * @property int    $Status
 * @property int    $Type
 * @property string $Description
 * @property string $Name
 */
class Instruction extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Instruction';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'InstructionID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Description',
        'Lang',
        'Name',
        'Status',
        'Type'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'InstructionID' => 'int',
        'Description' => 'string',
        'Lang' => 'int',
        'Name' => 'string',
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
