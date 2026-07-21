# Multi-stage Builds

Master multi-stage Docker builds for minimal, production-ready images.

## Standard Multi-stage

```dockerfile
# Stage 1: Build
FROM golang:1.22-alpine AS builder
RUN apk add --no-cache git
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app ./cmd/server

# Stage 2: Runtime
FROM scratch
COPY --from=builder /app /app
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
EXPOSE 8080
ENTRYPOINT ["/app"]
```

## With Protobuf Code Generation

```dockerfile
FROM golang:1.22 AS tools
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

FROM tools AS proto
WORKDIR /src
COPY proto/ ./proto/
RUN protoc --go_out=. --go-grpc_out=. proto/*.proto

FROM golang:1.22-alpine AS builder
WORKDIR /src
COPY --from=proto /src/ ./
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -tags netgo -ldflags="-s -w" -o /app ./cmd/server

FROM scratch
COPY --from=builder /app /app
CMD ["/app"]
```

## Distroless Base

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN CGO_ENABLED=0 go build -o server .

FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=builder /app/server /server
USER nonroot:nonroot
ENTRYPOINT ["/server"]
```

## Test Stage

```dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o /app/server ./cmd/server

FROM builder AS tester
RUN go test ./... -v -race -coverprofile=/coverage.out
RUN go vet ./...

FROM scratch
COPY --from=builder /app/server /server
CMD ["/server"]
```

## Practice
1. Create a 4-stage Dockerfile (build, test, lint, release)
2. Reduce image size below 5MB for a Go app
3. Embed frontend assets in a multi-stage build
