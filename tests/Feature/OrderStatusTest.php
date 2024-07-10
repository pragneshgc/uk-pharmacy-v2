<?php

namespace Tests\Feature;

use App\Enums\OrderStatus;
use App\Models\Prescriptionhistory;
use Tests\TestCase;
use App\Models\Prescription;
use App\Services\OrderService;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;


class OrderStatusTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_approve_order()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $canUpdate = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::APPROVED->value);
        if ($canUpdate) {
            Prescription::updateStatus($id, OrderStatus::APPROVED->value);
        }

        $this->assertEquals(true, $canUpdate);
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::APPROVED->value]);
    }

    public function test_can_set_status_to_awaiting_shipping()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

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
        $this->assertEquals(3, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::AWAITING_SHIPPING->value]);
    }

    public function test_can_set_status_to_shipped()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

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
        $this->assertEquals(4, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::SHIPPED->value]);
    }

    public function test_can_set_status_to_awaiting_shipping_with_additional_status()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $orderService = new OrderService;

        $statusApprove = $orderService->canUpdateOrderStatus($id, OrderStatus::APPROVED->value);
        if ($statusApprove) {
            Prescription::updateStatus($id, OrderStatus::APPROVED->value);
        }
        $this->assertEquals(true, $statusApprove);

        $statusOnHold = $orderService->canUpdateOrderStatus($id, OrderStatus::ONHOLD->value);
        if ($statusOnHold) {
            Prescription::updateStatus($id, OrderStatus::ONHOLD->value);
        }
        $this->assertEquals(true, $statusOnHold);

        $statusApprove2 = $orderService->canUpdateOrderStatus($id, OrderStatus::APPROVED->value);
        if ($statusApprove2) {
            Prescription::updateStatus($id, OrderStatus::APPROVED->value);
        }
        $this->assertEquals(true, $statusApprove2);

        $statusAwaitShipping = $orderService->canUpdateOrderStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        if ($statusAwaitShipping) {
            Prescription::updateStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        }
        $this->assertEquals(true, $statusAwaitShipping);
        $this->assertEquals(5, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::AWAITING_SHIPPING->value]);
    }

    public function test_do_not_allow_to_set_status_to_awaiting_shipping_if_status_not_set_to_approved()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $statusAwaitShipping = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        if ($statusAwaitShipping) {
            Prescription::updateStatus($id, OrderStatus::AWAITING_SHIPPING->value);
        }
        $this->assertEquals(false, $statusAwaitShipping);
        $this->assertEquals(1, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::NEW->value]);
    }

    public function test_do_not_allow_to_set_status_to_shipped_if_status_not_set_to_await_shipping()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $statusApprove = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::APPROVED->value);
        if ($statusApprove) {
            Prescription::updateStatus($id, OrderStatus::APPROVED->value);
        }
        $this->assertEquals(true, $statusApprove);

        $statusShipped = (new OrderService)->canUpdateOrderStatus($id, OrderStatus::SHIPPED->value);
        if ($statusShipped) {
            Prescription::updateStatus($id, OrderStatus::SHIPPED->value);
        }
        $this->assertEquals(false, $statusShipped);
        $this->assertEquals(2, Prescriptionhistory::where('PrescriptionID', $id)->count());
        $this->assertDatabaseHas('Prescription', ['Status' => OrderStatus::APPROVED->value]);
    }

    public function test_change_order_new_to_onhold_awaiting_stock()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $response = $this->postJson("order-edit/$id/status", ['status' => '101']);

        $response->assertJson(['message' => "Prescription $id updated to status ONHOLD - Awaiting stock"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::ONHOLD->value,
        ]);
    }

    public function test_change_order_new_to_cancel_test_order()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $response = $this->postJson("order-edit/$id/status", ['status' => '68']);

        $response->assertJson(['message' => "Prescription $id updated to status CANCELLED - Test Order"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::CANCELLED->value,
        ]);
    }

    public function test_change_order_cancel_to_onhold()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $response = $this->postJson("order-edit/$id/status", ['status' => '68']);

        $response->assertJson(['message' => "Prescription $id updated to status CANCELLED - Test Order"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::CANCELLED->value,
        ]);

        $response = $this->postJson("order-edit/$id/status", ['status' => '101']);

        $response->assertJson(['message' => "Prescription $id updated to status ONHOLD - Awaiting stock"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::ONHOLD->value,
        ]);
    }

    public function test_change_order_onhold_to_cancel()
    {
        $this->addSafeIP('10.1.0.1');
        $this->userLogin();
        $id = $this->newOrder();

        $response = $this->postJson("order-edit/$id/status", ['status' => '101']);

        $response->assertJson(['message' => "Prescription $id updated to status ONHOLD - Awaiting stock"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::ONHOLD->value,
        ]);

        $response = $this->postJson("order-edit/$id/status", ['status' => '68']);

        $response->assertJson(['message' => "Prescription $id updated to status CANCELLED - Test Order"]);
        $this->assertDatabaseHas('Prescription', [
            'PrescriptionID' => $id,
            'Status' => OrderStatus::CANCELLED->value,
        ]);
    }
}
