import { PageProps } from '@inertiajs/react';
import React from 'react';

interface Tag {
    id: number;
    name: string;
}

interface Update {
    id: number;
    title: string;
    description: string;
    posted_on: string;
    user: { name: string };
    tags: Tag[];
}

interface Props extends PageProps {
    updatesByDay: Record<string, Update[]>;
}

export default function Index({ updatesByDay }: Props) {
    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <h1 className="mb-8 text-center text-3xl font-bold">Updates</h1>
            {Object.entries(updatesByDay).map(([date, updates]) => (
                <div key={date} className="mb-8 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-blue-700">
                        {date}
                    </h2>
                    <ul className="space-y-3">
                        {updates.map((update) => (
                            <li key={update.id} className="flex flex-col gap-1">
                                <span className="text-sm text-gray-500">
                                    por {update.user?.name}
                                </span>
                                <span className="font-medium text-gray-900">
                                    {update.title}
                                </span>
                                <span className="text-gray-600">
                                    {update.description}
                                </span>
                                <ul className="mt-1 flex gap-2">
                                    {update.tags.map((tag) => (
                                        <li
                                            key={tag.id}
                                            className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700"
                                        >
                                            {tag.name}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
