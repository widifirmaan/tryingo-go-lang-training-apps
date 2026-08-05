# Testing GraphQL APIs

> GraphQL | Module 15

## Learning Objectives

- Write tests for GraphQL resolvers
- Use Apollo Server testing utilities
- Test queries, mutations, and subscriptions
- Understand integration testing

---

## Program: Test Suite

```graphql
const { ApolloServerTestClient } = require('apollo-server-testing');

test('returns user by id', async () => {
  const result = await server.executeOperation({
    query: 'query { user(id: "1") { name } }',
  });
  expect(result.data.user.name).toBe('Budi');
});
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

Module 15 of 16: **Testing GraphQL APIs**. GraphQL is a flexible and efficient API query language. Next week: **Capstone: Full GraphQL API**.
