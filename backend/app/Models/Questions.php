<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
class Questions extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    protected $table = 'questions';
    protected $guarded = [];

    public function test()
    {
        return $this->belongsTo(Test::class, 'test_id');
    }
}
