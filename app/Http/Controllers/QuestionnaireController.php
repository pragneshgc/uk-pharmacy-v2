<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Library\Questionnaire;
use Illuminate\Http\JsonResponse;

class QuestionnaireController extends Controller
{
    private $questionnaire;

    public function __construct(Request $request)
    {
        parent::__construct($request);
        $this->questionnaire = new Questionnaire;
    }

    /**
     * Get all questionnaire entries for this prescription
     *
     * @param int $id
     * @return JsonResponse
     */
    public function index($id)
    {
        $questionnaire = $this->questionnaire->getQuestionnaire($id);

        return $this->sendResponse($questionnaire);
    }
}