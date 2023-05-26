<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTestRequest;
use App\Http\Resources\TestResource;
use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
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
            $tests = Test::query()->orderBy('title', 'desc')->get();
        } else if ($user->hasRole('teacher')) {
            // Якщо користувач є вчителем, показуємо тільки ті класи, в яких він є класним керівником
            $tests = $user->teacherTests()->orderBy('title', 'desc')->get();
        } else {
            // Якщо роль користувача не відповідає жодній з вище перерахованих, показуємо порожній список класів
            $tests = [];
        }

        return TestResource::collection($tests);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTestRequest $request)
    {
        $data = $request->validated();

        $test = Test::create($data);

        return response(new TestResource($test), 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
