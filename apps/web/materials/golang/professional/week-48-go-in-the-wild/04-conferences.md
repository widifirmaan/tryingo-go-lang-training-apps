# Conferences and Events

Prepare and participate in Go conferences and events.

## Major Conferences

```go
type Conference struct {
    Name        string
    Location    string
    Month       string
    CFPDeadline string
    Website     string
}

var conferences = []Conference{
    {Name: "GopherCon", Location: "USA", Month: "July", CFPDeadline: "February"},
    {Name: "GopherCon Europe", Location: "Berlin", Month: "June", CFPDeadline: "January"},
    {Name: "GoLab", Location: "Italy", Month: "October", CFPDeadline: "June"},
    {Name: "FOSDEM Go Devroom", Location: "Brussels", Month: "February", CFPDeadline: "December"},
    {Name: "dotGo", Location: "Paris", Month: "November", CFPDeadline: "August"},
}
```

## Talk Proposal

```go
type TalkProposal struct {
    Title       string
    Abstract    string
    Description string
    Notes       string
    Level       string
    Duration    time.Duration
    Tags        []string
    Bio         string
}

func newProposal() TalkProposal {
    return TalkProposal{
        Title: "From Monolith to Microservices: A Go Journey",
        Abstract: "How we migrated a monolith Go application to microservices",
        Description: `In this talk, I'll share our experience migrating a 500K+ line Go monolith to a microservices architecture. We'll cover:
- Identifying service boundaries
- gRPC for inter-service communication
- Migration strategies without downtime
- Lessons learned and pitfalls`,
        Level: "Intermediate",
        Duration: 30 * time.Minute,
        Tags: []string{"microservices", "architecture", "migration"},
        Bio: "Senior Go engineer with 5 years experience building distributed systems",
    }
}
```

## Lightning Talks

```go
type LightningTalk struct {
    Title    string
    Duration time.Duration
    Slides   int
}

func newLightningTalk() LightningTalk {
    return LightningTalk{
        Title:    "Testing with Fuzzing in Go",
        Duration: 5 * time.Minute,
        Slides:   5,
    }
}

// Tips for lightning talks:
// 1. One idea per talk
// 2. Demo-ready code
// 3. Practice timing
// 4. Leave time for questions
```

## Practice
1. Write a conference talk proposal
2. Prepare a lightning talk
3. Submit a CFP to a Go conference
