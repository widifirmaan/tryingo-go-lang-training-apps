import { BaseGenerator } from './lib/base-generator.mjs';

const gen = new BaseGenerator('graphql', 'GraphQL');

const LEVELS = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Dasar GraphQL: schema, query, mutation, resolver, tipe.',
    descEn: 'GraphQL fundamentals: schema, queries, mutations, resolvers, types.',
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'GraphQL lanjutan: auth, dataloader, subscription, testing.',
    descEn: 'Advanced GraphQL: auth, dataloader, subscriptions, testing.',
  },
];

const MODULES = [
  {
    week: 1, level: 'beginer', topicId: 'schema-types',
    titleId: 'Schema & Tipe Dasar', titleEn: 'Schema & Basic Types',
    programId: 'GraphQL Schema Pertama', programEn: 'First GraphQL Schema',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'graphql',
    code: `# Schema Definition Language (SDL)
type Query {
  # Get all products
  products: [Product!]!
  
  # Get product by ID
  product(id: ID!): Product
  
  # Search products
  searchProducts(keyword: String!): [Product!]!
  
  # Get current user
  me: User
}

type Product {
  id: ID!
  name: String!
  price: Float!
  stock: Int!
  category: Category!
  tags: [String!]
  inStock: Boolean!
}

type User {
  id: ID!
  name: String!
  email: String!
  role: UserRole!
}

type Category {
  id: ID!
  name: String!
  slug: String!
  products: [Product!]!
}

enum UserRole {
  ADMIN
  USER
  SELLER
}

scalar DateTime`,
    objectivesId: ["Memahami Schema Definition Language","Tipe dasar: String, Int, Float, Boolean, ID","Tipe non-null dengan !","Tipe list dengan []","Enum dan Scalar"],
    objectivesEn: ["Understand Schema Definition Language","Basic types: String, Int, Float, Boolean, ID","Non-null types with !","List types with []","Enums and Scalars"],
    explanationId: `### SDL
Schema Definition Language untuk mendefinisikan tipe data.

### Tipe Dasar
String, Int, Float, Boolean, ID.

### Non-null
! berarti wajib ada, tidak boleh null.

### List
[Type] untuk array. [Type!]! berarti array non-null berisi non-null.

### Enum
Nilai terbatas yang bisa dipilih.`,
    explanationEn: `### SDL
Schema Definition Language for defining data types.

### Basic Types
String, Int, Float, Boolean, ID.

### Non-null
! means required, cannot be null.

### Lists
[Type] for arrays. [Type!]! means non-null array of non-null.

### Enums
Limited set of allowed values.`,
    experimentsId: ["Tambah tipe baru","Buat enum lain","Scalar custom","Interface"],
    experimentsEn: ["Add new types","Create other enums","Custom scalars","Interfaces"],
    challengeId: `Schema e-commerce: Product, User, Category, Order.`,
    challengeEn: `E-commerce schema: Product, User, Category, Order.`,
    summaryId: `Minggu 1 dari 10: **Schema & Tipe Dasar** (Pemula).`,
    summaryEn: `Week 1 of 10: **Schema & Basic Types** (Beginner).`,
  },
  {
    week: 2, level: 'beginer', topicId: 'queries',
    titleId: 'Queries', titleEn: 'Queries',
    programId: 'Membuat Query', programEn: 'Creating Queries',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'graphql',
    code: `# Query: baca data (GET)

# Get semua produk
query GetAllProducts {
  products {
    id
    name
    price
    inStock
  }
}

# Get produk by ID
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    name
    price
    stock
    category {
      name
      slug
    }
  }
}

# Search produk
query SearchProducts($keyword: String!) {
  searchProducts(keyword: $keyword) {
    id
    name
    price
    inStock
  }
}

# Fragment untuk reuse field
fragment ProductFields on Product {
  id
  name
  price
  stock
  inStock
}

query GetProductsWithFragment {
  products {
    ...ProductFields
    category {
      name
    }
  }
}

# Variables
# {
#   "id": "1",
#   "keyword": "laptop"
# }`,
    objectivesId: ["Query dasar","Query dengan parameter","Variabel ($variable)","Fragment untuk reuse","Nested query"],
    objectivesEn: ["Basic queries","Queries with parameters","Variables ($variable)","Fragments for reuse","Nested queries"],
    explanationId: `### Query
Operasi baca data. Seperti GET di REST.

### Parameter
Query bisa terima parameter dengan tipe.

### Variabel
Kirim variables terpisah dari query.

### Fragment
Reuse set of fields.

### Nested Query
Query relasi dalam satu request.`,
    explanationEn: `### Queries
Read data operations. Like GET in REST.

### Parameters
Queries accept typed parameters.

### Variables
Send variables separately from query.

### Fragments
Reuse sets of fields.

### Nested Queries
Query relations in one request.`,
    experimentsId: ["Alias fields","Directives @skip/@include","Multiple queries","Inline fragments"],
    experimentsEn: ["Field aliases","Directives @skip/@include","Multiple queries","Inline fragments"],
    challengeId: `Query lengkap: produk dengan kategori dan filter.`,
    challengeEn: `Complete query: products with category and filter.`,
    summaryId: `Minggu 2 dari 10: **Queries** (Pemula).`,
    summaryEn: `Week 2 of 10: **Queries** (Beginner).`,
  },
  {
    week: 3, level: 'beginer', topicId: 'mutations',
    titleId: 'Mutations', titleEn: 'Mutations',
    programId: 'Membuat Mutation', programEn: 'Creating Mutations',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'graphql',
    code: `# Mutation: tulis/ubah data (POST/PUT/DELETE)

type Mutation {
  # Auth
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  
  # Product CRUD
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
  
  # Order
  createOrder(input: CreateOrderInput!): Order!
  cancelOrder(id: ID!): Order!
}

type AuthPayload {
  token: String!
  user: User!
}

input RegisterInput {
  name: String!
  email: String!
  password: String!
  role: UserRole
}

input LoginInput {
  email: String!
  password: String!
}

input CreateProductInput {
  name: String!
  price: Float!
  stock: Int!
  categoryId: ID!
  tags: [String!]
}`,
    objectivesId: ["Mutation dasar","Input type","Auth mutation (register/login)","CRUD mutation","Multiple mutations"],
    objectivesEn: ["Basic mutations","Input types","Auth mutations (register/login)","CRUD mutations","Multiple mutations"],
    explanationId: `### Mutation
Operasi tulis/ubah data.

### Input Type
Tipe khusus untuk parameter mutation.

### Auth
Register dan login return token.

### CRUD
Create, Update, Delete dalam satu type Mutation.

### Multiple
Bisa jalankan multiple mutations sekaligus.`,
    explanationEn: `### Mutations
Write/modify data operations.

### Input Types
Special types for mutation parameters.

### Auth
Register and login return tokens.

### CRUD
Create, Update, Delete in one Mutation type.

### Multiple
Run multiple mutations at once.`,
    experimentsId: ["Bulk mutation","File upload","Optimistic response","Error handling"],
    experimentsEn: ["Bulk mutations","File uploads","Optimistic responses","Error handling"],
    challengeId: `Sistem registrasi dan CRUD produk.`,
    challengeEn: `Registration system and product CRUD.`,
    summaryId: `Minggu 3 dari 10: **Mutations** (Pemula).`,
    summaryEn: `Week 3 of 10: **Mutations** (Beginner).`,
  },
  {
    week: 4, level: 'beginer', topicId: 'resolvers',
    titleId: 'Resolvers', titleEn: 'Resolvers',
    programId: 'Implementasi Resolver', programEn: 'Resolver Implementation',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Apollo Server Resolvers
const { ApolloServer, gql } = require('apollo-server');

// Mock database
const products = [
  { id: '1', name: 'Laptop ASUS', price: 12500000, stock: 15, categoryId: '1', tags: ['laptop'] },
  { id: '2', name: 'Mouse Logitech', price: 350000, stock: 50, categoryId: '2', tags: ['mouse'] },
];
const categories = [
  { id: '1', name: 'Elektronik', slug: 'elektronik' },
  { id: '2', name: 'Aksesoris', slug: 'aksesoris' },
];

// Resolvers
const resolvers = {
  // Query resolvers
  Query: {
    products: () => products,
    product: (_, { id }) => products.find(p => p.id === id),
    searchProducts: (_, { keyword }) =>
      products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase())),
    me: (_, __, context) => context.currentUser,
  },

  // Field resolvers
  Product: {
    category: (product) => categories.find(c => c.id === product.categoryId),
    inStock: (product) => product.stock > 0,
  },

  Category: {
    products: (category) => products.filter(p => p.categoryId === category.id),
  },

  // Mutation resolvers
  Mutation: {
    createProduct: (_, { input }, context) => {
      // Auth check
      if (!context.currentUser) throw new Error('Unauthorized');
      
      const product = {
        id: String(products.length + 1),
        ...input,
      };
      products.push(product);
      return product;
    },

    updateProduct: (_, { id, input }) => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Product not found');
      products[index] = { ...products[index], ...input };
      return products[index];
    },

    deleteProduct: (_, { id }) => {
      const index = products.findIndex(p => p.id === id);
      if (index === -1) return false;
      products.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(\`Server ready at \${url}\`));`,
    objectivesId: ["Query resolver","Mutation resolver","Field resolver","Resolver args (parent, args, context, info)","Error handling di resolver"],
    objectivesEn: ["Query resolvers","Mutation resolvers","Field resolvers","Resolver args (parent, args, context, info)","Error handling in resolvers"],
    explanationId: `### Resolver
Fungsi yang return data untuk field tertentu.

### Signature
(parent, args, context, info) => data.

### Field Resolver
Resolve field computed (inStock, category).

### Context
Object shared semua resolvers (auth, db).

### Error
Throw error untuk gagal.`,
    explanationEn: `### Resolvers
Functions that return data for specific fields.

### Signature
(parent, args, context, info) => data.

### Field Resolvers
Resolve computed fields (inStock, category).

### Context
Object shared across all resolvers (auth, db).

### Errors
Throw errors for failures.`,
    experimentsId: ["Pagination resolver","File upload resolver","Data loader","Custom directive"],
    experimentsEn: ["Pagination resolvers","File upload resolvers","Data loaders","Custom directives"],
    challengeId: `Implementasi resolvers lengkap untuk e-commerce.`,
    challengeEn: `Complete resolver implementation for e-commerce.`,
    summaryId: `Minggu 4 dari 10: **Resolvers** (Pemula).`,
    summaryEn: `Week 4 of 10: **Resolvers** (Beginner).`,
  },
  {
    week: 5, level: 'beginer', topicId: 'apollo-server',
    titleId: 'Apollo Server & Client', titleEn: 'Apollo Server & Client',
    programId: 'Setup Server GraphQL', programEn: 'Setup GraphQL Server',
    levelNameId: 'Pemula', levelNameEn: 'Beginner',
    language: 'javascript',
    code: `// Setup Apollo Server + Client

// SERVER
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const typeDefs = \`#graphql
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
\`;

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
  console.log(\`Server ready at \${url}\`);
}

// CLIENT (React)
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const GET_PRODUCTS = gql\`
  query GetProducts {
    products { id name price inStock }
  }
\`;

function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  if (loading) return 'Loading...';
  if (error) return \`Error: \${error.message}\`;
  return data.products.map(p => \`\${p.name}: Rp\${p.price}\`).join('\\n');
}`,
    objectivesId: ["Setup Apollo Server","typeDefs dan resolvers","Context dan auth","Apollo Client","useQuery hook"],
    objectivesEn: ["Setup Apollo Server","typeDefs and resolvers","Context and auth","Apollo Client","useQuery hook"],
    explanationId: `### Apollo Server
Library untuk buat GraphQL server.

### typeDefs
Schema dalam bentuk template literal.

### Context
Buat context untuk auth/database.

### Apollo Client
State management untuk GraphQL.

### useQuery
React hook untuk fetch data.`,
    explanationEn: `### Apollo Server
Library for creating GraphQL servers.

### typeDefs
Schema as template literal.

### Context
Create context for auth/database.

### Apollo Client
State management for GraphQL.

### useQuery
React hook for fetching data.`,
    experimentsId: ["Subscriptions client","Mutation hook","Cache updates","Error policies"],
    experimentsEn: ["Subscription clients","Mutation hooks","Cache updates","Error policies"],
    challengeId: `Setup server + client: query dan mutation lengkap.`,
    challengeEn: `Setup server + client: complete queries and mutations.`,
    summaryId: `Minggu 5 dari 10: **Apollo Server & Client** (Pemula).`,
    summaryEn: `Week 5 of 10: **Apollo Server & Client** (Beginner).`,
  },
  {
    week: 6, level: 'intermediate', topicId: 'authentication',
    titleId: 'Authentication & Authorization', titleEn: 'Authentication & Authorization',
    programId: 'Keamanan GraphQL', programEn: 'GraphQL Security',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// JWT Authentication & Authorization
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Generate token
function generateToken(user) {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
}

// Verify token dari header
function getUser(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return { id: decoded.userId, role: decoded.role };
  } catch {
    return null;
  }
}

// Context dengan auth
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const currentUser = getUser(token);
    return { currentUser, db };
  },
});

