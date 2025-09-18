# CareTracker Deployment Specifications

**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Status**: Active
**Related Documents**: [Development Environment](./development-environment.md), [System Architecture](./system-architecture.md), [Technical Requirements](./technical-requirements.md)

## Deployment Architecture Overview

CareTracker employs a hybrid deployment strategy optimized for modern portfolio demonstration while maintaining enterprise-grade practices. The primary deployment target is MacBook Pro M1 hardware with Docker containers, providing cost-effective hosting with professional public access capabilities.

### Deployment Philosophy

1. **Cost-Effective Hosting**: MacBook Pro M1 as primary server infrastructure
2. **Professional Access**: Cloudflare Tunnel for secure public exposure
3. **Container-Native**: Docker-based deployment for consistency and scaling
4. **Multi-Environment**: Development, staging, and production environments
5. **Healthcare Compliance**: HIPAA-ready infrastructure and security measures
6. **Portfolio Ready**: Professional demonstration capabilities with monitoring

## Deployment Environments

### Development Environment

#### Local Development Setup
```bash
# Clone repository
git clone https://github.com/username/caretracker.git
cd caretracker

# Install dependencies
pnpm install

# Start infrastructure services
docker-compose up -d

# Start development servers
pnpm dev
```

#### Development Services Configuration
```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:15
    platform: linux/arm64          # ARM64 optimized
    environment:
      POSTGRES_DB: caretracker
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: localpass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    platform: linux/arm64
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru
    ports:
      - "6379:6379"
```

#### Development Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://postgres:localpass@localhost:5432/caretracker"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="development-secret-key-change-in-production"
NODE_ENV="development"
LOG_LEVEL="debug"
CORS_ORIGINS="http://localhost:3000,http://localhost:3001,http://localhost:3002"
```

### Staging Environment

#### Staging Configuration
- **Purpose**: Pre-production testing and client demonstrations
- **Infrastructure**: Docker containers on MacBook Pro M1
- **Public Access**: Cloudflare Tunnel with staging subdomain
- **Data**: Anonymized production-like test data

#### Staging Docker Compose
```yaml
# docker-compose.staging.yml
version: '3.8'

services:
  postgres:
    extends:
      file: docker-compose.yml
      service: postgres
    environment:
      POSTGRES_DB: caretracker_staging
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_staging_data:/var/lib/postgresql/data

  redis:
    extends:
      file: docker-compose.yml
      service: redis

  api:
    build:
      context: .
      dockerfile: packages/api/Dockerfile
      target: production
    environment:
      - DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@postgres:5432/caretracker_staging
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=staging
      - PORT=3001
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis

  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=https://staging-api.caretracker.dev
      - NODE_ENV=production
    ports:
      - "3000:3000"
    depends_on:
      - api

  mobile-web:
    build:
      context: .
      dockerfile: apps/mobile-web/Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=https://staging-api.caretracker.dev
      - NODE_ENV=production
    ports:
      - "3002:3002"
    depends_on:
      - api

  admin:
    build:
      context: .
      dockerfile: apps/admin/Dockerfile
    environment:
      - NEXT_PUBLIC_API_URL=https://staging-api.caretracker.dev
      - NODE_ENV=production
    ports:
      - "3003:3003"
    depends_on:
      - api
```

### Production Environment

#### Production Infrastructure Overview
- **Host**: MacBook Pro M1 (16GB RAM, 512GB SSD minimum)
- **Operating System**: macOS Monterey 12.0+ or Ventura 13.0+
- **Container Runtime**: Docker Desktop for Apple Silicon
- **Public Access**: Cloudflare Tunnel with custom domain
- **Monitoring**: Comprehensive logging and health monitoring
- **Backup Strategy**: Automated database and file backups

#### Production Architecture Diagram
```
Internet
    ↓
Cloudflare Tunnel (caretracker.app)
    ↓
MacBook Pro M1 (Host Machine)
    ↓
Docker Engine
    ↓
