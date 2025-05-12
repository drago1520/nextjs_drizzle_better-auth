This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the install:

```bash
NPM install
```

## Adding the env credentials

```bash
DATABASE_URL= #Your Neon DB URL
```
```bash
BETTER_AUTH_SECRET= #Your Better Auth Secret
BETTER_AUTH_URL=http://localhost:3000 #Your Base URL of your app
```
```bash
GOOGLE_CLIENT_ID= #Your Google Client ID
GOOGLE_CLIENT_SECRET= #Your Google Client Secret
```
```bash
GITHUB_CLIENT_ID= #Your Github Client ID
GITHUB_CLIENT_SECRET= #Your Github Client Secret
```
```bash
RESEND_API_KEY= #Your Resend API Key
```

## Running the Better auth cli to get our schema for drizzle

It will generate a auth-schema.ts that we need to copy to the drizzle schema

```bash
    npx @better-auth/cli generate
```

We need to copy the content of the auth-schema to the drizzle schema in the db folder.

## Pussing the schema to the Neon db

first we need to generate the schema

```bash
    npx db:generate
```

after that we need to push it to our Neon db

```bash
    npx db:push
```

## Starting the application

Now if we have done everything correct we can visit it on localhost:3000

```bash
NPM run dev
```