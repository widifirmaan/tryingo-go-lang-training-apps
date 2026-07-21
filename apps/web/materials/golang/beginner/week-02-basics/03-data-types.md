# Basic Data Types

## Introduction
Go is a statically typed language. Every variable has a specific type that is checked at compile time.

## Numeric Types

### Integers
```go
// Signed integers
var a int     // Platform dependent (32 or 64 bit)
var b int8   // -128 to 127
var c int16  // -32768 to 32767
var d int32  // -2147483648 to 2147483647
var e int64  // -9223372036854775808 to 9223372036854775807

// Unsigned integers
var f uint    // Platform dependent
var g uint8   // 0 to 255
var h uint16  // 0 to 65535
var i uint32  // 0 to 4294967295
var j uint64  // 0 to 18446744073709551615
```

### Floating Point
```go
var k float32      // ~6 decimal digits precision
var l float64      // ~15 decimal digits precision (default)
var m complex64    // Complex numbers (real + imag float32)
var n complex128   // Complex numbers (real + imag float64)
```

### Type Aliases
```go
type byte = uint8    // 0 to 255
type rune = int32    // Unicode code point
```

## Boolean
```go
var isActive bool   // true or false
var isDone bool = false
```

## String
```go
var name string                // ""
var greeting string = "Hello"
var multiline = `Line 1
Line 2
Line 3`                         // Raw string literal
```

### String Operations
```go
// Concatenation
fullName := "John" + " " + "Doe"

// Length
length := len("Hello")  // 5

// Indexing
first := "Hello"[0]     // byte: 72 (H)

// Slicing
hello := "Hello"[0:2]   // "He"

// Iteration
for i, c := range "Hello" {
    fmt.Printf("%d: %c\n", i, c)
}
```

## Type Conversion

Go does NOT do implicit type conversion. You must convert explicitly:

```go
var x int = 42
var y float64 = float64(x)     // int → float64
var z int8 = int8(x)           // int → int8

var s string = string(65)       // → "A" (rune to string)
var n int = int('A')            // → 65 (rune to int)
```

### strconv for string conversions:
```go
import "strconv"

// string to int
n, err := strconv.Atoi("123")

// int to string
s := strconv.Itoa(123)

// ParseFloat
f, err := strconv.ParseFloat("3.14", 64)
```

## Type Inference

Go can infer types from context:

```go
x := 42           // int (default for integer literals)
y := 3.14         // float64 (default for float literals)
z := "hello"      // string
b := true         // bool
f := 3.14 + 2i    // complex128
```

## Zero Values

Every type has a zero value (assigned automatically):

```go
var i int        // 0
var f float64    // 0
var b bool       // false
var s string     // ""
var p *int       // nil
var sl []int     // nil
var m map[int]string  // nil
```

## Practice

```go
// 1. Declare variables with different types
var name string = "Gopher"
var age int = 10
var height float64 = 1.75
var isStudent bool = false

// 2. Convert between types
var a int = 42
var b float64 = float64(a)
var c int = int(b)

// 3. String operations
first := "Hello"
last := "World"
full := first + ", " + last + "!"
fmt.Println(len(full))

// 4. Type check with Printf
fmt.Printf("Type: %T, Value: %v\n", name, name)
```
