<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Library\Label;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class LabelController extends Controller
{
    private $label;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->label = new Label;
    }

    /**
     * Get all labels
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $product = $request->product;

        return $this->sendResponse($this->label->getLabels($product));
    }

    /**
     * Get a single label by id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function single($id)
    {
        return $this->sendResponse($this->label->getLabel($id));
    }

    /**
     * Update a label by ID
     *
     * @param int $id
     * @param Request $request
     * @return JsonResponse
     */
    public function update($id, Request $request)
    {
        $input = $request->validate([
            'Description' => 'required',
            'Status' => 'required',
            'CountryID' => 'required',
        ]);

        return $this->sendResponse($this->label->updateLabel($id, $input), 'Label updated');
    }

    /**
     * Disable a warning label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function disable($id)
    {
        return $this->sendResponse($this->label->disable($id));
    }

    /**
     * Enable a warning label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function enable($id)
    {
        return $this->sendResponse($this->label->enable($id));
    }

    /**
     * Disable a product for warning label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function disableProduct($id, Request $request)
    {
        $code = $request->code;

        return $this->sendResponse($this->label->disableProduct($id, $code));
    }

    /**
     * Enable a product for warning label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function enableProduct($id, Request $request)
    {
        $code = $request->code;

        return $this->sendResponse($this->label->enableProduct($id, $code));
    }

    /**
     * Delete a warning label
     *
     * @param int $id
     * @return JsonResponse
     */
    public function delete($id)
    {
        return $this->label->delete($id) ? $this->sendResponse(true, 'Warning label deleted') : $this->sendError(false, 'Cannot delete warning label');
    }

    /**
     * Save a warning label and return it as a result
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function save(Request $request)
    {
        $input = $request->validate([
            'Description' => 'required',
            'Status' => 'required',
            'CountryID' => 'required',
            'Group' => 'required'
        ]);

        $input['Type'] = $input['Group'];
        unset($input['Group']);

        if ($input['Type'] == 0) {
            $input['Type'] = $this->label->getLastGroup() + 1;
        }

        if ($this->label->exists($input['CountryID'], $input['Type'])) {
            return $this->sendError("Label for this country in group " . $input['Type'] . " already exists");
        }

        return $this->sendResponse($this->label->save($input, true), 'Label saved successfully');
    }

    /**
     * Fetch a list of products by group(type) id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function products($id)
    {
        return $this->sendResponse($this->label->products($id), 'Products fetched successfully');
    }

    /**
     * Remove a product from warning labels match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return JsonResponse
     */
    public function removeProduct($id, $productCodeId)
    {
        return $this->sendResponse($this->label->removeProduct($id, $productCodeId), 'Product removed');
    }

    /**
     * Add a product from warning labels match using group id and product code
     *
     * @param int $id
     * @param int $productCodeId
     * @return JsonResponse
     */
    public function addProduct($id, $productCodeId)
    {
        return $this->label->addProduct($id, $productCodeId) ? $this->sendResponse(true, 'Product added') : $this->sendError('Cannot add product, already assigned', false, 403);
    }
}