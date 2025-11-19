import { eq } from 'drizzle-orm';

import { messages } from '@/db/schema';

import { db } from '@/composables/useDb';
import { useSerialize } from '@/composables/useSerialize';

export default eventHandler(async (event) => {
 // Pull out Hash query parameter
 const { hash } = getQuery(event);

 if (!hash) {
  throw createError({
   statusCode: 406,
   statusMessage: 'Missing hash',
  });
 }

 const matchedMessages = await db.select().from(messages).where(eq(messages.hash, hash));
 if (!matchedMessages.length) {
  throw createError({
   statusCode: 404,
   statusMessage: 'No results found',
  });
 }

 const results = useSerialize(matchedMessages);

 return results[0];
});
