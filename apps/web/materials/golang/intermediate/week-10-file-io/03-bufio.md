# Buffered I/O with `bufio`

## Why Buffered I/O?
Buffered I/O reduces system calls by reading/writing in larger chunks.

```go
// Without buffer: each byte = syscall (slow)
// With buffer: fill 4KB buffer = 1 syscall (fast)
```

## Buffered Reading

```go
import "bufio"

file, _ := os.Open("large.txt")
defer file.Close()

reader := bufio.NewReader(file)

// Read a single byte
b, _ := reader.ReadByte()

// Read until delimiter
line, _ := reader.ReadString('\n')

// Peek without consuming
peeked, _ := reader.Peek(10)
```

## Buffered Writing

```go
file, _ := os.Create("output.txt")
defer file.Close()

writer := bufio.NewWriter(file)
writer.WriteString("Hello, ")
writer.WriteString("World!\n")

// Don't forget to flush!
writer.Flush()
```

## Custom Buffer Size

```go
// Default: 4096 bytes
reader := bufio.NewReaderSize(file, 8192)
writer := bufio.NewWriterSize(file, 16384)
```

## Scanner for Structured Data

```go
scanner := bufio.NewScanner(file)

// Custom split function
scanner.Split(func(data []byte, atEOF bool) (advance int, token []byte, err error) {
    for i := 0; i < len(data); i++ {
        if data[i] == ',' {
            return i + 1, data[:i], nil
        }
    }
    return 0, nil, nil
})
```

## Reading a File Line by Line

```go
func readLines(path string) ([]string, error) {
    file, err := os.Open(path)
    if err != nil { return nil, err }
    defer file.Close()

    var lines []string
    scanner := bufio.NewScanner(file)
    for scanner.Scan() {
        lines = append(lines, scanner.Text())
    }
    return lines, scanner.Err()
}
```

## Comparison

| Feature | `os.File` | `bufio.Reader` | `bufio.Scanner` |
|---------|-----------|----------------|-----------------|
| Raw bytes | Yes | Yes | Limited |
| Line reading | Manual | `ReadString('\n')` | `Scan()`/`Text()` |
| Peek | No | Yes | No |
| Custom split | No | No | Yes |
| Performance | Low | High | High |

## Exercises

1. **Fast Line Counter**: Use `bufio.Scanner` to efficiently count lines in a large file.

2. **CSV Parser**: Write a buffered CSV reader that splits on commas and handles quoted fields.

3. **Buffered Network Writer**: Simulate writing to a network connection using `bufio.Writer` with flush on newline.

4. **Log Tailer**: Build a real-time log file reader that outputs new lines as they're written.
