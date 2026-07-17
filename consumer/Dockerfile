FROM node:22-alpine AS builder
WORKDIR /app/consumer
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
COPY consumer/package.json consumer/pnpm-lock.yaml consumer/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY consumer/ .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app/consumer
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
COPY consumer/package.json consumer/pnpm-lock.yaml consumer/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/consumer/dist ./dist
COPY proto /app/proto
CMD ["node", "dist/main.js"]
