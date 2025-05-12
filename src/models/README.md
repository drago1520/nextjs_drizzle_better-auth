# Quick intro

We use _Drizzle ORM_. Each File in models/schem/\* represents a table.
We use neon.tech for serverless pg.
Each file in `/models/schema` represents a table.

###### add new columns

1. Modify the schema
2. push changes to dev & prod
   1. only `dev db`: `npm run db:push`
   2. only `PROD db`: `npm run db:push:prod`
   3. both `npm run db:sync`

- Important: Be careful when adding `.notNull()` or `changing a column's type` - it may truncate the whole table. Test on dev db.
- These commands do not generate migration files. Directly pushes.

## Pitfalls

There are still no down migrations. They are working on it as part of v1.0, currently on 75% there.
