<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $tags = Tag::query()
            ->withCount('updates')
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('tags/Index', [
            'tags' => $tags,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Tag $tag): Response
    {
        $updatesByDay = $tag->updates()
            ->with(['user', 'tags'])
            ->orderByDesc('posted_on')
            ->get()
            ->groupBy('posted_on')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('tags/Show', [
            'tag' => [
                'id' => $tag->id,
                'name' => $tag->name,
            ],
            'updatesByDay' => $updatesByDay,
        ]);
    }
}