// Directive untuk authorization
const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const requiredRole = this.args.requires;
    
    field.resolve = async function (...args) {
      const context = args[2];
      if (!context.currentUser) {
        throw new Error('Not authenticated');
      }
      if (requiredRole && context.currentUser.role !== requiredRole) {
        throw new Error('Not authorized');
      }
      return resolve.apply(this, args);
    };
  }
}

// Schema dengan directive
// type Query {
//   users: [User!]! @auth(requires: ADMIN)
//   me: User @auth
// }`,
    objectivesId: ["JWT token generation","Context authentication","Role-based authorization","Custom directive @auth","Error handling"],
    objectivesEn: ["JWT token generation","Context authentication","Role-based authorization","Custom @auth directive","Error handling"],
    explanationId: `### JWT
JSON Web Token untuk authentication.

### Context
Verifikasi token di context, inject user.

### Authorization
Cek role di resolver atau directive.

### Directive
Custom directive untuk protect fields.

### Error
Throw AuthenticationError vs ForbiddenError.`,
    explanationEn: `### JWT
JSON Web Tokens for authentication.

### Context
Verify token in context, inject user.

### Authorization
Check roles in resolvers or directives.

### Directives
Custom directives to protect fields.

### Errors
Throw AuthenticationError vs ForbiddenError.`,
    experimentsId: ["Refresh tokens","Rate limiting","API key auth","OAuth integration"],
    experimentsEn: ["Refresh tokens","Rate limiting","API key auth","OAuth integration"],
    challengeId: `Auth system: register, login, JWT, role-based access.`,
    challengeEn: `Auth system: register, login, JWT, role-based access.`,
    summaryId: `Minggu 6 dari 10: **Authentication & Authorization** (Menengah).`,
    summaryEn: `Week 6 of 10: **Authentication & Authorization** (Intermediate).`,
  },
  {
    week: 7, level: 'intermediate', topicId: 'dataloader',
    titleId: 'DataLoader & N+1 Problem', titleEn: 'DataLoader & N+1 Problem',
    programId: 'Optimasi Query', programEn: 'Query Optimization',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// DataLoader: solve N+1 problem
const DataLoader = require('dataloader');

// N+1 Problem (BAD)
// Setiap product query category terpisah
const resolversBad = {
  Product: {
    category: async (product) => {
      return db.categories.findById(product.categoryId);  // 1 query per product!
    }
  }
};

// Dengan DataLoader (GOOD)
const createLoaders = () => ({
  categoryLoader: new DataLoader(async (categoryIds) => {
    // Batch load: 1 query untuk semua IDs
    const categories = await db.categories.findByIds(categoryIds);
    const categoryMap = new Map(categories.map(c => [c.id, c]));
    return categoryIds.map(id => categoryMap.get(id));
  }),
  
  productLoader: new DataLoader(async (productIds) => {
    const products = await db.products.findByIds(productIds);
    const productMap = new Map(products.map(p => [p.id, p]));
    return productIds.map(id => productMap.get(id));
  }),
  
  ordersByUserLoader: new DataLoader(async (userIds) => {
    const orders = await db.orders.findByUserIds(userIds);
    const grouped = {};
    orders.forEach(o => {
      if (!grouped[o.userId]) grouped[o.userId] = [];
      grouped[o.userId].push(o);
    });
    return userIds.map(id => grouped[id] || []);
  }),
});

// Gunakan di context
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    loaders: createLoaders(),
  }),
});

