# Tracing

Distributed tracing tracks requests across service boundaries, helping diagnose performance issues and errors.

## OpenTelemetry Setup

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.17.0"
    "go.opentelemetry.io/otel/trace"
)

func initTracer() (*sdktrace.TracerProvider, error) {
    exporter, err := otlptrace.New(context.Background(), otlptrace.NewClient())
    if err != nil {
        return nil, err
    }

    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exporter),
        sdktrace.WithResource(resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName("my-service"),
            semconv.DeploymentEnvironment("production"),
        )),
    )

    otel.SetTracerProvider(tp)
    return tp, nil
}
```

## Creating Spans

```go
func handleRequest(w http.ResponseWriter, r *http.Request) {
    tracer := otel.Tracer("api-server")
    ctx, span := tracer.Start(r.Context(), "handleRequest")
    defer span.End()

    // Set attributes
    span.SetAttributes(
        attribute.String("http.method", r.Method),
        attribute.String("http.url", r.URL.String()),
    )

    // Create child span
    user, err := getUser(ctx, userID)
    if err != nil {
        span.RecordError(err)
        span.SetStatus(codes.Error, err.Error())
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    span.SetAttributes(attribute.String("user.id", user.ID))
}

func getUser(ctx context.Context, id string) (*User, error) {
    tracer := otel.Tracer("api-server")
    _, span := tracer.Start(ctx, "getUser")
    defer span.End()

    span.SetAttributes(attribute.String("user.id", id))
    span.AddEvent("querying database")

    // Database query
    user, err := db.QueryUser(id)
    if err != nil {
        span.RecordError(err)
        return nil, err
    }

    span.AddEvent("user found")
    return user, nil
}
```

## HTTP Middleware Tracing

```go
func TracingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        tracer := otel.Tracer("http")
        ctx, span := tracer.Start(r.Context(), r.URL.Path)
        defer span.End()

        span.SetAttributes(
            attribute.String("http.method", r.Method),
            attribute.String("http.url", r.URL.String()),
        )

        next.ServeHTTP(w, r.WithContext(ctx))
    })
}
```

## Propagating Context

```go
import (
    "go.opentelemetry.io/otel/propagation"
)

func callExternalService(ctx context.Context, url string) error {
    tracer := otel.Tracer("client")
    ctx, span := tracer.Start(ctx, "callExternalService")
    defer span.End()

    req, _ := http.NewRequestWithContext(ctx, "GET", url, nil)

    // Inject trace context into headers
    otel.GetTextMapPropagator().Inject(ctx, propagation.HeaderCarrier(req.Header))

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        span.RecordError(err)
        return err
    }
    defer resp.Body.Close()

    return nil
}

// On the server side, extract is automatic if using middleware
```

## Practice

1. Add tracing to a HTTP server and client
2. Create custom span attributes for business logic
3. Implement tracing in a worker queue
4. Export traces to Jaeger or Zipkin
