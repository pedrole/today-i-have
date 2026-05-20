<?php

use App\Models\Update;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can view user updates page', function () {
    $user = User::factory()->create();

    $this->get(route('users.show', $user))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/Show')
            ->where('user.id', $user->id)
            ->where('user.name', $user->name)
        );
});

test('user show only displays updates from selected user', function () {
    $alice = User::factory()->create();
    $bob = User::factory()->create();

    Update::create([
        'user_id' => $alice->id,
        'title' => 'Alice update',
        'description' => 'Alice did something',
        'posted_on' => '2026-05-01',
    ]);

    Update::create([
        'user_id' => $bob->id,
        'title' => 'Bob update',
        'description' => 'Bob did something',
        'posted_on' => '2026-05-02',
    ]);

    $this->get(route('users.show', $alice))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/Show')
            ->where('user.name', $alice->name)
            ->has('updatesByDay.2026-05-01', 1)
            ->missing('updatesByDay.2026-05-02')
        );
});

test('user show page shows empty state when user has no updates', function () {
    $user = User::factory()->create();

    $this->get(route('users.show', $user))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/Show')
            ->where('updatesByDay', [])
        );
});
