# GitHub Actions for Go

Build automated CI/CD workflows for Go projects.

## Basic CI Pipeline

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        go-version: ["1.21", "1.22"]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Go
        uses: actions/setup-go@v5
        with:
          go-version: ${{ matrix.go-version }}
          cache: true

      - name: Lint
        uses: golangci/golangci-lint-action@v3
        with:
          version: latest

      - name: Test
        run: go test ./... -v -race -coverprofile=coverage.out -covermode=atomic

      - name: Upload Coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.out
```

## Multi-Platform Build

```yaml
jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        arch: [amd64, arm64]

    steps:
      - name: Build
        run: |
          GOOS=${{ matrix.os == 'ubuntu-latest' && 'linux' || matrix.os == 'macos-latest' && 'darwin' || 'windows' }}
          GOARCH=${{ matrix.arch }}
          go build -o myapp ./cmd
```

## Docker Build and Push

```yaml
jobs:
  docker:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ${{ secrets.DOCKER_USERNAME }}/myapp:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

## Practice
1. Create a workflow with matrix testing across Go versions
2. Add a security audit step with govulncheck
3. Set up branch protection rules
