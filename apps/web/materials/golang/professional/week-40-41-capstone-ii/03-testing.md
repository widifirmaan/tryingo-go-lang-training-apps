# Testing

Write comprehensive tests for your capstone project.

## Unit Tests

```go
func TestCreateOrder(t *testing.T) {
    t.Parallel()

    tests := []struct {
        name    string
        request CreateOrderRequest
        mock    func(*MockOrderRepo, *MockProductClient, *MockPaymentClient)
        wantErr bool
    }{
        {
            name: "successful order creation",
            request: CreateOrderRequest{
                UserID: "user-1",
                Items: []OrderItem{
                    {ProductID: "prod-1", Quantity: 2},
                },
            },
            mock: func(repo *MockOrderRepo, prod *MockProductClient, pay *MockPaymentClient) {
                prod.EXPECT().ValidateProducts(gomock.Any(), gomock.Any()).
                    Return([]Product{{ID: "prod-1", Price: 29.99}}, nil)
                repo.EXPECT().Create(gomock.Any(), gomock.Any()).Return(nil)
                pay.EXPECT().Process(gomock.Any(), gomock.Any()).
                    Return(&Payment{ID: "pay-1", Status: "completed"}, nil)
                repo.EXPECT().Update(gomock.Any(), gomock.Any()).Return(nil)
            },
        },
        {
            name: "product validation fails",
            request: CreateOrderRequest{
                Items: []OrderItem{{ProductID: "invalid", Quantity: 1}},
            },
            mock: func(repo *MockOrderRepo, prod *MockProductClient, pay *MockPaymentClient) {
                prod.EXPECT().ValidateProducts(gomock.Any(), gomock.Any()).
                    Return(nil, ErrProductNotFound)
            },
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            ctrl := gomock.NewController(t)
            defer ctrl.Finish()

            repo := NewMockOrderRepo(ctrl)
            prod := NewMockProductClient(ctrl)
            pay := NewMockPaymentClient(ctrl)
            bus := NewMockEventBus(ctrl)

            tt.mock(repo, prod, pay)

            svc := NewOrderService(repo, prod, pay, bus)
            _, err := svc.CreateOrder(context.Background(), tt.request)

            if (err != nil) != tt.wantErr {
                t.Errorf("CreateOrder() error = %v, wantErr %v", err, tt.wantErr)
            }
        })
    }
}
```

## Integration Tests

```go
//go:build integration

package integration

import (
    "testing"
    "github.com/testcontainers/testcontainers-go"
    "github.com/testcontainers/testcontainers-go/wait"
)

func TestOrderServiceIntegration(t *testing.T) {
    ctx := context.Background()

    postgres, err := testcontainers.GenericContainer(ctx, testcontainers.GenericContainerRequest{
        ContainerRequest: testcontainers.ContainerRequest{
            Image: "postgres:16-alpine",
            Env: map[string]string{
                "POSTGRES_DB":       "testdb",
                "POSTGRES_PASSWORD": "test",
            },
            ExposedPorts: []string{"5432/tcp"},
            WaitingFor:   wait.ForLog("database system is ready to accept connections"),
        },
        Started: true,
    })
    if err != nil {
        t.Fatal(err)
    }
    defer postgres.Terminate(ctx)

    host, _ := postgres.Host(ctx)
    port, _ := postgres.MappedPort(ctx, "5432")

    dsn := fmt.Sprintf("postgres://postgres:test@%s:%s/testdb?sslmode=disable", host, port.Port())

    db, err := sql.Open("postgres", dsn)
    if err != nil {
        t.Fatal(err)
    }
    defer db.Close()

    // Run migrations
    // Run tests
}
```

## End-to-End Tests

```go
func TestCreateOrderE2E(t *testing.T) {
    client := &http.Client{Timeout: 10 * time.Second}

    // Login
    loginResp, err := client.Post(
        "http://localhost:8080/api/v1/auth/login",
        "application/json",
        strings.NewReader(`{"email":"test@test.com","password":"password123"}`),
    )
    if err != nil {
        t.Fatal(err)
    }
    defer loginResp.Body.Close()

    var authResp AuthResponse
    json.NewDecoder(loginResp.Body).Decode(&authResp)

    // Create order
    req, _ := http.NewRequest("POST", "http://localhost:8080/api/v1/orders",
        strings.NewReader(`{"items":[{"product_id":"prod-1","quantity":1}]}`))
    req.Header.Set("Authorization", "Bearer "+authResp.Token)

    resp, err := client.Do(req)
    if err != nil {
        t.Fatal(err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusCreated {
        t.Errorf("expected 201, got %d", resp.StatusCode)
    }
}
```

## Practice
1. Write unit tests for all service methods
2. Set up integration tests with testcontainers
3. Create end-to-end API tests
