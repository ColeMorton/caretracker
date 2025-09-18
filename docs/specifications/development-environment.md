# CareTracker Development Environment

**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Status**: Active
**Primary Platform**: MacBook Pro M1 (Apple Silicon ARM64)

## Overview

This specification outlines the complete development environment setup for CareTracker, optimized for MacBook Pro M1 hardware. The environment prioritizes performance, cost-effectiveness, and professional demonstration capabilities while maintaining enterprise-grade development patterns.

## Prerequisites & System Requirements

### Hardware Requirements
- **Primary**: MacBook Pro M1/M2 (Apple Silicon)
- **Memory**: 16GB RAM minimum (32GB recommended)
- **Storage**: 256GB available space minimum
- **Network**: Broadband internet for package downloads and tunnel services

### Operating System
- **macOS**: Monterey 12.0+ (Ventura 13.0+ recommended)
- **Architecture**: ARM64 (Apple Silicon native)

## Core Development Tools Installation

### Package Manager & Node.js
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js version manager (fnm - faster than nvm)
brew install fnm

# Configure shell for fnm
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.zshrc
source ~/.zshrc

# Install and use Node.js 20 LTS
fnm install 20
fnm use 20
fnm default 20

# Install global development tools
npm install -g pnpm@8.14.0 turbo@1.11.3
```

### Container Platform
```bash
# Install Docker Desktop for Apple Silicon
brew install --cask docker

# Verify ARM64 support
docker --version
docker info | grep Architecture
# Should show: Architecture: aarch64
```

### Development Utilities
```bash
# Essential development tools
brew install git
brew install jq          # JSON processing
brew install httpie      # HTTP client for API testing
brew install postgresql  # PostgreSQL client tools

# Optional but recommended
brew install tree        # Directory visualization
brew install htop        # System monitoring
brew install gpg         # Git commit signing
```

## Public Access Tools

### Cloudflare Tunnel (Primary)
```bash
# Install Cloudflare Tunnel for public access
brew install cloudflared

# Verify installation
cloudflared --version

# Quick tunnel (temporary URL)
cloudflared tunnel --url http://localhost:3000
# Output: https://random-name.trycloudflare.com
```

### Alternative Tunneling Options
```bash
# Option 1: ngrok (backup solution)
brew install ngrok
ngrok http 3000

# Option 2: Tailscale (private network)
brew install --cask tailscale
# Provides secure private network access
```

## Project Setup

### Repository Clone & Dependencies
```bash
# Clone repository
git clone <repository-url>
cd caretracker

# Install dependencies (pnpm recommended for monorepo)
pnpm install

# Verify workspace configuration
pnpm list --depth=0
```

### Environment Configuration
```bash
# Copy environment templates
cp packages/api/.env.development packages/api/.env.local
cp packages/database/.env packages/database/.env.local

# Edit environment files as needed
# Default values work for local development
```

## Docker Configuration (ARM64 Optimized)

### Docker Compose Setup
```yaml
# docker-compose.yml (ARM64 optimized)
version: '3.8'
services:
  postgres:
    image: postgres:15-alpine
    platform: linux/arm64        # Apple Silicon native
    container_name: caretracker_postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: caretracker
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: localpass
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./packages/database/init:/docker-entrypoint-initdb.d
    deploy:
      resources:
        limits:
          memory: 512M            # Optimized for MacBook
          cpus: '1.0'
        reservations:
          memory: 256M
          cpus: '0.5'

  redis:
    image: redis:7-alpine
    platform: linux/arm64        # Apple Silicon native
    container_name: caretracker_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    command: >
      redis-server
      --maxmemory 256mb
      --maxmemory-policy allkeys-lru
      --save 60 1000
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.5'

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  default:
    name: caretracker_network
```

### Database Initialization
```bash
# Start database services
docker-compose up -d

# Wait for PostgreSQL to be ready
docker-compose logs -f postgres
# Look for: "database system is ready to accept connections"

# Generate Prisma client
pnpm database:generate

# Run database migrations
pnpm database:migrate

# Seed development data
pnpm database:seed