┌─────────────────────────────────────────┐
│  Production Container Stack             │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐ │
│  │   Web   │  │ Mobile  │  │  Admin  │ │
│  │  :3000  │  │  :3001  │  │  :3002  │ │
│  └─────────┘  └─────────┘  └─────────┘ │
│              ↓               ↓         │
│         ┌─────────────────────────┐    │
│         │      API Server         │    │
│         │       :4000            │    │
│         └─────────────────────────┘    │
│                    ↓                   │
│  ┌─────────────┐  ┌─────────────────┐  │
│  │ PostgreSQL  │  │     Redis       │  │
│  │    :5432    │  │     :6379       │  │
│  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────┘
```

## Container Specifications

### Application Containers

#### API Server Container
```dockerfile
# packages/api/Dockerfile
FROM node:20-alpine AS base

WORKDIR /app
RUN npm install -g pnpm

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/

RUN pnpm install --frozen-lockfile

# Production build stage
FROM base AS build
COPY . .
RUN pnpm build

# Production runtime
FROM node:20-alpine AS production
WORKDIR /app

RUN npm install -g pnpm

# Copy built application
COPY --from=build /app/package.json /app/pnpm-lock.yaml* ./
COPY --from=build /app/packages/api/dist ./packages/api/dist
COPY --from=build /app/packages/shared/dist ./packages/shared/dist

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

CMD ["node", "packages/api/dist/server.js"]
```

#### Frontend Application Containers
```dockerfile
# apps/web/Dockerfile
FROM node:20-alpine AS base

WORKDIR /app
RUN npm install -g pnpm

# Install dependencies
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/
COPY packages/ui/package.json ./packages/ui/

RUN pnpm install --frozen-lockfile

# Build stage
FROM base AS build
COPY . .
RUN pnpm build --filter web

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=build /app/apps/web/.next/standalone ./
COPY --from=build /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build /app/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]
```

### Database Containers

#### PostgreSQL Configuration
```yaml
postgres:
  image: postgres:15
  platform: linux/arm64
  restart: unless-stopped
  environment:
    POSTGRES_DB: caretracker
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    POSTGRES_INITDB_ARGS: "--auth-host=scram-sha-256"
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
    - ./infrastructure/docker/postgresql.conf:/etc/postgresql/postgresql.conf
    - ./infrastructure/docker/pg_hba.conf:/etc/postgresql/pg_hba.conf
  command: postgres -c config_file=/etc/postgresql/postgresql.conf
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
    interval: 10s
    timeout: 5s
    retries: 5
  deploy:
    resources:
      limits:
        memory: 1G
        cpus: '1.0'
      reservations:
        memory: 512M
        cpus: '0.5'
```

#### Redis Configuration
```yaml
redis:
  image: redis:7-alpine
  platform: linux/arm64
  restart: unless-stopped
  command: redis-server /etc/redis/redis.conf
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
    - ./infrastructure/docker/redis.conf:/etc/redis/redis.conf
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 10s
    timeout: 5s
    retries: 5
  deploy:
    resources:
      limits:
        memory: 256M
        cpus: '0.5'
      reservations:
        memory: 128M
        cpus: '0.25'
```

## Public Access Configuration

### Cloudflare Tunnel Setup

#### Installation and Configuration
```bash
# Install cloudflared on macOS
brew install cloudflared

# Authenticate with Cloudflare
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create caretracker

# Configure tunnel routing
# Create config file: ~/.cloudflared/config.yml
tunnel: caretracker
credentials-file: ~/.cloudflared/TUNNEL_ID.json

ingress:
  # Web Portal
  - hostname: app.caretracker.dev
    service: http://localhost:3000

  # Mobile Web App
  - hostname: mobile.caretracker.dev
    service: http://localhost:3001

  # Admin Dashboard
  - hostname: admin.caretracker.dev
    service: http://localhost:3002

  # API Server
  - hostname: api.caretracker.dev
    service: http://localhost:4000

  # Catch-all
  - service: http_status:404

# Start tunnel
cloudflared tunnel run caretracker
```

#### Production Tunnel Service
```bash
# Install as system service
sudo cloudflared service install

# Configure automatic startup
sudo launchctl load /Library/LaunchDaemons/com.cloudflare.cloudflared.plist

# Check service status
sudo launchctl list | grep cloudflared
```

### DNS Configuration
```
# Cloudflare DNS Records
app.caretracker.dev        CNAME   TUNNEL_ID.cfargotunnel.com
mobile.caretracker.dev     CNAME   TUNNEL_ID.cfargotunnel.com
admin.caretracker.dev      CNAME   TUNNEL_ID.cfargotunnel.com
api.caretracker.dev        CNAME   TUNNEL_ID.cfargotunnel.com

