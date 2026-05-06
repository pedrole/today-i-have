import { Form } from '@inertiajs/react';
import UpdateController from '@/actions/App/Http/Controllers/UpdateController';
import InputError from '@/components/input-error';
import TagInput from '@/components/tag-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type UpdateFormProps = {
    onSuccess?: () => void;
    cancelSlot?: React.ReactNode;
};

export default function UpdateForm({ onSuccess, cancelSlot }: UpdateFormProps) {
    return (
        <Form
            {...UpdateController.store.form()}
            className="space-y-6"
            onSuccess={onSuccess}
            resetOnSuccess
        >
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

                    <div className="grid gap-2">
                        <Label>Tags</Label>
                        <TagInput name="tags" />
                        <InputError message={errors.tags} />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Saving...' : 'Save update'}
                        </Button>
                        {cancelSlot}
                    </div>
                </>
            )}
        </Form>
    );
}
