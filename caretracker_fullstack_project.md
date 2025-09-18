# Full-Stack Learning Project: CareTracker - Healthcare Management System

## Project Overview

A comprehensive healthcare management system demonstrating modern full-stack development with React.js, TypeScript, Next.js 14, Node.js, and cloud infrastructure. This project addresses backend, API, database, and cloud competencies essential for senior engineering roles.

⚠️ **Important Note**: This project is designed to use only free tier services for learning purposes. Some services have limitations (e.g., Vercel hobby tier is non-commercial only, Render.com backend sleeps after inactivity). For production use, paid tiers would be necessary.

💰 **Estimated Costs**: 
- Development: $0 (MacBook Pro M1)
- Demo hosting: $0 (Cloudflare Tunnel)
- Production hosting: $0 (self-hosted on MacBook)
- Cloud alternative: ~$20-50/month (only if needed)
- Electricity: ~$2-5/month (MacBook running 24/7)

## 🎯 Learning Objectives

- Master Next.js 14 App Router with React Server Components
- Build enterprise-grade REST APIs with Fastify and TypeScript
- Implement secure authentication with JWT and refresh tokens
- Design scalable database schemas with PostgreSQL and Prisma
- Deploy using free tier services and understand cloud architecture patterns
- Create real-time features with WebSockets
- Ensure end-to-end type safety across the stack

## 🏗️ Project Structure

```
caretracker/
├── apps/
│   ├── web/                 # Next.js 14 client portal
│   ├── mobile-web/          # React PWA for care workers
│   └── admin/               # Admin dashboard
├── packages/
│   ├── api/                 # Fastify backend
│   ├── database/            # Prisma schemas & migrations
│   ├── shared/              # Shared types & utilities
│   └── ui/                  # Shared UI components
├── infrastructure/
│   ├── docker/             # Docker Compose for MacBook
│   ├── tunnel/             # Cloudflare Tunnel config
│   └── macos/              # MacBook-specific configs
├── docs/
│   ├── api/                # OpenAPI specs
│   ├── architecture/       # System diagrams
│   └── deployment/         # MacBook deployment guides
└── scripts/                # Build & local hosting scripts
```

## 🎆 MacBook Pro M1 Development Setup

### Prerequisites
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Docker Desktop for Apple Silicon
brew install --cask docker

# Install Node.js (recommended: use fnm for version management)
brew install fnm
fnm install 20
fnm use 20

# Install development tools
brew install git
npm install -g pnpm turbo

# Install Cloudflare Tunnel for public access
brew install cloudflared

# Optional: Install Tailscale for secure remote access
brew install tailscale
```

### Apple Silicon Optimization
```yaml
# docker-compose.yml - Optimized for M1
version: '3.8'
services:
  postgres:
    image: postgres:15
    platform: linux/arm64  # M1 native
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: caretracker
      POSTGRES_PASSWORD: localpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
    deploy:
      resources:
        limits:
          memory: 512M  # Optimize for MacBook
  
  redis:
    image: redis:7-alpine
    platform: linux/arm64  # M1 native
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
  
  api:
    build: 
      context: ./packages/api
      platform: linux/arm64
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    environment:
      DATABASE_URL: postgresql://postgres:localpass@postgres:5432/caretracker
      REDIS_URL: redis://redis:6379
      NODE_ENV: development

volumes:
  postgres_data:
```

### Public Access Options
```bash
# Option 1: Cloudflare Tunnel (Free, permanent URL)
cloudflared tunnel --url http://localhost:3000
# Output: https://random-name.trycloudflare.com

# Option 2: ngrok (Free tier available)
ngrok http 3000
# Output: https://abc123.ngrok.io

# Option 3: Tailscale (Free, private network)
tailscale up
# Access via: http://your-macbook-name:3000
```

### Auto-Start Services (Optional)
```bash
# Keep services running after terminal closes
nohup docker-compose up > docker.log 2>&1 &

# Create LaunchAgent for auto-start on boot
# ~/Library/LaunchAgents/com.caretracker.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.caretracker</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/docker-compose</string>
        <string>up</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/caretracker</string>
    <key>RunAtLoad</key>
    <true/>
