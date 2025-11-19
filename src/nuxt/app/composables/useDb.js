// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';

// export const db = drizzle({
//  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
//  schema: '@/db/schema.js',
//  out: '@/db/migrations',
//  dbCredentials: {
//   url: process.env.DATABASE_URL,
//  },
//  extensionsFilters: ['postgis'],
// });
export const db = drizzle(process.env.DATABASE_URL);
