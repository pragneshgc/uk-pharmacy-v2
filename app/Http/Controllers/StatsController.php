<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public $types = [
        '1' => 'Shipping',
        '8' => 'Attach product',
        '750' => 'Update order details',
        '50' => 'Decomission',
        '22' => 'Approve order',
        '900' => 'Send OCS file',
    ];

    public $chart_colors = [
        '#3ca5a8',
        '#2cb871',
        '#f53c38',
        '#8DA7BE',
        '#CDE6F5',
        '#87919E',
        '#707078',
        '#9D6867',
        '#66AA00',
        '#B82E2E',
        '#316395',
        '#994499',
        '#22AA99',
        '#AAAA11',
        '#6633CC',
        '#E67300',
        '#8B0707',
        '#329262',
        '#5574A6',
        '#3B3EAC',
        '#3366CC',
        '#DC3912',
        '#FF9900',
        '#109618',
        '#990099',
        '#3B3EAC',
        '#0099C6',
        '#DD4477',
        '#66AA00',
        '#B82E2E',
        '#316395',
        '#994499',
        '#22AA99',
        '#AAAA11',
        '#6633CC',
        '#E67300',
        '#8B0707',
        '#329262',
        '#5574A6',
        '#3B3EAC',
    ];

    /**
     * Dispenser and pharmacist activity
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function activity(Request $request)
    {
        $params = $request->input();

        if (isset($params['date']) && $params['date'] != 'null') {
            $date = (new \DateTime)::createFromFormat('D M d Y H:i:s e+', $params['date']);
        } else {
            $date = new \DateTime('NOW');
        }

        $date = $date->format("Y-m-d");

        switch (isset($params['type']) ? $params['type'] : 0) {
            case 'P':
                $type = [22, 7, 8, 50, 750, 900];
                $role = [30];
                break;
            case 'D': //packers
                $type = [1, 22, 7, 8, 50, 750, 900];
                $role = [5];
                break;
            //add dispensers
            default:
                $type = [22, 7, 8, 50, 750, 900];
                $role = [5, 30];
                break;
        }

        $dateStart = $date;
        $dateEnd = $date;

        //might be flawed a bit, rework
        $first = DB::table('Activity')->whereRaw("Date2 = ?", [$dateStart])->limit(1)->orderBy('ActivityID', 'ASC')->value('ActivityID');
        $last = DB::table('Activity')->whereRaw("Date2 = ?", [$dateEnd])->limit(1)->orderBy('ActivityID', 'DESC')->value('ActivityID');

        $data = DB::table('Activity AS a')
            ->selectRaw("a.UserID, a.Name, a.Type, COUNT(distinct(a.OrderID)) AS Count, a.Date2 AS Date")
            ->leftJoin("User AS u", 'a.UserID', '=', 'u.UserID')
            ->whereRaw("a.ActivityID >= ? AND a.ActivityID <= ?", [$first, $last])
            ->whereIn("a.Type", $type)
            ->whereIn("u.Admin", $role)
            ->groupBy(['a.UserID', 'a.Date2', 'a.Type'])->orderByRaw("a.Name, a.Type")
            ->get();

        //setup
        $response = [
            'labels' => [],
            'datasets' => []
        ];

        $types = [];
        $datasets = [];
        $i = 0;

        //setup loop
        foreach ($data as $row) {
            if (!in_array($row->Name, $response['labels'])) {
                array_push($response['labels'], $row->Name);
            }

            if (!in_array($row->Type, $types)) {
                array_push($types, $row->Type);
                $datasets[$row->Type] = array_push($response['datasets'], ['label' => $this->types[$row->Type], 'data' => [$row->Count], 'ids' => [$row->UserID], 'backgroundColor' => $this->chart_colors[$i]]) - 1;

                $i++;
            } else {
                array_push($response['datasets'][$datasets[$row->Type]]['data'], $row->Count);
                array_push($response['datasets'][$datasets[$row->Type]]['ids'], $row->UserID);
            }
        }

        return $this->sendResponse($response, 'Successfull query');
    }

    /**
     * Dispenser and pharmacist activity for each specific user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function activityUser($id, Request $request)
    {
        $params = $request->input();

        if (isset($params['date'])) {
            $date = (new \DateTime)::createFromFormat('D M d Y H:i:s e+', $params['date']);
        } else {
            $date = new \DateTime('NOW');
        }

        $date = $date->format("Y-m-d");

        //'2020-08-20T10:34:00.000Z'

        $dateStart = $date;
        $dateEnd = $date;

        //might be flawed a bit, rework
        $first = DB::table('Activity')->whereRaw("Date2 = ?", [$dateStart])->limit(1)->orderBy('ActivityID', 'ASC')->value('ActivityID');
        $last = DB::table('Activity')->whereRaw("Date2 = ?", [$dateEnd])->limit(1)->orderBy('ActivityID', 'DESC')->value('ActivityID');
        $title = DB::table('User')->select(['Name', 'Surname'])->where('UserID', $id)->first();

        $data = DB::table('Activity AS a')
            ->selectRaw("a.UserID, a.Name, a.Type, COUNT(distinct(a.OrderID)) AS Count, a.Min AS Date")
            ->leftJoin("User AS u", 'a.UserID', '=', 'u.UserID')
            ->whereRaw("a.ActivityID > ? AND a.ActivityID <= ?", [$first, $last])
            ->where("a.UserID", $id)
            ->groupBy(['a.UserID', 'a.Type', 'a.Min'])->orderByRaw("a.Min, a.Name")
            ->get();

        $datasets = [];
        $types = [];
        $buffer = [];
        $times = [];
        $i = 0;

        foreach ($data as $key => $value) {
            if (!in_array($value->Type, $types)) {
                array_push($types, $value->Type);

                $suffix = isset($this->types[$value->Type]) ? $this->types[$value->Type] : 'Other';

                array_push($datasets, [
                    'label' => $title->Name . ' ' . $title->Surname . ' - ' . $suffix,
                    'data' => [],
                    'backgroundColor' => $this->chart_colors[$i],
                ]);

                $buffer[$value->Type] = [];
                $times[$value->Type] = [];
                $i++;
            }
        }

        //setup
        $response = [
            'labels' => [],
            'datasets' => $datasets
        ];

        foreach ($data as $entry) {
            $time = strtotime($entry->Date);

            $INTERVAL_SECONDS = 15 * 60;

            $time = $time - ($time % $INTERVAL_SECONDS);

            if (($time % $INTERVAL_SECONDS) > ($INTERVAL_SECONDS / 2)) {
                $time = $time + $INTERVAL_SECONDS;
            } else {
                $time = $time;
            }

            $time = date('H:i', $time);

            array_push($times[$entry->Type], $time);
            array_push($buffer[$entry->Type], $entry->Count);
        }

        //fill out the missing minutes and hours
        for ($h = 8; $h < 18; $h++) {
            for ($m = 0; $m < 60; $m += 15) {
                $time = sprintf('%02d:%02d', $h, $m);

                foreach ($types as $key => $value) {

                    if (!in_array($time, $times[$value])) {
                        if (!in_array($time, $response['labels'])) {
                            array_push($response['labels'], $time);
                        }

                        array_push($response['datasets'][$key]['data'], 0);
                    } else {
                        if (!in_array($time, $response['labels'])) {
                            array_push($response['labels'], $time);
                        }

                        array_push($response['datasets'][$key]['data'], $buffer[$value][array_search($time, $times[$value])]);
                    }
                }

            }
        }

        if ($params['interval'] == '60') {
            $newLabels = [];

            foreach ($types as $k => $value) {
                $newValues = [];

                foreach ($response['labels'] as $key => $label) {
                    if (substr($label, -2) == '00') {
                        if (!in_array($label, $newLabels)) {
                            array_push($newLabels, $label);
                        }
                        array_push($newValues, $response['datasets'][$k]['data'][$key] + $response['datasets'][$k]['data'][$key + 1] + $response['datasets'][$k]['data'][$key + 2] + $response['datasets'][$k]['data'][$key + 3]);
                    }
                }

                $response['datasets'][$k]['data'] = $newValues;
            }

            $response['labels'] = $newLabels;
        }

        return $this->sendResponse($response, 'Successfull query');
    }
}