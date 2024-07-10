<?php

namespace App\Library;

use App\Models\Pricing;
use App\Models\Productcode;
use GuzzleHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;

class Product
{
    /**
     * Undocumented function
     *
     * @param mixed $filters
     * @return \Illuminate\Support\Collection
     */
    public function getProducts($filters)
    {
        $columns = [
            "pc.ProductCodeID",
            "pc.Code",
            "pc.Name",
            "pc.Quantity",
            "pc.Units",
            "pc.Status",
            "pc.JVM AS Pouchable",
            "pc.ProductType AS Product Type",
            "pc.Pack AS Package",
            "pc.OTC AS Reclassification",
            "pc.Fridge",
            "pc.TariffCode",
            "p.Price"
        ];

        $data = DB::table('ProductCode AS pc')->select($columns)->leftJoin('Pricing AS p', 'p.Code', '=', 'pc.Code');

        if (isset($filters->letter) && $filters->letter != 'all') {
            $data = $data->whereRaw("pc.Name REGEXP '^[$filters->letter].*$'");
        }

        if (isset($filters->letter) && $filters->letter == 'number') {
            $data = $data->whereRaw("pc.Name not regexp '[^A-Za-z]'");
        }

        if (isset($filters->name) && $filters->name != '') {
            $data = $data->whereRaw("pc.Name LIKE CONCAT('%', ?, '%')", [$filters->name]);
        }

        if (isset($filters->code) && $filters->code != '') {
            $data = $data->whereRaw("pc.Code LIKE CONCAT('%', ?, '%')", [$filters->code]);
        }

        if (isset($filters->pouchable) && $filters->pouchable != 'all') {
            switch ($filters->pouchable) {
                case 0:
                    $data = $data->where('pc.JVM', 0);
                    break;
                case 1:
                    $data = $data->where('pc.JVM', 1);
                    break;
                case 2:
                    $data = $data->where('pc.JVM', 2);
                    break;
                case 'all':
                    break;
                default:
                    break;
            }
        }

        if (isset($filters->company)) {
            switch ($filters->company) {
                case 'DISCONTINUED':
                    $data = $data->where('pc.Status', 2);
                    break;
                case 'INACTIVE':
                    $data = $data->where('pc.Status', 0);
                    break;
                case 'NOTPRICED':
                    $data = $data->where('pc.Status', 1)->where('p.ClientID', NULL);
                    break;
                default:
                    $data = $data->where('pc.Status', 1)->where('p.ClientID', $filters->company);
                    break;
            }
        }

        if (isset($filters->fridge)) {
            if ($filters->fridge != 'all') {
                $data = $data->where('pc.Fridge', $filters->fridge);
            }
        }

        if (isset($filters->package)) {
            if ($filters->package != 'all') {
                $data = $data->where('pc.Pack', $filters->package);
            }
        }

        if (isset($filters->type)) {
            if ($filters->type != 'all') {
                $data = $data->where('pc.ProductType', $filters->type);
            }
        }

        if (isset($filters->fdb)) {
            if ($filters->fdb == '1') {
                $data = $data->where('pc.FDBID', '=', '0');
            } else if ($filters->fdb == '2') {
                $data = $data->where('pc.FDBID', '!=', '0');
            }
        }

        if (isset($filters->reclassification)) {
            if ($filters->reclassification != 'all') {
                $data = $data->where('pc.OTC', $filters->reclassification);
            }
        }

        return $data->where('pc.Type', 1)->groupBy("pc.ProductCodeID")->orderBy('pc.Name', 'ASC')->get();
    }

