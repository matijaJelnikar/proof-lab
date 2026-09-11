import 'server-only'

import { cache } from 'react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

export type SessionUser = {
    id: string
    name: string | null
    email: string | null
    image: string | null
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
    const session = await auth()
    const user = session?.user

    if (!user?.id) return null

    return {
        id: user.id,
        name: user.name ?? null,
        email: user.email ?? null,
        image: user.image ?? null
    }
})

export const requireUser = cache(async (): Promise<SessionUser> => {
    const user = await getCurrentUser()
    if (!user) redirect('/login')
    return user
})