# SSL/TLS Settings
- Full (strict) encryption
- Always use HTTPS
- Minimum TLS version: 1.3
- HSTS enabled
```

## Production Deployment Process

### Automated Deployment Script
```bash
#!/bin/bash
# deploy-production.sh

set -e

echo "🚀 Starting CareTracker Production Deployment"

# Pre-deployment checks
echo "📋 Running pre-deployment checks..."
./scripts/pre-deploy-checks.sh

# Pull latest code
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build applications
echo "🔨 Building applications..."
pnpm build

# Database migrations
echo "🗄️ Running database migrations..."
pnpm database:migrate

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

# Build and start new containers
echo "🏗️ Building and starting new containers..."
docker-compose -f docker-compose.prod.yml up -d --build

# Health checks
echo "🏥 Running health checks..."
./scripts/health-check.sh

# Post-deployment tasks
echo "📊 Running post-deployment tasks..."
./scripts/post-deploy.sh

echo "✅ Deployment completed successfully!"
```

### Zero-Downtime Deployment Strategy
```bash
#!/bin/bash
# zero-downtime-deploy.sh

# Blue-Green deployment simulation
echo "🔵 Starting Blue-Green deployment..."

# Start new containers with different ports
docker-compose -f docker-compose.green.yml up -d --build

# Wait for health checks
echo "⏳ Waiting for green environment to be healthy..."
./scripts/wait-for-health.sh green

# Switch Cloudflare tunnel routing
echo "🔄 Switching traffic to green environment..."
./scripts/switch-traffic.sh green

# Stop blue environment
echo "🛑 Stopping blue environment..."
docker-compose -f docker-compose.blue.yml down

# Rename for next deployment
mv docker-compose.prod.yml docker-compose.blue.yml
mv docker-compose.green.yml docker-compose.prod.yml

echo "✅ Zero-downtime deployment completed!"
```

## Environment Configuration

### Production Environment Variables
```bash
# .env.production
NODE_ENV=production
LOG_LEVEL=warn

# Database
DATABASE_URL=postgresql://postgres:${POSTGRES_PASSWORD}@localhost:5432/caretracker
DATABASE_POOL_SIZE=20
DATABASE_STATEMENT_TIMEOUT=30000

# Redis
REDIS_URL=redis://localhost:6379
REDIS_MAX_MEMORY=256mb

# Security
JWT_SECRET=${JWT_SECRET}              # 256-bit random key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12

# API Configuration
API_PORT=4000
API_HOST=0.0.0.0
CORS_ORIGINS=https://app.caretracker.dev,https://mobile.caretracker.dev,https://admin.caretracker.dev

# File Upload
FILE_UPLOAD_MAX_SIZE=10485760         # 10MB
FILE_STORAGE_PATH=/app/uploads
FILE_STORAGE_TYPE=local

# Healthcare Compliance
HIPAA_AUDIT_ENABLED=true
DATA_RETENTION_YEARS=7
AUDIT_LOG_RETENTION_YEARS=7

# Monitoring
HEALTH_CHECK_INTERVAL=30s
METRICS_ENABLED=true
LOG_AGGREGATION_ENABLED=true

# Rate Limiting
RATE_LIMIT_WINDOW=60000               # 1 minute
RATE_LIMIT_MAX=1000                   # requests per window
RATE_LIMIT_AUTH_MAX=5                 # login attempts per window

# SSL/TLS
FORCE_HTTPS=true
HSTS_MAX_AGE=31536000                 # 1 year
SECURE_COOKIES=true
```

### Container Resource Limits
```yaml
# docker-compose.prod.yml resource limits
services:
  api:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2.0'
        reservations:
          memory: 1G
          cpus: '1.0'
      restart_policy:
        condition: on-failure
        max_attempts: 3

  web:
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '1.0'
        reservations:
          memory: 512M
          cpus: '0.5'

  postgres:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

## Monitoring and Observability

### Health Monitoring

