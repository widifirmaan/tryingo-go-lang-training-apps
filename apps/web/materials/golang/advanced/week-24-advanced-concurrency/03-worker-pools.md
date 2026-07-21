# Worker Pools

Worker pools manage a fixed set of goroutines to process tasks from a shared queue.

## Basic Worker Pool

```go
type Job struct {
    ID       int
    Data     string
}

type Result struct {
    JobID    int
    Output   string
    Err      error
}

func worker(id int, jobs <-chan Job, results chan<- Result) {
    for job := range jobs {
        log.Printf("worker %d processing job %d", id, job.ID)
        output, err := process(job.Data)
        results <- Result{JobID: job.ID, Output: output, Err: err}
    }
}

func main() {
    const numWorkers = 5
    const numJobs = 100

    jobs := make(chan Job, numJobs)
    results := make(chan Result, numJobs)

    // Start workers
    for w := 1; w <= numWorkers; w++ {
        go worker(w, jobs, results)
    }

    // Send jobs
    for j := 1; j <= numJobs; j++ {
        jobs <- Job{ID: j, Data: fmt.Sprintf("data-%d", j)}
    }
    close(jobs)

    // Collect results
    for r := 1; r <= numJobs; r++ {
        result := <-results
        if result.Err != nil {
            log.Printf("job %d failed: %v", result.JobID, result.Err)
        }
    }
}
```

## Pool with Context

```go
type Pool struct {
    jobs    chan func()
    wg      sync.WaitGroup
    ctx     context.Context
    cancel  context.CancelFunc
}

func NewPool(size int) *Pool {
    ctx, cancel := context.WithCancel(context.Background())
    pool := &Pool{
        jobs:   make(chan func()),
        ctx:    ctx,
        cancel: cancel,
    }

    for i := 0; i < size; i++ {
        pool.wg.Add(1)
        go pool.worker()
    }

    return pool
}

func (p *Pool) worker() {
    defer p.wg.Done()
    for {
        select {
        case job, ok := <-p.jobs:
            if !ok {
                return
            }
            job()
        case <-p.ctx.Done():
            return
        }
    }
}

func (p *Pool) Submit(job func()) {
    select {
    case p.jobs <- job:
    case <-p.ctx.Done():
    }
}

func (p *Pool) Shutdown() {
    p.cancel()
    close(p.jobs)
    p.wg.Wait()
}
```

## Dynamic Worker Pool

```go
type DynamicPool struct {
    jobs    chan Job
    results chan Result
    workers int
    mu      sync.Mutex
}

func NewDynamicPool(initial int) *DynamicPool {
    p := &DynamicPool{
        jobs:    make(chan Job, 100),
        results: make(chan Result, 100),
        workers: initial,
    }
    for i := 0; i < initial; i++ {
        go p.worker(i)
    }
    return p
}

func (p *DynamicPool) ScaleUp(n int) {
    p.mu.Lock()
    defer p.mu.Unlock()
    for i := 0; i < n; i++ {
        p.workers++
        go p.worker(p.workers)
    }
}

func (p *DynamicPool) ScaleDown(n int) {
    p.mu.Lock()
    defer p.mu.Unlock()
    for i := 0; i < n && p.workers > 1; i++ {
        p.workers--
        p.jobs <- Job{ID: -1} // sentinel to stop worker
    }
}
```

## Practice

1. Build a worker pool for sending emails
2. Implement graceful shutdown with pending job draining
3. Add metrics (jobs completed, active workers, queue depth)
4. Create a worker pool with priority queue
