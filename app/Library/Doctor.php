<?php

namespace App\Library;

use App\Models\Attachment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

/**
 * Doctor methods library
 */
class Doctor
{
    /**
     * Get a paginated list of doctors
     *
     * @param string $q
     * @param string $s
     * @return object
     */
    public function getDoctorsPaginated($q, $s, $o)
    {
        $data = DB::table('Doctor AS d')
            ->selectRaw("d.DoctorID AS 'ID',d.Name AS 'Name', d.Surname AS 'Surname', d.Email AS 'Email', d.Telephone AS 'Telephone'")
            ->selectRaw("d.GMCNO AS 'Registration Number'")
            ->selectRaw("CASE COALESCE(DoctorType, 4) WHEN 1 THEN 'GMC' WHEN 2 THEN 'EU' WHEN 3 THEN 'GPhC' WHEN 5 THEN 'IMC' ELSE 'Test' END AS 'Prescriber Type'")
            ->selectRaw("CASE COALESCE(Status, 0) WHEN 1 THEN 'Active' ELSE 'Inactive' END AS 'Prescriber Status'");

        if ($q != '') {
            $data = $data->where('Name', 'LIKE', '%' . $q . '%')
                ->orWhere('Email', 'LIKE', '%' . $q . '%');
        }

        if ($s != '') {
            $data = $data->orderBy($s, $o);
        }

        return $data;
    }

