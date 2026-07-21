# gqlgen

Generate GraphQL servers in Go with gqlgen.

## Schema Definition

```graphql
# schema.graphql
type Query {
    user(id: ID!): User
    users(limit: Int, offset: Int): [User!]!
    orders(userId: ID!): [Order!]!
}

type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
}

type Subscription {
    userCreated: User!
}

type User {
    id: ID!
    name: String!
    email: String!
    orders: [Order!]!
}

type Order {
    id: ID!
    total: Float!
    status: OrderStatus!
    createdAt: Time!
}

input CreateUserInput {
    name: String!
    email: String!
    password: String!
}

input UpdateUserInput {
    name: String
    email: String
}

enum OrderStatus {
    PENDING
    CONFIRMED
    SHIPPED
    DELIVERED
}

scalar Time
```

## Configuration

```yaml
# gqlgen.yml
schema:
  - schema.graphql

exec:
  filename: graph/generated.go
  package: graph

model:
  filename: graph/models_gen.go
  package: graph

resolver:
  layout: follow-schema
  dir: graph
  package: graph

models:
  User:
    model: github.com/example/myapp/models.User
  Time:
    model: github.com/99designs/gqlgen/graphql.Time
```

## Code Generation

```bash
go run github.com/99designs/gqlgen generate
```

## Server Setup

```go
package main

import (
    "net/http"
    "github.com/99designs/gqlgen/graphql/handler"
    "github.com/99designs/gqlgen/graphql/playground"
    "github.com/example/myapp/graph"
)

func main() {
    srv := handler.NewDefaultServer(
        graph.NewExecutableSchema(
            graph.Config{Resolvers: &graph.Resolver{}},
        ),
    )
    http.Handle("/query", srv)
    http.Handle("/", playground.Handler("GraphQL playground", "/query"))
    http.ListenAndServe(":8080", nil)
}
```

## Practice
1. Define a GraphQL schema for a blog platform
2. Set up gqlgen with custom models
3. Add custom scalar types
