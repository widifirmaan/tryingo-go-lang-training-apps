## Why This Matters

GraphQL replaces REST's "one endpoint, one data shape" with a single flexible query - used by GitHub, Shopify, and many payload-sensitive mobile apps. Great for products where the frontend keeps changing what data it needs.

Practice program: *"Setup GraphQL Server"*. Run the code in the Playground to examine how it works.


## Learning Objectives

- Setup Apollo Server
- typeDefs and resolvers
- Context and auth
- Apollo Client
- useQuery hook

---

## Program: Setup GraphQL Server

```javascript
// Setup Apollo Server + Client

// SERVER
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = `#graphql
  type Query {
    hello: String
    products: [Product]
    product(id: ID!): Product
  }
  
  type Mutation {
    createProduct(input: CreateProductInput!): Product!
  }
  
  type Product {
    id: ID!
    name: String!
    price: Float!
    inStock: Boolean!
  }
  
  input CreateProductInput {
    name: String!
    price: Float!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello GraphQL!',
    products: () => [],
    product: (_, { id }) => null,
  },
  Mutation: {
    createProduct: (_, { input }) => ({
      id: '1',
      ...input,
      inStock: true,
    }),
  },
};

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => ({
      token: req.headers.authorization,
    }),
  });
  console.log(`Server ready at ${url}`);
}

// CLIENT (React)
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const GET_PRODUCTS = gql`
  query GetProducts {
    products { id name price inStock }
  }
`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return 'Loading...';
  if (error) return `Error: ${error.message}`;
  return data.products.map(p => `${p.name}: Rp${p.price}`).join('\n');
}
```


## Playground: GraphQL Operations

```graphql
# Week 5 - Query pertama terhadap Apollo Server yang aktif
query ServerBoot {
  engineering: employeesByDepartment(department: "Engineering") {
    name
    salary
  }
  completed: ordersByStatus(status: "completed") {
    id
    total
  }
}
```

---

## Key Concepts

### Apollo Server
Library for creating GraphQL servers.

### typeDefs
Schema as template literal.

### Context
Create context for auth/database.

### Apollo Client
State management for GraphQL.

### useQuery
React hook for fetching data.

---

## Experiments

- Subscription clients
- Mutation hooks
- Cache updates
- Error policies

---

## Challenge

Setup server + client: complete queries and mutations.

---

## Summary

Week 5 of 10: **Apollo Server & Client** (Beginner).
