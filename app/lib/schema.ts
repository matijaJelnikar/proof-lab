
import { DoughInputs, receipeTypes } from '@/app/lib/types';
import type { AdapterAccountType } from 'next-auth/adapters';
import { integer, primaryKey, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core';

// Shapes below must match @auth/drizzle-adapter's expectations —
// see node_modules/@auth/drizzle-adapter/src/lib/sqlite.ts

export const users = sqliteTable('user', {
    id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
    image: text('image')
});

export const accounts = sqliteTable('account', {
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state')
}, (account) => [
    primaryKey({ columns: [account.provider, account.providerAccountId] })
]);

export const sessions = sqliteTable('session', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable('verificationToken', {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
}, (verificationToken) => [
    primaryKey({ columns: [verificationToken.identifier, verificationToken.token] })
]);

export const receipes = sqliteTable('receipes', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    type: text('type', { enum: receipeTypes }).notNull(),
    createdAt: integer('created_at').notNull(),
    configuration: text('configuration', { mode: 'json' }).$type<DoughInputs>().notNull(),
    userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' })
}, (receipe) => [
    unique().on(receipe.userId, receipe.name, receipe.type)
]);
