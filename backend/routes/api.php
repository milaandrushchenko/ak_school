<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ClassesController;

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

    Route::group(['middleware' => ['permission:show users']], function () {
        Route::get('/users', [UserController::class, 'index']);
    });

    Route::group(['middleware' => ['permission:create users']], function () {
        Route::post('/users/create', [UserController::class, 'store']);
    });


    Route::middleware(['permission:delete users'])->group(function () {
        Route::delete('/users/{user}', [UserController::class, 'destroy']);
    });

    Route::apiResource('/classes', ClassesController::class);
//    Route::get('/dashboard', [DashboardController::class, 'index']);
//    Route::apiResource('survey', SurveyController::class);

});

Route::put('/users/{user}', [UserController::class, 'update']);
Route::post('/users/new-password/{user}', [UserController::class, 'newPassword']);
//Route::get('/users', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('/roles', RoleController::class);
