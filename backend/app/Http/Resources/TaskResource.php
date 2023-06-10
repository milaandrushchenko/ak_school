<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'done' => $this->done,
            'done_to' => Carbon::parse($this->done_to)->isoFormat('DD MMMM, YYYY HH:mm'),
            'score' => $this->score,
            'subject' => $this->subject,
            'content' => $this->content,
            'created_at' => Carbon::parse($this->created_at)->isoFormat('DD MMMM, YYYY HH:mm'),
//            'updated_at' => Carbon::parse($this->updated_at)->isoFormat('DD MMMM, YYYY HH:mm'),
        ];
    }
}