    /**
     * Format ProductCode entries for frontend display
     *
     * @param object $data
     * @return object
     */
    public function formatProducts($data)
    {
        foreach ($data as $value) {
            // if(isset($value->Name) && isset($value->Quantity) && isset($value->Units)){
            //     $value->Name = "$value->Name<br><b>$value->Quantity $value->Units</b>";
            //     unset($value->Quantity);
            //     unset($value->Units);
            // }

            if (isset($value->{'Print Instruction'})) {
                $value->{'Print Instruction'} = $value->{'Print Instruction'} == 1 ? 'Yes' : 'No';
            }

            if (isset($value->Price)) {
                $value->Price = '£ ' . number_format((float) $value->Price, 2, '.', ',');
            }

            if (isset($value->Reclassification)) {
                $value->Reclassification = $value->Reclassification == 0 ? 'POM' : 'P';
            }

            if (isset($value->Fridge)) {
                $value->Fridge = $value->Fridge == 0 ? 'No' : 'Yes';
            }

            if (isset($value->Pouchable)) {
                switch ($value->Pouchable) {
                    case 0:
                        $value->Pouchable = 'Manual';
                        break;
                    case 1:
                        $value->Pouchable = 'Always Enabled';
                        break;
                    case 2:
                        $value->Pouchable = 'Always Disabled';
                        break;
                    default:
                        break;
                }
            }

            if (isset($value->Package)) {
                $value->Package = $value->Package == 0 ? 'Single' : 'Package';
            }

            if (isset($value->VAT)) {
                $value->VAT = $value->VAT . '%';
            }

            if (isset($value->{'Product Type'})) {
                $value->{'Product Type'} = $value->{'Product Type'} == 1 ? 'Medicine' : 'Test Kit';
            }

            if (isset($value->ClientID)) {
                $name = DB::table('Client')->where('ClientID', $value->ClientID)->value('CompanyName');

                $value->ClientID = $value->ClientID == 0 ? 'DEFAULT' : $name;
            }
        }

        return $data;
    }

    public function getProduct($id)
    {
        return DB::table('ProductCode')->where('ProductCodeID', $id)->first();
    }

    /**
     * Undocumented function
     *
     * @return \Illuminate\Support\Collection
     */
    public function productList()
    {
        return DB::table('ProductCode AS pc')
            ->select(["pc.ProductCodeID", "pc.Name", "pc.Type", "pc.Quantity", "pc.Code"])
            ->orderBy('pc.Name')
            ->get();
    }

    /**
     * Undocumented function
     *
     * @param int $id
     * @return \Illuminate\Support\Collection|array
     */
    public function priceList($id)
    {
        $product = DB::table('ProductCode')->select(['Pack', 'Code'])->where('ProductCodeID', $id)->get();

        if ($product->isEmpty()) {
            return [];
        }

        if ($product->first()->Pack != 1) {
            $data = DB::table('Pricing AS p')->select(['p.PricingID', 'p.Code', 'p.ClientID', 'p.Price', 'p.Price as UnformattedPrice', 'p.Quantity', 'pc.Units', 'pc.TariffCode', 'pc.VAT'])
                ->leftJoin('ProductCode AS pc', 'pc.Code', '=', 'p.Code')
                ->leftJoin('Client AS cl', 'cl.ClientID', '=', 'p.ClientID')
                ->where('pc.ProductCodeID', $id)->where('p.Status', 1)->whereRaw("(cl.Status = 1 OR cl.Status IS NULL)")
                ->orderBy('p.ClientID')->get();
        } else {
            $data = DB::table('PackProduct')
                ->select(['PackProductID', 'Code', 'Description', 'Dosage AS Quantity', 'Unit', 'ProductCode', 'Instruction AS Print Instruction', 'Status'])
                ->where('Code', $product->first()->Code)
                ->orderBy('Order', 'ASC')
                ->get();
        }

        return $data;
    }

    /**
     * Undocumented function
     *
     * @param mixed $id
     * @return int
     */
    public function delete($id)
    {
        return DB::table('ProductCode')->where('ProductCodeID', $id)->update(['Status' => '0']);
    }

    /**
     * Undocumented function
     *
     */
    public function deletePricing($id): int
    {
        return DB::table('Pricing')->where('PricingID', $id)->delete();
    }

