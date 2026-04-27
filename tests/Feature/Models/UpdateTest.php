<?php

use App\Models\Update;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('uses sqlite memory for testing', function () {
    expect(config('database.default'))->toBe('sqlite');
    expect(config('database.connections.sqlite.database'))->toBe(':memory:');
});

it('prevents a user from posting more than one update per day', function () {

    $user = User::factory()->create();

    Update::create([
        'user_id' => $user->id,
        'title' => 'First update',
        'description' => 'Working today',
        'posted_on' => today(),
    ]);

    expect(fn () => Update::create([
        'user_id' => $user->id,
        'title' => 'Second update',
        'description' => 'More work',
        'posted_on' => today(),
    ]))->toThrow(\Illuminate\Database\QueryException::class);

});

it('allows a user to post updates on different days', function () {

    $user = User::factory()->create();

    Update::create([
        'user_id' => $user->id,
        'title' => 'Day one',
        'description' => 'Working on feature',
        'posted_on' => now()->subDay()->toDateString(),
    ]);

    $secondUpdate = Update::create([
        'user_id' => $user->id,
        'title' => 'Day two',
        'description' => 'More work',
        'posted_on' => now()->toDateString(),
    ]);

    expect($secondUpdate)->not->toBeNull();
});
