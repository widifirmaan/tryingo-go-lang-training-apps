# Writing Files

## Whole File at Once

```go
import "os"

data := []byte("Hello, World!\n")
err := os.WriteFile("output.txt", data, 0644)
```

## Writing with `os.File`

```go
file, err := os.Create("output.txt")
if err != nil {
    log.Fatal(err)
}
defer file.Close()

written, err := file.Write([]byte("Hello, World!\n"))
```

## Writing Strings

```go
n, err := file.WriteString("Hello, World!\n")
```

## Appending to a File

```go
file, err := os.OpenFile("log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
if err != nil {
    log.Fatal(err)
}
defer file.Close()

file.WriteString("New log entry\n")
```

## File Permissions

| Octal | String | Description |
|-------|--------|-------------|
| `0644` | `rw-r--r--` | Owner read/write, others read |
| `0755` | `rwxr-xr-x` | Owner all, others read/execute |
| `0600` | `rw-------` | Owner only read/write |
| `0666` | `rw-rw-rw-` | All read/write (open) |

## Write Methods Comparison

| Method | Usage | Behavior |
|--------|-------|----------|
| `os.WriteFile` | Simple write | Overwrites, creates if missing |
| `os.Create` | New file | Truncates if exists |
| `os.OpenFile` | Custom flags | Specify append/truncate/create |
| `file.Write` | Write bytes | Returns bytes written |
| `file.WriteString` | Write string | Convenience for string |

## File Flags

```go
file, err := os.OpenFile("data.txt",
    os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)

// O_RDONLY  - read only
// O_WRONLY  - write only
// O_RDWR    - read and write
// O_APPEND  - append to file
// O_CREATE  - create if not exists
// O_TRUNC   - truncate if exists
// O_EXCL    - error if file exists
```

## Syncing Writes

```go
file.Write([]byte("important data"))
file.Sync() // flush to disk immediately
```

## Temporary Files

```go
tmpFile, err := os.CreateTemp("", "prefix-*.txt")
defer os.Remove(tmpFile.Name())

tmpFile.WriteString("temporary data")
```

## Exercises

1. **Log File**: Write a logger that appends timestamped entries to a log file.

2. **File Copy**: Implement a file copy function that reads from source and writes to destination.

3. **CSV Writer**: Write structured data (name, age, email) to a CSV file.

4. **Config File Generator**: Generate a YAML or INI-style config file with key-value pairs.
