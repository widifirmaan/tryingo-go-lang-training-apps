# Deployment

Deploy your capstone project to production.

## Production Configuration

```yaml
# config/production.yaml
server:
  port: 8080
  host: "0.0.0.0"
  read_timeout: 10s
  write_timeout: 10s
  graceful_timeout: 30s

database:
  max_open_conns: 25
  max_idle_conns: 5
  conn_max_lifetime: 5m

redis:
  pool_size: 10
  min_idle_conns: 3
  read_timeout: 3s
  write_timeout: 3s

logging:
  level: "info"
  format: "json"

monitoring:
  sentry_dsn: "${SENTRY_DSN}"
  prometheus: true
  tracing_sample_rate: 0.1
```

## Server with Graceful Shutdown

```go
func main() {
    cfg, err := config.Load("config/production.yaml")
    if err != nil {
        log.Fatal(err)
    }

    app, err := InitializeApplication()
    if err != nil {
        log.Fatal(err)
    }

    srv := &http.Server{
        Addr:         fmt.Sprintf("%s:%d", cfg.Server.Host, cfg.Server.Port),
        Handler:      app.Router,
        ReadTimeout:  cfg.Server.ReadTimeout,
        WriteTimeout: cfg.Server.WriteTimeout,
    }

    go func() {
        slog.Info("server starting", "addr", srv.Addr)
        if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
            log.Fatal(err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    ctx, cancel := context.WithTimeout(context.Background(), cfg.Server.GracefulTimeout)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatal(err)
    }
}
```

## CI/CD Pipeline

```yaml
name: Deploy Capstone

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-go@v5
        with:
          go-version: "1.22"

      - run: go test ./... -race
      - run: go vet ./...

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: ghcr.io/${{ github.repository }}:latest

      - name: Deploy
        run: |
          kubectl set image deployment/myapp \
            myapp=ghcr.io/${{ github.repository }}:latest
```

## Practice
1. Configure production monitoring
2. Set up CI/CD pipeline
3. Deploy to cloud provider
