# gRPC Introduction

Learn gRPC fundamentals: Protocol Buffers, service definitions, and Go code generation.

## Protocol Buffer Definition

```protobuf
syntax = "proto3";

package order;

option go_package = "github.com/example/orderpb";

message OrderRequest {
    string order_id = 1;
    string customer_id = 2;
    repeated Item items = 3;
}

message Item {
    string product_id = 1;
    int32 quantity = 2;
    double price = 3;
}

message OrderResponse {
    string order_id = 1;
    string status = 2;
    double total = 3;
}

service OrderService {
    rpc CreateOrder(OrderRequest) returns (OrderResponse);
    rpc GetOrder(GetOrderRequest) returns (OrderResponse);
    rpc ListOrders(ListOrdersRequest) returns (stream OrderResponse);
}
```

## Generating Go Code

```bash
protoc --go_out=. --go-grpc_out=. proto/order.proto
```

## Server Implementation

```go
type orderServer struct {
    orderpb.UnimplementedOrderServiceServer
    repo OrderRepository
}

func (s *orderServer) CreateOrder(ctx context.Context, req *orderpb.OrderRequest) (*orderpb.OrderResponse, error) {
    order := &Order{
        ID:         uuid.New().String(),
        CustomerID: req.CustomerId,
    }
    for _, item := range req.Items {
        order.Items = append(order.Items, Item{
            ProductID: item.ProductId,
            Quantity:  int(item.Quantity),
            Price:     item.Price,
        })
    }
    if err := s.repo.Save(ctx, order); err != nil {
        return nil, status.Errorf(codes.Internal, "save failed: %v", err)
    }
    return &orderpb.OrderResponse{
        OrderId: order.ID,
        Status:  "created",
        Total:   order.Total(),
    }, nil
}
```

## Client Implementation

```go
func main() {
    conn, err := grpc.Dial("localhost:50051", grpc.WithInsecure())
    if err != nil {
        log.Fatal(err)
    }
    defer conn.Close()

    client := orderpb.NewOrderServiceClient(conn)
    resp, err := client.CreateOrder(context.Background(), &orderpb.OrderRequest{
        CustomerId: "cust-123",
        Items: []*orderpb.Item{
            {ProductId: "prod-1", Quantity: 2, Price: 29.99},
        },
    })
    if err != nil {
        log.Fatal(err)
    }
    log.Printf("Order created: %s (status: %s)", resp.OrderId, resp.Status)
}
```

## Practice
1. Define a proto file for a user service
2. Generate Go code from proto definitions
3. Implement both server and client stubs
