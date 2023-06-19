<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Subject extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $guarded = [];

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function classes()
    {
        return $this->belongsToMany(Classes::class, 'subject_classes', 'subject_id', 'class_id');
    }

    public function tasks(){
        return $this->hasMany(Task::class, 'subject_id');
    }

    public function tests()
    {
        return $this->belongsToMany(Test::class, 'test_subjects');
    }
    public function statements()
    {
        return $this->hasMany(Statement::class, 'subject_id');
    }
}
