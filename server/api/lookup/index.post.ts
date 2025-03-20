export default eventHandler(async (event) => {
  // Extract the hash, message, encrypted, and method from the request body
  const { hash, message, encrypted, method } = await readBody(event);

  // Check if the hash, message, encrypted, and method are present in the request body
  const keyBase = ["hash", "message", "encrypted", "method"];
  const keys = Object.keys(await readBody(event));
  for (const key of keyBase) {
    if (!keys.includes(key)) {
      throw createError({
        statusCode: 406,
        statusMessage: `Missing key: ${key}`,
      });
    }
  }

  const db = hubDatabase();

  // Check if the hash already exists
  const { results } = await db
    .prepare("SELECT hash FROM lookup WHERE hash = ? LIMIT 1")
    .bind(hash)
    .all();

  if (results.length === 0) {
    // Only insert if the hash doesn't exist
    await db
      .prepare(
        "INSERT INTO lookup (hash, created_at, message, encrypted, method) VALUES (?1, ?2, ?3, ?4, ?5)",
      )
      .bind(hash, Date.now(), message, encrypted, method)
      .run();

    return {
      statusCode: 201,
      body: JSON.stringify({ hash }),
    };
  }

  return {
    statusCode: 409, // Conflict status code
    body: JSON.stringify({
      message: "Hash already exists",
      hash,
    }),
  };
});
