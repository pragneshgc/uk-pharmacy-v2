<?php

namespace App\Helpers;

use App\Enums\OrderStatus;
use App\Library\Order;
use App\Models\Prescription;
use App\Models\Prescriptionhistory;
use App\Services\OrderService;

class Constants
{
    public static function deliveryCompanies(): array
    {
        return [
            '0' => 'Unknown',
            '3' => 'TNT',
            '4' => 'DPD',
            '5' => 'Royal Mail',
            '7' => 'UPS',
            '8' => 'TNT',
            '10' => 'DHL',
        ];
    }

    /**
     * return array<int,string>
     */
    public static function orderStatuses(): array
    {
        return [
            1 => 'NEW',
            2 => 'APPROVED',
            3 => 'REJECTED',
            4 => 'QUERIED',
            //5 => 'POSTPONED',
            6 => 'CANCELLED',
            7 => 'AWAITINGSHIPPED',
            8 => 'SHIPPED',
            9 => 'SAFETYCHECK',
            10 => 'ONHOLD',
            //11 => 'CALL',
            12 => 'QUERIEDDISPENSED',
            13 => 'QUERIEDNOTDISPENSED',
            //14 => 'QUERIEDNOREPLY',
            //15 => 'QUERIEDARCHIVED',
            16 => 'RETURNED',
            //20 => 'PAYMENTPENDING',
        ];
    }

    public static function orderSubStatuses(): array
    {
        return [
            '101' => 'Awaiting stock',
            '102' => 'Awaiting customer expiry date confirmation',
            '103' => 'Fridge item (To be processed on next available shipping day)',
            '104' => 'Out of stock',
            '105' => 'Incorrect XML details',
            '106' => 'Other',
            '61' => 'Customer/Client cancelled order',
            '62' => 'Duplicate XML',
            '63' => 'Returned and Cancelled',
            '64' => 'Product Out Of Stock',
            '66' => 'Expiry date confirmation not received from customer',
            '67' => 'Shipping Address Undeliverable',
            '68' => 'Test Order',
            '69' => 'Other',
            '107' => 'Postponed Shipping Request',
            '108' => 'Order Received After Courier Left',
            '630' => 'Returned and Cancelled (No Response Received from Client/Customer)',
            '631' => 'Returned and Cancelled (Order Not Suitable for Redelivery)',
            // '632' => 'Returned and Cancelled (Redelivery Refused by Client/Customer)',
            '633' => 'Returned and Cancelled (Multiple Redeliveries Attempted)',
            '634' => 'Returned and Cancelled (Other)',
            '91' => 'Product Name Mismatch',
            '92' => 'Formulation Mismatch',
            '160' => 'Multiple Deliveries Attempted by Courier',
            '161' => 'Incorrect/Incomplete Address',
            '162' => 'Customer Refused Delivery',
            '163' => 'Shipment Not Collected by Customer',
            '164' => 'Other',
        ];
    }

    public static function imgMap(): array
    {
        return [
            '' => '',
            '0' => '',
            '3' => 'images/logo/tnt.png',
            '4' => 'images/logo/dpd.png',
            '5' => 'images/logo/rmail.png',
            '7' => 'images/logo/ups.png',
            '70' => 'images/logo/ups_access_point.jpg',
            '71' => 'images/logo/ups_cod.jpg',
            '8' => 'images/logo/tnt.png',
            '10' => 'images/logo/dhl.png',
        ];
    }

