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
            width: 100%;
        }

        #page-wrap {
            width: 90%;
            margin: 0 auto;
            padding: 5px;
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

        table td,
        table th {
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

        #address {
            width: 250px;
            height: 250px;
            float: left;
        }

        #customer {
            overflow: hidden;
        }

        #logo {
            text-align: right;
            float: right;
            position: relative;
            margin-top: 25px;
            border: 1px solid #fff;
            max-width: 540px;
            max-height: 230px;
            overflow: hidden;
        }

        #customer-title {
            font-size: 20px;
            font-weight: bold;
            float: left;
        }

        #meta {
            margin-top: 1px;
            width: 300px;
            float: right;
        }

        #meta td {
            text-align: right;
        }

        #meta td.meta-head {
            text-align: left;
            background: gainsboro;
        }

        #meta td textarea {
            width: 100%;
            height: 20px;
            text-align: right;
        }

        #items {
            clear: both;
            width: 100%;
            margin: 30px 0 0 0;
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

        #items td.total-value textarea {
            height: 20px;
            background: none;
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
            height: 300px;
            padding: 1rem;
        }

        #terms h5 {
            text-transform: uppercase;
            font: 13px Helvetica, Sans-Serif;
            letter-spacing: 0px;
            border: 0px solid black;
            padding: 0 0 8px 0;
            margin: 0 0 8px 0;
        }

        #terms textarea {
            width: 100%;
            text-align: center;
        }

        #itemlist hr {
            border-bottom: 1px solid black;
        }
    </style>
    <meta charset='UTF-8'>

    <title>HR Healthcare Invoice</title>
</head>

