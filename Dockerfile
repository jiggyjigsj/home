# ---- build ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
# puppeteer-core is only used to render the résumé PDF locally; it never downloads a browser here.
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- serve ----
# Unprivileged nginx: runs as uid 101, no root, no capabilities needed to bind 3000.
FROM nginxinc/nginx-unprivileged:stable-alpine
USER root
RUN apk upgrade --no-cache
USER 101
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1
