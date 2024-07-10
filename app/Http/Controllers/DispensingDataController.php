<?php

namespace App\Http\Controllers;

use App\Helpers\Generic;
use App\Library\Dispensing;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class DispensingDataController extends Controller
{
    private $dispensing;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->dispensing = new Dispensing;
    }
    /**
     * Return a list blacklist entries
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $data = $this->dispensing->getDispensingDataPaginated($this->q, $this->s, $this->o);
        $data = $this->dispensing->setSearchParameters($this->f, $request, $data);

        $collection = $data->get();

        $monthsBuffer = [];
        $months = [];

        if (isset($collection[0]) && isset($collection[0]->Date)) {
            $codes = [];

            foreach ($collection as $item) {
                $month = date('F', mktime(0, 0, 0, substr($item->Date, 0, 2), 10)) . " " . substr($item->Date, 3);

                if (!in_array($month, $monthsBuffer)) {
                    $monthsBuffer[$month] = [
                        'month' => substr($item->Date, 0, 2),
                        'year' => substr($item->Date, 3)
                    ];
                }
            }

            usort($monthsBuffer, function ($item1, $item2) {
                return $item1['month'] <=> $item2['month'];
            });

            usort($monthsBuffer, function ($item1, $item2) {
                return $item1['year'] <=> $item2['year'];
            });

            foreach ($monthsBuffer as $item) {
                array_push($months, date('F', mktime(0, 0, 0, $item['month'], 10)) . " " . $item['year']);
            }

            foreach ($collection as $item) {
                $month = date('F', mktime(0, 0, 0, substr($item->Date, 0, 2), 10)) . " " . substr($item->Date, 3);

                if (!array_key_exists($item->Code, $codes)) {
                    $packSize = $item->{'Pack Size'};
                    $packsDispensed = $item->{'Packs Dispensed'};

                    $codes[$item->Code] = [
                        'Name' => "<b>$item->Name</b> ($packSize $item->Unit) </br> <small>$item->Code</small>",
                        // $month => $packsDispensed,
                        'averagePacksDispensed' => [$packsDispensed],
                    ];

                    foreach ($months as $m) {
                        $codes[$item->Code][$m] = 0;
                    }

                    $codes[$item->Code][$month] = $packsDispensed;
                } else {
                    $packsDispensed = $item->{'Packs Dispensed'};
                    $codes[$item->Code]['averagePacksDispensed'][] = $packsDispensed;
                    $codes[$item->Code][$month] = $packsDispensed;
                }
            }

            //$newCollection = collect();
            $newCollection = [];
            foreach ($codes as $code) {
                $averagePacksDispensed = round(array_sum($code["averagePacksDispensed"]) / count($months), 2);

                foreach ($months as $key => $month) {
                    if (!array_key_exists($month, $code)) {
                        $code[$month] = 0;
                    }
                }

                $code['Average'] = "<b>$averagePacksDispensed</b>";

                unset($code['averagePacksDispensed']);

                $newCollection[] = $code;
                //$newCollection->push((object) $code);
            }
            $data = Generic::paginate($newCollection, $this->l);
            //$data->setCollection($newCollection);
        } else {
            $data = Generic::paginate($collection, $this->l);
        }

        return $this->sendResponse($data, 'Successfull query');
    }
}
