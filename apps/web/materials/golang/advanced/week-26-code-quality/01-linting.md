# Linting and Static Analysis

Linters catch bugs, enforce style, and improve code maintainability.

## golangci-lint

```yaml
# .golangci.yml
linters:
  enable:
    - errcheck
    - gosimple
    - govet
    - ineffassign
    - staticcheck
    - unused
    - revive
    - gofmt
    - misspell
    - gocyclo

linters-settings:
  gocyclo:
    min-complexity: 15
  revive:
    rules:
      - name: exported
        severity: warning
```

## Running Linters

```bash
# Install
go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# Run all linters
golangci-lint run

# Run with specific config
golangci-lint run --config .golangci.yml

# Fix issues
golangci-lint run --fix

# Run on specific package
golangci-lint run ./internal/...
```

## Common Linter Rules

```go
// ERRCHECK: Always check errors
// Bad:
f, _ := os.Open("file.txt")

// Good:
f, err := os.Open("file.txt")
if err != nil {
    return err
}

// GOVET: Shadow declarations
// Bad:
x := 1
if true {
    x := 2 // shadow
    _ = x
}

// STATICCHECK: Unused parameters
// Bad:
func handler(w http.ResponseWriter, r *http.Request) { // r unused
    w.Write([]byte("ok"))
}

// Good:
func handler(w http.ResponseWriter, _ *http.Request) {
    w.Write([]byte("ok"))
}
```

## Custom Go Vet Checks

```go
//go:build ignore

package main

import (
    "go/ast"
    "golang.org/x/tools/go/analysis"
    "golang.org/x/tools/go/analysis/passes/inspect"
    "golang.org/x/tools/go/analysis/singlechecker"
)

var analyzer = &analysis.Analyzer{
    Name:     "nosprintf",
    Doc:      "disallow fmt.Sprintf in favor of string concatenation",
    Requires: []*analysis.Analyzer{inspect.Analyzer},
    Run:      run,
}

func run(pass *analysis.Pass) (interface{}, error) {
    for _, file := range pass.Files {
        ast.Inspect(file, func(n ast.Node) bool {
            if call, ok := n.(*ast.CallExpr); ok {
                if sel, ok := call.Fun.(*ast.SelectorExpr); ok {
                    if ident, ok := sel.X.(*ast.Ident); ok {
                        if ident.Name == "fmt" && sel.Sel.Name == "Sprintf" {
                            pass.Reportf(call.Pos(), "avoid fmt.Sprintf, use string concatenation")
                        }
                    }
                }
            }
            return true
        })
    }
    return nil, nil
}

func main() {
    singlechecker.Main(analyzer)
}
```

## Practice

1. Install golangci-lint and configure it for a project
2. Fix all linting errors in an existing codebase
3. Add revive for style checking
4. Create a custom analysis pass
