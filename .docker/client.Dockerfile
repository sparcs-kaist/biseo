FROM node:18-alpine as builder

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY client/package.json ./client/
COPY interface/package.json ./interface/

RUN pnpm --filter @biseo/client install --frozen-lockfile

COPY client ./client
COPY interface ./interface

RUN pnpm --filter @biseo/client build

FROM nginx:1.22-alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/client/dist /usr/share/nginx/html

EXPOSE 80
