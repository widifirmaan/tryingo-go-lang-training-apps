# Cloudflare Deployment

Deploy Go applications on Cloudflare Workers and Pages.

## Cloudflare Workers with Go

```go
package main

import (
    "fmt"
    "net/http"
    "github.com/syumai/workers"
    "github.com/syumai/workers/cloudflare"
)

func main() {
    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        fmt.Fprintf(w, `{"message": "Hello from Go on Cloudflare Workers!"}`)
    })
    workers.Serve(handler)
}
```

## wrangler.toml

```toml
name = "myapp-worker"
main = "build/worker.js"
compatibility_date = "2026-07-01"

[build]
command = "go build -o build/worker ./cmd/worker"

[build.upload]
format = "modules"
dir = "./build"
main = "./worker"

[[services]]
binding = "ORDER_SERVICE"
service = "order-service"
environment = "production"

[env.production]
vars = { LOG_LEVEL = "info" }

[[env.production.kv_namespaces]]
binding = "MY_KV"
id = "abc123"
```

## Cloudflare KV Integration

```go
package main

import (
    "context"
    "github.com/syumai/workers/cloudflare"
)

func handleRequest(w http.ResponseWriter, r *http.Request) {
    ctx := context.Background()

    kv, err := cloudflare.NewKVNamespace(ctx, "MY_KV")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    value, err := kv.Get(ctx, "cache_key")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if value == "" {
        // Compute and cache
        result := computeExpensiveResult()
        kv.Put(ctx, "cache_key", result, cloudflare.KVPutOptions{
            ExpirationTTL: 3600,
        })
        value = result
    }

    fmt.Fprint(w, value)
}
```

## R2 Object Storage

```go
func uploadToR2(ctx context.Context, bucket *cloudflare.R2Bucket, key string, data []byte) error {
    _, err := bucket.Put(ctx, key, cloudflare.R2PutOptions{
        Body: bytes.NewReader(data),
        HTTPMetadata: cloudflare.HTTPMetadata{
            ContentType: "application/octet-stream",
        },
        CustomMetadata: map[string]string{
            "uploaded_by": "myapp",
        },
    })
    return err
}
```

## Practice
1. Deploy a Go HTTP handler to Cloudflare Workers
2. Integrate with Cloudflare KV for caching
3. Use R2 for file storage
