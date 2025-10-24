# Technology Stack

## Overview

This document outlines the complete technology stack for the Serverless ROI Calculator monorepo project.

## Core Technologies

### Monorepo Management
- **pnpm v8.15.0+** - Fast, disk space efficient package manager
- **pnpm workspaces** - Monorepo workspace orchestration
- **Node.js v18.0.0+** - Runtime environment

### Language
- **TypeScript v5.x** - Type-safe JavaScript across all packages

## Backend Stack (apps/api)

### Framework & Core
- **NestJS v11.x** - Progressive Node.js framework
  - Modular architecture with dependency injection
  - Built-in support for middleware, pipes, guards, and interceptors
- **Express** - Underlying HTTP server (NestJS default)

### Database & ORM
- **Prisma v6.18.0** - Next-generation TypeScript ORM
  - Type-safe database client
  - Schema migrations
  - Database introspection

### Configuration & Environment
- **@nestjs/config v4.x** - Configuration management
  - Environment-based configuration
  - Type-safe config access

### Validation & Transformation
- **class-validator v0.14.x** - Declarative validation
- **class-transformer v0.5.x** - Object transformation

### Logging
- **nestjs-pino v4.x** - High-performance logging
- **pino-http v10.x** - HTTP request logging
- **pino-pretty v13.x** - Development log formatting

### Security & Performance
- **helmet v8.x** - Security headers middleware
- **@nestjs/throttler v6.x** - Rate limiting
  - Default: 100 requests per minute per IP

### Health & Monitoring
- **@nestjs/terminus v11.x** - Health check endpoints
- **@nestjs/axios v4.x** - HTTP client integration

### API Documentation
- **@nestjs/swagger v11.x** - OpenAPI/Swagger documentation
  - Automatic API documentation generation
  - Interactive API explorer

### Testing
- **Jest v29.x** - Testing framework
  - Unit tests
  - Integration tests
  - Coverage reports
- **Supertest v7.x** - HTTP assertion library
- **ts-jest v29.x** - TypeScript support for Jest

### Build Tools
- **@swc/core v1.x** - Fast TypeScript/JavaScript compiler
- **@nestjs/cli v11.x** - NestJS CLI tools

## Frontend Stack (apps/web)

### Framework & Core
- **React v19.1.x** - UI library with latest features
- **React DOM v19.1.x** - React rendering for web
- **Vite v7.x** - Next-generation build tool
  - Lightning-fast HMR
  - Optimized production builds

### Routing
- **React Router DOM v7.x** - Client-side routing
  - Type-safe route definitions
  - Nested routing support

### Forms & Validation
- **react-hook-form v7.65.x** - Performant form library
- **@hookform/resolvers v5.x** - Validation resolver integration
- **zod v4.x** - Schema validation and TypeScript inference

### HTTP Client
- **axios v1.12.x** - Promise-based HTTP client
  - Request/response interceptors
  - Automatic error handling

### UI Components & Icons
- **lucide-react v0.546.x** - Modern icon library
  - Tree-shakeable icons
  - Consistent design

### Data Visualization
- **recharts v3.3.x** - Composable charting library
  - Built for React
  - Responsive charts

### Utilities
- **date-fns v4.x** - Modern date utility library
  - Modular and tree-shakeable
  - Immutable date operations

### User Feedback
- **react-hot-toast v2.6.x** - Toast notifications
  - Customizable
  - Lightweight

### Styling
- **Sass v1.93.x** - CSS preprocessor
  - Variables and mixins
  - Nested selectors

### Code Quality
- **ESLint v9.x** - JavaScript/TypeScript linting
  - React-specific rules
  - TypeScript integration
- **eslint-plugin-react-hooks v5.x** - React Hooks linting
- **eslint-plugin-react-refresh v0.4.x** - React Fast Refresh linting
- **typescript-eslint v8.x** - TypeScript ESLint rules

### Build & Dev Tools
- **@vitejs/plugin-react v5.x** - Official React plugin for Vite
- **TypeScript v5.9.x** - TypeScript compiler

## Shared Packages

### packages/types
- **TypeScript** - Shared type definitions
  - API contracts
  - Domain models
  - Common interfaces

### packages/shared
- **TypeScript** - Shared utilities
  - Common helpers
  - Business logic utilities
  - Reusable functions

## Development Tools

### Version Control
- **Git** - Source control
- **GitHub** - Repository hosting

### Code Formatting
- **Prettier v3.x** (API only) - Code formatter
- **ESLint** - Linting with auto-fix

### Type Checking
- **TypeScript** - Static type checking across all packages

## Production Considerations

### Backend
- **Node.js clustering** - Multi-process support
- **PM2 / Docker** - Process management (recommended)
- **Environment variables** - Configuration management
- **Pino** - Production-grade logging (JSON output)

### Frontend
- **Vite build** - Optimized production bundle
  - Code splitting
  - Tree shaking
  - Asset optimization
- **CDN deployment** - Static asset hosting

### Database
- **Prisma Migrate** - Database migrations
- **Connection pooling** - Production database configuration

## Architecture Patterns

### Backend
- **Modular architecture** - NestJS modules
- **Dependency injection** - Service-based architecture
- **Repository pattern** - Data access layer
- **DTO pattern** - Data transfer objects
- **Validation pipes** - Request validation

### Frontend
- **Component-based** - Reusable React components
- **Custom hooks** - Shared logic extraction
- **Context API** - State management
- **Form validation** - Schema-based with Zod
- **Service layer** - API client abstraction

## Package Manager Commands

All commands use pnpm:

```bash
# Install dependencies
pnpm install

# Development
pnpm dev

# Build
pnpm build

# Test
pnpm test

# Lint
pnpm lint
```

## Version Requirements

- **Node.js**: >=18.0.0
- **pnpm**: >=8.0.0
- **TypeScript**: ~5.x
