# gRPC Filtering Service

## Requirements

- Node.js v24.18.0
- pnpm

## Running with Docker

```bash
docker compose up --build
```

## Running in OS

Install dependencies in both services:

```bash
cd producer && pnpm install && cd ..
cd consumer && pnpm install && cd ..
```

**Terminal 1** — start the Producer (gRPC server on `0.0.0.0:50051`):

```bash
cd producer
pnpm run start
```

**Terminal 2** — run the Consumer:

```bash
cd consumer
pnpm run start
```

Expected Consumer output:

```
consumer-1  | Filtered Users: [
consumer-1  |   {
consumer-1  |     "id": 1,
consumer-1  |     "name": "Alice",
consumer-1  |     "age": 25
consumer-1  |   },
consumer-1  |   {
consumer-1  |     "id": 3,
consumer-1  |     "name": "Charlie",
consumer-1  |     "age": 30
consumer-1  |   },
consumer-1  |   {
consumer-1  |     "id": 4,
consumer-1  |     "name": "Kirk",
consumer-1  |     "age": 30
consumer-1  |   },
consumer-1  |   {
consumer-1  |     "id": 3,
consumer-1  |     "name": "Jeffrey",
consumer-1  |     "age": 66
consumer-1  |   }
consumer-1  | ]
```
