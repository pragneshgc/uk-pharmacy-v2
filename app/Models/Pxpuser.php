<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $id
 * @property int    $esa_user_id
 * @property int    $role
 * @property int    $created_at
 * @property int    $deleted_at
 * @property int    $updated_at
 * @property int    $last_login_at
 * @property string $name
 * @property string $surname
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property string $code
 * @property string $token
 */
class Pxpuser extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'PxpUser';

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
        'esa_user_id',
        'role',
        'name',
        'surname',
        'email',
        'password',
        'remember_token',
        'code',
        'token',
        'created_at',
        'deleted_at',
        'updated_at',
        'last_login_at'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'id' => 'int',
        'esa_user_id' => 'int',
        'role' => 'int',
        'name' => 'string',
        'surname' => 'string',
        'email' => 'string',
        'password' => 'string',
        'remember_token' => 'string',
        'code' => 'string',
        'token' => 'string',
        'created_at' => 'timestamp',
        'deleted_at' => 'timestamp',
        'updated_at' => 'timestamp',
        'last_login_at' => 'timestamp'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array<string>
     */
    protected $dates = [
        'created_at',
        'deleted_at',
        'updated_at',
        'last_login_at'
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
