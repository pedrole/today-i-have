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

interface Props {
    user: { id: number; name: string };
    updatesByDay: Record<string, Update[]>;
}

export default function Show({ user, updatesByDay }: Props) {
    const hasUpdates = Object.keys(updatesByDay).length > 0;

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Link
                    href="/updates"
                    className="text-sm text-muted-foreground underline"
                >
                    All updates
                </Link>
            </div>

            {!hasUpdates ? (
                <p className="text-sm text-gray-500">
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
