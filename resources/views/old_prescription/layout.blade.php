<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
    <title>Print Prescription</title>
    <META http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        H2 {
            page-break-before: always
        }

        body {
            padding: 30px;
            font-family: px Verdana, Arial, Helvetica, sans-ser;
        }

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
            line-height: 1.5;
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

        body {
            font-family: 'Roboto', sans-serif;
            background: transparent;
            color: #000000;
            font-size: 1.15em;
            display: flex;
            flex-direction: column;
        }

        .half {
            width: 50%;
            display: inline-block;
            float: left;
        }

        .text-right {
            text-align: right;
        }

        .text-center {
            text-align: center;
        }

        .left {
            float: left;
        }

        .right {
            float: right;
        }

        .fake-h1 {
            font-size: 32px;
            font-weight: 700;
        }

        .dark-bg {
            /*background: #eeeeee;*/
            background: #f7f7f7;
        }

        label {
            font-size: 18px;
            font-weight: 700;
        }

        i.fa.circle {
            padding: 5px 10px 10px;
            color: #fff;
            background: #000;
            border-radius: 50%;
        }

        #container {
            width: 98%;
            max-width: 960px;
            min-width: 960px;
            margin: 0% auto;
            border: 1px solid #acacac;
            margin-bottom: 0;
            flex-grow: 1;
        }

        .footer-container {
            width: 98%;
            max-width: 960px;
            min-width: 960px;
            margin: 1% auto;
            border: 1px solid #acacac;
            border-top: 0;
            margin-top: auto;
        }

        header {
            padding: 15px 25px;
            border-bottom: 1px solid #acacac;
        }

        header:after {
            content: " ";
            display: table;
            clear: both;
        }

        footer {
            padding: 15px 25px;
            font-size: 12px;
        }

        footer:after {
            content: " ";
            display: table;
            clear: both;
        }

        .doctor-detail,
        .doctor-address {
            max-width: 700px;
            display: inline-block;
        }

        .doctor-name {
            font-family: 'Bad Script', cursive;
            font-size: 20px;

        }

        .doctor-address {}

        .gphc-number {
            font-size: 20px;
            font-weight: 700;
            display: block;
        }

        .logo img {
            width: 300px;
            max-width: 300px;
            height: auto;
        }

        .row {
            display: block;
            padding: 8px 25px;
            border-bottom: 1px solid #acacac;
        }

        .row:after {
            content: " ";
            display: table;
            width: 100%;
            clear: both;
        }

        .row:last-child {
            border-bottom: 0;
        }

        .company-address {}

        .shipping-type {
            border: 1px solid #acacac;
            border-right: 0;
            font-size: 36pt;
            font-weight: 700;
            padding: 0 40px;
            ;
            margin-right: -25px;
        }

        .gp-detail {
            font-size: 26px;
            font-weight: 300;
        }

        .gp-detail .bold {
            font-weight: 400;
        }

        .gp-detail .fa {
            margin-right: 10px;
        }

        .title {
            font-size: 24px;
            font-weight: 700;
        }

        .title-small {
            font-size: 16px;
            font-weight: 700;
        }

        .title-with-text {
            margin-bottom: 10px;
        }

        .shipping-address-block {
            border: 1px solid #acacac;
            border-radius: 5px;
            padding: 10px;
        }

        .shipping-address-block i.fa {
            font-size: 24px;
            padding: 10px 11px 10px 10px;
            margin-right: 10px;
        }

        .product-row {
            display: block;
            width: auto;
            margin-bottom: 5px;
        }

        .instructions-block {
            border: 0.5px solid #acacac;
            display: block;
            width: auto;
            margin: 0 auto;
            padding: 5px 10px;
            border-radius: 3px;
        }

        .instructions-block em {
            font-style: italic;
        }

        /* END */

        /* Overright style */
        .padding20_top-bottom {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        /* END */

        /* PRINT CSS */
        @page {
            size: A4;
            margin: 0mm 0mm 0mm 0mm;
        }

        /* END */
        @media print {
            body {
                overflow: visible !important;
                display: block;

            }

            html,
            body {
                margin: 0;
                padding: 0;
            }

        }

        .page {
            page-break-after: always;
            width: 210mm;
            height: 297mm;
        }

        footer {
            justify-content: flex-end;
            display: flex;
            padding: 0;
        }

        footer form h3 {
            text-align: center;
            border-bottom: 1px solid #acacac;
            margin-bottom: 5px;
            font-size: 1.2rem
        }

        footer .signature {
            text-align: center;
            padding: 0px 0px;
        }

        footer .details {
            border-right: 1px solid #acacac;
            padding: 15px 25px;
        }

        footer .input-wrapper {

            max-width: 275px;
            min-width: 276px;
            display: inline;
            flex-grow: 1;
            text-align: left;
            padding: 15px 25px;
            /*align-self: center;*/
        }

        footer .input-wrapper .input-group label {
            font-weight: 600;
            font-family: Roboto, sans-serif;
            font-size: 13px;
        }

        footer .input-wrapper .input-group input {
            margin: 0;
            vertical-align: middle;
            transform: scale(1.3)
        }

        footer .checked-by-box {
            height: 55px;
            margin-top: 20px;
            border: 1px solid #acacac;
            position: relative;
        }

        footer .checked-by-box span {
            font-size: 12px;
            position: absolute;
            left: 5px;
            font-weight: 700;
            text-transform: uppercase;
        }
    </style>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Bad+Script" rel="stylesheet">
</head>

<body style="height:99%">
    <div id="container">
        <header class="dark-bg">
            <div class="half">
                <span class="fake-h1">{{ $pharmacy->Name }} {{ $pharmacy->Surname }}</span>
                <span class="gphc-number">(GPhC Registration Number: {{ $pharmacy->GMCNO }})</span>
            </div>
            <div class="half" style="position:relative;">
                @if($prescription->ClientID == 51)
                <span style="position:absolute; right:0;">
                    <center><br />On behalf of<br /></center>
                    <img src="/images/eveadam_logo.png" style="width:200px; height:auto">
                </span>
                @endif
            </div>
        </header>
        <div class="row">
            <div class="company-address left">

                {{ $pharmacy->Address1 }},


                {{ $pharmacy->Address2 }},


                {{ $pharmacy->Address3 }},


                {{ $pharmacy->Address4 }},


                {{ $pharmacy->Postcode }},


                {{ $pharmacy->CName }}

                <br>
                <label>Telephone:</label> 01204 559 999<br>
                <label>Company No:</label> 06790962 (England and Wales)
            </div>

        </div>
        <div class="row dark-bg gp-detail">
            <i class="fa fa-user-md circle"></i><span class="bold">{{ $prescription->DTitle }} {{ $prescription->DName }} {{ $prescription->DSurname }}</span>
            (
            @if($prescription->DoctorType == 1) 
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
            Registration Number {{ $prescription->GMCNO}}
            )

            @if($prescription->DNotes)
            <p style='position:relative; font-size: 12pt;text-align:left; '>
                <br>
                Check my registration:
                <br>
                <a href="{{ $prescription->DNotes }}">
                    {{ $prescription->DNotes }}
                </a>
            </p>
            @endif
        </div>
        <div class="row text-center">
            <span class="title">
                <div>@if($params['otc'] > 0) Prescription @else Delivery note @endif</div>
            </span>
        </div>
        <div class="row">
            <div class="half">
                <label>Name: </label>{{ $prescription->Name }}<br>
                <label>Gender: </label>{{ $genders[$prescription->Sex] }}<br>
                <label>DOB: </label>{{ $prescription->DOB }}<br>
                <label>Age: </label>{{ $prescription->Age }}<br>

                <label>Mobile: </label>{{ $prescription->Mobile }}<br>


                <label>Telephone: </label>{{ $prescription->Telephone }}

            </div>
            <div class="half text-right">
                <label>Order No: </label>{{ $prescription->PrescriptionID }} <br>
                <label>Reference No: </label>{{ $prescription->ReferenceNumber }}<br>
                <label>Date: </label>{{ gmdate("d/m/Y", $prescription->CreatedDate) }}
            </div>
        </div>
        <div id='a' class="a" style="position:absolute;left:25vw;">
            <p style='position:relative; color: rgba(149, 149, 149, .3);font-size: 25pt;text-align:center; -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);'>THIS PRESCRIPTION IS A COPY.<br>DO NOT RE-USE</p>
            <br><br>
            <p style='position:relative; color: rgba(149, 149, 149, .3);font-size: 65pt;text-align:right; -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);right:center;text-align:right;'>COPY </p>
        </div>
        <div class="row padding20_top-bottom">
            <div class="half">
                <div class="dark-bg shipping-address-block">
                    <div class="title-with-text">
                        <i class="fa fa-truck circle left"></i>
                        <label>Shipping Address</label><br>
                        <span>(Ship to this address)</span>
                    </div>
                    {{ $prescription->DAddress1 }}<br>
                    @if($prescription->DAddress2){{ $prescription->DAddress2 }}<br>@endif
                    {{ $prescription->DAddress3 }}<br>
                    @if($prescription->DAddress4){{ $prescription->DAddress4 }}<br>@endif
                    {{ $prescription->DPostcode }}<br>
                    {{ $prescription->CountryName }}<br>
                </div>
            </div>
            <div class="half text-right">
                <div class="title-with-text">
                    <label>Home Address</label><br>
                    <span>(***DO NOT SHIP TO THIS ADDRESS***)</span>
                </div>
                {{ $prescription->Address1 }}<br>
                @if($prescription->Address2){{ $prescription->Address2 }}<br>@endif
                {{ $prescription->Address3 }}<br>
                @if($prescription->Address4){{ $prescription->Address4 }}<br>@endif
                {{ $prescription->Postcode }}<br>
                {{ $prescription->CountryName }}<br>
            </div>
        </div>
        <div class="row dark-bg">
            <span class="title-small">PRODUCTS</span>
        </div>

        @foreach($products as $product)
        <div class="row">
            <span class="product-row"><label>{{ $product->Name }} {{ $product->Quantity * $product->Dosage }} {{ $product->Units }}</label></span>

            @if($product->Instructions)
            <span class="instructions-block">
                <em><b>DIRECTIONS:</b></em>
                <p style="font-size: 13pt;">{{ $product->Instructions }}</p>
            </span>
            @endif
        </div>
        @endforeach
    </div> <!-- end container -->
    <div class="footer-container">
        <footer>


            <div class="details">
                <center><img src="{{ URL::to('/') }}/doctors/{{$prescription->DoctorID}}/signature?prescription={{$prescription->PrescriptionID}}" style="max-width:735px; height:auto"></center>
                <br>
                <span class="doctor-detail">
                    <span class="doctor-name">{{ $prescription->DTitle }} {{ $prescription->DName }} {{ $prescription->DSurname }}</span>
                    <span> - (Registration Number {{ $prescription->GMCNO}})</span>
                    <span class="doctor-address">

                        {{ $prescription->DoctorAddress1 }}


                        ,{{ $prescription->DoctorAddress2 }}


                        ,{{ $prescription->DoctorAddress3 }}


                        ,{{ $prescription->DoctorAddress4 }}


                        ,{{ $prescription->DoctorPostCode }}


                        ,{{ $prescription->DCName }}

                    </span>
            </div>
        </footer>
    </div>
    <div class="cautionary-advice">
        <H2>&nbsp;</H2>
        <span style="font-size: 12.5pt;">
            <div id="container">
                <div class="row text-center">
                    <span class="title">CAUTIONARY ADVICE</span>
                    <p style="font-size: 12pt; font-weight: bold;">Please read all of this information carefully before you start taking this medicine. It contains important information.</p>
                </div>

                @foreach($products as $product)
                    @if(!$product->WarningLabels->isEmpty() || !$product->AdditionalInformation->isEmpty())
                        <br>
                        <div class="row dark-bg">
                            <span class="title-small">{{ $product->Name }} {{ $product->Dosage }} {{ $product->Units }}</label></span>
                        </div>
                        <div class="row">
                            <span class="instructions-block">
                                <em><b>DIRECTIONS:</b></em>
                                <p>{{ $product->Instructions }}</p>
                            </span>
                        </div>

                        @if(!$product->AdditionalInformation->isEmpty())
                        <br>
                        <div class="row">
                            <span class="instructions-block">
                                <em><b>ADDITIONAL INFORMATION:</b></em>
                                <p>
                                <ul style="position: relative; left: 15px;">
                                    <label>
                                        <i><b>[EN]</i></b></br>
                                    </label>

                                    <li>
                                        If you are having trouble using the Saxenda pen, please refer to the Q&A section on the website for more information.
                                    </li>


                                    <label>
                                        <i><b>[FR]</i></b></br>
                                    </label>

                                    <li>
                                        Si vous rencontrez des difficultés à utiliser le stylo Saxenda, veuillez vous référer à la rubrique FAQ du site internet.
                                    </li>
                                </ul>
                                </p>
                            </span>
                        </div>
                        @endif
                    @endif
                @endforeach
            </div> <!-- end container -->

            <br>
            <center><i style="font-size: 14pt; font-weight: bold;">Please also refer to the Patient Information Leaflet</i></center>
        </span>
        <br>


    </div>
</body>
<script>

</script>

</html>