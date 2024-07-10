<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Print Prescription</title>
    <link href="{{ asset('css/pdf.css') }}" rel="stylesheet" type="text/css" />
</head>

<body id="prescriptionBody">
    @include('prescription.prescription', [
        'prescription' => $prescription,
        'genders' => $genders,
        'doctorTypes' => $doctorTypes,
        'products' => $products,
        'pharmacy' => $pharmacy,
    ])
    @if ($params['warningLabelsCount'] > 0 && $showCautionaryAdvice)
        @include('prescription.cautionary', ['products' => $products])
    @endif
    @if ($params['testKitsCount'] > 0)
        @foreach ($products as $product)
            @if ($product->ProductType == 2)
                @include('prescription.form', [
                    'editable' => false,
                    'prescription' => $prescription,
                    'product' => $product,
                ])
            @endif
        @endforeach
    @endif
    @if (false && $params['eveadamletter'] > 0)
        @include('prescription.letter', [
            'prescription' => $prescription,
            'genders' => $genders,
            'doctorTypes' => $doctorTypes,
            'products' => $products,
            'pharmacy' => $pharmacy,
        ])
    @endif
</body>

</html>
