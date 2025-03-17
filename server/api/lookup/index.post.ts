export default eventHandler(async (event) => {
  const { hash } = await readBody(event);
  const db = hubDatabase();

  await db
    .prepare("INSERT INTO lookup (hash, created_at) VALUES (?1, ?2)")
    .bind(hash, Date.now())
    .run();

  return {};
});
