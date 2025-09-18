# CareTracker - Healthcare Management System

A comprehensive healthcare management system built with modern full-stack technologies, demonstrating enterprise-grade development patterns with React, TypeScript, Next.js 14, Fastify, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ 
- Docker Desktop for Apple Silicon
- PNPM (recommended for monorepo management)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd caretracker

# Install dependencies
pnpm install

# Start database services
docker-compose up -d

# Generate Prisma client and run migrations
pnpm database:generate
pnpm database:migrate
pnpm database:seed

# Start development servers
pnpm dev
```

### Available Applications

- **Web Portal** (Client-facing): http://localhost:3000
- **Mobile Web** (PWA for care workers): http://localhost:3001
- **Admin Dashboard**: http://localhost:3002
- **API Server**: http://localhost:3001/api
- **API Documentation**: http://localhost:3001/docs

## 🏗️ Architecture

### Monorepo Structure

```
caretracker/
├── apps/
│   ├── web/          # Next.js 14 client portal
│   ├── mobile-web/   # PWA for care workers
│   └── admin/        # Admin dashboard
├── packages/
│   ├── api/          # Fastify backend
│   ├── database/     # Prisma schemas & migrations
│   ├── shared/       # Shared types & utilities
│   └── ui/           # Shared UI components
└── infrastructure/   # Docker & deployment configs
```

### Technology Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Fastify, TypeScript, JWT Authentication
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Testing**: Vitest, Playwright, React Testing Library, Testcontainers
- **Development**: Turborepo, ESLint, Prettier, Husky
- **Deployment**: Docker (ARM64 optimized for M1 Mac)

## 📋 Development Commands

```bash
# Development
pnpm dev              # Start all apps in development
pnpm build            # Build all packages
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript checks

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests only
pnpm test:integration # Run integration tests only
pnpm test:e2e         # Run E2E tests only
pnpm test:coverage    # Run tests with coverage
pnpm test:watch       # Run tests in watch mode
pnpm test:ui          # Open Vitest UI

# Database
pnpm database:generate    # Generate Prisma client
pnpm database:migrate     # Run migrations
pnpm database:seed        # Seed database with demo data
pnpm database:studio      # Open Prisma Studio

# Individual apps
pnpm --filter web dev         # Start web app only
pnpm --filter api dev         # Start API only
pnpm --filter mobile-web dev  # Start mobile web app only
```

## 🔧 Environment Setup

Copy the environment files and update with your values:

```bash
# API environment
cp packages/api/.env.development packages/api/.env.local

# Database environment  
cp packages/database/.env packages/database/.env.local
```

## 🐳 Docker Services

The project includes optimized Docker Compose configurations for M1 Mac:

```bash
# Start database services only
docker-compose up -d

# Start all services including API
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

Interactive API documentation is available at http://localhost:3001/docs when the API server is running.

### Demo Endpoints

- `GET /health` - Health check
- `POST /auth/login` - User authentication
- `GET /users` - List users (paginated)
- `GET /visits` - List visits (paginated)
- `POST /visits` - Create new visit

## 🎯 Features Implemented

### Phase 1 ✅
- [x] Monorepo setup with Turborepo
- [x] TypeScript configuration across packages
- [x] Next.js 14 apps with App Router
- [x] Fastify API with TypeScript
- [x] Prisma database schema
- [x] Docker Compose for M1 Mac
- [x] ESLint, Prettier, and Husky setup
- [x] Basic API endpoints
- [x] **Comprehensive test suite**:
  - [x] Unit testing with Vitest
  - [x] Integration testing with Testcontainers
  - [x] E2E testing with Playwright
  - [x] Automated CI/CD pipeline
  - [x] Coverage reporting
  - [x] Shared testing utilities and fixtures

### Coming Next
- JWT Authentication implementation
- Role-based access control
- Real-time features with WebSockets
- PWA functionality for mobile app
- Advanced testing scenarios (performance, security)

## 🤝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Run tests before committing
3. Use conventional commit messages
4. Ensure TypeScript passes strict checks

## 📄 License

This project is for educational and portfolio purposes.
