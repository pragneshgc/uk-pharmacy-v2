<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDoctorRequest;
use App\Library\Doctor as DoctorLib;
use App\Models\Doctor;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;

class DoctorController extends Controller
{
    private $doctor;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->doctor = new DoctorLib();
    }

    /**
     * Get a list of all the doctors
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $data = $this->doctor->getDoctorsPaginated($this->q, $this->s, $this->o);
        $data = $this->doctor->setSearchParameters($this->f, $request, $data)
            ->paginate($this->l);

        foreach ($data as $k => $d) {
            $src = base64Signature($d->ID, null);
            if (!empty($src)) {
                $data[$k]->signature = "<img src='" . $src . "' style='width: 80px;' alt='$d->Name $d->Surname'/>";
            } else {
                $data[$k]->signature = '';
            }
        }

        return $this->sendResponse($data);
    }

    /**
     * Deactivate a doctor
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deactivate($id)
    {
        $doctor = Doctor::findOrFail($id);
        return $this->sendResponse($doctor->update(['Status' => 2]));
    }

    /**
     * Get details of a doctor with ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function doctor($id)
    {
        return $this->sendResponse(Doctor::find($id));
    }

    /**
     * Update a doctor record by ID
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        $data = $request->validate([
            'Title' => 'nullable|max:255',
            'Name' => 'required|max:255',
            'Surname' => 'required|max:255',
            'CompanyName' => 'nullable|max:255',
            'Address1' => 'required|max:255',
            'Address2' => 'nullable|max:255',
            'Address3' => 'nullable|max:255',
            'Address4' => 'nullable|max:255',
            'Postcode' => 'required|max:255',
            'CountryID' => 'required',
            'Telephone' => 'nullable',
            'Mobile' => 'nullable',
            'Email' => 'nullable',
            'Status' => 'required',
            'Notes' => 'nullable',
            'GMCNO' => 'required',
            'MedicalInsuranceNo' => 'nullable',
            'Username' => 'nullable',
            'Password' => 'nullable',
            'DoctorType' => 'required',
        ]);

        $doctor = Doctor::findOrFail($id);
        return $this->sendResponse($doctor->update($data));
    }

    /**
     * Insert a new doctor
     *
     * @param CreateDoctorRequest $request
     * @return JsonResponse
     */
    public function insert(CreateDoctorRequest $request)
    {
        $data = $request->validated();
        return $this->sendResponse($this->doctor->insert($data));
    }

    /**
     * Get a doctors signature
     *
     * @param int $id
     */
    public function signature($id, Request $request)
    {
        $path = '';
        $extension = 'png';

        $prescriptionID = $request->prescription ? $request->prescription : false;

        $signature = $this->doctor->getSignature($id, $prescriptionID);

        if (isAzureStorageEnabled()) {
            $file = "/signatures/$signature->Filename";
            if (Storage::disk('azure')->exists($file)) {
                $url = Storage::disk('azure')->url($file);
                return URLToBase64($url);
            }
        }

        if ($signature) {
            $path = Storage::path("/signatures/$signature->Filename");
            $pathInfo = pathinfo($path);
            $extension = $pathInfo['extension'];
        } else {
            if (file_exists(storage_path() . "/app/signatures/DOC-$id.png")) {
                $path = Storage::path("/signatures/DOC-$id.png");
            } else {
                $path = Storage::path("/signatures/DOC-$id.jpg");
                $extension = 'jpg';
            }
        }

        $header = "image/$extension";

        try {
            $img = file_get_contents($path);
        } catch (\Throwable $th) {
            $img = '';
        }

        return response($img)->header('Content-type', $header);
    }

    /**
     * Upload prescriber signature
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function uploadSignature($id, Request $request)
    {
        if ($request->hasFile('image')) {
            if ($request->file('image')->isValid()) {
                $request->validate([
                    'name' => 'string|max:40',
                    'image' => 'mimes:jpeg,png|max:4096',
                ]);

                $extension = $request->image->extension();
                $path = 'DOC-' . $id . "." . $extension;
                $movePath = 'DOC-' . $id . "-" . time() . "." . $extension;

                $this->doctor->archiveSignature($id, $movePath);

                if (isAzureStorageEnabled()) {
                    if (Storage::disk('azure')->exists('signatures/DOC-' . $id . "." . $extension)) {
                        Storage::disk('azure')->move('signatures/' . $path, 'signatures/' . $movePath);
                    }
                } else {
                    if (file_exists(storage_path() . '/app/signatures/DOC-' . $id . "." . $extension)) {
                        Storage::move('signatures/' . $path, 'signatures/' . $movePath);
                    }
                }

                $this->doctor->insertSignature($id, $path);
                if (isAzureStorageEnabled()) {
                    $newPath = $request->image->storeAs('signatures', $path, 'azure');
                } else {
                    $newPath = $request->image->storeAs('signatures', $path);
                }

                return $this->sendResponse($newPath);
            }
        }

        abort(500, 'Could not upload image :(');
    }
}
