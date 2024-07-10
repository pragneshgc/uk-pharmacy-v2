<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


/**
 * System log types
 * 1 - scan errors, 2 - import log, 3 - item logs, 4 - batch logs, 5 - product logs, 6 - cautionary and advisory labels, 7 - additional information
 */
class LogController extends Controller
{
    /**
     * Return an array of files in the fmd logs
     *
     */
    public function index(Request $request)
    {
        $folder = $request->input('folder') ? $request->input('folder') : '/';

        $files = Storage::disk('logs')->files($folder);
        $folders = Storage::disk('logs')->directories($folder);

        $files = array_filter($files, function ($str) {
            return strpos($str, ".log");
        });

        return ['files' => $files, 'folders' => $folders];
    }

    /**
     * Log a page access
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function page(Request $request)
    {
        // $exists = \DB::table('ViewLogCurrent')->select('ViewLogCurrentID')->where('UserID', Auth::user()->id)
        // ->where('Page', $request->input()['url'])->first();

        // if(!$exists){
        DB::table('ViewLogCurrent')->where('UserID', Auth::user()->id)->delete();
        DB::table('ViewLogCurrent')->insert(
            [
                'UserID' => Auth::user()->id,
                'Name' => Auth::user()->name,
                'Surname' => Auth::user()->surname,
                'Page' => $request->input()['url'],
                'IP' => getenv('REMOTE_ADDR')
            ]
        );
        // }

        $result = DB::table('ViewLog')->insert(
            [
                'UserID' => Auth::user()->id,
                'Page' => $request->input()['url'],
                'IP' => getenv('REMOTE_ADDR')
            ]
        );

        return $this->sendResponse($result);
    }

    /**
     * Unlock an order by prescription id
     *
     * @param int $prescriptionID
     * @return JsonResponse
     */
    public function unlock($prescriptionID)
    {
        $response = DB::table('ViewLogCurrent')->where('Page', "/prescription/$prescriptionID")->update(['Page' => 'exit']);

        return $this->sendResponse($response);
    }

    /**
     * Take over an order by prescription id
     *
     * @param int $prescriptionID
     * @return JsonResponse
     */
    public function takeover($prescriptionID)
    {
        $logs = DB::table('ViewLogCurrent')->where('UserID', '!=', Auth::user()->id)
            ->where('Page', "/prescription/$prescriptionID")->orderBy('ViewLogCurrentID', 'ASC')->get();

        //we delete the log in case the last logged action is exit and insert a new log
        DB::table('ViewLogCurrent')->where('UserID', Auth::user()->id)->delete();

        $response = DB::table('ViewLogCurrent')->insert(
            [
                'UserID' => Auth::user()->id,
                'Name' => Auth::user()->name,
                'Surname' => Auth::user()->surname,
                'Page' => "/prescription/$prescriptionID",
                'IP' => getenv('REMOTE_ADDR')
            ]
        );

        // we reinsert all the logs from before
        foreach ($logs as $log) {
            DB::table('ViewLogCurrent')->where('ViewLogCurrentID', $log->ViewLogCurrentID)->delete();

            DB::table('ViewLogCurrent')->insert(
                [
                    'UserID' => $log->UserID,
                    'Name' => $log->Name,
                    'Surname' => $log->Surname,
                    'Page' => $log->Page,
                    'IP' => $log->IP
                ]
            );
        }

        return $this->sendResponse($response);
    }

    /**
     * Log a page exit
     *
     * @return void
     */
    public function exit()
    {
        DB::table('ViewLogCurrent')->where('UserID', Auth::user()->id)->delete();

        DB::table('ViewLogCurrent')->insert(
            [
                'UserID' => Auth::user()->id,
                'Page' => 'exit',
                'IP' => getenv('REMOTE_ADDR')
            ]
        );

        DB::table('ViewLog')->insert(
            [
                'UserID' => Auth::user()->id,
                'Page' => 'exit',
                'IP' => getenv('REMOTE_ADDR')
            ]
        );
    }

    /**
     * Call exit function and to home page
     *
     * @return \Illuminate\Routing\Redirector|\Illuminate\Http\RedirectResponse
     */
    public function exitRedirect()
    {
        $this->exit();

        return redirect('/');
    }

    /**
     * Check if the prescription is locked
     *
     * @param int $prescriptionID
     * @return JsonResponse
     */
    public function locked($prescriptionID)
    {
        $locked = DB::table('ViewLogCurrent')
            ->select(['ViewLogCurrentID', 'Name', 'Surname'])
            ->where('Page', "/prescription/$prescriptionID")
            ->where('UserID', '!=', Auth::user()->id)
            ->first();

        if ($locked) {
            $check = DB::table('ViewLogCurrent')
                ->where('UserID', Auth::user()->id)
                ->where('Page', "/prescription/$prescriptionID")
                ->where('ViewLogCurrentID', '<', $locked->ViewLogCurrentID)->first();

            if ($check) {
                $locked = null;
            }
        }

        return $this->sendResponse($locked);
    }

