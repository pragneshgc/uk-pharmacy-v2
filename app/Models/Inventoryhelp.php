<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int    $InventoryHelpID
 * @property int    $CreatedBy
 * @property int    $UpdatedBy
 * @property int    $Type
 * @property int    $CreatedAt
 * @property int    $UpdatedAt
 * @property int    $DeletedAt
 * @property string $Title
 * @property string $Category
 * @property string $Description
 * @property string $RelatedPage
 */
class Inventoryhelp extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'InventoryHelp';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'InventoryHelpID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'Title',
        'Category',
        'Description',
        'RelatedPage',
        'CreatedBy',
        'UpdatedBy',
        'Type',
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
        'InventoryHelpID' => 'int',
        'Title' => 'string',
        'Category' => 'string',
        'Description' => 'string',
        'RelatedPage' => 'string',
        'CreatedBy' => 'int',
        'UpdatedBy' => 'int',
        'Type' => 'int',
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
