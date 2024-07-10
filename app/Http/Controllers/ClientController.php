<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateClientRequest;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use App\Library\Client as ClientLib;

class ClientController extends Controller
{
    private $client;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->client = new ClientLib();
    }

    /**
     * Get a list of all the clients
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $data = $this->client->getClientsPaginated($this->q, $this->s, $this->o);
        $data = $this->client->setSearchParameters($this->f, $request, $data)->paginate($this->l);

        return $this->sendResponse($data);
    }

    /**
     * Deactivate a client
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deactivate($id)
    {
        return $this->sendResponse($this->client->deactivate($id));
    }

    /**
     * Delete a client
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        return $this->sendResponse($this->client->delete($id));
    }

    /**
     * Get details of a client with ID
     *
     * @param int $id
     * @return JsonResponse
     */
    public function client($id)
    {
        return $this->sendResponse($this->client->getClient($id));
    }

    /**
     * Update client via ID
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        $data = $request->validate([
            'Title' => 'nullable|max:255',
            'Name' => 'sometimes|nullable|max:255',
            'Middlename' => 'nullable',
            'Surname' => 'sometimes|max:255',
            'CompanyName' => 'nullable|max:255',
            'Address1' => 'required|max:255',
            'Address2' => 'nullable|max:255',
            'Address3' => 'nullable|max:255',
            'Address4' => 'nullable|max:255',
            'Postcode' => 'required|max:255',
            'CountryID' => 'required',
            'Telephone' => 'nullable',
            'Mobile' => 'nullable',
            'Email' => 'nullable',
            'CreditLimit' => 'required',
            'IP' => 'sometimes',
            'Type' => 'required',
            'Status' => 'required',
            'Notes' => 'nullable',
            'CompanyNumber' => 'nullable',
            'GPHCNO' => 'nullable',
            'ReturnURL' => 'nullable',
            'Username' => 'required',
            'Password' => 'required',
            //'APIKey' => 'required',
            'ITName' => 'required',
            'ITSurname' => 'nullable',
            'ITEmail' => 'required',
            'TradingName' => 'required',
            'AdditionalComment' => 'nullable',
            'ReturnUsername' => 'nullable',
            'ReturnPassword' => 'nullable',
            'PendingPharmacyURL' => 'nullable',
            'PendingPharmacyEndpoint' => 'nullable',
            'VAT' => 'required',
        ]);


        return $this->sendResponse($this->client->update($id, $data), 'Client updated');
    }

    /**
     * Insert a new client
     *
     * @param CreateClientRequest $request
     * @return JsonResponse
     */
    public function insert(CreateClientRequest $request)
    {
        $data = $request->validated();

        $data['APIKey'] = md5($data['Username']);
        $data['Type'] ??= 2;
        $data['Status'] ??= 1;

        return $this->sendResponse(Client::create($data));
    }
}