#### Health Check Endpoints
```typescript
// Health check implementation
app.get('/health', async () => {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    memory: checkMemoryUsage(),
    disk: await checkDiskSpace(),
    uptime: process.uptime()
  }

  const isHealthy = Object.values(checks).every(
    check => check.status === 'healthy'
  )

  return {
    status: isHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks
  }
})
```

#### Monitoring Script
```bash
#!/bin/bash
# monitoring/health-monitor.sh

# Check application health
check_app_health() {
  response=$(curl -f -s http://localhost:4000/health)
  if [ $? -eq 0 ]; then
    echo "✅ Application healthy"
  else
    echo "❌ Application unhealthy"
    # Send alert notification
    ./scripts/send-alert.sh "Application health check failed"
  fi
}

# Check system resources
check_system_resources() {
  # Memory usage
  memory_usage=$(ps -A -o %mem | awk '{s+=$1} END {print s}')
  if (( $(echo "$memory_usage > 80" | bc -l) )); then
    echo "⚠️ High memory usage: ${memory_usage}%"
  fi

  # Disk usage
  disk_usage=$(df -h / | awk 'NR==2{print $5}' | sed 's/%//')
  if [ $disk_usage -gt 80 ]; then
    echo "⚠️ High disk usage: ${disk_usage}%"
  fi

  # Docker container status
  docker ps --format "table {{.Names}}\t{{.Status}}" | grep -v "Up"
}

# Main monitoring loop
while true; do
  echo "🔍 $(date): Running health checks..."
  check_app_health
  check_system_resources
  sleep 300  # Check every 5 minutes
done
```

### Log Management

#### Log Configuration
```yaml
# Log aggregation with Docker logging driver
services:
  api:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=api,environment=production"

  web:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
        labels: "service=web,environment=production"
```

#### Log Analysis Script
```bash
#!/bin/bash
# monitoring/log-analysis.sh

# Aggregate logs from all services
docker-compose -f docker-compose.prod.yml logs --tail=1000 \
  | grep -E "(ERROR|WARN|CRITICAL)" \
  | sort \
  > /tmp/critical-logs.txt

# Check for security incidents
grep -i "authentication.*failed\|unauthorized\|forbidden" /tmp/critical-logs.txt \
  > /tmp/security-incidents.txt

# Generate daily report
echo "📊 Daily Log Summary - $(date)"
echo "Critical Events: $(wc -l < /tmp/critical-logs.txt)"
echo "Security Incidents: $(wc -l < /tmp/security-incidents.txt)"
```

## Backup and Disaster Recovery

### Automated Backup Strategy

#### Database Backup Script
```bash
#!/bin/bash
# backup/database-backup.sh

set -e

BACKUP_DIR="/Users/$(whoami)/CareTracker/backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="caretracker_backup_${DATE}.sql"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Create database backup
echo "📦 Creating database backup..."
docker exec caretracker_postgres pg_dump -U postgres caretracker \
  > "$BACKUP_DIR/$BACKUP_FILE"

# Compress backup
gzip "$BACKUP_DIR/$BACKUP_FILE"

# Upload to cloud storage (optional)
if [ "$CLOUD_BACKUP_ENABLED" = "true" ]; then
  echo "☁️ Uploading to cloud storage..."
  # aws s3 cp "$BACKUP_DIR/${BACKUP_FILE}.gz" s3://caretracker-backups/
fi

# Clean up old backups (keep last 30 days)
find "$BACKUP_DIR" -name "caretracker_backup_*.sql.gz" -mtime +30 -delete

echo "✅ Backup completed: ${BACKUP_FILE}.gz"
```

#### File System Backup
```bash
#!/bin/bash
# backup/files-backup.sh

BACKUP_DIR="/Users/$(whoami)/CareTracker/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup uploaded files
echo "📁 Backing up uploaded files..."
tar -czf "$BACKUP_DIR/files_backup_${DATE}.tar.gz" \
  -C /path/to/uploads .

# Backup configuration files
echo "⚙️ Backing up configuration..."
tar -czf "$BACKUP_DIR/config_backup_${DATE}.tar.gz" \
  docker-compose.*.yml \
  .env.* \
  infrastructure/
```

### Disaster Recovery Procedures

