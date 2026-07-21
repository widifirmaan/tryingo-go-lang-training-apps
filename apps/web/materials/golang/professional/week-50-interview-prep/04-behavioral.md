# Behavioral Questions

Prepare for behavioral interviews using the STAR method.

## STAR Method

```go
type STAR struct {
    Situation  string
    Task       string
    Action     string
    Result     string
}

// Prepare stories for:
var commonQuestions = []string{
    "Tell me about a challenging project",
    "Describe a time you had a conflict",
    "When did you fail and what did you learn",
    "Tell me about a time you showed leadership",
    "Describe your ideal work environment",
    "Why do you want to work here?",
    "Where do you see yourself in 5 years?",
}
```

## Example Stories

```go
func leadershipStory() STAR {
    return STAR{
        Situation: "Our team was struggling with production incidents",
        Task:      "Reduce incident response time and improve reliability",
        Action: `- Introduced structured logging and monitoring
- Set up on-call rotation with runbooks
- Automated deployment rollback`,
        Result:   "Reduced incident response time from 2 hours to 15 minutes",
    }
}

func conflictStory() STAR {
    return STAR{
        Situation: "Disagreement on moving from monolith to microservices",
        Task:      "Make architectural decision with team consensus",
        Action: `- Created proof of concept showing benefits
- Addressed concerns about complexity
- Proposed gradual migration strategy`,
        Result:   "Team agreed on phased migration approach",
    }
}

func failureStory() STAR {
    return STAR{
        Situation: "Deployed breaking change to production",
        Task:      "Fix the issue and prevent recurrence",
        Action: `- Immediately rolled back the deployment
- Implemented canary deployments
- Added integration tests for backward compatibility`,
        Result:   "Zero similar incidents in the following year",
    }
}
```

## Questions to Ask

```go
var questionsToAsk = []string{
    "What does the team's on-call rotation look like?",
    "How does the team handle technical debt?",
    "What's the current biggest technical challenge?",
    "How do you approach code reviews?",
    "What is the promotion process?",
    "How do you support professional development?",
}
```

## Practice
1. Write 5 STAR stories from your experience
2. Practice answering common questions
3. Prepare 3 questions to ask the interviewer
