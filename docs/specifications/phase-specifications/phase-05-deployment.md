# Phase 5: Production Deployment & MacBook Pro Hosting

**Phase Status**: 🟡 READY TO START
**Document Version**: 1.0
**Last Updated**: 2025-09-18
**Duration**: Week 5
**Dependencies**: Phase 1-4 ✅

## Phase Overview

Phase 5 transforms the development environment into a production-grade deployment on MacBook Pro M1, implementing professional hosting capabilities, public access, monitoring, and operational excellence. This phase demonstrates enterprise deployment patterns while maintaining cost-effectiveness through self-hosting.

## Objectives & Deliverables

### Primary Objectives
- [ ] **Production Deployment**: Configure MacBook Pro M1 for production hosting
- [ ] **Public Access**: Implement professional public URLs with SSL/TLS
- [ ] **Monitoring & Observability**: Comprehensive monitoring and alerting systems
- [ ] **Backup & Recovery**: Automated backup and disaster recovery procedures
- [ ] **Performance Optimization**: Production-grade caching and optimization
- [ ] **Security Hardening**: Production security configuration and monitoring

### Success Criteria
- [ ] Production deployment accessible via professional URLs
- [ ] 99.9% uptime during demonstration period
- [ ] Response times <100ms for 95% of requests
- [ ] Automated backups and recovery procedures tested
- [ ] Security hardening validated with penetration testing
- [ ] Monitoring dashboards operational with alerting

## Technical Specifications

### Production Environment Architecture

#### MacBook Pro M1 Production Setup
```yaml
# docker-compose.production.yml
version: '3.8'

services:
  nginx:
    image: nginx:1.25-alpine
    platform: linux/arm64
    container_name: caretracker_nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
    depends_on:
      - api
      - web
    deploy:
      resources:
        limits:
          memory: 256M
          cpus: '0.5'

  api:
    build:
      context: ./packages/api
      dockerfile: Dockerfile.production
      platform: linux/arm64
    container_name: caretracker_api
    restart: unless-stopped
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      REDIS_URL: redis://redis:6379
      JWT_SECRET: ${JWT_SECRET}
      LOG_LEVEL: info
    volumes:
      - ./uploads:/app/uploads
      - ./logs:/app/logs
    depends_on:
      - postgres
      - redis
    deploy:
      resources:
        limits:
          memory: 1G
          cpus: '2.0'
        reservations:
          memory: 512M
          cpus: '1.0'
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3001/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  web:
    build:
      context: ./apps/web
      dockerfile: Dockerfile.production
      platform: linux/arm64
    container_name: caretracker_web
    restart: unless-stopped
    environment:
      NODE_ENV: production
      NEXT_PUBLIC_API_URL: https://api.caretracker.local
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '1.0'

  postgres:
    image: postgres:15-alpine
    platform: linux/arm64
    container_name: caretracker_postgres_prod
    restart: unless-stopped
    environment:
      POSTGRES_DB: caretracker_prod
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8 --lc-collate=C --lc-ctype=C"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backups:/backups
      - ./scripts/postgres-backup.sh:/usr/local/bin/backup.sh:ro
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '2.0'
        reservations:
          memory: 1G
          cpus: '1.0'
    command: >
      postgres
      -c shared_preload_libraries=pg_stat_statements
      -c max_connections=200
      -c shared_buffers=512MB
      -c effective_cache_size=1536MB
      -c maintenance_work_mem=128MB
      -c checkpoint_completion_target=0.9
      -c wal_buffers=16MB
      -c default_statistics_target=100
      -c random_page_cost=1.1
      -c effective_io_concurrency=200

  redis:
    image: redis:7-alpine
    platform: linux/arm64
    container_name: caretracker_redis_prod
    restart: unless-stopped
    command: >
      redis-server
      --save 900 1
      --save 300 10
      --save 60 10000
      --maxmemory 512mb
      --maxmemory-policy allkeys-lru
      --appendonly yes
      --appendfsync everysec
    volumes:
      - redis_data:/data
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '1.0'

  monitoring:
    image: prom/prometheus:latest
    platform: linux/arm64
    container_name: caretracker_prometheus
    restart: unless-stopped
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - prometheus_data:/prometheus
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'

  grafana:
    image: grafana/grafana:latest
    platform: linux/arm64
    container_name: caretracker_grafana
    restart: unless-stopped
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: ${GRAFANA_PASSWORD}
      GF_USERS_ALLOW_SIGN_UP: false
    volumes:
      - grafana_data:/var/lib/grafana
      - ./monitoring/grafana/dashboards:/etc/grafana/provisioning/dashboards:ro
      - ./monitoring/grafana/datasources:/etc/grafana/provisioning/datasources:ro

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

networks:
  default:
    name: caretracker_production
    driver: bridge
```

