<?php
namespace App\Library;

/**
 * Undocumented class
 */
class Helper
{
    /**
     * Get headers for the CSV manual print endpoints
     *
     * @param int $id
     * @return array
     */
    public function manualPrintHeaders($id)
    {
        return [
            "Content-Type" => "data:text/csv;charset=utf-8,\uFEFF",
            "Content-Disposition" => "attachment; filename=$id.csv",
            "Pragma" => "no-cache",
            "Cache-Control" => "must-revalidate, post-check=0, pre-check=0",
            "Expires" => "0",
        ];
    }

    /**
     * Remove everything except numericals from a phone number
     *
     * @param string $n
     * @return string
     */
    public function formatPhone($n)
    {
        return preg_replace('/[^0-9]/', '', $n);
    }

    /**
     * Undocumented function
     *
     */
    public function hasNumber(string $string): int|false
    {
        return preg_match('~[0-9]~', $string);
    }

    /**
     * Undocumented function
     *
     * @param string $address1
     * @param string $address2
     * @param string $address3
     * @param string $address4
     * @param string $ups
     * @return array
     */
    public function cleanAddresses($address1, $address2, $address3, $address4, $ups): array
    {
        if ($address2 != "" && is_numeric($address1) && !is_numeric($address2)) {
            $address1 = $address1 . " " . $address2;
            $address2 = $address3;
            $address3 = $address4;
        } else if ($address2 != "" && !is_numeric($address1) && is_numeric($address2)) {
            $address1 = $address2 . " " . $address1;
            $address2 = $address3;
            $address3 = $address4;
        }
        ;

        if (!$ups && $address2 == "") {
            $address2 = $address3;
            $address3 = $address4;
        }
        ;

        if (!$ups && $address2 == "" && $address4 == "" && $address3 != "") {
            $address2 = $address2;
            $address3 = $address3;
        }
        ;

        if ($address2 == "" && $address3 == "" && $address4 != "") {
            $address2 = $address2;
            $address3 = $address4;
            $address4 = $address3;
        }
        ;

        if (!$ups && $address3 == "") {
            $address3 = $address4;
        }
        ;

        if ($ups && $address4 == "" && $address3 != "") {
            $address4 = $address3;
        }
        ;

        return [
            'address1' => str_replace(',', '', $address1),
            'address2' => str_replace(',', '', $address2),
            'address3' => str_replace(',', '', $address3),
            'address4' => str_replace(',', '', $address4)
        ];
    }
}