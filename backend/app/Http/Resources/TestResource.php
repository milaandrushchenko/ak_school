<?php

namespace App\Http\Resources;

use App\Models\QuestionAnswer;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TestResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = auth()->user();

        $questions = [];
        foreach ($this->questions as $question) {
            $parsedQuestion = json_decode($question, true);
            if (isset($parsedQuestion['options'])) {
                $parsedQuestion['options'] = json_decode($parsedQuestion['options'], true);
            }
            $questions[] = $parsedQuestion;
        }


        $questionsWithResults = [];
        foreach ($questions as $question) {
            $questionId = $question['id'];

            $correctCount = QuestionAnswer::where('question_id', $questionId)
                ->where('score', $question['score'])
                ->count();
//            $correctCount = $question->questionAnswers()->where('is_correct', true)->count();

            $incorrectCount = QuestionAnswer::where('question_id', $questionId)
                ->where('score', 0)
                ->count();

            $сount = QuestionAnswer::where('question_id', $questionId)
                ->count();

            $question['correct_count'] = $correctCount;
            $question['incorrect_count'] = $incorrectCount;
            $question['partly_correct_count'] = $сount - ($correctCount + $incorrectCount);

            $questionsWithResults[] = $question;
        }

        $results = $this->when(
            $user->hasAnyRole(['teacher', 'admin']),
            function () {
                return AnswerResource::collection($this->answers);
            },
            function () use ($user) {
                return AnswerResource::collection($this->answers()->where('user_id', $user->id)->get());
            }
        );


        Carbon::setLocale('uk');
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'time_limit' => $this->time_limit,
            'teacher' => $this->teacher,
            'access_type' => $this->access_type,
            'max_attempts' => $this->max_attempts,
            'is_active' => $this->is_active,
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'subjects' => $this->subjects,
            'result_display_type' => $this->result_display_type,
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),
            'questions' => $questionsWithResults,
            'results' => $results,

        ];
    }
}
