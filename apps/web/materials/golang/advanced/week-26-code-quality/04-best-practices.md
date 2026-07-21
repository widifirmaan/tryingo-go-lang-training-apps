# Best Practices

Idiomatic Go code following established conventions and patterns.

## Project Layout

```
myproject/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── handler/
│   ├── middleware/
│   ├── model/
│   └── repository/
├── pkg/
│   └── api/
├── config/
│   └── config.go
├── migrations/
├── go.mod
├── go.sum
└── Makefile
```

## Error Handling

```go
// Wrap errors with context
if err != nil {
    return fmt.Errorf("reading config: %w", err)
}

// Define sentinel errors
var ErrNotFound = errors.New("not found")
var ErrDuplicate = errors.New("duplicate entry")

// Use errors.Is and errors.As
if errors.Is(err, ErrNotFound) {
    // handle
}

var connErr *ConnectionError
if errors.As(err, &connErr) {
    // handle connection error
}
```

## Interface Design

```go
// Define interfaces in the consumer package, not the producer
type UserRepository interface {
    GetByID(ctx context.Context, id int64) (*User, error)
    Create(ctx context.Context, user *User) error
    List(ctx context.Context, filter UserFilter) ([]User, error)
}

// Accept interfaces, return structs
func NewUserService(repo UserRepository) *UserService {
    return &UserService{repo: repo}
}

// Keep interfaces small (1-3 methods)
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}
```

## Configuration

```go
type Config struct {
    Port    int           `env:"PORT" envDefault:"8080"`
    DB      DatabaseConfig
    Redis   RedisConfig
    Logging LogConfig
}

type DatabaseConfig struct {
    URL             string        `env:"DATABASE_URL,required"`
    MaxOpenConns    int           `env:"DB_MAX_OPEN" envDefault:"25"`
    MaxIdleConns    int           `env:"DB_MAX_IDLE" envDefault:"5"`
    ConnMaxLifetime time.Duration `env:"DB_CONN_MAX_LIFETIME" envDefault:"5m"`
}

// Use envconfig or viper for configuration
func LoadConfig() (*Config, error) {
    var cfg Config
    if err := envconfig.Process("", &cfg); err != nil {
        return nil, fmt.Errorf("loading config: %w", err)
    }
    return &cfg, nil
}
```

## Concurrency Best Practices

```go
// Don't leak goroutines
func Process(items []Item) error {
    ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
    defer cancel()

    results := make(chan Result, len(items))
    for _, item := range items {
        go func(item Item) {
            result, err := processItem(ctx, item)
            results <- Result{Item: item, Err: err}
        }(item)
    }

    for range items {
        select {
        case r := <-results:
            if r.Err != nil {
                return r.Err
            }
        case <-ctx.Done():
            return ctx.Err()
        }
    }
    return nil
}

// Use sync.Once for lazy initialization
var (
    pool   *sql.DB
    poolMu sync.Once
)

func GetPool() *sql.DB {
    poolMu.Do(func() {
        pool = openDB()
    })
    return pool
}
```

## Practice

1. Refactor a monolithic main.go into proper packages
2. Apply error wrapping throughout a codebase
3. Implement proper context propagation
4. Write a Makefile with common Go commands (lint, test, build, run)
