<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $PrescriptionHistoryID
 * @property int $PrescriptionID
 * @property int $Status
 * @property int $SubStatus
 * @property int $UpdatedDate
 * @property int $UpdatedBy
 */
class Prescriptionhistory extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'PrescriptionHistory';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PrescriptionHistoryID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'PrescriptionID',
        'Status',
        'SubStatus',
        'UpdatedDate',
        'UpdatedBy'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'PrescriptionHistoryID' => 'int',
        'PrescriptionID' => 'int',
        'Status' => 'int',
        'SubStatus' => 'int',
        'UpdatedDate' => 'int',
        'UpdatedBy' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...

    /**
     * Update Order History
     */
    public static function updateHistory(int $id, int $status, ?int $substatus = NULL, bool $user = true): void
    {
        self::insert([
            'PrescriptionID' => $id,
            'Status' => $status,
            'SubStatus' => $substatus,
            'UpdatedBy' => $user ? Auth::id() : 0,
            'UpdatedDate' => Carbon::now()->timestamp
        ]);
    }

    // Functions ...

    // Relations ...
}
