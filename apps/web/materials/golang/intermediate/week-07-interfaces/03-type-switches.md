# Type Switches

## What is a Type Switch?
A type switch performs multiple type assertions in series, matching the concrete type of an interface value.

```go
func Describe(v any) {
    switch v := v.(type) {
    case string:
        fmt.Println("String:", v)
    case int:
        fmt.Println("Integer:", v)
    case bool:
        fmt.Println("Boolean:", v)
    default:
        fmt.Printf("Unknown type: %T\n", v)
    }
}
```

## Syntax
The `v.(type)` syntax is only valid inside a `switch` statement.

```go
switch variable := value.(type) {
case Type1:
    // variable is Type1
case Type2:
    // variable is Type2
default:
    // variable is the original interface type
}
```

## Multiple Types in One Case

```go
func IsNumeric(v any) bool {
    switch v.(type) {
    case int, int8, int16, int32, int64:
        return true
    case uint, uint8, uint16, uint32, uint64:
        return true
    case float32, float64:
        return true
    case complex64, complex128:
        return true
    }
    return false
}
```

## Extracting the Value
The variable in the switch header receives the converted value.

```go
func Process(v any) {
    switch val := v.(type) {
    case string:
        fmt.Println("Length:", len(val)) // val is string
    case []int:
        fmt.Println("Sum:", sum(val))    // val is []int
    case int:
        fmt.Println("Double:", val*2)    // val is int
    }
}
```

## Real-World Example: JSON Decoder

```go
func decodeValue(v any) string {
    switch val := v.(type) {
    case string:
        return val
    case float64:
        return fmt.Sprintf("%.2f", val)
    case bool:
        if val { return "yes" }
        return "no"
    case map[string]any:
        return "[object]"
    case []any:
        return "[array]"
    case nil:
        return "null"
    default:
        return fmt.Sprintf("%v", val)
    }
}
```

## Type Switches vs Type Assertions

| Feature | Type Assertion | Type Switch |
|---------|---------------|-------------|
| Single type check | Yes | No |
| Multiple type matching | No | Yes |
| Variable conversion | One type | Per case |
| `default` clause | No | Yes |

## Exercises

1. **Shape Matcher**: Given `any`, match `Circle`, `Rectangle`, `Triangle` and print their area formulas.

2. **Format Detector**: Write a function that accepts `any` and returns a string describing the format: "text", "number", "list", "map", "other".

3. **Math Evaluator**: Build a function that processes `any` values: add numbers, concatenate strings, merge slices.

4. **Error Classifier**: Create a function that takes `error` and uses type switch to classify into `NetworkError`, `ValidationError`, `AuthError`, or `UnknownError`.