#### Recovery Script
```bash
#!/bin/bash
# disaster-recovery/restore.sh

set -e

BACKUP_DATE=${1:-"latest"}
BACKUP_DIR="/Users/$(whoami)/CareTracker/backups"

echo "🔄 Starting disaster recovery process..."

# Stop all services
docker-compose -f docker-compose.prod.yml down

# Restore database
echo "🗄️ Restoring database..."
if [ "$BACKUP_DATE" = "latest" ]; then
  BACKUP_FILE=$(ls -t "$BACKUP_DIR"/caretracker_backup_*.sql.gz | head -1)
else
  BACKUP_FILE="$BACKUP_DIR/caretracker_backup_${BACKUP_DATE}.sql.gz"
fi

gunzip -c "$BACKUP_FILE" | docker exec -i caretracker_postgres \
  psql -U postgres -d caretracker

# Restore files
echo "📁 Restoring files..."
FILES_BACKUP=$(ls -t "$BACKUP_DIR"/files_backup_*.tar.gz | head -1)
tar -xzf "$FILES_BACKUP" -C /path/to/uploads

# Restart services
echo "🚀 Restarting services..."
docker-compose -f docker-compose.prod.yml up -d

# Verify recovery
echo "✅ Verifying recovery..."
./scripts/health-check.sh

echo "🎉 Disaster recovery completed successfully!"
```

## Security Hardening

### MacBook Pro Security Configuration

#### System Security Settings
```bash
# Enable FileVault disk encryption
sudo fdesetup enable

# Configure firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setloggingmode on

# Disable unnecessary services
sudo launchctl disable system/com.apple.screensharing
sudo launchctl disable system/com.apple.RemoteDesktop.agent

# Configure automatic security updates
sudo softwareupdate --schedule on
```

#### Docker Security Hardening
```yaml
# docker-compose.prod.yml security settings
services:
  api:
    security_opt:
      - no-new-privileges:true
    user: "node"
    read_only: true
    tmpfs:
      - /tmp
    volumes:
      - logs:/app/logs:rw
    cap_drop:
      - ALL
    cap_add:
      - NET_BIND_SERVICE
```

### Network Security

#### Cloudflare Security Configuration
```yaml
# Cloudflare security settings
Security:
  SSL/TLS: Full (strict)
  Always Use HTTPS: On
  Minimum TLS Version: 1.3
  TLS 1.3: On
  HSTS: Enabled
    Max Age: 12 months
    Include Subdomains: On
    No-Sniff Header: On

Firewall:
  Security Level: Medium
  Bot Fight Mode: On
  Challenge Passage: 30 minutes
  Browser Integrity Check: On

DDoS Protection:
  HTTP DDoS Attack Protection: On
  Network DDoS Attack Protection: On

Rate Limiting:
  - Path: /auth/login
    Requests: 5 per minute per IP
  - Path: /api/*
    Requests: 100 per minute per IP
```

## Performance Optimization

### MacBook Pro M1 Optimization

#### Docker Configuration for Apple Silicon
```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "insecure-registries": [],
  "registry-mirrors": [],
  "daemon": {
    "log-level": "warn"
  },
  "data-root": "/Users/Shared/Docker",
  "storage-driver": "overlay2"
}
```

#### Memory and CPU Allocation
```yaml
# Docker Desktop settings for M1 Mac
Resources:
  Memory: 8GB                    # Half of 16GB system RAM
  CPU: 6 cores                   # Leave 2 cores for macOS
  Swap: 2GB
  Disk: 128GB
```

### Application Performance Tuning

#### Next.js Production Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client']
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  distDir: '.next',

  // Performance optimizations
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,  // 1 year
  },

  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(
        new (require('@next/bundle-analyzer'))({
          enabled: true,
          openAnalyzer: false,
        })
      )
      return config
    }
  })
}

module.exports = nextConfig
```

#### API Performance Configuration
```typescript
// Fastify production configuration
const app = fastify({
  logger: {
    level: 'warn',
    redact: ['req.headers.authorization', 'req.body.password']
  },
  requestIdLogLabel: 'requestId',
  requestIdHeader: 'x-request-id',
  keepAliveTimeout: 72000,
  bodyLimit: 10485760,  // 10MB
  caseSensitive: false,
  ignoreDuplicateSlashes: true,
})