    /**
     * Undocumented function
     *
     */
    public function deletePackProduct($id): int
    {
        return DB::table('PackProduct')->where('PackProductID', $id)->delete();
    }

    /**
     * Undocumented function
     *
     * @param array $input
     * @return bool
     */
    public function savePackProduct($input)
    {
        $productCode = DB::table('ProductCode')->where('ProductCodeID', $input['Description'])->first();

        $input['Description'] = $productCode->Name;
        $input['Unit'] = $productCode->Units;
        $input['ProductCode'] = $productCode->Code;

        return DB::table('PackProduct')->insert($input);
    }

    /**
     * Fetches a list of delivery companies from the Setting table
     *
     * @return \Illuminate\Support\Collection
     */
    public function getDeliveryCompanies()
    {
        return DB::table('Setting')->where('Type', 2)->get();
    }

    /**
     * Fetches a list of clients
     *
     * @return \Illuminate\Support\Collection
     */
    public function getClients()
    {
        return DB::table('Client')->where('Status', 1)->get();
    }

    /**
     * Undocumented function
     *
     * @param mixed $id
     * @return int
     */
    public function reactivate($id)
    {
        return DB::table('ProductCode')->where('ProductCodeID', $id)->update(['Status' => '1']);
    }

    /**
     * Undocumented function
     *
     */
    public function addProduct($input): int
    {
        $input['Type'] = 1;

        Pricing::create([
            'Code' => $input['Code'],
            'Price' => $input['Price'],
            'ClientID' => 0,
            'Type' => 1,
            'Status' => 1,
            'Quantity' => $input['Quantity'],
        ]);

        unset($input['Price']);

        $Productcode = Productcode::create($input);
        return $Productcode->ProductCodeID;
    }

    /**
     * Update a product via input
     *
     * @param int $id
     * @param array $input
     * @return int
     */
    public function updateProduct($id, $input)
    {
        $code = DB::table('ProductCode')->where('ProductCodeID', $id)->value('Code');

        DB::table('Pricing')->where('Code', $code)->update([
            'Code' => $input['Code'],
            'Quantity' => $input['Quantity'],
        ]);

        return DB::table('ProductCode')->where('ProductCodeID', $id)->update($input);
    }

    /**
     * Undocumented function
     *
     * @param mixed $request
     * @return bool
     */
    public function addProductPricing($request)
    {
        return DB::table('Pricing')->insert(
            [
                'Code' => $request->productCode['Code'],
                'ClientID' => $request->pricing['client'],
                'Price' => $request->pricing['price'],
                'Type' => $request->productCode['Type'],
                'Status' => 1,
                'Quantity' => $request->productCode['Quantity'],
            ]
        );
    }

