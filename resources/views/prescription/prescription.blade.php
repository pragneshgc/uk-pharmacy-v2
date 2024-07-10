<div class="wrapper">
    <div class="sidebar">
        <header>
            <img class="logo" src="{{ public_path('/images/prescription-logo.png') }}">
            <div class="company-info">
                <p style="text-transform: capitalize;">
                    {{ $pharmacy->Name }} {{ $pharmacy->Surname }} <br>
                    {{ $pharmacy->Address1 }}, {{ $pharmacy->Address2 }} <br>
                    {{ $pharmacy->Address3 }} <br>
                    {{ $pharmacy->Address4 }} <br>
                    {{ $pharmacy->Postcode }} <br>
                    {{ $pharmacy->CName }}
                </p>
                <p>
                    GPhC Registration Number: {{ $pharmacy->GMCNO }} <br>
                    Company Number: 06790962 <br>
                    Telephone: 01204 559 999
                </p>
            </div>
        </header>
        <section>
            <div class="document-info">
                <h1 id="prescription_or_delivery">
                    @if ($params['otc'] > 0)
                        Prescription
                    @else
                        Delivery note
                    @endif
                </h1>
                <p>
                    <span>Order No: </span> {{ $prescription->PrescriptionID }} <br>
                    <span>Reference No: </span>{{ $prescription->ReferenceNumber }}<br>
                    <span>Date: </span> {{ gmdate('d/m/Y', $prescription->CreatedDate) }}
                </p>
            </div>
            <div class="patient-info">
                <h2>Patient information</h2>
                <h3>Personal Details</h3>
                <p>
                    Name: <span class="capitalize">{{ $prescription->Name }}</span> <span
                        class="capitalize">{{ $prescription->Surname }}</span><br>
                    Gender: {{ $genders[$prescription->Sex] }}<br>
                    DOB: {{ $prescription->DOB }}<br>
                    Age: {{ $prescription->Age }}<br>
                    <!-- Mobile: {{ $prescription->Mobile }}<br>
                    Telephone: {{ $prescription->Telephone }} -->
                </p>

                <h3>Home Address <span style="font-weight: 500">(DO NOT SHIP)</span></h3>
                <p>
                    {{ $prescription->Address1 }}<br>
                    {{ $prescription->Address3 }}<br>
                    {{ $prescription->Postcode }}<br>
                    {{ $prescription->CountryName }}
                </p>

                <h3>Shipping Address</h3>
                <p>
                    {{ $prescription->DAddress1 }}<br>
                    {{ $prescription->DAddress3 }}<br>
                    {{ $prescription->DPostcode }}<br>
                    {{ $prescription->CountryName }}
                </p>

            </div>
        </section>
    </div>

    <div class="content">
        <div class="products-info">
            <h2>Products</h2>
            @foreach ($products as $product)
                <div class="row">
                    <h3>{{ $product->Name }} {{ $product->Quantity * $product->Dosage }} {{ $product->Units }}</h3>
                    @if ($product->Instructions)
                        <h4>Directions:</h4>
                        <p>
                            {{ $product->Instructions }}
                        </p>
                    @endif
                </div>
            @endforeach
        </div>

        <div class="prescriber-info">
            <h2>Prescriber</h2>
            <table style="width: 100%;">
                <tr>
                    <td>
                        <div class="doctor-signature">
                            <!-- THIS IS A BIT MESSY -->
                            @php
                                $url = base64Signature($prescription->DoctorID, $prescription->PrescriptionID);
                            @endphp
                            @if ($url)
                                <img src="{{ $url }}" style="max-width:120px; height:auto">
                                <br>
                            @endif
                            <span class="doctor-name">{{ $prescription->DTitle }} {{ $prescription->DName }}
                                {{ $prescription->DSurname }}</span>

                            <div style="font-size:11px;">
                                @if ($prescription->DoctorType == 1)
                                    General Medical Council
                                @elseif($prescription->DoctorType == 2)
                                    EU
                                @elseif($prescription->DoctorType == 3)
                                    General Pharmaceutical Council
                                @elseif($prescription->DoctorType == 4)
                                    TEST
                                @elseif($prescription->DoctorType == 5)
                                    Irish Medical Council
                                @else
                                @endif
                                Registration Number: {{ $prescription->GMCNO }}
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="doctor-address">
                            <p>
                                {{ $prescription->DoctorAddress1 }} <br>
                                {{ $prescription->DoctorAddress2 }} @if ($prescription->DoctorAddress3 || $prescription->DoctorAddress4)
                                    <br>
                                @endif
                                {{ $prescription->DoctorAddress3 }}{{ $prescription->DoctorAddress4 ? ', ' . $prescription->DoctorAddress4 : '' }}
                                <br>
                                {{ $prescription->DoctorPostCode }} <br>
                                {{ $prescription->DCName }}
                            </p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        @if ($prescription->DNotes)
                            <div class="doctor-url">
                                <span>Check my registration:</span>
                                <a href="{{ $prescription->DNotes }}">{{ $prescription->DNotes }}</a>
                            </div>
                        @endif
                    </td>
                </tr>
            </table>



        </div>
    </div>
</div>