# Verify database connection
pnpm database:studio
# Opens Prisma Studio at http://localhost:5555
```

## Development Workflows

### Standard Development Flow
```bash
# 1. Start all services
docker-compose up -d

# 2. Start development servers
pnpm dev
# This starts all applications:
# - Web Portal: http://localhost:3000
# - Mobile Web: http://localhost:3001
# - Admin Dashboard: http://localhost:3002
# - API Server: http://localhost:3001/api
# - API Docs: http://localhost:3001/docs

# 3. Monitor services
docker-compose ps
docker stats
```

### Individual Service Development
```bash
# Start specific applications
pnpm --filter web dev              # Web portal only
pnpm --filter mobile-web dev       # Mobile PWA only
pnpm --filter admin dev            # Admin dashboard only
pnpm --filter api dev              # API server only

# Development with auto-restart
pnpm --filter api dev              # Uses tsx watch mode
# File changes trigger automatic restart
```

### Database Development
```bash
# Schema changes workflow
pnpm database:generate             # Regenerate Prisma client
pnpm database:push                 # Push schema changes to DB
pnpm database:migrate              # Create migration files
pnpm database:seed                 # Reseed with test data

# Database inspection
pnpm database:studio               # Visual database browser
docker exec -it caretracker_postgres psql -U postgres -d caretracker
```

## Code Quality Workflow

### Pre-commit Validation
```bash
# Manual quality checks
pnpm lint                          # ESLint across all packages
pnpm typecheck                     # TypeScript strict checking
pnpm format                        # Prettier formatting

# Healthcare-specific linting
pnpm --filter @caretracker/api lint
pnpm --filter @caretracker/shared lint

# Fix automatically
pnpm lint --fix
```

### Testing Workflow
```bash
# Unit tests
pnpm test                          # All packages
pnpm test:unit                     # Unit tests only
pnpm test:watch                    # Watch mode for development

# Integration tests
pnpm test:integration              # With Testcontainers

# End-to-end tests
pnpm test:e2e                      # Playwright E2E tests
pnpm test:e2e:headed               # With browser UI
pnpm test:e2e:debug                # Debug mode

# Coverage reporting
pnpm test:coverage                 # Generate coverage reports
pnpm test:ui                       # Vitest UI dashboard
```

## Performance Monitoring

### System Resource Monitoring
```bash
# Docker container metrics
docker stats

# macOS system monitoring
top -o cpu                         # CPU usage by process
htop                              # Enhanced system monitor
Activity Monitor                   # macOS native tool

# Memory pressure monitoring
memory_pressure                    # macOS memory status
vm_stat                           # Virtual memory statistics
```

### Application Performance
```bash
# API performance testing
time curl http://localhost:3001/health
httpie GET localhost:3001/api/users page==1 limit==10

# Database query performance
docker exec -it caretracker_postgres psql -U postgres -d caretracker \
  -c "EXPLAIN ANALYZE SELECT * FROM visits WHERE client_id = 'client-1';"

# Redis performance
docker exec -it caretracker_redis redis-cli info stats
docker exec -it caretracker_redis redis-cli --latency
```

### Network Performance
```bash
# Test tunnel performance
curl -w "@curl-format.txt" -o /dev/null -s https://your-tunnel.trycloudflare.com

# curl-format.txt content:
#     time_namelookup:  %{time_namelookup}\n
#        time_connect:  %{time_connect}\n
#     time_appconnect:  %{time_appconnect}\n
#    time_pretransfer:  %{time_pretransfer}\n
#       time_redirect:  %{time_redirect}\n
#  time_starttransfer:  %{time_starttransfer}\n
#                     ----------\n
#          time_total:  %{time_total}\n
```

## Public Access Configuration

### Cloudflare Tunnel Setup
```bash
# Quick demo tunnel (temporary)
cloudflared tunnel --url http://localhost:3000
# Generates random URL: https://caring-turtle-123.trycloudflare.com

# Named tunnel (persistent) - for production demos
cloudflared tunnel create caretracker
cloudflared tunnel route dns caretracker yourdomain.com
cloudflared tunnel run caretracker

