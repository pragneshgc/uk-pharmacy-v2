<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FrequencyController extends Controller
{
    public function index()
    {
        $data = [];
        $frequencies = getAllFrequency();
        if (!empty($frequencies)) {
            foreach ($frequencies as $id => $val) {
                $data[] = [
                    'id' => $id,
                    'label' => $val
                ];
            }
        }
        return $this->sendResponse($data);
    }
}
