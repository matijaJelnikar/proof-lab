import { redirect } from 'next/navigation'

import SignInButton from '@/app/components/auth/sign-in-button'
import { getCurrentUser } from '@/app/lib/dal'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
    const redirectTo = (await searchParams).from ?? '/'

    if (await getCurrentUser()) redirect(redirectTo)

    return (
        <div className='flex flex-col flex-1 items-center justify-center px-6'>
            <div className='flex w-full max-w-sm flex-col items-center gap-4 rounded-md border border-border bg-surface/50 px-6 py-10'>
                <h2 className='text-2xl font-bold'>Sign in</h2>
                <p className='text-center text-sm text-muted'>
                    Save your dough recipes and pick them up again on any device.
                    The calculators work without an account.
                </p>
                <SignInButton redirectTo={redirectTo} />
            </div>
        </div>
    )
}
