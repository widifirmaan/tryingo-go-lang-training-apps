# Database & Deployment

> Category: Go, Programming Language | Level: Advanced | Week 13

## Learning Objectives

- Connect Go to SQL databases
- Use database/sql
- Read config from environment
- Write multi-stage Dockerfiles
- Deploy Go applications

---

## Program: Konfigurasi Aplikasi

```go
package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "log/slog"
    "net/http"
    "os"
    _ "github.com/lib/pq"
)

type Config struct {
    Port   string
    DBHost string
    DBPort string
    DBUser string
    DBPass string
    DBName string
}

func getEnv(key, fallback string) string {
    if v := os.Getenv(key); v != "" { return v }
    return fallback
}

func LoadConfig() Config {
    return Config{
        Port: getEnv("PORT", "8080"), DBHost: getEnv("DB_HOST", "localhost"),
        DBPort: getEnv("DB_PORT", "5432"), DBUser: getEnv("DB_USER", "postgres"),
        DBPass: getEnv("DB_PASS", ""), DBName: getEnv("DB_NAME", "tryngo"),
    }
}

type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email"`
}

func main() {
    slog.SetDefault(slog.New(slog.NewJSONHandler(os.Stdout, nil)))
    cfg := LoadConfig()
    slog.Info("config loaded", "port", cfg.Port, "db_host", cfg.DBHost)

    dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable",
        cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBName)
    db, err := sql.Open("postgres", dsn)
    if err != nil { slog.Warn("db unavailable", "error", err)
    } else { defer db.Close(); slog.Info("db connected") }
    _ = db

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })
    slog.Info("server starting", "port", cfg.Port)
    log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}
```

Run the program on the right to see the output. This code demonstrates all concepts for this week.

---

## Explanation

### Configuration

`getEnv` reads env vars with fallback. Standard pattern in Go production apps.

### Database

`database/sql` -- common SQL interface. `sql.Open("postgres", dsn)` for connection. `QueryRow` for single row.

### Docker

Multi-stage build: stage 1 compiles, stage 2 = binary + minimal runtime. Small images (~15MB).

---

## Experiments

Try modifying the code:

1. **Add config** -- add `LogLevel` to Config struct
2. **Change DSN** -- change host/port and see log change
3. **Add endpoint** -- add `/version` endpoint

---

## Challenge

Create Config struct (AppName, Port, LogLevel, DBHost, DBPort, DBName, DBUser, DBPass) with LoadConfig() from env vars. Add `DSN() string` method.

---

## Summary

Configuration from env vars. database/sql standard interface. Multi-stage Docker. Production pattern: env + logging + health check. Next week: advanced patterns and final project.
