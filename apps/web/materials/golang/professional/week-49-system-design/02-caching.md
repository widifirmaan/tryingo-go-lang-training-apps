# Caching Strategies

Design and implement caching layers for Go applications.

## Cache Types

```go
type CacheStrategy int

const (
    CacheAside CacheStrategy = iota
    ReadThrough
    WriteThrough
    WriteBehind
    RefreshAhead
)
```

## Cache-Aside Pattern

```go
type CacheAside struct {
    cache    *redis.Client
    store    Database
    ttl      time.Duration
}

func (c *CacheAside) Get(ctx context.Context, key string) (interface{}, error) {
    val, err := c.cache.Get(ctx, key).Result()
    if err == nil {
        return val, nil
    }

    val, err = c.store.Get(ctx, key)
    if err != nil {
        return nil, err
    }

    c.cache.Set(ctx, key, val, c.ttl)
    return val, nil
}

func (c *CacheAside) Set(ctx context.Context, key string, value interface{}) error {
    if err := c.store.Set(ctx, key, value); err != nil {
        return err
    }
    return c.cache.Del(ctx, key).Err() // Invalidate cache
}
```

## Write-Through Cache

```go
type WriteThrough struct {
    cache *redis.Client
    store Database
    ttl   time.Duration
}

func (c *WriteThrough) Set(ctx context.Context, key string, value interface{}) error {
    if err := c.store.Set(ctx, key, value); err != nil {
        return err
    }
    return c.cache.Set(ctx, key, value, c.ttl).Err()
}
```

## Multi-Level Cache

```go
type MultiLevelCache struct {
    L1 *LocalCache    // In-memory, fast
    L2 *redis.Client  // Redis, distributed
    L3 Database       // Database, source of truth
    stats CacheStats
}

type CacheStats struct {
    L1Hits   int64
    L2Hits   int64
    L3Hits   int64
    Misses   int64
}

func (c *MultiLevelCache) Get(ctx context.Context, key string) (interface{}, error) {
    if val, err := c.L1.Get(key); err == nil {
        atomic.AddInt64(&c.stats.L1Hits, 1)
        return val, nil
    }
    if val, err := c.L2.Get(ctx, key).Result(); err == nil {
        atomic.AddInt64(&c.stats.L2Hits, 1)
        c.L1.Set(key, val)
        return val, nil
    }
    val, err := c.L3.Get(ctx, key)
    if err != nil {
        atomic.AddInt64(&c.stats.Misses, 1)
        return nil, err
    }
    atomic.AddInt64(&c.stats.L3Hits, 1)
    c.L2.Set(ctx, key, val, 5*time.Minute)
    c.L1.Set(key, val)
    return val, nil
}
```

## Cache Invalidation

```go
type CacheInvalidator struct {
    cache    *redis.Client
    patterns []string
}

func (ci *CacheInvalidator) InvalidatePattern(ctx context.Context, pattern string) error {
    iter := ci.cache.Scan(ctx, 0, pattern, 0).Iterator()
    for iter.Next(ctx) {
        ci.cache.Del(ctx, iter.Val())
    }
    return iter.Err()
}

func (ci *CacheInvalidator) InvalidateByPrefix(ctx context.Context, prefix string) error {
    return ci.InvalidatePattern(ctx, prefix+"*")
}
```

## Practice
1. Implement a cache-aside pattern with Redis
2. Build a multi-level cache with stats
3. Create a distributed cache invalidation system
