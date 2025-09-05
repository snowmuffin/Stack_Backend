## Stack Backend (NestJS + TypeORM)

A lightweight portfolio API built with NestJS and TypeORM on PostgreSQL. It manages three core resources:

- Events (timeline items)
- Technologies (skills with category and proficiency)
- Projects (with many-to-many technologies)

The API uses validation (class-validator), DTOs, and a global ValidationPipe for safe inputs.

## Features

- NestJS 11 with structured modules and DTO-based validation
- TypeORM with PostgreSQL
- Environment-based configuration (development/production)
- Entities include timestamps and relations
- Ready-to-use migration scripts

## Tech Stack

- Runtime: Node.js (TypeScript)
- Framework: NestJS
- ORM: TypeORM
- DB: PostgreSQL
- Validation: class-validator / class-transformer
- Tooling: ESLint, Prettier, Jest

## Project Structure

- `src/main.ts` – Bootstrap with global ValidationPipe
- `src/app.module.ts` – App wiring and TypeORM connection
- `src/entities/*` – TypeORM entities (`Event`, `Project`, `Technology`)
- `src/{event,project,technology}` – Modules with Controller/Service/DTO
- `src/data-source.ts` – DataSource config for TypeORM CLI/migrations

## Environment Variables

Copy `.env.example` to `.env` and adjust values:

- `NODE_ENV` – `development` or `production`
- `PORT` – default `3000`
- `BIND_HOST` – default `127.0.0.1`
- `DB_HOST` – database host, default `localhost`
- `DB_PORT` – database port, default `5432`
- `DB_USERNAME` – database user, default `postgres`
- `DB_PASSWORD` – database password, default `password`
- `DB_NAME` – database name, default `postgres`

Notes:

- In production, SSL is enabled with `{ rejectUnauthorized: false }`.
- In development, `synchronize` and `logging` are enabled; prefer migrations for shared environments.

## Getting Started

1) Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+

2) Install dependencies

```bash
npm install
```

3) Configure database

- Create the database specified by `DB_NAME`.
- Option A (quick dev): set `NODE_ENV=development` to use TypeORM synchronize.
- Option B (recommended): create and run a migration (see below).

4) Run the server

```bash
# Development (watch)
npm run start:dev

# Or standard start
npm start
```

The server binds to `BIND_HOST:PORT` (defaults to `127.0.0.1:3000`).

## TypeORM Migrations

Generate an initial migration after entities are in place:

```bash
# Creates src/migrations/Migration-<timestamp>.ts based on current schema
npm run migration:generate

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

These commands use `src/data-source.ts` for configuration.

## API Overview

Base URL: `http://<BIND_HOST>:<PORT>` (default `http://127.0.0.1:3000`)

### Health

- GET `/` → returns a simple string: `"This is a portfolio API"`

### Events

- POST `/events`
	- Body
		- `title` string (required)
		- `description` string (required)
		- `location` string (required)
		- `occurTime` ISO date string (required)
		- `imageUrl` URL string (optional)
	- 201 Created → Event

- GET `/events`
	- 200 OK → Event[] (sorted newest first)

Example:

```bash
curl -X POST http://127.0.0.1:3000/events \
	-H 'Content-Type: application/json' \
	-d '{
		"title": "Joined Company X",
		"description": "Started as backend engineer",
		"location": "Seoul",
		"occurTime": "2024-06-01T09:00:00.000Z"
	}'
```

Event entity:

```ts
{
	id: number,
	title: string,
	description: string,
	location: string,
	occurTime: string, // ISO
	imageUrl?: string,
	createdAt: string,
	updatedAt: string
}
```

### Technologies

- POST `/technologies`
	- Body
		- `name` string (required, unique)
		- `slug` string (required, unique)
		- `category` enum (required): `frontend|backend|mobile|devops|database|cloud|data|ai`
		- `description` string (optional)
		- `proficiency` enum (optional, default `familiar`): `learning|familiar|intermediate|advanced|expert`
		- `iconUrl` URL string (optional)
	- 201 Created → Technology

- GET `/technologies`
	- 200 OK → Technology[]

Example:

```bash
curl -X POST http://127.0.0.1:3000/technologies \
	-H 'Content-Type: application/json' \
	-d '{
		"name": "NestJS",
		"slug": "nestjs",
		"category": "backend",
		"proficiency": "advanced"
	}'
```

Technology entity:

```ts
{
	id: number,
	name: string,
	slug: string,
	category: 'frontend'|'backend'|'mobile'|'devops'|'database'|'cloud'|'data'|'ai',
	description?: string,
	proficiency: 'learning'|'familiar'|'intermediate'|'advanced'|'expert',
	iconUrl?: string,
	createdAt: string,
	updatedAt: string
}
```

### Projects

- POST `/projects`
	- Body
		- `name` string (required)
		- `description` string (required)
		- `url` string (required)
		- `repo` string (required)
		- `slug` string (required)
		- `technologyIds` number[] (optional) – references existing technologies
		- `imageUrl` URL string (optional)
	- 201 Created → Project
	- Notes: If any `technologyIds` are missing, you get 404 with the missing IDs.

- GET `/projects`
	- 200 OK → Project[] with `technologies` relation

Example:

```bash
curl -X POST http://127.0.0.1:3000/projects \
	-H 'Content-Type: application/json' \
	-d '{
		"name": "Portfolio Site",
		"description": "Personal portfolio website",
		"url": "https://me.example.com",
		"repo": "https://github.com/user/portfolio",
		"slug": "portfolio-site",
		"technologyIds": [1,2]
	}'
```

Project entity:

```ts
{
	id: number,
	name: string,
	description: string,
	url: string,
	repo: string,
	slug: string,
	imageUrl?: string,
	technologies: Technology[],
	createdAt: string,
	updatedAt: string
}
```

## Validation & Errors

- Requests are validated by DTOs with class-validator.
- The global `ValidationPipe` uses:
	- `whitelist: true` (unknown fields are stripped)
	- `forbidNonWhitelisted: true` (rejects unknown fields)
	- `transform: true` (auto-converts basic types when possible)

Example invalid field error:

```json
{
	"statusCode": 400,
	"message": ["property x should not exist"],
	"error": "Bad Request"
}
```

## Scripts

- `npm run start` – start app
- `npm run start:dev` – dev with watch
- `npm run build` – compile to `dist/`
- `npm run lint` – ESLint with fixes
- `npm run format` – Prettier write
- `npm test` – unit tests (Jest)
- `npm run test:e2e` – e2e tests
- `npm run migration:*` – TypeORM migrations (generate/run/revert)

## Notes

- The default root route `/` returns a plain string for a quick health check.
- When moving to production, disable `synchronize` (do not rely on it) and use migrations.
- Consider adding authentication and pagination if you plan to expose this publicly.

## License

UNLICENSED (private project). Update as needed.

