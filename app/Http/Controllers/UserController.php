<?php

namespace App\Http\Controllers;

use App\Models\App;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use App\Library\User as UserLib;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller
{
    private $table = 'PharmacyUser';
    private $roles = [
        '0' => 'Not Allowed',
        '4' => 'Product Management',
        '5' => 'Shipping',
        '10' => 'PXP',
        '19' => 'Locum Dispenser',
        '20' => 'Dispenser',
        '25' => 'Senior Dispenser',
        '29' => 'Locum Pharmacist',
        '30' => 'Pharmacist',
        '35' => 'Superintendent Pharmacist',
        '40' => 'Customer Service',
        '50' => 'Admin',
        '60' => 'Sysadmin',
    ];

    private $user = null;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->user = new UserLib();
    }

    /**
     * Return a list of active users
     *
     * @return JsonResponse
     */
    public function index()
    {
        $data = DB::table($this->table . ' AS i')
            ->selectRaw("i.id AS 'ID',i.name AS 'Name', i.surname AS 'Surname', i.code AS 'Code', i.email AS 'Email', i.role AS 'Pharmacy Role' , i.inventory_role AS 'Inventory Role' , i.shipping_role AS 'Shipping Role', i.default_app AS 'Default App'")
            ->selectRaw("CASE COALESCE(deleted_at, 0) WHEN 0 THEN 'Active' ELSE 'Inactive' END AS 'Status'");

        $data = $data->whereNull('i.deleted_at');

        if ($this->q != '') {
            $data = $data->where('Name', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Email', 'LIKE', '%' . $this->q . '%');
        }

        if ($this->s != '') {
            $data = $data->orderBy($this->s, $this->o);
        }

        $data = $data->paginate($this->l);

        $data->getCollection()->transform(function ($value) {
            if (isset($this->roles[$value->{'Pharmacy Role'}])) {
                $value->{'Pharmacy Role'} = $this->roles[$value->{'Pharmacy Role'}];
            }

            if (isset($this->roles[$value->{'Inventory Role'}])) {
                $value->{'Inventory Role'} = $this->roles[$value->{'Inventory Role'}];
            }

            if (isset($this->roles[$value->{'Shipping Role'}])) {
                $value->{'Shipping Role'} = $this->roles[$value->{'Shipping Role'}];
            }

            return $value;
        });

        return $this->sendResponse($data, 'Successfull query');
    }

    /**
     * Get currently logged in user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function me(Request $request)
    {
        $user = DB::table($this->table)->select(['id', 'esa_user_id', 'last_login_at', 'name', 'surname', 'role'])->first();

        return $this->sendResponse($user);
    }

    /**
     * Get a list of all users
     *
     * @return JsonResponse
     */
    public function list()
    {
        $users = DB::table($this->table . ' AS i')->selectRaw("i.esa_user_id AS 'ID',i.name AS 'Name', i.surname AS 'Surname', i.code AS 'Code', i.email AS 'Email', i.role AS 'Role'")
            ->selectRaw("CASE COALESCE(deleted_at, 0) WHEN 0 THEN 'Active' ELSE 'Inactive' END AS 'Status'")
            ->orderBy('i.role', 'DESC')->get();

        return $this->sendResponse($users, 'Results');
    }

    /**
     * Return user details by id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function user($id)
    {
        $data = User::findOrFail($id);
        $esaUsers = DB::table('User')->select('UserID', 'Username')->get();
        //$data = $this->user->getUserDetails($id);
        //$esaUsers = $this->user->getESAUsers();

        $apps = App::with('roles')->get();

        $applications = [];
        $appRoles = [];
        foreach ($apps as $app) {
            $applications[$app->slug] = $app->name;
            $roles = $app->roles;
            foreach ($roles as $role) {
                $appRoles[$app->name][] = [
                    'id' => $role->id,
                    'name' => $role->name,
                    'value' => $role->value
                ];
            }
        }

        return $this->sendResponse([
            'userData' => $data,
            'esaUsers' => $esaUsers,
            'appRoles' => $appRoles,
            'apps' => $applications
        ], 'Successfull query');
    }

    /**
     * Update an existing user with a specified id
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        if (Auth::id() != $id && Auth::user()->role < 50) {
            return $this->sendError('You are not allowed to update this users information.');
        }

        $input = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'pharmacy_role_id' => 'required',
            'inventory_role_id' => 'required',
            'shipping_role_id' => 'required',
            'default_app' => 'required',
            'esa_user_id' => 'nullable',
            'code' => 'nullable|unique:PharmacyUser,code,' . $id,
            'password' => [
                'nullable',
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ]
        ]);

        $password = $request->input('password');
        if (isset($password)) {
            $input['password'] = bcrypt($request->input('password'));
        }

        $email = $request->input('email');
        if (isset($email)) {
            $input['email'] = $request->input('email');
        }

        $code = $request->input('code');
        if (isset($code)) {
            $input['code'] = $request->input('code');
        }

        $input['role'] = Role::findOrFail($input['pharmacy_role_id'])->value;
        $input['inventory_role'] = Role::findOrFail($input['inventory_role_id'])->value;
        $input['shipping_role'] = Role::findOrFail($input['shipping_role_id'])->value;

        $user = User::findOrFail($id);
        $data = $user->update($input);
        //$data = $this->user->update($id, $input);

        return $this->sendResponse($data, 'User information updated.');
    }

    /**
     * Create a new user from the request
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        if (Auth::user()->role < 50) {
            return $this->sendError('You are not allowed to create a new user.');
        }

        $input = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'email' => "required|email|unique:PharmacyUser,email",
            'role' => 'required',
            'password' => [
                'required', 'same:passwordRepeat', Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
            'passwordRepeat' => 'required'
        ]);

        $token = md5(microtime());

        //add esa user here
        $id = DB::table('User')->insertGetId([
            'Name' => $input['name'],
            'Surname' => $input['surname'],
            'Email' => $input['email'],
            'Password' => $token,
            'Status' => 1,
            'Username' => $input['name'] . '_' . \Illuminate\Support\Str::random(6),
            'Admin' => 5,
        ]);

        $google2fa = app('pragmarx.google2fa');
        $password_security = [
            'google2fa_enable' => 1,
            'google2fa_secret' => $google2fa->generateSecretKey(),
        ];

        $role = Role::findOrFail($input['role']);

        User::create([
            'name' => $input['name'],
            'surname' => $input['surname'],
            'email' => $input['email'],
            'role' => $role->value ?? 0,
            'password' => bcrypt($input['password']),
            'token' => $token,
            'esa_user_id' => $id,
            'pharmacy_role_id' => $input['role']
        ])
            ->passwordSecurity()
            ->create($password_security);

        return $this->sendResponse($id, 'New user added');
    }

    /**
     * Login as a user
     */
    public function loginAs(int $id): JsonResponse
    {
        if (Auth::user()->role == 60) {
            return $this->sendResponse(Auth::loginUsingId($id, true), 'login successful');
        }

        return $this->sendError('You are not allowed to login as another user.');
    }

    /**
     * Delete a user
     */
    public function delete(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        if (auth()->user()->cannot('delete', $user)) {
            return sendError('User un-authorize to delete', [], 403);
        }
        $user->delete();
        return $this->sendResponse([], 'User deleted');
    }

    /**
     * Undocumented function
     */
    public function loggedToEsa(): JsonResponse
    {
        $isLoggedCookie = DB::table('Cookie')->where('UserID', Auth::user()->esa_user_id)->first();

        if ($isLoggedCookie && $isLoggedCookie->EDate > time()) {
            return $this->sendResponse($isLoggedCookie->CKey, 'Logged in');
        } else {
            $string = substr(str_shuffle(str_repeat($x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', ceil(32 / strlen($x)))), 1, 32);
            DB::table('Cookie')->insert(
                [
                    'CKey' => $string,
                    'UserID' => Auth::user()->esa_user_id,
                    'EDate' => time() + (60 * 10),
                    'Hostname' => 'inventory'
                ]
            );
            return $this->sendResponse($string, 'Not logged in');
        }
    }

    /**
     * Get a list of pharmacists
     *
     */
    public function pharmacistList(): JsonResponse
    {
        return $this->sendResponse($this->user->getPharmacist());
    }

    /**
     * Get a list of dispensers
     *
     */
    public function dispenserList(): JsonResponse
    {
        return $this->sendResponse($this->user->getDispenser());
    }

    /**
     * Toggle 2fa for user
     *
     * @param int $id
     * @return void
     */
    // public function toggle2FA($id)
    // {
    //     $google2fa = app('pragmarx.google2fa');

    //     DB::table('PharmacyUser')->where('id', $id)->update([
    //         'two_factor_secret' => $google2fa->generateSecretKey()
    //     ]);

    //     return $this->sendResponse(true);
    // }
}
