<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'teacher' => $this->teacher,
            'classes' => $this->classes,
            'tasks' => $this->tasks,
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),
            'updated_at' => Carbon::parse($this->updated_at)->isoFormat('DD MMMM, YYYY HH:mm'),
        ];
    }
}
