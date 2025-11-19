import { db } from '@/composables/useDb';
import { messages } from '@/db/schema';

export default defineEventHandler(async (event) => {
 console.log('🍤 ~ db:', db);
 console.log('🍤 ~ messages:', messages);

 return {
  hello: 'world',
  url: process.env.DATABASE_URL || false,
 };
});
