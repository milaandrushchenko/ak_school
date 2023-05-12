<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UpdateClassesRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'monitor_id' => [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    if (isset($this->student_ids) && !in_array($value, $this->student_ids)) {
                        $fail('Староста повинен бути обраний серед учнів.');
                    }
                },
            ],
            'teacher_id' => [
                'nullable',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = User::find($value);
                    if (!$user->hasRole('teacher')) {
                        $fail("Помилка. " . $user->first_name . ' ' . $user->second_name . " не є вчителем.");
                    }
                }
            ],
            'student_ids' => 'nullable|array',
            'student_ids.*' => [
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = User::find($value);
                    if (!$user->hasRole('student')) {
                        $fail("Помилка. " . $user->first_name . ' ' . $user->second_name . " не є учнем.");
                    }
                },
            ],
        ];
    }

}
