# Test Automation

Automate testing in CI pipelines with comprehensive coverage and quality gates.

## Test Suite Organization

```go
// unit_test.go
func TestHandler(t *testing.T) {
    t.Parallel()
    tests := []struct {
        name     string
        method   string
        path     string
        status   int
        hasError bool
    }{
        {"valid GET", http.MethodGet, "/api/users", 200, false},
        {"invalid POST", http.MethodPost, "/api/users", 400, true},
    }
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            // test logic
        })
    }
}
```

## Integration Test Setup

```go
// integration_test.go
//go:build integration

package integration

import (
    "testing"
    "github.com/ory/dockertest/v3"
)

func TestMain(m *testing.M) {
    pool, err := dockertest.NewPool("")
    if err != nil {
        log.Fatal(err)
    }
    resource, err := pool.Run("postgres", "16-alpine", []string{
        "POSTGRES_PASSWORD=secret",
        "POSTGRES_DB=testdb",
    })
    if err != nil {
        log.Fatal(err)
    }
    defer pool.Purge(resource)
    os.Exit(m.Run())
}
```

## CI Integration

```yaml
jobs:
  test:
    steps:
      - name: Unit Tests
        run: go test ./... -short -race -count=1

      - name: Integration Tests
        run: go test -tags=integration ./... -v -count=1 -timeout=10m

      - name: Race Detection
        run: go test -race -count=1 ./...

      - name: Fuzz Testing
        run: go test -fuzz=. -fuzztime=30s ./...

      - name: Coverage Gate
        run: |
          go test -coverprofile=coverage.out ./...
          go tool cover -func=coverage.out | grep total | awk '{print $3}' | \
            awk -F. '{if ($1 < 80) {print "Coverage below 80%"; exit 1}}'
```

## Quality Gates

```yaml
jobs:
  quality:
    steps:
      - uses: golangci/golangci-lint-action@v3
      - run: go vet ./...
      - run: go install golang.org/x/vuln/cmd/govulncheck@latest && govulncheck ./...
      - uses: bufbuild/buf-lint-action@v1
        with:
          input: "proto"
```

## Practice
1. Set up a CI pipeline that fails on low coverage
2. Create integration tests with testcontainers
3. Implement fuzz testing in CI
