# JSON Unmarshaling

## Basic Unmarshaling

```go
type Person struct {
    Name string
    Age  int
}

func main() {
    data := []byte(`{"Name":"Alice","Age":30}`)
    var p Person
    err := json.Unmarshal(data, &p)
    if err != nil {
        log.Fatal(err)
    }
    fmt.Printf("%+v\n", p) // {Name:Alice Age:30}
}
```

## Unmarshaling to Maps

```go
data := []byte(`{"name":"Alice","age":30,"active":true}`)
var result map[string]any

json.Unmarshal(data, &result)

fmt.Println(result["name"])    // Alice
fmt.Println(result["age"])     // 30 (float64)
fmt.Println(result["active"])  // true
```

## Handling Dynamic JSON

```go
func processJSON(data []byte) error {
    var raw map[string]any
    if err := json.Unmarshal(data, &raw); err != nil {
        return err
    }

    switch v := raw["type"].(type) {
    case string:
        fmt.Println("Type:", v)
    }

    if age, ok := raw["age"].(float64); ok {
        fmt.Println("Age:", int(age))
    }
    return nil
}
```

## Struct Tags for Unmarshaling

```go
type APIResponse struct {
    Status  string `json:"status"`
    Message string `json:"message"`
    Data    any    `json:"data"`
}
```

## Unmarshaling from Streams

```go
file, _ := os.Open("users.json")
defer file.Close()

decoder := json.NewDecoder(file)

var users []User
if err := decoder.Decode(&users); err != nil {
    log.Fatal(err)
}
```

## Streaming Multiple Objects

```go
file, _ := os.Open("users.ndjson")
defer file.Close()

decoder := json.NewDecoder(file)
for decoder.More() {
    var user User
    if err := decoder.Decode(&user); err != nil {
        log.Fatal(err)
    }
    fmt.Printf("User: %+v\n", user)
}
```

## JSON Type Mapping

| JSON Type | Go Type (struct) | Go Type (map) |
|-----------|------------------|---------------|
| string | string | string |
| number | float64 | float64 |
| boolean | bool | bool |
| null | nil | nil |
| array | []Type | []any |
| object | Struct | map[string]any |

## Error Handling

```go
data := []byte(`{"name":`)

var p Person
err := json.Unmarshal(data, &p)

if syntaxErr, ok := err.(*json.SyntaxError); ok {
    fmt.Printf("Syntax error at byte %d: %s\n", syntaxErr.Offset, syntaxErr)
} else if typeErr, ok := err.(*json.UnmarshalTypeError); ok {
    fmt.Printf("Type error field %s: expected %v got %v\n",
        typeErr.Field, typeErr.Type, typeErr.Value)
}
```

## Exercises

1. **Config Loader**: Read a JSON config file and unmarshal into a `Config` struct.

2. **API Response Parser**: Parse `{"status":"ok","data":{"users":[...]}}` into nested structs.

3. **Flexible Data**: Unmarshal JSON into `map[string]any` and extract values with type assertions.

4. **NDJSON Reader**: Read a newline-delimited JSON file (`*.ndjson`) with `json.Decoder`.
