# gRPC Interceptors

Build middleware chains for gRPC with unary and stream interceptors.

## Unary Server Interceptor

```go
func LoggingInterceptor(ctx context.Context, req interface{},
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
    start := time.Now()
    slog.Info("gRPC request started",
        "method", info.FullMethod,
    )
    resp, err := handler(ctx, req)
    slog.Info("gRPC request completed",
        "method", info.FullMethod,
        "duration", time.Since(start),
        "error", err,
    )
    return resp, err
}
```

## Recovery Interceptor

```go
func RecoveryInterceptor(ctx context.Context, req interface{},
    info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (resp interface{}, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = status.Errorf(codes.Internal, "panic recovered: %v", r)
        }
    }()
    return handler(ctx, req)
}
```

## Auth Interceptor

```go
type AuthInterceptor struct {
    jwtManager *JWTManager
    accessibleRoles map[string][]string
}

func (interceptor *AuthInterceptor) Unary() grpc.UnaryServerInterceptor {
    return func(ctx context.Context, req interface{},
        info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
        claims, err := interceptor.authorize(ctx, info.FullMethod)
        if err != nil {
            return nil, err
        }
        ctx = context.WithValue(ctx, "claims", claims)
        return handler(ctx, req)
    }
}

func (interceptor *AuthInterceptor) authorize(ctx context.Context, method string) (*Claims, error) {
    accessibleRoles, ok := interceptor.accessibleRoles[method]
    if !ok {
        return nil, nil // public endpoint
    }
    token := extractToken(ctx)
    claims, err := interceptor.jwtManager.ValidateToken(token)
    if err != nil {
        return nil, status.Errorf(codes.Unauthenticated, "invalid token: %v", err)
    }
    for _, role := range claims.Roles {
        for _, allowed := range accessibleRoles {
            if role == allowed {
                return claims, nil
            }
        }
    }
    return nil, status.Error(codes.PermissionDenied, "insufficient permissions")
}
```

## Stream Interceptor

```go
func StreamLoggingInterceptor(srv interface{}, stream grpc.ServerStream,
    info *grpc.StreamServerInfo, handler grpc.StreamHandler) error {
    slog.Info("stream started", "method", info.FullMethod)
    err := handler(srv, stream)
    slog.Info("stream ended", "method", info.FullMethod, "error", err)
    return err
}
```

## Chaining Interceptors

```go
server := grpc.NewServer(
    grpc.ChainUnaryInterceptor(
        RecoveryInterceptor,
        LoggingInterceptor,
        authInterceptor.Unary(),
        rateLimitInterceptor.Unary(),
    ),
    grpc.ChainStreamInterceptor(
        StreamLoggingInterceptor,
        authInterceptor.Stream(),
    ),
)
```

## Practice
1. Build a rate-limiting interceptor
2. Implement request validation interceptor
3. Create a tracing interceptor that creates spans
