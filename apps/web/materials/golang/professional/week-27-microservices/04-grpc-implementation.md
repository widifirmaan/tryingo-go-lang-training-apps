# gRPC Implementation

Deep dive into production-ready gRPC services with error handling, timeouts, and TLS.

## Production Server

```go
func NewGRPCServer(port int, opts ...grpc.ServerOption) (*grpc.Server, net.Listener, error) {
    creds, err := credentials.NewServerTLSFromFile("cert.pem", "key.pem")
    if err != nil {
        return nil, nil, err
    }
    srv := grpc.NewServer(
        append(opts,
            grpc.Creds(creds),
            grpc.UnaryInterceptor(LoggingInterceptor),
            grpc.StreamInterceptor(StreamLoggingInterceptor),
            grpc.MaxRecvMsgSize(4*1024*1024),
            grpc.MaxSendMsgSize(4*1024*1024),
        )...,
    )
    lis, err := net.Listen("tcp", fmt.Sprintf(":%d", port))
    if err != nil {
        return nil, nil, err
    }
    return srv, lis, nil
}
```

## Error Handling

```go
func handleOrderError(err error) error {
    switch {
    case errors.Is(err, ErrNotFound):
        return status.Error(codes.NotFound, err.Error())
    case errors.Is(err, ErrInvalidInput):
        return status.Error(codes.InvalidArgument, err.Error())
    case errors.Is(err, ErrForbidden):
        return status.Error(codes.PermissionDenied, err.Error())
    default:
        return status.Error(codes.Internal, "internal error")
    }
}
```

## Middleware via Interceptors

```go
func LoggingInterceptor(ctx context.Context, req interface{},
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
    start := time.Now()
    log.Printf("gRPC call: %s", info.FullMethod)
    resp, err := handler(ctx, req)
    duration := time.Since(start)
    if err != nil {
        log.Printf("gRPC error: %s - %v (duration: %v)", info.FullMethod, err, duration)
    } else {
        log.Printf("gRPC success: %s (duration: %v)", info.FullMethod, duration)
    }
    return resp, err
}
```

## Client with Retry and Timeout

```go
type Client struct {
    conn   *grpc.ClientConn
    client orderpb.OrderServiceClient
}

func NewClient(address string) (*Client, error) {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()
    conn, err := grpc.DialContext(ctx, address,
        grpc.WithTransportCredentials(insecure.NewCredentials()),
        grpc.WithUnaryInterceptor(RetryInterceptor(3)),
        grpc.WithDefaultCallOptions(grpc.MaxCallRecvMsgSize(4*1024*1024)),
    )
    if err != nil {
        return nil, err
    }
    return &Client{conn: conn, client: orderpb.NewOrderServiceClient(conn)}, nil
}

func RetryInterceptor(maxRetries int) grpc.UnaryClientInterceptor {
    return func(ctx context.Context, method string, req, reply interface{},
        cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
        var err error
        for i := 0; i < maxRetries; i++ {
            err = invoker(ctx, method, req, reply, cc, opts...)
            if err == nil {
                return nil
            }
            if !isRetryable(err) {
                return err
            }
            backoff := time.Duration(math.Pow(2, float64(i))) * 100 * time.Millisecond
            select {
            case <-time.After(backoff):
            case <-ctx.Done():
                return ctx.Err()
            }
        }
        return err
    }
}
```

## Health Checking

```go
import "google.golang.org/grpc/health/grpc_health_v1"

type HealthServer struct {
    grpc_health_v1.UnimplementedHealthServer
}

func (s *HealthServer) Check(ctx context.Context, req *grpc_health_v1.HealthCheckRequest) (*grpc_health_v1.HealthCheckResponse, error) {
    return &grpc_health_v1.HealthCheckResponse{
        Status: grpc_health_v1.HealthCheckResponse_SERVING,
    }, nil
}
```

## Practice
1. Add TLS encryption to a gRPC service
2. Implement a rate limit interceptor
3. Build a client that handles connection failures gracefully