    /**
     * Set search parameters for doctors
     *
     */
    public function setSearchParameters($f, $request, $data)
    {
        $filters = json_decode($f);
        $strict = json_decode($request->strict);
        $operator = $strict ? '=' : 'LIKE';

        if (!property_exists($filters, 'status')) {
            $data = $data->where('d.Status', 1);
        }

        foreach ($filters as $key => $value) {
            if ($value != '') {
                switch ($key) {
                    case 'name':
                        $data = $data->where('d.Name', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'surname':
                        $data = $data->where('d.Surname', $operator, $strict ? $value : "%$value%");
                        break;
                    case 'status':
                        $data = $data->where('d.Status', '=', $value);
                        break;
                    case 'type':
                        $data = $data->where('d.DoctorType', '=', $value);
                        break;
                    default:
                        break;
                }
            }
        }

        return $data;
    }

    /**
     * Deactivate a doctor with ID
     *
     */
    public function deactivate($id): int
    {
        return DB::table('Doctor')->where('DoctorID', $id)->update([
            'Status' => 2
        ]);
    }

    /**
     * Get a list of doctors
     *
     * @return \Illuminate\Support\Collection
     */
    public function getDoctors()
    {
        return DB::table('Doctor')->get();
    }

    /**
     * Get a doctor with ID
     *
     * @param int $id
     * @return \Illuminate\Support\Collection
     */
    public function getDoctor($id)
    {
        return DB::table('Doctor')->where('DoctorID', $id)->first();
    }

    /**
     * Get the doctor ID by GMCNO number
     *
     * @param string $gmcno
     * @return object
     */
    public function getDoctorGmcno($gmcno)
    {
        return DB::table('Doctor')->where('GMCNO', $gmcno)->first();
    }

    /**
     * Get the doctor ID by title
     *
     */
    public function getDoctorTitle($title): mixed
    {
        return DB::table('Doctor')->whereRaw("CONCAT(Title, ' ', Name, ' ', Surname) = ?", [$title])->value('DoctorID');
    }

    /**
     * Get latest doctor address ID
     *
     * @param int $id
     */
    public function getDoctorAddressID(int $id): mixed
    {
        return DB::table('DoctorAddress')->where('DoctorID', $id)->where('Status', 1)
            ->orderBy('DoctorAddressID', 'DESC')->value('DoctorAddressID');
    }

    /**
     * Get the pharmacy
     * SHOULD BE THE ONLY DOCTOR ENTRY WITH TYPE 0
     * SHOULD BE!!!!!
     */
    public function getPharmacy(): mixed
    {
        return DB::table('Doctor AS d')->select(["d.*", "c.Name AS CName"])
            ->leftJoin('Country AS c', 'c.CountryID', '=', 'd.CountryID')
            ->where('d.DoctorType', 0)->first();
    }

    /**
     * Update a doctor by id
     *
     * @param int $id
     * @param array $input
     * @return int
     */
    public function update($id, $input): int
    {
        DB::table('DoctorAddress')->where('DoctorID', $id)->update([
            'Status' => 0,
        ]);

        DB::table('DoctorAddress')->insert([
            'Title' => $input['Title'],
            'Name' => $input['Name'],
            'Surname' => $input['Surname'],
            'CompanyName' => $input['CompanyName'],
            'Address1' => $input['Address1'],
            'Address2' => $input['Address2'],
            'Address3' => $input['Address3'],
            'Address4' => $input['Address4'],
            'Postcode' => $input['Postcode'],
            'CountryID' => $input['CountryID'],
            'Telephone' => $input['Telephone'],
            'Mobile' => $input['Mobile'],
            'Email' => $input['Email'],
            'Status' => $input['Status'],
            'GMCNO' => $input['GMCNO'],
            'MedicalInsuranceNo' => $input['MedicalInsuranceNo'],
            'DoctorType' => $input['DoctorType'],
            'Notes' => $input['Notes'],
            'DoctorID' => $id,
            'Type' => 1,
            'CreatedDate' => time(),
        ]);

        return DB::table('Doctor')->where('DoctorID', $id)->update($input); // 0 on no changes, 1 on success
    }

    /**
     * Insert a new doctor
     *
     * @param array $input
     * @return int
     */
    public function insert($input): int
    {
        //PC:db transaction can be use here
        $doctorId = DB::table('Doctor')->insertGetId($input);

        DB::table('DoctorAddress')->insert([
            // 0 on no changes, 1 on success
            'Title' => isset($input['Title']) ? $input['Title'] : '',
            'Name' => isset($input['Name']) ? $input['Name'] : '',
            'Surname' => isset($input['Surname']) ? $input['Surname'] : '',
            'CompanyName' => isset($input['CompanyName']) ? $input['CompanyName'] : '',
            'Address1' => isset($input['Address1']) ? $input['Address1'] : '',
            'Address2' => isset($input['Address2']) ? $input['Address2'] : '',
            'Address3' => isset($input['Address3']) ? $input['Address3'] : '',
            'Address4' => isset($input['Address4']) ? $input['Address4'] : '',
            'Postcode' => isset($input['Postcode']) ? $input['Postcode'] : '',
            'CountryID' => isset($input['CountryID']) ? $input['CountryID'] : '',
            'Telephone' => isset($input['Telephone']) ? $input['Telephone'] : '',
            'Mobile' => isset($input['Mobile']) ? $input['Mobile'] : '',
            'Email' => isset($input['Email']) ? $input['Email'] : '',
            'Status' => isset($input['Status']) ? $input['Status'] : '',
            'GMCNO' => isset($input['GMCNO']) ? $input['GMCNO'] : '',
            'MedicalInsuranceNo' => isset($input['MedicalInsuranceNo']) ? $input['MedicalInsuranceNo'] : '',
            'DoctorType' => isset($input['DoctorType']) ? $input['DoctorType'] : '',
            'DoctorID' => $doctorId,
            'Type' => 1,
            'CreatedDate' => time(),
        ]);

        return $doctorId;
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param string $path
     * @return int
     */
    public function insertSignature($id, $path)
    {
        $esaUserID = 0;
        $name = 'SYSTEM(USER NOT RECOGNIZED)';

        if (Auth::check()) {
            $esaUserID = Auth::user()->esa_user_id;
            $esaUserDetails = DB::table('User')->where('UserID', $esaUserID)->first();
            $name = $esaUserDetails->Name . ' ' . $esaUserDetails->Surname;
        }

        return DB::table('Attachment')->insertGetId([
            'UserID' => $esaUserID,
            'ReferenceID' => $id,
            'Name' => $name,
            'Filename' => $path,
            'Type' => 2,
            'Status' => 1,
        ]);
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @param string $path
     * @return int
     */
    public function archiveSignature($id, $path)
    {
        return DB::table('Attachment')->where(['ReferenceID' => $id, 'Status' => 1, 'Type' => 2])->whereNull('DeletedAt')->update([
            'Filename' => $path,
            'Status' => 0,
            'DeletedAt' => \Carbon\Carbon::now(),
        ]);
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @return object|bool
     */
    public function getSignature($id, $prescription)
    {
        $attachment = false;

        if ($prescription) {
            $date = DB::table('Prescription')->where('PrescriptionID', $prescription)->value('CreatedDate');

            $attachment = Attachment::query()
                ->where('ReferenceID', $id)
                ->whereRaw("UNIX_TIMESTAMP(CreatedAt) < ?", [$date])
                ->where('Status', 0)
                ->where('Type', 2)
                ->orderBy('CreatedAt', 'DESC')
                ->first();

            if (!$attachment) {
                $attachment = DB::table('Attachment')->where('ReferenceID', $id)->where('Status', 1)->where('Type', 2)->first();
            }
        } else {
            $attachment = DB::table('Attachment')->where('ReferenceID', $id)->where('Status', 1)->where('Type', 2)->whereNull('DeletedAt')->first();
        }

        if (!empty($attachment)) {
            if (isAzureStorageEnabled()) {
                if (!Storage::disk('azure')->exists("signatures/" . $attachment->Filename)) {
                    return false;
                }
            } else {
                if (!file_exists(storage_path() . "/app/signatures/" . $attachment->Filename)) {
                    return false;
                }
            }
        }

        return $attachment;
    }
}
