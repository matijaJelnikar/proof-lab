# Proof Lab

A dough calculator for pizza and bread. Enter ball count, weight, hydration, salt
and your fermentation schedule — it works out flour, water, salt and the yeast
amount for that schedule, then lets you save the setup as a named recipe.

The yeast maths is temperature-aware: room- and cold-fermentation hours are
converted to a 25 °C equivalent (doubling per +10 °C), then scaled per yeast type
(compressed, active dry, instant dry, stiff or liquid sourdough starter).

## Stack

- Next.js 16 (App Router, Server Actions)
- React 19
- Tailwind CSS 4
- Drizzle ORM + SQLite (`better-sqlite3`)
- Docker (standalone output) + a volume for the database

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. The database is created and migrated automatically on
server start by `instrumentation.ts` — no manual step.

After changing `app/lib/schema.ts`, generate a migration and commit it:

```bash
npx drizzle-kit generate
```

## Accounts

Sign-in is Google OAuth via Auth.js. Recipes belong to the user who saved them;
the calculators work without an account.

Copy `.env.example` to `.env.local` and fill it in. The Google OAuth client
(Google Cloud Console -> Credentials -> OAuth client ID -> Web application)
needs these authorized redirect URIs:

```
http://localhost:3000/api/auth/callback/google
https://<your-domain>/api/auth/callback/google
```

Google rejects non-HTTPS redirect URIs, `localhost` excepted.

## Deploying

Runs as a single container with the SQLite file on a mounted volume:

```bash
docker compose up --build
```

`DATABASE_PATH` points the app at the volume (`/data/proof-lab.db`); locally it
falls back to `proof-lab.db` in the project root. The schema is applied to the
volume automatically on first boot.

Behind a reverse proxy, `AUTH_TRUST_HOST=true` is **required** — without it
Auth.js rejects every request with `UntrustedHost` and sign-in fails entirely.
Remove the `ports:` mapping from `docker-compose.yml` and put the container on
your proxy's network instead, routing your hostname to `proof_lab:3000`.

## Layout

```
app/
  page.tsx                  # pick pizza or bread, list saved recipes
  pizza/, bread/            # route + its calculator component
  components/               # shared UI, recipe list/card/save dialog
  lib/
    pizza-dough.ts          # the calculation
    types.ts                # DoughInputs, yeast types
    schema.ts, db.ts        # Drizzle schema + connection
    queries/, actions/      # reads and Server Actions
drizzle/                    # generated SQL migrations (committed)
instrumentation.ts          # applies migrations on server start
```
