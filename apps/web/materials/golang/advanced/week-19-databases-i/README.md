# Week 19: Databases I

Working with relational databases in Go using the `database/sql` package. This week covers the fundamentals of database connectivity, migrations, queries, and transactions.

## Topics

- `database/sql` package and driver architecture
- Database migrations with `golang-migrate`
- SQL queries, prepared statements, and result scanning
- Transactions and error handling

## Goals

- Connect to PostgreSQL/MySQL using `database/sql`
- Write and run database migrations
- Execute queries and scan results into structs
- Use transactions safely

## Key Concepts

| Concept | Description |
|---------|-------------|
| sql.DB | Database handle representing a connection pool |
| sql.Rows | Query result iterator |
| sql.Row | Single row result |
| PreparedStmt | Pre-compiled statement for performance and safety |
| Transaction | Group of operations with atomic commit/rollback |

## Practice Exercises

1. Connect to a PostgreSQL database and verify the connection
2. Create a migration that adds a users table
3. Write CRUD queries using prepared statements
4. Implement a transaction that creates a user with an initial profile
