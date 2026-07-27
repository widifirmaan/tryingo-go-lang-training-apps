# Database & Deployment

> Kategori: Go, Bahasa Pemrograman | Level: Lanjutan | Week 13

## Tujuan Pembelajaran

- Menghubungkan Go ke database SQL
- Menggunakan database/sql
- Membaca konfigurasi dari environment
- Menulis Dockerfile multi-stage
- Men-deploy aplikasi Go

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
    slog.Info("configuration loaded", "port", cfg.Port, "db_host", cfg.DBHost)

    dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable",
        cfg.DBHost, cfg.DBPort, cfg.DBUser, cfg.DBName)
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        slog.Warn("database not available in playground", "error", err)
    } else {
        defer db.Close()
        slog.Info("database connection established")
    }
    _ = db

    http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
        json.NewEncoder(w).Encode(map[string]string{"status": "ok"})
    })
    slog.Info("server starting", "port", cfg.Port)
    log.Fatal(http.ListenAndServe(":"+cfg.Port, nil))
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Konfigurasi

`getEnv` membaca environment variable dengan fallback. Pola standar aplikasi Go production.

### Database

`database/sql` -- interface umum SQL. `sql.Open("postgres", dsn)` untuk koneksi. `QueryRow` untuk single row.

### Docker

Multi-stage build: stage 1 kompilasi, stage 2 hanya binary + runtime minimal. Hasil: image kecil (~15MB).

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah konfigurasi** -- tambahkan `LogLevel` ke Config
2. **Ubah DSN** -- ganti host/port dan lihat log berubah
3. **Tambah endpoint** -- tambahkan `/version`

---

## Tantangan

Buat Config struct (AppName, Port, LogLevel, DBHost, DBPort, DBName, DBUser, DBPass) dengan LoadConfig() dari env vars. Tambahkan method `DSN() string`.

---

## Ringkasan

Konfigurasi dari env var. database/sql interface standar. Docker multi-stage. Pola production: env + logging + health check. Minggu depan: advanced patterns dan final project.
