This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
It uses `Postgres`-compatible database, `Better-auth` for authentication, `Drizzle ORM` for querying the db, `tailwindcss` & `shadcn` for ui. `.husky` is used for git hooks on commit to format the code.
Ready examples how to use the tech stack are in /src/app/contacts-crud & contact-form.

## Getting Started
1. Copy `.env.example` -> `.env.development` + `.env.production.` Insert env variables.
    * Used to push migrations to both dev & prod db
2. `npm i`
3. `npm run db:sync` to push db migrtions to both prod & dev.
3. `npm run dev`
Now if we have done everything correct we can visit it on localhost:3000


## Conventions
We preffer server actions instead of API routes. Full Typescript without `any` or type-castings as much as possible.

### Folder names
1. `lib` - code for external libraries. Mostly boilerplate and configs.
2. `models` - everything for the Database
3. `utils` - utility functions to be re-used
4. `components` - ui components