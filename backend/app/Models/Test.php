<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Test extends Model
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, HasSlug;

    protected $table = 'tests';
    protected $guarded = [];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function questions()
    {
        return $this->hasMany(Questions::class, 'test_id');
    }

    public function setStatus(bool $isActive): void
    {
        $this->is_active = $isActive;
        $this->save();
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function maximumScoreForTest()
    {
        return $this->questions()->sum('score');
    }

}
