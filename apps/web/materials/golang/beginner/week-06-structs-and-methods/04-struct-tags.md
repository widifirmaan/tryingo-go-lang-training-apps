# Struct Tags

Struct tags are **metadata** attached to struct fields. They are string literals that follow the field type and are used by reflection-based packages like `encoding/json`, `encoding/xml`, and validation libraries.

## Basic Syntax

```go
type User struct {
    ID    int    `json:"id"`
    Name  string `json:"name"`
    Email string `json:"email,omitempty"`
}
```

Tags are written as raw string literals (backticks) after the field type. The format is typically `key:"value"` pairs separated by spaces.

## JSON Tags

The `encoding/json` package reads struct tags to control JSON serialization.

```go
type Product struct {
    ID       int     `json:"id"`
    Name     string  `json:"name"`
    Price    float64 `json:"price,omitempty"`
    Internal bool    `json:"-"` // always excluded
    secret   string  // unexported, always excluded
}
```

### JSON Tag Options

| Option | Example | Effect |
|--------|---------|--------|
| Rename | `json:"product_id"` | Uses custom name instead of field name |
| Omitempty | `json:"name,omitempty"` | Omits field if it's the zero value |
| Skip | `json:"-"` | Always excludes field from JSON |
| String | `json:"id,string"` | Forces field to string in JSON |

### Marshal (Go → JSON)

```go
p := Product{
    ID:    1,
    Name:  "Laptop",
    Price: 999.99,
}

data, err := json.Marshal(p)
if err != nil {
    log.Fatal(err)
}
fmt.Println(string(data))
// {"id":1,"name":"Laptop","price":999.99}
```

### MarshalIndent (Pretty Print)

```go
data, _ := json.MarshalIndent(p, "", "  ")
fmt.Println(string(data))
```

### Unmarshal (JSON → Go)

```go
jsonData := `{"id":2,"name":"Mouse","price":29.99}`
var p Product
err := json.Unmarshal([]byte(jsonData), &p)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("%+v\n", p)
// {ID:2 Name:Mouse Price:29.99 Internal:false secret:}
```

## Omitempty in Action

```go
type Config struct {
    Host string `json:"host"`
    Port int    `json:"port,omitempty"`
}

c1 := Config{Host: "localhost"}
data, _ := json.Marshal(c1)
fmt.Println(string(data)) // {"host":"localhost"} — port omitted

c2 := Config{Host: "localhost", Port: 8080}
data, _ = json.Marshal(c2)
fmt.Println(string(data)) // {"host":"localhost","port":8080}
```

## Unexported Fields

Unexported fields (lowercase) are **not** marshaled/unmarshaled:

```go
type User struct {
    Name   string `json:"name"`
    apiKey string // not exported — excluded from JSON
}
```

## Multiple Tags

Separate multiple tag keys with a space:

```go
type Item struct {
    ID    int    `json:"id" xml:"id" yaml:"id"`
    Value string `json:"value" xml:"value" yaml:"value"`
}
```

## XML Tags

```go
type Book struct {
    Title  string `xml:"title"`
    Author string `xml:"author"`
    Pages  int    `xml:"pages,attr"` // as attribute
}
```

## Custom Tags (Validation)

```go
type Registration struct {
    Email    string `json:"email" validate:"required,email"`
    Age      int    `json:"age" validate:"gte=18,lte=120"`
    Username string `json:"username" validate:"required,min=3,max=20"`
}
```

Libraries like `go-playground/validator` read these tags.

## Reading Struct Tags with Reflection

```go
import (
    "fmt"
    "reflect"
)

type User struct {
    Name  string `json:"name" validate:"required"`
    Email string `json:"email,omitempty"`
}

func main() {
    t := reflect.TypeOf(User{})
    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        fmt.Printf("Field: %s\n", field.Name)
        fmt.Printf("  json tag: %s\n", field.Tag.Get("json"))
        fmt.Printf("  validate tag: %s\n", field.Tag.Get("validate"))
    }
}

// Output:
// Field: Name
//   json tag: name
//   validate tag: required
// Field: Email
//   json tag: email,omitempty
//   validate tag:
```

## Common Tag Keys

| Tag Key | Package | Purpose |
|---------|---------|---------|
| `json` | `encoding/json` | JSON serialization control |
| `xml` | `encoding/xml` | XML serialization control |
| `yaml` | `gopkg.in/yaml.v3` | YAML serialization |
| `validate` | `go-playground/validator` | Field validation rules |
| `form` | Various | HTML form parsing |
| `db` | `database/sql`, ORMs | Database column mapping |
| `bson` | `go.mongodb.org/mongo-driver` | MongoDB document mapping |
| `gorm` | `gorm.io/gorm` | GORM ORM column config |
| `protobuf` | `google.golang.org/protobuf` | Protobuf field mapping |

## Common Mistakes

```go
// ❌ Wrong: using double quotes instead of backticks
type User struct {
    Name string "json:\"name\"" // error-prone, not standard
}

// ✅ Correct: backticks
type User struct {
    Name string `json:"name"`
}

// ❌ Wrong: comma in wrong position
type User struct {
    Name string `json:"name,omitempty"` // ✅ comma after tag name
}

// ❌ Wrong: omitempty on required fields (can lose data)
type User struct {
    ID int `json:"id,omitempty"` // ID=0 gets omitted, may be unexpected
}
```

## Best Practices

```go
type APIResponse struct {
    Status  string      `json:"status"`
    Message string      `json:"message,omitempty"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
}

type CreateUserRequest struct {
    Username string `json:"username" validate:"required,min=3,max=50"`
    Email    string `json:"email" validate:"required,email"`
    Password string `json:"password" validate:"required,min=8"`
}
```

## Practice

1. Define a struct with JSON tags and marshal/unmarshal an instance.
2. Use `omitempty` to exclude optional fields from JSON output.
3. Use `json:"-"` to hide sensitive fields like passwords from JSON output.
4. Write a program that reads struct tags using `reflect`.
5. Create a struct with both `json` and `xml` tags and serialize to both formats.
6. Demonstrate the behavior of `omitempty` with different zero values (0, "", false, nil slice).
7. Build a small validation function that checks for a `required` tag and validates the field is non-zero.
