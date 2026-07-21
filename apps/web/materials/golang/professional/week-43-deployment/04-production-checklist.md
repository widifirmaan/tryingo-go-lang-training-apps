# Production Checklist

Comprehensive checklist for deploying Go applications to production.

## Pre-Deployment Checklist

```go
type ProductionChecklist struct {
    Category    string
    Items       []ChecklistItem
}

type ChecklistItem struct {
    Name        string
    Description string
    Verified    bool
    Notes       string
}

func generateChecklist() []ProductionChecklist {
    return []ProductionChecklist{
        {
            Category: "Security",
            Items: []ChecklistItem{
                {Name: "TLS/SSL configured", Description: "HTTPS enabled with valid certificate"},
                {Name: "Secrets management", Description: "No secrets in code or config files"},
                {Name: "Auth implemented", Description: "Authentication and authorization"},
                {Name: "Rate limiting", Description: "API rate limiting configured"},
                {Name: "SQL injection prevention", Description: "Parameterized queries only"},
                {Name: "Dependencies scanned", Description: "govulncheck passed"},
            },
        },
        {
            Category: "Observability",
            Items: []ChecklistItem{
                {Name: "Structured logging", Description: "JSON logging in production"},
                {Name: "Metrics", Description: "Prometheus metrics endpoint"},
                {Name: "Tracing", Description: "Distributed tracing with OpenTelemetry"},
                {Name: "Health checks", Description: "/health, /ready, /startup endpoints"},
                {Name: "Alerting", Description: "Alert rules configured"},
            },
        },
        {
            Category: "Reliability",
            Items: []ChecklistItem{
                {Name: "Graceful shutdown", Description: "SIGTERM handling"},
                {Name: "Circuit breakers", Description: "External service protection"},
                {Name: "Retry with backoff", Description: "Transient failure handling"},
                {Name: "Timeouts", Description: "All external calls have timeouts"},
                {Name: "Database connection pool", Description: "Proper pool configuration"},
            },
        },
    }
}
```

## Go Production Configuration

```go
type ProdConfig struct {
    Server      ServerConfig
    Database    DBConfig
    Cache       CacheConfig
    Observability ObsConfig
}

type ServerConfig struct {
    ReadTimeout       time.Duration
    WriteTimeout      time.Duration
    IdleTimeout       time.Duration
    MaxHeaderBytes    int
    GracefulTimeout   time.Duration
}

func NewProdServer(cfg ProdConfig) *http.Server {
    return &http.Server{
        ReadTimeout:       cfg.Server.ReadTimeout,    // 10s
        WriteTimeout:      cfg.Server.WriteTimeout,   // 10s
        IdleTimeout:       cfg.Server.IdleTimeout,    // 60s
        MaxHeaderBytes:    cfg.Server.MaxHeaderBytes, // 1MB
    }
}
```

## Go Runtime Tuning

```go
import "runtime/debug"

func init() {
    // Set max goroutines
    debug.SetMaxThreads(10000)
    // Set memory limit
    debug.SetMemoryLimit(256 * 1024 * 1024) // 256MB
    // Set GC percentage
    debug.SetGCPercent(100)
}
```

## Practice
1. Run through the full checklist for your application
2. Perform a pre-production security audit
3. Document operational runbooks
