# Week 18: HTTP Client

Go's `net/http` package provides a powerful HTTP client. Mastering the client is essential for building services that communicate with external APIs and other microservices.

## Topics

- `http.Client` and `http.Transport`
- Making requests with proper configuration
- Timeouts and context cancellation
- Connection pooling and reuse
- Advanced client patterns

## Goals

- Make GET, POST, PUT, DELETE requests correctly
- Configure timeouts at every level
- Customize transport for performance
- Build reusable API client packages

## Key Concepts

| Concept | Description |
|---------|-------------|
| http.Client | High-level HTTP client with configurable policies |
| http.Transport | Low-level HTTP transport with connection pooling |
| RoundTripper | Interface for executing HTTP requests |
| Context | Request-scoped cancellation and deadlines |
| Connection Pool | Reuse TCP connections for performance |

## Practice Exercises

1. Make GET requests with query parameters
2. POST JSON data to an API endpoint
3. Configure per-request and per-client timeouts
4. Implement automatic retry logic
5. Build a reusable API client for a public API
