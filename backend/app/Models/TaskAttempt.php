<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class TaskAttempt extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $guarded = [];

    public function task(){
        return $this->belongsTo(Task::class, 'task_id');
    }

}
