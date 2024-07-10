<?php

namespace App\Providers;

use Exception;
use League\Flysystem\Filesystem;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\ServiceProvider;
use App\Supports\AzureBlobStorageAdapter;
use Illuminate\Filesystem\FilesystemAdapter;
use Illuminate\Contracts\Container\Container;
use MicrosoftAzure\Storage\Blob\BlobRestProxy;
use Illuminate\Contracts\Foundation\Application;
use MicrosoftAzure\Storage\Common\Middlewares\RetryMiddleware;
use MicrosoftAzure\Storage\Common\Middlewares\RetryMiddlewareFactory;

class AzureStorageServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Storage::extend('azure', function (Application $app, array $config) {
            $client = $app->make(BlobRestProxy::class, $config);
            assert($client instanceof BlobRestProxy);
            $adapter = new AzureBlobStorageAdapter(
                $client,
                (string)$config['container'],
                isset($config['key']) ? (string)$config['key'] : null,
                isset($config['url']) ? (string)$config['url'] : null,
                isset($config['prefix']) ? (string)$config['prefix'] : '',
                isset($config['sasToken']) ? (string)$config['sasToken'] : ''
            );

            return new FilesystemAdapter(
                new Filesystem($adapter, $config),
                $adapter,
                $config
            );
        });
    }

    public function register()
    {
        $this->app->bind(BlobRestProxy::class, function (Container $app, array $config) {
            $configObject = $app->make('config');
            assert($configObject instanceof \Illuminate\Contracts\Config\Repository);
            $config = empty($config) ? (array)$configObject->get('filesystems.disks.azure') : $config;

            if (!empty($config['connection_string'])) {
                $endpoint = (string)$config['connection_string'];
            } else {
                $endpoint = $this->createConnectionString($config);
            }

            $blobOptions = [];
            $retry = data_get($config, 'retry');
            if (isset($retry)) {
                assert(is_array($retry));
                assert(is_null($retry['tries']) || is_int($retry['tries']));
                assert(is_null($retry['interval']) || is_int($retry['interval']));
                assert(is_null($retry['increase']) || is_string($retry['increase']));
                $blobOptions = [
                    'middlewares' => [
                        $this->createRetryMiddleware($retry),
                    ],
                ];
            }

            return BlobRestProxy::createBlobService($endpoint, $blobOptions);
        });
    }

    /**
     * Create retry middleware instance.
     *
     *
     * @return RetryMiddleware
     */
    private function createRetryMiddleware(array $config): RetryMiddleware
    {
        return RetryMiddlewareFactory::create(
            RetryMiddlewareFactory::GENERAL_RETRY_TYPE,
            $config['tries'] ?? 3,
            $config['interval'] ?? 1000,
            $config['increase'] === 'exponential' ?
                RetryMiddlewareFactory::EXPONENTIAL_INTERVAL_ACCUMULATION :
                RetryMiddlewareFactory::LINEAR_INTERVAL_ACCUMULATION,
            true  // Whether to retry connection failures too, default false
        );
    }

    /**
     * Create connection string
     *
     */
    private function createConnectionString(array $config): string
    {
        if (isset($config['sasToken'])) {
            if (!isset($config['endpoint'])) {
                throw new Exception("Endpoint not set when using sasToken");
            }
            return sprintf(
                'BlobEndpoint=%s;SharedAccessSignature=%s;',
                $config['endpoint'],
                $config['sasToken']
            );
        }
        if (!isset($config['key'])) {
            throw new Exception('Key Not set');
        }
        $endpoint = sprintf(
            'DefaultEndpointsProtocol=https;AccountName=%s;AccountKey=%s;',
            $config['name'],
            $config['key']
        );
        if (isset($config['endpoint'])) {
            $endpoint .= sprintf("BlobEndpoint=%s;", $config['endpoint']);
        }

        return $endpoint;
    }
}
