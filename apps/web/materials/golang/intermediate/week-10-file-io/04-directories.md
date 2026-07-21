# Directories

## Creating Directories

```go
import "os"

// Single directory
err := os.Mkdir("mydir", 0755)

// All parent directories
err := os.MkdirAll("path/to/nested/dir", 0755)
```

## Listing Directory Contents

```go
entries, err := os.ReadDir(".")
for _, entry := range entries {
    fmt.Printf("Name: %s, IsDir: %v\n", entry.Name(), entry.IsDir())
}
```

## Getting File Info

```go
info, err := os.Stat("file.txt")
fmt.Printf("Name: %s\n", info.Name())
fmt.Printf("Size: %d bytes\n", info.Size())
fmt.Printf("Mode: %s\n", info.Mode())
fmt.Printf("ModTime: %s\n", info.ModTime())
fmt.Printf("IsDir: %v\n", info.IsDir())
```

## Walking a Directory Tree

```go
import "path/filepath"

filepath.WalkDir(".", func(path string, d os.DirEntry, err error) error {
    if err != nil { return err }
    fmt.Println(path)
    return nil
})
```

## Recursive File Operations

```go
func copyDir(src, dst string) error {
    return filepath.WalkDir(src, func(path string, d os.DirEntry, err error) error {
        if err != nil { return err }

        relPath, _ := filepath.Rel(src, path)
        target := filepath.Join(dst, relPath)

        if d.IsDir() {
            return os.MkdirAll(target, 0755)
        }

        data, err := os.ReadFile(path)
        if err != nil { return err }
        return os.WriteFile(target, data, 0644)
    })
}
```

## Removing Files and Directories

```go
// Remove single file or empty directory
os.Remove("file.txt")
os.Remove("emptydir")

// Remove entire tree
os.RemoveAll("mydir")
```

## Renaming and Moving

```go
os.Rename("old.txt", "new.txt")
os.Rename("olddir", "newdir")
```

## File Path Operations

| Function | Purpose | Example |
|----------|---------|---------|
| `filepath.Join` | Join path elements | `filepath.Join("a", "b", "c")` → `a/b/c` |
| `filepath.Dir` | Get parent directory | `filepath.Dir("a/b/c")` → `a/b` |
| `filepath.Base` | Get last element | `filepath.Base("a/b/c")` → `c` |
| `filepath.Ext` | Get extension | `filepath.Ext("file.go")` → `.go` |
| `filepath.Glob` | Pattern match | `filepath.Glob("*.go")` |
| `filepath.Abs` | Absolute path | `filepath.Abs(".")` |
| `filepath.Rel` | Relative path | `filepath.Rel(base, target)` |

## Exercises

1. **Tree Command**: Implement a `tree` command that recursively lists files with indentation.

2. **File Organizer**: Build a tool that organizes files by extension into subdirectories (`.jpg` → `images/`, `.go` → `code/`).

3. **Disk Usage**: Write a function that calculates total size of all files in a directory recursively.

4. **Sync Tool**: Create a directory synchronization tool that copies new/changed files from source to destination.
