<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $table = 'answers';
    public $timestamps = false;

    protected $guarded = [];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function scoreForAnswer()
    {
        return $this->questionAnswers()->sum('score');
    }

    public function scoreForAllQuestion()
    {
        return $this->questionAnswers()->with('question')->sum('score');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questionAnswers()
    {
        return $this->hasMany(QuestionAnswer::class);
    }

}
