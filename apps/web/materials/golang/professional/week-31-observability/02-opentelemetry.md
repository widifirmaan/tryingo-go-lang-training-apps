# OpenTelemetry

Distributed tracing and observability with OpenTelemetry in Go.

## Setup and Initialization

```go
import (
    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracegrpc"
    "go.opentelemetry.io/otel/sdk/resource"
    sdktrace "go.opentelemetry.io/otel/sdk/trace"
    semconv "go.opentelemetry.io/otel/semconv/v1.21.0"
)

func initTracer() (*sdktrace.TracerProvider, error) {
    exporter, err := otlptracegrpc.New(context.Background(),
        otlptracegrpc.WithEndpoint("otel-collector:4317"),
        otlptracegrpc.WithInsecure(),
    )
    if err != nil {
        return nil, err
    }
    tp := sdktrace.NewTracerProvider(
        sdktrace.WithBatcher(exporter),
        sdktrace.WithResource(resource.NewWithAttributes(
            semconv.SchemaURL,
            semconv.ServiceName("order-service"),
            semconv.DeploymentEnvironment("production"),
        )),
    )
    otel.SetTracerProvider(tp)
    return tp, nil
}
```

## Creating Spans

```go
func CreateOrder(ctx context.Context, req CreateOrderRequest) (*Order, error) {
    tracer := otel.Tracer("order-service")
    ctx, span := tracer.Start(ctx, "CreateOrder",
        trace.WithAttributes(
            attribute.String("customer_id", req.CustomerID),
            attribute.Int("item_count", len(req.Items)),
        ),
    )
    defer span.End()

    // Validate
    ctx, validateSpan := tracer.Start(ctx, "ValidateOrder")
    if err := validate(req); err != nil {
        validateSpan.RecordError(err)
        validateSpan.SetStatus(codes.Error, err.Error())
        validateSpan.End()
        return nil, err
    }
    validateSpan.End()

    // Save to database
    ctx, dbSpan := tracer.Start(ctx, "SaveOrder")
    order, err := db.Save(ctx, req)
    if err != nil {
        dbSpan.RecordError(err)
        dbSpan.SetStatus(codes.Error, err.Error())
        dbSpan.End()
        return nil, err
    }
    dbSpan.End()

    return order, nil
}
```

## HTTP Middleware

```go
func OTelMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        ctx := r.Context()
        tracer := otel.Tracer("http")
        path := r.URL.Path
        ctx, span := tracer.Start(ctx, path,
            trace.WithAttributes(
                semconv.HTTPMethod(r.Method),
                semconv.HTTPRoute(path),
                semconv.HTTPURL(r.URL.String()),
            ),
        )
        defer span.End()

        r = r.WithContext(ctx)
        next.ServeHTTP(w, r)
    })
}
```

## gRPC Interceptor

```go
func UnaryServerInterceptor(ctx context.Context, req interface{},
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
    tracer := otel.Tracer("grpc")
    ctx, span := tracer.Start(ctx, info.FullMethod,
        trace.WithAttributes(
            semconv.RPCSystemKey.String("grpc"),
            semconv.RPCService(info.FullMethod),
        ),
    )
    defer span.End()
    return handler(ctx, req)
}
```

## Practice
1. Set up an OpenTelemetry collector with Jaeger backend
2. Add span propagation across gRPC calls
3. Create custom span attributes per business operation
