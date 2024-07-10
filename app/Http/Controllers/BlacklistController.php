<?php

namespace App\Http\Controllers;

use App\Library\Blacklist as BlackListLib;
use App\Models\Blacklist;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;

class BlacklistController extends Controller
{
    private $blacklist;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->blacklist = new BlackListLib;
    }

    /**
     * Return a list blacklist entries
     *
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $data = $this->blacklist->getBlacklistEntriesPaginated($this->q, $this->s, $this->o);
        $data = $this->blacklist->setSearchParameters($this->f, $request, $data)->paginate($this->l);

        return $this->sendResponse($data, 'Successfull query');
    }


    /**
     * Deactivate a blacklist entry
     *
     * @param int $id
     * @return JsonResponse
     */
    public function deactivate($id)
    {
        $blackList = Blacklist::findOrFail($id);
        return $this->sendResponse(
            $blackList->update([
                'Status' => 0
            ])
        );
    }

    /**
     * Insert a new blacklist entry
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function insert(Request $request)
    {
        $data = $request->validate([
            'OrderID' => 'nullable|max:255',
            'ReferenceNumber' => 'nullable|max:255',
            'Name' => 'nullable',
            'Address' => 'nullable|max:255',
            'Postcode' => 'nullable|max:255',
        ]);

        return $this->sendResponse(Blacklist::create($data));
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function createMultiple(Request $request): JsonResponse
    {
        return $this->sendResponse($this->blacklist->addEntries($request->ids), 'Entries created');
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function removeMultiple(Request $request): JsonResponse
    {
        return $this->sendResponse($this->blacklist->removeEntries($request->ids), 'Entries removed');
    }
}