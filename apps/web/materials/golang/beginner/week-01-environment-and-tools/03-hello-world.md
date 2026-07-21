# Hello, World!

## Your First Go Program

Every programming journey starts with "Hello, World!" In Go it looks like this:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

## Running the Program

Save the code as `main.go` and run:

```bash
go run main.go
```

Output:

```
Hello, World!
```

## Building an Executable

To compile into a standalone binary:

```bash
go build main.go
```

Run the binary:

```bash
# On Linux / macOS
./main

# On Windows
.\main.exe
```

## Breakdown

### `package main`

Every Go file belongs to a package. `package main` tells Go to compile this into an executable (not a library). The `main` package must contain a `func main()` — that is the program's entry point.

```go
package main
```

### `import "fmt"`

The `import` statement brings in other packages. `fmt` is the standard library package for formatted I/O.

```go
import "fmt"
```

Multiple imports can be grouped:

```go
import (
    "fmt"
    "math"
)
```

### `func main()`

`func` declares a function. `main` is the special function that runs when the program starts. No arguments, no return value.

```go
func main() {
    fmt.Println("Hello, World!")
}
```

### `fmt.Println`

`Println` prints a line of text to the console, followed by a newline.

## go run vs go build

| Command | What it does |
|---------|-------------|
| `go run` | Compiles and runs immediately, no binary saved |
| `go build` | Compiles into an executable binary on disk |
| `go install` | Compiles and places the binary in `$GOPATH/bin` |

Use `go run` during development and `go build` when you want to distribute your program.

## Practice

1. Write "Hello, World!" and run it with `go run`
2. Change the message to print your name (e.g. `"Hello, Alice!"`) and run again
3. Use `go build` to create an executable, then run it directly
4. Add a second `fmt.Println` call that prints your favorite programming language
5. Experiment: what happens if you remove the `package main` line? Try it.
