FROM node:22-alpine AS builder
WORKDIR /app/producer
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
COPY producer/package.json producer/pnpm-lock.yaml producer/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY producer/ .
RUN pnpm run build

FROM node:22-alpine AS runner
WORKDIR /app/producer
ENV NODE_ENV=production
RUN corepack enable && corepack prepare pnpm@11.13.1 --activate
COPY producer/package.json producer/pnpm-lock.yaml producer/pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod
COPY --from=builder /app/producer/dist ./dist
COPY proto /app/proto
EXPOSE 50051
CMD ["node", "dist/main.js"]
