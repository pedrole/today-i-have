import { Link } from '@inertiajs/react';

interface UpdateTag {
    id: number;
    name: string;
}

interface Update {
    id: number;
    title: string;
    description: string;
    posted_on: string;
    user: { id: number; name: string };
    tags: UpdateTag[];
}

interface UserSummary {
    id: number;
    name: string;
    updates_count: number;
    last_update_on: string | null;
}

interface Props {
    user: UserSummary;
    updatesByDay: Record<string, Update[]>;
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

export default function Show({ user, updatesByDay }: Props) {
    const hasUpdates = Object.keys(updatesByDay).length > 0;

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-blue-600">
                        Contributor profile
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900">
                        {user.name}
                    </h1>
                </div>
                <Link
                    href="/users"
                    className="text-sm text-muted-foreground underline"
                >
                    Back to users
                </Link>
            </div>

            <div className="mb-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Updates</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {user.updates_count}
                    </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <p className="text-sm text-gray-500">Last activity</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">
                        {formatDate(user.last_update_on)}
                    </p>
                </div>
            </div>

            {!hasUpdates ? (
                <p className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center text-sm text-gray-500 shadow-sm">
                    No updates found for this user.
                </p>
            ) : (
                Object.entries(updatesByDay).map(([date, updates]) => (
                    <div
                        key={date}
                        className="mb-8 rounded-lg bg-white p-6 shadow"
                    >
                        <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-blue-700">
                            {date}
                        </h2>
                        <ul className="space-y-3">
                            {updates.map((update) => (
                                <li
                                    key={update.id}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="font-medium text-gray-900">
                                        {update.title}
                                    </span>
                                    <span className="text-gray-600">
                                        {update.description}
                                    </span>
                                    <ul className="mt-1 flex gap-2">
                                        {update.tags.map((tag) => (
                                            <li key={tag.id}>
                                                <Link
                                                    href={`/tags/${tag.id}`}
                                                    className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-200"
                                                >
                                                    #{tag.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );
}