<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $id
 * @property int    $esa_user_id
 * @property int    $role
 * @property int    $inventory_role
 * @property int    $shipping_role
 * @property int    $created_at
 * @property int    $deleted_at
 * @property int    $updated_at
 * @property int    $last_login_at
 * @property string $default_app
 * @property string $name
 * @property string $surname
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property string $code
 * @property string $token
 * @property string $two_factor_secret
 * @property string $viewing
 */
class Pharmacyuser extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'PharmacyUser';

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
        'inventory_role',
        'shipping_role',
        'default_app',
        'name',
        'surname',
        'email',
        'password',
        'remember_token',
        'code',
        'token',
        'two_factor_secret',
        'viewing',
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
        'inventory_role' => 'int',
        'shipping_role' => 'int',
        'default_app' => 'string',
        'name' => 'string',
        'surname' => 'string',
        'email' => 'string',
        'password' => 'string',
        'remember_token' => 'string',
        'code' => 'string',
        'token' => 'string',
        'two_factor_secret' => 'string',
        'viewing' => 'string',
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
