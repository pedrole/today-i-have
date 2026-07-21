import { Link, usePage, usePoll } from '@inertiajs/react';
import { useState } from 'react';
import { ArrowRight, LogIn, Sparkles } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import UpdateForm from '@/components/update-form';
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
    updatesByDay: Record<string, Update[]>;
}

export default function Index({ updatesByDay }: Props) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const hasUpdates = Object.keys(updatesByDay).length > 0;

    usePoll(30_000, { only: ['updatesByDay'] });

    return (
        <PublicLayout>
            <div className="mx-auto max-w-2xl px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Updates</h1>
                    <div className="flex items-center gap-3">
                        {auth?.user && (
                            <Dialog open={open} onOpenChange={setOpen}>
                                <DialogTrigger className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                                    + New update
                                </DialogTrigger>
                                <DialogContent className="max-w-lg">
                                    <DialogHeader>
                                        <DialogTitle>
                                            Post a new update
                                        </DialogTitle>
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
                {hasUpdates ? (
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
                                        <div className="flex items-center justify-between gap-4">
                                            <span className="text-sm text-gray-500">
                                                por{' '}
                                                <Link
                                                    href={`/users/${update.user?.id}`}
                                                    className="font-medium text-gray-700 hover:underline"
                                                >
                                                    {update.user?.name}
                                                </Link>
                                            </span>
                                            <Link
                                                href={`/updates/${update.id}`}
                                                className="text-sm text-muted-foreground underline"
                                            >
                                                View update
                                            </Link>
                                        </div>
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
                    ))
                ) : (
                    <div className="rounded-3xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-6 py-12 text-center shadow-sm sm:px-10">
                        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                            <Sparkles className="size-8" />
                        </div>
                        <p className="text-xs font-semibold tracking-[0.3em] text-blue-600 uppercase">
                            No updates yet
                        </p>
                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                            Be the first to share progress
                        </h2>
                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
                            {auth?.user
                                ? 'Post the first update to start the daily log and make this feed come alive.'
                                : 'Sign in to start sharing your work and turn this empty feed into a living activity stream.'}
                        </p>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            {auth?.user ? (
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                >
                                    <ArrowRight className="size-4" />
                                    Post your first update
                                </button>
                            ) : (
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                >
                                    <LogIn className="size-4" />
                                    Login to share your work
                                </Link>
                            )}
                            <Link
                                href="/tags"
                                className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-5 py-3 text-sm font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                            >
                                Browse tags
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
