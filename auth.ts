import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import authConfig from '@/auth.config'
import { db } from '@/app/lib/db'
import { accounts, sessions, users, verificationTokens } from '@/app/lib/schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: DrizzleAdapter(db, {
        usersTable: users,
        accountsTable: accounts,
        sessionsTable: sessions,
        verificationTokensTable: verificationTokens
    }),
    session: { strategy: 'database' },
    callbacks: {
        session({ session, user }) {
            session.user.id = user.id
            return session
        }
    }
})
