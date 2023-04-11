<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'login',
        'first_name',
        'second_name',
        'password',
        'status',
    ];

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
}
