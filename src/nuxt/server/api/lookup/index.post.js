import { eq } from 'drizzle-orm';
import { messages } from '@/db/schema';

import { db } from '@/composables/useDb';

export default eventHandler(async (event) => {
 // Extract the hash, message, encrypted, and method from the request body
 const { hash, message, encrypted, method } = await readBody(event);

 // Check if the hash, message, encrypted, and method are present in the request body
 const keyBase = ['hash', 'message', 'encrypted', 'method'];
 const keys = Object.keys(await readBody(event));
 for (const key of keyBase) {
  if (!keys.includes(key)) {
   throw createError({
    statusCode: 406,
    statusMessage: `Missing key: ${key}`,
   });
  }
 }

 // Check if the hash already exists
 const matchedMessages = await db.select().from(messages).where(eq(messages.hash, hash));

 if (matchedMessages.length === 0) {
  // Only insert if the hash doesn't exist
  await db.insert(messages).values({
   hash,
   created_at: Date.now(),
   message,
   encrypted: encrypted.toString(),
   method,
  });

  return {
   statusCode: 201,
   body: JSON.stringify({ hash }),
  };
 }

 return {
  statusCode: 409, // Conflict status code
  body: JSON.stringify({
   message: 'Hash already exists',
   hash,
  }),
 };
});
