# Migrations

Database migrations help version-control your schema changes.

## Using golang-migrate

```go
import (
    "github.com/golang-migrate/migrate/v4"
    _ "github.com/golang-migrate/migrate/v4/database/postgres"
    _ "github.com/golang-migrate/migrate/v4/source/file"
)

func runMigrations(databaseURL, migrationsPath string) error {
    m, err := migrate.New(
        "file://"+migrationsPath,
        databaseURL,
    )
    if err != nil {
        return fmt.Errorf("failed to create migrator: %w", err)
    }
    defer m.Close()

    if err := m.Up(); err != nil && err != migrate.ErrNoChange {
        return fmt.Errorf("migration failed: %w", err)
    }
    return nil
}
```

## Migration Files

```sql
-- 000001_create_users_table.up.sql
CREATE TABLE users (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    email       VARCHAR(255) UNIQUE NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW(),
    updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 000001_create_users_table.down.sql
DROP TABLE IF EXISTS users;
```

## Programmatic Migrations

```go
func CreateUsersTable(db *sql.DB) error {
    query := `
    CREATE TABLE IF NOT EXISTS users (
        id      BIGSERIAL PRIMARY KEY,
        name    VARCHAR(255) NOT NULL,
        email   VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
    );`
    _, err := db.Exec(query)
    return err
}
```

## Migration Best Practices

```go
func Migrate(db *sql.DB) error {
    migrations := []struct {
        name string
        up   string
        down string
    }{
        {
            name: "create_users",
            up:   `CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT)`,
            down: `DROP TABLE IF EXISTS users`,
        },
        {
            name: "add_email",
            up:   `ALTER TABLE users ADD COLUMN email TEXT`,
            down: `ALTER TABLE users DROP COLUMN email`,
        },
    }

    for _, m := range migrations {
        // Check if already applied
        var exists bool
        err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM migrations WHERE name=$1)", m.name).Scan(&exists)
        if err != nil {
            return err
        }
        if exists {
            continue
        }

        tx, err := db.Begin()
        if err != nil {
            return err
        }

        if _, err := tx.Exec(m.up); err != nil {
            tx.Rollback()
            return err
        }

        if _, err := tx.Exec("INSERT INTO migrations (name) VALUES ($1)", m.name); err != nil {
            tx.Rollback()
            return err
        }

        if err := tx.Commit(); err != nil {
            return err
        }
    }
    return nil
}
```

## Practice

1. Write up/down migrations for a comments table
2. Implement a migration tracking table
3. Create a migration that adds indexes
4. Write a migration that backfills data
