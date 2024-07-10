<?php

namespace App\Http\Controllers;

use App\Models\Condition;
use Illuminate\Http\Request;

class ConditionController extends Controller
{
    public function index(Request $request)
    {
        $conditions = Condition::query()
            ->when($request->filter, function ($query) use ($request) {
                return $query->where('name', 'like', '%' . $request->filter . '%');
            })
            ->get();

        return sendResponse($conditions);
    }
}
