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
            .capitalize{
                text-transform: capitalize;
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
        <div class="footer" style="width: 315px; height: 140px; display: block; position: relative;">
            <div style="display: block;">
                <div style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                    <img style="position: absolute; top: 5px; left: 10px;" src="data:image/png;base64, {{\DNS1D::getBarcodePNG($prescription->PrescriptionID, 'C128',3,60,array(1,1,1), true)}}" alt="barcode"/>
                    <div style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; left: -50px; top: 75px; width: 315px;">
                        <b style="vertical-align: middle; display: block;"><span style="font-size: 20px;">{{ $prescription->PrescriptionID }}</span> - {{ $company }} @if($prescription->PaymentMethod != '0') COD @endif</b>
                    </div>
                </div>
            </div>
            <div style="text-align: center; display: block; margin: 0; padding: 0; clear: both; position: absolute; bottom: 10px;">
                <div style="margin:0;font-size: 14px;"><b><span class="capitalize">{{ $prescription->Name }}</span> <span class="capitalize">{{ $prescription->Surname }}</span></b></div>
                <div style="margin:0;font-size: 11px;"><b>{{ $prescription->DAddress1 }} {{ $prescription->DAddress3 }} {{ $prescription->DPostcode }} {{ $prescription->CountryName }}</b></div>
            </div>
        </div>

        <div class="footer" style="width: 315px; height: 140px; display: block; position: relative;">
            <div style="display: block;">
                <div style="padding: 5px; width: 150px; box-sizing: border-box; margin-left: 50px; position: relative;">
                    <img style="position: absolute; top: 5px; left: 10px;" src="data:image/png;base64, {{\DNS1D::getBarcodePNG($prescription->PrescriptionID, 'C128',3,60,array(1,1,1), true)}}" alt="barcode"/>
                    <div style="display:block; text-align: center; padding:0; margin: 0; font-size: 20px; margin-top: 10px; position: absolute; left: -50px; top: 75px; width: 315px;">
                        <b style="vertical-align: middle; display: block;"><span style="font-size: 20px;">{{ $prescription->PrescriptionID }}</span> - {{ $company }} @if($prescription->PaymentMethod != '0') COD @endif</b>
                    </div>
                </div>
            </div>
            <div style="text-align: center; display: block; margin: 0; padding: 0; clear: both; position: absolute; bottom: 10px;">
                <div style="margin:0;font-size: 14px;"><b><span class="capitalize">{{ $prescription->Name }}</span> <span class="capitalize">{{ $prescription->Surname }}</span></b></div>
                <div style="margin:0;font-size: 11px;"><b>{{ $prescription->DAddress1 }} {{ $prescription->DAddress3 }} {{ $prescription->DPostcode }} {{ $prescription->CountryName }}</b></div>
            </div>
        </div>
    </body>
</html>