    /**
     * Import a product from the FDB database if the product exists
     *
     * @param string $type
     * @param string $code
     * @param boolean $size
     * @return bool
     */
    public function importProduct($type, $code, $size = false)
    {
        $product = $this->getProductDetails($type, $code);

        if (!$product) {
            return false; //product not found
        }

        //get the product details
        $product = json_decode($product);
        $details = false;
        $pack = false;
        $code = 'FDB';
        // $codeSuffix = '';
        $packArray = false;

        //import the product
        if (count($product->data) > 1) {
            $details = $product->data[0]->Product; //for now this
        } else if (count($product->data) == 0) {
            return false;
        } else {
            $details = $product->data[0]->Product;
        }

        if ($product->data[0]->Drug->DrugClass == 'Brand') {
            $packArray = $product->data[0]->DispensablePacks;
        } else {
            $packArray = $product->data[0]->RelatedPacks;
        }

        if (count($packArray) == 0) {
            return false;
        }

        if ($size) {
            foreach ($packArray as $DispensablePack) {
                if ($size >= $DispensablePack->PackSize) {
                    $pack = $DispensablePack;
                }
            }
        } else {
            if (count($packArray) > 0) {
                foreach ($packArray as $DispensablePack) {
                    if ($type == 'pip' && $DispensablePack->PIPCode == $code) {
                        $pack = $DispensablePack;
                    } else if ($type == 'ean' && $DispensablePack->EANCode == $code) {
                        $pack = $DispensablePack;
                    }
                }
            }
        }

        if (!$pack) {
            $pack = $packArray[0];
        }

        if (!$details || !$pack)
            return false;

        //setup the product code
        $newProductCode = [
            'Code' => $code . $details->SingleId . '/' . $pack->PackSize,
            //prefix all the SingleIds with FDB so we know which ones are which
            'Name' => $details->PrimaryPreferredName,
            'FDBID' => $product->data[0]->_id->{'$oid'},
            'Type' => 1,
            'Status' => 1,
            'Quantity' => (int) $pack->PackSize,
            'Units' => ucfirst($details->Formulation),
            'Fridge' => $details->KnownFridgeLine ? 1 : 0,
            'OTC' => 0,
            //over the counter POM (0) OR P (1)
            'Pack' => 0,
            'VAT' => 20,
            'ProductType' => 1,
            //1 - medicine, 2 - test kit
            'TariffCode' => 0, //which one
        ];

        $result = DB::table('ProductCode')->insert($newProductCode);

        return $result;
    }

    /**
     * Query the FDB database for product details
     *
     * @param string $type
     * @param string $code
     * @return string
     */
    public function getProductDetails($type, $code)
    {
        $uri = "https://api.4smconsulting.co.uk/fdb/import/code?$type=$code";

        $options = [
            'base_uri' => $uri,
            'headers' => [
                'Content-Type' => 'text/xml; charset=UTF8',
                'Accept' => 'application/json',
                'Authorization' => config('services.fdb.key'),
            ],
        ];

        $http = new GuzzleHttp\Client($options);

        $response = $http->request('POST', '', $options)->getBody()->getContents();

        return $response;
    }

    /**
     * Undocumented function
     *
     * @param mixed $request
     * @return bool|string
     */
    public function fdbProductsList($request)
    {
        $page = 1;
        $limit = 10;
        $q = '';

        if (isset($request->page)) {
            $page = $request->page;
        }

        if (isset($request->q)) {
            $q = $request->q;
        }

        if (isset($request->limit)) {
            $limit = $request->limit;
        }


        $uri = "https://api.4smconsulting.co.uk/fdb?page=$page&q=$q&limit=$limit";

        $options = [
            'base_uri' => $uri,
            'headers' => [
                'Content-Type' => 'text/xml; charset=UTF8',
                'Accept' => 'application/json',
                'Authorization' => config('services.fdb.key'),
            ],
        ];

        $http = new GuzzleHttp\Client($options);

        $response = $http->request('GET', '', $options)->getBody()->getContents();

        $response = json_decode($response);

        $response->data->data = $this->formatFDBResult($response->data->data);

        return json_encode($response);
    }

    /**
     * Undocumented function
     *
     * @param mixed $data
     * @return object
     */
    public function formatFDBResult($data)
    {
        foreach ($data as $key => $value) {
            $newValue = [
                'FDB ID' => $value->_id->{'$oid'},
                'Product Name' => $value->Product->PrimaryPreferredName,
                'Product ID' => $value->Product->SingleId,
                'Legal Category' => $value->Product->LegalCategory,
                'Fridge' => $value->Product->KnownFridgeLine,
                'Pack Names' => [],
                'Pack Barcodes' => [],
                'Pack PIP Codes' => [],
                'Pack Sizes' => [],
                'Pack Units' => [],
            ];

            foreach ($value->DispensablePacks as $pack) {
                $newValue['Pack Names'][] = $pack->PrimaryPreferredName;
                $newValue['Pack Barcodes'][] = $pack->EANCode;
                $newValue['Pack PIP Codes'][] = $pack->PIPCode;
                $newValue['Pack Sizes'][] = $pack->PackSize;
                $newValue['Pack Units'][] = $pack->PackUnit;
            }

            $newValue['Pack Names'] = implode(',', $newValue['Pack Names']);
            $newValue['Pack Barcodes'] = implode(',', $newValue['Pack Barcodes']);
            $newValue['Pack PIP Codes'] = implode(',', $newValue['Pack PIP Codes']);
            $newValue['Pack Sizes'] = implode(',', $newValue['Pack Sizes']);
            $newValue['Pack Units'] = implode(',', $newValue['Pack Units']);

            $data[$key] = (object) $newValue;
        }

        return $data;
    }

