<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAttemptRequest;
use App\Http\Resources\AttemptResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Models\TaskAttempt;
class TasksController extends Controller
{
    public function index(){

//        $user = auth()->user();
//
//        if ($user->hasRole('admin')) {
            $tasks = Task::query()->orderBy('done_to', 'desc')->get();
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

    public function updateTaskAttempt(UpdateAttemptRequest $request, string $id){
        $data = $request->validated();
        $data['score'] = number_format($data['score'], 2);
        $attempt = TaskAttempt::findOrFail($id);
        $attempt->update($data);
        return response(new AttemptResource($attempt), 201);
    }
}
