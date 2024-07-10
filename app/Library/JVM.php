<?php
namespace App\Library;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

/**
 * JVM
 */
class JVM
{
    /**
     * Generate and store the OCS file
     * Returns the file path
     *
     * @param int $id
     * @return string|boolean
     */
    public function generateOcs($id)
    {
        $ids = [];

        array_push($ids, $id);

        $text = '';

        foreach ($ids as $id) {
            $prescription = DB::table('Prescription AS p')->selectRaw('p.*, d.Name AS DName, d.Surname AS DSurname')
                ->where('PrescriptionID', $id)
                ->leftJoin('Doctor AS d', 'd.DoctorID', '=', 'p.DoctorID')
                ->first();
            $products = DB::table('Product AS p')
                ->select('p.Dosage', 'p.Instructions', 'pc.*', 'im.GTIN')
                ->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'p.Code')
                ->leftJoin('InventoryMatch AS im', 'im.ProductCodeID', '=', 'pc.ProductCodeID')
                ->where('PrescriptionID', $id)
                ->groupBy("p.ProductID")
                ->get();

            foreach ($products as $product) {
                $orderID = $prescription->PrescriptionID;
                $name = $prescription->Name . ' ' . $prescription->Surname;
                $mnemonic = $product->ProductCodeID;
                $instructions = $product->Instructions;
                $numberOfPouches = $product->Dosage;
                $tabletsPerPouch = 1;
                $barcode = $orderID . '-' . $product->ProductCodeID;
                $productName = $product->Name;

                $date = new \DateTime();
                $date = $date->format('Ymd');

                $dateEnd = new \DateTime();
                $dateEnd->add(new \DateInterval('P' . ($numberOfPouches - 1) . 'D'));
                $dateEnd = $dateEnd->format('Ymd');

                $text .= "$name;EveAdam;$mnemonic;$instructions;$numberOfPouches;$tabletsPerPouch;$orderID;$date;$dateEnd;08:00;$barcode;$productName";
            }
        }

        if (Storage::disk('local')->put("/ocs/$id.txt", $text)) {
            return $text;
        } else {
            return false;
        }
    }

    /**
     * Send the OCS file to the machine via FTP
     *
     */
    public function sendToMachine(int $id, string $text): bool
    {
        //fix this stupid thing
        $prescription = DB::table('Prescription AS p')->selectRaw('p.*')->where('PrescriptionID', $id)->first();

        return Storage::disk('ftp')->put("$id $prescription->Name $prescription->Surname.txt", $text);
    }

    /**
     * Return the status code for a prescription
     * 0 - unsent
     * 1 - pending
     * 2 - processed
     * 3 - failed
     *
     * @param int $id
     * @return int
     */
    public function status($id)
    {
        if (Storage::disk('ftp')->exists("$id.txt")) {
            return 1;
        } else if (Storage::disk('ftp')->exists("SUCCESS/$id.txt")) {
            return 2;
        } else if (Storage::disk('ftp')->exists("FAIL/$id.txt")) {
            return 3;
        }

        return 0;
    }
}