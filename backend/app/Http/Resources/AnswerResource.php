<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnswerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $questionAnswers = $this->questionAnswers()->with('question')->get();



        $results = [];
        foreach ($questionAnswers as $index => $questionAnswer) {
            $decodedAnswer = $questionAnswer->answer;

            if ($this->isJson($decodedAnswer)) {
                $decodedAnswer = json_decode($decodedAnswer, true);
            }
            
            $results[] = [
                'question_id' => $index,
                'question' => $questionAnswer->question,
                'user_answer' => $decodedAnswer,
//                'user_answer' => is_string($questionAnswer->answer) ? json_decode($questionAnswer->answer, true) : $questionAnswer->answer,
                'score' => $questionAnswer->score,
            ];
        }

        Carbon::setLocale('uk');

        return [
            'id' => $this->id,
            'test_id' => $this->test_id,
            'user' => new UserResource($this->user),
            'start_time' => Carbon::parse($this->start_time)->isoFormat('DD MMMM, YYYY HH:mm:ss'),
            'end_time' => Carbon::parse($this->end_time)->isoFormat('DD MMMM, YYYY HH:mm:ss'),
            'time_taken' => Carbon::parse($this->end_time)->diffInMilliseconds($this->start_time),
//            'start_time' => $this->start_time,
//            'end_time' => $this->end_time,
            'total_score' => $this->total_score,
            'question_results' => $results,
        ];
    }
    protected function isJson($string) {
        json_decode($string);
        return (json_last_error() == JSON_ERROR_NONE);
    }
}
