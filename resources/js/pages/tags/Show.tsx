import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface Tag {
    id: number;
    name: string;
}

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
    tag: Tag;
    updatesByDay: Record<string, Update[]>;
}

export default function Show({ tag, updatesByDay }: Props) {
    const hasUpdates = Object.keys(updatesByDay).length > 0;

    return (
        <PublicLayout>
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tag: #{tag.name}</h1>
                    <Link
                        href="/tags"
                        className="text-sm text-muted-foreground underline"
                    >
                        All tags
                    </Link>
                </div>

                {!hasUpdates ? (
                    <p className="text-sm text-gray-500">
                        No updates found for this tag.
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
                                        <span className="text-sm text-gray-500">
                                            por{' '}
                                            <Link
                                                href={`/users/${update.user?.id}`}
                                                className="font-medium text-gray-700 hover:underline"
                                            >
                                                {update.user?.name}
                                            </Link>
                                        </span>
                                        <span className="font-medium text-gray-900">
                                            {update.title}
                                        </span>
                                        <span className="text-gray-600">
                                            {update.description}
                                        </span>
                                        <ul className="mt-1 flex gap-2">
                                            {update.tags.map((updateTag) => (
                                                <li key={updateTag.id}>
                                                    <Link
                                                        href={`/tags/${updateTag.id}`}
                                                        className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-200"
                                                    >
                                                        #{updateTag.name}
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
        </PublicLayout>
    );
}