# Tunnel configuration file
# ~/.cloudflared/config.yml
tunnel: caretracker-tunnel-id
credentials-file: ~/.cloudflared/caretracker.json

ingress:
  - hostname: caretracker.yourdomain.com
    service: http://localhost:3000
  - hostname: api.caretracker.yourdomain.com
    service: http://localhost:3001
  - service: http_status:404
```

### Environment-Specific URLs
```bash
# Development URLs (local)
Web Portal:     http://localhost:3000
Mobile PWA:     http://localhost:3001
Admin Panel:    http://localhost:3002
API Server:     http://localhost:3001/api
API Docs:       http://localhost:3001/docs
Prisma Studio:  http://localhost:5555

# Demo URLs (public tunnel)
Web Portal:     https://caring-turtle-123.trycloudflare.com
Mobile PWA:     https://caring-turtle-123.trycloudflare.com/worker
Admin Panel:    https://caring-turtle-123.trycloudflare.com/admin
API Server:     https://caring-turtle-123.trycloudflare.com/api
API Docs:       https://caring-turtle-123.trycloudflare.com/docs
```

## Production-Like Local Environment

### Auto-Start Services (Optional)
```bash
# Create LaunchAgent for auto-start on boot
cat > ~/Library/LaunchAgents/com.caretracker.plist << 'EOF'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.caretracker</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/docker-compose</string>
        <string>-f</string>
        <string>/path/to/caretracker/docker-compose.yml</string>
        <string>up</string>
        <string>-d</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/path/to/caretracker</string>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF

# Enable auto-start
launchctl load ~/Library/LaunchAgents/com.caretracker.plist
```

### Background Services Management
```bash
# Keep services running after terminal closes
nohup docker-compose up > docker.log 2>&1 &

# Process management
ps aux | grep docker-compose
kill -TERM <process-id>              # Graceful shutdown
kill -KILL <process-id>              # Force shutdown

# Service health monitoring
while true; do
  curl -f http://localhost:3001/health || echo "API down"
  sleep 30
done
```

## Troubleshooting Guide

### Common Issues & Solutions

#### Docker Issues
```bash
# Problem: Docker containers won't start
# Solution: Check Docker Desktop is running
docker info

# Problem: Port conflicts
# Solution: Find and kill processes using ports
lsof -i :3000 -i :3001 -i :5432 -i :6379
kill -9 <PID>

# Problem: ARM64 compatibility
# Solution: Force platform specification
docker run --platform linux/arm64 postgres:15
```

#### Database Issues
```bash
# Problem: Connection refused
# Solution: Verify PostgreSQL is running
docker-compose ps postgres
docker-compose logs postgres

# Problem: Migration failures
# Solution: Reset database
docker-compose down -v
docker-compose up -d
pnpm database:migrate

# Problem: Prisma client issues
# Solution: Regenerate client
pnpm database:generate
```

#### Performance Issues
```bash
# Problem: Slow container startup
# Solution: Prune Docker system
docker system prune -a
docker volume prune

# Problem: High memory usage
# Solution: Adjust container limits
# Edit docker-compose.yml memory limits

# Problem: Slow TypeScript compilation
# Solution: Use SWC compiler
# Already configured in Next.js 14
```

### Log Analysis
```bash
# Application logs
docker-compose logs -f api          # API server logs
docker-compose logs -f postgres     # Database logs
docker-compose logs -f redis        # Cache logs

# System logs
log show --predicate 'process == "Docker"' --last 1h
log show --predicate 'subsystem == "com.docker.driver"' --last 30m
```

## IDE Configuration

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "vitest.explorer",
    "ms-playwright.playwright"
  ]
}
```

### Environment Variables for IDE
```bash
# Add to ~/.zshrc or ~/.bashrc
export NODE_ENV=development
export DATABASE_URL="postgresql://postgres:localpass@localhost:5432/caretracker"
export REDIS_URL="redis://localhost:6379"
export JWT_SECRET="development-secret-key"
export LOG_LEVEL="debug"
```

---

*This development environment specification ensures optimal performance on MacBook Pro M1 hardware while providing professional demonstration capabilities. All commands and configurations are tested for Apple Silicon compatibility.*