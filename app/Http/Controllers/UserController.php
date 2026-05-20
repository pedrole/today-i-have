<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function show(User $user): Response
    {
        $updatesByDay = $user->updates()
            ->with(['user', 'tags'])
            ->orderByDesc('posted_on')
            ->get()
            ->groupBy('posted_on')
            ->map(function ($group) {
                return $group->values();
            });

        return Inertia::render('users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
            ],
            'updatesByDay' => $updatesByDay,
        ]);
    }
}
