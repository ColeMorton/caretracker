# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CareTracker is a comprehensive healthcare management system demonstrating modern full-stack development with React.js, TypeScript, Next.js 14, Node.js, and cloud infrastructure.

## Development Commands

### Initial Setup
```bash
# Install dependencies with pnpm (preferred for monorepo)
pnpm install

# Set up Docker containers for local development
docker-compose up -d

# Generate Prisma client
pnpm database:generate

# Run database migrations
pnpm database:migrate

# Seed development data
pnpm database:seed
```

### Development
```bash
# Start all apps in development mode
pnpm dev

# Start specific app
pnpm --filter web dev              # Web portal (port 3000)
pnpm --filter mobile-web dev       # Mobile PWA (port 3001)
pnpm --filter admin dev            # Admin dashboard (port 3002)
pnpm --filter api dev              # API server (port 3001)

# Database operations
pnpm database:generate             # Generate Prisma client
pnpm database:push                 # Push schema to database
pnpm database:migrate              # Run migrations
pnpm database:seed                 # Seed with demo data
pnpm database:studio               # Open Prisma Studio

# Code quality
pnpm typecheck                     # Run TypeScript checks
pnpm lint                          # Run ESLint
pnpm format                        # Format with Prettier

# Testing
pnpm test                          # Run tests
pnpm test:e2e                      # Run E2E tests
```

### Building & Deployment
```bash
# Build all apps
pnpm build

# Start production build locally
pnpm start

# Create public tunnel for demos (MacBook hosting)
cloudflared tunnel --url http://localhost:3000

# Docker operations
docker-compose up -d                              # Start database services
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d  # Start all services
docker-compose logs -f                            # View logs
docker-compose down                               # Stop services
```

## Architecture & Key Patterns

### Monorepo Structure
- **apps/**: Next.js 14 applications (web, mobile-web, admin)
- **packages/api**: Fastify backend with TypeScript
- **packages/database**: Prisma schemas and migrations
- **packages/shared**: Shared types and utilities
- **packages/ui**: Shared UI components library

### Technology Stack
- **Frontend**: Next.js 14 App Router, React Server Components, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Fastify, TypeScript, JWT auth with refresh tokens
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for sessions and rate limiting
- **Real-time**: WebSockets for live updates
- **Deployment**: MacBook Pro M1 with Docker, Cloudflare Tunnel for public access

### Key Development Patterns

1. **Type Safety**: End-to-end type safety using Prisma-generated types shared across the monorepo
2. **Authentication**: JWT with refresh token rotation, stored in httpOnly cookies
3. **API Design**: RESTful endpoints with OpenAPI documentation at `/api/docs`
4. **State Management**: TanStack Query for server state, minimal client state
5. **Testing Strategy**: Unit tests with Vitest, E2E with Playwright
6. **Error Handling**: Consistent error responses with proper status codes
7. **Security**: Rate limiting, CORS, CSP headers, input validation with Zod

### Database Schema Key Entities
- **User**: Authentication and profile data
- **Visit**: Care visit scheduling and tracking
- **Budget**: Financial tracking per client
- **CarePlan**: Care planning and documentation

### Performance Considerations
- Use React Server Components for initial page loads
- Implement proper caching strategies with Redis
- Optimize database queries with proper indexes
- Use connection pooling for PostgreSQL

### MacBook Pro M1 Deployment
- All services run in Docker containers optimized for ARM64
- PostgreSQL and Redis run locally with no storage limits
- Public access via Cloudflare Tunnel (free tier)
- Monitor resources with `docker stats` and `top -o cpu`

## Phase 1 Implementation Status

### ✅ Completed Features
- Monorepo setup with Turborepo and PNPM workspaces
- TypeScript strict mode configuration across all packages
- Three Next.js 14 applications with App Router
- Fastify API server with TypeScript and OpenAPI documentation
- Prisma database schema with comprehensive models
- Docker Compose configuration optimized for M1 Mac
- ESLint, Prettier, and Husky pre-commit hooks
- Basic API endpoints with mock data for testing

### 🏃 Current State
- All development infrastructure is fully configured
- Basic Hello World endpoints are working
- Database schema is designed and ready
- Development tooling is set up and functional
- Applications can be started and run independently

### 📍 API Endpoints Available
- `GET /` - API welcome message
- `GET /health` - Health check endpoint
- `POST /auth/login` - Demo authentication (email: demo@caretracker.com, password: demo123)
- `GET /auth/me` - Current user endpoint
- `GET /users` - List users with pagination
- `GET /users/:id` - Get user by ID
- `GET /visits` - List visits with pagination and filtering
- `POST /visits` - Create new visit
- `GET /docs` - Interactive API documentation

### 🔗 Application URLs
- Web Portal: http://localhost:3000
- Mobile Web (PWA): http://localhost:3001  
- Admin Dashboard: http://localhost:3002
- API Server: http://localhost:3001
- API Documentation: http://localhost:3001/docs