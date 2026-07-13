<?php

use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('authenticated user can post update and see it across update and tag views', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Integration flow update',
            'description' => 'Posted through the protected endpoint.',
            'posted_on' => '2026-07-13',
            'tags' => 'integration,flow',
        ])
        ->assertRedirect(route('updates.index', absolute: false));

    $this->assertDatabaseHas('updates', [
        'user_id' => $user->id,
        'title' => 'Integration flow update',
        'posted_on' => '2026-07-13',
    ]);

    $update = $user->updates()->firstOrFail();

    $this->get(route('updates.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('updates/Index')
            ->has('updatesByDay.2026-07-13', 1)
            ->where('updatesByDay.2026-07-13.0.title', 'Integration flow update')
        );

    $this->get(route('updates.show', $update))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('updates/Show')
            ->where('update.title', 'Integration flow update')
            ->where('update.user.name', $user->name)
        );

    $integrationTag = Tag::query()->where('name', 'integration')->firstOrFail();

    $this->get(route('tags.show', $integrationTag))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('tags/Show')
            ->where('tag.name', 'integration')
            ->has('updatesByDay.2026-07-13', 1)
            ->where('updatesByDay.2026-07-13.0.title', 'Integration flow update')
        );
});
