<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Print Prescription</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet">

    <style type="text/css">
        @font-face {
            font-family: 'Roboto';
            font-weight: normal;
            font-style: normal;
            src: url('/fonts/Roboto-Regular-webfont.woff') format('woff');
        }

        @font-face {
            font-family: 'Archivo Narrow';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url({{ public_path('/fonts/ArchivoNarrow-Regular.ttf') }}) format('truetype');
        }

        @font-face {
            font-family: 'Archivo Narrow';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url({{ public_path('/fonts/ArchivoNarrow-Bold.ttf') }}) format('truetype');
        }


        /* cyrillic-ext */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/Oswald-Regular.woff') format('woff');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }

        /* cyrillic */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/Oswald-Regular.woff') format('woff');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        /* vietnamese */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/Oswald-Regular.woff') format('woff');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }

        /* latin-ext */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/Oswald-Regular.woff') format('woff');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url('/fonts/Oswald-Regular.woff') format('woff');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* cyrillic-ext */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('/fonts/Oswald-SemiBold.woff') format('woff');
            unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
        }

        /* cyrillic */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('/fonts/Oswald-SemiBold.woff') format('woff');
            unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
        }

        /* vietnamese */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('/fonts/Oswald-SemiBold.woff') format('woff');
            unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
        }

        /* latin-ext */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('/fonts/Oswald-SemiBold.woff') format('woff');
            unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
            font-family: 'Oswald';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url('/fonts/Oswald-SemiBold.woff') format('woff');
            unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
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

        .capitalize {
            text-transform: capitalize;
        }

        .row {
            display: block;
            padding-left: 8px;
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

        @media print {
            body {
                overflow: visible !important;
                display: block;
            }
        }

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
            line-height: 38px;
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
            /* padding: 40px 40px 44px 24px; */
            padding: 24px 24px 24px 24px;
            position: relative;
            box-sizing: border-box;
        }

        .sidebar {
            display: inline-block;
            flex-wrap: nowrap;
            flex-direction: column;
            justify-content: space-between;
            width: 34%;
            box-sizing: border-box;
            vertical-align: top;
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
            line-height: 14px;
            margin-bottom: 8px;
        }

        .wrapper section {
            display: flex;
            flex-direction: column;
            justify-content: flex-end
        }

        .document-info {
            margin-bottom: 0px;
        }

        .document-info p {
            font-size: 16px;
            line-height: 16px;
        }

        .document-info p span {
            font-weight: 700;
        }

        .patient-info {
            margin-bottom: 40px;
        }

        .patient-info h2 {
            padding-bottom: 5px;
            border-bottom: 1px solid black;
            display: table;

        }

        .patient-info h3 {
            margin-top: 30px;
            margin-bottom: 12px;
        }

        .patient-info p {
            font-size: 16px;
            line-height: 16px;
        }

        .content {
            display: inline-block;
            width: 57%;
            vertical-align: top;
            border: 1px solid #000000;
            height: 90%;
            padding: 0 20px;
        }

        .products-info {
            position: relative;
            min-height: 700px;
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
            /* padding-right: 26px; */
            /* padding-right: 13px; */
        }

        .products-info h2 {
            text-align: center;
            border-bottom: 1px solid #000000;
            padding-bottom: 16px;
            margin-bottom: 30px;
        }

        .prescriber-info {
            display: inline-block;
            vertical-align: bottom;
            width: 100%;
        }

        .prescriber-info h2 {
            padding: 8px 0 10px 0;
            text-align: center;
            width: 100%;
            border-top: 1px solid #000000;
            border-bottom: 1px solid #000000;
            /* margin-bottom: 34px; */
            margin-bottom: 10px;
        }

        .prescriber-info .wrap {
            display: flex;
            flex-direction: row;
            /* padding-bottom: 10px; */
        }

        .prescriber-info .wrap>div {
            width: 50%;
        }

        .prescriber-info .wrap>div:last-child {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .doctor-signature {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: flex-end;
        }

        .doctor-url a {
            font-family: 'Archivo Narrow', sans-serif;
            font-size: 10px;
        }

        .doctor-url span {
            width: 100%;
            font-family: 'Archivo Narrow', sans-serif;
            font-size: 12px;
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
        .wrapper__cautionary {
            margin: 0 auto;
            width: 210mm;
            height: 297mm;
            position: relative;
            box-sizing: border-box;
            /* padding: 40px 40px 44px 24px; */
            padding: 24px 24px 24px 24px;
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

        /** PATHOLOGY FORM */
        .wrapper__form {
            margin: 0 auto;
            /* padding: 40px 40px 44px 24px; */
            padding: 24px 24px 24px 24px;
            width: 210mm;
            height: 297mm;
            position: relative;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
        }

        .barcode {
            position: absolute;
            bottom: 0px;
            right: 0px;
        }

        .wrapper__form--document-info {
            margin-bottom: 50px;
            box-sizing: border-box;
            position: relative;
        }

        .wrapper__form--document-info img {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 180px;
        }

        .wrapper__form--document-info p {
            font-size: 17px;
            line-height: 20px;
        }

        .wrapper__form--document-info p span {
            font-weight: 700;
        }

        .wrapper__form--content {
            padding: 40px 20px;
            border: 2px solid #000000;
            box-sizing: border-box;
            margin: 0 0 18px 0;
            display: flex;
            flex-direction: column;
        }

        .wrapper__form--content .row {
            display: block;
            padding: 0 8px;
            margin-bottom: 20px;
        }

        .wrapper__form--content span {
            border-bottom: 1px solid #000000;
            width: 535px;
            display: inline-block;
            text-transform: capitalize;
        }



        .notice {
            font-size: 26px;
            font-weight: 400;
            margin-top: 25px;
            text-transform: uppercase;
        }

        /*EVEADAMLETTER*/

        .wrapper__eveadam {
            /* font-family: arial, sans-serif; */
            /* font-family: Roboto, arial, sans-serif; */
            font-family: Oswald;
            color: rgb(24, 60, 88);
            font-size: 12px;
            position: relative;
            margin: 0 auto;
            /*border: 1px solid red;*/
            width: 210mm;
            height: 297mm;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: space-between;
            /* padding: 40px 40px 44px 24px; */
            padding: 24px 24px 24px 24px;
            box-sizing: border-box;
        }

        .wrapper__eveadam h1 {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 2em;
            font-weight: 700;
        }

        .wrapper__eveadam h2 {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 2em;
            font-weight: 700;
        }

        .wrapper__eveadam h3 {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 1.375em;
            font-weight: 700;
        }

        .wrapper__eveadam p {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 1.25em;
            padding-bottom: 1em;
        }

        .wrapper__eveadam ul {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 1.35em;
        }

        .wrapper__eveadam li {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 1.35em;
        }

        .wrapper__eveadam .info span {
            /* font-family: Roboto, arial, sans-serif; */
            font-size: 1.25em;
            display: inline-block;
        }

        .wrapper__eveadam .info {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 60px;
            margin-top: 100px;
        }

        .wrapper__eveadam .account-information {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .wrapper__eveadam .account-information span {
            display: block;
            padding-bottom: 5px;
        }

        .wrapper__eveadam .invoice-information {
            flex-grow: 1;
            text-align: right;
        }

        .wrapper__eveadam .invoice-information h3 {
            display: inline-block;
        }

        .wrapper__eveadam .summary {
            width: 100%;
        }

        .wrapper__eveadam .summary h2 {
            text-align: center;
        }

        .wrapper__eveadam .summary-table {
            border-collapse: collapse;
            width: 100%;
        }

        .wrapper__eveadam .summary-table thead {
            background: #EBE9F2;
            text-align: left;
        }

        .wrapper__eveadam .summary-table tbody {
            vertical-align: top;
        }

        .wrapper__eveadam .summary-table,
        .wrapper__eveadam .summary-table td,
        .wrapper__eveadam .summary-table th {
            border: 2px solid #CED6DC;
        }

        .wrapper__eveadam .summary-table th {
            font-size: 1.125em;
        }

        .wrapper__eveadam .summary-table td,
        .wrapper__eveadam .summary-table th {
            padding: 10px;
        }

        .wrapper__eveadam .summary-table .heading {
            font-size: 1.125em;
        }

        .wrapper__eveadam .summary-table .details:first-child {
            padding-top: 0px;
        }

        .wrapper__eveadam .summary-table .details {
            padding: 5px 0px;
            display: block;
            font-size: 1em;
        }

        .wrapper__eveadam .totals {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin-bottom: 60px;
        }

        .wrapper__eveadam .separator-heading {
            border-bottom: 2px solid #CED6DC;
            padding: 10px 0px;
            margin-bottom: 0;
        }

        .wrapper__eveadam .totals-table {
            align-self: flex-end;
            border: 2px solid #CED6DC;
            border-top: none;
            font-size: 1.125em;
        }

        .wrapper__eveadam .totals-table td {
            border-bottom: 2px solid #CED6DC;
            padding: 10px;
            min-width: 200px;
        }

        .wrapper__eveadam .totals-table tr:last-child td {
            border-bottom: none;
        }

        .wrapper__eveadam .totals-table tr:last-child td {
            color: #CED6DC !important;
        }

        .wrapper__eveadam .totals-title {
            font-weight: 700;
            border-right: 2px solid #CED6DC;
        }

        .wrapper__eveadam .letter-icon {
            width: 20px;
            position: absolute;
            left: 60px;
            top: 60px;
            z-index: 99;
        }

        .wrapper__eveadam .letter-icon svg {
            fill: rgb(24, 60, 88);
        }

        #header-image {
            height: 140px;
            overflow: hidden;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-image: url('/images/HeaderNew.png');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position-x: center;
            background-position: center;
        }

        #footer-image {
            height: 110px;
            overflow: hidden;
            width: 100%;
            position: absolute;
            bottom: 0;
            left: 0;
            background-image: url('/images/FooterNew.png');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position-x: center;
            background-position: center;
            position: running(footer-image);
        }
    </style>
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
