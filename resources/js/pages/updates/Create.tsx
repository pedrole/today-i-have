import { Head, Link } from '@inertiajs/react';
import Heading from '@/components/heading';
import UpdateForm from '@/components/update-form';
import AppLayout from '@/layouts/app-layout';
import { index } from '@/routes/updates';
import type { BreadcrumbItem } from '@/types';

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

                <UpdateForm
                    cancelSlot={
                        <Link
                            href={index()}
                            className="text-sm text-muted-foreground underline"
                        >
                            Cancel
                        </Link>
                    }
                />
            </div>
        </AppLayout>
    );
}
