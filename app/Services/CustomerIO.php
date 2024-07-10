<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class CustomerIO
{
    private array $headers = [];
    private array $data = [];
    private string $url = '';
    private string $event = '';

    public function __construct()
    {
        $this->headers['content-type'] = 'application/json';
        $this->headers['Authorization'] = 'Basic ' . base64_encode(config('services.customerio.site_id') . ":" . config('services.customerio.api_key'));
    }

    public function setURL(string $url): self
    {
        $this->url = $url;
        return $this;
    }

    public function setHeader(array $header): self
    {
        $this->headers = array_merge($this->headers, $header);
        return $this;
    }

    public function setEvent($event): self
    {
        $this->data['name'] = $event;
        return $this;
    }

    public function setData($data): self
    {
        $this->data['data'] = $data;
        return $this;
    }

    public function send()
    {
        return Http::withHeaders($this->headers)
            ->post($this->url, $this->data);
    }
}
