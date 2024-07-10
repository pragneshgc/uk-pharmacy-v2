<?php

namespace App\Http\Controllers;

use App\Library\Note;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    private $note;

    public function __construct()
    {
        $this->note = new Note();
    }

    /**
     * Get prescription notes via PrescriptionID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function prescription(int $id): JsonResponse
    {
        $notes = $this->note->getCustomerNotesByPrescription($id);
        $correspondence = $this->note->getCustomerCorrespondence($id);

        $data = [
            'critical' => [],
            'information' => [],
            'other' => [],
            'correspondence' => [],
            'alerts' => []
        ];

        $data['correspondence'] = $correspondence;

        if (!$notes) {
            return $this->sendError(['Prescription notes not found or invalid prescription'], ['Prescription notes not found']);
        }

        $history = [];

        foreach ($notes as $key => $value) {
            //format the dates to keep in line with rest of ESA
            $date = new \DateTime($notes[$key]->CreatedAt);
            $notes[$key]->CreatedAt = $date->format('d/m/Y H:i:s');

            if ($notes[$key]->DeletedAt != NULL) {
                $date = new \DateTime($notes[$key]->DeletedAt);
                $notes[$key]->DeletedAt = $date->format('d/m/Y H:i:s');
            }

            if ($notes[$key]->EditedAt != NULL) {
                $date = new \DateTime($notes[$key]->EditedAt);
                $notes[$key]->EditedAt = $date->format('d/m/Y H:i:s');
            }

            if ($notes[$key]->OrderSpecific == 1 && ($notes[$key]->PrescriptionID != $id && ($notes[$key]->ReferenceNumber == "0" || $notes[$key]->ReferenceNumber == NULL)) && $notes[$key]->Type == 3)
                continue;

            if ($notes[$key]->Alert == 1) {
                array_push($data['alerts'], $notes[$key]);
            }

            if ($notes[$key]->ParentNoteID != NULL && $notes[$key]->EditedAt != NULL) {
                array_push($history, $notes[$key]);
            }
        }

        //quite ugly this
        foreach ($notes as $key => $value) {
            if ($notes[$key]->ParentNoteID != NULL && $notes[$key]->EditedAt == NULL) {
                $notes[$key]->Edits = [];
                foreach ($history as $historyNote) {
                    if ($historyNote->ParentNoteID == $notes[$key]->ParentNoteID) {
                        array_push($notes[$key]->Edits, $historyNote);
                    }
                }
            } else if ($notes[$key]->ParentNoteID != NULL && $notes[$key]->EditedAt != NULL) {
                unset($notes[$key]);
                continue;
            } else {
                $notes[$key]->Edits = [];
            }

            if ($notes[$key]->PrescriptionID != $id && ($notes[$key]->ReferenceNumber == "0" || $notes[$key]->ReferenceNumber == NULL) && $notes[$key]->Type == 3) {
                unset($notes[$key]);
                continue;
            }

            switch ($notes[$key]->Type) {
                case '1':
                    if (!empty($notes[$key]->Note)) {
                        $notes[$key]->Note = html_entity_decode($notes[$key]->Note);
                    }
                    array_push($data['critical'], $notes[$key]);
                    break;
                case '2':
                    if (!empty($notes[$key]->Note)) {
                        $notes[$key]->Note = html_entity_decode($notes[$key]->Note);
                    }
                    array_push($data['information'], $notes[$key]);
                    break;
                case '3':
                    if (!empty($notes[$key]->Note)) {
                        $notes[$key]->Note = html_entity_decode($notes[$key]->Note);
                    }
                    array_push($data['other'], $notes[$key]);
                    break;
                default:
                    break;
            }
        }

        return $this->sendResponse($data);
    }

    /**
     * Get customer notes via PrescriptionID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function customer(int $id): JsonResponse
    {
        $notes = $this->note->getCustomerNotesByPrescription($id);

        $data = [
            'critical' => [],
            'information' => [],
            'other' => []
        ];

        foreach ($notes as $key => $value) {
            switch ($notes[$key]->Type) {
                case '1':
                    array_push($data['critical'], $notes[$key]);
                    break;
                case '2':
                    array_push($data['information'], $notes[$key]);
                    break;
                case '3':
                    array_push($data['other'], $notes[$key]);
                    break;
                default:
                    break;
            }
        }

        return $this->sendResponse($data);
    }

    /**
     * Create a note
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $input = $request->input();
        $prescriptionId = isset($input['PrescriptionID']) ? $input['PrescriptionID'] : NULL;
        $referenceNumber = isset($input['ReferenceNumber']) ? $input['ReferenceNumber'] : NULL;
        $subscription = isset($input['Subscription']) ? $input['Subscription'] : NULL;
        $alert = isset($input['Alert']) && (bool) $input['Alert'] ? 1 : 0;
        $orderSpecific = isset($input['OrderSpecific']) && (bool) $input['OrderSpecific'] ? 1 : 0;
        $pending = 0;

        if ($prescriptionId == NULL && $referenceNumber != NULL && $alert == 1 && $orderSpecific == 1) {
            $pending = 1;
        }

        if ($subscription) {
            $referenceNumber = '';
            $pending = 1;
        }

        $data = [
            'PrescriptionID' => $prescriptionId,
            'ReferenceNumber' => $referenceNumber,
            'Subscription' => $subscription,
            'Type' => $input['Type'],
            'UserID' => Auth::user()->id,
            'Note' => $input['Note'],
            'Alert' => $alert,
            'OrderSpecific' => $orderSpecific,
            'Pending' => $pending
        ];

        return $this->sendResponse($this->note->create($data), 'Created');
    }


    /**
     * Update a note
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $input = $request->input();

        $data = [
            'Type' => $input['Type'],
            'UserID' => Auth::user()->id,
            'ReferenceNumber' => $input['ReferenceNumber'] ? $input['ReferenceNumber'] : NULL,
            'Note' => $input['Note'],
            'Alert' => isset($input['Alert']) && (bool) $input['Alert'] ? 1 : 0,
            'OrderSpecific' => isset($input['OrderSpecific']) && (bool) $input['OrderSpecific'] ? 1 : 0,
            'ParentNoteID' => $input['NoteID']
        ];

        return $this->sendResponse($this->note->update($input['NoteID'], $data), 'Updated');
    }

    /**
     * Delete a note
     *
     * @return JsonResponse
     */
    public function delete($id): JsonResponse
    {
        $data = $this->note->delete($id);

        return $this->sendResponse($data, 'Note deleted');
    }

    /**
     * Get all alerts for orders that are pending
     *
     */
    public function pendingAlerts(): JsonResponse
    {
        return $this->sendResponse($this->note->getPending(), 'Pending alerts');
    }
}
