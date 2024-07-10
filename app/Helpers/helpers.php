<?php

use Carbon\Carbon;
use App\Library\Doctor;
use App\Models\PrescriptionFile;
use Illuminate\Support\Str;
use App\Services\CustomerIO;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

if (!function_exists('base64Signature')) {
    /**
     * Get Base64 encoded signature image
     *
     * @param int $id doctor id
     * @param int|null $prescriptionID
     * @return string|false
     */
    function base64Signature($id, $prescriptionID)
    {
        $path = '';
        $extension = 'png';

        $doctor = new Doctor();

        /** @var \App\Models\Attachment $signature */
        $signature = $doctor->getSignature($id, $prescriptionID);

        if (isAzureStorageEnabled()) {
            if ($signature && Storage::disk('azure')->exists("signatures/$signature->Filename")) {
                $url = Storage::disk('azure')->url("signatures/$signature->Filename");
            } else if (Storage::disk('azure')->exists("signatures/DOC-$id.png")) {
                $path = Storage::disk('azure')->url("signatures/DOC-$id.png");
            } else if (Storage::disk('azure')->exists("/signatures/DOC-$id.jpg")) {
                $path = Storage::disk('azure')->url("signatures/DOC-$id.jpg");
                $extension = 'jpg';
            }
            if (!empty($url)) {
                return URLToBase64($url);
            }
        }

        if ($signature && Storage::exists("/signatures/$signature->Filename")) {
            $path = Storage::path("/signatures/$signature->Filename");
            $pathInfo = pathinfo($path);
            $extension = $pathInfo['extension'];
        } else {
            if (Storage::exists("/signatures/DOC-$id.png")) {
                $path = Storage::path("/signatures/DOC-$id.png");
            } else if (Storage::exists("/signatures/DOC-$id.jpg")) {
                $path = Storage::path("/signatures/DOC-$id.jpg");
                $extension = 'jpg';
            }
        }

        try {
            if (!empty($path)) {
                $img = file_get_contents($path);
                return "data:image/$extension;base64," . str_replace("\n", "", base64_encode($img));
            }
        } catch (\Throwable $th) {
            return false;
        }
        return false;
    }
}

if (!function_exists('sendResponse')) {
    /**
     * Success response method.
     *
     * @return JsonResponse
     */
    function sendResponse($result, $message = '', $success = true): JsonResponse
    {
        $response = [
            'success' => $success,
            'data' => $result,
            'message' => $message,
        ];

        return response()->json($response, 200);
    }
}

if (!function_exists('sendError')) {
    /**
     * Return error response.
     *
     * @return JsonResponse
     */
    function sendError($errors, $errorMessages = [], $code = 404): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $errors,
        ];

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response()->json($response, $code);
    }
}

if (!function_exists('base64Image')) {
    function base64Image($path)
    {
        $extension = 'png';

        $path = public_path($path);
        $pathInfo = pathinfo($path);
        $extension = $pathInfo['extension'];

        try {
            $img = file_get_contents($path);
        } catch (\Throwable $th) {
            $img = '';
        }
        return "data:image/$extension;base64," . base64_encode($img);
    }
}

if (!function_exists('findEmptyInArray')) {
    function findEmptyInArray($array)
    {
        $emptyList = [];
        if (!empty($array)) {
            foreach ($array as $k => $arr) {
                if (empty($arr)) {
                    $emptyList[] = $k;
                }
            }
        }
        return $emptyList;
    }
}

if (!function_exists('removeFromArray')) {
    function removeFromArray($array, $remove)
    {
        if (empty($array) || empty($remove)) {
            return [];
        }

        $newArr = [];

        foreach ($array as $arr) {
            if (!in_array($arr, $remove)) {
                $newArr[] = $arr;
            }
        }

        if (!empty($newArr)) {
            foreach ($remove as $r) {
                if (Str::contains($r, '.*')) {
                    $key = Str::remove('.*', $r);
                    foreach ($newArr as $k => $arr) {
                        if (Str::contains($arr, $key)) {
                            unset($newArr[$k]);
                        }
                    }
                }
            }
        }
        return $newArr;
    }
}

