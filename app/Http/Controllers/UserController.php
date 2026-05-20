<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->select(['id', 'name'])
            ->withCount('updates')
            ->withMax('updates', 'posted_on')
            ->orderByDesc('updates_count')
            ->orderByDesc('updates_max_posted_on')
            ->orderBy('name')
            ->get()
            ->map(function (User $user): array {
                $lastUpdateOn = $user->updates_max_posted_on;

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'updates_count' => $user->updates_count,
                    'last_update_on' => $lastUpdateOn,
                    'is_active_lately' => $lastUpdateOn !== null
                        && Carbon::parse($lastUpdateOn)->greaterThanOrEqualTo(now()->subDays(7)),
                ];
            });

        return Inertia::render('users/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user): Response
    {
        $updates = $user->updates()
            ->with(['user', 'tags'])
            ->orderByDesc('posted_on')
            ->get();

        $updatesByDay = $updates
            ->groupBy('posted_on')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'updates_count' => $updates->count(),
                'last_update_on' => $updates->first()?->posted_on,
            ],
            'updatesByDay' => $updatesByDay,
        ]);
    }
}
