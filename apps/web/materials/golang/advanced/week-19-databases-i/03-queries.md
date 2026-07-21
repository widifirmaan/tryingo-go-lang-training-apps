# Queries

Executing SQL queries and scanning results into Go structs.

## Basic Queries

```go
type User struct {
    ID        int64     `json:"id"`
    Name      string    `json:"name"`
    Email     string    `json:"email"`
    CreatedAt time.Time `json:"created_at"`
}

func GetUser(db *sql.DB, id int64) (*User, error) {
    var u User
    err := db.QueryRow(
        "SELECT id, name, email, created_at FROM users WHERE id = $1", id,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)
    if err == sql.ErrNoRows {
        return nil, nil
    }
    if err != nil {
        return nil, fmt.Errorf("failed to get user: %w", err)
    }
    return &u, nil
}
```

## Prepared Statements

```go
type UserStore struct {
    db          *sql.DB
    stmtGetByID *sql.Stmt
    stmtInsert  *sql.Stmt
}

func NewUserStore(db *sql.DB) (*UserStore, error) {
    stmts := &UserStore{db: db}
    var err error

    stmts.stmtGetByID, err = db.Prepare("SELECT id, name, email, created_at FROM users WHERE id = $1")
    if err != nil {
        return nil, err
    }

    stmts.stmtInsert, err = db.Prepare("INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, created_at")
    if err != nil {
        return nil, err
    }

    return stmts, nil
}

func (s *UserStore) Create(name, email string) (*User, error) {
    var u User
    u.Name = name
    u.Email = email
    err := s.stmtInsert.QueryRow(name, email).Scan(&u.ID, &u.CreatedAt)
    if err != nil {
        return nil, fmt.Errorf("failed to create user: %w", err)
    }
    return &u, nil
}

func (s *UserStore) GetByID(id int64) (*User, error) {
    var u User
    err := s.stmtGetByID.QueryRow(id).Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)
    if err == sql.ErrNoRows {
        return nil, nil
    }
    if err != nil {
        return nil, err
    }
    return &u, nil
}
```

## Scanning into Structs

```go
func scanUser(scanner interface {
    Scan(dest ...interface{}) error
}) (*User, error) {
    var u User
    err := scanner.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)
    return &u, err
}

func GetUsers(db *sql.DB) ([]User, error) {
    rows, err := db.Query("SELECT id, name, email, created_at FROM users ORDER BY created_at DESC")
    if err != nil {
        return nil, err
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt); err != nil {
            return nil, err
        }
        users = append(users, u)
    }
    if err := rows.Err(); err != nil {
        return nil, err
    }
    return users, nil
}
```

## Handling NULL Values

```go
type User struct {
    ID        int64
    Name      string
    Email     string
    Phone     sql.NullString
    Age       sql.NullInt64
    UpdatedAt sql.NullTime
}

func GetUser(db *sql.DB, id int64) (*User, error) {
    var u User
    err := db.QueryRow(
        "SELECT id, name, email, phone, age, updated_at FROM users WHERE id = $1", id,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.Phone, &u.Age, &u.UpdatedAt)
    if err != nil {
        return nil, err
    }
    return &u, nil
}
```

## Practice

1. Write a paginated query with LIMIT and OFFSET
2. Implement batch insert using a prepared statement
3. Use `sql.Null*` types for nullable columns
4. Write a search query with multiple filter conditions
