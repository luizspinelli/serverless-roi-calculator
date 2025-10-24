# Source Tree Structure

## Overview

This document describes the complete directory structure of the Serverless ROI Calculator monorepo project.

## Root Directory

```
serverless-roi-calculator/
├── .bmad-core/              # BMAD framework configuration
│   ├── core-config.yaml     # Core configuration
│   ├── checklists/          # Development checklists
│   ├── tasks/               # Automated tasks
│   └── templates/           # Document templates
├── .claude/                 # Claude Code configuration
├── .git/                    # Git repository data
├── apps/                    # Application packages
│   ├── api/                 # Backend API application
│   └── web/                 # Frontend web application
├── packages/                # Shared packages
│   ├── shared/              # Shared utilities
│   └── types/               # Shared TypeScript types
├── docs/                    # Project documentation
│   ├── architecture/        # Architecture documentation
│   ├── prd/                 # Product requirements (sharded)
│   ├── qa/                  # QA documentation
│   └── stories/             # Development stories
├── node_modules/            # Root dependencies
├── .gitignore               # Git ignore rules
├── .nvmrc                   # Node version specification
├── package.json             # Root package configuration
├── pnpm-lock.yaml           # Dependency lock file
├── pnpm-workspace.yaml      # Workspace configuration
├── README.md                # Project readme
└── tsconfig.json            # Root TypeScript configuration
```

## apps/api/ - Backend API

```
apps/api/
├── src/
│   ├── common/              # Common utilities
│   │   ├── decorators/      # Custom decorators
│   │   ├── filters/         # Exception filters
│   │   ├── guards/          # Auth and role guards
│   │   ├── interceptors/    # Request/response interceptors
│   │   ├── middlewares/     # Custom middleware
│   │   └── pipes/           # Validation pipes
│   ├── config/              # Configuration
│   │   ├── configuration.ts # App configuration schema
│   │   └── index.ts         # Config exports
│   ├── health/              # Health check endpoints
│   │   ├── health.controller.ts
│   │   └── health.module.ts
│   ├── prisma/              # Prisma ORM setup
│   │   ├── prisma.module.ts
│   │   ├── prisma.service.ts
│   │   └── schema.prisma    # Database schema
│   ├── app.controller.ts    # Root controller
│   ├── app.controller.spec.ts # Controller tests
│   ├── app.module.ts        # Root module
│   ├── app.service.ts       # Root service
│   └── main.ts              # Application entry point
├── test/                    # E2E tests
│   ├── jest-e2e.json        # E2E test configuration
│   └── app.e2e-spec.ts      # E2E test suites
├── dist/                    # Compiled output (generated)
├── coverage/                # Test coverage (generated)
├── node_modules/            # Dependencies
├── .env                     # Environment variables (gitignored)
├── .env.development         # Development environment
├── nest-cli.json            # NestJS CLI configuration
├── package.json             # Package dependencies
├── tsconfig.json            # TypeScript configuration
└── tsconfig.build.json      # Build-specific TS config
```

### API Module Structure (Pattern)

When adding new features, follow this structure:

```
src/[feature]/
├── dto/                     # Data transfer objects
│   ├── create-[feature].dto.ts
│   ├── update-[feature].dto.ts
│   └── [feature]-response.dto.ts
├── entities/                # Database entities
│   └── [feature].entity.ts
├── [feature].controller.ts  # HTTP endpoints
├── [feature].controller.spec.ts # Controller tests
├── [feature].service.ts     # Business logic
├── [feature].service.spec.ts # Service tests
├── [feature].repository.ts  # Data access layer
├── [feature].module.ts      # Feature module
└── interfaces/              # TypeScript interfaces
    └── [feature].interface.ts
```

## apps/web/ - Frontend Application

```
apps/web/
├── src/
│   ├── assets/              # Static assets
│   │   ├── images/          # Image files
│   │   ├── icons/           # Icon files
│   │   └── fonts/           # Custom fonts
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Common components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   └── Card/
│   │   ├── layout/          # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   └── Sidebar/
│   │   └── forms/           # Form components
│   ├── pages/               # Page components
│   │   ├── Home/            # Home page
│   │   │   ├── Home.tsx
│   │   │   ├── Home.scss
│   │   │   └── index.ts
│   │   ├── Calculator/      # Calculator page
│   │   └── Results/         # Results page
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCalculator.ts
│   │   └── useApi.ts
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── CalculatorContext.tsx
│   ├── services/            # API and external services
│   │   ├── api/             # API client
│   │   │   ├── client.ts    # Axios configuration
│   │   │   ├── calculator.ts # Calculator API calls
│   │   │   └── auth.ts      # Auth API calls
│   │   └── storage.ts       # Local storage utilities
│   ├── utils/               # Utility functions
│   │   ├── formatters.ts    # Data formatting
│   │   ├── validators.ts    # Input validation
│   │   └── helpers.ts       # General helpers
│   ├── types/               # TypeScript types
│   │   ├── calculator.ts    # Calculator types
│   │   ├── api.ts           # API response types
│   │   └── global.ts        # Global types
│   ├── routes/              # Route configuration
│   │   ├── Routes.tsx       # Route definitions
│   │   └── ProtectedRoute.tsx # Auth guards
│   ├── styles/              # Global styles
│   │   ├── _variables.scss  # SCSS variables
│   │   ├── _mixins.scss     # SCSS mixins
│   │   └── _reset.scss      # CSS reset
│   ├── config/              # Configuration
│   │   ├── env.ts           # Environment config
│   │   └── constants.ts     # App constants
│   ├── App.tsx              # Root component
│   ├── App.scss             # Root styles
│   ├── main.tsx             # Application entry
│   ├── index.scss           # Global styles entry
│   └── vite-env.d.ts        # Vite type definitions
├── public/                  # Static public assets
│   ├── favicon.ico
│   └── robots.txt
├── dist/                    # Build output (generated)
├── node_modules/            # Dependencies
├── .env                     # Environment variables (gitignored)
├── .env.development         # Development environment
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML entry point
├── package.json             # Package dependencies
├── tsconfig.json            # TypeScript configuration
├── tsconfig.app.json        # App-specific TS config
├── tsconfig.node.json       # Node-specific TS config
└── vite.config.ts           # Vite configuration
```

