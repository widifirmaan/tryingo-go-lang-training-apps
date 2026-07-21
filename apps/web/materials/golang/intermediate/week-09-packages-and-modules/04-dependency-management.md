# Dependency Management

## The `go.mod` File

```
module github.com/user/myapp

go 1.22

require (
    github.com/gorilla/mux v1.8.1
    github.com/lib/pq v1.10.9
)
```

## Adding Dependencies

```bash
go get github.com/gorilla/mux
# Updates go.mod and downloads to module cache
```

## Semantic Versioning
Go modules use semantic versioning: `vMAJOR.MINOR.PATCH`.

| Version | Meaning |
|---------|---------|
| `v1.0.0` | Initial stable release |
| `v1.2.3` | Patch: bug fixes |
| `v1.3.0` | Minor: new features (backward compatible) |
| `v2.0.0` | Major: breaking changes |

## Upgrading and Downgrading

```bash
# Upgrade to latest
go get github.com/gorilla/mux@latest

# Specific version
go get github.com/gorilla/mux@v1.7.4

# Upgrade all
go get -u ./...
```

## The `go.sum` File
Contains cryptographic checksums for dependency verification.

```
github.com/gorilla/mux v1.8.1 h1:TuMoUvkRETdXqU+3pBqmwN2/9H6FREaEtYgT6rYq8cA=
github.com/gorilla/mux v1.8.1/go.mod h1:AKf9I4AEqPTmMytcMc0KkNouC66V3BtZ4qD5fmWSiMQ=
```

## Indirect Dependencies

```
require (
    github.com/gorilla/mux v1.8.1
    github.com/gorilla/context v1.1.1 // indirect
)
```

## Cleaning Up

```bash
# Remove unused dependencies from go.mod
go mod tidy
```

## Vendor Directory

```bash
# Create vendor directory with all dependencies
go mod vendor
```

```bash
# Build using vendor directory
go build -mod=vendor
```

## Replacing Dependencies

```go
// go.mod — useful for local development
replace github.com/gorilla/mux => ../local/mux
```

## Module Proxies
```
GOPROXY=https://proxy.golang.org,direct
```

## Publishing a Module

```bash
# Tag your release
git tag v1.0.0
git push origin v1.0.0

# GOPROXY=proxy.golang.org will fetch it
```

## Major Versions
For v2+, the module path includes the major version.

```
module github.com/user/myapp/v2
```

```bash
go get github.com/user/myapp/v2
```

## Commands Reference

| Command | Purpose |
|---------|---------|
| `go mod init <path>` | Initialize new module |
| `go mod tidy` | Add missing, remove unused |
| `go mod vendor` | Create vendor directory |
| `go mod verify` | Verify checksums |
| `go mod download` | Download all dependencies |
| `go list -m all` | List all dependencies |

## Exercises

1. **Add Dependency**: Initialize a module and add `github.com/google/uuid` for UUID generation.

2. **Vendor Workflow**: Add a dependency, vendor it, build with `-mod=vendor`.

3. **Local Replace**: Clone a dependency locally, use `replace` directive to test changes.

4. **Major Version**: Create a module at `v2.0.0`, update imports to use the new path.
