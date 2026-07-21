# Integration Tests

Integration tests verify that components work together correctly.

## Test Setup

```go
package postgres_test

import (
    "database/sql"
    "os"
    "testing"

    _ "github.com/lib/pq"
)

var testDB *sql.DB

func TestMain(m *testing.M) {
    var err error
    testDB, err = sql.Open("postgres", getTestDSN())
    if err != nil {
        panic(err)
    }
    defer testDB.Close()

    // Run migrations
    runMigrations(testDB)

    code := m.Run()
    os.Exit(code)
}

func getTestDSN() string {
    dsn := os.Getenv("TEST_DATABASE_URL")
    if dsn == "" {
        dsn = "host=localhost port=5432 user=test dbname=test password=test sslmode=disable"
    }
    return dsn
}
```

## Integration Test Example

```go
func TestCreateUser(t *testing.T) {
    // Clean database before test
    testDB.Exec("TRUNCATE TABLE users CASCADE")

    store := NewUserStore(testDB)
    user, err := store.Create("test@example.com", "Test User")
    if err != nil {
        t.Fatalf("failed to create user: %v", err)
    }

    if user.ID == 0 {
        t.Error("expected user ID to be set")
    }
    if user.Email != "test@example.com" {
        t.Errorf("expected email 'test@example.com', got '%s'", user.Email)
    }
}
```

## Test Helpers

```go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper()
    db, err := sql.Open("postgres", getTestDSN())
    if err != nil {
        t.Fatalf("failed to connect: %v", err)
    }
    t.Cleanup(func() { db.Close() })
    return db
}

func truncateTables(t *testing.T, db *sql.DB, tables ...string) {
    t.Helper()
    for _, table := range tables {
        _, err := db.Exec("TRUNCATE TABLE " + table + " CASCADE")
        if err != nil {
            t.Fatalf("failed to truncate %s: %v", table, err)
        }
    }
}

func TestGetUser(t *testing.T) {
    db := setupTestDB(t)
    truncateTables(t, db, "users")

    // Seed data
    _, err := db.Exec("INSERT INTO users (name, email) VALUES ($1, $2)", "John", "john@test.com")
    if err != nil {
        t.Fatal(err)
    }

    store := NewUserStore(db)
    user, err := store.GetByEmail("john@test.com")
    if err != nil {
        t.Fatalf("failed to get user: %v", err)
    }
    if user.Name != "John" {
        t.Errorf("expected 'John', got '%s'", user.Name)
    }
}
```

## Practice

1. Write integration tests for all CRUD operations
2. Test transaction rollback scenarios
3. Create a test fixture helper for seeding data
4. Write parallel integration tests with shared database
