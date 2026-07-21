# Raw SQL

Using raw SQL queries when the ORM isn't the right tool.

## Executing Raw Queries

```go
type User struct {
    ID    uint
    Name  string
    Email string
}

// Raw query with scanning
var user User
db.Raw("SELECT id, name, email FROM users WHERE id = ?", 1).Scan(&user)

// Raw query with multiple results
var users []User
db.Raw("SELECT * FROM users WHERE age > ? AND active = ?", 18, true).Scan(&users)
```

## Exec with Raw SQL

```go
// For INSERT, UPDATE, DELETE
result := db.Exec("UPDATE users SET active = ? WHERE age < ?", false, 18)
fmt.Println(result.RowsAffected)

// Bulk insert
db.Exec("INSERT INTO users (name, email) VALUES ($1, $2), ($3, $4)", "A", "a@x.com", "B", "b@x.com")
```

## Named Arguments

```go
var user User
db.Where("name = @name AND age > @age", sql.Named("name", "John"), sql.Named("age", 25)).Find(&user)

// Named arguments with map
db.Where("name = @name AND age > @age", map[string]interface{}{
    "name": "John",
    "age":  25,
}).Find(&user)
```

## Raw SQL with Named Args

```go
type User struct {
    ID    uint
    Name  string
    Email string
}

var user User
db.Raw(
    "SELECT id, name, email FROM users WHERE name = @name AND email = @email",
    sql.Named("name", "John"),
    sql.Named("email", "john@example.com"),
).Scan(&user)
```

## Using sql.Row with GORM

```go
type ReportRow struct {
    UserName string
    PostCount int
}

rows, err := db.Raw(`
    SELECT u.name as user_name, COUNT(p.id) as post_count
    FROM users u
    LEFT JOIN posts p ON p.user_id = u.id
    GROUP BY u.id, u.name
    HAVING COUNT(p.id) > ?
`, 5).Rows()
if err != nil {
    return err
}
defer rows.Close()

var reports []ReportRow
for rows.Next() {
    var r ReportRow
    rows.Scan(&r.UserName, &r.PostCount)
    reports = append(reports, r)
}
```

## Practice

1. Write a complex reporting query using raw SQL
2. Mix raw SQL with GORM scopes
3. Implement a bulk upsert using raw SQL
4. Use database-specific features (e.g., PostgreSQL JSON queries)
