FROM node:18-alpine as builder

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY server/package.json ./server/
COPY interface/package.json ./interface/

RUN pnpm --filter @biseo/server install --frozen-lockfile

COPY server ./server
COPY interface ./interface

RUN pnpm --filter @biseo/server build
#
#FROM node:18-alpine
#
#WORKDIR /app
#
#COPY --from=builder /app/server/dist ./dist

EXPOSE 8000

CMD ["pnpm", "-F", "@biseo/server", "prod"]
