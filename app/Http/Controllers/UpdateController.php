<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateRequest;
use App\Models\Tag;
use App\Models\Update;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UpdateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
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
    public function create()
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
            ->map(function (string $tagName): int {
                return Tag::firstOrCreate([
                    'name' => $tagName,
                ])->id;
            })
            ->values();

        $update->tags()->sync($tagIds);

        return redirect()
            ->route('updates.index')
            ->with('success', 'Update created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Update $update)
    {
        //
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
