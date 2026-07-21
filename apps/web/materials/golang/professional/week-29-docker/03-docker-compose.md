# Docker Compose

Orchestrate multi-service Go applications with Docker Compose.

## Basic Setup

```yaml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      REDIS_HOST: redis
      REDIS_PORT: 6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready"]
      interval: 5s
      timeout: 5s
      retries: 5
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

## Development with Hot Reload

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - .:/app
      - /app/tmp
    ports:
      - "8080:8080"
    environment:
      - GIN_MODE=debug
      - GOPATH=/go
    command: air -c .air.toml
```

## Full Microservice Stack

```yaml
services:
  gateway:
    build: ./gateway
    ports: ["8080:8080"]
    depends_on: [user-svc, order-svc]

  user-svc:
    build: ./services/user
    ports: ["8081:8081"]
    depends_on: [user-db, nats]

  order-svc:
    build: ./services/order
    ports: ["8082:8082"]
    depends_on: [order-db, nats]

  nats:
    image: nats:2.10-alpine
    command: --cluster_name NATS --cluster nats://0.0.0.0:6222 --http_port 8222
    ports: ["4222:4222", "8222:8222"]

  user-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: users

  order-db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: orders
```

## Practice
1. Create a compose file with Prometheus and Grafana
2. Add wait-for-it script for startup ordering
3. Set up a compose profile for integration tests
