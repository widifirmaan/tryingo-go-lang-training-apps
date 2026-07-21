# Week 17: HTTP Server

Building robust HTTP servers is a core skill for any Go developer. Go's standard library provides `net/http` with everything needed to build production-ready HTTP servers without external dependencies.

## Topics

- `net/http` package fundamentals
- Handlers, HandlerFunc, and Handler interface
- Request routing and path parameters
- Middleware patterns
- Building REST APIs

## Goals

- Understand the `http.Handler` interface and request lifecycle
- Implement custom handlers with proper request parsing
- Build reusable middleware chains
- Design and implement a RESTful API

## Key Concepts

| Concept | Description |
|---------|-------------|
| Handler | Interface with `ServeHTTP(ResponseWriter, *Request)` |
| HandlerFunc | Adapter type converting a function to a Handler |
| ServeMux | Default request multiplexer (router) |
| Middleware | Wrapping handlers to add cross-cutting behavior |
| REST | Architectural style for building APIs |

## Practice Exercises

1. Build a simple file server using `http.FileServer`
2. Create a middleware that logs request duration
3. Implement a basic REST API for a todo list
4. Add panic recovery middleware
5. Build a request validation middleware
