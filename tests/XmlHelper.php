<?php

namespace Tests;

use SimpleXMLElement;
use App\Models\Doctor;
use App\Helpers\Generic;
use App\Models\Productcode;
use Illuminate\Support\Arr;
use Illuminate\Foundation\Testing\WithFaker;

class XmlHelper
{
    use WithFaker;

    public function orderData(array $overrideKeys = [], array $without = [])
    {
        $refNo = fake()->regexify("GB-[0-9]{6}-01");

        $products = Productcode::select('Code', 'Name', 'Quantity', 'Units')
            ->where('Type', 1)
            ->where('Status', 1)
            ->get()
            ->toArray();
        $randomProduct = fake()->randomElement($products);

        $doctors = Doctor::select('Title', 'Name', 'Surname', 'GMCNO')
            ->where('Status', 1)
            ->whereNot('DoctorType', 4)
            ->get()
            ->toArray();
        $randomDoctor = fake()->randomElement($doctors);

        $arr = [
            "MessageID" => "9c701b08-490f-4865-9174-cfd8be8b194a",
            "Version" => "V1.0",
            "Date" => date('YmdHis'),
            "SenderID" => "51",
            "AccountID" => "2",
            "PatientDetail" => [
                "Patient" => [
                    "PatientId" => [
                        "ReferenceNumber" => $refNo,
                        "UserId" => fake()->regexify("[0-9]{6}"),
                    ],
                    "PatientName" => [
                        "FirstName" => fake()->firstName(),
                        "Surname" => fake()->lastName(),
                        "MiddleName" => "",
                        "Title" => fake()->title(),
                    ],
                    "DOB" => "28/02/2000",
                    "Sex" => "1",
                    "BMI" => "8.79",
                    "HomeAddress" => [
                        "CountryCode" => "GBR",
                        "PostCode" => fake()->postcode(),
                        "AddressLine1" => fake()->streetName(),
                        "AddressLine2" => fake()->streetAddress(),
                        "AddressLine3" => fake()->city(),
                        "AddressLine4" => fake()->countryCode(),
                    ],
                    "SaturdayDelivery" => "N",
                    "DeliveryAddress" => [
                        "CountryCode" => "GBR",
                        "PostCode" => fake()->postcode(),
                        "AddressLine1" => fake()->streetName(),
                        "AddressLine2" => fake()->streetAddress(),
                        "AddressLine3" => fake()->city(),
                        "AddressLine4" => fake()->countryCode(),
                    ],
                    "UPSAccessPointDelivery" => "N",
                    "Notes" => "",
                    "Telephone" => fake()->phoneNumber(),
                    "Mobile" => fake()->phoneNumber(),
                    "Email" => fake()->userName() . '@yopmail.com',
                ],
                "FamilyDoctor" => [
                    "Organisation" => '',
                    "Title" => '',
                    "FirstName" => '',
                    "MiddleName" => '',
                    "Surname" => '',
                    "AddressLine1" => '',
                    "AddressLine2" => '',
                    "AddressLine3" => '',
                    "AddressLine4" => '',
                    "PostCode" => '',
                    "CountryCode" => '',
                ],
                "OrderId" => bin2hex(date('now')),
            ],
            "Prescription" => [
                "Guid" => "63fe07a91417adad096695c2",
                "PrescriptionNotes" => "",
                "CommercialInvoiceValue" => "GBP 17",
                "Prescriber" => [
                    "Doctor" => [
                        "GMCNO" => $randomDoctor['GMCNO'],
                        "DoctorName" => string_join([
                            $randomDoctor['Title'],
                            $randomDoctor['Name'],
                            $randomDoctor['Surname']
                        ]),
                    ],
                ],
                "Product" => [
                    "Guid" => bin2hex(date('now')),
                    "ProductCode" => $randomProduct['Code'],
                    "Description" => $randomProduct['Name'],
                    "ProductQuantity" => [
                        "Quantity" => $randomProduct['Quantity'],
                        "Units" => $randomProduct['Units'],
                        "Dosage" => "1",
                    ],
                    "Instructions" => "Take ONE tablet 1 hour prior to sexual activity. Do not take more than one tablet per day. Do not use any other type of medication for erectile dysfunction within 72 hours of taking Viagra.",
                    "Instructions2" => "",
                ],
                "Questionnaire" => [
                    [
                        "Question" => "Do you have any pre-condition?",
                        "Answer" => "Not Declared",
                    ],
                    [
                        "Question" => "Do you have an allergy?",
                        "Answer" => "Not Declared"
                    ],
                    [
                        "Question" => "Did you undergone any surgery?",
                        "Answer" => "Not Declared"
                    ],
                    [
                        "Question" => "Do you take any medication?",
                        "Answer" => "Not Declared"
                    ],
                    [
                        "Question" => "Do you smoke?",
                        "Answer" => "Not Declared"
                    ],
                    [
                        "Question" => "Do you consume alcohol?",
                        "Answer" => "Not Declared"
                    ],
                    [
                        "Question" => "How often do you get erection problems during sex?",
                        "Answer" => "Most or all of the time",
                    ],
                    [
                        "Question" => "Have you seen a doctor about your erection problems?",
                        "Answer" => "Yes"
                    ],
                    [
                        "Question" => "Which treatment(s) have you used before?",
                        "Answer" => "Viagra or Sildenafil"
                    ],
                    [
                        "Question" => "Which type of treatment are you looking for?",
                        "Answer" => "Tablets or cream"
                    ],
                    [
                        "Question" => "What's your blood pressure?",
                        "Answer" => "Normal (Between 90/60 - 140/90) "
                    ],
                    [
                        "Question" => "Was your blood pressure checked in the last year?",
                        "Answer" => "Yes"
                    ],
                    [
                        "Question" => "Do you have chest pain or tightness?",
                        "Answer" => "No"
                    ],
                    [
                        "Question" => "Do you take angina medicines, nitrates, poppers or recreational drugs?",
                        "Answer" => "No"
                    ],
                    [
                        "Question" => "Do you have, or have you ever had any of the following?",
                        "Answer" => "None of the above"
                    ],
                    [
                        "Question" => "Is there anything else you want to add?",
                        "Answer" => "No"
                    ],
                    [
                        "Question" => "Would you like us to tell your GP about any treatment we give you?",
                        "Answer" => "No"
                    ],
                ],
                "ccCheck" => [
                    "ccNumber" => ''
                ],
                "COD" => ''
            ]
        ];

        if (!empty($without)) {
            foreach ($without as $key => $val) {
                Arr::forget($arr, $val);
            }
        }

        if (!empty($overrideKeys)) {
            $override = Arr::dot($overrideKeys);
            foreach ($override as $key => $val) {
                Arr::set($arr, $key, $val);
            }
        }
        return $arr;
    }

    public function generateOrderXML($overrideKeys = [], $without = [])
    {
        $arr = $this->orderData($overrideKeys, $without);

        return Generic::arrayToXml($arr, new SimpleXMLElement('<ESAPrescription/>'));
    }

    public function generateOrderJSON($overrideKeys = [], $without = [])
    {
        return $this->orderData($overrideKeys, $without);
    }
}
