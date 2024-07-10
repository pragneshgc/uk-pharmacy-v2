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
            @page {
                size: 315px 160px;
                margin: 0;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

        </style>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    </head>

    <body>
        @foreach($products as $product)
            @for($i=1; $i <= $product->Pages; $i++)
                <div style="width: 315px; height: 140px; display: block;">
                    <div style="position: absolute; top: 0;">
                        <div class="product-name" style="display: block; font-size: 14px; text-align: center; margin-top: -3px;">
                            <b>{{ $product->Name }} {{ $product->DisplayedQuantity }} {{ $product->Units }}</b>
                        </div>
                        <div class="product-instructions" style="font-size: 11px; padding: 0px 5px; line-height:9px; font-weight: 700; margin-top: 2px;">
                            {{ $product->Instructions }}
                        </div>
                        @if(count($product->WarningLabels) > 0)
                        <div class="product-instructions" style="font-size: 11px; padding: 0px 5px; line-height:9px; font-weight: 700;">
                        @foreach($product->WarningLabels as $label)
                            {{ $label->Description }}
                        @endforeach
                        </div>
                        @endif
                    </div>
                    @if($product->InstructionLength < 370)
                    <div class="patient-info" style="display: block; font-size: 11px; padding: 0px 5px; height: 20px; position: absolute; bottom: 42px; font-weight: 700;">
                        <div style="float: left;">
                            <span style="text-transform:capitalize;">{{ $prescription->Title }} {{ $prescription->Name }} {{ $prescription->Surname }}</span>
                        </div>
                        <div style="float: right; padding-right: 8px; position: relative;">
                            <b style="
                            @if(strlen($prescription->Title.' '.$prescription->Name.' '.$prescription->Surname) > 37) 
                            position: absolute; left: -65px; top: 13px;
                            @else
                            margin-right: 10px; 
                            @endif">
                                {{ $i }} of {{ $product->Pages }}
                            </b>
                            <b>{{ date('d/m/Y') }}</b>
                        </div>
                    </div>
                    <div class="additional-information" 
                    style="display: inline-block;clear: both;padding: 5px; height: 40px; position: absolute; bottom: -5px;">
                        <div style="/* width: 150px; */font-size: 9px;display: inline-block; position: relative;margin-top: auto;white-space: normal;flex-grow: 1;">
                            <b style="position: absolute; left: 60px; top: -2px;">Keep away from children</b>
                            <br>
                            <b>HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2 2HH, UK +44(0)1204 559999</b>
                        </div>
                        <div style="width: 85px; float: right; padding-right: 5px;">
                            <div style="border:2px solid #000;font-weight:700!important;font-size: 6px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;" >
                                <b>DispBy</b>
                            </div>
                            <div style="border:2px solid #000;font-weight:700!important;font-size: 7px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;" >
                                <b>ChkBy</b>
                            </div>
                        </div>
                    </div>
                    @endif
                </div>
                @if($product->InstructionLength >= 370)
                <div style="width: 315px; height: 140px; display: block; position: relative;">
                    <div class="patient-info" style="display: block; font-size: 11px; padding: 0px 5px; height: 20px; position: absolute; top: 10px; font-weight: 700;">
                        <div style="float: left;">
                            <span>{{ $prescription->Title }} {{ $prescription->Name }} {{ $prescription->Surname }}</span>
                        </div>
                        <div style="float: right; padding-right: 8px;">
                            <b style="margin-right: 10px;
                            @if(strlen($prescription->Title.' '.$prescription->Name.' '.$prescription->Surname) > 37) 
                            position: absolute; left: -60px; top: 13px;
                            @endif">
                                {{ $i }} of {{ $product->Pages }}
                            </b>
                            <b>{{ date('d/m/Y') }}</b>
                        </div>
                    </div>        
                    <div class="additional-information" 
                    style="display: inline-block;clear: both;padding: 5px; height: 40px; position: absolute; top: 30px;">
                        <div style="/* width: 150px; */font-size: 9px;display: inline-block; position: relative;margin-top: auto;white-space: normal;flex-grow: 1;">
                            <b style="position: absolute; left: 60px; top: -2px;">Keep away from children</b>
                            <br>
                            <b>HR Healthcare, Unit 18, Britannia Way <br> Bolton,BL2 2HH, UK +44(0)1204 559999</b>
                        </div>
                        <div style="width: 85px; float: right; padding-right: 5px;">
                            <div style="border:2px solid #000;font-weight:700!important;font-size: 6px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;" >
                                <b>DispBy</b>
                            </div>
                            <div style="border:2px solid #000;font-weight:700!important;font-size: 7px;height: 35px;width: 35px;display: inline-block;box-sizing: border-box;text-align: center;" >
                                <b>ChkBy</b>
                            </div>
                        </div>
                    </div>        
                </div>
                @endif
            @endfor
        @endforeach

        <div class="footer" style="width: 315px; height: 140px; display: block; position: relative;">
            <div style="display: block;">
                <div style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                    <img style="position: absolute; top: 5px; left: 10px;" src="data:image/png;base64, {{\DNS1D::getBarcodePNG($prescription->PrescriptionID, 'C128',3,60,array(1,1,1), true)}}" alt="barcode"/>
                    <div style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; left: -50px; top: 75px; width: 315px;">
                        <b style="vertical-align: middle; display: block;"><span style="font-size: 20px;">{{ $prescription->PrescriptionID }}</span> - {{ $company }} @if($prescription->PaymentMethod != '0') COD @endif @if($prescription->Repeats != '0' && $prescription->Repeats != '' && in_array($prescription->DCountryCode, [143, 162, 205, 243])) CI @endif</b>
                    </div>
                </div>
            </div>
            <div style="text-align: center; display: block; margin: 0; padding: 0; clear: both; position: absolute; bottom: 10px;">
                <div style="margin:0;font-size: 14px;"><b>{{ $prescription->Name }} {{ $prescription->Surname }}</b></div>
                <div style="margin:0;font-size: 11px;"><b>{{ $prescription->DAddress1 }} {{ $prescription->DAddress3 }} {{ $prescription->DPostcode }} {{ $prescription->CountryName }}</b></div>
            </div>
        </div>

        @if($prescription->ClientID == 51 || $prescription->ClientID == 53)
        <div class="footer" style="width: 315px; height: 140px; display: block; position: relative;">
            <div style="display: block;">
                <div style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                    <img style="position: absolute; top: 5px; left: 10px;" src="data:image/png;base64, {{\DNS1D::getBarcodePNG($prescription->PrescriptionID, 'C128',3,60,array(1,1,1), true)}}" alt="barcode"/>
                    <div style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; left: -50px; top: 75px; width: 315px;">
                        <b style="vertical-align: middle; display: block;"><span style="font-size: 20px;">{{ $prescription->PrescriptionID }}</span> - {{ $company }} @if($prescription->PaymentMethod != '0') COD @endif @if($prescription->Repeats != '0' && $prescription->Repeats != '' && in_array($prescription->DCountryCode, [143, 162, 205, 243])) CI @endif</b>
                    </div>
                </div>
            </div>
            <div style="text-align: center; display: block; margin: 0; padding: 0; clear: both; position: absolute; bottom: 10px;">
                <div style="margin:0;font-size: 14px;"><b>{{ $prescription->Name }} {{ $prescription->Surname }}</b></div>
                <div style="margin:0;font-size: 11px;"><b>{{ $prescription->DAddress1 }} {{ $prescription->DAddress3 }} {{ $prescription->DPostcode }} {{ $prescription->CountryName }}</b></div>
            </div>
        </div>
        @endif
    </body>
</html>