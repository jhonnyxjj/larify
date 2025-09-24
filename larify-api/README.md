# TypeScript API Template

A modern and well-structured TypeScript API template using [Bun](https://bun.sh/), [Prisma](https://www.prisma.io/), [Express](https://expressjs.com/), and [Tsoa](https://tsoa-community.github.io/docs/home/). This project aims to deliver a clean and scalable architecture from the start.

---

## 📁 Project Structure

```
.
├── src
│   ├── core/               # Core functionalities (logger, env, errors, etc.)
│   ├── domains/            # Domain logic, split by business modules
│   │   └── health/         # Example domain: health check
│   ├── server/             # TSOA generated routes and server startup
│   └── index.ts            # Entry point
├── prisma/                 # Prisma schema and migrations
├── tests/                  # E2E and integration tests
├── Dockerfile.prod         # Production-only Dockerfile
├── tsconfig.json
├── bun.lockb
├── .env.example            # App environment variables example
├── .env                    # App environment variables (ignored by Git)
├── .env.test               # Used only for tests (ignored by Git)
```

---

## 🚀 Getting Started

### Requirements

- [Bun](https://bun.sh/docs/installation)
- [PostgreSQL](https://www.postgresql.org/) with:
  - `clashcrew` database for development
  - `clashcrew-test` database for tests

### Installation

```bash
bun install
```

---

## 🧪 Scripts

| Script             | Description                              |
| ------------------ | ---------------------------------------- |
| `bun dev`          | Runs the server with file watching       |
| `bun run test`     | Resets test database and runs tests      |
| `bun test:prepare` | Resets and prepares database for testing |
| `bun lint`         | Runs ESLint                              |
| `bun lint:fix`     | Fixes lint issues                        |
| `bun format`       | Formats code with Prettier               |
| `bun routes:gen`   | Regenerates TSOA routes                  |

> ℹ️ Bun automatically loads `.env` and supports `.env.test` via the `--env-file` flag.

---

## 📚 Domain Structure

Each domain lives under `src/domains/{module}` and may include:

- `controller.ts` — Defines routes with TSOA decorators.
- `service.ts` — Business logic layer.
- `repository.ts` — (optional) Database layer if needed.
- `dto/` — Data Transfer Objects.
- `interfaces/` — Contracts/interfaces.

Example: `src/domains/health/`

---

## ✨ TSOA Integration

- Routes and OpenAPI spec are auto-generated via:

```bash
bun routes:gen
```

- Decorators like `@Route`, `@Get`, `@Post`, and `@Response` enable automatic documentation.

---

## ⚠️ Error Handling

- All custom errors inherit from `ServerError`.
- Standardized response format:

```json
{
  "error": "ErrorName",
  "message": "Optional human-readable explanation"
}
```

---

## 🐘 PostgreSQL Setup

Create two local databases:

```bash
# Dev
createdb clashcrew

# Test
createdb clashcrew-test
```

And configure your `.env` and `.env.test` accordingly.

---

## 🐳 Docker (Production Only)

To build and run a production-ready image:

```bash
docker build -f Dockerfile.prod -t rapidstack-api .
docker run -p 3000:3000 --env-file .env rapidstack-api
```

## 🎯 Future (Maybe?)

- Add Docker Compose for local development;
- Add code coverage constraints;
- Code injection;
