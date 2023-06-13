<?php

namespace App\Http\Requests\user;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'login' => 'required|string|max:55|unique:users,login',
            'first_name' => 'required|string|max:55',
            'second_name' => 'required|string|max:55',
            'role' => 'required|string|max:55|exists:roles,name',
            'password' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'login.required' => 'Поле логін є обов\'язковим для заповнення.',
            'login.max' => 'Довжина логіну не повинна перевищувати :max символів.',
            'login.unique' => 'Такий логін вже існує.',
            'first_name.required' => 'Поле ім\'я є обов\'язковим для заповнення.',
            'first_name.max' => 'Довжина поля ім\'я не повинна перевищувати 55 символів.',
            'second_name.required' => 'Поле прізвище є обов\'язковим для заповнення.',
            'second_name.max' => 'Довжина поля прізвище не повинна перевищувати 55 символів.',
            'role.required' => 'Поле роль є обов\'язковим для заповнення.',
            'role.max' => 'Довжина поля роль не повинна перевищувати :max символів.',
            'role.exists' => 'Вибране значення для ролі недійсне.',
            'password.required' => 'Поле пароль є обов\'язковим для заповнення.',
        ];
    }
}