#### Nginx Production Configuration
```nginx
# nginx/nginx.conf
user nginx;
worker_processes auto;
worker_cpu_affinity auto;
worker_rlimit_nofile 65535;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 4096;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                   '$status $body_bytes_sent "$http_referer" '
                   '"$http_user_agent" "$http_x_forwarded_for" '
                   'rt=$request_time uct="$upstream_connect_time" '
                   'uht="$upstream_header_time" urt="$upstream_response_time"';

    access_log /var/log/nginx/access.log main;

    # Performance optimizations
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 10M;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private must-revalidate;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' wss:; frame-ancestors 'none';" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Frontend (Next.js)
    upstream frontend {
        server web:3000;
        keepalive 32;
    }

    # Backend API
    upstream api {
        server api:3001;
        keepalive 32;
    }

    # Main site
    server {
        listen 80;
        server_name caretracker.local *.caretracker.local;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name caretracker.local;

        ssl_certificate /etc/nginx/ssl/caretracker.local.crt;
        ssl_certificate_key /etc/nginx/ssl/caretracker.local.key;

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 86400;
        }
    }

    # API subdomain
    server {
        listen 443 ssl http2;
        server_name api.caretracker.local;

        ssl_certificate /etc/nginx/ssl/caretracker.local.crt;
        ssl_certificate_key /etc/nginx/ssl/caretracker.local.key;

        # API routes
        location / {
            limit_req zone=api burst=20 nodelay;

            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Login endpoint rate limiting
        location /auth/login {
            limit_req zone=login burst=5 nodelay;

            proxy_pass http://api;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check (no rate limiting)
        location /health {
            proxy_pass http://api;
            access_log off;
        }
    }
}
```

### Cloudflare Tunnel Configuration

#### Production Tunnel Setup
```yaml
# .cloudflared/config.yml
tunnel: caretracker-production
credentials-file: /Users/username/.cloudflared/caretracker.json

# Ingress rules for production
ingress:
  # Main application
  - hostname: caretracker.yourdomain.com
    service: https://localhost:443
    originRequest:
      originServerName: caretracker.local
      noTLSVerify: true

  # API subdomain
  - hostname: api.caretracker.yourdomain.com
    service: https://localhost:443
    originRequest:
      originServerName: api.caretracker.local
      noTLSVerify: true

  # Admin dashboard
  - hostname: admin.caretracker.yourdomain.com
    service: https://localhost:443
    originRequest:
      originServerName: admin.caretracker.local
      noTLSVerify: true

  # Monitoring (restricted access)
  - hostname: monitoring.caretracker.yourdomain.com
    service: http://localhost:3001
    originRequest:
      httpHostHeader: monitoring.caretracker.local

  # Catch-all
  - service: http_status:404

# Tunnel management script
```

