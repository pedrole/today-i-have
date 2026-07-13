<?php

use App\Models\Tag;
use App\Models\Update;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('guests can view updates index', function () {
    $response = $this->get(route('updates.index'));

    $response->assertOk();
});

test('guests are redirected to login when opening update create page', function () {
    $response = $this->get(route('updates.create'));

    $response->assertRedirect(route('login', absolute: false));
});

test('guests are redirected to login when posting update', function () {
    $response = $this->post(route('updates.store'), []);

    $response->assertRedirect(route('login', absolute: false));
});

test('authenticated users can open update create page', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get(route('updates.create'));

    $response->assertOk();
});

test('authenticated users can create an update', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Worked on issue #3',
            'description' => 'Implemented create and store',
            'posted_on' => now()->toDateString(),
        ]);

    $response->assertRedirect(route('updates.index', absolute: false));

    $this->assertDatabaseHas('updates', [
        'user_id' => $user->id,
        'title' => 'Worked on issue #3',
        'posted_on' => now()->toDateString(),
    ]);
});

test('tags are created and attached when posting an update', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Tag feature',
            'description' => 'Testing tags',
            'posted_on' => now()->toDateString(),
            'tags' => 'backend,auth',
        ]);

    $this->assertDatabaseHas('tags', ['name' => 'backend']);
    $this->assertDatabaseHas('tags', ['name' => 'auth']);

    $update = Update::first();
    expect($update->tags)->toHaveCount(2);
    expect($update->tags->pluck('name')->sort()->values()->all())->toBe(['auth', 'backend']);
});

test('existing tags are reused and not duplicated', function () {
    $user = User::factory()->create();
    Tag::create(['name' => 'backend']);

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Reuse tag',
            'description' => 'Testing tag reuse',
            'posted_on' => now()->toDateString(),
            'tags' => 'backend,auth',
        ]);

    expect(Tag::where('name', 'backend')->count())->toBe(1);
});

test('duplicate tags in the same submission are ignored', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Dedup tags',
            'description' => 'Testing deduplication',
            'posted_on' => now()->toDateString(),
            'tags' => 'backend,Backend, BACKEND',
        ]);

    expect(Tag::where('name', 'backend')->count())->toBe(1);

    $update = Update::first();
    expect($update->tags)->toHaveCount(1);
});

test('update without tags is created successfully', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'No tags',
            'description' => 'Testing without tags',
            'posted_on' => now()->toDateString(),
        ]);

    $response->assertRedirect(route('updates.index', absolute: false));

    $update = Update::first();
    expect($update->tags)->toHaveCount(0);
});

test('title is required', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'description' => 'Missing title',
            'posted_on' => now()->toDateString(),
        ])
        ->assertSessionHasErrors('title');
});

test('description is required', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Missing description',
            'posted_on' => now()->toDateString(),
        ])
        ->assertSessionHasErrors('description');
});

test('posted_on is required', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Missing date',
            'description' => 'No date here',
        ])
        ->assertSessionHasErrors('posted_on');
});

test('user cannot post more than one update per day even with different titles', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'First update',
            'description' => 'First one',
            'posted_on' => now()->toDateString(),
        ]);

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Second update',
            'description' => 'Second one',
            'posted_on' => now()->toDateString(),
        ])
        ->assertSessionHasErrors([
            'posted_on' => 'You can only post one update per day.',
        ]);
});

test('user can reuse the same title on different days', function () {
    $user = User::factory()->create();

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Daily summary',
            'description' => 'First day summary',
            'posted_on' => '2026-07-13',
        ])
        ->assertRedirect(route('updates.index', absolute: false));

    $this
        ->actingAs($user)
        ->post(route('updates.store'), [
            'title' => 'Daily summary',
            'description' => 'Second day summary',
            'posted_on' => '2026-07-14',
        ])
        ->assertRedirect(route('updates.index', absolute: false));

    $this->assertDatabaseCount('updates', 2);
});
