<?php
namespace App\Library;

use Illuminate\Support\Facades\DB;

// use Carbon\Carbon;

/**
 * Settings singleton
 */
class Setting
{
    /**
     * Get a single setting by ID
     *
     * @param int $id
     * @return object|null
     */
    public function getSetting($id)
    {
        return DB::table('Setting')->where('SettingID', $id)->first();
    }

    /**
     * Get all settings with a certain type
     *
     * @param integer $type
     * @return object|null
     */
    public function getSettings($type = 2)
    {
        $query = DB::table('Setting')->whereNotIn('Type', [900, 901, 902]);

        if ($type) {
            $query = $query->where('Type', $type);
        }

        return $query->get();
    }

    /**
     * Update settings
     *
     * @param array $settings
     * @return void
     */
    public function update($settings)
    {
        foreach ($settings as $id => $value) {
            $current = DB::table('Setting')->where('SettingID', $id)->value('Value');

            if ($value != $current) {
                DB::table('Setting')->where('SettingID', $id)->update([
                    'Value' => $value
                ]);
            }
        }
    }

    /**
     * Get company settings
     *
     * @return object|null
     */
    public function getCompanySettings()
    {
        $columns = [
            "ClientID",
            "CompanyName",
            "Title",
            "Name",
            "Middlename",
            "Surname",
            "Address1",
            "Address2",
            "Address3",
            "Address4",
            "Postcode",
            "CountryID",
            "Telephone",
            "Mobile",
            "Email",
            "CreditLimit",
            "IP",
            "Type",
            "Status",
            "Notes",
            "CompanyNumber",
            "GPHCNO",
            "ReturnURL",
            "Username",
            "Password",
            "APIKey",
            "ITName",
            "ITEmail",
            "TradingName",
            "AdditionalComment",
            "ReturnUsername",
            "ReturnPassword",
            "VAT"
        ];

        return DB::table('Client')->select($columns)->where('Type', 1)->where('Status', 1)->first();
    }

    /**
     * Update settings
     * Check if it is better to update or just duplicate the record
     *
     * @param array $settings
     * @return int
     */
    public function updateCompanySettings($settings)
    {
        return DB::table('Client')->where('ClientID', $settings['ClientID'])->update($settings);
    }
}