# sync.Once

## What is sync.Once?
`sync.Once` ensures a function is executed exactly once, even across multiple goroutines.

```go
import "sync"

var (
    once     sync.Once
    config   *Config
)

func GetConfig() *Config {
    once.Do(func() {
        fmt.Println("Initializing config...")
        config = loadConfig()
    })
    return config
}
```

## Singleton Pattern

```go
type Database struct {
    conn string
}

var (
    instance *Database
    once     sync.Once
)

func GetDatabase() *Database {
    once.Do(func() {
        fmt.Println("Creating database connection")
        instance = &Database{conn: "postgres://localhost:5432/db"}
    })
    return instance
}

func main() {
    go GetDatabase()
    go GetDatabase()
    go GetDatabase()
    // "Creating database connection" prints only once
}
```

## Lazy Initialization

```go
type Logger struct {
    level int
}

var (
    logger   *Logger
    initOnce sync.Once
)

func Log(level int, msg string) {
    logger := getLogger()
    if level >= logger.level {
        fmt.Printf("[%d] %s\n", level, msg)
    }
}

func getLogger() *Logger {
    initOnce.Do(func() {
        logger = &Logger{level: parseLogLevel()}
    })
    return logger
}
```

## Once with Reset (sync.OnceValue)

Go 1.21 introduced `sync.OnceValue` and related functions.

```go
import "sync"

var getConfigOnce = sync.OnceValue(func() *Config {
    return loadConfig()
})

func main() {
    cfg1 := getConfigOnce()
    cfg2 := getConfigOnce()
    fmt.Println(cfg1 == cfg2) // true
}
```

## OnceFunc, OnceValue, OnceValues (Go 1.21+)

```go
// OnceFunc — returns a function that calls fn once
greet := sync.OnceFunc(func() {
    fmt.Println("Hello!")
})

greet() // Hello!
greet() // noop

// OnceValue — returns a function that calls fn once and returns its value
getConfig := sync.OnceValue(func() int {
    return loadExpensiveConfig()
})

// OnceValues — similar but returns two values
getPair := sync.OnceValues(func() (int, error) {
    return 42, nil
})
```

## Comparison

| Function | Returns | Go Version |
|----------|---------|------------|
| `sync.Once.Do` | nothing | 1.0+ |
| `sync.OnceFunc` | `func()` | 1.21+ |
| `sync.OnceValue` | `func() T` | 1.21+ |
| `sync.OnceValues` | `func() (T1, T2)` | 1.21+ |

## Exercises

1. **Singleton Config**: Implement a configuration manager that loads once and caches.

2. **Lazy Connection**: Create a database connection pool that initializes on first use.

3. **One-Time Migration**: Use `sync.Once` to ensure a database migration runs only once at startup.

4. **Feature Flag**: Build a feature flag system that computes its value once per program run.
