# Introduction to GraphQL & Setup

> GraphQL | Module 1

## Learning Objectives

- Understand GraphQL as an alternative to REST API
- Install GraphQL server (Apollo Server)
- Understand schema, query, and resolver concepts
- Run GraphQL server and test in GraphQL Playground

---

## Program: Hello GraphQL

```graphql
const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('Server ready at ' + url));
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

Module 1 of 16: **Introduction to GraphQL & Setup**. GraphQL is a flexible and efficient API query language. Next week: **Schema Definition Language (SDL)**.
