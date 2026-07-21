# gRPC Gateway

Generate RESTful APIs from gRPC services using grpc-gateway.

## Schema with HTTP Annotations

```protobuf
import "google/api/annotations.proto";

service OrderService {
    rpc CreateOrder(CreateOrderRequest) returns (Order) {
        option (google.api.http) = {
            post: "/api/v1/orders"
            body: "*"
        };
    }

    rpc GetOrder(GetOrderRequest) returns (Order) {
        option (google.api.http) = {
            get: "/api/v1/orders/{id}"
        };
    }

    rpc ListOrders(ListOrdersRequest) returns (ListOrdersResponse) {
        option (google.api.http) = {
            get: "/api/v1/orders"
        };
    }

    rpc UpdateOrder(UpdateOrderRequest) returns (Order) {
        option (google.api.http) = {
            put: "/api/v1/orders/{order.id}"
            body: "order"
        };
    }

    rpc DeleteOrder(DeleteOrderRequest) returns (google.protobuf.Empty) {
        option (google.api.http) = {
            delete: "/api/v1/orders/{id}"
        };
    }

    rpc StreamOrders(StreamOrdersRequest) returns (stream Order) {
        option (google.api.http) = {
            get: "/api/v1/orders/stream"
        };
    }
}
```

## Gateway Server

```go
package main

import (
    "net/http"
    "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
    "google.golang.org/grpc"
    "google.golang.org/grpc/credentials/insecure"
    pb "github.com/example/pb"
)

func main() {
    ctx := context.Background()
    mux := runtime.NewServeMux(
        runtime.WithIncomingHeaderMatcher(customHeaderMatcher),
        runtime.WithErrorHandler(runtime.DefaultHTTPErrorHandler),
    )

    opts := []grpc.DialOption{
        grpc.WithTransportCredentials(insecure.NewCredentials()),
    }

    err := pb.RegisterOrderServiceHandlerFromEndpoint(
        ctx, mux, "localhost:50051", opts,
    )
    if err != nil {
        log.Fatal(err)
    }

    http.ListenAndServe(":8080", mux)
}
```

## Custom Options

```go
func customHeaderMatcher(key string) (string, bool) {
    switch key {
    case "X-Request-Id":
        return "x-request-id", true
    case "Authorization":
        return "authorization", true
    default:
        return runtime.DefaultHeaderMatcher(key)
    }
}
```

## Practice
1. Generate REST endpoints from proto files
2. Set up grpc-gateway with Swagger output
3. Add custom header and error handling
