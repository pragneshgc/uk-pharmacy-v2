<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        DB::table('Setting')->delete();

        DB::table('Setting')->insert(
            array(

                array(
                    'Name' => 'Records Per Page1',
                    'SettingID' => 2,
                    'Status' => 1,
                    'Type' => 1,
                    'Value' => '200',
                ),

                array(
                    'Name' => 'TNT Parcel Delivery',
                    'SettingID' => 3,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://www.tnt.com/',
                ),

                array(
                    'Name' => 'DPD Express Parcel Delivery',
                    'SettingID' => 4,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://www.dpd.co.uk/',
                ),

                array(
                    'Name' => 'Royal Mail',
                    'SettingID' => 5,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://www.royalmail.com/',
                ),

                array(
                    'Name' => 'Multiple Dispenser Batch Limit',
                    'SettingID' => 6,
                    'Status' => 1,
                    'Type' => 3,
                    'Value' => '15',
                ),

                array(
                    'Name' => 'UPS',
                    'SettingID' => 7,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://wwwapps.ups.com/',
                ),

                array(
                    'Name' => 'TNT UK',
                    'SettingID' => 8,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://www.tnt.com/',
                ),

                array(
                    'Name' => 'PXP Status (LIVE or OFF)',
                    'SettingID' => 9,
                    'Status' => 1,
                    'Type' => 5,
                    'Value' => '1',
                ),

                array(
                    'Name' => 'DHL',
                    'SettingID' => 10,
                    'Status' => 1,
                    'Type' => 2,
                    'Value' => 'http://www.dhl.dk/da/express/soeg_forsendelse.html?AWB=',
                ),

                array(
                    'Name' => 'Hidden',
                    'SettingID' => 11,
                    'Status' => 1,
                    'Type' => 900,
                    'Value' => '[],fmd',
                ),

                array(
                    'Name' => 'FMD Configuration',
                    'SettingID' => 12,
                    'Status' => 1,
                    'Type' => 901,
                    'Value' => '{"passphrase":null,"ClientLoginId":null,"UserId":null,"Password":null,"title":null}',
                ),

                array(
                    'Name' => 'Safe IP Mailing List',
                    'SettingID' => 13,
                    'Status' => 1,
                    'Type' => 902,
                    'Value' => 'kartikeshwar.patel@goodcareit.com, pragnesh.chauhan@goodcareit.com',
                ),

                array(
                    'Name' => 'Shipping Settings',
                    'SettingID' => 14,
                    'Status' => 1,
                    'Type' => 903,
                    'Value' => '{"preferred":"dpd","ups":{"endpoint":null,"shipperNumber":null,"shipperName":null,"licenseNumber":null,"password":null},"dpd":{"credentials":null,"accountNumber":null}}',
                ),
            )
        );
    }
}
