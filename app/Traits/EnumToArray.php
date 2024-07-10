<?php

namespace App\Traits;

trait EnumToArray
{
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function toArray(): array
    {
        return array_combine(self::values(), self::names());
    }

    /**
     * return matching name for values passed as an argument
     * @param array<int,int> $value
     * @return array<int,string>
     */
    public static function valuesInArray(array $value): array
    {
        $valArray = self::toArray();
        return array_intersect_key($valArray, array_flip($value));
    }

    /**
     * return matching value for the names passed as an argument
     * @param array<int,string> $names
     * @return array<string,int>
     */
    public static function namesInArray(array $names): array
    {
        $valArray = self::toArray();
        return array_flip(array_intersect($valArray, $names));
    }

    public static function getNameFromValue($value)
    {
        $names = self::names();
        return $names[$value];
    }

    public static function getValueByName($name)
    {
        $values = self::values();
        return $values[$name];
    }
}
