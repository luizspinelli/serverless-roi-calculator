# ROI Calculator API

<div align="center">

[![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?logo=prisma)](https://www.prisma.io/)
[![Jest](https://img.shields.io/badge/Jest-29.x-C21325?logo=jest)](https://jestjs.io/)

NestJS backend API for the Serverless ROI Calculator application.

[Features](#features) • [Getting Started](#getting-started) • [API Documentation](#api-documentation) • [Testing](#testing)

</div>

---

## 🎯 Features

- ✅ **RESTful API** - Well-structured REST endpoints
- ✅ **Type-Safe** - Full TypeScript with strict mode
- ✅ **Database ORM** - Prisma for type-safe database access
- ✅ **Validation** - Request validation with class-validator
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **Logging** - Structured logging with Pino
- ✅ **Health Checks** - Liveness and readiness probes
- ✅ **API Docs** - Auto-generated Swagger/OpenAPI documentation
- ✅ **Testing** - Unit and E2E tests with Jest
- ✅ **Code Quality** - ESLint with TypeScript rules

## 🏗️ Architecture

```
src/
├── common/              # Shared utilities
│   ├── filters/         # Exception filters
│   ├── guards/          # Auth and role guards
│   ├── interceptors/    # Request/response interceptors
│   ├── middlewares/     # Custom middleware
│   └── pipes/           # Validation pipes
├── config/              # Configuration management
├── health/              # Health check endpoints
├── prisma/              # Prisma ORM setup
├── app.controller.ts    # Root controller
├── app.module.ts        # Root module
├── app.service.ts       # Root service
└── main.ts              # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- PostgreSQL database

### Installation

```bash
# Install dependencies (from project root)
pnpm install

# Or install only API dependencies
pnpm --filter @repo/api install
```

### Environment Variables

Create a `.env` file in the `apps/api` directory:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api

# CORS
CORS_ORIGIN=http://localhost:5173

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/roi_calculator?schema=public"

# Logging
LOG_LEVEL=debug
```

See `.env.example` for all available options.

### Database Setup

```bash
# Generate Prisma Client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database (if seed script exists)
pnpm prisma db seed

# Open Prisma Studio (database GUI)
pnpm prisma studio
```

### Development

```bash
# Start in development mode (with watch)
pnpm dev

# Start in debug mode
pnpm start:debug

# View logs
# Logs are output to console with pino-pretty in development
```

The API will be available at:
- **API**: http://localhost:3000/api
- **Swagger Docs**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/health

## 📖 API Documentation

### Swagger/OpenAPI

Interactive API documentation is automatically generated and available at:

**http://localhost:3000/api/docs**

The Swagger UI provides:
- Complete API endpoint documentation
- Request/response schemas
- Try-it-out functionality
- Example requests and responses

### Health Endpoints

#### GET `/api/health`

Complete health check including:
- Database connectivity
- Memory usage
- Disk space

**Response:**
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" },
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "disk": { "status": "up" }
  }
}
```

#### GET `/api/health/liveness`

Simple liveness probe for Kubernetes/container orchestration.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

#### GET `/api/health/readiness`

Readiness probe checking critical dependencies.

**Response:**
```json
{
  "status": "ok",
  "info": {
    "database": { "status": "up" }
  }
}
```

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with coverage
pnpm test:e2e:cov
```

### Test Coverage

Coverage reports are generated in the `coverage/` directory.

```bash
pnpm test:cov
# Open coverage/lcov-report/index.html
```

## 🏗️ Building

### Development Build

```bash
pnpm build
```

Output in `dist/` directory.

### Production Build

```bash
NODE_ENV=production pnpm build
```

### Run Production Build

```bash
pnpm start:prod
```

## 🔒 Security Features

### Helmet

Security headers are configured via Helmet:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- And more...

### Rate Limiting

Built-in rate limiting with `@nestjs/throttler`:
- Default: 100 requests per minute per IP
- Configurable per route with decorators

### CORS

CORS is configured to allow requests from the frontend:
```typescript
app.enableCors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
});
```

### Input Validation

All DTOs use class-validator decorators:
```typescript
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;
}
```

## 📊 Logging

Structured logging with Pino:

```typescript
// In development: pretty-printed colored logs
// In production: JSON structured logs

this.logger.log('User created', { userId: user.id });
this.logger.error('Failed to create user', error.stack);
```

### Log Levels

- `fatal` - Critical errors
- `error` - Errors
- `warn` - Warnings
- `info` - Informational (production default)
- `debug` - Debug information (development default)
- `trace` - Verbose tracing

## 🛠️ Development Tools

### Code Quality

```bash
# Lint code
pnpm lint

# Auto-fix linting issues
pnpm lint --fix

# Format code
pnpm format
```

### Database Tools

```bash
# View database in browser
pnpm prisma studio

# Reset database
pnpm prisma migrate reset

# Generate migration
pnpm prisma migrate dev --name migration_name

# View migration status
pnpm prisma migrate status
```

## 📦 Dependencies

### Core Dependencies

- `@nestjs/common` - NestJS core
- `@nestjs/core` - NestJS runtime
- `@nestjs/platform-express` - Express adapter
- `@prisma/client` - Prisma ORM client
- `typescript` - TypeScript compiler

### Feature Dependencies

- `@nestjs/config` - Configuration management
- `@nestjs/swagger` - API documentation
- `@nestjs/terminus` - Health checks
- `@nestjs/throttler` - Rate limiting
- `class-validator` - Validation
- `class-transformer` - Object transformation
- `helmet` - Security headers
- `nestjs-pino` - Logging

### Development Dependencies

- `@nestjs/cli` - NestJS CLI
- `@nestjs/testing` - Testing utilities
- `jest` - Testing framework
- `supertest` - HTTP assertions
- `prisma` - Prisma CLI
- `eslint` - Linting
- `typescript-eslint` - TypeScript linting rules

## 🚀 Deployment

### Docker

```bash
# Build image
docker build -t roi-calculator-api .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  roi-calculator-api
```

### Production Checklist

- ✅ Set `NODE_ENV=production`
- ✅ Configure production database
- ✅ Set up environment variables
- ✅ Run database migrations
- ✅ Build the application
- ✅ Set up process manager (PM2, systemd)
- ✅ Configure reverse proxy (nginx)
- ✅ Set up SSL/TLS
- ✅ Configure monitoring and logging
- ✅ Set up health check endpoints

## 🔧 Configuration

Configuration is managed via `@nestjs/config` with schema validation.

**Location**: `src/config/configuration.ts`

```typescript
export const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
  },
});
```

Access config in services:

```typescript
constructor(private configService: ConfigService) {
  const port = this.configService.get<number>('port');
}
```

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)

## 🤝 Contributing

See the main [Contributing Guide](../../CONTRIBUTING.md) for details.

### API-Specific Guidelines

1. Follow NestJS best practices
2. Use DTOs for all request/response objects
3. Add Swagger decorators to all endpoints
4. Write tests for all new features
5. Follow the existing code structure
6. Use dependency injection
7. Keep controllers thin, services fat

## 📝 License

MIT - See [LICENSE](../../LICENSE) file for details.

---

Part of the [Serverless ROI Calculator](../../README.md) project.
