# Requirements Gathering

Define clear, actionable requirements for your capstone project.

## User Stories

```go
type UserStory struct {
    ID          string
    Title       string
    Description string
    Acceptance  []string
    Priority    Priority
    StoryPoints int
}

type Priority int

const (
    P0 Critical Priority = iota
    P1 High
    P2 Medium
    P3 Low
)

// Example stories
var stories = []UserStory{
    {
        ID: "US-001",
        Title: "User Registration",
        Description: "As a visitor, I want to register an account",
        Acceptance: []string{
            "Email and password required",
            "Email verification sent",
            "Password must be 8+ characters",
        },
        Priority: P0,
    },
    {
        ID: "US-002",
        Title: "Product Search",
        Description: "As a customer, I want to search products",
        Acceptance: []string{
            "Search by name and description",
            "Filter by category and price range",
            "Results paginated at 20 per page",
        },
        Priority: P1,
    },
}
```

## Technical Requirements

```go
type TechRequirement struct {
    Category    string
    Description string
    MustHave    bool
    Constraints []string
}

var techReqs = []TechRequirement{
    {
        Category: "Performance",
        Description: "API response time under 200ms p95",
        MustHave: true,
        Constraints: []string{"Use Redis caching", "Database indexing"},
    },
    {
        Category: "Availability",
        Description: "99.9% uptime SLA",
        MustHave: true,
        Constraints: []string{"Multi-region deployment", "Health checks"},
    },
    {
        Category: "Security",
        Description: "OWASP Top 10 compliance",
        MustHave: true,
        Constraints: []string{"Rate limiting", "Input validation"},
    },
}
```

## Practice
1. Write 20 user stories for your capstone
2. Define acceptance criteria for each story
3. Create a requirements traceability matrix
