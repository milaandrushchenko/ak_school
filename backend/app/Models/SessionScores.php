<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class SessionScores extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $guarded = [];

    public function statement(){
        return $this->belongsTo(Statement::class, 'statement_id');
    }
    public function student(){
        return $this->belongsTo(User::class, 'student_id');
    }
}
