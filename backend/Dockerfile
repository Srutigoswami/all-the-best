# Multi-stage Dockerfile for production
FROM node:18 AS builder
WORKDIR /app
# Update CA certificates and configure npm for SSL issues
RUN apt-get update && apt-get install -y ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/* && \
    npm config set strict-ssl false
COPY package.json tsconfig.json ./
COPY src ./src
COPY data ./data
RUN npm install && npm run build

FROM node:18-alpine AS production
WORKDIR /app
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates && \
    npm config set strict-ssl false
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/data ./data
RUN npm install --omit=dev
EXPOSE 4000
CMD ["node", "dist/server.js"]
