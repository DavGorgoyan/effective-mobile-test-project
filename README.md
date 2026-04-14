# em-test-project

Express + TypeScript API starter with MySQL + Prisma ORM integration.

## Scripts

- `npm run dev` - start in watch mode with tsx
- `npm run typecheck` - run TypeScript checks only
- `npm run build` - compile TypeScript to `dist/`
- `npm start` - run compiled server
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:migrate:dev` - create/apply migration in development
- `npm run prisma:migrate:deploy` - apply existing migrations in deployment
- `npm run prisma:studio` - open Prisma Studio

## Quick start

1. Install dependencies:
   `npm install`
2. Copy env file:
   `cp .env.template .env`
3. Set your MySQL connection in `.env` (`DATABASE_URL`)
4. Generate Prisma client:
   `npm run prisma:generate`
5. Start development server:
   `npm run dev`

## Project structure

- `prisma/schema.prisma` - Prisma datasource/generator and models
- `src/lib/prisma.ts` - shared Prisma client singleton
- `src/services/` - business/domain services
- `src/routes/` - Express route modules

## API

- `GET /api/health` - health check (includes database status)
