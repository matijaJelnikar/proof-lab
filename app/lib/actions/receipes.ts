'use server'

import { db } from '@/app/lib/db'
import { requireUser } from '@/app/lib/dal'
import { getReceipeByName } from '@/app/lib/queries/receipes'
import { receipes } from '@/app/lib/schema'
import { ReceipeType, DoughInputs } from '@/app/lib/types'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type SaveReceipeData = {
    name: string
    type: ReceipeType
    configuration: DoughInputs
    overwrite?: boolean
}

export type SaveResult =
    | { status: 'created'; id: number }
    | { status: 'updated'; id: number }
    | { status: 'conflict'; existingId: number }

function revalidateReceipes(type: ReceipeType) {
    revalidatePath(`/${type.toLowerCase()}`)
    revalidatePath('/')
}

export async function saveReceipe(data: SaveReceipeData): Promise<SaveResult> {
    const user = await requireUser()

    const existing = await getReceipeByName(data.name, data.type)

    if (existing && !data.overwrite) {
        return { status: 'conflict', existingId: existing.id }
    }

    if (existing) {
        await db.update(receipes)
            .set({ type: data.type, configuration: data.configuration })
            .where(and(eq(receipes.id, existing.id), eq(receipes.userId, user.id)))
        revalidateReceipes(data.type)
        return { status: 'updated', id: existing.id }
    }

    const [receipe] = await db
        .insert(receipes)
        .values({
            name: data.name,
            type: data.type,
            createdAt: Date.now(),
            configuration: data.configuration,
            userId: user.id
        })
        .returning()

    revalidateReceipes(data.type)

    return { status: 'created', id: receipe.id }
}

export async function deleteReceipe(id: number) {
    const user = await requireUser()

    await db.delete(receipes).where(and(eq(receipes.id, id), eq(receipes.userId, user.id)))
    revalidatePath('/')
}
