FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY client/package.json ./client/
COPY interface/package.json ./interface/

RUN pnpm --filter @biseo/client install --frozen-lockfile

CMD pnpm --filter @biseo/server dev

#FROM nginx:1.22-alpine

