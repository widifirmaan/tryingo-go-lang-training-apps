# WebAssembly in Go

Compile Go programs to WebAssembly for browser and server-side WASM.

## Basic WASM Module

```go
package main

import "syscall/js"

func main() {
    c := make(chan struct{}, 0)
    js.Global().Set("hello", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
        name := args[0].String()
        return js.ValueOf("Hello, " + name + "!")
    }))
    <-c
}
```

## Building WASM

```bash
# Build WASM module
GOOS=js GOARCH=wasm go build -o main.wasm main.go

# Copy WASM executor
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" .
```

## HTML Integration

```html
<!DOCTYPE html>
<html>
<head>
    <script src="wasm_exec.js"></script>
    <script>
        const go = new Go();
        WebAssembly.instantiateStreaming(
            fetch("main.wasm"), go.importObject
        ).then(result => {
            go.run(result.instance);
        });
    </script>
</head>
<body>
    <script>
        console.log(hello("World")); // "Hello, World!"
    </script>
</body>
</html>
```

## WASM Module Pattern

```go
package main

import "syscall/js"

type Calculator struct {
    value float64
}

func (c *Calculator) add(this js.Value, args []js.Value) interface{} {
    c.value += args[0].Float()
    return js.ValueOf(c.value)
}

func (c *Calculator) getValue(this js.Value, args []js.Value) interface{} {
    return js.ValueOf(c.value)
}

func main() {
    calc := &Calculator{}
    js.Global().Set("calculator", map[string]interface{}{
        "add":      js.FuncOf(calc.add),
        "getValue": js.FuncOf(calc.getValue),
    })
    select {}
}
```

## Practice
1. Build a WASM module that processes JSON data
2. Create a Go WASM module for image manipulation
3. Benchmark Go WASM vs JavaScript performance
