<?php

namespace Tests\Feature;

use App\Models\Pricing;
use Tests\TestCase;
use App\Enums\OrderStatus;
use App\Models\Prescription;
use App\Services\OrderService;
use App\Models\Prescriptionhistory;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_invoice_is_generated_when_order_shipped(): void
    {
        DB::table('InvoiceItem')->truncate();
        DB::table('Invoice')->truncate();

        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        Pricing::create([
            'Code' => '8882821',
            'ClientID' => 1,
            'Price' => 10.00,
            'Type' => 1,
            'Status' => 1
        ]);
        $prescription = Prescription::find($id);
        Pricing::create([
            'Code' => $prescription->DCountryCode,
            'ClientID' => 1,
            'Price' => 11.00,
            'Type' => 2,
            'Status' => 1
        ]);

        $canApprove = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::APPROVED->value);
        if ($canApprove) {
            Prescription::updateStatus($id, OrderStatus::APPROVED->value);
        }
        $this->assertEquals(true, $canApprove);

        $canAwaitShipping = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        if ($canAwaitShipping) {
            Prescription::updateStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        }
        $this->assertEquals(true, $canAwaitShipping);

        $canSetShipped = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::SHIPPED->value);
        if ($canSetShipped) {
            Prescription::updateStatus($id, OrderStatus::SHIPPED->value);
        }
        $this->assertEquals(true, $canAwaitShipping);
        //$this->assertEquals(4, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::SHIPPED->value]);

        $response = $this->getJson('/invoices/generate/' . $id);

        $array = $response->json();
        $needle = 'Successfully created invoice item';
        $this->assertEquals($needle, $array['data']);
    }
}
