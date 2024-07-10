<?php

namespace App\Models;

use App\Enums\OrderStatus;
use App\Helpers\Generic;
use App\Helpers\Constants;
use App\Services\OrderProcessingService;
use Illuminate\Http\Request;
use App\Exceptions\OrderException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

/**
 * @property int    $PrescriptionID
 * @property int    $DoctorID
 * @property int    $ClientID
 * @property int    $CountryCode
 * @property int    $DCountryCode
 * @property int    $PaymentMethod
 * @property int    $Exemption
 * @property int    $CreatedDate
 * @property int    $Status
 * @property int    $SubStatus
 * @property int    $JVM
 * @property int    $PaymentStatus
 * @property int    $UpdatedDate
 * @property int    $UserID
 * @property int    $SaturdayDelivery
 * @property int    $UPSAccessPointAddress
 * @property int    $TrackingSent
 * @property int    $DoctorAddressID
 * @property int    $CustomerID
 * @property string $GMCNO
 * @property string $DoctorName
 * @property string $ReferenceNumber
 * @property string $Email
 * @property string $GUID
 * @property string $TokenID
 * @property string $Title
 * @property string $Name
 * @property string $Middlename
 * @property string $Surname
 * @property string $DOB
 * @property string $Sex
 * @property string $Address1
 * @property string $Address2
 * @property string $Address3
 * @property string $Address4
 * @property string $Postcode
 * @property string $DAddress1
 * @property string $DAddress2
 * @property string $DAddress3
 * @property string $DAddress4
 * @property string $DPostcode
 * @property string $Telephone
 * @property string $Mobile
 * @property string $Notes
 * @property string $Repeats
 * @property string $TrackingCode
 * @property string $AirwayBillNumber
 * @property string $DeliveryID
 * @property string $Message
 * @property string $CSNotes
 * @property string $Company
 * @property float  $BMI
 */
class Prescription extends Model
{
    use HasFactory;
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'Prescription';

    /**
     * The primary key for the model.
     *
     * @var string
     */
    protected $primaryKey = 'PrescriptionID';

    /**
     * Attributes that should be mass-assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'DoctorID',
        'GMCNO',
        'DoctorName',
        'ClientID',
        'ReferenceNumber',
        'Email',
        'GUID',
        'TokenID',
        'Title',
        'Name',
        'Middlename',
        'Surname',
        'DOB',
        'Sex',
        'BMI',
        'Condition',
        'Frequency',
        'Address1',
        'Address2',
        'Address3',
        'Address4',
        'Postcode',
        'CountryCode',
        'DAddress1',
        'DAddress2',
        'DAddress3',
        'DAddress4',
        'DPostcode',
        'DCountryCode',
        'Telephone',
        'Mobile',
        'PaymentMethod',
        'Exemption',
        'CreatedDate',
        'Notes',
        'Repeats',
        'Status',
        'SubStatus',
        'JVM',
        'TrackingCode',
        'AirwayBillNumber',
        'PaymentStatus',
        'DeliveryID',
        'UpdatedDate',
        'UserID',
        'Message',
        'SaturdayDelivery',
        'UPSAccessPointAddress',
        'TrackingSent',
        'CSNotes',
        'DoctorAddressID',
        'Company',
        'CustomerID'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array<string,string>
     */
    protected $casts = [
        'PrescriptionID' => 'int',
        'DoctorID' => 'int',
        'GMCNO' => 'string',
        'DoctorName' => 'string',
        'ClientID' => 'int',
        'ReferenceNumber' => 'string',
        'Email' => 'string',
        'GUID' => 'string',
        'TokenID' => 'string',
        'Title' => 'string',
        'Name' => 'string',
        'Middlename' => 'string',
        'Surname' => 'string',
        'DOB' => 'string',
        'Sex' => 'string',
        'BMI' => 'float',
        'Address1' => 'string',
        'Address2' => 'string',
        'Address3' => 'string',
        'Address4' => 'string',
        'Postcode' => 'string',
        'CountryCode' => 'int',
        'DAddress1' => 'string',
        'DAddress2' => 'string',
        'DAddress3' => 'string',
        'DAddress4' => 'string',
        'DPostcode' => 'string',
        'DCountryCode' => 'int',
        'Telephone' => 'string',
        'Mobile' => 'string',
        'PaymentMethod' => 'int',
        'Exemption' => 'int',
        'CreatedDate' => 'int',
        'Notes' => 'string',
        'Repeats' => 'string',
        //'Status' => 'int',
        'SubStatus' => 'int',
        'JVM' => 'int',
        'TrackingCode' => 'string',
        'AirwayBillNumber' => 'string',
        'PaymentStatus' => 'int',
        'DeliveryID' => 'string',
        'UpdatedDate' => 'int',
        'UserID' => 'int',
        'Message' => 'string',
        'SaturdayDelivery' => 'int',
        'UPSAccessPointAddress' => 'int',
        'TrackingSent' => 'int',
        'CSNotes' => 'string',
        'DoctorAddressID' => 'int',
        'Company' => 'string',
        'CustomerID' => 'int'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var boolean
     */
    public $timestamps = false;

    // Scopes...
    public function scopeStatus(Builder $query, int $status): void
    {
        $query->where('status', $status);
    }

    public function scopeSubstatus(Builder $query, int $status): void
    {
        $query->where('SubStatus', $status);
    }

    // Functions ...
    public static function countTodaysDeliveries(int $countryCode, int $deliveryId): int
    {
        return self::where(['DCountryCode' => $countryCode, 'DeliveryID' => $deliveryId])
            ->where('CreatedDate', '>', strtotime("today"))
            ->where('CreatedDate', '<', (strtotime("tomorrow") - 1))
            ->count();
    }

    public static function orderExists(string $referenceNumber): self|null
    {
        return self::select('PrescriptionID', 'Status')
            ->where('ReferenceNumber', $referenceNumber)
            ->first();
    }

    /**
     * Update Order Status
     * @param int $id
     * @param int $status
     * @param int|null $substatus
     * @param bool $wipeTracking default false
     * @return int
     */
    public static function updateStatus(int $id, int $status, ?int $substatus = NULL, bool $wipeTracking = false): int
    {
        $update = [
            'Status' => $status,
            'SubStatus' => $substatus,
            'UpdatedDate' => time()
        ];

        if ($status == 7) { 
            //check if prescription file type xml or json
            $file_type = PrescriptionFile::where('prescription_id', $id)->pluck('file_type')->first();
            if($file_type) {
                if($file_type == "json") {
                    $data = getEmailPhoneFromJSON($id);
                } else {
                    $data = getEmailPhoneFromXML($id);
                }
            } else {
                $data = getEmailPhoneFromXML($id);
            }

            $update['Email'] = $data['email'];
            $update['Telephone'] = $data['Telephone'] ? $data['Telephone'] : $data['Mobile'];
            $update['Mobile'] = $data['Mobile'];
        }

        if (in_array($status, [8, 3, 6, 12])) {
            $update['Email'] = '';
            $update['Telephone'] = '';
            $update['Mobile'] = '';
        }

        if ($wipeTracking) {
            $update['TrackingCode'] = '';
        }

        Prescriptionhistory::updateHistory($id, $status, $substatus);

        return self::where('PrescriptionID', $id)->update($update);
    }

    public static function updateMessage(int $id, string $message): int
    {
        return self::where('PrescriptionID', $id)
            ->update([
                'Message' => $message
            ]);
    }

    // Relations ...
}
