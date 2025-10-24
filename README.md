# Serverless ROI Calculator

Full-stack monorepo application for calculating serverless ROI with NestJS backend and React frontend.

## Project Structure

```
serverless-roi-calculator/
├── apps/
│   ├── api/              # NestJS backend API
│   └── web/              # React frontend (Vite)
├── packages/
│   ├── shared/           # Shared utilities
│   └── types/            # Shared TypeScript types
├── docs/                 # Documentation
└── .bmad-core/          # BMAD framework configuration
```

## Tech Stack

### Backend (apps/api)
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **Jest** - Testing framework

### Frontend (apps/web)
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript

### Monorepo Tools
- **pnpm** - Fast, disk space efficient package manager
- **pnpm workspaces** - Monorepo workspace management

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

## Getting Started

### Install pnpm (if not already installed)

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Development

Run all applications in development mode:

```bash
pnpm dev
```

Or run individual applications:

```bash
# Backend API only
pnpm --filter @repo/api dev

# Frontend only
pnpm --filter @repo/web dev
```

### Build

Build all applications:

```bash
pnpm build
```

Build individual applications:

```bash
# Backend API
pnpm --filter @repo/api build

# Frontend
pnpm --filter @repo/web build
```

### Testing

Run all tests:

```bash
pnpm test
```

Run tests for specific workspace:

```bash
pnpm --filter @repo/api test
pnpm --filter @repo/shared test
```

### Linting

Run linting across all workspaces:

```bash
pnpm lint
```

## Workspace Management

### Add dependency to specific workspace

```bash
# Add to API
pnpm --filter @repo/api add axios

# Add to frontend
pnpm --filter @repo/web add react-router-dom

# Add dev dependency
pnpm --filter @repo/api add -D @types/express
```

### Use internal packages

In your package.json, reference internal packages:

```json
{
  "dependencies": {
    "@repo/types": "workspace:*",
    "@repo/shared": "workspace:*"
  }
}
```

## API Endpoints

Backend API runs on `http://localhost:3000` by default.

## Frontend

Frontend runs on `http://localhost:5173` by default (Vite dev server).

## Environment Variables

Create `.env` files in each application:

- `apps/api/.env` - Backend environment variables
- `apps/web/.env` - Frontend environment variables

## Scripts Reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Run all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all workspaces |
| `pnpm clean` | Clean all build artifacts |

## License

MIT
