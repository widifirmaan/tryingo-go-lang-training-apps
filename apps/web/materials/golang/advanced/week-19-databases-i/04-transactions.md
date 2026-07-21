# Transactions

Transactions ensure data integrity by grouping operations into atomic units.

## Basic Transaction

```go
func TransferFunds(db *sql.DB, fromID, toID int64, amount float64) error {
    tx, err := db.Begin()
    if err != nil {
        return fmt.Errorf("failed to begin transaction: %w", err)
    }
    defer tx.Rollback() // safe to call after Commit()

    _, err = tx.Exec("UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, fromID)
    if err != nil {
        return err
    }

    _, err = tx.Exec("UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, toID)
    if err != nil {
        return err
    }

    return tx.Commit()
}
```

## Transaction Isolation

```go
func WithTransaction(db *sql.DB, fn func(*sql.Tx) error) error {
    tx, err := db.BeginTx(context.Background(), &sql.TxOptions{
        Isolation: sql.LevelReadCommitted,
        ReadOnly:  false,
    })
    if err != nil {
        return err
    }

    if err := fn(tx); err != nil {
        tx.Rollback()
        return err
    }

    return tx.Commit()
}
```

## Nested Transactions

```go
func CreateUserWithProfile(db *sql.DB, user User, profile Profile) error {
    return WithTransaction(db, func(tx *sql.Tx) error {
        var userID int64
        err := tx.QueryRow(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id",
            user.Name, user.Email,
        ).Scan(&userID)
        if err != nil {
            return err
        }

        _, err = tx.Exec(
            "INSERT INTO profiles (user_id, bio, avatar_url) VALUES ($1, $2, $3)",
            userID, profile.Bio, profile.AvatarURL,
        )
        return err
    })
}
```

## Context-Aware Transactions

```go
func CreateOrder(ctx context.Context, db *sql.DB, order Order, items []OrderItem) error {
    tx, err := db.BeginTx(ctx, &sql.TxOptions{Isolation: sql.LevelSerializable})
    if err != nil {
        return err
    }
    defer tx.Rollback()

    var orderID int64
    err = tx.QueryRowContext(ctx,
        "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING id",
        order.UserID, order.Total,
    ).Scan(&orderID)
    if err != nil {
        return err
    }

    for _, item := range items {
        _, err = tx.ExecContext(ctx,
            "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)",
            orderID, item.ProductID, item.Quantity, item.Price,
        )
        if err != nil {
            return err
        }
    }

    return tx.Commit()
}
```

## Practice

1. Implement a banking transaction with rollback on failure
2. Use `BeginTx` with different isolation levels
3. Create a transaction helper that retries on serialization failures
4. Handle deadlock detection and retry logic