    public static function orderStatusOptions(): array
    {
        return [
            OrderStatus::SAFETY_CHECK->slug() => [
                'id' => '9',
                'label' => 'SAFETYCHECK',
            ],
            OrderStatus::NEW->slug() => [
                'id' => '1',
                'label' => 'NEW',
            ],
            OrderStatus::APPROVED->slug() => [
                'id' => '2',
                'label' => 'APPROVED',
            ],
            OrderStatus::AWAITING_SHIPPING->slug() => [
                'id' => '7',
                'label' => 'AWAITINGSHIPPED',
            ],
            OrderStatus::SHIPPED->slug() => [
                'id' => '8',
                'label' => 'SHIPPED',
            ],
            OrderStatus::ONHOLD->slug() => [
                'id' => '10',
                'label' => 'ONHOLD',
                'isDefaultExpanded' => false,
                'children' => [
                    [
                        'id' => '101',
                        'label' => 'Awaiting stock',
                        'customLabel' => 'ONHOLD - Awaiting stock',
                    ],
                    [
                        'id' => '102',
                        'label' => 'Awaiting customer expiry date confirmation (MM/YYYY)',
                        'customLabel' => 'ONHOLD - Awaiting customer expiry date confirmation',
                    ],
                    [
                        'id' => '107',
                        'label' => 'Postponed Shipping Request (DD/MM/YYYY)',
                        'customLabel' => 'ONHOLD - Postponed Shipping Request',
                    ],
                    [
                        'id' => '103',
                        'label' => 'Fridge item (To be processed on next available shipping day)',
                        'customLabel' => 'ONHOLD - Fridge item',
                    ],
                    [
                        'id' => '104',
                        'label' => 'Out of stock',
                        'customLabel' => 'ONHOLD - Out of stock',
                    ],
                    [
                        'id' => '105',
                        'label' => 'Incorrect XML details',
                        'customLabel' => 'ONHOLD - Incorrect XML details',
                    ],
                    [
                        'id' => '108',
                        'label' => 'Order Received After Courier Left',
                        'customLabel' => 'ONHOLD - Order Received After Courier Left',
                    ],
                    [
                        'id' => '106',
                        'label' => 'Other (Free Text)',
                        'customLabel' => 'ONHOLD - Other',
                        'input' => true,
                    ],
                ],
            ],
            OrderStatus::QUERIED->slug() => [
                'id' => '4',
                'label' => 'QUERIED',
            ],
            OrderStatus::QUERIED_DISPENSED->slug() => [
                'id' => '12',
                'label' => 'QUERIEDDISPENSED',
            ],
            OrderStatus::QUERIED_NOT_DISPENSED->slug() => [
                'id' => '13',
                'label' => 'QUERIEDNOTDISPENSED',
            ],
            OrderStatus::REJECTED->slug() => [
                'id' => '3',
                'label' => 'REJECTED',
            ],
            OrderStatus::CANCELLED->slug() => [
                'id' => '6',
                'label' => 'CANCELLED',
                'isDefaultExpanded' => false,
                'children' => [
                    [
                        'id' => '61',
                        'label' => 'Customer/Client cancelled order',
                        'customLabel' => 'CANCELLED - Customer/Client cancelled order',
                    ],
                    [
                        'id' => '62',
                        'label' => 'Duplicate XML',
                        'customLabel' => 'CANCELLED - Duplicate XML',
                    ],
                    [
                        'id' => '63',
                        'label' => 'Returned and Cancelled',
                        'customLabel' => 'CANCELLED - Returned and Cancelled',
                        'isDefaultExpanded' => false,
                        'children' => [
                            [
                                'id' => '630',
                                'label' => 'No Response Received from Client/Customer',
                                'customLabel' => 'CANCELLED - Returned and Cancelled (No Response Received from Client/Customer)',
                            ],
                            [
                                'id' => '631',
                                'label' => 'Order Not Suitable for Redelivery',
                                'customLabel' => 'CANCELLED - Returned and Cancelled (Order Not Suitable for Redelivery)',
                            ],
                            [
                                'id' => '633',
                                'label' => 'Multiple Redeliveries Attempted',
                                'customLabel' => 'CANCELLED - Returned and Cancelled (Multiple Redeliveries Attempted)',
                            ],
                            [
                                'id' => '634',
                                'label' => 'Other (Free Text)',
                                'customLabel' => 'CANCELLED - Returned and Cancelled (Other (Free Text))',
                                'input' => true,
                            ],
                        ],
                    ],
                    [
                        'id' => '64',
                        'label' => 'Product Out Of Stock',
                        'customLabel' => 'CANCELLED - Product Out Of Stock',
                    ],
                    [
                        'id' => '66',
                        'label' => 'Expiry date confirmation not received from customer',
                        'customLabel' => 'CANCELLED - Expiry date confirmation not received from customer',
                    ],
                    [
                        'id' => '67',
                        'label' => 'Shipping Address Undeliverable',
                        'customLabel' => 'CANCELLED - Shipping Address Undeliverable',
                    ],
                    [
                        'id' => '68',
                        'label' => 'Test Order',
                        'customLabel' => 'CANCELLED - Test Order',
                    ],
                    [
                        'id' => '69',
                        'label' => 'Other (Free Text)',
                        'customLabel' => 'CANCELLED - Other',
                        'input' => true,
                    ],
                ],
            ],
            OrderStatus::RETURNED->slug() => [
                'id' => '16',
                'label' => 'RETURNED',
                'isDefaultExpanded' => false,
                'children' => [
                    [
                        'id' => '160',
                        'label' => 'Multiple Deliveries Attempted by Courier',
                        'customLabel' => 'RETURNED - Multiple Deliveries Attempted by Courier',
                    ],
                    [
                        'id' => '161',
                        'label' => 'Incorrect/Incomplete Address',
                        'customLabel' => 'RETURNED - Incorrect/Incomplete Address',
                    ],
                    [
                        'id' => '162',
                        'label' => 'Customer Refused Delivery',
                        'customLabel' => 'RETURNED - Customer Refused Delivery',
                    ],
                    [
                        'id' => '163',
                        'label' => 'Shipment Not Collected by Customer',
                        'customLabel' => 'RETURNED - Shipment Not Collected by Customer',
                    ],
                    [
                        'id' => '164',
                        'label' => 'Other (Free Text)',
                        'customLabel' => 'RETURNED - Other (Free Text)',
                        'input' => true,
                    ],
                ],
            ],
        ];
    }

