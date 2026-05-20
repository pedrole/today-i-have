<?php

use App\Http\Controllers\TagController;
use App\Http\Controllers\UpdateController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/updates')->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('updates', UpdateController::class)
    ->except(['index', 'show'])
    ->middleware(['auth']);
Route::resource('updates', UpdateController::class)->only(['index', 'show']);
Route::resource('tags', TagController::class)->only(['index', 'show']);
Route::resource('users', UserController::class)->only(['index', 'show']);

require __DIR__.'/settings.php';