    /**
     * Import products from prescription XML's
     */
    public function importProductFromXML($id, \SimpleXMLElement $xml): array
    {
        $errors = [];
        $products = $xml->Prescription->Product;

        DB::table('Product')->where('PrescriptionID', $id)->delete();
        //reenable this for royal mail orders
        $prescription = DB::table('Prescription')->select(['CustomerID', 'ClientID', 'ReferenceNumber'])->where('PrescriptionID', $id)->first();
        $isFridgeOrder = false;

        for ($i = 0; $i < count($products); $i++) {
            //check if a product is package
            $product = DB::table('ProductCode')->where('Code', trim($products[$i]->ProductCode))->first();

            //SAFETY CHECK FOR PRODUCTS
            if ($product->Status == 2 || $product->Status == 0) {
                $description = $products[$i]->Description;
                $productCode = $products[$i]->ProductCode;
                $productStatus = $product->Status == 2 ? 'DISCONTINUED' : 'INACTIVE';
                array_push($errors, "<span class=\"highlight_red\">********* PRESCRIPTION CONTAINTS DRUG $description (CODE: $productCode) THAT IS $productStatus **********</span>");
            }

            $accessPoint = strtoupper($xml->PatientDetail->Patient->UPSAccessPointDelivery) == 'N'
                ? 0
                : (strtoupper($xml->PatientDetail->Patient->UPSAccessPointDelivery) == 'Y' ? 1 : 0);

            if ($accessPoint && $product->Fridge == 1) {
                array_push($errors, "<span class=\"highlight_red\">********* A FRIDGE ITEM GOING TO UPS ACCESS POINT**********</span>");
            }

            if ($product->Fridge == 1) {
                $isFridgeOrder = true;
            }

            if ($product->Pack == 1) {
                //only add enabled products for the pack
                $pack = DB::table('PackProduct')->where('Code', trim($products[$i]->ProductCode))
                    ->orderBy('Order', 'DESC')
                    ->orderBy('PackProductID', 'DESC')
                    ->where('Status', 1)->get();

                foreach ($pack as $packProduct) {
                    $productToInsert = [
                        'PrescriptionID' => $id,
                        'GUID' => $products[$i]->Guid,
                        'Code' => $packProduct->ProductCode,
                        'Description' => $packProduct->Description,
                        'Quantity' => $packProduct->Quantity,
                        'Unit' => $packProduct->Unit,
                        'Dosage' => $packProduct->Dosage,
                    ];

                    if ($packProduct->Instruction == 1) {
                        $productToInsert['Instructions'] = $products[$i]->Instructions;
                        $productToInsert['Instructions2'] = $products[$i]->Instructions2;
                    }

                    DB::table('Product')->insert($productToInsert);
                }
            } else {
                DB::table('Product')->insert([
                    'PrescriptionID' => $id,
                    'GUID' => trim($products[$i]->Guid),
                    'Code' => trim($products[$i]->ProductCode),
                    'Description' => $products[$i]->Description,
                    'Instructions' => $products[$i]->Instructions,
                    'Instructions2' => $products[$i]->Instructions2,
                    'Quantity' => $products[$i]->ProductQuantity->Quantity,
                    'Unit' => $products[$i]->ProductQuantity->Units,
                    'Dosage' => $products[$i]->ProductQuantity->Dosage,
                ]);
            }
        }

        //add new routine for client 53 subscriptions
        //reenable this for royal mail orders

        if ($prescription->ClientID == 53 && !$isFridgeOrder) {
            //     //did the subscriber already receive products?
            $matches = explode('-', $prescription->ReferenceNumber);

            if (isset($matches[2]) && $matches[2] != '01') {
                $subscription = $matches[0] . '-' . $matches[1] . '-';

                $previousPrescription = DB::table('Prescription')
                    ->where('ReferenceNumber', 'LIKE', "$subscription%")
                    ->where('PrescriptionID', '!=', $id)
                    ->orderBy('PrescriptionID', 'DESC')->first();

                if ($previousPrescription && $previousPrescription->ClientID == 53) {
                    DB::table('Prescription')->where('PrescriptionID', $id)->update([
                        'DeliveryID' => 5, //goes to rml if the subscription reference is more than 01 for that subscription
                    ]);
                }
            }
        }

        if (count($products) == 0) {
            array_push($errors, "No products found in XML");
        }

        return $errors;
    }

