# Backend Dockerfile

# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy built artifacts from builder stage
COPY --from=builder /app/dist ./dist
# Copy any necessary data files (if applicable)
COPY --from=builder /app/data ./data

# Expose port
EXPOSE 4000

# Start server
CMD ["node", "dist/server.js"]
