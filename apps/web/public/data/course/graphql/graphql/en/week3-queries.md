# Queries & Fetching Data

> GraphQL | Module 3

## Learning Objectives

- Write queries to fetch data
- Understand field selection and response shape
- Use aliases for same fields
- Understand null handling in response

---

## Program: Read Operations

```graphql
query GetUser {
  user(id: "1") {
    name
    email
    posts {
      title
      body
    }
  }
}

query GetUsers {
  users {
    id
    name
    email
  }
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

Module 3 of 16: **Queries & Fetching Data**. GraphQL is a flexible and efficient API query language. Next week: **Mutations & Writing Data**.
