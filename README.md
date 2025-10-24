# Serverless ROI Calculator

<div align="center">

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./CONTRIBUTING.md)

A modern, full-stack monorepo application for calculating and analyzing serverless architecture ROI (Return on Investment).

[Features](#features) • [Quick Start](#quick-start) • [Documentation](#documentation) • [Contributing](#contributing)

</div>

---

## 🎯 Features

- **📊 ROI Calculation Engine** - Comprehensive serverless cost analysis and ROI metrics
- **🚀 Modern Tech Stack** - Built with NestJS, React 19, TypeScript, and Prisma
- **🏗️ Monorepo Architecture** - Organized with pnpm workspaces for code sharing
- **🔒 Production Ready** - Security headers, rate limiting, logging, and health checks
- **📱 Responsive UI** - Beautiful, mobile-first React interface
- **🧪 Fully Tested** - Unit and integration tests with Jest
- **📝 Type-Safe** - End-to-end TypeScript with strict mode
- **🔄 Real-time Updates** - Hot module replacement in development
- **📊 API Documentation** - Auto-generated Swagger/OpenAPI docs
- **🎨 Code Quality** - ESLint, Prettier, and strict TypeScript configs

## 🏗️ Project Structure

```
serverless-roi-calculator/
├── apps/
│   ├── api/              # NestJS backend API
│   │   ├── src/          # Source code
│   │   ├── test/         # E2E tests
│   │   └── prisma/       # Database schema
│   └── web/              # React frontend (Vite)
│       ├── src/          # Source code
│       └── public/       # Static assets
├── packages/
│   ├── shared/           # Shared utilities and helpers
│   └── types/            # Shared TypeScript types
├── docs/                 # Project documentation
│   └── architecture/     # Architecture docs
└── .bmad-core/          # Development framework config
```

## 🚀 Tech Stack

### Backend
- **[NestJS](https://nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Jest](https://jestjs.io/)** - Testing framework
- **[Pino](https://getpino.io/)** - High-performance logging
- **[Swagger](https://swagger.io/)** - API documentation

### Frontend
- **[React 19](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Next-gen build tool
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[React Router](https://reactrouter.com/)** - Client-side routing
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Recharts](https://recharts.org/)** - Charting library

### Monorepo Tools
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **[pnpm workspaces](https://pnpm.io/workspaces)** - Monorepo workspace management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.0.0 ([Download](https://nodejs.org/))
- **pnpm** >= 8.0.0 (Install: `npm install -g pnpm`)
- **PostgreSQL** (for database) or use Prisma Postgres

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/luizspinelli/serverless-roi-calculator.git
cd serverless-roi-calculator
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create `.env` files in the respective directories:

**apps/api/.env:**
```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/roi_calculator"
CORS_ORIGIN=http://localhost:5173
```

**apps/web/.env:**
```env
VITE_API_URL=http://localhost:3000/api
```

### 4. Generate Prisma client

```bash
cd apps/api
pnpm prisma generate
pnpm prisma migrate dev
```

### 5. Start development servers

```bash
# From project root - starts both API and web
pnpm dev

# Or run individually:
pnpm --filter @repo/api dev      # API only (http://localhost:3000)
pnpm --filter @repo/web dev       # Frontend only (http://localhost:5173)
```

### 6. Access the application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **API**: [http://localhost:3000/api](http://localhost:3000/api)
- **API Docs**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Health Check**: [http://localhost:3000/api/health](http://localhost:3000/api/health)

## 📖 Documentation

- **[Architecture Documentation](./docs/architecture/)** - Technical architecture details
  - [Tech Stack](./docs/architecture/tech-stack.md)
  - [Coding Standards](./docs/architecture/coding-standards.md)
  - [Source Tree](./docs/architecture/source-tree.md)
- **[API Documentation](http://localhost:3000/api/docs)** - Swagger/OpenAPI docs (when running)
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute to this project

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps in development mode |
| `pnpm build` | Build all apps for production |
| `pnpm test` | Run all tests |
| `pnpm lint` | Lint all workspaces |
| `pnpm clean` | Clean all build artifacts and dependencies |

### Working with Workspaces

```bash
# Add dependency to specific workspace
pnpm --filter @repo/api add <package-name>
pnpm --filter @repo/web add <package-name>

# Run commands in specific workspace
pnpm --filter @repo/api test
pnpm --filter @repo/web build

# Add internal package dependency
# In package.json:
{
  "dependencies": {
    "@repo/types": "workspace:*",
    "@repo/shared": "workspace:*"
  }
}
```

### Database Management

```bash
cd apps/api

# Create a migration
pnpm prisma migrate dev --name migration_name

# Apply migrations
pnpm prisma migrate deploy

# Generate Prisma Client
pnpm prisma generate

# Open Prisma Studio
pnpm prisma studio
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in specific workspace
pnpm --filter @repo/api test
pnpm --filter @repo/web test

# Run tests with coverage
pnpm --filter @repo/api test:cov

# Run E2E tests
pnpm --filter @repo/api test:e2e
```

## 🏗️ Building for Production

```bash
# Build all applications
pnpm build

# Build specific app
pnpm --filter @repo/api build
pnpm --filter @repo/web build

# Start production server (after building)
cd apps/api
pnpm start:prod
```

## 🚢 Deployment

### API Deployment

The NestJS API can be deployed to:
- **Docker** - Dockerfile included
- **AWS Lambda** - With serverless framework
- **Heroku** - Traditional hosting
- **Vercel/Netlify** - Edge functions

### Frontend Deployment

The React frontend can be deployed to:
- **Vercel** - Recommended for Vite apps
- **Netlify** - Static hosting
- **AWS S3 + CloudFront** - CDN deployment
- **GitHub Pages** - Free static hosting

See [deployment documentation](./docs/deployment.md) for detailed guides.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- ✅ All tests pass (`pnpm test`)
- ✅ Code is linted (`pnpm lint`)
- ✅ TypeScript compiles without errors
- ✅ Follow our [coding standards](./docs/architecture/coding-standards.md)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) for the amazing backend framework
- [React](https://react.dev/) for the powerful UI library
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Prisma](https://www.prisma.io/) for the excellent ORM

## 📞 Support

- 📫 **Issues**: [GitHub Issues](https://github.com/luizspinelli/serverless-roi-calculator/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/luizspinelli/serverless-roi-calculator/discussions)
- 🌐 **Portfolio**: [spinelli.dev.br](https://spinelli.dev.br/)

## 🗺️ Roadmap

- [ ] Add user authentication
- [ ] Support multiple cloud providers (AWS, Azure, GCP)
- [ ] Advanced analytics dashboard
- [ ] Export reports to PDF/Excel
- [ ] Cost optimization recommendations
- [ ] Multi-currency support
- [ ] Dark mode
- [ ] Mobile app (React Native)

---

<div align="center">

Made with ❤️ by [Luiz Spinelli](https://spinelli.dev.br/)

⭐ Star us on GitHub — it helps!

[Portfolio](https://spinelli.dev.br/) • [GitHub](https://github.com/luizspinelli)

</div>
