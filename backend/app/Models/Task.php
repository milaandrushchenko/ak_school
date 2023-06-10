<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Task extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = 'tasks';
    protected $guarded = [];

    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id')->select(['id', 'name', 'teacher_id']);
    }
}
