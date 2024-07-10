<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateDoctorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
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
        ];
    }

    public function messages(): array
    {
        return [
            'CountryID' => 'The country id field is required.',
            'GMCNO' => 'The gmcno field is required.'
        ];
    }
}