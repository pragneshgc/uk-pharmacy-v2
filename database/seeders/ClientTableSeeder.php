<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('client')->delete();

        DB::table('client')->insert(
            array(
                array(
                    'AccessedDate' => 0,
                    'AdditionalComment' => NULL,
                    'Address1' => 'Unit 18',
                    'Address2' => 'Waters Meeting',
                    'Address3' => 'Britannia Way',
                    'Address4' => 'Bolton',
                    'APIKey' => 'qVdwfDJRGBgRipDvfbMYxkjcMIbclFtB',
                    'CompanyName' => 'HR Healthcare Pharmacy',
                    'CompanyNumber' => '06790962',
                    'CountryID' => 1,
                    'CreatedDate' => 1538132260,
                    'CreditLimit' => 0.0,
                    'Email' => 'riaz.vali@natcol.com',
                    'GPHCNO' => '9010946',
                    'IP' => '192.168.1.1',
                    'ITEmail' => 'accounts@natcol.com',
                    'ITName' => NULL,
                    'Middlename' => NULL,
                    'Mobile' => '079319681901',
                    'ModifiedDate' => 1538132260,
                    'Name' => 'Riaz',
                    'Notes' => NULL,
                    'Password' => 'WkmiHCGOLYCnc',
                    'PendingPharmacyEndpoint' => NULL,
                    'PendingPharmacyURL' => NULL,
                    'Postcode' => 'BL2 2HH',
                    'ReturnPassword' => NULL,
                    'ReturnURL' => 'NULL',
                    'ReturnUsername' => NULL,
                    'Status' => 1,
                    'Surname' => 'Vali',
                    'Telephone' => '01204 559 999',
                    'Title' => 'Mr',
                    'TradingName' => 'HR Healthcare',
                    'Type' => 1,
                    'Username' => 'tmpusrname',
                    'VAT' => 0.0,
                ),
            )
        );


    }
}