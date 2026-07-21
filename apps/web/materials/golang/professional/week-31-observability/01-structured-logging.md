# Structured Logging

Implement structured logging with Go's standard `log/slog` package.

## Basic Usage

```go
import "log/slog"

func main() {
    slog.Info("server starting",
        "port", 8080,
        "env", "production",
    )
    slog.Warn("high memory usage",
        "used_mb", 1024,
        "threshold_mb", 800,
    )
    slog.Error("connection failed",
        "service", "database",
        "error", err,
    )
}
```

## Custom Logger Setup

```go
func SetupLogger(env string) *slog.Logger {
    var handler slog.Handler
    switch env {
    case "production":
        handler = slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
            Level:     slog.LevelInfo,
            AddSource: true,
            ReplaceAttr: func(groups []string, a slog.Attr) slog.Attr {
                if a.Key == slog.TimeKey {
                    a.Value = slog.StringValue(time.Now().UTC().Format(time.RFC3339))
                }
                return a
            },
        })
    default:
        handler = slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{
            Level: slog.LevelDebug,
        })
    }
    return slog.New(handler)
}
```

## Contextual Logging

```go
type ContextHandler struct {
    handler slog.Handler
}

func (h *ContextHandler) Handle(ctx context.Context, r slog.Record) error {
    if traceID, ok := ctx.Value("trace_id").(string); ok {
        r.AddAttrs(slog.String("trace_id", traceID))
    }
    if requestID, ok := ctx.Value("request_id").(string); ok {
        r.AddAttrs(slog.String("request_id", requestID))
    }
    return h.handler.Handle(ctx, r)
}

func WithRequestID(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        requestID := r.Header.Get("X-Request-ID")
        if requestID == "" {
            requestID = uuid.New().String()
        }
        ctx := context.WithValue(r.Context(), "request_id", requestID)
        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

## Log Levels Best Practices

```go
// DEBUG: Detailed info for debugging
slog.Debug("request payload", "body", payload)

// INFO: Normal operational messages
slog.Info("order created", "order_id", id, "customer", customerID)

// WARN: Something unexpected but handled
slog.Warn("rate limit approaching", "current", 95, "limit", 100)

// ERROR: Something failed but service continues
slog.Error("payment gateway timeout", "attempt", 3, "order_id", id)

// FATAL: Unrecoverable - should shutdown
slog.Error("database unreachable", "error", err)
os.Exit(1)
```

## Practice
1. Create a structured logger with request ID propagation
2. Implement log level configuration via environment variables
3. Build a log aggregator that reads from multiple sources