    /**
     * View a logfile
     * TODO: read logfiles other than fmd
     * @param Request $request
     * @return JsonResponse
     */
    public function view(Request $request): JsonResponse
    {
        $file = Storage::disk('logs')->get($request->input('file'));
        $q = $request->q ? $request->q : false;

        //first check if the file name is an sql file

        $logArray = [];
        $line = strtok($file, "\r\n");
        $type = 'fmd';
        $envs = ['local', 'staging', 'production'];
        $env = \App::environment(); //we presume that the log will be for the current env

        if (substr($request->input('file'), 0, 4) === '/sql' || substr($request->input('file'), 0, 4) === '/lar') {
            $type = 'log';
            while ($line !== false) {
                if ($q) {
                    if (strpos(strtoupper($line), strtoupper($q))) {
                        $logArray[] = $line;
                    }
                } else {
                    $logArray[] = $line;
                }

                $line = strtok("\r\n");
            }

            $logArray = array_reverse($logArray);
        } else {
            while ($line !== false) {
                $l = explode(" $env.INFO: ", $line);

                if (!isset($l[1])) {
                    foreach ($envs as $e) {
                        if ($e != $env) {
                            $l = explode(" $e.INFO: ", $line);
                            if (isset($l[1])) {
                                break;
                            }
                        }
                    }
                }

                $data = explode(' | ', $l[1]);
                $date = str_replace(['[', ']'], '', $l[0]);

                if ($q) {
                    if (strpos(strtoupper(implode(' ', $data)), strtoupper($q))) {
                        if (isset($data[1]) && isset($data[2])) {
                            $data[1] = json_decode($data[1]);
                            $data[2] = json_decode($data[2]);
                        } else if (isset($data[0])) {
                            $data[0] = json_decode($data[0]);
                        }

                        $logArray[] = ['date' => $date, 'data' => $data, 'show' => false];
                    }
                } else {
                    if (isset($data[1]) && isset($data[2])) {
                        $data[1] = json_decode($data[1]);
                        $data[2] = json_decode($data[2]);
                    } else if (isset($data[0])) {
                        $data[0] = json_decode($data[0]);
                    }

                    $logArray[] = ['date' => $date, 'data' => $data, 'show' => false];
                }


                $line = strtok("\r\n");
            }
        }

        $logArray = array_reverse($logArray);

        return $this->sendResponse(['array' => $logArray, 'type' => $type], 'Log fetched');
    }

    /**
     * Log a frontend error
     *
     * @param Request $request
     */
    public function error(Request $request)
    {
        //check if it is a critical error
        //send an email to admin if critical
        return Log::channel('frontend')
            ->error(json_encode($request->input()) . ' | ' . Auth::user()->id . ' | ' . Auth::user()->name . ' ' . Auth::user()->surname);
    }

    /**
     * Get a list of user activities
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function appActivity(Request $request): JsonResponse
    {
        $filters = $request->input();

        $activity = DB::table('ViewLogCurrent AS vlc')->select('vlc.*', 'pu.name', 'pu.surname', 'pu.last_login_at')
            ->selectRaw("UNIX_TIMESTAMP(vlc.UpdatedAt) as unix_time, UNIX_TIMESTAMP() AS 'current_time'")
            ->leftJoin('PharmacyUser AS pu', 'pu.id', '=', 'vlc.UserID')->orderBy('vlc.Name', 'DESC')
            ->whereNull("pu.deleted_at")
            ->orderBy('vlc.UpdatedAt', 'DESC');

        if ($filters['type'] != 'false') {
            $activity = $activity->where('role', $filters['type']);
        }

        if ($filters['status'] != 'all') {
            if ($filters['status'] == 'online') {
                $activity = $activity->where('page', '!=', 'exit');
            } else if ($filters['status'] == 'offline') {
                $activity = $activity->where('page', '=', 'exit');
            }
        }

        $activity = $activity->get();

        return $this->sendResponse($activity, 'User app activity list');
    }

    /**
     * Log a system activity
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function logSystemActivity(int $id, Request $request): JsonResponse
    {
        $loggedInUser = Auth::user();
        $data = $request->input();

        if (isset($data['messageKey'])) {
            switch ($data['messageKey']) {
                case '800':
                    $action = 'Removed pricing';
                    break;
                case '801':
                    $action = 'Deactivated product';
                    break;
                case '802':
                    $action = 'Reactivated product';
                    break;
                case '803':
                    $action = 'Added default pricing';
                    break;
                case '804':
                    $action = 'Added pricing';
                    break;
                case '805':
                    $action = 'Added product';
                    break;
                case '806':
                    $action = 'Updated pricing';
                    break;
                case '807':
                    $action = 'Updated product';
                    break;
                case '808':
                    $action = 'Added product to package';
                    break;
                case '809':
                    $action = 'Removed product from package';
                    break;
                case '810':
                    $action = 'Updated country';
                    break;
                case '600':
                    $action = 'Saved label';
                    break;
                case '601':
                    $action = 'Deleted label';
                    break;
                case '602':
                    $action = 'Removed product from group';
                    break;
                case '603':
                    $group = $data['data']['group'];

                    $action = "Added product to Group $group (Cautionary and Advisory Label)";
                    break;

                case '903':
                    $group = $data['data']['group'];

                    $action = "Added product to Group $group (Additional Information)";
                    break;

                case '604':
                    $action = 'Disabled label';
                    break;
                case '605':
                    $action = 'Disabled label';
                    break;
                case '606':
                    $action = 'Label enabled';
                    break;
                case '607':
                    $action = 'Label enabled';
                    break;
                case '608':
                    $action = 'Updated label';
                    break;
                default:
                    $action = 'Other';
                    break;
            }
        } else {
            $action = 'Other';
        }

        $log = DB::table('SystemActivity')->insert([
            'UserID' => $loggedInUser->esa_user_id,
            'ReferenceID' => $id,
            'Name' => $loggedInUser->name . ' ' . $loggedInUser->surname,
            'Action' => $action,
            'Arguments' => json_encode($data),
            'Type' => $data['type'],
            //1 - scan errors, 2 - import log, 3 - item log, 4 - batch log
            'Status' => 1
        ]);

        return $this->sendResponse($log, 'System activity logged');
    }

}