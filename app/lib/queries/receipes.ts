
import { db } from '@/app/lib/db'
import { receipes } from '@/app/lib/schema'
import { ReceipeType } from '@/app/lib/types'
import { and, eq } from 'drizzle-orm'


export async function getAllReceipes() {
    const receipesList = await db.select().from(receipes).all()
    return receipesList
}

export async function getReceipeById(id: number) {
    const receipe = await db.select().from(receipes).where(eq(receipes.id, id)).get()
    return receipe
}

export async function getReceipeByName(name: string, type: ReceipeType) {
    const receipe = await db.select().from(receipes).where(and(eq(receipes.name, name), eq(receipes.type, type))).get()
    return receipe
}