'use client'

import { HomeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    const selectedClasses = (pathname: string) => isActive(pathname) ? 'bg-accent/90 text-accent-foreground font-medium' : 'text-muted';


    return (
        <nav className="fixed bottom-0 z-50 h-16 w-full flex justify-center border-t border-border/40 bg-background/80 sm:hidden backdrop-blur-2xl shadow-lg">
            <Link href="/pizza"
                className={`flex items-center justify-center w-20 rounded-md px-3 transition-colors ${selectedClasses('/pizza')}`}
            >Pizza</Link>
            <Link href="/" className={`flex items-center justify-center w-20 rounded-md px-3 transition-colors ${selectedClasses('/')}`} aria-current={isActive('/') ? 'page' : undefined}>
                <HomeIcon className="size-6" />
            </Link>
            <Link href="/bread" className={`flex items-center justify-center w-20 rounded-md px-3 transition-colors ${selectedClasses('/bread')}`} aria-current={isActive('/bread') ? 'page' : undefined}>Bread</Link>
        </nav>

    )
}