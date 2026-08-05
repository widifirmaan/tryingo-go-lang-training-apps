# Schema Definition Language (SDL)

> GraphQL | Module 2

## Learning Objectives

- Understand GraphQL SDL (Schema Definition Language)
- Define object types, query, and mutation
- Use field types and nullable/non-null
- Create a valid schema

---

## Program: Defining Types

```graphql
type Query {
  user(id: ID!): User
  users: [User!]!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  author: User!
}
```

---

## Explanation

GraphQL is a query language for APIs that allows clients to specify exactly what data they need.
Schema defines the data types and operations available.
Resolvers connect schema fields to data sources.
GraphQL replaces REST with a single endpoint and query flexibility.

---

## Experiments

- Change the query and see the response change
- Add a new type to the schema
- Try nested query for hierarchical data

---

## Challenge

Build a complete GraphQL API with queries, mutations, and subscriptions.
Implement authentication and pagination.

---

## Summary

Module 2 of 16: **Schema Definition Language (SDL)**. GraphQL is a flexible and efficient API query language. Next week: **Queries & Fetching Data**.
