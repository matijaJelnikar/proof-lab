export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return

    const { migrate } = await import('drizzle-orm/better-sqlite3/migrator')
    const { db } = await import('@/app/lib/db')

    migrate(db, { migrationsFolder: './drizzle' })
}
