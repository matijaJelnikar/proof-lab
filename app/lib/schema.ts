
import { DoughInputs, receipeTypes } from '@/app/lib/types';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const receipes = sqliteTable('receipes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    type: text('type', { enum: receipeTypes }).notNull(),
    createdAt: integer('created_at').notNull(),
    configuration: text('configuration', { mode: 'json' }).$type<DoughInputs>().notNull()
});