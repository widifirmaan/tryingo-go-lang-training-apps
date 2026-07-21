# Reading Files

## Whole File at Once

```go
package main

import (
    "fmt"
    "os"
)

func main() {
    data, err := os.ReadFile("example.txt")
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    fmt.Println(string(data))
}
```

## Reading with `os.File`

```go
file, err := os.Open("example.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

// Read into buffer
buf := make([]byte, 1024)
n, err := file.Read(buf)
if err != nil {
    log.Fatal(err)
}
fmt.Printf("Read %d bytes: %s\n", n, buf[:n])
```

## Reading at Specific Offset

```go
file, _ := os.Open("example.txt")
defer file.Close()

buf := make([]byte, 10)
file.ReadAt(buf, 5) // read 10 bytes starting at offset 5
fmt.Println(string(buf))
```

## Using `io.ReadAll`

```go
import "io"

file, _ := os.Open("example.txt")
defer file.Close()

data, err := io.ReadAll(file)
```

## Line by Line with `bufio.Scanner`

```go
import "bufio"

file, _ := os.Open("example.txt")
defer file.Close()

scanner := bufio.NewScanner(file)
for scanner.Scan() {
    fmt.Println(scanner.Text())
}

if err := scanner.Err(); err != nil {
    log.Fatal(err)
}
```

## Word by Word

```go
scanner := bufio.NewScanner(file)
scanner.Split(bufio.ScanWords)

for scanner.Scan() {
    fmt.Println(scanner.Text())
}
```

## Reading from Multiple Sources

```go
func readSource(src string) ([]byte, error) {
    switch {
    case strings.HasPrefix(src, "http://") || strings.HasPrefix(src, "https://"):
        resp, err := http.Get(src)
        if err != nil { return nil, err }
        defer resp.Body.Close()
        return io.ReadAll(resp.Body)
    case src == "-":
        return io.ReadAll(os.Stdin)
    default:
        return os.ReadFile(src)
    }
}
```

## Reading Methods Comparison

| Method | Best For | Memory |
|--------|----------|--------|
| `os.ReadFile` | Small files | Entire file |
| `file.Read` + buffer | Large files | Buffer size |
| `bufio.Scanner` | Line/word processing | Per line/word |
| `io.Copy` | Streaming | Copy buffer |
| `file.ReadAt` | Random access | Buffer size |

## Exercises

1. **File Counter**: Read a file and count lines, words, and characters.

2. **Tail Command**: Implement a simple `tail` that reads the last N lines of a file.

3. **Grep Clone**: Read a file line by line and print lines matching a pattern.

4. **Merge Files**: Read multiple files and merge their contents into a single output.