<body>

    <div id="page-wrap">

        <div id="header">INVOICE</div>

        <div id="identity">

            <div id="address">
                {{ $invoice->Client }}<br>
                {{ $invoice->ClientAddress1 }}, {{ $invoice->ClientAddress2 }} , {{ $invoice->ClientAddress3 }}<br>
                <br>
                {{ $invoice->ClientAddress4 }}<br>
                <br>
                {{ $invoice->ClientCountryName }}<br><br>


                Telephone: {{ $invoice->ClientTelephone ? $invoice->ClientTelephone : 'N/A' }}
                <br>
                Email: {{ $invoice->ClientEmail ? $invoice->ClientEmail : 'N/A' }}

            </div>

            <div id="logo">

                <img id="image" src="{{ url('/images/prescription-logo.png') }}" alt="HR Healthcare Pharmacy" />
                <br>
                <br>

                {{ $invoice->Company->CompanyName }}<br>

                {{ $invoice->Company->Address1 }}<br>
                {{ $invoice->Company->Address2 }}<br>
                {{ $invoice->Company->Address3 }}, {{ $invoice->Company->Address4 }}<br>
                {{ $invoice->Company->Postcode }}<br>
                {{ $invoice->Company->CountryName }}<br><br>

                {{ $invoice->Company->Telephone }}
            </div>

        </div>

        <div style="clear:both"></div>

        <div id="customer">

            <div id="customer-title">
                {{ $invoice->Client }}<br>
            </div>

            <table id="meta">
                <tr>
                    <td class="meta-head">Invoice #</td>
                    <td>
                        <div>{{ $invoice->InvoiceID }}</div>
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
                        <div class="due">&pound;{{ $invoice->CalculatedSubTotal }}</div>
                    </td>
                </tr>

            </table>

        </div>

        <table id="items">

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
                    <div>This charge covers drugs costs for all orders from {{ $invoice->ProductFromDate }} -
                        {{ $invoice->ProductToDate }}</div>
                </td>
                <td>
                    <div class="qty">{{ $invoice->ProductsCount }}</div>
                </td>
                <td>
                    <div class="qty">&pound;{{ $invoice->ProductsVAT }}</div>
                </td>
                <td><span class="price">&pound;{{ $invoice->ProductsPrice }}</span></td>
            </tr>

            <tr class="item-row">
                <td class="item-name">
                    <div>SHIPPING</div>
                </td>
                <td class="description">
                    <div>This charge covers shipping costs for all orders from {{ $invoice->ShippingFromDate }} -
                        {{ $invoice->ShippingToDate }}</div>
                </td>
                <td>
                    <div class="qty">{{ $invoice->ShippingCount }}</div>
                </td>
                <td>
                    <div class="qty">&pound;{{ $invoice->ShippingVAT }}</div>
                </td>
                <td><span class="price">&pound;{{ $invoice->ShippingPrice }}</span></td>
            </tr>

            <tr id="hiderow">
                <td colspan="5">&nbsp;</td>
            </tr>
            <tr>
                <td colspan="3" class="blank">
                </td>
                <td class="total-line">Sub Total</td>
                <td class="total-value">
                    <div id="total">&pound;{{ $invoice->CalculatedSubTotal }}</div>
                </td>
            </tr>
            <tr>
                <td colspan="3" class="blank">
                </td>
                <td class="total-line">VAT</td>
                <td class="total-value">
                    <div id="total">&pound;{{ $invoice->CalculatedVAT }}</div>
                </td>
            </tr>
            <tr>
                <td colspan="3" class="blank">
                    <div id="customer-title" style="float:center;margin-left:210px;">
                        {{ $invoice->StatusString }}
                    </div>
                </td>
                <td class="total-line">Total</td>
                <td class="total-value">
                    <div id="total">&pound;{{ $invoice->CalculatedTotal }}</div>
                </td>
            </tr>
            <tr>
                <td colspan="3" class="blank">
                </td>
                <td class="total-line">Amount Paid</td>

                <td class="total-value">
                    <div id="paid">&pound;{{ $invoice->AmountReceived }}</div>
                </td>
            </tr>
            <tr>
                <td colspan="3" class="blank"> </td>
                <td class="total-line balance">Balance Due</td>
                <td class="total-value balance">
                    <div class="due">&pound;{{ $invoice->BalanceDue }}</div>
                </td>
            </tr>

        </table>

        <div id="terms">
            <h5>VAT SUMMARY</h5>
            <div>VAT summary for all items (where VAT is applicable):<br><br></div>

            @foreach ($invoice->VATCounter as $key => $value)
                <div>{{ $key }}% VAT rate. <b>(Total: &pound; {{ $value }})</b></div>
            @endforeach
        </div>

        <H2>&nbsp;</H2>
        <div id="header">INVOICE BREAKDOWN </div>
        <span style="float:left">Invoice # {{ $invoice->InvoiceID }}</span>
        <!-- <span style="float:left; margin-left: 300px">Page 1</span> -->
        <span style="float:right">Date: {{ date('m/d/Y') }}</span>

        <table id="items">

            <tr>
                <th>Cust Ref</th>
                <th>Our Ref</th>
                <th>Date</th>
                <th>Prescriber</th>
                <th>Description</th>
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
                    <td>EU</td>
                    <td>{{ $item->Description }}</td>
                    <td>{{ $item->Quantity }}</td>
                    <td>&pound;{{ $item->UnitCost }}</td>
                    <td>&pound;{{ $item->VAT }}</td>
                    <td>&pound;{{ $item->Total }} <strong><i></i></strong></td>
                </tr>
            @endforeach
        </table>

        <table id="items">
            <tr>
            <tr>
                <th colspan="4" class="blank"></th>
                <th>Price</th>
                <th>VAT</th>
                <th>Qty</th>
                <th>Total</th>
            </tr>
            <td colspan="4" class="blank">
                <div id="customer-title" style="float:center;margin-left:210px;">
                    TOTAL
                </div>
            </td>
            <td>&pound;{{ $invoice->CalculatedSubTotal }}</td>
            <td>&pound;{{ $invoice->CalculatedVAT }}</td>
            <td>{{ count($invoice->Items) }}</td>
            <td>&pound;{{ $invoice->CalculatedTotal }}</td>
            </tr>

        </table>

    </div>

</body>

</html>