// Connection pooling
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: ['warn', 'error'],
})
```

## Scaling Considerations

### Horizontal Scaling Options

#### Multi-Container Scaling
```yaml
# docker-compose.scale.yml
services:
  api:
    deploy:
      replicas: 3
      update_config:
        parallelism: 1
        delay: 10s
      restart_policy:
        condition: on-failure

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
```

#### Load Balancer Configuration
```nginx
# nginx.conf
upstream api_backend {
    least_conn;
    server api_1:4000 weight=1 max_fails=3 fail_timeout=30s;
    server api_2:4000 weight=1 max_fails=3 fail_timeout=30s;
    server api_3:4000 weight=1 max_fails=3 fail_timeout=30s;
}

server {
    listen 80;
    server_name api.caretracker.dev;

    location / {
        proxy_pass http://api_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
}
```

### Cloud Migration Path

#### AWS Migration Strategy
```yaml
# Future cloud deployment consideration
AWS_Services:
  Compute:
    - ECS Fargate (containers)
    - Application Load Balancer
    - Auto Scaling Groups

  Database:
    - RDS PostgreSQL (Multi-AZ)
    - ElastiCache Redis
    - S3 (file storage)

  Security:
    - WAF (Web Application Firewall)
    - Certificate Manager
    - Secrets Manager

  Monitoring:
    - CloudWatch
    - X-Ray (distributed tracing)
    - GuardDuty (threat detection)
```

## Deployment Checklist

### Pre-Deployment Verification
```bash
# Pre-deployment checklist script
#!/bin/bash
# scripts/pre-deploy-checks.sh

echo "🔍 Running pre-deployment checks..."

# Check system resources
FREE_MEMORY=$(vm_stat | grep "Pages free" | awk '{print $3}' | sed 's/\.//')
if [ $FREE_MEMORY -lt 1000000 ]; then
  echo "❌ Insufficient free memory"
  exit 1
fi

# Check disk space
DISK_USAGE=$(df -h / | awk 'NR==2{print $5}' | sed 's/%//')
if [ $DISK_USAGE -gt 80 ]; then
  echo "❌ Insufficient disk space"
  exit 1
fi

# Check Docker daemon
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker daemon not running"
  exit 1
fi

# Check environment variables
required_vars=("DATABASE_URL" "JWT_SECRET" "POSTGRES_PASSWORD")
for var in "${required_vars[@]}"; do
  if [ -z "${!var}" ]; then
    echo "❌ Missing environment variable: $var"
    exit 1
  fi
done

# Check port availability
ports=(3000 3001 3002 4000 5432 6379)
for port in "${ports[@]}"; do
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null; then
    echo "⚠️ Port $port is in use"
  fi
done

echo "✅ All pre-deployment checks passed"
```

### Post-Deployment Verification
```bash
# Post-deployment verification script
#!/bin/bash
# scripts/post-deploy.sh

echo "🧪 Running post-deployment verification..."

# Health check all services
services=("web:3000" "mobile:3001" "admin:3002" "api:4000")
for service in "${services[@]}"; do
  name=${service%:*}
  port=${service#*:}

  echo "Testing $name service on port $port..."
  if curl -f -s http://localhost:$port/health > /dev/null; then
    echo "✅ $name service healthy"
  else
    echo "❌ $name service unhealthy"
  fi
done

# Check database connectivity
if docker exec caretracker_postgres pg_isready -U postgres > /dev/null; then
  echo "✅ Database connection healthy"
else
  echo "❌ Database connection failed"
fi

# Check Redis connectivity
if docker exec caretracker_redis redis-cli ping | grep PONG > /dev/null; then
  echo "✅ Redis connection healthy"
else
  echo "❌ Redis connection failed"
fi

# Verify Cloudflare tunnel
if curl -f -s https://api.caretracker.dev/health > /dev/null; then
  echo "✅ Public access via Cloudflare tunnel working"
else
  echo "❌ Public access failed"
fi

echo "🎉 Post-deployment verification completed"
```

---

*This deployment specifications document defines the comprehensive deployment architecture, security measures, and operational procedures for the CareTracker healthcare management system. All deployment activities must adhere to these specifications to ensure system reliability, security, and healthcare compliance.*