```bash
#!/bin/bash
# scripts/tunnel-manager.sh

set -euo pipefail

TUNNEL_NAME="caretracker-production"
CLOUDFLARED_DIR="$HOME/.cloudflared"
CONFIG_FILE="$CLOUDFLARED_DIR/config.yml"

create_tunnel() {
    echo "Creating Cloudflare tunnel..."
    cloudflared tunnel create $TUNNEL_NAME

    echo "Setting up DNS records..."
    cloudflared tunnel route dns $TUNNEL_NAME caretracker.yourdomain.com
    cloudflared tunnel route dns $TUNNEL_NAME api.caretracker.yourdomain.com
    cloudflared tunnel route dns $TUNNEL_NAME admin.caretracker.yourdomain.com
    cloudflared tunnel route dns $TUNNEL_NAME monitoring.caretracker.yourdomain.com
}

start_tunnel() {
    echo "Starting tunnel in background..."
    nohup cloudflared tunnel --config $CONFIG_FILE run $TUNNEL_NAME > tunnel.log 2>&1 &
    echo $! > tunnel.pid
    echo "Tunnel started with PID $(cat tunnel.pid)"
}

stop_tunnel() {
    if [ -f tunnel.pid ]; then
        echo "Stopping tunnel..."
        kill $(cat tunnel.pid)
        rm tunnel.pid
        echo "Tunnel stopped"
    else
        echo "No tunnel PID found"
    fi
}

status_tunnel() {
    if [ -f tunnel.pid ] && ps -p $(cat tunnel.pid) > /dev/null; then
        echo "Tunnel is running (PID: $(cat tunnel.pid))"
        curl -s https://caretracker.yourdomain.com/health || echo "Health check failed"
    else
        echo "Tunnel is not running"
    fi
}

case "${1:-}" in
    create)
        create_tunnel
        ;;
    start)
        start_tunnel
        ;;
    stop)
        stop_tunnel
        ;;
    status)
        status_tunnel
        ;;
    restart)
        stop_tunnel
        sleep 2
        start_tunnel
        ;;
    *)
        echo "Usage: $0 {create|start|stop|status|restart}"
        exit 1
        ;;
esac
```

### Monitoring & Observability

#### Prometheus Configuration
```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

alertmanager:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

scrape_configs:
  # Application metrics
  - job_name: 'caretracker-api'
    static_configs:
      - targets: ['api:3001']
    metrics_path: '/metrics'
    scrape_interval: 5s

  # System metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']

  # Database metrics
  - job_name: 'postgres-exporter'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis metrics
  - job_name: 'redis-exporter'
    static_configs:
      - targets: ['redis-exporter:9121']

  # Nginx metrics
  - job_name: 'nginx'
    static_configs:
      - targets: ['nginx:9113']
```

#### Application Metrics Implementation
```typescript
// Prometheus metrics in API
import client from 'prom-client';

// Create metrics
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
});

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new client.Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active WebSocket connections'
});

const databaseConnections = new client.Gauge({
  name: 'database_connections_active',
  help: 'Number of active database connections'
});

// Middleware for request metrics
app.addHook('onRequest', async (request) => {
  request.startTime = Date.now();
});

app.addHook('onResponse', async (request, reply) => {
  const duration = (Date.now() - request.startTime) / 1000;
  const route = request.routerPath || request.url;

  httpRequestDuration
    .labels(request.method, route, String(reply.statusCode))
    .observe(duration);

  httpRequestsTotal
    .labels(request.method, route, String(reply.statusCode))
    .inc();
});

// Metrics endpoint
app.get('/metrics', async (request, reply) => {
  reply.type('text/plain');
  return client.register.metrics();
});

// Custom business metrics
export const visitMetrics = {
  visitsCreated: new client.Counter({
    name: 'visits_created_total',
    help: 'Total number of visits created',
    labelNames: ['client_type', 'worker_type']
  }),

  visitDuration: new client.Histogram({
    name: 'visit_duration_minutes',
    help: 'Duration of completed visits in minutes',
    labelNames: ['activity_type'],
    buckets: [15, 30, 60, 90, 120, 180, 240, 360, 480]
  }),

  authenticationAttempts: new client.Counter({
    name: 'authentication_attempts_total',
    help: 'Total authentication attempts',
    labelNames: ['result', 'user_type']
  })
};
```

### Backup & Recovery System

