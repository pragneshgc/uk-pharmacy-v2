<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- saved from url=(0053)http://4ff29e25de36.ngrok.io/prescription/500000/view -->
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Print Prescription</title>

    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;700&family=Oswald:wght@400;600&display=swap" rel="stylesheet">

    <!-- <script src="//code.jquery.com/jquery-1.11.1.min.js"></script> -->

    <style type="text/css">
        /* --------------------------------------------------------------
   reset.css
   * Resets default browser CSS.
-------------------------------------------------------------- */

        html {
            margin: 0;
            padding: 0;
            border: 0;
        }

        body,
        div,
        span,
        object,
        iframe,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        blockquote,
        pre,
        a,
        abbr,
        acronym,
        address,
        code,
        del,
        dfn,
        em,
        img,
        q,
        dl,
        dt,
        dd,
        ol,
        ul,
        li,
        fieldset,
        form,
        label,
        legend,
        table,
        caption,
        tbody,
        tfoot,
        thead,
        tr,
        th,
        td,
        article,
        aside,
        dialog,
        figure,
        footer,
        header,
        hgroup,
        nav,
        section {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
        }

        /* This helps to make newer HTML5 elements behave like DIVs in older browers */
        article,
        aside,
        details,
        figcaption,
        figure,
        dialog,
        footer,
        header,
        hgroup,
        menu,
        nav,
        section {
            display: block;
        }

        /* Line-height should always be unitless! */
        body {
            background: white;
        }

        /* Tables still need 'cellspacing="0"' in the markup. */
        table {
            border-collapse: separate;
            border-spacing: 0;
        }

        /* float:none prevents the span-x classes from breaking table-cell display */
        caption,
        th,
        td {
            text-align: left;
            font-weight: normal;
            float: none !important;
        }

        table,
        th,
        td {
            vertical-align: middle;
        }

        /* Remove possible quote marks (") from <q>, <blockquote>. */
        blockquote:before,
        blockquote:after,
        q:before,
        q:after {
            content: '';
        }

        blockquote,
        q {
            quotes: """";
        }

        /* Remove annoying border on linked images. */
        a img {
            border: none;
        }

        /* Remember to define your own focus styles! */
        :focus {
            outline: 0;
        }

        html {
            height: 100%;
        }

        /* --------------------------------------------------------------
   reset.css
   * Resets default browser CSS.
-------------------------------------------------------------- */

        body {
            font-family: 'Archivo Narrow', sans-serif;
            font-family: 'Oswald', sans-serif;
            background: transparent;
            color: #000000;
            font-size: 1.15em;
            display: flex;
            flex-direction: column;
        }

        #container {
            /* width: 98%;
            max-width: 960px;
            min-width: 960px;
            margin: 1% auto;
            border: 1px solid #acacac;
            margin-bottom: 0;
            flex-grow: 1;*/
        }

        .row {
            display: block;
            padding-left: 8px;
            margin-bottom: 22px;
        }

        .row:last-child {
            border-bottom: 0;
        }

        /* END */

        /* PRINT CSS */
        @page {
            size: A4;
            /* margin: 1mm 2mm 1.5mm 1mm;*/
            /* padding: 40px 40px 44px 24px;*/
            /* margin: 1.058333333cm 1.058333333cm 1.164166667cm 0.635cm; */
            margin: 0 1.058333333cm 0 0.635cm;
            margin: 0;
        }

        /* END */


        h2 {
            page-break-before: always
        }

        body {}

        .infoBox {
            float: left;
            width: 100%;
            padding: 20px;
            position: relative;
            background: #fff;
            border-width: 1px;
            border-style: solid;
            text-align: center;
            font-size: 15px;
        }

        .infoBox.warning {
            font-weight: 700 !important;
            border-color: #d291007d;
            border-width: 3px;
            background: #f4ff7da8;
            font-size: 18px;
        }
    </style>


    <style>
        @media print {
            body {
                overflow: visible !important;
                display: block;
            }
        }
    </style>

    <style>
        p {
            font-family: 'Archivo Narrow', sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5 {
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
        }

        h1 {
            font-size: 38px;
            font-weight: 600;
            line-height: 48px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #000000;
            display: table;
        }

        h2 {
            font-size: 19px;
            font-weight: 600;
        }

        h3 {
            font-size: 16px;
            font-weight: 600;
        }

        h4 {
            font-size: 14px;
            font-weight: 400;
        }

        .wrapper {
            margin: 0 auto;
            /*border: 1px solid red;*/
            width: 210mm;
            height: 297mm;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-between;
            padding: 40px 40px 44px 24px;
            position: relative;
            box-sizing: border-box;
        }

        .wrapper:before {
            /*  display: block;
            position: absolute;
            left:0px;
            top: 0px;
            background: url('final.png');
            background-repeat: no-repeat;
            background-size: contain;
            width: 100%;
            height: 100%;
            content: " ";
            z-index: -10;*/
        }

        .sidebar {
            display: flex;
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 35%;
            box-sizing: border-box;
        }

        .logo {
            margin-bottom: 10px;
            margin-top: 20px;
            width: 174px;
            height: auto;
        }

        .company-info {
            margin-bottom: 40px;
        }

        .company-info p {
            font-size: 14px;
            line-height: 18px;
            margin-bottom: 8px;
        }

        .wrapper section {
            display: flex;
            flex-direction: column;
            justify-content: flex-end
        }

        .document-info {
            margin-bottom: 80px;
        }

        .document-info p {
            font-size: 16px;
            line-height: 20px;
        }

        .document-info p span {
            font-weight: 700;
        }

        .patient-info {}

        .patient-info h2 {
            padding-bottom: 5px;
            border-bottom: 1px solid black;
            display: table;
            line-height: 29px;

        }

        .patient-info h3 {
            margin-top: 30px;
            margin-bottom: 12px;
        }

        .patient-info p {
            font-size: 16px;
            line-height: 20px;
        }

        .content {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: 64.5%;
            height: 100%;
            padding: 14px 20px;
            border: 2px solid #000000;
            box-sizing: border-box;
        }

        .products-info {
            position: relative;
        }

        .products-info:before {
            position: absolute;
            display: block;
            content: "COPY";
            font-family: Arial, Helvetica, sans-serif;
            font-weight: bold;
            color: #efefef;
            font-size: 130px;
            z-index: -1;
            transform: rotate(-45deg);
            top: 160px;
            left: 45px;
        }

        .products-info h3 {
            margin-bottom: 4px;
        }

        .products-info h4 {
            margin-bottom: 4px;
        }

        .products-info p {
            font-size: 16px;
            line-height: 18px;
            padding-right: 26px;
        }

        .products-info h2 {
            text-align: center;
            border-bottom: 1px solid #000000;
            padding-bottom: 16px;
            margin-bottom: 30px;
        }

        .prescriber-info {}

        .prescriber-info h2 {
            padding: 8px 0 10px 0;
            text-align: center;
            width: 100%;
            border-top: 1px solid #000000;
            border-bottom: 1px solid #000000;
            margin-bottom: 34px;
        }

        .prescriber-info .wrap {
            display: flex;
            flex-direction: row;
            padding-bottom: 10px;
        }

        .prescriber-info .wrap>div {
            width: 50%;
        }

        .doctor-signature {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: flex-end;
        }

        .doctor-name {
            font-family: 'Oswald', sans-serif;
            font-size: 15px;
        }

        .doctor-address {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: flex-end;
        }

        .doctor-address p {
            font-size: 14px;
            line-height: 18px;
        }

        /*CAUTIONARY ADVICE*/
        .wrapper__cautionary{
            margin: 0 auto;
            width: 210mm;
            height: 297mm;
            position: relative;
            box-sizing: border-box;
            padding: 40px 40px 44px 24px;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: flex-start;
        }

        .sidebar {
            box-sizing: border-box;
        }

        .wrapper__cautionary--document-info {
            margin-bottom: 50px;
        }

        .wrapper__cautionary--document-info p {
            font-size: 16px;
            line-height: 20px;
        }

        .wrapper__cautionary--document-info p span {
            font-weight: 700;
        }

        .wrapper__cautionary--content {
            padding: 14px 20px;
            border: 2px solid #000000;
            box-sizing: border-box;
        }

        .wrapper__cautionary--products-info {
            position: relative;
        }

        .wrapper__cautionary--products-info h3 {
            margin-bottom: 4px;
        }

        .wrapper__cautionary--products-info h4 {
            margin-bottom: 4px;
        }

        .wrapper__cautionary--products-info p {
            font-size: 16px;
            line-height: 18px;
            padding-right: 26px;
            margin-bottom: 22px;
        }

        .wrapper__cautionary--products-info h2 {
            text-align: center;
            border-bottom: 1px solid #000000;
            padding-bottom: 16px;
            margin-bottom: 30px;
        }
    </style>
</head>

<body>
    <div class="wrapper">
        <div class="sidebar">
            <header>
                <img class="logo" src="{{ URL::to('/') }}/images/prescription-logo.png">
                <div class="company-info">
                    <p>
                        {{ $pharmacy->Name }} {{ $pharmacy->Surname }} <br>
                        {{ $pharmacy->Address1 }} <br>
                        {{ $pharmacy->Address2 }} <br>
                        {{ $pharmacy->Address3 }},{{ $pharmacy->Address4 }} <br>
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
                    <h1 id="prescription_or_delivery">Delivery note</h1>
                    <p>
                        <span>Order No: </span> {{ $prescription->PrescriptionID }} <br>
                        <span>Reference No: </span>{{ $prescription->ReferenceNumber }}<br>
                        <span>Date: </span> {{ gmdate("d/m/Y H:i", $prescription->UpdatedDate) }}
                    </p>
                </div>
                <div class="patient-info">
                    <h2>Patient information</h2>
                    <h3>Personal Details</h3>
                    <p>
                        Name: {{ $prescription->Name }} {{ $prescription->Surname }}<br>
                        Gender: {{ $genders[$prescription->Sex] }}<br>
                        DOB: {{ $prescription->DOB }}<br>
                        Age: {{ $prescription->Age }}<br>
                        Mobile: {{ $prescription->Mobile }}<br>
                        Telephone: {{ $prescription->Telephone }}
                    </p>

                    <h3>Home Address</h3>
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
                @foreach($products as $product)
                <div class="row">
                    <h3>{{ $product->Name }} {{ $product->Quantity * $product->Dosage }} {{ $product->Units }}</h3>
                    <h4>Directions:</h4>
                    <p>
                        {{ $product->Instructions }}
                    </p>
                </div>
                @endforeach
            </div>

            <div class="prescriber-info">
                <h2>Prescriber</h2>
                <div class="wrap">
                    <div class="doctor-signature">
                        <!-- THIS IS A BIT MESSY -->
                        <img src="{{ URL::to('/') }}/doctors/{{$prescription->DoctorID}}/signature" style="max-width:165px; height:auto">
                        <br>
                        <span class="doctor-name">{{ $prescription->DTitle }} {{ $prescription->DName }} {{ $prescription->DSurname }}</span>
                    </div>

                    <div class="doctor-address">
                        <p>
                            Registration Number {{ $prescription->GMCNO}} <br>
                            {{ $prescription->DoctorAddress1 }} <br>
                            {{ $prescription->DoctorAddress2 }} <br>
                            {{ $prescription->DoctorAddress3 }},{{ $prescription->DoctorAddress4 }} <br>
                            {{ $prescription->DoctorPostCode }} <br>
                            {{ $prescription->DCName }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>

</html>