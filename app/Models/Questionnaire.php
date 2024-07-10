<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $QuestionnaireID
 * @property int    $PrescriptionID
 * @property int    $Status
 * @property string $Question
 * @property string $Answer
 */
class Questionnaire extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Questionnaire';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'QuestionnaireID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'PrescriptionID',
        'Question',
        'Answer',
        'Status'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'QuestionnaireID' => 'int',
        'PrescriptionID' => 'int',
        'Question' => 'string',
        'Answer' => 'string',
        'Status' => 'int'
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