    /**
     * Remove products using Order ID
     *
     * @param int $id
     */
    public function removeByOrderId(int $id): int
    {
        return DB::table('Product')->where('PrescriptionID', $id)->delete();
    }

    /**
     * Get a list of alternative names
     *
     * @param int $id
     */
    public function getAlternativeNames($id): Collection
    {
        $records = DB::table('ProductNameAlternative AS pna')
            ->select([
                'pna.ProductNameAlternativeID', 'pna.ProductCodeID', 'c.CompanyName', 'pna.AlternativeName',
                'u.name AS Name', 'u.surname AS Surname', 'pna.CreatedAt'
            ])
            ->leftJoin('Client AS c', 'c.ClientID', '=', 'pna.ClientID')
            ->leftJoin('PharmacyUser AS u', 'u.id', '=', 'pna.UserID')
            ->where('pna.ProductCodeID', $id)
            ->whereNull('pna.DeletedAt')
            ->get();

        $records->transform(function ($row) {
            return $row->CreatedAt = convertTimestamp($row->CreatedAt, 'd/m/Y H:i');
        });

        return $records;
    }


    /**
     * Get a list of alternative units
     *
     * @param int $id
     */
    public function getAlternativeUnits(int $id): Collection
    {
        return DB::table('UnitAlternative AS pua')
            ->select(['pua.UnitAlternativeID', 'pua.ProductCodeID', 'c.CompanyName', 'pua.AlternativeUnit', 'u.name AS Name', 'u.surname AS Surname'])
            ->selectRaw("DATE_FORMAT(pua.CreatedAt, '%d/%c/%Y %H:%i') AS CreatedAt")
            ->leftJoin('Client AS c', 'c.ClientID', '=', 'pua.ClientID')
            ->leftJoin('PharmacyUser AS u', 'u.id', '=', 'pua.UserID')
            ->where('pua.ProductCodeID', $id)
            ->whereNull('pua.DeletedAt')
            ->get();
    }

    /**
     * Check alternative names for products
     *
     * @param Request $request
     * @return boolean
     */
    public function checkAlternativeNames($request)
    {
        return DB::table('ProductNameAlternative')
            ->where('ProductCodeID', $request->code)
            ->where('AlternativeName', $request->name)
            ->where('ClientID', $request->client)
            ->whereNull('DeletedAt')
            ->exists();
    }

    /**
     * Check alternative units for products
     *
     * @param Request $request
     * @return boolean
     */
    public function checkAlternativeUnits($request)
    {
        return DB::table('UnitAlternative')
            ->where('ProductCodeID', $request->code)
            ->where('AlternativeUnit', $request->unit)
            ->where('ClientID', $request->client)
            ->whereNull('DeletedAt')
            ->exists();
    }

