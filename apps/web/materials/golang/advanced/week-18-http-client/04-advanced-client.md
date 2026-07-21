# Advanced Client Patterns

Production-grade HTTP client patterns for microservices communication.

## Connection Pooling

```go
transport := &http.Transport{
    MaxIdleConns:        200,
    MaxIdleConnsPerHost: 20,
    MaxConnsPerHost:     50,
    IdleConnTimeout:     90 * time.Second,
    DisableCompression:  false,
}

client := &http.Client{
    Transport: transport,
    Timeout:   30 * time.Second,
}
```

## Retry with Backoff

```go
func retryDo(client *http.Client, req *http.Request, maxRetries int) (*http.Response, error) {
    var resp *http.Response
    var err error

    for i := 0; i <= maxRetries; i++ {
        resp, err = client.Do(req)
        if err == nil && resp.StatusCode < 500 {
            return resp, nil
        }

        if resp != nil {
            resp.Body.Close()
        }

        if i < maxRetries {
            backoff := time.Duration(math.Pow(2, float64(i))) * time.Second
            jitter := time.Duration(rand.Intn(1000)) * time.Millisecond
            time.Sleep(backoff + jitter)
        }
    }
    return nil, fmt.Errorf("request failed after %d retries: %w", maxRetries, err)
}
```

## Building an API Client

```go
type APIClient struct {
    baseURL    string
    httpClient *http.Client
    authToken  string
}

func NewAPIClient(baseURL, token string) *APIClient {
    return &APIClient{
        baseURL: strings.TrimRight(baseURL, "/"),
        httpClient: &http.Client{
            Timeout: 10 * time.Second,
            Transport: &http.Transport{
                MaxIdleConns:    20,
                IdleConnTimeout: 30 * time.Second,
            },
        },
        authToken: token,
    }
}

func (c *APIClient) newRequest(method, path string, body interface{}) (*http.Request, error) {
    url := c.baseURL + "/" + strings.TrimLeft(path, "/")
    var buf io.ReadWriter
    if body != nil {
        buf = new(bytes.Buffer)
        if err := json.NewEncoder(buf).Encode(body); err != nil {
            return nil, err
        }
    }
    req, err := http.NewRequest(method, url, buf)
    if err != nil {
        return nil, err
    }
    req.Header.Set("Authorization", "Bearer "+c.authToken)
    req.Header.Set("Content-Type", "application/json")
    return req, nil
}

func (c *APIClient) Do(req *http.Request, v interface{}) (*http.Response, error) {
    resp, err := c.httpClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()

    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error: %s", resp.Status)
    }

    if v != nil {
        if err := json.NewDecoder(resp.Body).Decode(v); err != nil {
            return nil, err
        }
    }
    return resp, nil
}

func (c *APIClient) GetUsers(ctx context.Context) ([]User, error) {
    req, err := c.newRequest("GET", "/users", nil)
    if err != nil {
        return nil, err
    }
    req = req.WithContext(ctx)

    var users []User
    _, err = c.Do(req, &users)
    return users, err
}
```

## Circuit Breaker Pattern

```go
type CircuitBreaker struct {
    failures    int
    maxFailures int
    timeout     time.Duration
    lastFailure time.Time
    mu          sync.Mutex
}

func (cb *CircuitBreaker) Call(fn func() (*http.Response, error)) (*http.Response, error) {
    cb.mu.Lock()
    if cb.failures >= cb.maxFailures {
        if time.Since(cb.lastFailure) < cb.timeout {
            cb.mu.Unlock()
            return nil, fmt.Errorf("circuit breaker open")
        }
        cb.failures = 0
    }
    cb.mu.Unlock()

    resp, err := fn()
    if err != nil {
        cb.mu.Lock()
        cb.failures++
        cb.lastFailure = time.Now()
        cb.mu.Unlock()
        return nil, err
    }

    cb.mu.Lock()
    cb.failures = 0
    cb.mu.Unlock()
    return resp, nil
}
```

## Practice

1. Build a complete API client for GitHub REST API
2. Implement connection pooling with metrics
3. Add circuit breaker to a microservice client
4. Implement request deduplication for concurrent calls
