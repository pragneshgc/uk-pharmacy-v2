<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class HelpController extends Controller
{
    /**
     * Index of help entries
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $entries = DB::table('InventoryHelp')
            ->selectRaw("Category, InventoryHelpID, Title, Description, RelatedPage, CreatedAt, UpdatedAt");
        $categories = DB::table('InventoryHelp')
            ->selectRaw("Category, COUNT(1) AS 'CategoryCount', true AS 'IsOpen'");

        if ($this->q != '') {
            $entries = $entries->selectRaw("true AS 'IsOpen'")->where('Title', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Description', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Category', 'LIKE', '%' . $this->q . '%');

            $categories = $categories->where('Title', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Description', 'LIKE', '%' . $this->q . '%')
                ->orWhere('Category', 'LIKE', '%' . $this->q . '%');
        } else {
            $entries = $entries->selectRaw("false AS 'IsOpen'");
        }

        $entries = $entries->get();
        $categories = $categories->groupBy('Category')->get();

        return $this->sendResponse(['entries' => $entries, 'categories' => $categories], 'Help index');
    }

    /**
     * Create a new help entry
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $input = $request->input();

        $update = [
            'Category' => $input['Category'],
            'Title' => $input['Title'],
            'Description' => $input['Description'],
            'CreatedBy' => Auth::user()->id
        ];

        DB::table('InventoryHelp')->insert($update);

        return $this->sendResponse([], 'Created');
    }

    /**
     * Update the help entry
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request): JsonResponse
    {
        $input = $request->input();

        $update = [
            'Category' => $input['Category'],
            'Title' => $input['Title'],
            'Description' => $input['Description'],
            'UpdatedBy' => Auth::user()->id
        ];

        DB::table('InventoryHelp')->where('InventoryHelpID', $input['InventoryHelpID'])->update($update);

        return $this->sendResponse([], 'Updated');
    }

    /**
     * Delete an help entry by id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete(int $id): JsonResponse
    {
        $response = DB::table('InventoryHelp')->where('InventoryHelpID', $id)->delete();

        return $this->sendResponse($response, 'Deleted');
    }

    /**
     * Returns Pharmacist App Info
     *
     * @return JsonResponse
     */
    public function info(): JsonResponse
    {
        $response = [
            'version' => config('app.version') ? config('app.version') : '0.8.9',
            'environment' => \App::environment() ? \App::environment() : 'demo',
            'changelog' => file_get_contents('changelog.md')
        ];

        return $this->sendResponse($response, 'Pharmacist Info');
    }
}