<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Questions extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = 'questions';
    protected $guarded = [];

    public function checkAnswer($answer)
    {
        $options = json_decode($this->options, true);
        switch ($this->type) {
            case 'single-choice':
                $correctOption = collect($options)->firstWhere('isCorrect', true);
                $isAnswerCorrect = ($correctOption && $correctOption['text'] === $answer);
                if ($isAnswerCorrect) {
                    return $this->score;
                }
                break;
            case 'short-answer':
                $userAnswer = mb_strtolower(trim($answer)); // перетворення введеної відповіді у нижній регістр та видалення зайвих пробілів
                $correctAnswers = array_map('mb_strtolower', array_map('trim', $options));
                if (in_array($userAnswer, $correctAnswers)) {
                    return $this->score;
                }
                break;
            case 'multiple-choice':
                $correctOptions = collect($options)->where('isCorrect', true)->all();
                $scoreForEachCorrectAnswer = $this->score / count($correctOptions);
                $totalScore = 0;
                $countCorrectAnswer = 0;
                foreach ($correctOptions as $value) {
                    if (in_array($value['text'], $answer)) {
                        $countCorrectAnswer++;
                        $totalScore += $scoreForEachCorrectAnswer;
                    }
                }
                if ($countCorrectAnswer === count($answer)) {
                    return $totalScore;
                }
                break;
            case 'matching':
                $correctOptions =$options['correctAnswers'];
                $scoreForEachCorrectAnswer = $this->score / count($correctOptions);
                $totalScore = 0;
                $countCorrectAnswer = 0;

                foreach ($correctOptions as $value) {
                    if (in_array($value, $answer)) {
                        $countCorrectAnswer++;
                        $totalScore += $scoreForEachCorrectAnswer;
                    }
                }
                if ($countCorrectAnswer === count($answer)) {
                    return $totalScore;
                }
                break;
        }
        return 0;

    }

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }
}
