<?php

namespace Tests;

use App\Models\User;
use SimpleXMLElement;
use App\Models\Client;
use App\Models\Doctor;
use App\Models\Safeip;
use App\Helpers\Generic;
use App\Enums\OrderStatus;
use App\Models\Productcode;
use Illuminate\Support\Arr;
use App\Models\Doctoraddress;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Database\Seeders\CountryTableSeeder;
use Database\Seeders\PharmacyuserTableSeeder;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\WithFaker;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use WithFaker;

    protected static $setUpHasRunOnce = false;

    public function setUp(): void
    {
        parent::setUp();
        $this->seed(CountryTableSeeder::class);
        $this->seed(RoleSeeder::class);
        $this->seed(PharmacyuserTableSeeder::class);
        if (!static::$setUpHasRunOnce) {
            $this->addDoctors();
            $this->addProduct();
            static::$setUpHasRunOnce = true;
        }
    }

    public function addClient()
    {
        return Client::factory()->create([
            'Username' => 'someuser',
            'Password' => 'mypassword',
            'APIKey' => 'the_secret_key',
            'IP' => '10.1.0.1'
        ]);
    }

    public function newOrderUrl()
    {
        $client = $this->addClient();
        $data = [
            'USERNAME' => $client->Username,
            'PASSWORD' => $client->Password,
            'KEY' => $client->APIKey
        ];
        $querystring = Arr::query($data);
        return '?receivePrescription&' . $querystring;
    }

    public function orderUrl()
    {
        $client = $this->addClient();
        $data = [
            'USERNAME' => $client->Username,
            'PASSWORD' => $client->Password,
            'KEY' => $client->APIKey
        ];
        $querystring = Arr::query($data);
        return '/?receivePrescription&' . $querystring;
    }

    public function getOrderXML($overrideKeys = [], $without = [])
    {
        return (new XmlHelper)->generateOrderXML($overrideKeys, $without);
    }

    public function getOrderJSON($overrideKeys = [])
    {
        return (new XmlHelper)->orderData($overrideKeys);
    }

    public function newOrder($xml = [])
    {
        $url = $this->newOrderUrl();
        $xml = $this->getOrderXML($xml);

        $response = $this->call(method: 'POST', uri: $url, content: $xml);
        $response->assertStatus(200);
        return $response->json()['data'];
    }

    public function userLogin()
    {
        $user = User::where('code', 'POwsoW3o6rOddF')->first();
        return Auth::login($user, true);
    }

    public function addSafeIP($ip = null)
    {
        $fakeIP = $ip ?? fake()->ipv4();
        Safeip::factory()->create([
            'SafeIP' => $fakeIP,
            'Status' => 1,
        ]);
        $this->withServerVariables(['REMOTE_ADDR' => $fakeIP]);
    }

    public function addProduct($data = [])
    {
        $productCodeData = [
            'Code' => '8882821',
            'Type' => 1,
            'Status' => 1
        ];

        if (!empty($data)) {
            if (isset($data['Productcode'])) {
                $productCodeData = array_merge($productCodeData, $data['Productcode']);
            }
        }

        Productcode::factory()->create($productCodeData);
        Productcode::factory()->create([
            'Code' => '1',
            'Type' => 2,
            'Status' => 1
        ]);
    }

    public function addDoctors()
    {
        $doctor = Doctor::factory()->create([
            'GMCNO' => '4624794',
            'DoctorType' => 1,
            'Status' => 1
        ]);

        $doctorAddressData = [
            'DoctorID' => $doctor->DoctorID,
            'Status' => 1,
            'GMCNO' => '4624794'
        ];
        Doctoraddress::factory()->create($doctorAddressData);

        //Add Test Doctor
        $testDoctor = Doctor::factory()->create([
            'GMCNO' => '123456',
            'DoctorType' => 4,
            'Status' => 1
        ]);

        $doctorAddressData = [
            'DoctorID' => $testDoctor->DoctorID,
            'Status' => 1,
            'GMCNO' => '123456'
        ];
        Doctoraddress::factory()->create($doctorAddressData);

        //Add InActive Doctor
        $iaDoctor = Doctor::factory()->create([
            'GMCNO' => '987654',
            'Status' => 0
        ]);

        $doctorAddressData = [
            'DoctorID' => $iaDoctor->DoctorID,
            'Status' => 0,
            'GMCNO' => '987654'
        ];
        Doctoraddress::factory()->create($doctorAddressData);
    }
}
