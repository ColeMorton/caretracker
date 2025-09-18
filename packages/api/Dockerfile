FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY packages/api/package.json ./packages/api/
COPY packages/shared/package.json ./packages/shared/
COPY packages/database/package.json ./packages/database/
COPY tooling/typescript/package.json ./tooling/typescript/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS dev
COPY . .
EXPOSE 3001
CMD ["pnpm", "--filter", "@caretracker/api", "dev"]

# Production build stage
FROM base AS build
COPY . .
RUN pnpm build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

RUN npm install -g pnpm

# Copy built application
COPY --from=build /app/package.json /app/pnpm-lock.yaml* /app/pnpm-workspace.yaml ./
COPY --from=build /app/packages/api/dist ./packages/api/dist
COPY --from=build /app/packages/api/package.json ./packages/api/
COPY --from=build /app/packages/shared/dist ./packages/shared/dist
COPY --from=build /app/packages/shared/package.json ./packages/shared/

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3001
CMD ["node", "packages/api/dist/server.js"]