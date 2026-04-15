# em-test-project

Express + TypeScript user management API with authentication, role-based access control, and MySQL persistence via Prisma.

## Tech stack

- Node.js + Express 5
- TypeScript (strict mode)
- Prisma ORM + MySQL
- Zod validation
- JWT authentication

## Scripts

- `npm run dev` - start the API in watch mode (`tsx`)
- `npm run typecheck` - run TypeScript checks (`--noEmit`)
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run the compiled server from `dist/server.js`
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate:dev` - create and apply migration in development
- `npm run prisma:migrate:deploy` - apply existing migrations in deployment
- `npm run prisma:studio` - open Prisma Studio

## Environment variables

Create `.env` from `.env.template` and set:

- `PORT` - API port (falls back to `3000` if missing/invalid)
- `NODE_ENV` - e.g. `development` or `production`
- `DATABASE_URL` - MySQL connection string (required)
- `JWT_SECRET` - JWT signing secret (required)
- `JWT_EXPIRES_IN` - token TTL (default: `1d`)

## Quick start

1. Install dependencies: `npm install`
2. Copy env file: `cp .env.template .env`
3. Update `.env` values
4. Generate Prisma client: `npm run prisma:generate`
5. Run migrations: `npm run prisma:migrate:dev`
6. Start development server: `npm run dev`

## Project structure

```text
.
├── docs/                     # project and task documentation
├── prisma/
│   ├── migrations/           # Prisma migration history
│   └── schema.prisma         # DB schema (User model, UserRole enum)
├── src/
│   ├── app.ts                # Express app setup (middleware + routes)
│   ├── server.ts             # process bootstrap + graceful shutdown
│   ├── config/               # env parsing and runtime config
│   ├── constants/            # reusable constant values (error codes)
│   ├── exceptions/           # custom domain/app exceptions
│   ├── lib/                  # infrastructure clients (Prisma singleton)
│   ├── middleware/           # auth, role checks, validation, error handlers
│   ├── repositories/         # data-access layer (Prisma queries)
│   ├── routes/               # route modules by feature
│   ├── services/             # business logic layer
│   ├── types/                # shared TypeScript types
│   └── utils/                # helpers (JWT, passwords, API responses)
├── dist/                     # compiled output
└── package.json
```

## API endpoints

- `GET /health`
- `POST /auth/sign-up`
- `POST /auth/sign-in`
- `GET /users/:id` (authenticated; admin or owner)
- `GET /users` (authenticated; admin only)
- `PATCH /users/:id/block` (authenticated; admin can block others, user can block self)

## Styling and conventions

This is a backend service (no UI/CSS layer). Styling here means code and API consistency:

- Layered flow: `routes -> services -> repositories`
- Validation is done at route boundaries with Zod schemas
- API responses follow a consistent envelope:
  - Success: `meta.status`, `meta.error: null`, and `data`
  - Error: `meta.status`, `meta.error` (`code`, `message`, optional `details`), and empty `data`
- TypeScript strict mode is enabled and shared types live in `src/types`
- ESM module style is used (`"type": "module"` with `.js` import extensions in TS files)
- Keep naming and formatting consistent with existing files when making changes
