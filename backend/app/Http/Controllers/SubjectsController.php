<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use App\Models\SubjectClass;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Metadata\Uses;

class SubjectsController extends Controller
{
    public function index(){

        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $subjects = Subject::query()->orderBy('name', 'desc')->get();
        } else if ($user->hasRole('teacher')) {
              $subjects = Subject::query()->where('teacher_id', $user['id']) ->orderBy('name', 'desc')->get();
        } else if ($user->hasRole('student')) {
            $ids = SubjectClass::where('class_id', $user['class_id'])->pluck('subject_id')->toArray();
            $subjects = Subject::whereIn('id', $ids)->get();
        } else {
            $subjects = [];
        }
        return SubjectResource::collection($subjects);
    }

    public function show($id){
        return ('');
    }

    public function store(StoreSubjectRequest $request){
        $data = $request->validated();
        $cls = $data['classes_ids'];
        unset($data['classes_ids']);

        $subject = Subject::create($data);

        $clss = new SubjectClass;
        foreach ($cls as $c) {
            $clss::insert(['subject_id' => $subject['id'], 'class_id' => $c]);
        }
        return response(new SubjectResource($subject), 201);
    }

    public function update(UpdateSubjectRequest $request, Subject $subject){
        $data = $request->validated();
        $cls = $data['classes_ids'];
        unset($data['classes_ids']);
//        unset($data['classes']);

        $subject->update($data);

        $clss = new SubjectClass;
        $clss::where('subject_id',  $subject['id'])->delete();

        foreach ($cls as $c) {
            $clss::insert(['subject_id' => $subject['id'], 'class_id' => $c]);
        }

        return response(new SubjectResource($subject), 201);
    }

    public function destroy(Subject $subject)
    {
        $subject->delete();
        return response()->json(['message' => `Subject deleted successfully`], 200);
    }
}
