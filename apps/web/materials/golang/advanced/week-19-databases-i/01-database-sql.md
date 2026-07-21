# Database/SQL

The `database/sql` package provides a generic interface for SQL databases.

## Opening a Connection

```go
import (
    "database/sql"
    _ "github.com/lib/pq"
)

func main() {
    dsn := "host=localhost port=5432 user=app password=secret dbname=mydb sslmode=disable"
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        panic(err)
    }
    defer db.Close()

    // Verify connection
    if err := db.Ping(); err != nil {
        panic(err)
    }

    // Configure connection pool
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(5)
    db.SetConnMaxLifetime(5 * time.Minute)
    db.SetConnMaxIdleTime(1 * time.Minute)
}
```

## Connection Pool Configuration

```go
type DBConfig struct {
    DSN              string
    MaxOpenConns     int
    MaxIdleConns     int
    ConnMaxLifetime  time.Duration
    ConnMaxIdleTime  time.Duration
}

func NewDB(config DBConfig) (*sql.DB, error) {
    db, err := sql.Open("postgres", config.DSN)
    if err != nil {
        return nil, fmt.Errorf("failed to open db: %w", err)
    }

    db.SetMaxOpenConns(config.MaxOpenConns)
    db.SetMaxIdleConns(config.MaxIdleConns)
    db.SetConnMaxLifetime(config.ConnMaxLifetime)
    db.SetConnMaxIdleTime(config.ConnMaxIdleTime)

    if err := db.Ping(); err != nil {
        return nil, fmt.Errorf("failed to ping db: %w", err)
    }

    return db, nil
}
```

## Practice

1. Connect to a SQLite database using `github.com/mattn/go-sqlite3`
2. Configure a connection pool for a high-traffic application
3. Write a health check function that pings the database
4. Handle different driver registration patterns
