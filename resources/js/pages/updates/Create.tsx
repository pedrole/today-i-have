import { Form, Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import UpdateController from '@/actions/App/Http/Controllers/UpdateController';
import { index } from '@/routes/updates';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Updates', href: index().url },
    { title: 'New update', href: '#' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="New update" />

            <div className="mx-auto w-full max-w-2xl space-y-6 p-4">
                <Heading
                    variant="small"
                    title="Post a new update"
                    description="Share what you have been working on today"
                />

                <Form {...UpdateController.store.form()} className="space-y-6">
                    {({ errors, processing }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="What did you work on?"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    name="description"
                                    placeholder="Describe your progress"
                                    required
                                    rows={4}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="posted_on">Date</Label>
                                <Input
                                    id="posted_on"
                                    name="posted_on"
                                    type="date"
                                    required
                                />
                                <InputError message={errors.posted_on} />
                            </div>

                            <div className="flex items-center gap-3">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save update'}
                                </Button>

                                <Link
                                    href={index()}
                                    className="text-sm text-muted-foreground underline"
                                >
                                    Cancel
                                </Link>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    name="tags"
                                    placeholder="backend, auth, bugfix"
                                />
                                <p className="text-sm text-muted-foreground">
                                    Separate tags with commas.
                                </p>
                                <InputError message={errors.tags} />
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}
