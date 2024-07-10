<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Models\Dispenserpool;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PharmacyFlowTest extends TestCase
{
    use RefreshDatabase;

    private $orderId;
    /**
     * A basic feature test example.
     */
    public function test_pharmacist_can_approve_order(): void
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        //New Order
        $this->orderId = $this->newOrder();

        $pharmacist = User::factory()->create([
            'esa_user_id' => 1,
            'role' => 30,
            'pharmacy_role_id' => 10
        ]);

        Auth::login($pharmacist);

        //Add Order to Pharmacist Tray
        $addTrayResponse = $this->postJson('/tray', [
            'PrescriptionID' => [$this->orderId]
        ]);
        $addTrayResponse->assertOk();
        $this->assertDatabaseHas('Tray', ['PrescriptionID' => $this->orderId, 'UserID' => Auth::id()]);

        //Approve Order
        $approveOrder = $this->postJson("/order-edit/$this->orderId/status", [
            'status' => OrderStatus::APPROVED->value
        ]);
        $approveOrder->assertOk();
        $this->assertDatabaseHas('DispenserPool', ['PrescriptionID' => $this->orderId]);
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::APPROVED->value]);
        Auth::logout();
    }

    public function test_dispenser_can_change_status_to_awating_shipping()
    {
        $this->test_pharmacist_can_approve_order();

        $dispenser = User::factory()->create([
            'esa_user_id' => 2,
            'role' => 20,
            'pharmacy_role_id' => 7
        ]);
        Auth::login($dispenser);

        //Add Order to Dispenser Pool
        $addTrayResponse = $this->postJson('/tray', [
            'PrescriptionID' => [$this->orderId]
        ]);
        $addTrayResponse->assertOk();
        $this->assertDatabaseHas('DispenserPool', [
            'PrescriptionID' => $this->orderId,
            'UserID' => Auth::user()->esa_user_id
        ]);

        //Change Status to Awaiting Shipping
        $approveOrder = $this->postJson("/order-edit/$this->orderId/status", [
            'status' => OrderStatus::AWAITING_SHIPPING->value
        ]);
        $approveOrder->assertOk();
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::AWAITING_SHIPPING->value]);
        $this->assertDatabaseMissing('DispenserPool', [
            'PrescriptionID' => $this->orderId,
        ]);
        Auth::logout();
    }
}
