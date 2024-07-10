<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Pharmacy Label</title>

    <style type="text/css">
        @page {
            margin: 0px;
            size: 315px 160px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin-left: 3px;
        }

        .product-instructions {
            margin: 0px;
        }

        .product-instructions-spc {
            margin: 0px;
        }

        .instructions-spc {
            font-size: 11px;
            line-height: 9px;
            padding: 0px 0px;
            font-weight: 700;
            margin-top: 0px;
            font-family: 'DeJaVu Sans', sans-serif;
        }

        .warnings-spc {
            font-size: 11px;
            line-height: 9px;
            padding: 0px 0px;
            font-weight: 700;
            overflow: hidden;
            font-family: 'DeJaVu Sans', sans-serif;
        }

        .product-title {
            text-align: center;
            font-weight: 700;
            font-size: 14px;
            margin-top: -4px;
            margin-bottom: 3px;
        }

        .instructions {
            font-size: 11px;
            line-height: 11px;
            padding: 0px 0px;
            font-weight: 700;
            margin-top: 0px;
        }

        .warnings {
            font-size: 11px;
            line-height: 11px;
            padding: 0px 0px;
            font-weight: 700;
            overflow: hidden;
        }

        p {
            margin: 0;
            padding: 0;
        }

        .page-break {
            display: block;
            page-break-before: always;
        }

        #delivery-logo {
            vertical-align: middle;
        }

        .w-100 {
            width: 100%;
        }

        .fs-9 {
            font-size: 9px;
        }

        .h-5 {
            height: 5px;
        }

        .h-10 {
            height: 10px;
        }

        .displayBy {
            border: 2px solid #000;
            font-weight: 700 !important;
            font-size: 6px;
            height: 35px;
            width: 35px;
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
        }

        .checkBy {
            border: 2px solid #000;
            font-weight: 700 !important;
            font-size: 6px;
            height: 35px;
            width: 35px;
            display: inline-block;
            box-sizing: border-box;
            text-align: center;
        }

        #footer {
            position: fixed;
            left: 0;
            right: 0;
            font-size: 0.9em;
            bottom: 0;
            border-top: 0.1pt solid #aaa;
        }

        #footer table {
            width: 100%;
            border-collapse: collapse;
            border: none;
        }

        #footer td {
            padding: 0;
            width: 50%;
        }
    </style>
</head>

