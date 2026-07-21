# Zero Values & Empty Variables

## Overview

In Go, every variable declared without an explicit initial value is automatically assigned a **zero value**. There is no such thing as an uninitialized variable.

## Zero Values by Type

```go
package main

import "fmt"

func main() {
    var i int          // 0
    var f float64      // 0
    var b bool         // false
    var s string       // ""
    var p *int         // nil
    var arr [3]int     // [0 0 0]
    var sl []int       // nil
    var m map[string]int // nil
    var ch chan int    // nil
    var fn func()      // nil
    var st struct{}    // {}

    fmt.Printf("int:       %v\n", i)
    fmt.Printf("float64:   %v\n", f)
    fmt.Printf("bool:      %v\n", b)
    fmt.Printf("string:    %q\n", s)
    fmt.Printf("pointer:   %v\n", p)
    fmt.Printf("array:     %v\n", arr)
    fmt.Printf("slice:     %v (len=%d)\n", sl, len(sl))
    fmt.Printf("map:       %v\n", m)
    fmt.Printf("channel:   %v\n", ch)
    fmt.Printf("func:      %v\n", fn)
    fmt.Printf("struct:    %v\n", st)
}
```

Output:

```
int:       0
float64:   0
bool:      false
string:    ""
pointer:   <nil>
array:     [0 0 0]
slice:     [] (len=0)
map:       map[]
channel:   <nil>
func:      <nil>
struct:    {}
```

## Zero Value Table

| Type | Zero Value |
|------|-----------|
| All numeric types (`int`, `float64`, `byte`, etc.) | `0` |
| `bool` | `false` |
| `string` | `""` (empty string) |
| Pointer (`*T`) | `nil` |
| Slice (`[]T`) | `nil` (but usable with `append`) |
| Map (`map[K]V`) | `nil` |
| Channel (`chan T`) | `nil` |
| Function (`func`) | `nil` |
| Interface | `nil` |
| Struct | All fields set to their zero values |
| Array | All elements set to their zero values |

## Zero Value vs `nil`

`nil` is a predeclared identifier representing the zero value for pointers, slices, maps, channels, functions, and interfaces. It is **not** a type — it is a value.

```go
var p *int       // p is nil
var s []int      // s is nil
var m map[int]string // m is nil
```

**Key distinction:**

```go
var s1 string     // zero value is "" (empty string), NOT nil
var s2 *string    // s2 is nil (a pointer to a string)
```

Strings can never be `nil` — only pointers to strings can.

## nil Slices vs Empty Slices

```go
var s1 []int           // nil slice, len=0, cap=0
s2 := []int{}          // empty slice, len=0, cap=0
s3 := make([]int, 0)   // empty slice, len=0, cap=0
```

Nil and empty slices behave the same in most cases (`append`, `len`, `range`), but are different when serializing (JSON):

```go
var s []int
json.Marshal(s)  // → "null"

s2 := []int{}
json.Marshal(s2) // → "[]"
```

## nil Maps

Reading from a nil map returns the zero value of the value type:

```go
var m map[string]int
fmt.Println(m["hello"]) // 0 (no panic)
```

Writing to a nil map **panics**:

```go
var m map[string]int
m["hello"] = 1 // panic: assignment to entry in nil map
```

Always initialize maps with `make`:

```go
m := make(map[string]int)
m["hello"] = 1 // ok
```

## Checking for Zero Values

```go
var name string
if name == "" {
    fmt.Println("name is empty")
}

var count int
if count == 0 {
    fmt.Println("count is zero")
}
```

## Practice

1. Declare variables of each type without initialization and print their zero values
2. Create a nil slice and an empty slice — compare their JSON output using `json.Marshal`
3. Write a program that tries to write to a nil map (observe the panic), then fix it with `make`
4. Declare a pointer `var p *int` and check if `p == nil`. Then assign `p` with a new int value using `new(int)` and print both `p` and `*p`
5. Create a struct with various field types and print its zero value without initializing it
