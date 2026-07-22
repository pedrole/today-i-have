import { Link, usePage } from '@inertiajs/react';
import { MenuIcon } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    { label: 'Updates', href: '/updates' },
    { label: 'Tags', href: '/tags' },
    { label: 'Users', href: '/users' },
];

function isActive(url: string, href: string): boolean {
    return (
        url === href || url.startsWith(`${href}/`) || url.startsWith(`${href}?`)
    );
}

export default function PublicNavbar() {
    const page = usePage();
    const authUser = page.props.auth?.user;

    return (
        <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    href="/updates"
                    className="inline-flex items-center gap-2.5 rounded-md px-1.5 py-1 text-foreground transition hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <AppLogoIcon className="size-5 fill-current" />
                    </span>
                    <span className="text-sm font-semibold tracking-tight sm:text-base">
                        Today I Have
                    </span>
                </Link>

                <nav
                    className="hidden items-center gap-2 md:flex"
                    aria-label="Primary navigation"
                >
                    {navItems.map((item) => {
                        const active = isActive(page.url, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={active ? 'page' : undefined}
                                className={`group rounded-md px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                            >
                                <span className="relative inline-flex">
                                    {item.label}
                                    <span
                                        aria-hidden="true"
                                        className={`absolute -bottom-1 left-0 h-0.5 w-full origin-left rounded-full bg-primary transition-transform duration-200 ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                                    />
                                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:block">
                    {authUser ? (
                        <Link
                            href="/updates"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            Updates
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                            Login
                        </Link>
                    )}
                </div>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="md:hidden"
                            aria-label="Open navigation menu"
                        >
                            <MenuIcon className="size-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent
                        side="right"
                        className="w-[300px] sm:w-[340px]"
                    >
                        <SheetHeader>
                            <SheetTitle className="inline-flex items-center gap-2">
                                <span className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                                    <AppLogoIcon className="size-4 fill-current" />
                                </span>
                                Navigation
                            </SheetTitle>
                        </SheetHeader>

                        <nav
                            className="mt-2 flex flex-col gap-2 px-4"
                            aria-label="Mobile navigation"
                        >
                            {navItems.map((item) => {
                                const active = isActive(page.url, item.href);

                                return (
                                    <SheetClose asChild key={item.href}>
                                        <Link
                                            href={item.href}
                                            aria-current={
                                                active ? 'page' : undefined
                                            }
                                            className={`rounded-md px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}
                                        >
                                            {item.label}
                                        </Link>
                                    </SheetClose>
                                );
                            })}

                            <div className="mt-2 border-t border-border pt-3">
                                <SheetClose asChild>
                                    <Link
                                        href={authUser ? '/updates' : '/login'}
                                        className="block rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        {authUser ? 'Updates' : 'Login'}
                                    </Link>
                                </SheetClose>
                            </div>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
