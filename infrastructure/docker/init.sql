-- Initial database setup for CareTracker
-- This script runs when the PostgreSQL container is first created

-- Enable UUID extension (if needed in future)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Set timezone
SET timezone = 'UTC';

-- Create database if it doesn't exist (although this should be handled by env vars)
SELECT 'CREATE DATABASE caretracker'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'caretracker')\gexec