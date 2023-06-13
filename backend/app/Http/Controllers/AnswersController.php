<?php

namespace App\Http\Controllers;

use App\Http\Requests\answer\StoreAnwerRequest;
use App\Http\Resources\TestResource;
use App\Models\Answer;
use App\Models\QuestionAnswer;
use App\Models\Questions;
use App\Models\Test;
use Illuminate\Http\Request;

class AnswersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAnwerRequest $request)
    {
        $validated = $request->validated();
        $studentAnswers = $validated['answers'];
        unset($validated['answers']);

        $answerCreated = Answer::create($validated);
        $totalScore = 0;

        foreach ($studentAnswers as $questionId => $studentAnswer) {
            $question = Questions::where(['id' => $questionId, 'test_id' =>
                $validated['test_id']])->first();
            if (!$question) {
                return response("Invalid question ID:\"$questionId\"", 400);
            }

            $scoreForQuestion = $question->checkAnswer($studentAnswer);
            $data = [
                'question_id' => $questionId,
                'answer_id' => $answerCreated->id,
                'answer' => is_array($studentAnswer) ? json_encode($studentAnswer) : $studentAnswer,
                'score' => $scoreForQuestion,
            ];

            $totalScore += $scoreForQuestion;
            $questionAnswer = QuestionAnswer::create($data);
        }

        $test = Test::find($validated['test_id']);
        $maximumScore = $test->maximumScoreForTest();


        $answerCreated->total_score = 12 * ($totalScore / $maximumScore);
        $answerCreated->save();

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