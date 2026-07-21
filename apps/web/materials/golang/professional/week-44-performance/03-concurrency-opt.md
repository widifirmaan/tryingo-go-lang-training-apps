# Concurrency Optimization

Optimize concurrent Go programs for maximum throughput.

## Worker Pool Pattern

```go
type WorkerPool struct {
    tasks    chan Task
    results  chan Result
    workers  int
    wg       sync.WaitGroup
}

func NewWorkerPool(workers int) *WorkerPool {
    return &WorkerPool{
        tasks:   make(chan Task, 100),
        results: make(chan Result, 100),
        workers: workers,
    }
}

func (p *WorkerPool) Start() {
    for i := 0; i < p.workers; i++ {
        p.wg.Add(1)
        go p.worker(i)
    }
}

func (p *WorkerPool) worker(id int) {
    defer p.wg.Done()
    for task := range p.tasks {
        result := task.Process()
        p.results <- result
    }
}
```

## Pipeline Pattern

```go
func pipeline(done <-chan struct{}, input <-chan int) <-chan int {
    // Stage 1: Multiply by 2
    stage1 := func(done <-chan struct{}, in <-chan int) <-chan int {
        out := make(chan int)
        go func() {
            defer close(out)
            for v := range in {
                select {
                case out <- v * 2:
                case <-done:
                    return
                }
            }
        }()
        return out
    }

    // Stage 2: Add 1
    stage2 := func(done <-chan struct{}, in <-chan int) <-chan int {
        out := make(chan int)
        go func() {
            defer close(out)
            for v := range in {
                select {
                case out <- v + 1:
                case <-done:
                    return
                }
            }
        }()
        return out
    }

    return stage2(done, stage1(done, input))
}
```

## Fan-Out/Fan-In

```go
func fanOut(done <-chan struct{}, input <-chan int, n int) []<-chan int {
    channels := make([]<-chan int, n)
    for i := 0; i < n; i++ {
        channels[i] = process(done, input)
    }
    return channels
}

func fanIn(done <-chan struct{}, channels []<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for v := range c {
                select {
                case out <- v:
                case <-done:
                    return
                }
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}
```

## Contention Reduction

```go
// Bad: Single mutex for everything
type BadCache struct {
    mu    sync.Mutex
    data  map[string]string
    stats map[string]int
}

// Good: Sharded mutex
type Shard struct {
    mu   sync.RWMutex
    data map[string]string
}

type ShardedCache struct {
    shards [256]*Shard
}

func (c *ShardedCache) getShard(key string) *Shard {
    h := fnv.New32a()
    h.Write([]byte(key))
    return c.shards[h.Sum32()%256]
}

func (c *ShardedCache) Get(key string) (string, bool) {
    s := c.getShard(key)
    s.mu.RLock()
    defer s.mu.RUnlock()
    v, ok := s.data[key]
    return v, ok
}
```

## Practice
1. Implement a streaming pipeline
2. Build a fan-out/fan-in service
3. Reduce mutex contention with sharding
