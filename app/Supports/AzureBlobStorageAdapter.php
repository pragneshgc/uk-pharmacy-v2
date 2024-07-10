<?php

namespace App\Supports;

use Exception;
use Illuminate\Support\Arr;
use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use MicrosoftAzure\Storage\Common\Internal\Resources;
use MicrosoftAzure\Storage\Blob\BlobSharedAccessSignatureHelper;
use League\Flysystem\AzureBlobStorage\AzureBlobStorageAdapter as BaseAzureBlobStorageAdapter;

class AzureBlobStorageAdapter extends BaseAzureBlobStorageAdapter
{
    public function __construct(
        private BlobRestProxy $client,
        private string $container,
        private ?string $key = null,
        private ?string $url = null,
        private string $prefix = '',
        private string $sasToken = ''
    ) {
        parent::__construct($client, $container, $prefix);
    }

    /**
     * Get the file URL by given path.
     *
     * @param string $path Path.
     *
     * @return string
     */
    public function getUrl(string $path)
    {
        $container = $this->container;

        if (!empty($this->sasToken)) {
            $sas = $this->sasToken;

            $blobUrlWithSAS = sprintf(
                '%s%s?%s',
                (string)$this->client->getPsrPrimaryUri(),
                "$container/$path",
                $sas
            );

            return $blobUrlWithSAS;
        }

        $helper = new BlobSharedAccessSignatureHelper(
            $this->client->getAccountName(),
            $this->key
        );

        // Refer to following link for full candidate values to construct a service level SAS
        // https://docs.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
        $sas = $helper->generateBlobServiceSharedAccessSignatureToken(
            Resources::RESOURCE_TYPE_BLOB,
            "$container/$path",
            'r',                            // Read
            '2030-01-01T08:30:00Z' //,       // A valid ISO 8601 format expiry time
            //'2016-01-01T08:30:00Z',       // A valid ISO 8601 format expiry time
            //'0.0.0.0-255.255.255.255'
            //'https,http'
        );
        // Or generate a temporary readonly download URL link
        $blobUrlWithSAS = sprintf(
            '%s%s?%s',
            (string)$this->client->getPsrPrimaryUri(),
            "$container/$path",
            $sas
        );

        return $blobUrlWithSAS;
    }

    /**
     * Generate Temporary Url with SAS query
     *
     * @param string $path
     * @param \DateTime|string $ttl
     * @param array $options
     *
     * @return string
     */
    public function getTemporaryUrl(string $path, $ttl, array $options = [])
    {
        $path = $this->prefix ? $this->prefix . '/' . $path : $path;
        $resourceName = (empty($path) ? $this->container : $this->container  . '/' . $path);
        if (!$this->key) {
            throw new Exception('Key not set');
        }
        $sas = new BlobSharedAccessSignatureHelper($this->client->getAccountName(), $this->key);
        $sasString = $sas->generateBlobServiceSharedAccessSignatureToken(
            (string)Arr::get($options, 'signed_resource', 'b'),
            $resourceName,
            (string)Arr::get($options, 'signed_permissions', 'r'),
            $ttl,
            (string)Arr::get($options, 'signed_start', ''),
            (string)Arr::get($options, 'signed_ip', ''),
            (string)Arr::get($options, 'signed_protocol', 'https'),
            (string)Arr::get($options, 'signed_identifier', ''),
            (string)Arr::get($options, 'cache_control', ''),
            (string)Arr::get($options, 'content_disposition', ''),
            (string)Arr::get($options, 'content_encoding', ''),
            (string)Arr::get($options, 'content_language', ''),
            (string)Arr::get($options, 'content_type', '')
        );

        return sprintf('%s?%s', $this->getUrl($path), $sasString);
    }
}
