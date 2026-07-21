# Code Review

Conduct effective code reviews for Go projects.

## Review Checklist

```go
// Checklist for Go code review:
// 1. Error handling
// 2. Concurrency safety
// 3. Interface design
// 4. Performance concerns
// 5. Security issues
// 6. Testing coverage
// 7. Code organization
// 8. API design
// 9. Documentation
// 10. Compatibility
```

## Common Issues to Catch

```go
// BAD: Ignoring errors
json.Unmarshal(data, &result)

// GOOD: Handle errors
if err := json.Unmarshal(data, &result); err != nil {
    return fmt.Errorf("parse response: %w", err)
}

// BAD: Using background context
db.QueryContext(context.Background(), query)

// GOOD: Request-scoped context
db.QueryContext(ctx, query)

// BAD: Goroutine leak
go func() {
    for msg := range ch {
        process(msg)
    }
}()

// GOOD: Cancellable goroutine
go func() {
    for {
        select {
        case msg, ok := <-ch:
            if !ok {
                return
            }
            process(msg)
        case <-ctx.Done():
            return
        }
    }
}()
```

## Review Process

```go
type Review struct {
    ID           string
    Author       string
    Reviewer     string
    PR           string
    Comments     []Comment
    Status       ReviewStatus
    CreatedAt    time.Time
}

type Comment struct {
    File     string
    Line     int
    Message  string
    Severity Severity
    Resolved bool
}

type ReviewStatus int

const (
    Pending ReviewStatus = iota
    ChangesRequested
    Approved
)

func (r *Review) Approve() {
    if r.Status == ChangesRequested {
        return // cannot approve with unresolved changes
    }
    r.Status = Approved
}
```

## Practice
1. Review a sample Go PR with intentional issues
2. Create a code review checklist for your team
3. Practice giving constructive feedback
