export default eventHandler(async (event) => {
  // Pull out Hash query parameter
  const { hash } = getQuery(event);

  if (!hash) {
    throw createError({
      statusCode: 406,
      statusMessage: "Missing hash",
    });
  }

  const { results } = await hubDatabase()
    .prepare("SELECT * FROM lookup WHERE hash = ? ORDER BY created_at DESC")
    .bind(hash)
    .all();

  if (!results.length) {
    throw createError({
      statusCode: 404,
      statusMessage: "No results found",
    });
  }

  return results[0];
});
