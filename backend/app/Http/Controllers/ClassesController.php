<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClassResource;
use App\Models\Classes;
use App\Http\Requests\StoreClassesRequest;
use App\Http\Requests\UpdateClassesRequest;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ClassResource::collection(
            Classes::query()->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClassesRequest $request)
    {
        $data = $request->validated();


        $students = $data['student_ids'];
        unset($data['student_ids']);

        $class = Classes::create($data);

        $class->students()->attach($students);

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
    public function update(UpdateClassesRequest $request, Classes $class)
    {
        $data = $request->validated();
        $students = $data['student_ids'];
        unset($data['student_ids']);

        $class->update($data);

        $class->students()->sync($students);
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
