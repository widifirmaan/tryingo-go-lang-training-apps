# Subscriptions & Realtime

> GraphQL | Module 9

## Learning Objectives

- Understand GraphQL subscriptions
- Implement WebSocket for real-time
- Use pub/sub for event broadcasting
- Build a real-time chat feature

---

## Program: Real-time Updates

```graphql
type Subscription {
  postAdded: Post!
  commentAdded(postId: ID!): Comment!
}

const resolvers = {
  Subscription: {
    postAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('POST_ADDED'),
        (payload, variables) => payload.postAdded.authorId === variables.userId
      ),
    },
  },
};
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

Module 9 of 16: **Subscriptions & Realtime**. GraphQL is a flexible and efficient API query language. Next week: **Pagination & Connections**.
