<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $id
 * @property int    $user_id
 * @property int    $created_at
 * @property int    $updated_at
 * @property int    $deleted_at
 * @property string $name
 * @property string $page
 * @property string $ip
 */
class ViewLogCurrent extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ViewLogCurrent';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'ViewLogCurrentID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'UserID',
        'Name',
        'Surname',
        'Page',
        'IP',
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
        'ViewLogCurrentID' => 'int',
        'UserID' => 'int',
        'Name' => 'string',
        'Surname' => 'string',
        'Page' => 'string',
        'IP' => 'string',
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
