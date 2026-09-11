
import { db } from '@/app/lib/db'
import { getCurrentUser, requireUser } from '@/app/lib/dal'
import { receipes } from '@/app/lib/schema'
import { ReceipeType } from '@/app/lib/types'
import { and, eq } from 'drizzle-orm'
import { connection } from 'next/server'

// better-sqlite3 is synchronous, so without connection() these run during
// `next build` — where the production image has no database yet.

export async function getAllReceipes() {
    await connection()
    const user = await getCurrentUser()
    if (!user) return []

    return db.select().from(receipes).where(eq(receipes.userId, user.id)).all()
}

export async function getReceipeById(id: number) {
    await connection()
    const user = await requireUser()

    return db
        .select()
        .from(receipes)
        .where(and(eq(receipes.id, id), eq(receipes.userId, user.id)))
        .get()
}

export async function getReceipeByName(name: string, type: ReceipeType) {
    await connection()
    const user = await requireUser()

    return db
        .select()
        .from(receipes)
        .where(and(
            eq(receipes.name, name),
            eq(receipes.type, type),
            eq(receipes.userId, user.id)
        ))
        .get()
}
