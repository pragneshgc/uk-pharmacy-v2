<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateClientRequest extends FormRequest
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
            'Name' => 'nullable|max:255',
            'Middlename' => 'nullable',
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
            'CreditLimit' => 'required',
            'IP' => 'required',
            //'Type' => 'required',
            'Status' => 'required',
            'Notes' => 'nullable',
            'CompanyNumber' => 'nullable',
            'GPHCNO' => 'nullable',
            'ReturnURL' => 'nullable',
            'Username' => 'required',
            'Password' => 'required',
            //'APIKey' => 'required',
            'ITName' => 'required',
            'ITSurname' => 'nullable',
            'ITEmail' => 'required',
            'TradingName' => 'required',
            'AdditionalComment' => 'nullable',
            'ReturnUsername' => 'nullable',
            'ReturnPassword' => 'nullable',
            'VAT' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'CountryID' => 'The country id field is required.',
            'IP' => 'The ip field is required.',
            'ITName' => 'The it name field is required.',
            'ITEmail' => 'The it email field is required.',
            'VAT' => 'The vat field is required.'
        ];
    }
}