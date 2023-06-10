<?php

namespace App\Http\Resources;

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

        $questions = [];
        foreach ($this->questions as $question) {
            $parsedQuestion = json_decode($question, true);
            if (isset($parsedQuestion['options'])) {
                $parsedQuestion['options'] = json_decode($parsedQuestion['options'], true);
            }
            $questions[] = $parsedQuestion;
        }
        //Carbon::setLocale('uk');
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
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),
            'questions' => $questions,

        ];
    }
}
