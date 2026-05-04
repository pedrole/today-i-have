<?php

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
