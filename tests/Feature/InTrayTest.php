<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\RoleSeeder;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Database\Seeders\PharmacyuserTableSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InTrayTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_verify_statistics_response(): void
    {
        $this->userLogin();

        $response = $this->get('/statistics');

        $response->assertJsonStructure([
            'success',
            'data' => [
                'statistics' => [
                    "safety",
                    "new",
                    "approved",
                    "dpd",
                    "rml",
                    "shipped",
                    "onhold",
                    "queried",
                    "rejected",
                    "cancelled",
                    "return",
                ],
                'total'
            ],
            'message'
        ], $response->json());
    }

    public function test_verify_order_response()
    {
        $this->userLogin();

        $response = $this->get('/orders?page=1&limit=200&f=new');

        $response->assertJsonStructure([
            'success',
            'data' => [
                'current_page',
                'data' => [
                    '*' => [
                        'CompanyName',
                        'DeliveryID',
                        'PrescriptionID',
                        'Products',
                        'Received Date',
                        'ReferenceNumber',
                        'Status',
                        'UPSAccessPointAddress',
                        'disabled'
                    ]
                ],
                'first_page_url',
                'from',
                'last_page',
                'last_page_url',
                'links',
                'next_page_url',
                'path',
                'per_page',
                'prev_page_url',
                'to',
                'total'
            ],
            'message'
        ], $response->json());
    }
}