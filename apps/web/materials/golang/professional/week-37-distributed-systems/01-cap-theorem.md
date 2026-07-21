# CAP Theorem

Understand the CAP theorem and its implications for distributed system design.

## The Theorem

CAP states that a distributed system can only provide two of three guarantees:
- **Consistency**: Every read receives the most recent write
- **Availability**: Every request receives a (non-error) response
- **Partition Tolerance**: System continues despite network failures

## CP System (Consistency + Partition Tolerance)

```go
type CPStore struct {
    mu         sync.RWMutex
    data       map[string]string
    version    int64
    replicas   []ReplicaClient
    quorumSize int
}

func (s *CPStore) Write(key, value string) error {
    s.mu.Lock()
    version := s.version + 1
    s.mu.Unlock()

    successes := 0
    for _, replica := range s.replicas {
        if err := replica.Write(key, value, version); err == nil {
            successes++
        }
    }
    if successes < s.quorumSize {
        return ErrWriteFailed
    }
    s.mu.Lock()
    s.data[key] = value
    s.version = version
    s.mu.Unlock()
    return nil
}

func (s *CPStore) Read(key string) (string, error) {
    type readResult struct {
        value   string
        version int64
    }
    results := make(chan readResult, len(s.replicas))
    for _, replica := range s.replicas {
        go func(r ReplicaClient) {
            val, ver, err := r.Read(key)
            if err == nil {
                results <- readResult{val, ver}
            }
        }(replica)
    }
    // Pick the highest version (most recent)
    var latest readResult
    for i := 0; i < s.quorumSize; i++ {
        select {
        case result := <-results:
            if result.version > latest.version {
                latest = result
            }
        case <-time.After(1 * time.Second):
            return "", ErrReadTimeout
        }
    }
    return latest.value, nil
}
```

## AP System (Availability + Partition Tolerance)

```go
type APStore struct {
    data     sync.Map
    conflicts chan Conflict
}

type Conflict struct {
    Key       string
    OldValue  string
    NewValue  string
    Timestamp time.Time
}

func (s *APStore) Write(key, value string) {
    now := time.Now()
    s.data.Store(key, VersionedValue{
        Value:     value,
        Timestamp: now,
    })
    // Eventually replicate
    go s.eventualReplicate(key, value, now)
}

func (s *APStore) Read(key string) (string, error) {
    val, ok := s.data.Load(key)
    if !ok {
        return "", ErrNotFound
    }
    return val.(VersionedValue).Value, nil
}
```

## Tradeoffs in Practice

```go
type SystemConfig struct {
    ConsistencyLevel Consistency
    Timeout          time.Duration
    RetryPolicy      RetryStrategy
}

type Consistency int

const (
    Eventual Consistency = iota
    Causal
    Linearizable
)

func ChooseSystem(req Request) *SystemConfig {
    switch req.Type {
    case AccountBalance:
        // Strong consistency for financial data
        return &SystemConfig{
            ConsistencyLevel: Linearizable,
            Timeout:          500 * time.Millisecond,
        }
    case UserProfile:
        // Eventual consistency for user profiles
        return &SystemConfig{
            ConsistencyLevel: Eventual,
            Timeout:          100 * time.Millisecond,
        }
    }
}
```

## Practice
1. Design a CP system for financial transactions
2. Build an AP system for social media feeds
3. Compare consistency models in production systems
