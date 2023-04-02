<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserTaskController;
use Database\Seeders\UserTask;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [UserTaskController::class, 'index'])->name('index');
Route::post('/task/create', [UserTaskController::class, "create_task"]);
Route::post('/user/create', [UserTaskController::class, 'create']);
Route::post('/user/task', [UserTaskController::class, 'show']);
Route::put('/user/task/{id}', [UserTaskController::class, 'update']);
Route::patch('/user/task/{id}', [UserTaskController::class, 'edit']);
Route::delete('/user/task/{id}', [UserTaskController::class, 'delete']);


require __DIR__.'/auth.php';