if (!function_exists('validateArrayWithRequired')) {
    /**
     * Validate array with required keys
     * @param array $list
     * @param array $required
     * @return array
     */
    function validateArrayWithRequired(array $list, array $required): array
    {
        $error = [];

        if (!empty($required)) {
            foreach ($required as $k => $val) {
                if (!isset($list[$val])) {
                    $error[] = $val;
                } else if (empty($list[$val])) {
                    $error[] = $val;
                }
            }
        }
        return $error;
    }
}

if (!function_exists('moneyFormat')) {
    /**
     * Convert Amount to String with Currency
     * eg: 10 => $10 / 10 => £10
     *
     * @param mixed $amount
     * @param string $currency
     * @return string
     */
    function moneyFormat(mixed $amount, string $currency = ''): string
    {
        if (empty($currency)) {
            $currency = config('app.currency');
        }

        return $currency . $amount;
    }
}

if (!function_exists('downloadRemoteFile')) {
    /**
     * download remote file
     *
     * @param string $path
     * @param string $fileName
     * @param string $disk
     * @return Symfony\Component\HttpFoundation\BinaryFileResponse
     */
    function downloadRemoteFile(string $path, string $fileName = '', string $disk = 'azure')
    {
        $url = Storage::disk($disk)->url($path);

        $fileName = !empty($fileName) ? $fileName : basename($path);
        $tempImage = tempnam(sys_get_temp_dir(), $fileName);
        copy($url, $tempImage);

        return response()->download($tempImage, $fileName);
    }
}

if (!function_exists('URLToBase64')) {
    /**
     * convert URL to base64 string
     *
     * @param string $url
     * @return string
     */
    function URLToBase64($url)
    {
        $path = strtok($url, "?");
        $base64 = base64_encode(file_get_contents($url));
        $type = pathinfo($path, PATHINFO_EXTENSION);

        return 'data:image/' . $type . ';base64,' . $base64;
    }
}

if (!function_exists('saveToStorage')) {
    /**
     * Store file to Remote storage if configured otherwise store to local storage.
     *
     * @param string $filename
     * @param Illuminate\Http\File|Illuminate\Http\UploadedFile|Psr\Http\Message\StreamInterface|resource|string $contents,
     * @param string $filename name of file to store on server
     * @param string $disk default 'azure'
     * @return bool
     */
    function saveToStorage(string $path, $contents, string $filename, $id = 0, string $disk = 'azure')
    {
        $filePath = $path . $filename;
        $fileType = pathinfo($filename, PATHINFO_EXTENSION);
        PrescriptionFile::create([
            'prescription_id' => $id,
            'file_path' => $filePath,
            'file_type' => $fileType
        ]);
        if (isAzureStorageEnabled() && $disk == 'azure') {
            return Storage::disk('azure')->put($filePath, $contents);
        }
        return Storage::put($filePath, $contents);
    }
}

if (!function_exists('getXMLFromStorage')) {
    function getXMLFromStorage(string $filename, $disk = 'azure')
    {
        if (isAzureStorageEnabled() && $disk == 'azure') {
            $files = Storage::disk('azure')->allFiles('xml/');
            $matchFiles = collect(preg_grep("/{$filename}/i", $files));
            return $matchFiles->first();
        } else {
            $files = File::glob(storage_path() . "/app/public/xml/$filename*.xml");
            if (count($files) > 0) {
                return $files[0];
            }
        }
        return false;
    }
}

if (!function_exists('getJSONFromStorage')) {
    function getJSONFromStorage(string $filename, $disk = 'azure')
    {
        if (isAzureStorageEnabled() && $disk == 'azure') {
            $files = Storage::disk('azure')->allFiles('json/');
            $matchFiles = collect(preg_grep("/{$filename}/i", $files));
            return $matchFiles->first();
        } else {
            $files = File::glob(storage_path() . "/app/public/json/$filename*.json");
            if (count($files) > 0) {
                return $files[0];
            }
        }
        return false;
    }
}

if (!function_exists('isAzureStorageEnabled')) {
    /**
     * Check if azure storage enabled or not
     *
     * @return boolean
     */
    function isAzureStorageEnabled()
    {
        return config('filesystems.disks.azure.key') != '' ? true : false;
    }
}

if (!function_exists('isPackContainsFridgeProduct')) {
    /**
     * Check if Pack Order contains Fridge product or not
     *
     * @param string $pack_code
     * @return boolean
     */
    function isPackContainsFridgeProduct(string $pack_code): bool
    {
        return DB::table('ProductCode as pc')
            ->select('pc.Fridge')
            ->join('PackProduct as pp', 'pp.ProductCode', '=', 'pc.Code')
            ->where('pp.Code', $pack_code)
            ->where('pc.Fridge', 1)
            ->exists();
    }
}


