'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg'; // Static image in the assets folder
import { usePathname } from 'next/navigation';

const NAV = [
    { href: '/pizza', label: 'Pizza' },
    { href: '/bread', label: 'Bread' },
];

export default function MainHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-3 sm:px-16">
                <Link href="/" className="group flex items-center gap-3">
                    <Image
                        src={logo}
                        alt=""
                        width={36}
                        height={36}
                        className="transition-transform duration-300 group-hover:rotate-6"
                    />
                    <span className="flex flex-col leading-tight">
                        <span className="text-lg font-bold tracking-tight">Proof lab</span>
                        <span className="text-xs text-muted">Calculate, proof, bake</span>
                    </span>
                </Link>

                <nav>
                    <ul className="flex items-center gap-1 text-sm">
                        {NAV.map(({ href, label }) => {
                            const pathname = usePathname();
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
                </nav>
            </div>
        </header>
    );
}