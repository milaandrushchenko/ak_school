<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class Classes extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $guarded = [];

    public function monitor()
    {
        return $this->belongsTo(User::class, 'monitor_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function students()
    {
        return $this->hasMany(User::class, 'class_id');
    }
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subject_classes', 'class_id', 'subject_id');
    }


}
