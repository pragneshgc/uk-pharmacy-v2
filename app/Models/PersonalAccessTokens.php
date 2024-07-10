<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property string $tokenable_type
 * @property string $name
 * @property string $token
 * @property string $abilities
 * @property string $tokenable_type
 * @property string $name
 * @property string $token
 * @property string $abilities
 * @property string $tokenable_type
 * @property string $name
 * @property string $token
 * @property string $abilities
 * @property string $tokenable_type
 * @property string $name
 * @property string $token
 * @property string $abilities
 * @property int    $last_used_at
 * @property int    $created_at
 * @property int    $updated_at
 * @property int    $last_used_at
 * @property int    $expires_at
 * @property int    $created_at
 * @property int    $updated_at
 * @property int    $last_used_at
 * @property int    $expires_at
 * @property int    $created_at
 * @property int    $updated_at
 * @property int    $last_used_at
 * @property int    $expires_at
 * @property int    $created_at
 * @property int    $updated_at
 */
class PersonalAccessTokens extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'personal_access_tokens';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'tokenable_type',
        'tokenable_id',
        'name',
        'token',
        'abilities',
        'last_used_at',
        'expires_at',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'tokenable_type' => 'string',
        'tokenable_id' => 'int',
        'name' => 'string',
        'token' => 'string',
        'abilities' => 'string',
        'last_used_at' => 'timestamp',
        'expires_at' => 'timestamp',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'last_used_at',
        'created_at',
        'updated_at',
        'expires_at',
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = true;

    // Scopes...

    // Functions ...

    // Relations ...
}
