'use server'

import { db } from '@/app/lib/db'
import { receipes } from '@/app/lib/schema'
import { DoughInputs, ReceipeType } from '@/app/lib/types'
import { eq } from 'drizzle-orm'


export async function createReceipe(data: { name: string, type: ReceipeType, configuration: DoughInputs }) {
    const receipeExists = await db.select().from(receipes).where(eq(receipes.name, data.name)).get()

    if (receipeExists) {
        throw new Error(`Receipe with name "${data.name}" already exists.`)
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

    return receipe
}

export async function getAllReceipes() {
    const receipesList = await db.select().from(receipes).all()
    return receipesList
}
