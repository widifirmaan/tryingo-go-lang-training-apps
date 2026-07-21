# Installing Go & Setup

## Overview

Go (also called Golang) is a statically typed, compiled programming language designed at Google. This guide walks through installing Go on Windows, macOS, and Linux.

## System Requirements

- **OS**: Windows 7+, macOS 10.13+, Linux
- **Architecture**: amd64, arm64, 386
- **Disk**: ~250 MB
- **Memory**: 512 MB minimum

## Installing on Windows

1. Download the MSI installer from [https://go.dev/dl/](https://go.dev/dl/)
2. Run the MSI and follow the prompts (default path: `C:\Program Files\Go`)
3. The installer automatically sets `GOROOT` and adds Go to your `PATH`

## Installing on macOS

**Option A — Homebrew (recommended):**

```bash
brew install go
```

**Option B — Package installer:**

1. Download the macOS `.pkg` from [https://go.dev/dl/](https://go.dev/dl/)
2. Run the package and follow the prompts

## Installing on Linux

**Option A — Official tarball:**

```bash
wget https://go.dev/dl/go1.23.0.linux-amd64.tar.gz
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.23.0.linux-amd64.tar.gz
```

Add to `~/.profile` or `~/.bashrc`:

```bash
export PATH=$PATH:/usr/local/go/bin
```

**Option B — Package manager:**

```bash
# Ubuntu / Debian
sudo apt install golang-go

# Fedora
sudo dnf install golang
```

> Package manager versions may be older. Prefer the official tarball.

## Verify Installation

```bash
go version
```

Expected output (version may differ):

```
go version go1.23.0 windows/amd64
```

## Understanding GOPATH & GOROOT

| Variable | Purpose |
|----------|---------|
| `GOROOT` | Where Go is installed (e.g. `/usr/local/go`) |
| `GOPATH` | Workspace for your code and dependencies |

View them:

```bash
go env GOPATH GOROOT
```

Default `GOPATH` locations:
- **Linux/macOS**: `$HOME/go`
- **Windows**: `%USERPROFILE%\go`

## Your First Program

Create a file `hello.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

Run it:

```bash
go run hello.go
```

## Practice

1. Install Go on your machine using the instructions above
2. Run `go version` and confirm the output
3. Run `go env` and identify your `GOPATH` and `GOROOT`
4. Create `hello.go` with the code above and run it with `go run`
5. Build the program with `go build hello.go` and run the resulting executable
