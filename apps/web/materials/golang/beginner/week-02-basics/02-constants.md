# Constants & Iota

## Introduction
Constants are immutable values that cannot be changed after declaration. Go supports typed and untyped constants, as well as the special `iota` enumerator.

## Declaring Constants

### Basic constant declaration:
```go
const Pi = 3.14159
const AppName = "MyApp"
const MaxUsers = 1000
```

### Typed constants:
```go
const Pi float64 = 3.14159
const AppName string = "MyApp"
const MaxUsers int = 1000
```

### Multiple constants:
```go
const (
    StatusOK   = 200
    StatusNotFound = 404
    StatusError    = 500
)
```

## Typed vs Untyped Constants

```go
const Untyped    = 42       // Can be used with any numeric type
const Typed  int = 42       // Can only be used with int

var smallInt int8 = 10
// var result = Typed + smallInt  // Error: cannot use int + int8
var result = Untyped + smallInt   // OK: untyped constant adapts
```

## Iota - Constant Generator

`iota` is a special constant that increments automatically within a `const` block.

### Basic iota:
```go
const (
    Monday    = iota  // 0
    Tuesday          // 1
    Wednesday        // 2
    Thursday         // 3
    Friday           // 4
    Saturday         // 5
    Sunday           // 6
)
```

### Iota with expressions:
```go
const (
    B = 1 << (10 * iota)  // 1
    KB                     // 1024
    MB                     // 1048576
    GB                     // 1073741824
    TB                     // 1099511627776
)
```

### Skip values with underscore:
```go
const (
    _   = iota  // skip 0
    A           // 1
    B           // 2
    _           // skip 3
    D           // 4
)
```

## When to Use Constants

```go
const (
    // Configuration
    DefaultPort    = 8080
    DefaultTimeout = 30
    
    // HTTP Status Codes
    StatusOK              = 200
    StatusBadRequest      = 400
    StatusInternalError   = 500
    
    // Enum-like values
    UserRoleAdmin  = "admin"
    UserRoleUser   = "user"
    UserRoleGuest  = "guest"
)
```

## Best Practices

1. **Use constants for magic numbers** - Replace `if retryCount > 3` with `if retryCount > MaxRetries`
2. **Prefer untyped constants** - More flexible in expressions
3. **Use iota for related constants** - Clean, maintainable enumerations
4. **Name constants clearly** - `const maxConnections = 100` not `const x = 100`
5. **Group related constants** - Use a single const block

## Practice

```go
// 1. Define constants for your application
const (
    AppVersion = "1.0.0"
    DebugMode  = true
    MaxRetries = 3
)

// 2. Use iota for HTTP methods
const (
    GET    = iota  // 0
    POST           // 1
    PUT            // 2
    DELETE         // 3
)

// 3. Bitmask flags with iota
const (
    Read    = 1 << iota  // 1
    Write                 // 2
    Execute               // 4
)
```
