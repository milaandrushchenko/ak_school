<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'subject_id' => 'exists:subjects,id',
            'done_to' => 'nullable|date',
            'content' => 'required|string',
        ];
    }
}
