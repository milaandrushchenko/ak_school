<?php

namespace App\Http\Controllers;

use App\Http\Requests\classes\StoreAnwerRequest;
use App\Http\Requests\classes\UpdateAnswerRequest;
use App\Http\Resources\ClassResource;
use App\Models\Classes;
use App\Models\User;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $user = auth()->user();

        // Перевірка ролі користувача
        if ($user->hasRole('admin')) {
            // Якщо користувач є адміном, показуємо всі класи
            $classes = Classes::query()->orderBy('name', 'desc')->get();
        } else if ($user->hasRole('teacher')) {
            // Якщо користувач є вчителем, показуємо тільки ті класи, в яких він є класним керівником
            $classes = $user->teacherClasses()->orderBy('name', 'desc')->get();
        } else {
            // Якщо роль користувача не відповідає жодній з вище перерахованих, показуємо порожній список класів
            $classes = [];
        }

        return ClassResource::collection($classes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnwerRequest $request)
    {
        $data = $request->validated();
        $students = $data['student_ids'];
        unset($data['student_ids']);

        $class = Classes::create($data);

        $students = collect($students)->map(function ($studentId) {
            return User::findOrFail($studentId);
        });

        $class->students()->saveMany($students);

        return response(new ClassResource($class), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Classes $classes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAnswerRequest $request, Classes $class)
    {
        $data = $request->validated();
        $students = $data['student_ids'];
        unset($data['student_ids']);

        $class->update($data);

        $students = User::whereIn('id', $students)->get();

        $class->students()->whereNotIn('id', $students->pluck('id'))->update(['class_id' => null]);

        $class->students()->saveMany($students);

        return response(new ClassResource($class), 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classes $class)
    {
        $class->delete();
        return response()->json(['message' => `Class  deleted successfully`], 200);
    }

}
