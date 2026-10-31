# Apollo Server & Client

> **Kategori:** GraphQL | **Level:** Pemula | **Minggu 5:** Apollo Server & Client

## Kenapa Materi Ini Penting

GraphQL menggantikan pola "satu endpoint satu bentuk data" REST dengan satu query fleksibel — dipakai GitHub, Shopify, dan banyak aplikasi mobile hemat payload. Bagus untuk project yang frontend-nya sering berubah bentuk data.

Di minggu ke-5 — bertajuk **"Apollo Server & Client"** — program latihan utamanya adalah *"Setup Server GraphQL"*. Kerjakan programnya di Playground dulu, ubah sedikit demi sedikit, lalu baca penjelasan konsepnya.


## Tujuan Pembelajaran

- Setup Apollo Server
- typeDefs dan resolvers
- Context dan auth
- Apollo Client
- useQuery hook

---

## Program: Setup Server GraphQL

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
# Week 5 — Query pertama terhadap Apollo Server yang aktif
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

## Konsep Kunci

### Apollo Server
Library untuk buat GraphQL server.

### typeDefs
Schema dalam bentuk template literal.

### Context
Buat context untuk auth/database.

### Apollo Client
State management untuk GraphQL.

### useQuery
React hook untuk fetch data.

---

## Eksperimen

- Subscriptions client
- Mutation hook
- Cache updates
- Error policies

---

## Tantangan

Setup server + client: query dan mutation lengkap.

---

## Ringkasan

Minggu 5 dari 10: **Apollo Server & Client** (Pemula).
