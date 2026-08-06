# Testing & Error Handling

> **Kategori:** GraphQL | **Level:** Menengah | **Minggu 9:** Testing & Error Handling

## Tujuan Pembelajaran

- Test client setup
- Mutation testing
- Query testing
- GraphQLError
- Error extensions

---

## Program: Test GraphQL API

```javascript
// Testing GraphQL API
const { createTestClient } = require('apollo-server-testing');
const { ApolloServer } = require('apollo-server');

// Setup test server
const createTestServer = (context = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ currentUser: { id: '1', role: 'ADMIN' }, ...context }),
  });
  return createTestClient(server);
};

describe('Product API', () => {
  let mutate, query;

  beforeEach(() => {
    const client = createTestServer();
    mutate = client.mutate;
    query = client.query;
  });

  test('create product', async () => {
    const CREATE_PRODUCT = gql`
      mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
          id name price inStock
        }
      }
    `;
    
    const res = await mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: { name: 'Test', price: 1000, stock: 10 } },
    });
    
    expect(res.data.createProduct.name).toBe('Test');
    expect(res.data.createProduct.inStock).toBe(true);
  });

  test('query products', async () => {
    const GET_PRODUCTS = gql`
      query { products { id name price } }
    `;
    const res = await query({ query: GET_PRODUCTS });
    expect(res.data.products).toBeDefined();
  });
});

// Error handling
const resolvers = {
  Query: {
    product: (_, { id }) => {
      const product = findProduct(id);
      if (!product) {
        throw new GraphQLError('Product not found', {
          extensions: { code: 'NOT_FOUND', http: { status: 404 } },
        });
      }
      return product;
    },
  },
};
```

---

## Konsep Kunci

### Test Client
createTestClient untuk integration test.

### Mutation Test
Test mutation dengan variables.

### Query Test
Test query dan cek result.

### Error
GraphQLError dengan extensions.

### Extensions
Custom error code dan HTTP status.

---

## Eksperimen

- Mock resolvers
- Snapshot testing
- E2E testing
- Federation testing

---

## Tantangan

Test suite: unit test, integration test, error handling.

---

## Ringkasan

Minggu 9 dari 10: **Testing & Error Handling** (Menengah).