### Component Structure (Pattern)

Standard component organization:

```
src/components/[ComponentName]/
├── [ComponentName].tsx      # Component implementation
├── [ComponentName].scss     # Component styles
├── [ComponentName].test.tsx # Component tests
├── types.ts                 # Component-specific types
└── index.ts                 # Public exports
```

## packages/shared/ - Shared Utilities

```
packages/shared/
├── src/
│   ├── utils/               # Utility functions
│   │   ├── calculations.ts  # Calculation helpers
│   │   ├── formatters.ts    # Data formatting
│   │   └── validators.ts    # Common validators
│   ├── constants/           # Shared constants
│   │   └── index.ts
│   └── index.ts             # Package exports
├── dist/                    # Compiled output (generated)
├── node_modules/            # Dependencies
├── package.json             # Package configuration
└── tsconfig.json            # TypeScript configuration
```

## packages/types/ - Shared Types

```
packages/types/
├── src/
│   ├── api/                 # API-related types
│   │   ├── requests.ts      # Request DTOs
│   │   ├── responses.ts     # Response DTOs
│   │   └── errors.ts        # Error types
│   ├── models/              # Domain models
│   │   ├── calculator.ts    # Calculator models
│   │   ├── user.ts          # User models
│   │   └── report.ts        # Report models
│   ├── enums/               # Shared enumerations
│   │   └── index.ts
│   ├── common.ts            # Common types
│   └── index.ts             # Package exports
├── dist/                    # Compiled output (generated)
├── node_modules/            # Dependencies
├── package.json             # Package configuration
└── tsconfig.json            # TypeScript configuration
```

## docs/ - Documentation

```
docs/
├── architecture/            # Architecture documentation
│   ├── coding-standards.md  # Coding standards (this file)
│   ├── tech-stack.md        # Technology stack
│   ├── source-tree.md       # Source tree structure
│   └── deployment.md        # Deployment guide
├── prd/                     # Product Requirements
│   ├── epic-1-*.md          # Epic 1 documents
│   └── epic-2-*.md          # Epic 2 documents
├── stories/                 # Development stories
│   ├── story-001.md         # Story documents
│   └── story-002.md
├── qa/                      # QA documentation
│   └── test-plans/          # Test plans
└── api/                     # API documentation
    └── swagger.json         # OpenAPI specification
```

## Configuration Files

### Root Level

- **pnpm-workspace.yaml**: Defines workspace packages
- **package.json**: Root package with workspace scripts
- **tsconfig.json**: Base TypeScript configuration
- **.gitignore**: Git ignore patterns
- **.nvmrc**: Node version manager configuration
- **README.md**: Project documentation

### Application Level

- **tsconfig.json**: TypeScript compiler options
- **package.json**: Dependencies and scripts
- **.env files**: Environment configuration
- **eslint.config.js**: Linting rules
- **vite.config.ts** (web): Build configuration
- **nest-cli.json** (api): NestJS CLI configuration

## Build Outputs

### Ignored Directories (in .gitignore)

```
# Dependencies
node_modules/

# Build outputs
dist/
build/
.next/
out/

# Coverage
coverage/
.nyc_output/

# Environment
.env
.env.local
.env.production

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

## Naming Conventions Summary

| Type | Convention | Example |
|------|------------|---------|
| Directories | kebab-case | `user-profile/` |
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase + use prefix | `useCalculator.ts` |
| Utilities | camelCase | `formatCurrency.ts` |
| Services | camelCase + .service | `calculator.service.ts` |
| Types/Interfaces | PascalCase | `UserProfile.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Modules | kebab-case + .module | `user-profile.module.ts` |
| Controllers | kebab-case + .controller | `user-profile.controller.ts` |

## Module Resolution

### Path Aliases (TypeScript)

Configure in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

Usage example:
```typescript
// Instead of: import Button from '../../../components/common/Button'
import Button from '@components/common/Button'
```

## Workspace Dependencies

Cross-package imports using workspace protocol:

```json
{
  "dependencies": {
    "@repo/types": "workspace:*",
    "@repo/shared": "workspace:*"
  }
}
```

Usage:
```typescript
import { CalculatorInput } from '@repo/types'
import { calculateROI } from '@repo/shared'
```

## Git Workflow

### Branch Structure

```
main                         # Production-ready code
├── develop                  # Development branch
│   ├── feature/[name]       # New features
│   ├── fix/[name]          # Bug fixes
│   ├── refactor/[name]     # Code refactoring
│   └── docs/[name]         # Documentation updates
```

### Protected Directories

Files in these directories should be modified carefully:
- `.bmad-core/` - Framework configuration
- `docs/prd/` - Product requirements
- `docs/architecture/` - Architecture docs
- `prisma/schema.prisma` - Database schema
