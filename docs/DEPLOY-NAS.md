# Deploying numberish-hub to the ZimaOS NAS

Target: Beelink EQi13 Pro (`ZimaOS`), SSH as `tubstrr@10.1.10.101 -p 2222`.

| Item | Value |
| --- | --- |
| Deploy path | `/DATA/AppData/numberish-hub` |
| Compose project | `numberish` |
| Host port | `10.1.10.101:9505` (LAN-only) |
| Public URL | `https://numberish.jonknoll.dev` |
| Database | shared `postgresql` container (`postgres:17.4`) |
| DB name / role | `numberish` / `numberish_user` |
| Docker network | `postgresql_default` (external, owned by the postgresql stack) |
| Git origin | `github.com/tubstrr/numberish-hub` (unchanged) |

**This stack is CLI-managed. Never import it through the CasaOS UI** — CasaOS
rewrites image tags to `:latest` on import and on auto-update.

---

## 1. Create the database role and database

Run on the NAS. The superuser is `lil_bitch`; note that `psql` must be given an
explicit `-d postgres`, because no database named after the superuser exists.

Generate a password first (`openssl` is not installed on ZimaOS):

```bash
head -c 32 /dev/urandom | base64
```

Then create the role and database, pasting that password in place of
`PASTE_PASSWORD_HERE`:

```bash
docker exec -i postgresql psql -U lil_bitch -d postgres <<'SQL'
CREATE ROLE numberish_user LOGIN PASSWORD 'PASTE_PASSWORD_HERE';
CREATE DATABASE numberish OWNER numberish_user;
SQL
```

Verify:

```bash
docker exec postgresql psql -U lil_bitch -d postgres -tAc "SELECT datname FROM pg_database WHERE datname='numberish';"
```

## 2. Clone the repo

```bash
git clone git@github.com:tubstrr/numberish-hub.git /DATA/AppData/numberish-hub
```

## 3. Write the production env file

```bash
cp /DATA/AppData/numberish-hub/etc/docker/production/.env.example \
   /DATA/AppData/numberish-hub/etc/docker/production/.env
```

Edit it and set `DB_PASSWORD` to the password from step 1. This file is
gitignored and stays only on the NAS.

## 4. Apply the schema

The app does not run migrations at boot, so create the table once. There is no
`drizzle` bookkeeping schema in use — the local database was built with
`drizzle-kit push`, so applying the migration SQL directly is equivalent.

```bash
docker exec -i postgresql psql -U numberish_user -d numberish \
  < /DATA/AppData/numberish-hub/src/nuxt/app/db/migrations/0000_premium_shinko_yamashiro.sql
```

Verify:

```bash
docker exec postgresql psql -U numberish_user -d numberish -tAc "\dt"
```

## 5. Build and start

```bash
cd /DATA/AppData/numberish-hub && make prod-up
```

Or without make:

```bash
cd /DATA/AppData/numberish-hub && DOCKER_CONFIG=/tmp docker compose \
  -f ./etc/docker/production/docker-compose.yaml \
  --env-file ./etc/docker/production/.env up -d --build
```

## 6. Verify on the LAN

```bash
curl -s http://10.1.10.101:9505/api/test
```

Expect JSON containing `"hello":"world"` and the `DATABASE_URL`. Then confirm a
round-trip through the database:

```bash
curl -s -X POST http://10.1.10.101:9505/api/lookup \
  -H 'Content-Type: application/json' \
  -d '{"hash":"deploy-check","message":"hi","encrypted":"6869","method":"ASCII"}'
```

A second run of the same command should return status `409` (hash exists),
which proves both the write and the read path.

Clean up the check row:

```bash
docker exec postgresql psql -U numberish_user -d numberish -c "DELETE FROM messages WHERE hash='deploy-check';"
```

## 7. Expose publicly

In Nginx Proxy Manager (`nginxproxymanager` container, admin on port `81`), add
a proxy host:

- Domain: `numberish.jonknoll.dev`
- Scheme: `http`, Forward host: `10.1.10.101`, Forward port: `9505`
- Block common exploits: on
- Websockets: on (Nuxt devtools/HMR are off in production, but harmless)
- SSL: request a Let's Encrypt cert, force SSL

Then point `numberish.jonknoll.dev` at the same external path the other
`*.jonknoll.dev` services use. Note there is currently **no `cloudflared`
container or host service on the NAS**, so confirm how the existing hosts
(`dnd.jonknoll.dev`, `vtt.jonknoll.dev`) reach NPM before assuming a tunnel.

## Updating

```bash
cd /DATA/AppData/numberish-hub && make prod-deploy
```

## Backups

The database lives in the shared `postgresql` container, so it is covered by
whatever backs that container up. For a one-off dated dump:

```bash
docker exec postgresql pg_dump -U numberish_user -d numberish \
  | sudo tee /DATA/backups/numberish-$(date +%F).sql > /dev/null
```

(`sudo cat > file` does not redirect as root on ZimaOS — use `sudo tee`.)
