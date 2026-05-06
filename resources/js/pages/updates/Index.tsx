import { Link, usePage, usePoll } from '@inertiajs/react';
import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import UpdateForm from '@/components/update-form';

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

interface Props {
    updatesByDay: Record<string, Update[]>;
}

export default function Index({ updatesByDay }: Props) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);

    usePoll(30_000, { only: ['updatesByDay'] });

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold">Updates</h1>
                <div className="flex items-center gap-3">
                    <Link
                        href="/tags"
                        className="text-sm text-muted-foreground underline"
                    >
                        Browse tags
                    </Link>
                    {auth?.user && (
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                + New update
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                                <DialogHeader>
                                    <DialogTitle>Post a new update</DialogTitle>
                                    <DialogDescription>
                                        Share what you have been working on
                                        today.
                                    </DialogDescription>
                                </DialogHeader>
                                <UpdateForm
                                    onSuccess={() => setOpen(false)}
                                    cancelSlot={
                                        <button
                                            type="button"
                                            onClick={() => setOpen(false)}
                                            className="text-sm text-muted-foreground underline"
                                        >
                                            Cancel
                                        </button>
                                    }
                                />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
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
                                        <li key={tag.id}>
                                            <Link
                                                href={`/tags/${tag.id}`}
                                                className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 hover:bg-blue-200"
                                            >
                                                {tag.name}
                                            </Link>
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