    /**
     * Approve an alternative name for a product
     *
     * @param Request $request
     */
    public function approveAlternativeName(Request $request): bool
    {
        return DB::table('ProductNameAlternative')->insert([
            'ProductCodeID' => $request->ProductCodeID,
            'ClientID' => $request->ClientID,
            'UserID' => $request->UserID,
            'AlternativeName' => $request->AlternativeName ?? $request->AlternativeName,
        ]);
    }


    /**
     * Approve an alternative name for a product
     *
     * @param Request $request
     */
    public function approveAlternativeUnit(Request $request): bool
    {
        return DB::table('UnitAlternative')->insert([
            'ProductCodeID' => $request->ProductCodeID,
            'ClientID' => $request->ClientID,
            'UserID' => $request->UserID,
            'AlternativeUnit' => $request->AlternativeUnit ?? $request->AlternativeUnit,
        ]);
    }

    /**
     * Delete alternative name from the product name alternative table
     *
     * @param int $id
     */
    public function deleteAlternativeName(int $id): int
    {
        return DB::table('ProductNameAlternative')->where('ProductNameAlternativeID', $id)->update([
            'DeletedAt' => \Carbon\Carbon::now()
        ]);
    }


    /**
     * Delete alternative unit from the product unit alternative table
     *
     * @param int $id
     */
    public function deleteAlternativeUnit(int $id): int
    {
        return DB::table('UnitAlternative')->where('UnitAlternativeID', $id)->update([
            'DeletedAt' => \Carbon\Carbon::now()
        ]);
    }

    /**
     * Get system activity logs
     *
     * @param int $id
     * @return \Illuminate\Support\Collection
     */
    public function logs($id): Collection
    {
        return DB::table('SystemActivity')
            ->select(['SystemActivity.*'])
            ->selectRaw("DATE_FORMAT(CreatedAt, '%d/%c/%Y %H:%i') AS CreatedAt")
            ->where('ReferenceID', $id)
            ->orderBy('CreatedAt', 'DESC')->get();
    }

    /**
     * Change a pack product status by ID
     *
     * @param int $id
     * @return bool
     */
    public function changePackProductStatus($id)
    {
        $packProduct = DB::table('PackProduct')->where('PackProductID', $id)->first();

        if (!$packProduct) {
            return false;
        }

        if ($packProduct->Status == 1) {
            DB::table('PackProduct')->where('PackProductID', $id)->update([
                'Status' => 0
            ]);
        } else {
            DB::table('PackProduct')->where('PackProductID', $id)->update([
                'Status' => 1
            ]);
        }

        return true;
    }

    /**
     * List all packs
     *
     * @param string $code
     */
    public function listPacks(string $code): Collection
    {
        $packs = DB::table('ProductCode AS pc')
            ->select('pc.*', 'pp.Status')
            ->leftJoin('PackProduct AS pp', 'pc.Code', '=', 'pp.Code')
            ->where('pp.ProductCode', $code)
            ->where('pc.Pack', 1)
            ->groupBy('pp.Code')
            ->orderBy('pp.Order', 'ASC')
            ->get();

        return $packs;
    }

    /**
     * Update pack product order column
     *
     * @param int $packProductID
     * @param int $order
     * @return int
     */
    public function changePackProductOrder($packProductID, $order)
    {
        return DB::table('PackProduct')->where('PackProductID', $packProductID)->update([
            'Order' => $order
        ]);
    }

    /**
     * Undocumented function
     */
    /* public function productImportPreview($request)
    {
        $array = Excel::toArray([], $request->file('file'))[0];
        $products = [];

        foreach ($array as $key => $row) {
            if ($key != 0) {
                $products[] = [
                    'Code' => $row[0],
                    'Name' => $row[1],
                    'Quantity' => $row[2],
                    'Units' => $row[3],
                    'Price' => $row[4],
                    'Tariff Code' => $row[5],
                    'VAT (%)' => number_format((float)$row[6]*100, 2, '.', ''), //((int)$row[6] * 100) . '%',
                    'Product Type' => $row[7],
                    'Package Product' => $row[8],
                    'Reclassification' => $row[9],
                    'Status' => $row[10] ?? 1,
                    'Fridge' => $row[11] ?? 0,
                    'Print Pathology Form' => $row[12] ?? false,
                ];
            }
        }

        return new Paginator($products, count($products));
    }
    */

