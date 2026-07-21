# The HTTP Client

The `http.Client` sends HTTP requests and receives responses.

## Basic Usage

```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, err := http.Get("https://api.example.com/users")
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, err := io.ReadAll(resp.Body)
    if err != nil {
        panic(err)
    }

    fmt.Println(string(body))
}
```

## Custom Client

```go
client := &http.Client{
    Timeout: 10 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        IdleConnTimeout:     90 * time.Second,
        TLSHandshakeTimeout: 5 * time.Second,
    },
}
```

## Making Requests

```go
// GET with query parameters
req, _ := http.NewRequest("GET", "https://api.example.com/users", nil)
q := req.URL.Query()
q.Add("page", "1")
q.Add("limit", "10")
req.URL.RawQuery = q.Encode()

resp, err := client.Do(req)

// POST with JSON body
data := []byte(`{"name":"John","email":"john@example.com"}`)
req, _ = http.NewRequest("POST", "https://api.example.com/users", bytes.NewBuffer(data))
req.Header.Set("Content-Type", "application/json")
req.Header.Set("Authorization", "Bearer token123")

resp, err = client.Do(req)
```

## Response Handling

```go
func handleResponse(resp *http.Response, err error) error {
    if err != nil {
        return fmt.Errorf("request failed: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
        body, _ := io.ReadAll(resp.Body)
        return fmt.Errorf("unexpected status: %d, body: %s", resp.StatusCode, body)
    }

    return json.NewDecoder(resp.Body).Decode(&target)
}
```

## Practice

1. Write a function that downloads a file from a URL
2. Make concurrent requests to multiple endpoints
3. Implement a retry mechanism for failed requests
4. Parse response headers and cookies
