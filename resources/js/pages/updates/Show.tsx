import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface Tag {
    id: number;
    name: string;
}

interface Update {
    id: number;
    title: string;
    description: string;
    posted_on: string;
    user: { id: number; name: string };
    tags: Tag[];
}

interface Props {
    update: Update;
}

function formatDate(value: string): string {
    return new Intl.DateTimeFormat('en', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(`${value}T00:00:00`));
}

export default function Show({ update }: Props) {
    return (
        <PublicLayout>
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Update</h1>
                    <Link
                        href="/updates"
                        className="text-sm text-muted-foreground underline"
                    >
                        Back to updates
                    </Link>
                </div>

                <article className="rounded-lg border bg-white p-6 shadow-sm">
                    <div className="mb-3 flex items-center justify-between">
                        <Link
                            href={`/users/${update.user.id}`}
                            className="text-sm font-medium text-gray-700 hover:underline"
                        >
                            by {update.user.name}
                        </Link>
                        <span className="text-sm text-gray-500">
                            {formatDate(update.posted_on)}
                        </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-900">
                        {update.title}
                    </h2>
                    <p className="mt-2 whitespace-pre-line text-gray-700">
                        {update.description}
                    </p>

                    {update.tags.length > 0 && (
                        <ul className="mt-4 flex flex-wrap gap-2">
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
                    )}
                </article>
            </div>
        </PublicLayout>
    );
}
