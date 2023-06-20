<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\StatementResource;
use App\Http\Resources\SubjectResource;
use App\Models\SessionScores;
use App\Models\Statement;
use App\Models\Subject;
use App\Models\SubjectClass;
use App\Models\Task;
use App\Models\TaskAttempt;
use App\Models\User;
use Carbon\Carbon;
use DateTime;
use DateTimeZone;
use Illuminate\Http\Request;

class SubjectsController extends Controller
{
    public function index(){

        $user = auth()->user();

        if ($user->hasRole('admin')) {
            $subjects = Subject::query()->orderBy('created_at', 'desc')->get();
        } else if ($user->hasRole('teacher')) {
            $subjects =$user->teacherSubjects()->orderBy('created_at', 'desc')->get();
        } else if ($user->hasRole('student')) {
            $ids = SubjectClass::where('class_id', $user['class_id'])->pluck('subject_id')->toArray();
            $subjects = Subject::whereIn('id', $ids)->orderBy('created_at', 'desc')->get();
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
        unset($data['classes']);

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
        return response()->json(['message' => "Subject deleted successfully"], 200);
    }

    public function createTask(StoreTaskRequest $request, string $id){
        $data = $request->validated();
        $task = Task::create($data);
        $class_ids = SubjectClass::where('subject_id', $task['subject_id'])->select('class_id')->get();
        $student_ids = User::whereIn('class_id', $class_ids)->select('id')->get();
        $attempts = [];
        $date = new DateTime("now", new DateTimeZone('Europe/Kiev') );
        foreach ($student_ids as $student )
            $attempts[] = [
                'task_id' => $task['id'],
                'student_id' => $student['id'],
                'updated_at' => $date->format('Y-m-d H:i:s'),
                'created_at' => $date->format('Y-m-d H:i:s'),
            ];
        TaskAttempt::insert($attempts);
        return response($task, 201);
    }

    public function updateTask(UpdateTaskRequest $request, string $id){
        $data = $request->validated();
        $task = Task::findOrFail($id);
        $task->update($data);
        return response($task, 201);
    }

    public function deleteTask(string $id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response('Task was deleted', 204);
    }

    public function getStatements(){
        $user = auth()->user();

//        if ($user->hasRole('admin') || $user->hasRole('teacher')) {
            $statements = Statement::query()->orderBy('year', 'desc')->get();
//        } else {
//
//            $statements = [];
//        }
        return StatementResource::collection($statements);
    }
    public function storeStatement(Request $request){
        $data = $request->all();
        $statement = Statement::create($data);
        $statement['session_scores'] = [];
        return response($statement, 201);
    }
    public function storeSessionScore(Request $request){
        $data = $request->all();
        $session_score = SessionScores::create($data);
        return response($session_score, 201);
    }
    public function updateSessionScore(Request $request, string $id){
        $data = $request->all();
        $session_score = SessionScores::findOrFail($id);
        $session_score->update($data);
        return response($session_score, 201);
    }

    public function updateContent(Request $request, string $id){
        $data = $request->all();
        $subject = Subject::findOrFail($id);
        $subject->update($data);
        return response($subject, 201);
    }
}
