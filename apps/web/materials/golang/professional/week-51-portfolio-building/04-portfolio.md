# Portfolio

Build a comprehensive professional portfolio.

## Portfolio Structure

```go
type Portfolio struct {
    Name        string
    Title       string
    Summary     string
    Skills      []Skill
    Projects    []Project
    Experience  []Experience
    Education   []Education
    BlogPosts   []BlogPost
    Talks       []Talk
    Contact     Contact
}

type Skill struct {
    Category string
    Items    []string
}

type Project struct {
    Name        string
    Description string
    TechStack   []string
    URL         string
    GitHub      string
    Highlights  []string
}
```

## Example Portfolio

```javascript
// Portfolio website data
const portfolio = {
  name: "Jane Doe",
  title: "Go Software Engineer",
  summary: "Backend engineer specializing in distributed systems and cloud-native Go applications.",
  skills: [
    { category: "Languages", items: ["Go", "Python", "JavaScript"] },
    { category: "Databases", items: ["PostgreSQL", "Redis", "DynamoDB"] },
    { category: "Tools", items: ["Docker", "Kubernetes", "Terraform"] },
  ],
  projects: [
    {
      name: "Order Service",
      description: "Event-driven order management microservice",
      techStack: ["Go", "gRPC", "NATS", "PostgreSQL"],
      highlights: [
        "Designed CQRS-based architecture",
        "Implemented OpenTelemetry tracing",
        "Reduced latency by 40%"
      ]
    }
  ],
  experience: [
    {
      company: "Tech Corp",
      role: "Senior Go Engineer",
      period: "2023 - Present",
      achievements: [
        "Led microservices migration",
        "Mentored 3 junior engineers",
        "Reduced deployment time by 60%"
      ]
    }
  ]
};
```

## Resume Template

```markdown
# Jane Doe
jane@example.com | github.com/janedoe | linkedin.com/in/janedoe

## Summary
Go backend engineer with 5 years building distributed systems.

## Experience
**Senior Go Engineer** | Tech Corp | 2023-Present
- Architected microservices platform handling 10M+ daily requests
- Implemented event sourcing with NATS JetStream
- Reduced p95 latency from 500ms to 120ms

**Go Developer** | Startup Inc | 2021-2023
- Built REST and gRPC APIs for SaaS platform
- Set up CI/CD with GitHub Actions
- Achieved 95% test coverage

## Open Source
- **gocache** - Distributed caching library (500+ stars)
- **cobra** - Contributor to CLI framework

## Skills
Go, gRPC, GraphQL, Docker, Kubernetes, PostgreSQL, Redis, NATS, Kafka
```

## Practice
1. Create a portfolio website
2. Update your LinkedIn profile
3. Build a portfolio project highlighting Go skills
