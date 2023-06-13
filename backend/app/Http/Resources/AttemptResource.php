<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AttemptResource extends JsonResource {

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'score' => $this->score,
            'task_id' => $this->task_id,
            'student_id' => $this->student_id,
            'content' => $this->content,
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),
            'updated_at' => Carbon::parse($this->updated_at)->isoFormat('DD MMMM, YYYY HH:mm'),
        ];
    }
}
