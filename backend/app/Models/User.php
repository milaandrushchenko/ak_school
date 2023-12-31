<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Http\Controllers\SubjectsController;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use function Symfony\Component\Translation\t;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    const STATUS_NEW = 0;
    const STATUS_ACTIVE = 1;

    public function changeOfStatus()
    {
        if ($this->status == 0) {
            $this->status = 1;
            $this->isDirty('status') && $this->save();
        }
    }


    public static function getStatusTitleAttribute($user)
    {
        $status = $user->status;

        if ($status == self::STATUS_NEW) {
            return [
                'title' => 'New',
                'backgroundColor' => '#aee6eb',
                'color' => '#00aec1'
            ];
        } elseif ($status == self::STATUS_ACTIVE) {
            return [
                'title' => 'Active',
                'backgroundColor' => '#9fd99f',
                'color' => '#55a71d'
            ];
        } else {
            return 'Unknown';
        }
    }

    protected $guarded = [];
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     *
     */
//    protected $fillable = [
//        'login',
//        'first_name',
//        'second_name',
//        'password',
//        'status',
//        'class_id'
//    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function classes()
    {
        return $this->belongsTo(Classes::class,'class_id');
    }

    public function monitorClasses()
    {
        return $this->hasMany(Classes::class, 'monitor_id');
    }

    public function teacherClasses()
    {
        return $this->hasMany(Classes::class, 'teacher_id');
    }

    public function teacherTests()
    {
        return $this->hasMany(Test::class, 'created_by');
    }

    public function teacherSubjects(){
        return $this->hasMany(Subject::class, 'teacher_id');
    }
    public function sessionScores(){
        return $this->hasMany(SessionScores::class, 'student_id');
    }

}
