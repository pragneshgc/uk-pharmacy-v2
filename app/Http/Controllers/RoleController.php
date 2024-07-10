<?php

namespace App\Http\Controllers;

use App\Models\App;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function getPharmacyRoles()
    {
        $app = App::with('roles')->where('name', 'Pharmacy')->first();
        $appRoles = $app->roles->pluck('name', 'id');
        return $this->sendResponse($appRoles);
    }
}