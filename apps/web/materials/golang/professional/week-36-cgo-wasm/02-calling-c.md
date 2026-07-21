# Advanced C Calling

Complex CGo usage with callbacks, structs, and pointers.

## C Structs

```go
package main

/*
#include <stdint.h>

typedef struct {
    int x;
    int y;
    char* name;
} Point;

Point* create_point(int x, int y, const char* name) {
    Point* p = (Point*)malloc(sizeof(Point));
    p->x = x;
    p->y = y;
    p->name = strdup(name);
    return p;
}

void free_point(Point* p) {
    free(p->name);
    free(p);
}
*/
import "C"
import "unsafe"

type Point struct {
    X    int
    Y    int
    Name string
}

func CreatePoint(x, y int, name string) *Point {
    cName := C.CString(name)
    defer C.free(unsafe.Pointer(cName))
    cp := C.create_point(C.int(x), C.int(y), cName)
    defer C.free_point(cp)
    return &Point{
        X:    int(cp.x),
        Y:    int(cp.y),
        Name: C.GoString(cp.name),
    }
}
```

## Callbacks

```go
package main

/*
typedef void (*callback_fn)(int, void*);

void call_with_callback(callback_fn cb, void* data) {
    cb(42, data);
}
*/
import "C"
import "fmt"

//export goCallback
func goCallback(value C.int, data unsafe.Pointer) {
    fmt.Printf("Callback received: %d\n", int(value))
}

func main() {
    C.call_with_callback(
        (C.callback_fn)(unsafe.Pointer(C.goCallback)),
        nil,
    )
}
```

## Error Handling

```go
package main

/*
#include <errno.h>
#include <string.h>

int divide(int a, int b, int* result) {
    if (b == 0) {
        return -1;
    }
    *result = a / b;
    return 0;
}
*/
import "C"

func Divide(a, b int) (int, error) {
    var result C.int
    ret := C.divide(C.int(a), C.int(b), &result)
    if ret != 0 {
        return 0, fmt.Errorf("division by zero")
    }
    return int(result), nil
}
```

## Practice
1. Wrap a SQLite C library wrapper
2. Implement CGo with struct arrays
3. Handle C error codes properly
