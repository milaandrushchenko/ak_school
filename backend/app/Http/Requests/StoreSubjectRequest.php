<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreSubjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
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
            'classes_ids' => 'nullable|array',
            'classes_ids.*' => [
                'exists:classes,id',
            ],
        ];

    }
}
