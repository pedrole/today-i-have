<?php

use App\Models\Tag;
use App\Models\Update;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('guests can view tags index', function () {
    Tag::create(['name' => 'backend']);
    Tag::create(['name' => 'frontend']);

    $this->get(route('tags.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tags/Index')
            ->has('tags', 2)
        );
});

test('tag show only displays updates from selected tag', function () {
    $user = User::factory()->create();

    $backend = Tag::create(['name' => 'backend']);
    $frontend = Tag::create(['name' => 'frontend']);

    $backendUpdate = Update::create([
        'user_id' => $user->id,
        'title' => 'Backend work',
        'description' => 'Implemented API endpoint',
        'posted_on' => '2026-05-01',
    ]);

    $frontendUpdate = Update::create([
        'user_id' => $user->id,
        'title' => 'Frontend work',
        'description' => 'Styled the modal',
        'posted_on' => '2026-05-02',
    ]);

    $backendUpdate->tags()->sync([$backend->id]);
    $frontendUpdate->tags()->sync([$frontend->id]);

    $this->get(route('tags.show', $backend))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tags/Show')
            ->where('tag.name', 'backend')
            ->has('updatesByDay.2026-05-01', 1)
            ->missing('updatesByDay.2026-05-02')
        );
});

test('tags index includes updates count', function () {
    $user = User::factory()->create();
    $tag = Tag::create(['name' => 'backend']);

    $firstUpdate = Update::create([
        'user_id' => $user->id,
        'title' => 'First backend update',
        'description' => 'Did backend task 1',
        'posted_on' => '2026-05-03',
    ]);

    $secondUpdate = Update::create([
        'user_id' => $user->id,
        'title' => 'Second backend update',
        'description' => 'Did backend task 2',
        'posted_on' => '2026-05-04',
    ]);

    $firstUpdate->tags()->sync([$tag->id]);
    $secondUpdate->tags()->sync([$tag->id]);

    $this->get(route('tags.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tags/Index')
            ->where('tags.0.name', 'backend')
            ->where('tags.0.updates_count', 2)
        );
});