if (!function_exists('getEmailPhoneFromXML')) {
    function getEmailPhoneFromXML($id)
    {
        $data = [];
        $file = getXMLFromStorage($id);
        if ($file) {
            try {
                if (isAzureStorageEnabled()) {
                    $xmlContent = Storage::disk('azure')->get($file);
                } else {
                    $xmlContent = File::get($file);
                }

                $xml = simplexml_load_string($xmlContent);
                $data['email'] = (string)$xml->PatientDetail->Patient->Email;
                $data['Telephone'] = (string)$xml->PatientDetail->Patient->Telephone;
                $data['Mobile'] = (string)$xml->PatientDetail->Patient->Mobile;

                return $data;
            } catch (\Exception $e) {
                //Log::channel('daily')->error("Exception: " . $e->getMessage());
                return response()->json($e->getMessage());
            }
        }
    }
}

if (!function_exists('getEmailPhoneFromJSON')) {
    function getEmailPhoneFromJSON($id)
    {
        $data = [];
        $file = getJSONFromStorage($id);
        if ($file) {
            try {
                if (isAzureStorageEnabled()) {
                    $jsonContent = Storage::disk('azure')->get($file);
                } else {
                    $jsonContent = File::get($file);
                }

                $jsonData = json_decode($jsonContent);
                
                $data['email'] = isset($jsonData->PatientDetail->Patient->Email) ? $jsonData->PatientDetail->Patient->Email : '';
                $data['Telephone'] = isset($jsonData->PatientDetail->Patient->Telephone) ? $jsonData->PatientDetail->Patient->Telephone : '';
                $data['Mobile'] = isset($jsonData->PatientDetail->Patient->Mobile) ? $jsonData->PatientDetail->Patient->Mobile : '';

                return $data;
            } catch (\Exception $e) {              
                return response()->json($e->getMessage());
            }
        }
    }
}




// Check if the given client ID indicates JSON usage
if (!function_exists('isJSONClient')) {
    function isJSONClient($clientID)
    {
        $jsonClients[] = env('JSON_CLIENTS');
        return in_array($clientID, $jsonClients);
    }
}

if (!function_exists('sendCustomerIOMail')) {
    /**
     * send email using customer.io
     *
     * @param string $email
     * @param string $eventName
     * @param array $data
     * @return mixed
     */
    function sendCustomerIOMail(string $email, string $eventName, array $data)
    {
        $customerio = new CustomerIO();
        $url = "https://track.customer.io/api/v1/customers/" . $email . "/events";
        return $customerio->setURL($url)
            ->setEvent($eventName)
            ->setData($data)
            ->send();
    }
}

if (!function_exists('string_join')) {
    /**
     * remove whitespace and join array by separator
     *
     * @param array $arr
     * @param string $separator default ' '
     * @return string
     */
    function string_join(array $arr, string $separator = ' '): string
    {
        $arr = array_filter(array_map('trim', $arr));
        return join($separator, $arr);
    }
}

if (!function_exists('convertTimestamp')) {
    /**
     * convert timestamp to current timezone format
     *
     * @param string $timestamp
     * @param string $format
     * @return string
     */
    function convertTimestamp(string $timestamp, string $format): string
    {
        return Carbon::createFromTimestamp($timestamp, config('app.timezone'))->format($format);
    }
}

if (!function_exists('getAllFrequency')) {
    function getAllFrequency(): array
    {
        $frequencies = [
            'Week' => 'Every Week',
            'Two Weeks' => 'Every 2 Weeks',
            'Three Weeks' => 'Every 3 Weeks',
            'Month' => 'Every Month',
            'Two Months' => 'Every 2 Months',
            'Quarter' => 'Every 3 Months',
            'Four Months' => 'Every 4 Months',
            'Semi-Annual' => 'Every 6 Months',
            'Nine Months' => 'Every 9 Months',
            'Annual' => 'Every 12 Months',
            'One Off' => 'One Time',
        ];
        return $frequencies;
    }
}

if (!function_exists('getFrequency')) {
    function getFrequency(string $frequency): string
    {
        $frequencies = getAllFrequency();
        return $frequencies[$frequency] ?? '';
    }
}
