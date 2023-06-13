<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAttemptRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'score' => 'nullable|numeric',
            'task_id' => 'exists:tasks,id',
            'student_id' => 'exists:users,id',
            'content' => 'nullable|string'
        ];
    }
}
