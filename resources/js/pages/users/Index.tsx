import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface UserSummary {
    id: number;
    name: string;
    updates_count: number;
    last_update_on: string | null;
    is_active_lately: boolean;
}

interface Props {
    users: UserSummary[];
}

function formatDate(value: string | null): string {
    if (!value) {
        return 'No updates yet';
    }

    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
}

export default function Index({ users }: Props) {
    const activeUsers = users.filter((user) => user.is_active_lately).length;

    return (
        <PublicLayout>
            <div className="mx-auto max-w-4xl px-4 py-8">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium tracking-[0.2em] text-blue-600 uppercase">
                            Directory
                        </p>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Users
                        </h1>
                        <p className="mt-2 max-w-2xl text-sm text-gray-600">
                            Discover contributors, check how active they have
                            been, and jump directly into their update feed.
                        </p>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <div className="rounded-full bg-blue-50 px-4 py-2 text-blue-700 ring-1 ring-blue-100">
                            {users.length} users
                        </div>
                        <div className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-700 ring-1 ring-emerald-100">
                            {activeUsers} active lately
                        </div>
                    </div>
                </div>

                {users.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center shadow-sm">
                        <p className="text-sm text-gray-500">No users found.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {users.map((user) => (
                            <Link
                                key={user.id}
                                href={`/users/${user.id}`}
                                className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700">
                                            {user.name}
                                        </h2>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {user.updates_count} updates
                                        </p>
                                    </div>
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${user.is_active_lately ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        {user.is_active_lately
                                            ? 'Active lately'
                                            : 'Quiet for now'}
                                    </span>
                                </div>

                                <div className="mt-5 flex items-center justify-between text-sm text-gray-600">
                                    <span>Last update</span>
                                    <span className="font-medium text-gray-900">
                                        {formatDate(user.last_update_on)}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
