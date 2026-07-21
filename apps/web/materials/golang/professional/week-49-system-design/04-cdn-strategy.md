# CDN Strategy

Design Content Delivery Network strategies for global applications.

## CDN Architecture

```go
type CDNConfig struct {
    Provider    string // Cloudflare, Fastly, CloudFront
    Zones       []string
    CachingRules []CacheRule
    PurgeStrategy PurgeStrategy
}

type CacheRule struct {
    PathPattern string
    TTL         time.Duration
    QueryParams []string
    Headers     []string
    StatusCodes []int
}
```

## Cache Headers

```go
func CacheMiddleware(maxAge time.Duration, staleTime time.Duration) func(http.Handler) http.Handler {
    return func(next http.Handler) http.Handler {
        return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
            w.Header().Set("Cache-Control", fmt.Sprintf(
                "public, max-age=%.0f, stale-while-revalidate=%.0f",
                maxAge.Seconds(), staleTime.Seconds(),
            ))
            w.Header().Set("CDN-Cache-Control", fmt.Sprintf(
                "public, max-age=%.0f",
                (maxAge + staleTime).Seconds(),
            ))
            next.ServeHTTP(w, r)
        })
    }
}

func CacheBustingMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Add ETag for validation
        w.Header().Set("ETag", fmt.Sprintf(`"%s"`, generateHash(r.URL.Path)))
        next.ServeHTTP(w, r)
    })
}
```

## Cache Invalidation

```go
type CDNPurger struct {
    provider  string
    apiToken  string
    zoneID    string
}

func (p *CDNPurger) PurgeByURL(ctx context.Context, urls []string) error {
    switch p.provider {
    case "cloudflare":
        return p.purgeCloudflare(ctx, urls)
    case "cloudfront":
        return p.purgeCloudFront(ctx, urls)
    }
    return fmt.Errorf("unsupported provider: %s", p.provider)
}

func (p *CDNPurger) purgeCloudflare(ctx context.Context, urls []string) error {
    body := map[string]interface{}{
        "files": urls,
    }
    data, _ := json.Marshal(body)
    req, _ := http.NewRequestWithContext(ctx, "POST",
        fmt.Sprintf("https://api.cloudflare.com/client/v4/zones/%s/purge_cache", p.zoneID),
        bytes.NewReader(data))
    req.Header.Set("Authorization", "Bearer "+p.apiToken)
    req.Header.Set("Content-Type", "application/json")

    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return err
    }
    return resp.Body.Close()
}
```

## Go CDN Adapter

```go
type CDNAdapter struct {
    baseURL    string
    cdnEnabled bool
}

func (a *CDNAdapter) AssetURL(path string) string {
    if !a.cdnEnabled {
        return path
    }
    return fmt.Sprintf("%s%s", a.baseURL, path)
}

func (a *CDNAdapter) SignedURL(ctx context.Context, path string, expiry time.Duration) (string, error) {
    // Generate signed URL with expiration
    key := sha256.Sum256([]byte("secret"))
    mac := hmac.New(sha256.New, key[:])
    expires := time.Now().Add(expiry).Unix()
    mac.Write([]byte(fmt.Sprintf("%s%d", path, expires)))
    sig := hex.EncodeToString(mac.Sum(nil))
    return fmt.Sprintf("%s%s?expires=%d&sig=%s", a.baseURL, path, expires, sig), nil
}
```

## Practice
1. Configure CDN caching rules for an API
2. Implement cache purge on content update
3. Set up signed URLs for private content
