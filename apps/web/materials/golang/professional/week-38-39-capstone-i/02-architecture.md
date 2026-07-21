# System Architecture

Design the architecture for your capstone project.

## High-Level Architecture

```go
type Architecture struct {
    Name        string
    Description string
    Components  []Component
    DataFlow    []Flow
    Constraints []string
}

type Component struct {
    Name     string
    Type     string // service, queue, database, cache
    Scalable bool
    Language string
}

var arch = Architecture{
    Name: "E-Commerce Platform",
    Components: []Component{
        {Name: "API Gateway", Type: "service", Scalable: true, Language: "Go"},
        {Name: "User Service", Type: "service", Scalable: true, Language: "Go"},
        {Name: "Product Service", Type: "service", Scalable: true, Language: "Go"},
        {Name: "Order Service", Type: "service", Scalable: true, Language: "Go"},
        {Name: "Payment Service", Type: "service", Scalable: true, Language: "Go"},
        {Name: "NATS", Type: "queue", Scalable: true},
        {Name: "PostgreSQL", Type: "database", Scalable: false},
        {Name: "Redis", Type: "cache", Scalable: true},
    },
}
```

## Service Decomposition

```go
type ServiceBoundary struct {
    Name        string
    Domain      string
    Responsibilities []string
    Dependencies     []string
    API          []APIEndpoint
    DataStore    string
}

func defineServices() []ServiceBoundary {
    return []ServiceBoundary{
        {
            Name:   "User Service",
            Domain: "Identity & Access",
            Responsibilities: []string{
                "User registration and authentication",
                "Profile management",
                "Role-based access control",
            },
            Dependencies: []string{"User DB"},
            DataStore:    "PostgreSQL",
        },
        {
            Name:   "Order Service",
            Domain: "Order Management",
            Responsibilities: []string{
                "Order creation and processing",
                "Order status tracking",
                "Inventory validation",
            },
            Dependencies: []string{"User Service", "Product Service", "Order DB"},
            DataStore:    "PostgreSQL",
        },
    }
}
```

## C4 Model Documentation

```go
// System Context diagram
type SystemContext struct {
    System      string
    Users       []string
    ExternalSystems []string
    Relationships []Relation
}

// Container diagram
type Container struct {
    Name        string
    Technology  string
    Description string
    Responsibilities []string
}
```

## Practice
1. Draw C4 model diagrams for your architecture
2. Define data flow between services
3. Document technology stack decisions
