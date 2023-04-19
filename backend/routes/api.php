<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

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
    //Route::apiResource('/users', UserController::class);
//    Route::get('/dashboard', [DashboardController::class, 'index']);
//    Route::apiResource('survey', SurveyController::class);

});
Route::post('/users/create', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);
Route::post('/users/new-password/{user}', [UserController::class, 'newPassword']);
Route::get('/users', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('/roles', RoleController::class);
