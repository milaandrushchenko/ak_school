<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SubjectsController;
use App\Http\Controllers\TasksController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\AnswersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();

    });
    Route::get('/me', [AuthController::class, 'me']);

//    Route::group(['middleware' => ['permission:show users']], function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/students-without-class/{classId?}', [UserController::class, 'getStudentsForClass']);
//    });
    Route::group(['middleware' => ['permission:create users']], function () {
        Route::post('/users/create', [UserController::class, 'store']);
    });
    Route::group(['middleware' => ['permission:delete users']], function () {
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });
    Route::group(['middleware' => ['permission:update users']], function () {
        Route::put('/users/{user}', [UserController::class, 'update']);
    });
    Route::group(['middleware' => ['permission:generate new password']], function () {
        Route::post('/users/new-password/{user}', [UserController::class, 'newPassword']);
    });


    Route::group(['middleware' => ['permission:create tests']], function () {
        Route::post('/tests/create', [TestController::class, 'store']);

    });

    Route::group(['middleware' => ['permission:update tests' , ]], function () {
        Route::post('/tests/add-questions/{test_id}', [TestController::class, 'addQuestions']);
        Route::put('/tests/update-questions/{question_id}', [TestController::class, 'updateQuestions']);
        Route::delete('/tests/delete-questions/{question_id}', [TestController::class, 'deleteQuestions']);

        Route::put('/tests/{test}', [TestController::class, 'update']);
        Route::post('/tests/{test}/changeTestStatus', [TestController::class, 'changeTestStatus']);

    });
    Route::put('/answers/changeScore/{answer}', [AnswersController::class, 'changeScore']);
    Route::group(['middleware' => ['permission:delete tests' , ]], function () {
        Route::delete('/tests/{test}', [TestController::class, 'destroy']);
    });

    Route::group(['middleware' => [
//        'permission:pass tests' ,
        ]], function () {
        Route::get('/tests/get-by-slug/{test:slug}', [TestController::class, 'getBySlug']);
    });

//    Route::post('tests/{test}/answer',[TestController::class, 'storeAnswer']);


    Route::apiResource('/tests', TestController::class);
    Route::apiResource('/roles', RoleController::class);
    Route::apiResource('/classes', ClassesController::class);

    Route::apiResource('/subjects', SubjectsController::class);

    Route::apiResource('/answers', AnswersController::class);

    Route::post('/subjects/create-task/{subject_id}', [SubjectsController::class, 'createTask']);
    Route::put('/subjects/update-task/{task_id}', [SubjectsController::class, 'updateTask']);
    Route::delete('/subjects/delete-task/{task_id}', [SubjectsController::class, 'deleteTask']);

    Route::apiResource('/tasks', TasksController::class);
    Route::put('/tasks/update-attempt/{attempt_id}', [TasksController::class, 'updateTaskAttempt']);
});




Route::post('/login', [AuthController::class, 'login']);

