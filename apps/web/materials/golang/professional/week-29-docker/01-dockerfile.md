# Dockerfile for Go Applications

Write efficient and secure Dockerfiles for Go services.

## Basic Dockerfile

```dockerfile
FROM golang:1.22-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/server ./cmd/server

FROM alpine:3.19
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080
CMD ["./server"]
```

## CGO-Enabled Build

```dockerfile
FROM golang:1.22 AS builder

RUN apt-get update && apt-get install -y gcc libc6-dev
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app/server ./cmd/server

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/server /app/server
CMD ["/app/server"]
```

## Development Dockerfile

```dockerfile
FROM golang:1.22-alpine

RUN apk add --no-cache git make protobuf

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go install github.com/cosmtrek/air@latest
CMD ["air"]
```

## .dockerignore

```gitignore
.git/
.gitignore
*.md
test/
tests/
coverage/
*.test
node_modules/
Dockerfile
docker-compose.yml
```

## Best Practices
- Pin base image versions (don't use `latest`)
- Use official images from trusted registries
- Run as non-root user
- Set `GOPROXY` for faster builds in CI

## Practice
1. Write a Dockerfile for a Go CLI tool
2. Add health check to a Dockerfile
3. Configure container with proper signal handling
