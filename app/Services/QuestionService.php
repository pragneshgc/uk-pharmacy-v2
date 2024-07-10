<?php

namespace App\Services;

use App\Models\Questionnaire;

class QuestionService
{
    public function __construct(private string $contentType)
    {
    }

    public function importFromArray(int $id, array $data): array
    {
        $errors = [];

        if ($this->contentType == 'application/json') {
            $questionnaire = $data;
        } else {
            $questionnaire = $this->importXMLQuestionnaire($data);
        }

        if (!empty($questionnaire)) {
            Questionnaire::where('PrescriptionID', $id)->delete();
            foreach ($questionnaire as $list) {
                $insert[] = [
                    'PrescriptionID' => $id,
                    'Question' => $list['Question'],
                    'Answer' => !empty($list['Answer']) ? $list['Answer'] : '',
                    'Status' => 1,
                ];
            }
            if (!empty($insert)) {
                Questionnaire::insert($insert);
            }
        } else {
            $errors[] = 'Questionnaire not found';
        }

        return $errors;
    }

    private function importXMLQuestionnaire($data)
    {
        $quationaire = [];
        if (!is_array($data['Question'])) {
            $questions[] = $data['Question'];
        } else {
            $questions = $data['Question'];
        }

        if (!is_array($data['Answer'])) {
            $answers[] = $data['Answer'];
        } else {
            $answers = $data['Answer'];
        }

        if (!empty($questions)) {
            for ($i = 0; $i < count($questions); $i++) {
                $quationaire[] = [
                    'Question' => $questions[$i],
                    'Answer' => !empty($answers[$i]) ? $answers[$i] : '',
                ];
            }
        }

        return $quationaire;
    }
}
