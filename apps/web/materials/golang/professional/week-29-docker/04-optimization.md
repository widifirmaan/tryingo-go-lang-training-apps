# Docker Optimization

Optimize Docker images for size, speed, and security.

## Layer Optimization

```dockerfile
# Bad: changing code invalidates all layers
COPY . .
RUN go mod download
RUN go build -o /app .

# Good: dependencies cached separately
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app .
```

## Build Cache with Docker BuildKit

```dockerfile
# syntax=docker/dockerfile:1.4
FROM golang:1.22-alpine AS builder

RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -o /app .
```

## Image Size Comparison

```go
package main

import (
    "encoding/json"
    "net/http"
    "runtime"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]interface{}{
            "go": runtime.Version(),
            "arch": runtime.GOARCH,
        })
    })
    http.ListenAndServe(":8080", nil)
}
```

```dockerfile
# Build and measure size
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY main.go .
RUN CGO_ENABLED=0 go build -ldflags="-s -w" -o /app/server .

# scratch: ~5MB
FROM scratch
COPY --from=builder /app/server /server
CMD ["/server"]

# alpine: ~12MB (includes shell, useful for debugging)
FROM alpine:3.19
RUN apk add --no-cache ca-certificates
COPY --from=builder /app/server /server
CMD ["/server"]

# distroless: ~8MB (secure, but hard to debug)
FROM gcr.io/distroless/static-debian12:nonroot
COPY --from=builder /app/server /server
CMD ["/server"]
```

## Security Scanning

```bash
# Scan with Trivy
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image myapp:latest

# Scan with Docker Scout
docker scout cves myapp:latest
```

## Practice
1. Reduce a Go image from 800MB to under 10MB
2. Set up Docker layer caching in CI pipeline
3. Run Trivy scan and fix critical vulnerabilities
