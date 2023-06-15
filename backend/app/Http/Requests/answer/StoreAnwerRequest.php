<?php

namespace App\Http\Requests\answer;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreAnwerRequest extends FormRequest
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
        $this->merge([
            'user_id' => $this->user()->id
        ]);
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'test_id' => 'exists:tests,id',
            'user_id' => 'exists:users,id',
            'answers' => 'array',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
        ];
    }
}