</dict>
</plist>
```

## 💻 Technology Stack (MacBook Pro M1 Optimized)

### Frontend (2025 Best Practices)
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Testing**: Vitest + React Testing Library + Playwright

### Backend
- **Runtime**: Node.js 20+ LTS
- **Framework**: Fastify (performance-focused)
- **Language**: TypeScript
- **ORM**: Prisma 5+
- **Validation**: Zod/Valibot
- **Authentication**: JWT + refresh tokens
- **API Documentation**: OpenAPI/Swagger

### Database & Caching (Free Options)
- **Primary DB**: Supabase PostgreSQL (500MB free) or Neon (3GB free)
- **Caching**: Upstash Redis (10K commands/day free) or in-memory Node.js cache
- **Search**: PostgreSQL full-text search (built-in)

### Infrastructure & DevOps (MacBook Pro M1 Primary)
- **Primary Platform**: MacBook Pro M1 (local hosting)
- **Development**: Docker Desktop for Apple Silicon
- **Public Access**: Cloudflare Tunnel (free) or ngrok
- **CI/CD**: GitHub Actions (2000 min/month free)
- **Source Control**: GitHub (unlimited public repos)
- **Error Tracking**: Sentry (5K errors/month free)
- **Backup Hosting Options** (if needed): 
  - Frontend: Netlify or local with Cloudflare Tunnel
  - Backend: MacBook Pro M1 with Docker
  - Database: PostgreSQL in Docker (unlimited storage)
  - Cache: Redis in Docker (unlimited memory)

## 📋 Implementation Plan

### Phase 1: Core Setup + Testing Foundation (Week 1)
**Goal**: Establish project foundation with all core technologies and comprehensive testing infrastructure

- [x] Initialize monorepo with Turborepo
- [x] Configure TypeScript with strict mode across packages
- [x] Set up Next.js 14 apps with App Router structure
- [x] Initialize Fastify API with TypeScript and plugins
- [x] Design and implement Prisma schema
- [x] Configure Docker Compose for local development
- [x] Set up ESLint, Prettier, and Husky
- [x] **Testing Infrastructure Setup**:
  - [x] Vitest workspace configuration for monorepo
  - [x] Test database setup with Docker and Testcontainers
  - [x] GitHub Actions CI pipeline with automated testing
  - [x] Coverage reporting across all packages
  - [x] Playwright for E2E testing setup
  - [x] Shared testing utilities and fixtures
  - [x] Unit tests for shared utilities and schemas
  - [x] Integration tests for API endpoints

**Deliverables**:
- Working monorepo structure
- Basic "Hello World" endpoints
- Database schema design document
- **Comprehensive testing infrastructure**:
  - Unit test coverage: 90%+ for shared utilities
  - Integration tests for all API endpoints
  - E2E tests for critical user flows
  - Automated CI/CD pipeline with test gates

### Phase 2: Database & API Development (Week 2)
**Goal**: Build robust backend with enterprise patterns

**Database Schema**:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      Role     @default(CLIENT)
  profile   Profile?
  visits    Visit[]
  carePlans CarePlan[]
}

model Visit {
  id          String   @id @default(cuid())
  workerId    String
  clientId    String
  scheduledAt DateTime
  completedAt DateTime?
  notes       String?
  activities  Json
}

model Budget {
  id        String   @id @default(cuid())
  clientId  String
  total     Decimal
  spent     Decimal
  period    DateTime
}
```

**API Endpoints**:
- Authentication: `/auth/login`, `/auth/refresh`, `/auth/logout`
- Users: CRUD operations with role-based access
- Visits: Create, read, update with real-time sync
- Budgets: Track spending, generate reports

**Key Features**:
- [ ] Implement JWT authentication with refresh token rotation
- [ ] Add role-based access control (RBAC)
- [ ] Create REST API with consistent error handling
- [ ] Implement request validation with Zod
- [ ] Add API rate limiting and security headers
- [ ] Set up Redis for session management
- [ ] Create OpenAPI documentation

### Phase 3: Frontend Development (Week 3)
**Goal**: Build responsive, accessible user interfaces

**Client Portal Features**:
- Dashboard with care schedule calendar
- Budget tracking with visual charts
- Visit history and notes
- Profile management
- Real-time notifications

**Care Worker App Features**:
- Daily schedule view
- Visit check-in/check-out
- Note-taking with voice input
- Offline support with sync
- Client information access

**Technical Implementation**:
- [ ] Server Components for initial page loads
- [ ] Client Components for interactivity
- [ ] TanStack Query for data fetching and caching
- [ ] Optimistic updates for better UX
- [ ] shadcn/ui components with accessibility
- [ ] Responsive design with mobile-first approach
- [ ] WCAG 2.2 compliance testing

### Phase 4: Advanced Features (Week 4)
**Goal**: Add production-ready features

- [ ] WebSocket implementation for real-time updates
- [ ] Push notifications for schedule changes
- [ ] File uploads for care documentation
- [ ] Advanced search and filtering
- [ ] Data export functionality
- [ ] Multi-language support (i18n)
- [ ] Row-level security in PostgreSQL
- [ ] Audit logging for compliance

### Phase 5: MacBook Pro Deployment & Public Access (Week 5)
**Goal**: Deploy locally with professional public access

