<div class="wrapper__eveadam">
    <div id="header-image"></div>
    <div class="info">
        <p>
            <span class="capitalize">{{ $prescription->Name }}</span> <span class="capitalize">{{ $prescription->Surname }}</span></br>
            {{ $prescription->Address1 }} {{ $prescription->Address2 }} </br>
            {{ $prescription->Address4 }} {{ $prescription->CountryName }} </br>
            {{ $prescription->Postcode }}
        </p>

        <p>Hey <span class="capitalize">{{ $prescription->Name }}</span>,</p>
        <p>Here's your medication.</p>
        <p>In this package you’ll find:</p>
        <p>
            @foreach($products as $product)<b>{{ $product->Name }} x {{ $product->Quantity * $product->Dosage }} {{ $product->Units }}</b>@endforeach and a patient information leaflet.
        </p>
        <p>
            Our pharmacy team check every order carefully, but if anything above is missing or damaged, please let us know. Your reference number for this order is <b>{{ $prescription->ReferenceNumber }}</b>.
        </p>
        <p>We'll contact you in a few days to check your treatment is working well for you. If you'd rather not hear from us, you can always change the way we communicate with you by logging into your account.</p>
        <p>And if you have any problems, you can contact us to ask questions anytime.</p>
        <p>Very occasionally medicines can cause unwanted side effects. You can read about these in the patient information leaflet enclosed. If you haven't already read this, please take a few moments to - it's important.</p>
        <p>You don't need to do anything else, unless something changes with your health or you start taking new medication. In these cases, please do let us know.</p>
        <p>You can control how your care plan works, whether you want to:</p>
        <p>
            - pause it for a while<br>
            - skip your next delivery<br>
            - stop your plan completely<br>
            - or request an increase in dose or the number of tablets you get when we send your treatment to you.<br>
        </p>
        <p>If you need any help managing your plan, you can call our customer care team on <b>08009 777 888</b>, or email us at <u>customercare@eveadam.co.uk</u> They're available from 9am to 5pm, Monday to Friday.</p>
        <p>Here's to a healthy you.</p>

        <p>
            <img style="max-width:165px; height:auto" src="{{ URL::to('/') }}/doctors/{{$prescription->DoctorID}}/signature?prescription={{$prescription->PrescriptionID}}">
        </p>

        <p>
            {{ $prescription->DTitle }} {{ $prescription->DName }} {{ $prescription->DSurname }} ({{ $doctorTypes[$prescription->DoctorType] }} Reg. No. {{ $prescription->GMCNO}})
        </p>
    </div>

    <div id="footer-image"></div>
</div>
</div>