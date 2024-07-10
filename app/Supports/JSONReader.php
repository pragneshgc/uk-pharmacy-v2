<?php
namespace App\Supports;

use App\Contracts\FileReader;

class JSONReader implements FileReader
{
    protected array $errors = [];
    public function __construct(protected string $content)
    {
    }

    public function toArray(): array
    {
        return json_decode($this->content, true);
    }

    public function validate(): bool
    {
        json_decode($this->content);
        switch (json_last_error()) {
            case JSON_ERROR_NONE:
                $this->errors[] = ''; // JSON is valid // No error has occurred
                break;
            case JSON_ERROR_DEPTH:
                $this->errors[] = 'The maximum stack depth has been exceeded.';
                break;
            case JSON_ERROR_STATE_MISMATCH:
                $this->errors[] = 'Invalid or malformed JSON.';
                break;
            case JSON_ERROR_CTRL_CHAR:
                $this->errors[] = 'Control character error, possibly incorrectly encoded.';
                break;
            case JSON_ERROR_SYNTAX:
                $this->errors[] = 'Syntax error, malformed JSON.';
                break;
            // PHP >= 5.3.3
            case JSON_ERROR_UTF8:
                $this->errors[] = 'Malformed UTF-8 characters, possibly incorrectly encoded.';
                break;
            // PHP >= 5.5.0
            case JSON_ERROR_RECURSION:
                $this->errors[] = 'One or more recursive references in the value to be encoded.';
                break;
            // PHP >= 5.5.0
            case JSON_ERROR_INF_OR_NAN:
                $this->errors[] = 'One or more NAN or INF values in the value to be encoded.';
                break;
            case JSON_ERROR_UNSUPPORTED_TYPE:
                $this->errors[] = 'A value of a type that cannot be encoded was given.';
                break;
            default:
                $this->errors[] = 'Unknown JSON error occured.';
                break;
        }
        return json_last_error() === JSON_ERROR_NONE;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}