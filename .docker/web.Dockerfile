FROM node:18-alpine as builder

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .
RUN pnpm --filter @biseo/web... install --offline
RUN pnpm --filter @biseo/web... build

FROM nginx:1.22-alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/packages/web/dist /usr/share/nginx/html

EXPOSE 80
