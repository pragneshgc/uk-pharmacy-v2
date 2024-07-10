<?php

namespace App\Services;

use App\Helpers\Generic;
use App\Enums\OrderStatus;
use App\Models\Prescription;
use Illuminate\Support\Facades\DB;
use App\Models\Prescriptionhistory;

class OrderService
{
    /**
     * check if it allow to update status
     */
    public function canUpdateOrderStatus(int $id, int $newStatus): bool
    {
        $statusHistory = $this->getOrderHistory($id);

        $prescription = Prescription::findOrFail($id);

        //allow older order to proceed without status check
        if ($prescription->CreatedDate < strtotime('2023-05-23')) {
            return true;
        }

        //check substatus of order
        if (in_array($newStatus, [101, 102, 103, 104, 105, 106, 107, 108])) {
            $newStatus = OrderStatus::ONHOLD->value;
        } else if (in_array($newStatus, [61, 62, 63, 64, 66, 67, 68, 69, 630, 631, 632, 633, 634])) {
            $newStatus = OrderStatus::CANCELLED->value;
        } else if (in_array($newStatus, [91, 92])) {
            $newStatus = OrderStatus::SAFETY_CHECK->value;
        } else if (in_array($newStatus, [160, 161, 162, 163, 164])) {
            $newStatus = OrderStatus::RETURNED->value;
        }

        $currentStatus = $prescription->Status;

        $byPassStatus = [
            OrderStatus::NEW->value,
            OrderStatus::SAFETY_CHECK->value,
        ];
        $matchAny = [
            OrderStatus::ONHOLD->value,
            OrderStatus::CANCELLED->value
        ];

        if (in_array($newStatus, $byPassStatus)) {
            return true;
        } else if (in_array($newStatus, $matchAny)) {
            $prevStatus = match ($newStatus) {
                OrderStatus::ONHOLD->value => [
                    OrderStatus::NEW->value,
                    OrderStatus::APPROVED->value,
                    OrderStatus::AWAITING_SHIPPING->value,
                    OrderStatus::CANCELLED->value,
                ],
                OrderStatus::CANCELLED->value => [
                    OrderStatus::SAFETY_CHECK->value,
                    OrderStatus::NEW->value,
                    OrderStatus::APPROVED->value,
                    OrderStatus::AWAITING_SHIPPING->value,
                    OrderStatus::ONHOLD->value
                ],
            };
            return count(array_intersect($statusHistory, $prevStatus)) > 0 ? true : false;
        } else {
            $prevStatus = match ($newStatus) {
                OrderStatus::APPROVED->value => [OrderStatus::NEW->value],
                OrderStatus::AWAITING_SHIPPING->value => [
                    OrderStatus::NEW->value,
                    OrderStatus::APPROVED->value
                ],
                OrderStatus::SHIPPED->value => [
                    OrderStatus::NEW->value,
                    OrderStatus::APPROVED->value,
                    OrderStatus::AWAITING_SHIPPING->value
                ],
                OrderStatus::QUERIED->value => [OrderStatus::NEW->value],
                OrderStatus::QUERIED_DISPENSED->value => [
                    OrderStatus::NEW->value,
                    OrderStatus::QUERIED->value
                ],
                OrderStatus::QUERIED_NOT_DISPENSED->value => [
                    OrderStatus::NEW->value,
                    OrderStatus::QUERIED->value
                ],
                OrderStatus::REJECTED->value => [OrderStatus::NEW->value],
                OrderStatus::RETURNED->value => [OrderStatus::SHIPPED->value],
            };

            return Generic::hasAllElements($statusHistory, $prevStatus);
        }
    }

    public function getOrderHistory(int $id): array
    {
        return array_unique(Prescriptionhistory::where('PrescriptionID', $id)
            ->orderBy('UpdatedDate', 'ASC')
            ->pluck('Status')
            ->toArray());
    }

    public function checkOrderPackedAndDecomissioned($prescription_id)
    {
        return DB::table('Product AS p')
            ->select(['p.Description AS Description', 'p.Code', 'p.Quantity', 'p.Dosage', 'p.ProductID'])
            ->selectRaw('sum(i.Quantity) AS total_quantity')
            ->join('InventoryItem AS i', 'i.ProductID', '=', 'p.ProductID')
            ->join('prescription AS ps', 'ps.PrescriptionID', '=', 'p.PrescriptionID')
            ->where('p.PrescriptionID', $prescription_id)
            ->where('ps.Status', OrderStatus::AWAITING_SHIPPING->value)
            ->where('i.Status', 'SHIPPED')
            ->groupBy('p.PrescriptionID')
            ->first();
    }
}
