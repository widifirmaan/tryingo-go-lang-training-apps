# Federation & Microservices

> GraphQL | Module 14

## Learning Objectives

- Understand GraphQL Federation
- Use Apollo Federation for microservices
- Define federated schema
- Combine multiple subgraphs

---

## Program: Distributed Schema

```graphql
const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0")

  type User @key(fields: "id") {
    id: ID!
    name: String!
  }
`;
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

Module 14 of 16: **Federation & Microservices**. GraphQL is a flexible and efficient API query language. Next week: **Testing GraphQL APIs**.
