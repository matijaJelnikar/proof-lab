'use server'

import { db } from '@/app/lib/db'
import { receipes } from '@/app/lib/schema'
import { ReceipeType, DoughInputs } from '@/app/lib/types'
import { eq } from 'drizzle-orm'
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

export async function saveReceipe(data: SaveReceipeData): Promise<SaveResult> {
    const existing = await db.select().from(receipes).where(eq(receipes.name, data.name)).get()

    if (existing && !data.overwrite) {
        return { status: 'conflict', existingId: existing.id }
    }

    if (existing) {
        await db.update(receipes)
            .set({ type: data.type, configuration: data.configuration })
            .where(eq(receipes.id, existing.id))
        revalidatePath(`/${data.type.toLowerCase()}`)
        return { status: 'updated', id: existing.id }
    }

    const [receipe] = await db
        .insert(receipes)
        .values({
            name: data.name,
            type: data.type,
            createdAt: Date.now(),
            configuration: data.configuration
        })
        .returning()

    revalidatePath(`/${data.type.toLowerCase()}`)

    return { status: 'created', id: receipe.id }
}