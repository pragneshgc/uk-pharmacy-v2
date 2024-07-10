<div class="wrapper__cautionary">
    <div class="wrapper__cautionary--document-info">
        <h1>Cautionary Advice</h1>
        <p>
            <span>Please read all of this information carefully before you start taking this medicine. It containes
                important inpormation.</span>
        </p>
        <p>
            <span>Please also refer to the Patient Information Leaflet</span>
        </p>
    </div>

    <div class="wrapper__cautionary--content" style="width: 88%;">
        <div class="wrapper__cautionary--products-info">
            <h2>Products</h2>
            @foreach ($products as $product)
                @if (!$product->WarningLabels->isEmpty() || !$product->AdditionalInformation->isEmpty())
                    <div class="row">
                        <h3>{{ $product->Name }} {{ $product->Dosage }} {{ $product->Units }}</h3>
                        <h4>Directions:</h4>
                        <p>
                            {{ $product->Instructions }}
                        </p>
                        @if (!$product->WarningLabels->isEmpty())
                            <h4 style="font-size: 1.5rem; font-weight: 700;">Cautionary Advice:</h4>
                            @php $country = false; @endphp
                            @foreach ($product->WarningLabels as $label)
                                @if ($country != $label->CodeName2)
                                    @php $country = $label->CodeName2 @endphp
                                    <div style="font-size: 14px; margin-bottom: .3rem;"><b>[{{ $label->CodeName2 }}]</b>
                                    </div>
                                @endif
                                <p style="margin-bottom: .25rem; font-size: 1.1rem;">
                                    <span>-</span> {{ $label->Description }}
                                </p>
                            @endforeach
                        @endif

                        @if (!$product->AdditionalInformation->isEmpty())
                            <h4>Additional Information:</h4>
                            @php $country = false; @endphp
                            @foreach ($product->AdditionalInformation as $label)
                                @if ($country != $label->CodeName2)
                                    @php $country = $label->CodeName2 @endphp
                                    <div style="font-size: 14px; margin-bottom: .3rem;"><b>[{{ $label->CodeName2 }}]</b>
                                    </div>
                                @endif
                                <p style="margin-bottom: .25rem;">
                                    <span>-</span> {{ $label->Description }}
                                </p>
                            @endforeach
                        @endif
                    </div>
                @endif
            @endforeach
        </div>
    </div>
</div>
