<?xml version="1.0" encoding="UTF-8"?>
<req:ShipmentValidateRequestEA xmlns:req="http://www.dhl.com" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.dhl.com
ship-val-req_EA.xsd">
    <Request>
        <ServiceHeader>
            <MessageTime>{{$date}}</MessageTime>
            <MessageReference>{{$order->PrescriptionID.'-'.$order->ReferenceNumber}}</MessageReference>
            <SiteID>v62_mNH6PcS0Cp</SiteID>
            <Password>NFV561CHLc</Password>
        </ServiceHeader>
    </Request>
    <LanguageCode>en</LanguageCode>
    <PiecesEnabled>Y</PiecesEnabled>
    <Billing>
        <ShipperAccountNumber>{{$accountNumber}}</ShipperAccountNumber>
        <ShippingPaymentType>S</ShippingPaymentType>
    </Billing>
    <Consignee>
        <CompanyName>{{$order->Name.' '.$order->Surname}}</CompanyName>
        <AddressLine>{{$order->DAddress1.', '.$order->DAddress2}}</AddressLine>
        <City>{{$order->DAddress3}}</City>
        <PostalCode>{{$order->DPostcode}}</PostalCode>
        <CountryCode>{{$order->CountryCodeName}}</CountryCode>
        <CountryName>{{$order->CountryName}}</CountryName>
        <Contact>
            <PersonName>{{$order->Name.' '.$order->Surname}}</PersonName>
            <PhoneNumber>{{$order->Mobile}}</PhoneNumber>
        </Contact>
    </Consignee>
    <Reference>
        <ReferenceID>SHIPMENT REFERENCE </ReferenceID>
    </Reference>
    <ShipmentDetails>
        <NumberOfPieces>1</NumberOfPieces>
        <CurrencyCode>GBP</CurrencyCode>
        <Pieces>
            <Piece>
                <PackageType>EE</PackageType>
                <Weight>20</Weight>
                <Depth>200</Depth>
                <Width>210</Width>
                <Height>220</Height>
            </Piece>
        </Pieces>
        <PackageType>EE</PackageType>
        <Weight>0.5</Weight>
        <DimensionUnit>C</DimensionUnit>
        <WeightUnit>K</WeightUnit>
        <GlobalProductCode>D</GlobalProductCode>
        <LocalProductCode>D</LocalProductCode>
        <DoorTo>DD</DoorTo>
        <Date>2019-04-15</Date>
        <Contents>For testing purpose only. Please do not ship</Contents>
        <IsDutiable>Y</IsDutiable>
    </ShipmentDetails>
    <Shipper>
        <ShipperID>420747769</ShipperID>
        <CompanyName>Test Company Name</CompanyName>
        <AddressLine>Test Addr1</AddressLine>
        <City>London</City>
        <PostalCode>TW4 6JS</PostalCode>
        <CountryCode>GB</CountryCode>
        <CountryName>United Kingdom</CountryName>
        <Contact>
            <PersonName>enquiry sing</PersonName>
            <PhoneNumber>11234-325423</PhoneNumber>
        </Contact>
    </Shipper>
    <LabelImageFormat>ZPL2</LabelImageFormat>
    <RequestArchiveDoc>N</RequestArchiveDoc>
</req:ShipmentValidateRequestEA>