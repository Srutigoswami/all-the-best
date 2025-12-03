# Frontend Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
# Update CA certificates and configure npm for SSL issues
RUN apk update && apk add --no-cache ca-certificates && update-ca-certificates && \
    npm config set strict-ssl false
COPY package.json .
COPY tsconfig.json .
COPY vite.config.* .
COPY public ./public
COPY index.html ./
COPY src ./src
COPY tailwind.config.js .
COPY postcss.config.cjs .
RUN npm install && npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
