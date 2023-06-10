<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }
    protected function prepareForValidation()
    {
        $subj = $this->route('subject_id');
        $this->merge([
            'subject_id' => $subj
        ]);
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
