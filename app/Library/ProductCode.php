<?php
namespace App\Library;

use Illuminate\Support\Facades\DB;

/**
 * Undocumented class
 */
class ProductCode
{
    /**
     * Get a list of pharmacists, except the currently authenticated one
     *
     * @return \Illuminate\Support\Collection
     */
    public function getProducts($input): \Illuminate\Support\Collection
    {
        $data = DB::table('ProductCode')->selectRaw("ProductCode.ProductCodeID, ProductCode.Code,
        CONCAT(ProductCode.Name, ' (',ProductCode.Quantity,' ', ProductCode.Units,')', ' - ', ProductCode.Code) AS Name")
            ->where('Type', '1')->orderBy('Name', 'ASC');

        if (isset($input->filter)) {
            $data = $data->where("ProductCode.Name", "LIKE", "%$input->filter%");
        }

        return $data->get();
    }
}