#### Automated Backup Script
```bash
#!/bin/bash
# scripts/backup-system.sh

set -euo pipefail

BACKUP_DIR="/Users/$(whoami)/caretracker-backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Function to log with timestamp
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

# Database backup
backup_database() {
    log "Starting database backup..."

    docker exec caretracker_postgres_prod pg_dump \
        -U caretracker_user \
        -d caretracker_prod \
        --verbose \
        --clean \
        --if-exists \
        --create \
        --format=custom \
        > "$BACKUP_DIR/database_$DATE.dump"

    # Compress backup
    gzip "$BACKUP_DIR/database_$DATE.dump"

    log "Database backup completed: database_$DATE.dump.gz"
}

# Application files backup
backup_files() {
    log "Starting application files backup..."

    tar -czf "$BACKUP_DIR/files_$DATE.tar.gz" \
        --exclude=node_modules \
        --exclude=.git \
        --exclude=dist \
        --exclude=.next \
        --exclude=logs \
        ./

    log "Application files backup completed: files_$DATE.tar.gz"
}

# Uploads backup
backup_uploads() {
    if [ -d "./uploads" ]; then
        log "Starting uploads backup..."

        tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" ./uploads/

        log "Uploads backup completed: uploads_$DATE.tar.gz"
    fi
}

# Configuration backup
backup_config() {
    log "Starting configuration backup..."

    mkdir -p "$BACKUP_DIR/config_$DATE"

    # Copy important config files
    cp -r .env* "$BACKUP_DIR/config_$DATE/" 2>/dev/null || true
    cp -r docker-compose*.yml "$BACKUP_DIR/config_$DATE/"
    cp -r nginx/ "$BACKUP_DIR/config_$DATE/" 2>/dev/null || true
    cp -r .cloudflared/ "$BACKUP_DIR/config_$DATE/" 2>/dev/null || true

    tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" -C "$BACKUP_DIR" "config_$DATE"
    rm -rf "$BACKUP_DIR/config_$DATE"

    log "Configuration backup completed: config_$DATE.tar.gz"
}

# Cleanup old backups
cleanup_old_backups() {
    log "Cleaning up backups older than $RETENTION_DAYS days..."

    find "$BACKUP_DIR" -name "*.gz" -mtime +$RETENTION_DAYS -delete

    log "Cleanup completed"
}

# Verify backup integrity
verify_backup() {
    log "Verifying backup integrity..."

    # Test database backup
    if [ -f "$BACKUP_DIR/database_$DATE.dump.gz" ]; then
        gunzip -t "$BACKUP_DIR/database_$DATE.dump.gz"
        log "Database backup integrity verified"
    fi

    # Test other backups
    for backup in "$BACKUP_DIR"/*_$DATE.tar.gz; do
        if [ -f "$backup" ]; then
            tar -tzf "$backup" > /dev/null
            log "$(basename "$backup") integrity verified"
        fi
    done
}

# Main backup process
main() {
    log "Starting backup process..."

    backup_database
    backup_files
    backup_uploads
    backup_config
    verify_backup
    cleanup_old_backups

    log "Backup process completed successfully"

    # Send notification (if configured)
    if command -v mail &> /dev/null; then
        echo "CareTracker backup completed successfully at $(date)" | \
        mail -s "CareTracker Backup Success" admin@example.com
    fi
}

# Run backup
main "$@"
```

## Implementation Tasks

### Production Environment Setup
- [ ] **Container Optimization**
  - [ ] Multi-stage Docker builds for production
  - [ ] ARM64 native image optimization
  - [ ] Resource limits and health checks
  - [ ] Container security scanning
  - [ ] Image size optimization

- [ ] **SSL/TLS Configuration**
  - [ ] Self-signed certificates for local development
  - [ ] Let's Encrypt integration for public domains
  - [ ] SSL/TLS optimization and security
  - [ ] Certificate renewal automation
  - [ ] HSTS and security headers

### Public Access & Domain Management
- [ ] **Cloudflare Tunnel Configuration**
  - [ ] Production tunnel setup with custom domains
  - [ ] DNS configuration and management
  - [ ] Load balancing and failover
  - [ ] Access policies and restrictions
  - [ ] Tunnel monitoring and alerting

- [ ] **Domain & DNS Management**
  - [ ] Custom domain configuration
  - [ ] Subdomain routing for services
  - [ ] DNS security and monitoring
  - [ ] CDN configuration for static assets
  - [ ] Geographic routing optimization

### Monitoring & Observability
- [ ] **Metrics Collection**
  - [ ] Application performance metrics
  - [ ] System resource monitoring
  - [ ] Database performance metrics
  - [ ] Custom business metrics
  - [ ] Real-time dashboard creation

- [ ] **Alerting & Notifications**
  - [ ] Critical system alerts
  - [ ] Performance threshold monitoring
  - [ ] Security event alerting
  - [ ] Uptime monitoring
  - [ ] Error rate monitoring

### Backup & Recovery
- [ ] **Automated Backup System**
  - [ ] Database backup automation
  - [ ] File system backup procedures
  - [ ] Configuration backup
  - [ ] Backup verification and testing
  - [ ] Remote backup storage

- [ ] **Disaster Recovery**
  - [ ] Recovery procedure documentation
  - [ ] Backup restoration testing
  - [ ] Data integrity verification
  - [ ] Emergency contact procedures
  - [ ] Recovery time objectives

