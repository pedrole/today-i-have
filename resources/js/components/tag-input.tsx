import { X } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type TagInputProps = {
    name: string;
    defaultValue?: string;
    placeholder?: string;
};

function normalizeTag(tag: string): string {
    return tag.trim().toLowerCase();
}

function parseTags(value: string): string[] {
    return value
        .split(',')
        .map(normalizeTag)
        .filter(Boolean)
        .filter((tag, index, array) => array.indexOf(tag) === index);
}

export default function TagInput({
    name,
    defaultValue = '',
    placeholder = 'backend, auth, bugfix',
}: TagInputProps) {
    const [draft, setDraft] = React.useState('');
    const [tags, setTags] = React.useState<string[]>(() =>
        parseTags(defaultValue),
    );

    function addTag(rawTag: string): void {
        const tag = normalizeTag(rawTag);

        if (!tag) {
            return;
        }

        setTags((currentTags) =>
            currentTags.includes(tag) ? currentTags : [...currentTags, tag],
        );
        setDraft('');
    }

    function removeTag(tagToRemove: string): void {
        setTags((currentTags) =>
            currentTags.filter((tag) => tag !== tagToRemove),
        );
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            addTag(draft);
        }

        if (event.key === 'Backspace' && !draft && tags.length > 0) {
            event.preventDefault();
            removeTag(tags[tags.length - 1]);
        }
    }

    function handleBlur(): void {
        if (draft.trim()) {
            addTag(draft);
        }
    }

    return (
        <div className="space-y-3">
            <input type="hidden" name={name} value={tags.join(',')} />

            <div className="rounded-md border border-input bg-background p-3 shadow-xs">
                <div className="mb-3 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="secondary"
                            className="gap-1 rounded-full px-3 py-1 text-sm"
                        >
                            <span>{tag}</span>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="size-5 rounded-full"
                                onClick={() => removeTag(tag)}
                                aria-label={`Remove ${tag} tag`}
                            >
                                <X className="size-3" />
                            </Button>
                        </Badge>
                    ))}
                </div>

                <Input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                />
            </div>

            <p className="text-sm text-muted-foreground">
                Press Enter or comma to add a tag.
            </p>
        </div>
    );
}
