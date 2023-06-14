<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TestSubjects extends Model
{
    use HasFactory;

    protected $table = 'test_subjects';
    public $timestamps = false;
    protected $guarded = [];

    public function test()
    {
        return $this->belongsTo(Test::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

}
