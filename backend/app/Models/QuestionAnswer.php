<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAnswer extends Model
{
    use HasFactory;

    protected $table = 'question_answers';
    public $timestamps = false;
    protected $guarded = [];

    public function question()
    {
        return $this->belongsTo(Questions::class);
    }

    public function answer()
    {
        return $this->belongsTo(Answer::class);
    }

}
