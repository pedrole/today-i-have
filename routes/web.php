<?php

use App\Http\Controllers\TagController;
use App\Http\Controllers\UpdateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('updates', UpdateController::class)
    ->except(['index', 'show'])
    ->middleware(['auth']);
Route::resource('updates', UpdateController::class)->only(['index', 'show']);
Route::resource('tags', TagController::class)->only(['index', 'show']);

require __DIR__.'/settings.php';
