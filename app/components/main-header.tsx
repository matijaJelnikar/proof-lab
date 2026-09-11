import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo.svg'; // Static image in the assets folder
import MainNav from '@/app/components/main-nav';
import UserMenu from '@/app/components/auth/user-menu';

export default function MainHeader() {
    return (
        <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-2xl">
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

                <div className="flex items-center gap-3">
                    <nav>
                        <MainNav />
                    </nav>
                    <UserMenu />
                </div>
            </div>
        </header>
    );
}
