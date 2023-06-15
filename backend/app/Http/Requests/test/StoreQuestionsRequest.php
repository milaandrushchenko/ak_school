<?php

namespace App\Http\Requests\test;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuestionsRequest extends FormRequest
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
        $test = $this->route('test_id');
        $this->merge([
            'test_id' => $test
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules()
    {
        return [
            'question' => 'required|string',
            'test_id' => 'exists:tests,id',
            'type' => 'required|string|max:1000',
            'options' => 'array',
            'score' => 'required|numeric',
        ];
    }
}
