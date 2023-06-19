<?php

namespace App\Http\Controllers;

use App\Http\Requests\test\StoreQuestionsRequest;
use App\Http\Requests\test\StoreTestRequest;
use App\Http\Requests\test\UpdateQuestionsRequest;
use App\Http\Requests\test\UpdateTestRequest;
use App\Http\Resources\TestResource;
use App\Models\Answer;
use App\Models\QuestionAnswer;
use App\Models\Questions;
use App\Models\Subject;
use App\Models\Test;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;


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

        $subjects= $data['subject_ids'];
        unset($data['subject_ids']);

        $test = Test::create($data);

        $subjects = collect($subjects)->map(function ($subjectId) {
            return Subject::findOrFail($subjectId);
        });

        $test->subjects()->attach($subjects->pluck('id'));

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
    public function update(UpdateTestRequest $request, Test $test)
    {
        $data = $request->validated();
        $subjects = $data['subject_ids'];
        unset($data['subject_ids']);

        $test->update($data);

        $test->subjects()->sync($subjects);

        return response(new TestResource($test), 201);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Test $test)
    {
        $test->delete();

        return response('test was deleted', 204);
    }

    public function changeTestStatus(Test $test)
    {
        if ($test->is_active === 0) {
            // Перевіряємо, чи тест має хочаб 2 питання
            if ($test->questions()->count() < 2) {
                return response()->json(['errors' => 'Тест повинен мати хочаб 2 питання.'], 400);
            }

            // Перевіряємо, чи дата завершення тесту ще не минула
            if ($test->end_time && Carbon::now()->isAfter($test->end_time)) {
                return response()->json(['errors' => 'Дата завершення тесту вже минула.'], 400);
            }
        }

        // Виконуємо зміну статусу тесту
        $test->setStatus(!$test->is_active);

        return response()->json(['message' => 'Статус тесту змінено успішно.'], 200);

    }

    public function addQuestions(StoreQuestionsRequest $request, string $id)
    {
        $data = $request->validated();
        if (is_array($data['options'])) {
            $data['options'] = json_encode($data['options']);
        }
//        var_dump($data);
        $question = Questions::create($data);

        $parsedQuestion = json_decode($question, true);
        $parsedQuestion['options'] = json_decode($parsedQuestion['options'], true);

        return response($parsedQuestion, 201);
    }

    public function updateQuestions(UpdateQuestionsRequest $request, string $id)
    {
        $data = $request->validated();
        $question = Questions::findOrFail($id);
        if (is_array($data['options'])) {
            $data['options'] = json_encode($data['options']);
        }

        $question->update($data);

        $parsedQuestion = json_decode($question, true);
        $parsedQuestion['options'] = json_decode($parsedQuestion['options'], true);
        $correctCount = QuestionAnswer::where('question_id', $request['question_id'])
            ->where('score', $question['score'])
            ->count();
//            $correctCount = $question->questionAnswers()->where('is_correct', true)->count();

        $incorrectCount = QuestionAnswer::where('question_id', $request['question_id'])
            ->where('score', 0)
            ->count();

        $сount = QuestionAnswer::where('question_id', $request['question_id'])
            ->count();

        $parsedQuestion['correct_count'] = $correctCount;
        $parsedQuestion['incorrect_count'] = $incorrectCount;
        $parsedQuestion['partly_correct_count'] = $сount - ($correctCount + $incorrectCount);

        return response($parsedQuestion, 201);
    }

    public function deleteQuestions(string $id)
    {
        $question = Questions::findOrFail($id);
        $question->delete();

        return response('question was deleted', 204);
    }


    public function getBySlug(Test $test)
    {
//        if (!$test->is_active) {
//            return response('', 404);
//        }
//        $currentDate = new \DateTime();
//        $expireDate = new \DateTime($survey->expire_date);
//        if ($currentDate > $expireDate) {
//            return response('', 404);
//        };
        return new TestResource($test);
    }

}
