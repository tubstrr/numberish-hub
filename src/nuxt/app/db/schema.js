// schema.ts
import { bigserial, pgTable, varchar, bigint } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
 id: bigserial({ mode: 'number' }).primaryKey(),
 hash: varchar('hash', { length: 1024 }),
 created_at: bigint({ mode: 'number' }),
 message: varchar('message', { length: 1024 }),
 encrypted: varchar('encrypted', { length: 1024 }),
 method: varchar('method', { length: 1024 }),
});
