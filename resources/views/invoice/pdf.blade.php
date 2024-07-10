<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">

<head>
    <style type="text/css">
        @media print {
            @page {
                margin: 1cm;
                margin-top: 0;
            }

            body {
                margin: 0;
            }
        }

        H2 {
            page-break-before: always
        }

        * {
            margin: 0;
            padding: 0;
        }

        body {
            font: 12px/1.2 Georgia, serif;
        }

        #page-wrap {
            width: 90%;
            margin: 0 auto;
        }

        textarea {
            border: 0;
            font: 14px Georgia, Serif;
            overflow: hidden;
            resize: none;
        }

        table {
            border-collapse: collapse;
        }

        .noborder {
            border: 0 !important;
        }

        table.border td,
        table.border th {
            border: 1px solid black;
            padding: 5px;
        }

        #header {
            height: 15px;
            width: 100%;
            margin: 20px 0;
            background: #55a8d7;
            text-align: center;
            color: white;
            font: bold 15px Helvetica, Sans-Serif;
            text-decoration: uppercase;
            letter-spacing: 0px;
            padding: 8px 0px;
        }



        #customer {
            overflow: hidden;
        }

        #logo {
            text-align: right;
            position: relative;
            border: 1px solid #fff;
            overflow: hidden;
        }

        #customer-title {
            font-size: 20px;
            font-weight: bold;
        }

        .meta {
            margin-top: 1px;
            width: 300px;
        }

        .meta td {
            text-align: right;
        }

        .meta td.meta-head {
            text-align: left;
            background: gainsboro;
        }

        .meta td textarea {
            width: 100%;
            height: 20px;
            text-align: right;
        }

        #items {
            clear: both;
            width: 100%;
            margin: 22px 0 0 0;
            border: 1px solid black;
        }

        #items th {
            background: gainsboro;
        }

        #items tr.item-row td {
            border: 0;
            vertical-align: top;
        }

        #items tr.item-row-list td {
            border-bottom: 1px solid black;
            vertical-align: top;
        }

        #items td.item-name {
            width: 175px;
        }

        #items td.description textarea,
        #items td.item-name textarea {
            width: 100%;
        }

        #items td.total-line {
            border-right: 0;
            text-align: right;
        }

        #items td.total-value {
            border-left: 0;
            padding: 10px;
        }

        #items td.balance {
            background: gainsboro;
        }

        #items td.blank {
            border: 0;
        }

        #terms {
            text-align: left;
            margin: 20px 0 0 0;
            border: 1px solid black;
            padding: 1rem;
        }

        #itemlist hr {
            border-bottom: 1px solid black;
        }
    </style>

    <title>HR Healthcare Invoice</title>
</head>

