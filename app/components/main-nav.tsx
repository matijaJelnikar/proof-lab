'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV = [
    { href: '/pizza', label: 'Pizza' },
    { href: '/bread', label: 'Bread' },
];

export default function MainNav() {
    const pathname = usePathname();

    return (
        <ul className="items-center gap-1 text-sm hidden sm:flex">
            {NAV.map(({ href, label }) => {
                const active = pathname === href;
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            aria-current={active ? 'page' : undefined}
                            className={`rounded-md px-3 py-1.5 transition-colors ${active
                                ? 'bg-accent text-accent-foreground font-medium'
                                : 'text-muted hover:text-foreground hover:bg-border/20'
                                }`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
