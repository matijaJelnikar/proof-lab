import Google from 'next-auth/providers/google'
import type { NextAuthConfig } from 'next-auth'

// No database imports here — this half must stay loadable where better-sqlite3 isn't.
export default {
    providers: [Google],
    pages: {
        signIn: '/login'
    }
} satisfies NextAuthConfig
