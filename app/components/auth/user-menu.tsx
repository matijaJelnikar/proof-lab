import Image from 'next/image'

import { signOut } from '@/auth'
import { getCurrentUser } from '@/app/lib/dal'
import SignInButton from '@/app/components/auth/sign-in-button'

export default async function UserMenu() {
    const user = await getCurrentUser()

    if (!user) {
        return ''
    }

    return (
        <div className='flex items-center gap-2'>
            <form
                action={async () => {
                    'use server'
                    await signOut({ redirectTo: '/' })
                }}>
                <button
                    type='submit'
                    className='flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted cursor-pointer hover:text-foreground hover:bg-border/20 transition-colors'>
                    {user.image && (
                        <Image
                            src={user.image}
                            alt=''
                            width={28}
                            height={28}
                            className='rounded-full border border-border' />
                    )}
                    Sign out
                </button>
            </form>
        </div>
    )
}