// Resolver dengan loader
const resolvers = {
  Product: {
    category: (product, _, { loaders }) =>
      loaders.categoryLoader.load(product.categoryId),
  },
  User: {
    orders: (user, _, { loaders }) =>
      loaders.ordersByUserLoader.load(user.id),
  },
  Query: {
    products: () => db.products.findAll(),
  },
};`,
    objectivesId: ["N+1 problem explained","DataLoader setup","Batch loading","Caching per request","Multiple loaders"],
    objectivesEn: ["N+1 problem explained","DataLoader setup","Batch loading","Per-request caching","Multiple loaders"],
    explanationId: `### N+1 Problem
Query 1 untuk parent + N query untuk children.

### DataLoader
Batch dan cache database calls.

### Batch
Kumpulkan IDs, query sekaligus.


Cache
Cache per request (tidak shared antar request).

### Setup
Buat loaders di context, panggil .load(id).`,
    explanationEn: `### N+1 Problem
1 query for parent + N queries for children.

### DataLoader
Batch and cache database calls.

### Batching
Collect IDs, query all at once.

### Caching
Cache per request (not shared).

### Setup
Create loaders in context, call .load(id).`,
    experimentsId: ["Prime loader","Clear cache","Custom cache key","Loader composition"],
    experimentsEn: ["Prime loaders","Clear caches","Custom cache keys","Loader composition"],
    challengeId: `Optimasi: implement DataLoader untuk semua relasi.`,
    challengeEn: `Optimize: implement DataLoader for all relations.`,
    summaryId: `Minggu 7 dari 10: **DataLoader & N+1** (Menengah).`,
    summaryEn: `Week 7 of 10: **DataLoader & N+1** (Intermediate).`,
  },
  {
    week: 8, level: 'intermediate', topicId: 'subscriptions',
    titleId: 'Subscriptions', titleEn: 'Subscriptions',
    programId: 'Realtime GraphQL', programEn: 'Realtime GraphQL',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// GraphQL Subscriptions dengan WebSocket
const { ApolloServer } = require('@apollo/server');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

// Schema
type Subscription {
  productCreated: Product!
  orderStatusChanged(orderId: ID!): Order!
  newMessage(roomId: ID!): Message!
}

// Resolvers
const resolvers = {
  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator(['PRODUCT_CREATED']),
    },
    orderStatusChanged: {
      subscribe: (_, { orderId }) =>
        pubsub.asyncIterator([\`ORDER_STATUS_\${orderId}\`]),
    },
    newMessage: {
      subscribe: (_, { roomId }, context) => {
        // Auth check
        if (!context.currentUser) throw new Error('Unauthorized');
        return pubsub.asyncIterator([\`MESSAGE_\${roomId}\`]);
      },
    },
  },
  Mutation: {
    createProduct: async (_, { input }) => {
      const product = await db.products.create(input);
      // Publish event
      await pubsub.publish('PRODUCT_CREATED', { productCreated: product });
      return product;
    },
    updateOrderStatus: async (_, { id, status }) => {
      const order = await db.orders.update(id, { status });
      await pubsub.publish(\`ORDER_STATUS_\${id}\`, { orderStatusChanged: order });
      return order;
    },
  },
};

// Client subscription
// subscription OnProductCreated {
//   productCreated { id name price }
// }`,
    objectivesId: ["PubSub untuk messaging","Subscription resolver","asyncIterator","Filter subscription","Trigger dari mutation"],
    objectivesEn: ["PubSub for messaging","Subscription resolvers","asyncIterator","Filter subscriptions","Trigger from mutations"],
    explanationId: `### PubSub
In-memory event system untuk subscriptions.

### Subscribe
Return AsyncIterator dari pubsub.

### Publish
Trigger event dari mutation.

### Filter
Filter subscription by payload/args.

### Transport
WebSocket untuk realtime communication.`,
    explanationEn: `### PubSub
In-memory event system for subscriptions.

### Subscribe
Return AsyncIterator from pubsub.

### Publish
Trigger events from mutations.

### Filters
Filter subscriptions by payload/args.

### Transport
WebSocket for realtime communication.`,
    experimentsId: ["Redis PubSub","Subscription auth","Presence system","Live queries"],
    experimentsEn: ["Redis PubSub","Subscription auth","Presence systems","Live queries"],
    challengeId: `Chat system: subscription untuk new message.`,
    challengeEn: `Chat system: subscriptions for new messages.`,
    summaryId: `Minggu 8 dari 10: **Subscriptions** (Menengah).`,
    summaryEn: `Week 8 of 10: **Subscriptions** (Intermediate).`,
  },
  {
    week: 9, level: 'intermediate', topicId: 'testing',
    titleId: 'Testing & Error Handling', titleEn: 'Testing & Error Handling',
    programId: 'Test GraphQL API', programEn: 'Test GraphQL API',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'javascript',
    code: `// Testing GraphQL API
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
    const CREATE_PRODUCT = gql\`
      mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
          id name price inStock
        }
      }
    \`;
    
    const res = await mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: { name: 'Test', price: 1000, stock: 10 } },
    });
    
    expect(res.data.createProduct.name).toBe('Test');
    expect(res.data.createProduct.inStock).toBe(true);
  });

  test('query products', async () => {
    const GET_PRODUCTS = gql\`
      query { products { id name price } }
    \`;
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
};`,
    objectivesId: ["Test client setup","Mutation testing","Query testing","GraphQLError","Error extensions"],
    objectivesEn: ["Test client setup","Mutation testing","Query testing","GraphQLError","Error extensions"],
    explanationId: `### Test Client
createTestClient untuk integration test.

### Mutation Test
Test mutation dengan variables.

### Query Test
Test query dan cek result.

### Error
GraphQLError dengan extensions.

### Extensions
Custom error code dan HTTP status.`,
    explanationEn: `### Test Client
createTestClient for integration tests.

### Mutation Tests
Test mutations with variables.

### Query Tests
Test queries and check results.

### Errors
GraphQLError with extensions.

### Extensions
Custom error codes and HTTP status.`,
    experimentsId: ["Mock resolvers","Snapshot testing","E2E testing","Federation testing"],
    experimentsEn: ["Mock resolvers","Snapshot testing","E2E testing","Federation testing"],
    challengeId: `Test suite: unit test, integration test, error handling.`,
    challengeEn: `Test suite: unit tests, integration tests, error handling.`,
    summaryId: `Minggu 9 dari 10: **Testing & Error Handling** (Menengah).`,
    summaryEn: `Week 9 of 10: **Testing & Error Handling** (Intermediate).`,
  },
  {
    week: 10, level: 'intermediate', topicId: 'capstone-project',
    titleId: 'Capstone: E-Commerce GraphQL', titleEn: 'Capstone: E-Commerce GraphQL',
    programId: 'API Production-Ready', programEn: 'Production-Ready API',
    levelNameId: 'Menengah', levelNameEn: 'Intermediate',
    language: 'graphql',
    code: `# CAPSTONE: E-Commerce GraphQL API

# Schema lengkap
type Query {
  # Products
  products(
    filter: ProductFilter
    pagination: PaginationInput
    sort: SortInput
  ): ProductConnection!
  product(id: ID!): Product
  
  # Orders
  myOrders: [Order!]!
  order(id: ID!): Order
  
  # User
  me: User
}

type Mutation {
  # Auth
  register(input: RegisterInput!): AuthPayload!
  login(input: LoginInput!): AuthPayload!
  
  # Products
  createProduct(input: CreateProductInput!): Product! @auth(requires: SELLER)
  updateProduct(id: ID!, input: UpdateProductInput!): Product! @auth
  deleteProduct(id: ID!): Boolean! @auth(requires: ADMIN)
  
  # Orders
  createOrder(input: CreateOrderInput!): Order! @auth
  cancelOrder(id: ID!): Order! @auth
  
  # Cart
  addToCart(input: AddToCartInput!): Cart! @auth
  removeFromCart(productId: ID!): Cart! @auth
  checkout: Order! @auth
}

type Subscription {
  productCreated: Product!
  orderStatusChanged(orderId: ID!): Order!
}

type ProductConnection {
  edges: [Product!]!
  totalCount: Int!
  pageInfo: PageInfo!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}`,
    objectivesId: ["Schema lengkap","Pagination (Connection pattern)","Auth directive","Subscription","Error handling"],
    objectivesEn: ["Complete schema","Pagination (Connection pattern)","Auth directives","Subscriptions","Error handling"],
    explanationId: `### Schema Design
Query, Mutation, Subscription type.

### Connection Pattern
Pagination dengan cursor-based.

### Auth Directive
Protect fields dengan @auth.

### Subscription
Realtime updates.

### Error Handling
Typed errors dengan extensions.`,
    explanationEn: `### Schema Design
Query, Mutation, Subscription types.

### Connection Pattern
Cursor-based pagination.

### Auth Directives
Protect fields with @auth.

### Subscriptions
Realtime updates.

### Error Handling
Typed errors with extensions.`,
    experimentsId: ["Federation","Schema stitching","File upload","Persisted queries"],
    experimentsEn: ["Federation","Schema stitching","File uploads","Persisted queries"],
    challengeId: `Deploy GraphQL API: schema, resolvers, auth, pagination, testing.`,
    challengeEn: `Deploy GraphQL API: schema, resolvers, auth, pagination, testing.`,
    summaryId: `Minggu 10 dari 10: **Capstone: E-Commerce GraphQL** (Menengah). Selesai!`,
    summaryEn: `Week 10 of 10: **Capstone: E-Commerce GraphQL** (Intermediate). Complete!`,
  },
];

for (const level of LEVELS) {
  level.weeks = MODULES.filter(m => m.level === level.levelId).map(m => ({
    week: m.week,
    topicId: m.topicId,
    titleId: m.titleId,
    titleEn: m.titleEn,
  }));
}

gen.writeFiles(MODULES, LEVELS);
