<?php

namespace App\Http\Controllers;

use App\Models\Note;
use App\Library\Client;
use App\Library\Country;
use App\Library\Setting;
use App\Models\Activity;
use App\Models\Syncorder;
use App\Library\ProductCode;
use App\Models\Doctor;
use App\Models\Prescription;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Return daily stats view
     *
     * @return \Illuminate\View\View
     */
    public function dailyStats()
    {
        return view('daily_stats');
    }

    public function dailyStatsData()
    {
        $statistics = [
            'safety' => 0,
            'new' => 0,
            'approved' => 0,
            'dpd' => 0,
            'ups' => 0,
            'dhl' => 0,
            'rml' => 0,
            'awaiting' => 0,
            'shipped' => 0,
            'onhold' => 0,
            'queried' => 0,
            'rejected' => 0,
            'cancelled' => 0,
            'return' => 0,
        ];

        $first = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(3,5,6,8,12,13,14)
                AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                AND UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
        ")
            ->groupByRaw("DeliveryID, Status");
        $second = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(1)
                    AND CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
                ")
            ->groupByRaw("DeliveryID, Status");
        $statuses = Prescription::query()
            ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
            ->whereRaw("Status IN(2,4,7,9,10,11,16)")
            ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), DeliveryID, Status")
            ->union($first)
            ->union($second)
            ->orderBy('Status')
            ->get();

        foreach ($statuses as $status) {
            switch ($status->Status) {
                case '1':
                    $statistics['new'] += (int) $status->Count;
                    break;
                case '2':
                    $statistics['approved'] += (int) $status->Count;
                    break;
                case '3':
                    $statistics['rejected'] += (int) $status->Count;
                    break;
                case '4':
                    $statistics['queried'] += (int) $status->Count;
                    break;
                case '6':
                    $statistics['cancelled'] += (int) $status->Count;
                    break;
                case '7':
                    $statistics['awaiting'] += (int) $status->Count;
                    break;
                case '8':
                    $statistics['shipped'] += (int) $status->Count;
                    break;
                case '9':
                    $statistics['safety'] += (int) $status->Count;
                    break;
                case '10':
                    $statistics['onhold'] += (int) $status->Count;
                    break;
                case '16':
                    $statistics['return'] += (int) $status->Count;
                    break;
                default:
                    break;
            }
        }

        $total = 0;

        $total = (int) $statistics['new'] + (int) $statistics['approved'] + (int) $statistics['shipped'] + $statistics['awaiting'];

        $data = [
            'statistics' => $statistics,
            'total' => $total,
        ];

        return $this->sendResponse($data);
    }

    /**
     * Show root page
     *
     * @return \Illuminate\View\View
     */
    public function welcome(Request $request)
    {
        return view('welcome');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View|string
     */
    public function index(Request $request)
    {
        //extract settings
        $hidden = DB::table('Setting')->where('Type', 900)->value('Value');

        $app = \App\Models\App::where('name', 'Pharmacy')
            ->with(['active_modules', 'active_modules.roles'])
            ->first();

        $modules = $app->active_modules;
        $active_module_roles = [];
        foreach ($modules as $module) {
            $roles = $module->roles;
            foreach ($roles as $role) {
                $active_module_roles[$module->id][] = $role->id;
            }
        }

        $active_modules = $app->active_modules->pluck('name', 'id');

        $hidden = explode(',', $hidden);

        if ($request->user()->role <= 0 && $request->user()->default_app == 'pharmacy') {
            return 'Not Allowed';
        } else if ($request->user()->role <= 0 && $request->user()->default_app != 'pharmacy') {
            return redirect()->away(config('app.' . $request->user()->default_app));
        }

        return view('home', [
            'hidden' => json_encode($hidden),
            'active_modules' => json_encode($active_modules),
            'active_module_roles' => json_encode($active_module_roles),
        ]);
    }

    /**
     * Get statistics
     *
     * @return JsonResponse
     */
    public function statistics()
    {
        $role = Auth::user()->role;

        $statistics = [
            'safety' => 0,
            'new' => 0,
            'approved' => 0,
            'dpd' => 0,
            // 'ups' => 0,
            // 'dhl' => 0,
            'rml' => 0,
            'awaiting' => 0,
            'shipped' => 0,
            'onhold' => 0,
            'queried' => 0,
            'rejected' => 0,
            // 'postponed' => 0,
            // 'call' => 0,
            'cancelled' => 0,
            'return' => 0,
        ];

        if (in_array($role, [29, 30, 35])) {
            unset($statistics['dpd']);
            // unset($statistics['ups']);
            // unset($statistics['dhl']);
            unset($statistics['rml']);
        }

        if (!in_array($role, [29, 30, 35])) {
            unset($statistics['awaiting']);
        }

        if (!in_array($role, [29, 30, 35])) {
            $first = Prescription::query()
                ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
                ->whereRaw("Status IN(3,5,6,8,12,13,14)
                    AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                    AND UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
            ")
                ->groupByRaw("DeliveryID, Status");
            $second = Prescription::query()
                ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
                ->whereRaw("Status IN(1)
                        AND CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
                    ")
                ->groupByRaw("DeliveryID, Status");
            $statuses = Prescription::query()
                ->selectRaw("Status, Exemption, DeliveryID, count(1) AS Count")
                ->whereRaw("Status IN(2,4,7,9,10,11,16)")
                ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), DeliveryID, Status")
                ->union($first)
                ->union($second)
                ->orderBy('Status')
                ->get();
        } else {
            $first = Prescription::query()
                ->selectRaw("Status,Exemption, count(1) AS Count")
                ->whereRaw("Status IN(3,5,6,8,12,13,14)
                    AND UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                    AND UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
            ")
                ->groupByRaw("Status");
            $second = Prescription::query()
                ->selectRaw("Status,Exemption, count(1) AS Count")
                ->whereRaw("Status IN(1)
                        AND CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY))
                    ")
                ->groupByRaw("Status");
            $statuses = Prescription::query()
                ->selectRaw("Status,Exemption, count(1) AS Count")
                ->whereRaw("Status IN(2,4,7,9,10,11,16)")
                ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), Status")
                ->union($first)
                ->union($second)
                ->orderBy('Status')
                ->get();
        }

        if ($statuses->isNotEmpty()) {
            foreach ($statuses as $status) {
                switch ($status->Status) {
                    case '1':
                        $statistics['new'] += (int) $status->Count;
                        break;
                    case '2':
                        $statistics['approved'] += (int) $status->Count;
                        break;
                    case '3':
                        $statistics['rejected'] += (int) $status->Count;
                        break;
                    case '4':
                        $statistics['queried'] += (int) $status->Count;
                        break;
                        // case '5':
                        //     $statistics['postponed'] += (int) $status->Count;
                        //     break;
                    case '6':
                        $statistics['cancelled'] += (int) $status->Count;
                        break;
                    case '7':
                        if (in_array($role, [29, 30, 35])) {
                            $statistics['awaiting'] += (int) $status->Count;
                        }

                        if (in_array($role, [20, 40, 50, 60])) {
                            if ($status->DeliveryID == 4) {
                                $statistics['dpd'] += (int) $status->Count;
                            }
                            // else if ($status->DeliveryID == 7){
                            //     $statistics['ups'] += (int) $status->Count;
                            // } else if ($status->DeliveryID == 10){
                            //     $statistics['dhl'] += (int) $status->Count;
                            // }
                            else if ($status->DeliveryID == 5) {
                                $statistics['rml'] += (int) $status->Count;
                            }
                        }
                        break;
                    case '8':
                        $statistics['shipped'] += (int) $status->Count;
                        break;
                    case '9':
                        $statistics['safety'] += (int) $status->Count;
                        break;
                    case '10':
                        $statistics['onhold'] += (int) $status->Count;
                        break;
                        // case '11':
                        //     $statistics['call'] += (int) $status->Count;
                        //     break;
                    case '16':
                        $statistics['return'] += (int) $status->Count;
                        break;
                    default:
                        break;
                }
            }
        }

        $total = 0;

        $total = (int) $statistics['new'] + (int) $statistics['approved'] + (int) $statistics['shipped'];

        if (in_array($role, [29, 30, 35])) {
            $total += (int) $statistics['awaiting'];
        } else {
            $total += (int) $statistics['dpd'] + /*(int) $statistics['ups'] + (int) $statistics['dhl'] +*/ (int) $statistics['rml'];
        }

        $data = [
            'statistics' => $statistics,
            'total' => $total,
        ];

        return $this->sendResponse($data, 'statistics');
    }

    /**
     * Get statistics
     *
     * @return JsonResponse
     */
    public function statisticsCached()
    {
        $role = Auth::user()->role;

        $data = cache()->remember('statistics-' . $role, \Carbon\Carbon::now()->addSeconds(15), function () use ($role) {
            $statistics = [
                'safety' => 0,
                'new' => 0,
                'approved' => 0,
                'dpd' => 0,
                'ups' => 0,
                'dhl' => 0,
                'rml' => 0,
                'awaiting' => 0,
                'shipped' => 0,
                'onhold' => 0,
                'queried' => 0,
                'rejected' => 0,
                'cancelled' => 0,
                'return' => 0,
            ];

            if (in_array($role, [30])) {
                unset($statistics['dpd']);
                unset($statistics['ups']);
                unset($statistics['dhl']);
                unset($statistics['rml']);
            }

            if (!in_array($role, [30])) {
                unset($statistics['awaiting']);
            }

            if (!in_array($role, [30])) {
                $statuses = Prescription::query()
                    ->selectRaw("Status,Exemption, DeliveryID, count(1) AS Count")
                    ->whereRaw("( Status IN(3,5,6,8,12,13,14)
                    AND  UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                    AND  UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                    OR  ( Status IN(1)
                    AND  CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                    OR  (Status IN(2,4,7,9,10,11,16))")
                    ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), DeliveryID,
                    Status")
                    ->orderBy("Status")
                    ->get();
            } else {

                $statuses = Prescription::query()
                    ->selectRaw("Status,Exemption, count(1) AS Count")
                    ->whereRaw("( Status IN(3,5,6,8,12,13,14)
                    AND  UpdatedDate>=UNIX_TIMESTAMP(CURDATE())
                    AND  UpdatedDate<UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                    OR  ( Status IN(1)
                    AND  CreatedDate<=UNIX_TIMESTAMP(DATE_ADD(CURDATE(),INTERVAL 1 DAY)) )
                    OR  (Status IN(2,4,7,9,10,11,16))")
                    ->groupByRaw("(CASE WHEN Status=7 AND Exemption=3 THEN Exemption ELSE Status END), Status")
                    ->orderBy("Status")
                    ->get();
            }

            foreach ($statuses as $status) {
                switch ($status->Status) {
                    case '1':
                        $statistics['new'] += (int) $status->Count;
                        break;
                    case '2':
                        $statistics['approved'] += (int) $status->Count;
                        break;
                    case '3':
                        $statistics['rejected'] += (int) $status->Count;
                        break;
                    case '4':
                        $statistics['queried'] += (int) $status->Count;
                        break;
                    case '6':
                        $statistics['cancelled'] += (int) $status->Count;
                        break;
                    case '7':
                        if (in_array($role, [30])) {
                            $statistics['awaiting'] += (int) $status->Count;
                        }

                        if (in_array($role, [20, 40, 50, 60])) {
                            if ($status->DeliveryID == 4) {
                                $statistics['dpd'] += (int) $status->Count;
                            } else if ($status->DeliveryID == 7) {
                                $statistics['ups'] += (int) $status->Count;
                            } else if ($status->DeliveryID == 10) {
                                $statistics['dhl'] += (int) $status->Count;
                            } else if ($status->DeliveryID == 5) {
                                $statistics['rml'] += (int) $status->Count;
                            }
                        }

                        break;
                    case '8':
                        $statistics['shipped'] += (int) $status->Count;
                        break;
                    case '9':
                        $statistics['safety'] += (int) $status->Count;
                        break;
                    case '10':
                        $statistics['onhold'] += (int) $status->Count;
                        break;
                    case '16':
                        $statistics['return'] += (int) $status->Count;
                        break;
                    default:
                        break;
                }
            }

            $total = 0;

            $total = (int) $statistics['new'] + (int) $statistics['approved'] + (int) $statistics['shipped'];

            if (in_array($role, [30])) {
                $total += (int) $statistics['awaiting'];
            } else {
                $total += (int) $statistics['dpd'] + (int) $statistics['ups'] + (int) $statistics['dhl'] + (int) $statistics['rml'];
            }

            return [
                'statistics' => $statistics,
                'total' => $total,
            ];
        });

        return $this->sendResponse($data, 'statistics');
    }

    /**
     * Get list of countries
     *
     * @return JsonResponse
     */
    public function countries()
    {
        return $this->sendResponse((new Country)->getCountries(), 'Countries');
    }

    /**
     * Get list of doctors
     *
     * @return JsonResponse
     */
    public function doctors()
    {
        return $this->sendResponse(Doctor::all(), 'Doctors');
    }

    /**
     * Get list of products
     *
     * @return JsonResponse
     */
    public function products(Request $request)
    {
        return $this->sendResponse((new ProductCode)->getProducts($request), 'Products');
    }

    /**
     * Get list of companies
     *
     * @return JsonResponse
     */
    public function deliveryCompanies()
    {
        return $this->sendResponse((new Setting)->getSettings(), 'Companies');
    }

    /**
     * Get list of clients
     *
     * @return JsonResponse
     */
    public function clients()
    {
        return $this->sendResponse((new Client)->getClients(), 'Clients');
    }

    /**
     * Get last 10 activities
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function activity(Request $request)
    {
        $filters = $request->input();

        $activity = DB::table('Activity')->select('Activity.*');

        if (isset($filters['user']) && $filters['user'] != 'false') {
            $activity = $activity->where('UserID', $filters['user']);
        }

        if (isset($filters['date']) && $filters['date'] != '' && $filters['date'] != 'null') {
            $date = (new \DateTime)::createFromFormat('D M d Y H:i:s e+', $filters['date'])->format("Y-m-d");
            $activity = $activity->where('Date2', $date);
        }

        $activity = $activity->limit($filters['show'])->orderBy('ActivityID', 'DESC')->get();

        return $this->sendResponse($activity, 'Activity log');
    }

    /**
     * Get alerts count
     *
     * @return JsonResponse
     */
    public function alertsCount()
    {
        //alert notes count
        $count = Note::query()
            ->select(['Note.*', 'iu.name', 'iu.surname'])
            ->leftJoin('PharmacyUser as iu', 'iu.id', '=', 'Note.UserID')
            ->whereNull('Note.PrescriptionID')
            ->where('Note.ReferenceNumber', '!=', "0")
            ->where('Note.Alert', '=', 1)
            ->whereNull('Note.DeletedAt')
            ->whereNull('Note.EditedAt')
            ->where('Note.Pending', 1)
            ->count();

        //pending prescriber count
        $pendingPrescriberCount = Syncorder::where('Type', 1)->count();

        //onhold postponed shipping orders
        $onholdPostponedCount = 0;

        $orders = Prescription::status(10)->substatus(107)->get();

        foreach ($orders as $order) {
            $activityLog = Activity::query()
                ->select(['Action'])
                ->where('OrderID', $order->PrescriptionID)
                ->where('Action', 'LIKE', 'Order changed to ONHOLD - Postponed Shipping Request%')
                ->orderBy('ActivityID', 'DESC')
                ->first();

            if ($activityLog) {
                preg_match('!\(([^\)]+)\)!', $activityLog->Action, $match);
                $matchDate = $match[1];
                $currentDate = date('d/m/Y');

                $dtMatch = \DateTime::createFromFormat('d/m/Y', $matchDate)->getTimestamp();
                $dtCurrent = \DateTime::createFromFormat('d/m/Y', $currentDate)->getTimestamp();

                if ($match[1] == date('d/m/Y') || $dtCurrent > $dtMatch) {
                    $onholdPostponedCount++;
                }
            }
        }
        $count = $count + $pendingPrescriberCount + $onholdPostponedCount;

        return $this->sendResponse($count);
    }
}
