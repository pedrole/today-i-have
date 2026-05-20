<?php

use App\Models\Tag;
use App\Models\Update;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    Carbon::setTestNow('2026-05-20');
});

afterEach(function (): void {
    Carbon::setTestNow();
});

test('guests can view users index', function () {
    $alice = User::factory()->create(['name' => 'Alice']);
    $bob = User::factory()->create(['name' => 'Bob']);

    $aliceUpdate = Update::create([
        'user_id' => $alice->id,
        'title' => 'Alice daily update',
        'description' => 'Working on the new directory',
        'posted_on' => '2026-05-10',
    ]);

    $aliceUpdate->tags()->sync([Tag::create(['name' => 'directory'])->id]);

    Update::create([
        'user_id' => $alice->id,
        'title' => 'Alice follow-up',
        'description' => 'Polished the cards',
        'posted_on' => '2026-05-15',
    ]);

    Update::create([
        'user_id' => $bob->id,
        'title' => 'Bob update',
        'description' => 'Did something earlier',
        'posted_on' => '2026-04-01',
    ]);

    $this->get(route('users.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/Index')
            ->has('users', 2)
            ->where('users.0.name', 'Alice')
            ->where('users.0.updates_count', 2)
            ->where('users.0.is_active_lately', true)
            ->where('users.1.name', 'Bob')
            ->where('users.1.updates_count', 1)
        );
});

test('guests can view user updates page', function () {
    $user = User::factory()->create();

    $update = Update::create([
        'user_id' => $user->id,
        'title' => 'Seeded update',
        'description' => 'Showing the detail page',
        'posted_on' => '2026-05-10',
    ]);

    $tag = Tag::create(['name' => 'feature']);
    $update->tags()->sync([$tag->id]);

    $this->get(route('users.show', $user))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('users/Show')
            ->where('user.id', $user->id)
            ->where('user.name', $user->name)
            ->where('user.updates_count', 1)
            ->where('user.last_update_on', '2026-05-10')
            ->has('updatesByDay.2026-05-10', 1)
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
