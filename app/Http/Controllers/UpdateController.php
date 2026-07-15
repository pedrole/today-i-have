<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateRequest;
use App\Models\Tag;
use App\Models\Update;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $updates = Update::with(['user', 'tags'])
            ->orderByDesc('posted_on')
            ->get()
            ->groupBy('posted_on')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('updates/Index', [
            'updatesByDay' => $updates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('updates/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateRequest $request)
    {
        $data = $request->validated();

        $update = Update::create([
            'user_id' => $request->user()->id,
            'title' => $data['title'],
            'description' => $data['description'],
            'posted_on' => $data['posted_on'],
        ]);

        $tagIds = collect(explode(',', $data['tags'] ?? ''))
            ->map(fn (string $tag): string => strtolower(trim($tag)))
            ->filter()
            ->unique()
            ->map(fn (string $tagName): int => Tag::firstOrCreate([
                'name' => $tagName,
            ])->id)
            ->values()
            ->all();

        $update->tags()->sync($tagIds);

        return redirect()
            ->route('updates.index')
            ->with('success', 'Update created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Update $update): Response
    {
        $update->load(['user', 'tags']);

        return Inertia::render('updates/Show', [
            'update' => [
                'id' => $update->id,
                'title' => $update->title,
                'description' => $update->description,
                'posted_on' => $update->posted_on,
                'user' => [
                    'id' => $update->user->id,
                    'name' => $update->user->name,
                ],
                'tags' => $update->tags->map(fn (Tag $tag): array => [
                    'id' => $tag->id,
                    'name' => $tag->name,
                ])->values()->all(),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Update $update)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Update $update)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Update $update)
    {
        //
    }
}
