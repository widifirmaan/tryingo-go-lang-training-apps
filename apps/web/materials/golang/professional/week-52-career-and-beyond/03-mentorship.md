# Mentorship

Become an effective mentor for other Go developers.

## Mentorship Framework

```go
type MentorshipProgram struct {
    MentorName    string
    MenteeName    string
    Duration      time.Duration
    Sessions      int
    Goals         []Goal
    Topics        []Topic
}

type Goal struct {
    Description string
    Deadline    time.Time
    Status      string
}

type Session struct {
    Date    time.Time
    Topic   string
    Notes   string
    ActionItems []string
}
```

## Effective Mentoring

```go
type Mentor struct {
    Name        string
    Experience  int
    Style       string // directive, facilitative, collaborative
    Strengths   []string
}

func (m *Mentor) PlanSession() Session {
    return Session{
        Topic: "Code Review Best Practices",
        Notes: `1. Review PR before session
2. Discuss approach over implementation
3. Focus on patterns, not syntax
4. Provide actionable feedback`,
        ActionItems: []string{
            "Review 3 real PRs in the codebase",
            "Write a code review checklist",
            "Practice giving constructive feedback",
        },
    }
}
```

## Mentoring Topics

```go
var mentoringTopics = []string{
    "Go project structure and organization",
    "Effective error handling",
    "Concurrency patterns",
    "Testing strategies",
    "API design principles",
    "Performance profiling",
    "Code review best practices",
    "Career growth and planning",
    "Open source contributions",
    "Technical communication",
}
```

## Mentorship Checklist

```go
type MentorshipChecklist struct {
    BeforeMentorship []string
    DuringMentorship []string
    AfterMentorship  []string
}

var checklist = MentorshipChecklist{
    BeforeMentorship: []string{
        "Set clear expectations",
        "Define goals and timeline",
        "Establish communication channels",
        "Prepare initial assessment",
    },
    DuringMentorship: []string{
        "Meet regularly (weekly/ biweekly)",
        "Provide actionable feedback",
        "Celebrate wins and progress",
        "Adjust goals as needed",
    },
    AfterMentorship: []string{
        "Review progress against goals",
        "Provide final feedback",
        "Plan next steps",
        "Stay connected",
    },
}
```

## Practice
1. Find a mentee through Go community channels
2. Create a mentorship plan
3. Start weekly mentoring sessions