**MacBook Pro Deployment Strategy**:

#### Primary: Local Hosting with Public Access
```bash
# 1. Start all services locally
docker-compose up -d

# 2. Verify services are running
docker-compose ps
open http://localhost:3000  # Frontend
open http://localhost:3001  # Backend API

# 3. Create public tunnel for demos
cloudflared tunnel --url http://localhost:3000
# Output: https://caring-turtle-123.trycloudflare.com

# 4. Test public access
curl https://caring-turtle-123.trycloudflare.com/api/health
```

#### Performance Monitoring on MacBook
```bash
# Monitor Docker resource usage
docker stats

# Monitor MacBook system resources
top -o cpu

# Check database performance
docker exec -it caretracker_postgres_1 psql -U postgres -d caretracker -c "\\dt+"

# Redis memory usage
docker exec -it caretracker_redis_1 redis-cli info memory
```

#### Portfolio Demo Options

**Option A: Interview Demo (Temporary)**
```bash
# Quick public URL for live interviews
cloudflared tunnel --url http://localhost:3000
# Share the generated URL during the call
```

**Option B: Portfolio Website Integration**
```bash
# Custom domain with Cloudflare (free)
cloudflared tunnel route dns caretracker yourdomain.com
cloudflared tunnel run caretracker
# Access via: https://caretracker.yourdomain.com
```

**Option C: Secure Client Demos**
```bash
# Private network access with Tailscale
tailscale up
# Share: http://your-macbook-name:3000
# Client needs Tailscale installed
```

#### Backup: Cloud Deployment (If Needed)
- **Frontend**: Netlify (for persistent demos)
- **Database**: Supabase (if local DB not suitable)
- **Backend**: Keep on MacBook with tunnel

**Hybrid Approach**: Host frontend on Netlify, backend on MacBook
```bash
# Deploy static frontend to Netlify
netlify deploy --prod --dir=apps/web/.next

# Keep backend on MacBook with public tunnel
cloudflared tunnel --url http://localhost:3001
```

**CI/CD Pipeline (GitHub Actions - Free)**:
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run build
      
      # Deploy frontend to Netlify
      - uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './apps/web/.next'
          production-deploy: true
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          
      # Deploy backend to Render
      - uses: johnbeynon/render-deploy-action@v0.0.8
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

### Phase 6: Documentation & Polish (Week 6)
**Goal**: Create portfolio-ready project

- [ ] Comprehensive README with badges
- [ ] API documentation with examples
- [ ] Architecture diagrams (C4 model)
- [ ] Database ERD documentation
- [ ] Deployment guide with screenshots
- [ ] Demo video/GIFs of key features
- [ ] Performance optimization
- [ ] Security audit and fixes

## 🚀 Key Features to Showcase

### 1. Full-Stack Type Safety
```typescript
// Shared types from Prisma
export type Visit = Prisma.VisitGetPayload<{
  include: { worker: true; client: true }
}>;

// API endpoint with Zod validation
const createVisitSchema = z.object({
  clientId: z.string().cuid(),
  scheduledAt: z.string().datetime(),
  activities: z.array(z.string()),
});

// Frontend with type-safe hooks
const { data, error } = useQuery({
  queryKey: ['visits', clientId],
  queryFn: () => api.visits.list(clientId),
});
```

### 2. Enterprise Authentication
```typescript
// Refresh token rotation
app.post('/auth/refresh', async (req, reply) => {
  const { refreshToken } = req.body;
  const payload = await verifyRefreshToken(refreshToken);
  
  // Rotate tokens
  const newTokens = await generateTokenPair(payload.userId);
  await invalidateOldToken(refreshToken);
  
  return reply.send(newTokens);
});
```

### 3. Real-Time Features
```typescript
// WebSocket for live updates
io.on('connection', (socket) => {
  socket.on('join-client-room', (clientId) => {
    socket.join(`client-${clientId}`);
  });

  // Notify client of new visit note
  socket.to(`client-${clientId}`).emit('new-visit-note', {
    visitId,
    note,
    timestamp: new Date(),
  });
});
```

### 4. MacBook Pro Production Architecture
- Apple Silicon optimized containers (ARM64)
- Local PostgreSQL with unlimited storage
- Redis caching without limitations
- Public access via Cloudflare Tunnel
- Professional demo capabilities

### 5. Production Monitoring (Free Tier)
```typescript
// Sentry setup (5K errors/month free)
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Fastify({ app }),
  ],
  tracesSampleRate: 0.1, // 10% of requests
});

// Custom metrics with free tier services
app.addHook('onRequest', async (req, reply) => {
  req.startTime = Date.now();
});

app.addHook('onResponse', async (req, reply) => {
  const duration = Date.now() - req.startTime;
  console.log(`${req.method} ${req.url} - ${reply.statusCode} - ${duration}ms`);
});
```