<body>
    <main>
        @foreach ($products as $k => $product)
            @for ($i = 1; $i <= $product->Pages; $i++)
                <div style="width: 100%; height: 160px;">
                    <p class="product-title">
                        @php 
                            $prodTitle = $product->Name." ".$product->DisplayedQuantity." ".$product->Units;
                            $prodTitleLength = strlen($prodTitle);
                        @endphp                        
                        {{ $product->Name }} {{ $product->DisplayedQuantity }} {{ $product->Units }}
                    </p>
                    @if($hasSpecialCharacters)
                    <div class="product-instructions-spc">
                        <p class="instructions-spc">{{ $product->Instructions }}</p>
                        @if (count($product->WarningLabels) > 0)
                            <div class="warnings-spc">
                                @foreach ($product->WarningLabels as $label)
                                    {{ $label->Description }}
                                @endforeach
                            </div>
                        @endif
                    </div>
                    @else
                    <div class="product-instructions">
                        <p class="instructions">{{ $product->Instructions }}
                            @if (count($product->WarningLabels) > 0)
                                @foreach ($product->WarningLabels as $label)
                                    {{ $label->Description }}
                                @endforeach
                            @endif
                        </p>
                    </div>
                    @endif
                    <footer
                        @if ($product->InstructionLength <= 325) 
                            style="position: fixed;bottom: 0px;width:100%" 
                        @elseif ($product->InstructionLength >= 326 && $product->InstructionLength <= 345 && $prodTitleLength <= 38) 
                            style="position: fixed;top: 90px; width:100%;" 
                        @elseif ($product->InstructionLength > 630 && $product->InstructionLength < 635) 
                            style="position: relative;top: 90px; width:100%;"     
                        @elseif ($product->InstructionLength >= 670) 
                            style="position: absolute;top: 90px; width:100%;"     
                        @else 
                            @if($product->InstructionLength <= 345 && $prodTitleLength <= 38)                                
                               style="position: fixed;bottom: 0px; width:100%;" 
                            @elseif($product->InstructionLength <= 345 && $prodTitleLength > 38)                                
                               style="position: relative;top: 90px; width:100%;" 
                            @elseif($product->InstructionLength >= 355)
                                style="position: relative;top: 90px; width:100%;"                                 
                            @endif
                        @endif>
                        <table class="w-100" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <p class="h-5"></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px;">
                                    <table class="w-100" cellspacing="0" cellpadding="0"
                                        style="font-size: 11px;font-weight: 700;">
                                        <tr>
                                            <td>
                                                <p style="text-transform:capitalize;">{{ $prescription->Title }}
                                                    {{ $prescription->Name }} {{ $prescription->Surname }}
                                                </p>
                                            </td>
                                            <td style="text-align: right">
                                                <div style="">
                                                    <b style="">
                                                        {{ $i }} of
                                                        {{ $product->Pages + ($product->ExtraPageQuantity > 0 ? 1 : 0) }}
                                                    </b>
                                                    <b>{{ date('d/m/Y') }}</b>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="">
                                            <td colspan="2">
                                                <p class="h-5"></p>
                                            </td>
                                        </tr>
                                        <tr style="vertial-align:middle;">
                                            <td style="vertical-align: top">
                                                <p class="fs-9">Keep away from children</p>
                                                <p class="fs-9">HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2
                                                    2HH,
                                                    UK
                                                    +44(0)1204559999</p>
                                            </td>
                                            <td style="vertial-align:middle; text-align:right; height: 40px;">
                                                <div style="padding-right: 0px; margin-top: 5px;">
                                                    <div class="displayBy">
                                                        <b>DispBy</b>
                                                    </div>
                                                    <div class="checkBy">
                                                        <b>ChkBy</b>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                        </table>
                    </footer>
                </div>
            @endfor            
            @if ($product->ExtraPageQuantity > 0)
                <div style="width: 100%; height: 160px;">
                    <p class="product-title">
                        {{ $product->Name }} {{ $product->ExtraPageQuantity }} {{ $product->Units }}
                    </p>

                    @if($hasSpecialCharacters)
                    <div class="product-instructions-spc">
                        <p class="instructions-spc">{{ $product->Instructions }}</p>
                        @if (count($product->WarningLabels) > 0)
                            <div class="warnings-spc">
                                @foreach ($product->WarningLabels as $label)
                                    {{ $label->Description }}
                                @endforeach
                            </div>
                        @endif
                    </div>
                    @else
                    <div class="product-instructions">
                        <p class="instructions">{{ $product->Instructions }}
                            @if (count($product->WarningLabels) > 0)
                                @foreach ($product->WarningLabels as $label)
                                    {{ $label->Description }}
                                @endforeach
                            @endif
                        </p>
                    </div>
                    @endif

                    <footer
                        @if ($product->InstructionLength <= 325) 
                            style="position: fixed;bottom: 0px;width:100%" 
                        @elseif ($product->InstructionLength >= 326 && $product->InstructionLength <= 345 && $prodTitleLength <= 38) 
                            style="position: fixed;top: 90px; width:100%;" 
                        @elseif ($product->InstructionLength > 630 && $product->InstructionLength < 635) 
                            style="position: relative;top: 90px; width:100%;"     
                        @elseif ($product->InstructionLength >= 670) 
                            style="position: absolute;top: 90px; width:100%;"       
                        @else 
                            @if($product->InstructionLength <= 345 && $prodTitleLength <= 38)                                
                               style="position: fixed;bottom: 0px; width:100%;" 
                            @elseif($product->InstructionLength <= 345 && $prodTitleLength > 38)                                
                               style="position: relative;top: 90px; width:100%;" 
                            @elseif($product->InstructionLength >= 355)
                                style="position: relative;top: 90px; width:100%;"
                            @endif
                        @endif>
                        <table class="w-100" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>
                                    <p class="h-5"></p>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px;">
                                    <table class="w-100" cellspacing="0" cellpadding="0"
                                        style="font-size: 11px;font-weight: 700;">
                                        <tr>
                                            <td>
                                                <p style="text-transform:capitalize;">{{ $prescription->Title }}
                                                    {{ $prescription->Name }} {{ $prescription->Surname }}
                                                </p>
                                            </td>
                                            <td style="text-align: right">
                                                <div style="">
                                                    <b style="">
                                                        {{ $i }} of
                                                        {{ $product->Pages + 1 }}
                                                    </b>
                                                    <b>{{ date('d/m/Y') }}</b>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr style="">
                                            <td colspan="2">
                                                <p class="h-5"></p>
                                            </td>
                                        </tr>
                                        <tr style="vertial-align:middle;">
                                            <td style="vertical-align: top">
                                                <p class="fs-9">Keep away from children</p>
                                                <p class="fs-9">HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2
                                                    2HH, UK +44(0)1204559999</p>
                                            </td>
                                            <td style="vertial-align:middle; text-align:right; height: 40px;">
                                                <div style="padding-right: 0px; margin-top: 5px;">
                                                    <div class="displayBy">
                                                        <b>DispBy</b>
                                                    </div>
                                                    <div class="checkBy">
                                                        <b>ChkBy</b>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                        </table>
                    </footer>
                </div>
            @endif

        @endforeach
    </main>

    <div style="width: 315px; height: 140px; display: block; position: relative;" class="page-break">
        <table style="width: 100%; text-align:center;">
            <tr>
                <td>
                    <div style="display: block;">
                        <div
                            style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                            <img style="position: absolute; top: 5px; left: 10px;"
                                src="data:image/png;base64, {{ \DNS1D::getBarcodePNG($prescription->PrescriptionID, 'C128', 3, 60, [1, 1, 1], true) }}"
                                alt="barcode" />
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div
                        style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; top: 65px; width: 100%;">
                        <b style="vertical-align: middle; display: block;">
                            <span style="font-size: 20px;">{{ $prescription->PrescriptionID }}</span>
                        </b>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <div
                        style="text-align: center; margin: 0; padding: 0; clear: both; position: absolute; bottom: -5px; width: 100%;">
                        <table style="width: 100%; text-align:center;">
                            <tr>
                                <td>
                                    <b><span class="capitalize">{{ $prescription->Name }}</span> <span
                                            class="capitalize">{{ $prescription->Surname }}</span></b>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div style="margin:0;font-size: 11px;"><b>{{ $prescription->DAddress1 }}
                                            {{ $prescription->DAddress3 }}
                                            {{ $prescription->DPostcode }} {{ $prescription->CountryName }}</b></div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div id="delivery-logo" class="page-break">
        <table style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
            <tr>
                <td style="">
                    <div
                        style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; position: absolute; left: -50px; top: 35px; width: 315px;">
                        <img style="vertical-align: top; display: block; height: 80px;"
                            src='{{ base64Image("images/logo/ids/$prescription->DeliveryID.png") }}'
                            alt="delivery company" />
                    </div>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