<body>

    <div id="page-wrap">
        <table style="width: 100%;">
            <tr>
                <td>
                    <div id="header">
                        {{ $invoice->TradingName }} Invoice #{{ $invoice->InvoiceID }} for
                        {{ $invoice->{'Invoice Country'} }}
                    </div>

                    <table style="width: 100%;" cell-padding="0" cell-spacing="0">
                        <tr>
                            <td>
                                <div id="address">
                                    <div id="customer-title">
                                        {{ $invoice->TradingName }}<br>
                                    </div>
                                    <br><br>

                                    {{ $invoice->ClientAddress1 }}, {{ $invoice->ClientAddress2 }} @if ($invoice->Company->Address3)
                                        ,
                                    @endif {{ $invoice->ClientAddress3 }}<br>
                                    {{ $invoice->ClientAddress4 }}<br>
                                    {{ $invoice->ClientCountryName }}<br><br>

                                    Telephone: {{ $invoice->ClientTelephone ? $invoice->ClientTelephone : 'N/A' }}
                                </div>
                            </td>
                            <td>
                                <div id="logo">
                                    <div id="customer-title">
                                        {{ $invoice->Company->CompanyName }}<br>
                                    </div>
                                    <br><br>

                                    {{ $invoice->Company->Address1 }}<br>
                                    {{ $invoice->Company->Address2 }}
                                    {{ $invoice->Company->Address3 }}
                                    @if ($invoice->Company->Address3)
                                        ,
                                    @endif {{ $invoice->Company->Address4 }}<br>
                                    {{ $invoice->Company->Postcode }}<br>
                                    {{ $invoice->Company->CountryName }}<br><br>

                                    Telephone: {{ $invoice->Company->Telephone }}

                                </div>
                            </td>
                        </tr>
                    </table>

                    <table style="width: 100%; margin-top: 4%;" border="0" class="border">
                        <tr>
                            <td class="noborder" style="width: 57%;">
                                &nbsp;
                            </td>
                            <td class="noborder">
                                <table class="meta" style="">
                                    <tr>
                                        <td class="meta-head">Invoice #</td>
                                        <td>
                                            <div>{{ $invoice->InvoiceID }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="meta-head">Internal Reference #</td>
                                        <td>
                                            <div>{{ $invoice->SequenceID }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="meta-head">Country</td>
                                        <td>
                                            <div>{{ $invoice->{'Invoice Country'} }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="meta-head">Date</td>
                                        <td>
                                            <div id="date">{{ $invoice->{'Created Date'} }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="meta-head">Amount Due</td>
                                        <td>
                                            <div class="due">
                                                {{ config('app.currency') }}{{ $invoice->CalculatedSubTotal }}
                                            </div>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                    </table>

                    <table id="items" class="border">
                        <tr>
                            <th>Item</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>VAT</th>
                            <th>Price</th>
                        </tr>

                        <tr class="item-row">
                            <td class="item-name">
                                <div>PRODUCTS</div>
                            </td>
                            <td class="description">
                                <div>This charge covers products costs for all orders from
                                    {{ $invoice->ProductToDate }} - {{ $invoice->ProductFromDate }}
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ $invoice->ProductsCount }}</div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ config('app.currency') }}{{ $invoice->ProductsVAT }}</div>
                            </td>
                            <td style="text-align: right;"><span
                                    class="price">{{ config('app.currency') }}{{ $invoice->ProductsPrice }}</span>
                            </td>
                        </tr>

                        <tr class="item-row">
                            <td class="item-name">
                                <div>SHIPPING</div>
                            </td>
                            <td class="description">
                                <div>This charge covers shipping costs for all orders from
                                    {{ $invoice->ShippingToDate }} - {{ $invoice->ShippingFromDate }}
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ $invoice->ShippingCount }}</div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ config('app.currency') }}{{ $invoice->ShippingVAT }}</div>
                            </td>
                            <td style="text-align: right;"><span
                                    class="price">{{ config('app.currency') }}{{ $invoice->ShippingPrice }}</span>
                            </td>
                        </tr>

                        <tr class="item-row">
                            <td class="item-name">
                                <div>DISPENSING FEE AND OTHER CHARGES</div>
                            </td>
                            <td class="description">
                                <div>This charge covers other costs for all orders from
                                    {{ $invoice->ShippingToDate }} - {{ $invoice->ShippingFromDate }}
                                </div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ $invoice->OtherCount }}</div>
                            </td>
                            <td style="text-align: right;">
                                <div class="qty">{{ config('app.currency') }}{{ $invoice->OtherVAT }}</div>
                            </td>
                            <td style="text-align: right;"><span
                                    class="price">{{ config('app.currency') }}{{ $invoice->OtherPrice }}</span></td>
                        </tr>

                        <tr id="hiderow">
                            <td colspan="5">&nbsp;</td>
                        </tr>
                        <tr>
                            <td colspan="2" class="blank">
                            </td>
                            <td colspan="2" class="total-line">Sub Total</td>
                            <td class="total-value" style="text-align: right;">
                                <div id="total">{{ config('app.currency') }}{{ $invoice->CalculatedSubTotal }}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="blank">
                            </td>
                            <td colspan="2" class="total-line">VAT</td>
                            <td class="total-value" style="text-align: right;">
                                <div id="total">{{ config('app.currency') }}{{ $invoice->CalculatedVAT }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="blank">
                                <div id="customer-title" style="float:center;margin-left:210px;">
                                    {{ $invoice->StatusString }}
                                </div>
                            </td>
                            <td colspan="2" class="total-line">Total</td>
                            <td class="total-value" style="text-align: right;">
                                <div id="total">{{ config('app.currency') }}{{ $invoice->CalculatedTotal }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="blank">
                            </td>
                            <td colspan="2" class="total-line">Amount Paid</td>

                            <td class="total-value" style="text-align: right;">
                                <div id="paid">{{ config('app.currency') }}{{ $invoice->AmountReceived }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" class="blank"> </td>
                            <td colspan="2" class="total-line balance">Balance Due</td>
                            <td class="total-value balance" style="text-align: right;">
                                <div class="due">{{ config('app.currency') }}{{ $invoice->BalanceDue }}</div>
                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>
    </div>


    <div id="page-wrap">

        <div id="terms">
            <div><b>VAT summary</b> for all items (where VAT is applicable):<br><br></div>

            @foreach ($invoice->VATCounter as $key => $value)
                <div>{{ $key }}% VAT rate. <b>(Total: {{ config('app.currency') }} {{ $value }})</b>
                </div>
            @endforeach
            <br>

            <small style="font-size: 12px;">
                <b>{{ $invoice->Company->CompanyName }}</b> VAT Numbers:
                <br><br>
                {{ $invoice->Company->DisplayVAT ? $invoice->Company->DisplayVAT : '' }}
            </small>

            <br>
            <br>

            <small style="font-size: 12px;">
                <b>{{ $invoice->TradingName }}</b> VAT Numbers:
                <br><br>
                {{ $invoice->ClientDisplayVAT ? $invoice->ClientDisplayVAT : 'N/A' }}
            </small>
        </div>

        <H2>&nbsp;</H2>
        <div id="header">INVOICE BREAKDOWN </div>
        <table style="width: 100%;">
            <tr>
                <td>Invoice # {{ $invoice->InvoiceID }}</td>
                <td style="text-align: right;">Date: {{ date('m/d/Y') }}</td>
            </tr>
        </table>
        {{-- <span style="float:left"></span>
        <!-- <span style="float:left; margin-left: 300px">Page 1</span> -->
        <span style="float:right"></span> --}}

        <table id="items" class="border">
            <tbody>
                <tr>
                    <th style="width: 12%;">Cust Ref</th>
                    <th>Our Ref</th>
                    <th>Date</th>
                    <th style="width: 40%;">Description</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>VAT</th>
                    <th>Total</th>
                </tr>

                @foreach ($invoice->Items as $item)
                    <tr class="item-row-list">
                        <td>{{ $item->ReferenceNumber }}</td>
                        <td>{{ $item->PrescriptionID }}</td>
                        <td>{{ $item->Date }}</td>
                        <td>{{ $item->Description }}</td>
                        <td style="text-align: right;">{{ $item->Quantity }}</td>
                        <td style="text-align: right;">{{ config('app.currency') }}{{ $item->UnitCost }}</td>
                        <td style="text-align: right;">{{ config('app.currency') }}{{ $item->VAT }}</td>
                        <td style="text-align: right;">{{ config('app.currency') }}{{ $item->Total }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
            <tfoot>
                <tr style="background: #ccc; font-weight:bold;">
                    <td colspan="4" class="blank">
                        <p style="font-size: 16px; font-weight:bold;">TOTAL</p>
                    </td>
                    <td style="text-align: right;">{{ count($invoice->Items) }}</td>
                    <td style="text-align: right;">{{ config('app.currency') }}{{ $invoice->CalculatedSubTotal }}
                    </td>
                    <td style="text-align: right;">{{ config('app.currency') }}{{ $invoice->CalculatedVAT }}</td>
                    <td style="text-align: right;">{{ config('app.currency') }}{{ $invoice->CalculatedTotal }}</td>
                </tr>
            </tfoot>
        </table>

        {{-- <table id="items">
            <tr>
                <th colspan="4" class="blank"></th>
                <th>Qty</th>
                <th>Price</th>
                <th>VAT</th>
                <th>Total</th>
            </tr>


        </table> --}}

    </div>

</body>

</html>
