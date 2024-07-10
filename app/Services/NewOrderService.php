<?php

namespace App\Services;

use App\Models\Client;
use App\Helpers\Generic;
use Illuminate\Http\Request;
use App\Exceptions\OrderException;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class NewOrderService
{
    private $file;
    private Client $client;
    private array $data;
    public function __construct(private Request $request)
    {
    }
    public function validateToken(): self
    {
        $token = $this->request->bearerToken();
        $ipaddress = Generic::getIP();
        /**
         * @var client \App\Models\Client
         */
        $this->client = Client::query()
            ->where('APIKey', $token)
            ->whereRaw("IP LIKE '%$ipaddress%'")
            ->first();
        if (!$this->client) {
            Log::channel('import')->info("Import error: Unauthorized user.");
            throw new OrderException("Unauthorized or in-valid IP", Response::HTTP_UNAUTHORIZED);
        }

        return $this;
    }

    public function readData()
    {
        $type = $this->request->headers->get('Content-Type');
        $this->file = $this->request->getContent();
        $data = Generic::readFile($this->file, $type);

        if (!empty($data['error'])) {
            throw new OrderException('Import error: invalid data received', Response::HTTP_BAD_REQUEST, $data['error']);
        }
        if (empty($data['data'])) {
            throw new OrderException('Import error: no data found', Response::HTTP_BAD_REQUEST, $data['error']);
        }

        $this->data = $data['data'];

        return $this;
    }

    public function process()
    {
        Log::channel('import')->info("Import Started for User: " . $this->request->USERNAME);
        $contentType = $this->request->headers->get('Content-Type');

        $this->validateClientId();
    }

    private function validateClientId()
    {
        if (!empty($this->client)) {
            $this->data['ClientID'] = $this->client->ClientID;
        } elseif (empty($this->data['SenderID'])) {
            throw new OrderException('Import error: SenderID Not set', 400);
        } else {
            $this->data['ClientID'] = $this->data['SenderID'];
        }
    }
}
