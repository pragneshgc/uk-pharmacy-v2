<?php

namespace App\Http\Controllers;

use App\Library\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    private $setting;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->setting = new Setting;
    }

    /**
     * Get an index of all settings
     *
     * @return JsonResponse
     */
    public function index()
    {
        return $this->sendResponse($this->setting->getSettings(false), 'Settings list');
    }

    /**
     * Update settings by id
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request)
    {
        return $this->sendResponse($this->setting->update($request->input()), 'Settings update');
    }

    /**
     * Get an index of all settings
     *
     * @return JsonResponse
     */
    public function companySettings()
    {
        return $this->sendResponse($this->setting->getCompanySettings(false), 'Settings list');
    }

    /**
     * Update settings by id
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function companySettingsUpdate(Request $request)
    {
        return $this->sendResponse($this->setting->updateCompanySettings($request->input()), 'Settings update');
    }
}