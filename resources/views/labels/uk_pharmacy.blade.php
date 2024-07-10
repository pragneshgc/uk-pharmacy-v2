<html>

<head>
    <meta charset="utf-8">
    <title>Pharmacy Label</title>
    <style type="text/css">
        .page-break {
            display: block;
            page-break-before: always;
        }

        ul {
            padding: 0;
            margin-top: 0px;
        }

        .table-icon {
            padding: 1px 8px;
            margin-right: 5px;
        }

        .edit.table-icon {
            background: url(../img/edit.png) no-repeat;
        }

        .delete.table-icon {
            background: url(../img/i_delete.png) no-repeat;
        }

        .archive.table-icon {
            background: url(../img/order-1.png) no-repeat;
        }

        .tnt.table-icon {
            background: url(../img/i_ok.png) no-repeat;
        }

        .tnt_icon.table-icon {
            background: url(../img/tnt_small.png) no-repeat;
        }

        .dpd_icon.table-icon {
            background: url(../img/dpd_small.png) no-repeat;
        }

        .ups_icon.table-icon {
            background: url(../img/ups_small.jpg) no-repeat;
        }

        .ups_access_icon.table-icon {
            background: url(../img/ups_access_point_icon.jpeg) no-repeat;
        }

        .rmail_icon.table-icon {
            background: url(../img/rmail_small.png) no-repeat;
        }

        .view.table-icon {
            background: url(../img/order-1.png) no-repeat;
        }

        .capitalize {
            text-transform: capitalize;
        }

        td {
            page-break-inside: avoid;
        }

        @page {
            size: 315px 160px;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
    </style>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>

<body>
    @foreach ($products as $product)
        @for ($i = 1; $i <= $product->Pages; $i++)
            <div style="width: 315px; height: 140px; display: block;">
                <main>
                    <table style="top: 0;width:100%">
                        <tr>
                            <td style="text-align: center">
                                <div class="product-name"
                                    style="font-size: 14px; text-align: center; margin-top: -3px; @if (strlen($product->Name . ' ' . $product->DisplayedQuantity . ' ' . $product->Units) > 45) font-size: 12.5px; @endif">
                                    <b>{{ $product->Name }} {{ $product->DisplayedQuantity }} {{ $product->Units }}</b>
                                </div>
                            </td>
                        </tr>
                        @if ($product->InstructionLength >= 250)
                            @php
                                $wl = '';
                                $lines = 5;
                            @endphp

                            @if (strlen($product->Name . ' ' . $product->DisplayedQuantity . ' ' . $product->Units) > 45)
                                @php $lines = 5; @endphp
                            @endif

                            @if (count($product->WarningLabels) > 0)
                                @foreach ($product->WarningLabels as $label)
                                    @php $wl .=  $label->Description; @endphp
                                @endforeach
                            @endif

                            @php
                                
                                $instructions = $product->Instructions . '<br>' . $wl;
                                $chunks = preg_split('/\s+/', $instructions, -1, PREG_SPLIT_NO_EMPTY);
                                $result = [];
                                $current_chunk = '';
                                
                                foreach ($chunks as $k => $chunk) {
                                    $temp_chunk = $current_chunk . ' ' . $chunk;
                                    $temp_html = "<div class='product-instructions' style='font-size: 11px; padding: 0px 8px; line-height: 12px; font-weight: 700; margin-top: 0px;'>$temp_chunk</div>";
                                    $line_count = ceil(strlen(strip_tags($temp_html)) / 50); // Assuming 50 characters per line
                                
                                    // Check if adding the current word exceeds the line limit (5 lines)
                                
                                    if ($line_count <= $lines) {
                                        $current_chunk .= ' ' . $chunk;
                                    } else {
                                        $result[] = trim($current_chunk);
                                        $current_chunk = $chunk;
                                        $line_count = 1; // Reset line count for the new chunk
                                    }
                                }
                                if (!empty($current_chunk)) {
                                    $result[] = trim($current_chunk);
                                }
                                
                            @endphp

                            @foreach ($result as $key => $chunk)
                                <tr>
                                    <td style="height: 70px;vertical-align: top;">
                                        <div class="product-instructions"
                                            style="font-size: 11px; padding: 0px 8px; line-height:12px; font-weight: 700; margin-top: 0px;">
                                            {!! $chunk !!}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <footer style="position: fixed;top: 5px; bottom: 0px; width:100%">
                                            <table class="patient-info"
                                                style="width: 100%; font-size: 11px; padding: 0px 5px; height: 20px; position: absolute; bottom: 50px; font-weight: 700;">
                                                <tr>
                                                    <td>
                                                        <div style="float: left;">
                                                            <span
                                                                style="text-transform:capitalize;">{{ $prescription->Title }}
                                                                {{ $prescription->Name }} {{ $prescription->Surname }}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div
                                                            style="float: right; position: relative; text-align:right;">
                                                            <b
                                                                style="@if (strlen($prescription->Title . ' ' . $prescription->Name . ' ' . $prescription->Surname) > 37) position: absolute; left: -65px; top: 13px; @else margin-right: 10px; @endif">
                                                                {{ $i }} of
                                                                {{ $product->Pages + ($product->ExtraPageQuantity > 0 ? 1 : 0) }}
                                                            </b>
                                                            <b>{{ date('d/m/Y') }}</b>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                            <table class="additional-information"
                                                style="width: 100%; height: 40px; position: absolute; bottom: 5px; left: 5px;">
                                                <tr>
                                                    <td>
                                                        <div
                                                            style="font-size: 9px; display: inline-block; position: relative;margin-top: auto;white-space: normal;flex-grow: 1;">
                                                            <b style="position: absolute; left: 60px; top: -2px;">Keep
                                                                away from children</b>
                                                            <br>
                                                            <b>HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2
                                                                2HH, UK +44(0)1204 559999</b>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div style="width: 85px; float: right; padding-right: 7px;">
                                                            <div
                                                                style="border:2px solid #000;font-weight:700!important;font-size: 6px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;">
                                                                <b>DispBy</b>
                                                            </div>
                                                            <div
                                                                style="border:2px solid #000;font-weight:700!important;font-size: 7px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;">
                                                                <b>ChkBy</b>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </footer>
                                    </td>
                                </tr>
                            @endforeach
                        @else
                            <tr>
                                <td>
                                    <div class="product-instructions"
                                        style="font-size: 11px; padding: 0px 5px; line-height:12px; font-weight: 700; margin-top: 0px;">
                                        {{ $product->Instructions }}
                                        <br>
                                        @if (count($product->WarningLabels) > 0)
                                            @foreach ($product->WarningLabels as $label)
                                                {{ $label->Description }}
                                            @endforeach
                                        @endif
                                    </div>
                                </td>
                            </tr>
                            {{-- <tr>
                                <td>
                                    @if (count($product->WarningLabels) > 0)
                                        <div class="product-instructions" style="font-size: 11px; padding: 0px 8px; line-height:12px; font-weight: 700;">
                                            @foreach ($product->WarningLabels as $label)
                                                {{ $label->Description }}
                                            @endforeach
                                        </div>
                                    @endif
                                </td>
                            </tr> --}}
                        @endif

                    </table>
                </main>
                @if ($product->InstructionLength < 250)
                    <footer style="position: fixed;bottom: 0px; height: 40px; width:100%">
                        <table class="patient-info"
                            style="width: 100%; font-size: 11px; padding: 0px 5px; height: 20px; position: absolute; bottom: 50px; font-weight: 700;">
                            <tr>
                                <td>
                                    <div style="float: left;">
                                        <span style="text-transform:capitalize;">{{ $prescription->Title }}
                                            {{ $prescription->Name }} {{ $prescription->Surname }}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div style="float: right; position: relative; text-align:right;">
                                        <b
                                            style="@if (strlen($prescription->Title . ' ' . $prescription->Name . ' ' . $prescription->Surname) > 37) position: absolute; left: -65px; top: 13px; @else margin-right: 10px; @endif">
                                            {{ $i }} of
                                            {{ $product->Pages + ($product->ExtraPageQuantity > 0 ? 1 : 0) }}
                                        </b>
                                        <b>{{ date('d/m/Y') }}</b>
                                    </div>
                                </td>
                            </tr>
                        </table>

                        <table class="additional-information"
                            style="width: 100%; height: 40px; position: absolute; bottom: 5px; left: 5px;">
                            <tr>
                                <td>
                                    <div
                                        style="font-size: 9px; display: inline-block; position: relative;margin-top: auto;white-space: normal;flex-grow: 1;">
                                        <b style="position: absolute; left: 60px; top: -2px;">Keep away from
                                            children</b>
                                        <br>
                                        <b>HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2 2HH, UK +44(0)1204
                                            559999</b>
                                    </div>
                                </td>
                                <td>
                                    <div style="width: 85px; float: right; padding-right: 7px;">
                                        <div
                                            style="border:2px solid #000;font-weight:700!important;font-size: 6px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;">
                                            <b>DispBy</b>
                                        </div>
                                        <div
                                            style="border:2px solid #000;font-weight:700!important;font-size: 7px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;">
                                            <b>ChkBy</b>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </footer>
                @endif
            </div>
        @endfor
    @endforeach

    <div class="footer" style="width: 315px; height: 140px; display: block; position: relative; margin-top: 10px;">
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
    <div class="footer" style="width: 315px; height: 140px; display: block; position: relative;">
        <div style="display: block;">
            <table style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                <tr>
                    <td>
                        <div
                            style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; left: -50px; top: 35px; width: 315px;">

                            <img style="vertical-align: top; display: block; height: 80px;"
                                src='{{ base64Image("images/logo/ids/$prescription->DeliveryID.png") }}'
                                alt="delivery company" />
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>
