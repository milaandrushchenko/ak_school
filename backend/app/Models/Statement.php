<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Statement extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $guarded = [];

    public function subject(){
        return $this->belongsTo(Subject::class, 'subject_id');
    }
    public function session_scores(){
        return $this->hasMany(SessionScores::class, 'statement_id');
    }
}
