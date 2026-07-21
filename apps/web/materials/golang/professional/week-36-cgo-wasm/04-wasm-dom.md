# WASM DOM Manipulation

Interact with the browser DOM from Go WebAssembly.

## DOM Operations

```go
package main

import "syscall/js"

func main() {
    doc := js.Global().Get("document")
    body := doc.Get("body")

    // Create element
    div := doc.Call("createElement", "div")
    div.Set("id", "app")
    div.Set("innerHTML", "<h1>Hello from Go WASM!</h1>")
    body.Call("appendChild", div)

    // Event listeners
    btn := doc.Call("createElement", "button")
    btn.Set("textContent", "Click me")
    btn.Call("addEventListener", "click", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
        div.Get("style").Set("backgroundColor", "lightblue")
        return nil
    }))
    body.Call("appendChild", btn)

    select {}
}
```

## Canvas Drawing

```go
package main

import (
    "math"
    "syscall/js"
)

func main() {
    doc := js.Global().Get("document")
    canvas := doc.Call("createElement", "canvas")
    canvas.Set("width", 800)
    canvas.Set("height", 600)
    doc.Get("body").Call("appendChild", canvas)

    ctx := canvas.Call("getContext", "2d")
    ctx.Set("fillStyle", "blue")
    ctx.Call("fillRect", 100, 100, 200, 200)

    // Animate
    var frame js.Func
    frame = js.FuncOf(func(this js.Value, args []js.Value) interface{} {
        ctx.Call("clearRect", 0, 0, 800, 600)
        t := args[0].Float()
        x := 400 + 200*math.Cos(t/1000)
        y := 300 + 200*math.Sin(t/1000)
        ctx.Set("fillStyle", "red")
        ctx.Call("beginPath")
        ctx.Call("arc", x, y, 50, 0, 2*math.Pi)
        ctx.Call("fill")
        js.Global().Call("requestAnimationFrame", frame)
        return nil
    })
    js.Global().Call("requestAnimationFrame", frame)

    select {}
}
```

## HTTP Requests from WASM

```go
func fetchData(url string) (string, error) {
    resp, err := js.Global().Call("fetch", url).Await()
    if err != nil {
        return "", fmt.Errorf("fetch failed: %w", err)
    }
    text, err := resp.Call("text").Await()
    if err != nil {
        return "", fmt.Errorf("read text failed: %w", err)
    }
    return text.String(), nil
}

func main() {
    js.Global().Set("loadData", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
        go func() {
            data, err := fetchData("/api/data")
            if err != nil {
                js.Global().Get("console").Call("error", err.Error())
                return
            }
            js.Global().Get("document").Get("elementById")("output").
                Set("textContent", data)
        }()
        return nil
    }))
    select {}
}
```

## Practice
1. Build a WASM-based form validation library
2. Create a canvas drawing app
3. Implement drag-and-drop with Go WASM
