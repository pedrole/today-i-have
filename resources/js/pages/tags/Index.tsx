import { Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';

interface Tag {
    id: number;
    name: string;
    updates_count: number;
}

interface Props {
    tags: Tag[];
}

export default function Index({ tags }: Props) {
    return (
        <PublicLayout>
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Tags</h1>
                </div>

                {tags.length === 0 ? (
                    <p className="text-sm text-gray-500">No tags yet.</p>
                ) : (
                    <ul className="space-y-3">
                        {tags.map((tag) => (
                            <li key={tag.id}>
                                <Link
                                    href={`/tags/${tag.id}`}
                                    className="flex items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm transition hover:bg-gray-50"
                                >
                                    <span className="font-medium text-gray-900">
                                        #{tag.name}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {tag.updates_count} updates
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </PublicLayout>
    );
}
