'use server'

import { db } from '@/app/lib/db'
import { receipes } from '@/app/lib/schema'
import { DoughInputs } from '@/app/lib/types'


export async function createReceipe(data: { name: string, type: string, configuration: DoughInputs }) {
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
