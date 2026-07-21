# Distributed System Patterns

Common patterns for building reliable distributed systems.

## Two-Phase Commit (2PC)

```go
type Coordinator struct {
    participants []Participant
    timeout      time.Duration
}

func (c *Coordinator) Execute(tx Transaction) error {
    // Phase 1: Prepare
    prepared := make(chan bool, len(c.participants))
    for _, p := range c.participants {
        go func(part Participant) {
            err := part.Prepare(tx)
            prepared <- (err == nil)
        }(p)
    }

    allPrepared := true
    for range c.participants {
        select {
        case ok := <-prepared:
            allPrepared = allPrepared && ok
        case <-time.After(c.timeout):
            allPrepared = false
        }
    }

    // Phase 2: Commit or Abort
    if allPrepared {
        for _, p := range c.participants {
            p.Commit(tx)
        }
        return nil
    }
    for _, p := range c.participants {
        p.Abort(tx)
    }
    return ErrTransactionFailed
}
```

## Distributed Lock

```go
type DistributedLock struct {
    client     *redis.Client
    key        string
    value      string
    ttl        time.Duration
    acquired   bool
}

func (l *DistributedLock) Acquire(ctx context.Context) error {
    ok, err := l.client.SetNX(ctx, l.key, l.value, l.ttl).Result()
    if err != nil {
        return err
    }
    if !ok {
        return ErrLockAcquired
    }
    l.acquired = true
    return nil
}

func (l *DistributedLock) Release(ctx context.Context) error {
    script := `
        if redis.call("get", KEYS[1]) == ARGV[1] then
            return redis.call("del", KEYS[1])
        else
            return 0
        end
    `
    _, err := l.client.Eval(ctx, script, []string{l.key}, l.value).Result()
    l.acquired = false
    return err
}
```

## Leader Follower Pattern

```go
type LeaderFollower struct {
    id        string
    isLeader  bool
    leaderKey string
    client    *redis.Client
    onElected func()
    onDemoted func()
}

func (lf *LeaderFollower) Run(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return
        default:
            err := lf.client.SetNX(ctx, lf.leaderKey, lf.id, 10*time.Second).Err()
            if err == nil {
                if !lf.isLeader {
                    lf.isLeader = true
                    lf.onElected()
                }
                // Renew lease
                lf.client.Expire(ctx, lf.leaderKey, 10*time.Second).Err()
                time.Sleep(5 * time.Second)
            } else {
                if lf.isLeader {
                    lf.isLeader = false
                    lf.onDemoted()
                }
                time.Sleep(1 * time.Second)
            }
        }
    }
}
```

## Watchdog Pattern

```go
type Watchdog struct {
    services  []Service
    interval  time.Duration
    threshold int
}

func (w *Watchdog) Monitor(ctx context.Context) {
    for _, svc := range w.services {
        go w.watch(ctx, svc)
    }
}

func (w *Watchdog) watch(ctx context.Context, svc Service) {
    failures := 0
    for {
        if err := svc.HealthCheck(ctx); err != nil {
            failures++
            if failures >= w.threshold {
                svc.Restart(ctx)
                failures = 0
            }
        } else {
            failures = 0
        }
        time.Sleep(w.interval)
    }
}
```

## Practice
1. Implement a distributed rate limiter
2. Build a service mesh sidecar proxy
3. Create a distributed cron scheduler
