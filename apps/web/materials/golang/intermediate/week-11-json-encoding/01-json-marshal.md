# JSON Marshaling

## Basic Marshaling

```go
import "encoding/json"

type Person struct {
    Name string
    Age  int
}

func main() {
    p := Person{Name: "Alice", Age: 30}
    data, err := json.Marshal(p)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Println(string(data))
    // {"Name":"Alice","Age":30}
}
```

## Pretty Printing

```go
data, _ := json.MarshalIndent(p, "", "  ")
fmt.Println(string(data))
// {
//   "Name": "Alice",
//   "Age": 30
// }
```

## Struct Tags

```go
type User struct {
    ID        int       `json:"id"`
    FirstName string    `json:"first_name"`
    LastName  string    `json:"last_name,omitempty"`
    Email     string    `json:"email,omitempty"`
    Password  string    `json:"-"`              // never included
    CreatedAt time.Time `json:"created_at"`
}
```

## Tag Options

| Option | Effect | Example |
|--------|--------|---------|
| `omitempty` | Skip if zero value | `json:"name,omitempty"` |
| `string` | Force string encoding | `json:"id,string"` |
| `-` | Always omit | `json:"-"` |

## Marshaling Maps and Slices

```go
// Maps
data := map[string]any{
    "name": "Bob",
    "age":  25,
    "tags": []string{"go", "json"},
}
jsonBytes, _ := json.Marshal(data)

// Slices
users := []User{
    {ID: 1, Name: "Alice"},
    {ID: 2, Name: "Bob"},
}
jsonBytes, _ = json.Marshal(users)
```

## Marshaling to Streams

```go
file, _ := os.Create("users.json")
defer file.Close()

encoder := json.NewEncoder(file)
encoder.SetIndent("", "  ")

for _, user := range users {
    if err := encoder.Encode(user); err != nil {
        log.Fatal(err)
    }
}
```

## Time and Custom Types

```go
type Event struct {
    Name string    `json:"name"`
    Date time.Time `json:"date"`
}

e := Event{Name: "Conference", Date: time.Now()}
data, _ := json.Marshal(e)
fmt.Println(string(data))
// {"name":"Conference","date":"2026-07-21T15:04:05Z"}
```

## Exercises

1. **Product Catalog**: Define a `Product` struct with JSON tags and marshal a product list.

2. **Config Exporter**: Create a `ServerConfig` struct and marshal to indented JSON.

3. **Nested JSON**: Marshal a `Company` with nested `Department` and `Employee` structs.

4. **Custom Field Name**: Use struct tags to map Go field `TotalPrice` to JSON `total_price`.
