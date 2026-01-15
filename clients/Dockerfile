# Dockerfile for production mode

#
# ---------------------------------------------------------
#
FROM node:20-alpine AS base

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_HOST

ENV DIR=/home/clients \
    API_URL=$NEXT_PUBLIC_API_URL \
    HOST=$NEXT_PUBLIC_HOST \
    NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_HOST=$NEXT_PUBLIC_HOST \
    COREPACK_INTEGRITY_KEYS="0" \
    PNPM_HOME="/pnpm" \
    PATH="$PNPM_HOME:$PATH"

RUN corepack enable pnpm
RUN corepack use pnpm@10.0.0

#
# ---------------------------------------------------------
#
FROM base AS builder

RUN apk add --no-cache libc6-compat

WORKDIR $DIR

COPY . $DIR/

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm prebuild

RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start"]