# Timeouts

Proper timeout configuration is critical for production HTTP clients to avoid resource leaks.

## Client-Level Timeout

```go
// Total timeout for the entire request
client := &http.Client{
    Timeout: 30 * time.Second,
}
```

## Context-Based Timeout

```go
func fetchWithTimeout(ctx context.Context, url string) ([]byte, error) {
    ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
    defer cancel()

    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()

    return io.ReadAll(resp.Body)
}
```

## Transport-Level Timeouts

```go
transport := &http.Transport{
    DialContext:           (&net.Dialer{Timeout: 5 * time.Second}).DialContext,
    TLSHandshakeTimeout:   5 * time.Second,
    ResponseHeaderTimeout: 10 * time.Second,
    ExpectContinueTimeout: 1 * time.Second,
    IdleConnTimeout:       90 * time.Second,
    MaxIdleConns:          100,
    MaxConnsPerHost:       10,
}

client := &http.Client{
    Transport: transport,
    Timeout:   30 * time.Second,
}
```

## Deadline Propagation

```go
func callService(ctx context.Context) (*Response, error) {
    // Propagate parent context with deadline
    req, _ := http.NewRequestWithContext(ctx, "GET", "http://service/api", nil)
    return http.DefaultClient.Do(req)
}
```

## Practice

1. Implement exponential backoff with jitter for retries
2. Set different timeouts for different request types
3. Create a timeout hierarchy (dial < TLS < response < total)
4. Handle context cancellation gracefully
