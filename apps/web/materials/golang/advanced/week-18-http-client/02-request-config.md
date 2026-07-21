# Request Configuration

Fine-tuning HTTP requests for different scenarios.

## Headers

```go
func setHeaders(req *http.Request) {
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Accept", "application/json")
    req.Header.Set("User-Agent", "MyApp/1.0")
    req.Header.Add("X-Custom-Header", "value1")
    req.Header.Add("X-Custom-Header", "value2")
}
```

## Query Parameters

```go
func buildURL(base string, params map[string]string) string {
    u, _ := url.Parse(base)
    q := u.Query()
    for k, v := range params {
        q.Set(k, v)
    }
    u.RawQuery = q.Encode()
    return u.String()
}
```

## Request Body

```go
// JSON body
type User struct {
    Name  string `json:"name"`
    Email string `json:"email"`
}

func postJSON(client *http.Client, url string, data interface{}) (*http.Response, error) {
    body, err := json.Marshal(data)
    if err != nil {
        return nil, err
    }
    req, err := http.NewRequest("POST", url, bytes.NewReader(body))
    if err != nil {
        return nil, err
    }
    req.Header.Set("Content-Type", "application/json")
    return client.Do(req)
}

// Form data
func postForm(client *http.Client, url string, data map[string]string) (*http.Response, error) {
    values := url.Values{}
    for k, v := range data {
        values.Set(k, v)
    }
    return client.PostForm(url, values)
}
```

## Custom RoundTripper

```go
type LoggingRoundTripper struct {
    next http.RoundTripper
}

func (l LoggingRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
    log.Printf("--> %s %s", req.Method, req.URL)
    start := time.Now()
    resp, err := l.next.RoundTrip(req)
    if err != nil {
        log.Printf("<-- ERROR: %v", err)
        return nil, err
    }
    log.Printf("<-- %s %s %d (%v)", req.Method, req.URL, resp.StatusCode, time.Since(start))
    return resp, nil
}
```

## Practice

1. Build a request builder with fluent API
2. Implement automatic JSON serialization/deserialization
3. Add request signing (e.g., HMAC)
4. Create a multipart form upload helper
