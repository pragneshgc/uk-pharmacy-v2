<?php
namespace App\Library;

use GuzzleHttp;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

// use Carbon\Carbon;

/**
 * Undocumented class
 */
class Questionnaire
{
    /**
     * Undocumented function
     *
     */
    public function getQuestionnaire(int $id): Collection
    {
        return DB::table('Questionnaire')->select(['Question', 'Answer'])
            ->where('PrescriptionID', $id)->get();
    }

    /**
     * Undocumented function
     *
     */
    public function importFromXML(int $id, \SimpleXMLElement $xml): array
    {
        $errors = [];
        $questions = $xml->Question;
        $answers = $xml->Answer;

        if (count($questions) != count($answers)) {
            array_push($errors, 'Invalid Questions/Answers in XML');
        }

        DB::table('Questionnaire')->where('PrescriptionID', $id)->delete();

        for ($i = 0; $i < count($questions); $i++) {
            DB::table('Questionnaire')->insert([
                'PrescriptionID' => $id,
                'Question' => $questions[$i],
                'Answer' => $answers[$i],
                'Status' => 1,
            ]);
        }

        return $errors;
    }

    /**
     * Delete questionnaire items by prescription ID
     *
     */
    public function deleteByPrescriptionId(int $id): int
    {
        return DB::table('Questionnaire')->where('PrescriptionID', $id)->delete();
    }

    /**
     * Setup the translation string and send text for translation
     *
     * @param mixed $questionnaire
     */
    public function translator($questionnaire): string
    {
        $params = '';
        $answers = '|';

        // $table = '<table>';

        foreach ($questionnaire as $question) {
            // $table .= '<tr>';
            // $table .= "<td>$question->Question</td>";
            // $table .= "<td>$question->Answer</td>";
            // $table .= '</tr>';

            $answers .= $question->Answer . '|';
        }

        // $table .= '</table>';

        $params .= '&text=' . urldecode($answers) . '&lang=en';
        // $params .= '&text='.urldecode($table).'&lang=en&format=html';

        $options = [
            'base_uri' => 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20191210T154044Z.3edf6236ddb0fa85.74473d9b84a0f8be3093c27d06c88acd72795a1b' . $params,
            'headers' => [
                'Content-Type' => 'application/x-www-form-urlencoded',
            ],
        ];

        $client = new GuzzleHttp\Client($options);

        return $client->request('POST', '', $options)->getBody()->getContents();
    }
}