FROM node:18-alpine as builder

RUN apk update && apk upgrade && \
    apk add --no-cache openssl

WORKDIR /app

RUN npm install -g pnpm@8.6.12

COPY pnpm-lock.yaml .
RUN pnpm fetch


COPY . .
RUN pnpm --filter @biseo/api... install --offline

RUN pnpm --filter @biseo/api... build
#RUN pnpm --filter @biseo/api --prod deploy pruned
#
#FROM node:18-alpine
#
#WORKDIR /app
#
#COPY --from=builder /app/pruned .
#
#EXPOSE 8000
#
#CMD ["npm", "run", "prod"]

EXPOSE 8000

RUN apk add --no-cache openssl

CMD ["pnpm", "--filter", "@biseo/api", "prod"]