    public static function restrictedStatus(int $status, int $id): array
    {
        $status =  match ($status) {
            OrderStatus::SAFETY_CHECK->value => [
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::CANCELLED->slug()
            ],
            OrderStatus::NEW->value => [
                OrderStatus::NEW->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::ONHOLD->slug(),
                OrderStatus::QUERIED->slug(),
                OrderStatus::REJECTED->slug(),
                OrderStatus::CANCELLED->slug()
            ],
            OrderStatus::APPROVED->value => self::validateRestrictedStatus($id, $status),
            OrderStatus::AWAITING_SHIPPING->value => [
                OrderStatus::AWAITING_SHIPPING->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::ONHOLD->slug(),
                OrderStatus::CANCELLED->slug()
            ],
            OrderStatus::SHIPPED->value => self::validateRestrictedStatus($id, $status),
            OrderStatus::ONHOLD->value => self::validateRestrictedStatus($id, $status),
            OrderStatus::QUERIED->value => [
                OrderStatus::QUERIED->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::QUERIED_DISPENSED->slug(),
                OrderStatus::QUERIED_NOT_DISPENSED->slug(),
            ],
            OrderStatus::QUERIED_DISPENSED->value => [
                OrderStatus::QUERIED_DISPENSED->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::QUERIED->slug()
            ],
            OrderStatus::QUERIED_NOT_DISPENSED->value => [
                OrderStatus::QUERIED_NOT_DISPENSED->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::QUERIED->slug()
            ],
            OrderStatus::REJECTED->value => [
                OrderStatus::REJECTED->slug(),
                OrderStatus::NEW->slug()
            ],
            OrderStatus::CANCELLED->value => [
                OrderStatus::CANCELLED->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug()
            ],
            OrderStatus::RETURNED->value => [
                OrderStatus::RETURNED->slug(),
                OrderStatus::CANCELLED->slug()
            ]
        };

        $orderService = new OrderService();
        $order = $orderService->checkOrderPackedAndDecomissioned($id);
        if (!empty($order) && $order->total_quantity >= $order->Quantity * $order->Dosage) {
            $status[OrderStatus::AWAITING_SHIPPING->value] = OrderStatus::SHIPPED->slug();
        }

        return $status;
    }

    public static function getRestrictedStatus(int $status, int $id): array
    {
        $options = self::restrictedStatus($status, $id);
        $statuses = self::orderStatusOptions();
        $arr = [];
        foreach ($options as $key) {
            $arr[] = $statuses[$key];
        }
        return $arr;
    }

    private static function validateRestrictedStatus(int $id, int $status): array
    {
        $statusHistory = (new OrderService)->getOrderHistory($id);

        $statuses = [];
        if ($status == OrderStatus::ONHOLD->value) {
            $statuses = [
                OrderStatus::ONHOLD->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::CANCELLED->slug()
            ];
            if (in_array(OrderStatus::APPROVED->value, $statusHistory)) {
                $statuses[] = OrderStatus::APPROVED->slug();
            }
            if (in_array(OrderStatus::AWAITING_SHIPPING->value, $statusHistory)) {
                $statuses[] = OrderStatus::AWAITING_SHIPPING->slug();
            }
        } else if ($status == OrderStatus::APPROVED->value) {
            $statuses = [
                OrderStatus::APPROVED->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::ONHOLD->slug(),
                OrderStatus::CANCELLED->slug(),
            ];
            if (in_array(OrderStatus::AWAITING_SHIPPING->value, $statusHistory)) {
                $statuses[] = OrderStatus::AWAITING_SHIPPING->slug();
            }
        } else if ($status == OrderStatus::SHIPPED->value) {
            $statuses = [
                OrderStatus::SHIPPED->slug(),
                OrderStatus::SAFETY_CHECK->slug(),
                OrderStatus::NEW->slug(),
                OrderStatus::ONHOLD->slug(),
                OrderStatus::CANCELLED->slug(),
                OrderStatus::RETURNED->slug()
            ];
            if (in_array(OrderStatus::AWAITING_SHIPPING->value, $statusHistory)) {
                $statuses[] = OrderStatus::AWAITING_SHIPPING->slug();
            }
        }
        return $statuses;
    }
}
