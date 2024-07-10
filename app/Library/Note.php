<?php

namespace App\Library;

use Carbon\Carbon;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class Note
{
    private $order;

    public function __construct()
    {
        $this->order = new Order;
    }

    /**
     * Get notes related to the prescription
     *
     * @return Collection
     */
    public function getNotesByPrescription($id): Collection
    {
        return DB::table('Note')->where('PrescriptionID', $id)->get();
    }

    /**
     * Get notes related to the customer by PrescriptionID
     *
     */
    public function getCustomerNotesByPrescription($id): mixed
    {
        $userRole = Auth::user()->role;

        $customer = $this->order->getCustomerDetails($id);

        if (!$customer) {
            return false;
        }

        if ($customer->Name == '' || $customer->Surname == '') {
            return [];
        }

        $referenceNumber = DB::table('Prescription')->where('PrescriptionID', $id)->value('ReferenceNumber');

        DB::table('Note')->where('Pending', 1)->where('ReferenceNumber', $referenceNumber)->update([
            'Pending' => 0
        ]);

        $preimport = DB::table('Note AS n')->select(['n.*', 'iu.name', 'iu.surname'])
            ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
            ->where('n.ReferenceNumber', $referenceNumber)->whereNull('n.DeletedAt');

        $mainQuery = DB::table('Note AS n')
            ->select(['n.*', 'iu.name', 'iu.surname'])
            ->leftJoin('Prescription AS p', 'p.PrescriptionID', '=', 'n.PrescriptionID')
            ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
            ->whereRaw("
        (p.Name LIKE CONCAT('%', ?, '%') OR p.Surname LIKE CONCAT('%', ?, '%'))
        AND p.DOB = ?
        AND p.Sex = ?
        ", [$customer->Name, $customer->Surname, $customer->DOB, $customer->Sex])
            ->whereNull('n.DeletedAt')->whereNull('n.EditedAt');

        //get deleted notes only for admins
        if ($userRole >= 50) {
            $preimport = $preimport->selectRaw("'' AS DeletedName, '' AS DeletedSurname, '' AS EditedName, '' AS EditedSurname");
            $mainQuery = $mainQuery->selectRaw("'' AS DeletedName, '' AS DeletedSurname, '' AS EditedName, '' AS EditedSurname");

            $deletedQuery = DB::table('Note AS n')
                ->select([
                    'n.*',
                    'iu.name',
                    'iu.surname',
                    'iu2.name AS DeletedName',
                    'iu2.surname AS DeletedSurname',
                    'iu3.name AS EditedName',
                    'iu3.surname AS EditedSurname'
                ])
                ->leftJoin('Prescription AS p', 'p.PrescriptionID', '=', 'n.PrescriptionID')
                ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
                ->leftJoin('PharmacyUser as iu2', 'iu2.id', '=', 'n.DeletedByUserID')
                ->leftJoin('PharmacyUser as iu3', 'iu3.id', '=', 'n.EditedByUserID')
                ->whereRaw("
            (p.Name LIKE CONCAT('%', ?, '%') OR p.Surname LIKE CONCAT('%', ?, '%'))
            AND p.DOB = ?
            AND p.Sex = ?
            ", [$customer->Name, $customer->Surname, $customer->DOB, $customer->Sex])
                ->whereRaw("(n.DeletedAt IS NOT NULL OR n.EditedAt IS NOT NULL)");
            // ->whereNotNull('n.DeletedAt');

            $preImportDeletedQuery = DB::table('Note AS n')
                ->select([
                    'n.*',
                    'iu.name',
                    'iu.surname',
                    'iu2.name AS DeletedName',
                    'iu2.surname AS DeletedSurname',
                    'iu3.name AS EditedName',
                    'iu3.surname AS EditedSurname'
                ])
                ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
                ->leftJoin('PharmacyUser as iu2', 'iu2.id', '=', 'n.DeletedByUserID')
                ->leftJoin('PharmacyUser as iu3', 'iu3.id', '=', 'n.EditedByUserID')
                ->where('n.ReferenceNumber', $referenceNumber)
                ->whereRaw("(n.DeletedAt IS NOT NULL OR n.EditedAt IS NOT NULL)");
            // ->whereNotNull('n.DeletedAt');

            $mainQuery = $mainQuery->union($deletedQuery)->union($preImportDeletedQuery);
        }

        return $mainQuery->union($preimport) //this is to check if there were any notifications for previous imports
            ->orderBy('NoteID', 'DESC')
            ->orderBy('CreatedAt', 'DESC')
            ->orderBy('DeletedAt', 'DESC')
            ->orderBy('EditedAt', 'DESC')
            ->get();
    }

    /**
     * Get any notes that were added preimport
     *
     * @param int $id
     * @return Collection
     */
    public function getPreimportNotes(int $id): Collection
    {
        $referenceNumber = DB::table('Prescription')->where('PrescriptionID', $id)->value('ReferenceNumber');

        return DB::table('Note AS n')->select(['n.*', 'iu.name', 'iu.surname'])->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
            ->where('n.ReferenceNumber', $referenceNumber)->get();
    }

    public function getCustomerCorrespondence($id)
    {
        $customer = $this->order->getCustomerDetails($id);

        if (!$customer) {
            return false;
        }

        return DB::table('Correspondence')->selectRaw("Correspondence.*, FROM_UNIXTIME(Correspondence.CreatedDate, '%Y-%m-%d %H:%i:%s') AS Date, User.Name, User.Surname")
            // ->where('PrescriptionID', $id)
            ->whereRaw("PrescriptionID IN
        (SELECT PrescriptionID FROM Prescription p WHERE
            (p.Name LIKE CONCAT('%', ?, '%') OR p.Surname LIKE CONCAT('%', ?, '%'))
            AND p.DOB = ?
            AND p.Sex = ?
        )
        ", [$customer->Name, $customer->Surname, $customer->DOB, $customer->Sex])
            ->leftJoin('User', 'User.UserID', '=', 'Correspondence.UserID')
            ->get();
    }

    /**
     * Create a note entry
     *
     * @param array $data
     * @return bool
     */
    public function create($data)
    {
        return DB::table('Note')->insert($data);
    }

    /**
     * Update a note entry
     *
     * @param array $data
     * @return int
     */
    public function update($id, $data)
    {
        $oldData = DB::table('Note')->where('NoteID', $id)->first();

        if ($oldData->ParentNoteID == NULL) {
            $oldData->ParentNoteID = $oldData->NoteID;
        }

        unset($oldData->NoteID);

        $newNoteId = DB::table('Note')->insertGetId((array) $oldData);

        DB::table('Note')->where('NoteID', $id)->update([
            'EditedAt' => Carbon::now(),
            'EditedByUserID' => Auth::user()->id,
            'ParentNoteID' => $oldData->ParentNoteID
        ]);

        $data['ParentNoteID'] = $oldData->ParentNoteID;

        return DB::table('Note')->where('NoteID', $newNoteId)->update($data);
    }

    /**
     * Delete a note entry
     *
     * @param int $id
     * @return int
     */
    public function delete($id)
    {
        return DB::table('Note')->where('NoteID', $id)->update([
            'DeletedAt' => Carbon::now(),
            'DeletedByUserID' => Auth::user()->id
        ]);
    }

    /**
     * Get pending prescription notes list
     *
     * @return \Illuminate\Support\Collection
     */
    public function getPending()
    {
        $notes = DB::table('Note as n')->select(['n.*', 'iu.name', 'iu.surname'])
            ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'n.UserID')
            ->whereNull('n.PrescriptionID')
            ->where('n.ReferenceNumber', '!=', "0")
            ->where('n.Alert', '=', 1)
            ->whereNull('n.DeletedAt')
            ->whereNull('n.EditedAt')
            ->where('n.Pending', 1)
            ->get();

        foreach ($notes as $key => $value) {
            $timestamp = Carbon::parse($notes[$key]->CreatedAt)->timestamp;
            $notes[$key]->CreatedAt = convertTimestamp($timestamp, 'd/m/Y H:i:s');
            $notes[$key]->Note = html_entity_decode($notes[$key]->Note);
        }

        return $notes;
    }
}
