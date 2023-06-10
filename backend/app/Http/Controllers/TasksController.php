<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;

class TasksController extends Controller
{
    public function index(){

//        $user = auth()->user();
//
//        if ($user->hasRole('admin')) {
            $tasks = Task::query()->orderBy('created_at', 'desc')->get();
//        } else if ($user->hasRole('teacher')) {
//            $subjects = Subject::query()->where('teacher_id', $user['id']) ->orderBy('name', 'desc')->get();
//        } else if ($user->hasRole('student')) {
//            $ids = SubjectClass::where('class_id', $user['class_id'])->pluck('subject_id')->toArray();
//            $subjects = Subject::whereIn('id', $ids)->get();
//        } else {
//            $subjects = [];
//        }

        return TaskResource::collection($tasks);
//        return $tasks;
    }
}