## 📊 Deliverables

### 1. GitHub Repository
- Public repository with professional README
- Clear commit history showing development progression
- GitHub Actions badges showing build status
- Issue templates and PR guidelines

### 2. Live Demo (MacBook Hosted)
- **Client Portal**: https://caring-turtle-123.trycloudflare.com
- **Care Worker App**: https://caring-turtle-123.trycloudflare.com/worker
- **Admin Dashboard**: https://caring-turtle-123.trycloudflare.com/admin
- **API Documentation**: https://caring-turtle-123.trycloudflare.com/api/docs

**Demo Accounts**:
- Client: `client@demo.com` / `demo123`
- Worker: `worker@demo.com` / `demo123`
- Admin: `admin@demo.com` / `demo123`

**🐎 MacBook Pro M1 Advantages**:
- ⚡ Instant response (no cold starts)
- 💾 Unlimited database storage
- 🎆 Full control over demo environment
- 🔒 Private data (never leaves your machine)
- 💰 $0 hosting costs

### 3. Technical Documentation
- API documentation with Swagger UI
- Database ERD with relationships
- C4 architecture diagrams
- Deployment runbooks
- Performance benchmarks

### 4. Portfolio Presentation
- Case study write-up
- Technical challenges and solutions
- Performance metrics (Lighthouse scores)
- Scalability analysis
- Cost projections

## 🎓 Skills Demonstrated

### Frontend
- ✅ Next.js 14 with App Router
- ✅ React Server Components
- ✅ TypeScript advanced patterns
- ✅ Modern CSS with Tailwind
- ✅ Accessibility (WCAG 2.2)
- ✅ Progressive Web App
- ✅ Real-time updates

### Backend
- ✅ RESTful API design
- ✅ Database design & optimization
- ✅ Authentication & authorization
- ✅ Caching strategies
- ✅ API documentation
- ✅ Error handling & logging
- ✅ Performance optimization

### DevOps & Cloud
- ✅ Docker containerization
- ✅ CI/CD pipelines with GitHub Actions
- ✅ Infrastructure as Code principles
- ✅ Multi-environment deployment
- ✅ Monitoring with free tier services
- ✅ Security best practices
- ✅ Cost-optimized architecture

## 🔄 Future Enhancements

After completing the MVP, consider adding:
- GraphQL API layer
- Machine learning for visit scheduling optimization
- Voice interface for care workers
- Blockchain for audit trails
- IoT integration for health monitoring
- Mobile apps with React Native

## ⚠️ Free Tier Limitations & Considerations

### Service Limitations
1. **Vercel**: Hobby tier is non-commercial only. Use Netlify for commercial demos.
2. **Render.com**: Free tier services sleep after 15 minutes of inactivity (30-60 second cold start)
3. **Supabase**: 500MB database limit, pauses after 1 week of inactivity on free tier
4. **Neon**: 3GB storage but compute hours limited on free tier
5. **Upstash Redis**: 10K commands per day, 256MB max database size
6. **AWS**: Only $200 credits for 6 months (account auto-closes after expiry)
7. **GitHub Actions**: 2000 minutes/month for private repos (unlimited for public)

### Cost Management Strategy
1. **Development**: Use Docker Compose locally (100% free)
2. **Demo Deployment**: Use free tiers with understanding of limitations
3. **Portfolio Screenshots**: Deploy briefly to AWS for enterprise screenshots, then tear down
4. **Long-term Hosting**: Keep on free tiers or use a $5/month VPS

### MacBook Pro M1: The Ultimate Development Machine

**Why MacBook Pro M1 is Superior to Cloud Hosting**:

🚀 **Performance**: 
- Apple Silicon runs ARM64 containers natively
- Faster than most VPS instances
- No network latency for database queries

💰 **Cost**: 
- $0 hosting vs $20-50/month for equivalent cloud resources
- Only electricity cost (~$2-5/month if running 24/7)

🔒 **Privacy & Control**: 
- All data stays local
- Full control over environment
- No service limitations or quotas

🛠️ **Development Experience**: 
- Instant hot reloads
- Direct database access
- Native debugging capabilities
- No deployment delays for testing

**Quick Start Commands**:
```bash
# Clone and start
git clone [repo]
cd caretracker
docker-compose up -d

# Create public URL for demos
cloudflared tunnel --url http://localhost:3000

# Monitor performance
docker stats
```

---

This project provides comprehensive evidence of full-stack engineering capabilities, with particular emphasis on backend, API, database, and cloud technologies that are crucial for senior engineering roles. The free tier limitations are educational constraints only - the architecture and code demonstrate production-ready patterns.