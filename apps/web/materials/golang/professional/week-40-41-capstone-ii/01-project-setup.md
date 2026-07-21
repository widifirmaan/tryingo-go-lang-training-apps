# Project Setup

Set up a production-grade Go project structure.

## Directory Layout

```
myapp/
├── cmd/
│   ├── server/
│   │   └── main.go
│   └── migrate/
│       └── main.go
├── internal/
│   ├── config/
│   ├── database/
│   ├── handler/
│   ├── middleware/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── server/
├── pkg/
│   ├── api/
│   ├── auth/
│   └── validator/
├── proto/
├── migrations/
├── deploy/
├── docs/
├── scripts/
├── .github/
│   └── workflows/
├── go.mod
├── go.sum
├── Makefile
├── Dockerfile
├── docker-compose.yml
└── .goreleaser.yml
```

## Makefile

```makefile
.PHONY: build test lint run migrate proto

APP_NAME = myapp
BUILD_DIR = ./build

build:
	go build -o $(BUILD_DIR)/$(APP_NAME) ./cmd/server

test:
	go test ./... -race -coverprofile=coverage.out

lint:
	golangci-lint run ./...

run:
	go run ./cmd/server

migrate-up:
	go run ./cmd/migrate up

migrate-down:
	go run ./cmd/migrate down

proto:
	protoc --go_out=. --go-grpc_out=. proto/*.proto

docker-build:
	docker build -t $(APP_NAME):latest .

docker-run:
	docker-compose up -d
```

## Wire Dependency Injection

```go
//go:build wireinject
// +build wireinject

package main

import (
    "github.com/google/wire"
    "myapp/internal/config"
    "myapp/internal/database"
    "myapp/internal/handler"
    "myapp/internal/repository"
    "myapp/internal/service"
)

func InitializeApplication() (*App, error) {
    wire.Build(
        config.Load,
        database.NewPostgres,
        database.NewRedis,
        repository.NewUserRepository,
        repository.NewOrderRepository,
        service.NewUserService,
        service.NewOrderService,
        handler.NewUserHandler,
        handler.NewOrderHandler,
        NewRouter,
        NewApp,
    )
    return nil, nil
}
```

## Practice
1. Set up the complete project structure
2. Configure Wire for dependency injection
3. Create development scripts
