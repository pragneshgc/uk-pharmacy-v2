<?php

namespace App\Helpers;

use SimpleXMLElement;
use App\Supports\XMLReader;
use Illuminate\Support\Str;
use App\Supports\JSONReader;
use Illuminate\Support\Collection;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;

class Generic
{
    public static function getIP()
    {
        if (getenv('HTTP_CLIENT_IP'))
            $ipaddress = getenv('HTTP_CLIENT_IP');
        else if (getenv('HTTP_X_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
        else if (getenv('HTTP_X_FORWARDED'))
            $ipaddress = getenv('HTTP_X_FORWARDED');
        else if (getenv('HTTP_FORWARDED_FOR'))
            $ipaddress = getenv('HTTP_FORWARDED_FOR');
        else if (getenv('HTTP_FORWARDED'))
            $ipaddress = getenv('HTTP_FORWARDED');
        else if (getenv('REMOTE_ADDR'))
            $ipaddress = getenv('REMOTE_ADDR');
        else
            $ipaddress = request()->ip();

        if (Str::contains($ipaddress, ':')) {
            $ip = explode(':', $ipaddress);
            $ipaddress = $ip[0];
        }

        return $ipaddress;
    }

    public static function readFile($content, $type): array
    {
        $reader = match ($type) {
            "application/xml" => new XMLReader($content),
            "application/json" => new JSONReader($content),
            default => new XMLReader($content)
        };

        if ($reader->validate()) {
            return [
                'data' => $reader->toArray(),
                'error' => []
            ];
        } else {
            return [
                'data' => [],
                'error' => $reader->getErrors()
            ];
        }
    }

    public static function arrayToObject($array)
    {
        return json_decode(json_encode($array), FALSE);
    }

    public static function objectToArray($object)
    {
        return json_decode(json_encode($object), TRUE);
    }

    public static function matchLanguageMapping($needle, $language = true)
    {
        $map = [
            '1' => 'ENU',
            '2' => 'ENU',
            '15' => 'ENU',
            '58' => 'CES',
            '59' => 'DAN',
            '83' => 'DEU',
            '86' => 'ELL',
            '69' => 'EST',
            '74' => 'FIN',
            '75' => 'FRA',
            '106' => 'HEB',
            '99' => 'HUN',
            '107' => 'ITA',
            '119' => 'LAV',
            '125' => 'LIT',
            '152' => 'NLD',
            '162' => 'NOR',
            '172' => 'POL',
            '173' => 'POR',
            '177' => 'RON',
            '178' => 'RUS',
            '191' => 'SLK',
            '192' => 'SLV',
            '196' => 'SPE',
            '204' => 'SWE',
            '216' => 'TUR',
        ];

        foreach ($map as $key => $value) {
            if ((int) $key == $needle && $language) {
                return $value;
            } else if ($value == $needle && !$language) {
                return (int) $key;
            }
        }

        return $language ? 'ENU' : 1;
    }

    public static function arrayToXml(array $arr, SimpleXMLElement $xml)
    {
        foreach ($arr as $k => $v) {

            $attrArr = array();
            $kArray = explode(' ', $k);
            $tag = array_shift($kArray);

            if (count($kArray) > 0) {
                foreach ($kArray as $attrValue) {
                    $attrArr[] = explode('=', $attrValue);
                }
            }

            if (is_array($v)) {
                if (is_numeric($k)) {
                    self::arrayToXml($v, $xml);
                } else {
                    $child = $xml->addChild($tag);
                    if (!empty($attrArr)) {
                        foreach ($attrArr as $attrArrV) {
                            $child->addAttribute($attrArrV[0], $attrArrV[1]);
                        }
                    }
                    self::arrayToXml($v, $child);
                }
            } else {
                $child = $xml->addChild($tag, $v);
                if (!empty($attrArr)) {
                    foreach ($attrArr as $attrArrV) {
                        $child->addAttribute($attrArrV[0], $attrArrV[1]);
                    }
                }
            }
        }

        return $xml->asXML();
    }

    public static function hasAllElements(array $search, array $arr): bool
    {
        if (empty($search) || empty($arr)) {
            return false;
        }

        $result = array_intersect($search, $arr);
        return count($result) === count($arr);
    }

    public static function paginate($items, $perPage = 5, $page = null, $options = [])
    {
        $page = $page ?: Paginator::resolveCurrentPage();
        $items = Collection::make($items);
        $result = $items->slice(($page - 1) * $perPage, $perPage)->values();
        return new LengthAwarePaginator($result, $items->count(), $perPage, $page, $options);
    }
}
