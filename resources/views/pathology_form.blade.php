<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- saved from url=(0053)http://4ff29e25de36.ngrok.io/prescription/500000/view -->
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Print Prescription</title>

    <link href="https://fonts.googleapis.com/css2?family=Archivo+Narrow:wght@400;700&family=Oswald:wght@400;600&display=swap" rel="stylesheet">


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
            display: -webkit-box;
            display: flex;
            flex-direction: column;
            -webkit-flex-direction: column;
        }



        /* END */

        /* PRINT CSS */
        @page {
            size: A4;
            /* margin: 1mm 2mm 1.5mm 1mm;*/
            /* padding: 40px 40px 44px 24px;*/
            margin: 1.058333333cm 1.058333333cm 1.164166667cm 0.635cm;
        }

        /* END */
    </style>

    <style>
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
        }

        h1 {
            font-size: 38px;
            font-weight: 600;
            line-height: 48px;
            margin-bottom: 10px;
            padding-bottom: 5px;
            padding-top: 35px;
            display: table;
            border-bottom: 1px solid #000000;
            text-transform: uppercase;
        }

        h2 {
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            width: 115px;
        }

        h3 {
            font-size: 26px;
            font-weight: 400;
            margin-top: 25px;
            text-transform: uppercase;
        }

        .wrapper {
            margin: 0 auto;
            /*border: 1px solid red;*/
            width: 210mm;
            height: 297mm;
            /* padding: 40px 40px 44px 24px;*/
            position: relative;
            box-sizing: border-box;
        }

        .document-info {
            margin-bottom: 50px;
            box-sizing: border-box;
            position: relative;
        }

        .document-info img {
            position: absolute;
            right: 0px;
            top: 0px;
            width: 180px;
        }

        .document-info p {
            font-size: 17px;
            line-height: 20px;
        }

        .document-info p span {
            font-weight: 700;
        }

        .content {
            padding: 40px 20px;
            border: 2px solid #000000;
            box-sizing: border-box;
            margin: 0 0 18px 0;
        }

        .content .row {
            display: block;
            padding: 0 8px;
            margin-bottom: 20px;
        }

        .content span {
            border-bottom: 1px solid #000000;
            width: 535px;
            display: inline-block;
            /* height: 10px; */
        }

        .content-date h2 {
            width: 260px;
        }

        .content-date span {
            width: 50px;
            margin: 0px 6px;
            position: relative;
            height: 24px
        }

        .content-date .row {
            margin-bottom: 0;
        }

        .content-date p {
            font-size: 16px;
            line-height: 26px;
        }

        .date {
            display: inline-block;
        }

        .date .label {
            margin: 0;
            border: none;
            position: absolute;
            top: 32px;
            text-align: center;
            font-size: 16px;
            font-family: 'Archivo Narrow', sans-serif;
        }

        .note p {
            display: inline-block;
        }

        .barcode {
            position: absolute;
            bottom: 0px;
            right: 0px;
        }
    </style>
</head>

<body>
    <div class="wrapper">

        <div class="document-info">
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

        <div class="content">
            <div class="row">
                <h2>Reference:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Surname:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Forename:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Date of Birth:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Home Address:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Home Postcode:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Phone Number:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Gender:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
            <div class="row">
                <h2>Test Required:</h2>
                <span @if($editable) contenteditable="true" @endif></span>
            </div>
        </div>

        <div class="content content-date">
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

</body>

</html>