<?php
namespace App\Contracts;

interface FileReader
{
    public function validate(): bool;
    public function toArray(): array;
    public function getErrors(): array;
}