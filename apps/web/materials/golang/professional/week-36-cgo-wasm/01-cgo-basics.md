# CGo Basics

Introduction to CGo for calling C code from Go.

## Simple CGo Example

```go
package main

/*
#include <stdio.h>
#include <stdlib.h>

void hello() {
    printf("Hello from C!\n");
}

int add(int a, int b) {
    return a + b;
}
*/
import "C"
import "fmt"

func main() {
    C.hello()
    result := C.add(5, 3)
    fmt.Printf("5 + 3 = %d\n", int(result))
}
```

## CGo Types

```go
package main

/*
#include <stdint.h>
*/
import "C"
import (
    "fmt"
    "unsafe"
)

func main() {
    // Type conversions
    var goInt int = 42
    cInt := C.int(goInt)
    fmt.Printf("C.int: %d\n", int(cInt))

    var goFloat float64 = 3.14
    cDouble := C.double(goFloat)
    fmt.Printf("C.double: %f\n", float64(cDouble))

    // C string
    cStr := C.CString("Hello from Go")
    defer C.free(unsafe.Pointer(cStr))
}
```

## Build Tags

```go
//go:build cgo

package native

/*
#cgo LDFLAGS: -lm
#cgo CFLAGS: -I/usr/local/include
#include "custom.h"
*/
import "C"

func Compute(input float64) float64 {
    return float64(C.compute(C.double(input)))
}
```

## Practice
1. Create a CGo wrapper for a simple math library
2. Handle C string memory management
3. Set up CGo cross-compilation
