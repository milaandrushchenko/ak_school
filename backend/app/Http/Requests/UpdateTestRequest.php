<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:1000',
            'time_limit' => 'nullable|integer|max:180',
            'created_by' => 'exists:users,id',
            'access_type' => 'in:public,private',
            'max_attempts' => 'nullable|integer',
            'is_active' => 'nullable|boolean',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
        ];
    }
}
