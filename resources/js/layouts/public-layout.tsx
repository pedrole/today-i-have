import type { ReactNode } from 'react';
import PublicNavbar from '@/components/public-navbar';

interface PublicLayoutProps {
    children: ReactNode;
    contentClassName?: string;
}

export default function PublicLayout({
    children,
    contentClassName,
}: PublicLayoutProps) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
            <PublicNavbar />
            <main className={contentClassName}>{children}</main>
        </div>
    );
}