    public function productImportPreview($request)
    {
        $file = $request->file('file');
        $batchSize = 100; // Adjust this based on your needs

        $rows = Excel::toCollection(null, $file)[0];
        $chunks = $rows->chunk($batchSize);

        $products = [];
        $firstChunk = true; // Flag for the first chunk

        foreach ($chunks as $chunk) {
            $skipFirstRow = $firstChunk; // Skip the first row only if it's the first chunk
            $firstChunk = false;

            foreach ($chunk as $row) {
                if ($skipFirstRow) {
                    $skipFirstRow = false;
                    continue; // Skip the first row
                }

                if (!empty($row[0])) {
                    $products[] = [
                        'Code' => $row[0],
                        'Name' => $row[1],
                        'Quantity' => $row[2],
                        'Units' => $row[3],
                        'Price' => $row[4],
                        'Tariff Code' => $row[5],
                        'VAT (%)' => number_format((float)$row[6] * 100, 2, '.', ''),
                        'Product Type' => $row[7],
                        'Package Product' => $row[8],
                        'Reclassification' => $row[9],
                        'Status' => 1,
                        'Fridge' => $row[11] ?? 0,
                        'Print Pathology Form' => $row[12] ?? false,
                    ];
                }
            }
        }

        return new Paginator($products, count($products));
    }

    /**
     * Finish the product import
     * Should import be done when a code already exists?
     *
     * @param mixed $request
     */
    public function productImportFinish($request): array
    {
        $array = Excel::toArray(null, $request->file('file'))[0];
        $loggedInUser = Auth::user();
        $errors = [];

        foreach ($array as $key => $row) {
            if ($key != 0) {
                if (DB::table('ProductCode')->where('Code', $row[0])->exists()) {
                    $code = $row[0];

                    $errors[] = "Product with code <b>$code</b> already exists. Product was not imported.";
                } else {
                    $id = DB::table('ProductCode')->insertGetId([
                        'Code' => $row[0],
                        'Name' => $row[1],
                        'Type' => 1,
                        'Status' => $row[10] == 'Active' ? 1 : 0,
                        'Quantity' => $row[2],
                        'Units' => $row[3],
                        'Fridge' => $row[11] == 'Yes' ? 1 : 0,
                        'VAT' =>  number_format((float)$row[6] * 100, 2, '.', ''), //(int)$row[6] * 100,
                        'Pack' => $row[8] == 'Yes' ? 1 : 0,
                        'OTC' => $row[9] == 'POM' ? 0 : 1,
                        'ProductType' => $row[7] == 'Medicine' ? 1 : 2,
                        'JVM' => 2,
                        'TariffCode' => $row[5],
                        'PrintForm' => $row[12] == 'Yes' ? 1 : 0,
                    ]);

                    $log = DB::table('SystemActivity')->insert([
                        'UserID' => $loggedInUser->esa_user_id,
                        'ReferenceID' => $id,
                        'Name' => $loggedInUser->name . ' ' . $loggedInUser->surname,
                        'Action' => 'Batch product import',
                        'Arguments' => json_encode($row),
                        'Type' => 5,
                        //1 - scan errors, 2 - import log, 3 - item log, 4 - batch log
                        'Status' => 1
                    ]);

                    $pricing = DB::table('Pricing')->insert([
                        'Code' => $row[0],
                        'ClientID' => 0,
                        'Price' => $row[4],
                        'Type' => 1,
                        'Status' => 1,
                        'Quantity' => $row[2]
                    ]);
                }
            }
        }

        return $errors;
    }
}