### Performance Optimization
- [ ] **Caching Strategy**
  - [ ] Redis caching optimization
  - [ ] CDN integration
  - [ ] Database query optimization
  - [ ] Static asset optimization
  - [ ] Browser caching configuration

- [ ] **Resource Management**
  - [ ] Memory usage optimization
  - [ ] CPU utilization monitoring
  - [ ] Disk space management
  - [ ] Network bandwidth optimization
  - [ ] Container resource allocation

## Validation & Testing

### Production Testing
```bash
# Production environment testing script
#!/bin/bash

# Health check tests
test_health_checks() {
    echo "Testing health checks..."

    # API health check
    curl -f https://api.caretracker.yourdomain.com/health || exit 1

    # Frontend availability
    curl -f https://caretracker.yourdomain.com || exit 1

    # Database connectivity
    docker exec caretracker_postgres_prod pg_isready -U caretracker_user || exit 1

    echo "✅ Health checks passed"
}

# Performance tests
test_performance() {
    echo "Testing performance..."

    # API response time
    response_time=$(curl -o /dev/null -s -w '%{time_total}' https://api.caretracker.yourdomain.com/health)
    if (( $(echo "$response_time > 0.1" | bc -l) )); then
        echo "❌ API response time too slow: ${response_time}s"
        exit 1
    fi

    echo "✅ Performance tests passed"
}

# Security tests
test_security() {
    echo "Testing security..."

    # SSL certificate validation
    openssl s_client -connect caretracker.yourdomain.com:443 -servername caretracker.yourdomain.com < /dev/null

    # Security headers check
    curl -I https://caretracker.yourdomain.com | grep -i "x-frame-options\|x-content-type-options\|x-xss-protection"

    echo "✅ Security tests passed"
}

# Run all tests
test_health_checks
test_performance
test_security

echo "🎉 All production tests passed!"
```

### Load Testing
```typescript
// Load testing with k6
import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 10 }, // Ramp up
    { duration: '5m', target: 50 }, // Sustained load
    { duration: '2m', target: 100 }, // Peak load
    { duration: '2m', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<100'], // 95% of requests under 100ms
    http_req_failed: ['rate<0.1'],    // Error rate under 10%
  },
};

export default function() {
  // Test API endpoints
  let response = http.get('https://api.caretracker.yourdomain.com/health');
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 100ms': (r) => r.timings.duration < 100,
  });

  // Test authenticated endpoints
  let loginResponse = http.post('https://api.caretracker.yourdomain.com/auth/login', {
    email: 'test@example.com',
    password: 'testpassword',
  });

  if (loginResponse.status === 200) {
    let token = loginResponse.json('data.accessToken');

    let visitsResponse = http.get('https://api.caretracker.yourdomain.com/visits', {
      headers: { Authorization: `Bearer ${token}` },
    });

    check(visitsResponse, {
      'visits status is 200': (r) => r.status === 200,
      'visits response time < 200ms': (r) => r.timings.duration < 200,
    });
  }

  sleep(1);
}
```

## Success Metrics

### Operational Excellence
- [ ] **Uptime**: 99.9% availability during demonstration period
- [ ] **Performance**: 95% of requests under 100ms response time
- [ ] **Reliability**: Zero data loss during backup/recovery testing
- [ ] **Security**: All security scans passing without critical issues
- [ ] **Monitoring**: 100% of critical metrics being tracked

### Deployment Quality
- [ ] **Automation**: Fully automated deployment and backup processes
- [ ] **Documentation**: Complete operational runbooks and procedures
- [ ] **Recovery**: Disaster recovery tested and validated
- [ ] **Monitoring**: Comprehensive dashboards and alerting operational
- [ ] **Security**: Production security hardening implemented

### Professional Presentation
- [ ] **Public URLs**: Professional domains with SSL certificates
- [ ] **Monitoring Dashboards**: Real-time operational visibility
- [ ] **Performance Metrics**: Lighthouse scores >90 for all applications
- [ ] **Security Validation**: Penetration testing completed successfully
- [ ] **Documentation**: Complete deployment and operational guides

---

*Phase 5 delivers enterprise-grade production deployment on MacBook Pro M1 with professional public access, comprehensive monitoring, automated backup systems, and operational excellence suitable for healthcare environments.*