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
- Drizzle ORM + SQLite (`better-sqlite3`), local file `proof-lab.db`

## Getting started

```bash
npm install
npx drizzle-kit push   # create/update proof-lab.db
npm run dev
```

Open http://localhost:3000.

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
```
