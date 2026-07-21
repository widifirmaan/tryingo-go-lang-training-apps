# gRPC Reflection

Enable runtime service discovery and debugging with gRPC reflection.

## Enabling Reflection

```go
import "google.golang.org/grpc/reflection"

func main() {
    s := grpc.NewServer()
    pb.RegisterMyServiceServer(s, &myServer{})

    // Enable reflection
    reflection.Register(s)

    lis, _ := net.Listen("tcp", ":50051")
    s.Serve(lis)
}
```

## Using grpcurl

```bash
# List services
grpcurl -plaintext localhost:50051 list

# Describe service
grpcurl -plaintext localhost:50051 describe MyService

# Describe method
grpcurl -plaintext localhost:50051 describe MyService.CreateOrder

# Call method
grpcurl -plaintext -d '{"user_id": "123"}' localhost:50051 MyService.GetUser

# Stream
grpcurl -plaintext -d '{}' localhost:50051 MyService.ListOrders
```

## Programmatic Reflection Client

```go
import (
    "google.golang.org/grpc/reflection/grpc_reflection_v1alpha"
    "google.golang.org/protobuf/reflect/protodesc"
)

type ReflectionClient struct {
    client grpc_reflection_v1alpha.ServerReflectionClient
}

func NewReflectionClient(conn *grpc.ClientConn) *ReflectionClient {
    return &ReflectionClient{
        client: grpc_reflection_v1alpha.NewServerReflectionClient(conn),
    }
}

func (r *ReflectionClient) ListServices() ([]string, error) {
    req := &grpc_reflection_v1alpha.ServerReflectionRequest{
        MessageRequest: &grpc_reflection_v1alpha.ServerReflectionRequest_ListServices{},
    }
    resp, err := r.client.ServerReflectionInfo(context.Background())
    if err != nil {
        return nil, err
    }
    if err := resp.Send(req); err != nil {
        return nil, err
    }
    result, err := resp.Recv()
    if err != nil {
        return nil, err
    }
    var services []string
    for _, svc := range result.GetListServicesResponse().Service {
        services = append(services, svc.Name)
    }
    return services, nil
}
```

## Dynamic gRPC Client

```go
func dynamicCall(conn *grpc.ClientConn, service, method string, request json.RawMessage) (json.RawMessage, error) {
    refClient := NewReflectionClient(conn)
    fd, err := refClient.GetFileDescriptor(service)
    if err != nil {
        return nil, err
    }
    fileDesc, err := protodesc.NewFile(fd, nil)
    if err != nil {
        return nil, err
    }
    svcDesc := fileDesc.Services().ByName(protoreflect.Name(service))
    methodDesc := svcDesc.Methods().ByName(protoreflect.Name(method))
    inputType := methodDesc.Input()
    input := inputType.New().Interface()
    jsonpb.Unmarshal(request, input)
    output := methodDesc.New().Interface()
    err = conn.Invoke(ctx, fmt.Sprintf("/%s/%s", service, method), input, output)
    if err != nil {
        return nil, err
    }
    return jsonpb.Marshal(output)
}
```

## Practice
1. Set up grpcurl for production debugging
2. Build a gRPC API explorer tool
3. Implement health checking with server reflection
