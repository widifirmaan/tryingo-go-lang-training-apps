# OSS Etiquette

Best practices for interacting with open source communities.

## Communication Guidelines

```go
type CodeReview struct {
    Feedback   string
    Constructive bool
    Examples    []string
}

func goodFeedback() CodeReview {
    return CodeReview{
        Feedback: "Consider using a sync.Pool here for better performance",
        Constructive: true,
        Examples: []string{
            "Instead of allocating a new buffer each time...",
            "You could reuse buffers like this...",
        },
    }
}

func badFeedback() CodeReview {
    return CodeReview{
        Feedback: "This code is terrible",
        Constructive: false,
    }
}
```

## Issue Reporting

```go
type Issue struct {
    Title       string
    Description string
    Steps       []string
    Expected    string
    Actual      string
    Environment string
    Version     string
}

func newBugReport() Issue {
    return Issue{
        Title: "panic when processing empty order list",
        Steps: []string{
            "Create a user with no orders",
            "GET /api/v1/orders",
        },
        Expected: "Return empty array",
        Actual:   "panic: index out of range",
        Environment: "Go 1.22, Linux amd64",
        Version: "v2.1.0",
    }
}
```

## Maintainer Tips

```go
type Maintainer struct {
    ResponseTime time.Duration
    MergeTime    time.Duration
    ThankYou     bool
}

func goodMaintainer() Maintainer {
    return Maintainer{
        ResponseTime: 24 * time.Hour,
        MergeTime:    7 * 24 * time.Hour,
        ThankYou:     true,
    }
}
```

## Practice
1. Write a helpful code review comment
2. Create a well-structured bug report
3. Review and merge a community PR (if you maintain)
