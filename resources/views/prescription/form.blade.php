<div class="wrapper__form">
    <div class="wrapper__form--document-info">
        <img src="{{ URL::to('/') }}/logo-kit.png" style="height:auto">
        <h1>Pathology Request Form</h1>
        <br>
        <p>
            <span>Please ensure this form is completed before sending your sample to the laboratory.</span>
        </p>
        <p>
            <span>Enter your details clearly in capital letters. Failure to do so may result in a delay in receiving your test result.</span>
        </p>
    </div>

    <div class="wrapper__form--content">
        <div class="row">
            <h2>Reference:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->ReferenceNumber }}</span>
        </div>
        <div class="row">
            <h2>Surname:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->Surname }}</span>
        </div>
        <div class="row">
            <h2>Forename:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->Name }}</span>
        </div>
        <div class="row">
            <h2>Date of Birth:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->DOB }}</span>
        </div>
        <div class="row">
            <h2>Home Address:</h2>
            <span @if($editable) contenteditable="true" @endif>
                    {{ $prescription->Address1 ? $prescription->Address1.',' : '' }}
                    {{ $prescription->Address2 ? $prescription->Address2.',' : '' }}
                    {{ $prescription->Address3 ? $prescription->Address3 : '' }}
                    {{ $prescription->Address4 ? ','.$prescription->Address4 : '' }}
            </span>
        </div>
        <div class="row">
            <h2>Home Postcode:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->Postcode }}</span>
        </div>
        <div class="row">
            <h2>Phone Number:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $prescription->Telephone }}</span>
        </div>
        <div class="row">
            <h2>Gender:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $genders[$prescription->Sex] }}</span>
        </div>
        <div class="row">
            <h2>Test Required:</h2>
            <span @if($editable) contenteditable="true" @endif>{{ $product->Code }}</span>
        </div>
    </div>

    <div class="wrapper__form--content content-date">
        <div class="row">
            <h2>When did you do your test?</h2>
            <div class="date">
                <span>
                    <span class="label">DD</span>
                </span>
                <span>
                    <span class="label">MM</span>
                </span>
                <span>
                    <span class="label">YY</span>
                </span>
                <span>
                    <span class="label">hh</span>
                </span>
                :
                <span>
                    <span class="label">mm</span>
                </span>
            </div>

            <div class="note">
                <p>Please use corresponding format</p>
            </div>
        </div>
    </div>

    <h3 class="notice" style="text-align: center; font-weight: 700;">This form must be returned with your sample</h3>

    <div class="barcode">
        <img src="{{ URL::to('/') }}/barkod.png" style="height:auto">
    </div>
</div>