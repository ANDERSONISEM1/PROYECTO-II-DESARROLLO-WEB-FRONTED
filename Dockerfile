# =========================
# Build Angular
# =========================
FROM node:20-alpine AS builder
WORKDIR /app

# Copia archivos de configuración primero (mejor cacheo)
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

# (Opcional) toolchain si compilas binarios nativos
# RUN apk add --no-cache python3 make g++

# Instala dependencias de forma reproducible
RUN npm ci

# Copia el resto del código y construye
COPY . .
RUN rm -rf dist && npm run build -- --configuration=production-docker

# =========================
# Serve con Nginx
# =========================
FROM nginx:alpine

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Limpia el docroot y copia el build (tu outputPath = dist/web)
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/web/. /usr/share/nginx/html/

# Nginx config (SPA con fallback a index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# Verificación build-time (no rompe si falla el ls)
RUN echo "=== LISTANDO /usr/share/nginx/html ===" && ls -la /usr/share/nginx/html/ || true

# Healthcheck simple al index
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
