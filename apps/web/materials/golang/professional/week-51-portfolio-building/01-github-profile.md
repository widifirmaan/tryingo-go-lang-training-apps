# GitHub Profile

Create an impressive GitHub profile that showcases your Go expertise.

## Profile README

```markdown
# Hi, I'm Jane Doe 👋

**Go Software Engineer** | **Distributed Systems Enthusiast**

I build scalable backend systems with Go, focusing on microservices,
observability, and developer experience.

## 🔧 Technologies & Tools

![](https://img.shields.io/badge/Code-Go-informational?style=flat&logo=go&logoColor=white&color=00ADD8)
![](https://img.shields.io/badge/Code-GraphQL-informational?style=flat&logo=graphql&color=E10098)
![](https://img.shields.io/badge/Tools-Docker-informational?style=flat&logo=docker&color=2496ED)
![](https://img.shields.io/badge/Tools-Kubernetes-informational?style=flat&logo=kubernetes&color=326CE5)
![](https://img.shields.io/badge/Cloud-AWS-informational?style=flat&logo=amazon-aws&color=FF9900)

## 📌 Pinned Projects

### [order-service](https://github.com/janedoe/order-service)
Microservice for order management with gRPC, event sourcing, and CQRS.
- Go, PostgreSQL, NATS, Redis
- OpenTelemetry tracing, Prometheus metrics
- Helm chart, GitHub Actions CI/CD

### [gocache](https://github.com/janedoe/gocache)
Distributed caching library with multi-level support.
- In-memory, Redis, and database cache layers
- Cache invalidation patterns
- 95% test coverage

## 📊 GitHub Stats

![GitHub stats](https://github-readme-stats.vercel.app/api?username=janedoe&show_icons=true&hide_title=true)

## 📝 Latest Blog Posts

- [Building Event-Driven Microservices in Go](link)
- [Profiling Go Applications: A Practical Guide](link)
```

## Contribution Graph

```go
type GitHubContribution struct {
    Date        time.Time
    Count       int
    Repo        string
    Type        string // commit, pr, issue
}

func generateActivity() []GitHubContribution {
    return []GitHubContribution{
        {Date: time.Now(), Count: 5, Repo: "order-service", Type: "commit"},
        {Date: time.Now(), Count: 1, Repo: "gocache", Type: "pr"},
    }
}
```

## Practice
1. Create a GitHub profile README
2. Pin your best Go projects
3. Add contribution activity badges
