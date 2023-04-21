<?php

namespace App\Http\Resources;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClassResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        //Carbon::setLocale('uk');
        return [
            'id' => $this->id,
            'name' => $this->name,
            'monitor' => $this->monitor,
            'teacher' => $this->teacher,
            'students' => $this->students,
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),

        ];
    }
}
