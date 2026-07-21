# Interface Design

## Principles of Good Interface Design

### 1. Keep Interfaces Small
Prefer many small interfaces over one large interface.

```go
// Good
type Reader interface { Read(p []byte) (n int, err error) }
type Writer interface { Write(p []byte) (n int, err error) }

// Less good
type ReadWriterCloser interface {
    Read(p []byte) (n int, err error)
    Write(p []byte) (n int, err error)
    Close() error
}
```

### 2. Accept Interfaces, Return Structs
Functions should accept interfaces but return concrete types.

```go
// Good
func ProcessData(r io.Reader) (*Result, error) {
    // ...
}

// Less flexible
func ProcessData(r *os.File) (*Result, error) {
    // only works with files
}
```

### 3. Define Interfaces Where They're Used
Interfaces belong to the consumer, not the producer.

```go
package store

type Storer interface {
    Get(id string) (Item, error)
    Save(item Item) error
}
```

## Common Go Interface Patterns

### The `Stringer` Interface
```go
type Stringer interface { String() string }

type User struct {
    Name string
    Age  int
}

func (u User) String() string {
    return fmt.Sprintf("%s (%d)", u.Name, u.Age)
}
```

### The `error` Interface
```go
type error interface { Error() string }
```

### Functional Options Pattern
```go
type Option func(*Server)

func WithTimeout(t time.Duration) Option {
    return func(s *Server) {
        s.timeout = t
    }
}

func WithPort(p int) Option {
    return func(s *Server) {
        s.port = p
    }
}

func NewServer(opts ...Option) *Server {
    s := &Server{port: 8080}
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

## When to Define an Interface

| Situation | Should You Define an Interface? |
|-----------|-------------------------------|
| Single implementation | No |
| Mocking for tests | Yes, if needed |
| Multiple implementations exist | Yes |
| Standard library pattern | Yes |
| Decoupling packages | Yes |

## Testing with Interfaces

```go
type Database interface {
    GetUser(id int) (User, error)
    SaveUser(u User) error
}

type mockDB struct {
    users map[int]User
}

func (m *mockDB) GetUser(id int) (User, error) {
    u, ok := m.users[id]
    if !ok { return User{}, ErrNotFound }
    return u, nil
}

func (m *mockDB) SaveUser(u User) error {
    m.users[u.ID] = u
    return nil
}
```

## Exercises

1. **Logger Interface**: Design a `Logger` interface with `Info`, `Warn`, `Error` methods. Implement `ConsoleLogger` and `FileLogger`.

2. **Cache Interface**: Create a `Cache` interface with `Get`, `Set`, `Delete`. Implement `MemoryCache` and `FileCache`.

3. **Notifier Pattern**: Build a `Notifier` interface and implement `EmailNotifier`, `SMSNotifier`, `PushNotifier`.

4. **Repository Pattern**: Design `UserRepository` and `ProductRepository` interfaces with CRUD methods.
