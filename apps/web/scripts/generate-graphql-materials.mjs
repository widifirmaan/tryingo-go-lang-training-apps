import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE = path.resolve(__dirname, '../public/data/course/graphql/graphql');

const MODULES = [
  { id: 1, f: 'pengenalan-graphql', lid: 'Pengenalan GraphQL & Setup', len: 'Introduction to GraphQL & Setup', pid: 'Hello GraphQL', pen: 'Hello GraphQL' },
  { id: 2, f: 'schema-definition', lid: 'Schema Definition Language (SDL)', len: 'Schema Definition Language (SDL)', pid: 'Defining Types', pen: 'Defining Types' },
  { id: 3, f: 'queries', lid: 'Queries & Fetching Data', len: 'Queries & Fetching Data', pid: 'Read Operations', pen: 'Read Operations' },
  { id: 4, f: 'mutations', lid: 'Mutations & Writing Data', len: 'Mutations & Writing Data', pid: 'Write Operations', pen: 'Write Operations' },
  { id: 5, f: 'resolvers', lid: 'Resolvers & Data Sources', len: 'Resolvers & Data Sources', pid: 'Resolver Logic', pen: 'Resolver Logic' },
  { id: 6, f: 'arguments-params', lid: 'Arguments & Parameters', len: 'Arguments & Parameters', pid: 'Parameterized Queries', pen: 'Parameterized Queries' },
  { id: 7, f: 'nested-queries', lid: 'Nested Queries & Aliases', len: 'Nested Queries & Aliases', pid: 'Complex Fetching', pen: 'Complex Fetching' },
  { id: 8, f: 'fragments', lid: 'Fragments & Interfaces', len: 'Fragments & Interfaces', pid: 'Reusable Queries', pen: 'Reusable Queries' },
  { id: 9, f: 'subscriptions', lid: 'Subscriptions & Realtime', len: 'Subscriptions & Realtime', pid: 'Real-time Updates', pen: 'Real-time Updates' },
  { id: 10, f: 'pagination', lid: 'Pagination & Connections', len: 'Pagination & Connections', pid: 'Cursor Pagination', pen: 'Cursor Pagination' },
  { id: 11, f: 'error-handling', lid: 'Error Handling & Validation', len: 'Error Handling & Validation', pid: 'Validation Logic', pen: 'Validation Logic' },
  { id: 12, f: 'authorization', lid: 'Authorization & Security', len: 'Authorization & Security', pid: 'Secure API', pen: 'Secure API' },
  { id: 13, f: 'performance', lid: 'Performance & Caching', len: 'Performance & Caching', pid: 'Optimization', pen: 'Optimization' },
  { id: 14, f: 'federation', lid: 'Federation & Microservices', len: 'Federation & Microservices', pid: 'Distributed Schema', pen: 'Distributed Schema' },
  { id: 15, f: 'testing', lid: 'Testing GraphQL APIs', len: 'Testing GraphQL APIs', pid: 'Test Suite', pen: 'Test Suite' },
  { id: 16, f: 'capstone', lid: 'Capstone: Full GraphQL API', len: 'Capstone: Full GraphQL API', pid: 'Complete API', pen: 'Complete API' },
];

const OBJ = {
  1: { id: ['Memahami GraphQL sebagai alternatif REST API', 'Menginstall GraphQL server (Apollo Server)', 'Memahami konsep schema, query, dan resolver', 'Menjalankan GraphQL server dan menguji di GraphQL Playground'], en: ['Understand GraphQL as an alternative to REST API', 'Install GraphQL server (Apollo Server)', 'Understand schema, query, and resolver concepts', 'Run GraphQL server and test in GraphQL Playground'] },
  2: { id: ['Memahami GraphQL SDL (Schema Definition Language)', 'Mendefinisikan tipe object, query, dan mutation', 'Menggunakan field types dan nullable/non-null', 'Membuat schema yang valid'], en: ['Understand GraphQL SDL (Schema Definition Language)', 'Define object types, query, and mutation', 'Use field types and nullable/non-null', 'Create a valid schema'] },
  3: { id: ['Menulis query untuk mengambil data', 'Memahami field selection dan response shape', 'Menggunakan aliases untuk field yang sama', 'Memahami null handling dalam response'], en: ['Write queries to fetch data', 'Understand field selection and response shape', 'Use aliases for same fields', 'Understand null handling in response'] },
  4: { id: ['Menulis mutation untuk create, update, delete', 'Memahami input types untuk mutation arguments', 'Mengembalikan data yang baru dibuat/diubah', 'Memahami mutation return types'], en: ['Write mutations for create, update, delete', 'Understand input types for mutation arguments', 'Return newly created/updated data', 'Understand mutation return types'] },
  5: { id: ['Memahami resolver functions', 'Menghubungkan resolver ke data sources', 'Menggunakan resolver chaining untuk nested data', 'Memahami resolver context'], en: ['Understand resolver functions', 'Connect resolvers to data sources', 'Use resolver chaining for nested data', 'Understand resolver context'] },
  6: { id: ['Menggunakan arguments pada query dan mutation', 'Membuat argument dengan tipe data berbeda', 'Menggunakan default values untuk arguments', 'Memvalidasi arguments di resolver'], en: ['Use arguments in queries and mutations', 'Create arguments with different data types', 'Use default values for arguments', 'Validate arguments in resolver'] },
  7: { id: ['Menulis nested queries untuk data hierarkis', 'Menggunakan aliases untuk beberapa query sekaligus', 'Memahami query depth dan complexity', 'Mengoptimasi nested queries dengan DataLoader'], en: ['Write nested queries for hierarchical data', 'Use aliases for multiple queries at once', 'Understand query depth and complexity', 'Optimize nested queries with DataLoader'] },
  8: { id: ['Membuat fragments untuk reusable query pieces', 'Menggunakan interfaces dan union types', 'Memahami inline fragments', 'Mengorganisir query dengan fragments'], en: ['Create fragments for reusable query pieces', 'Use interfaces and union types', 'Understand inline fragments', 'Organize queries with fragments'] },
  9: { id: ['Memahami GraphQL subscriptions', 'Mengimplementasi WebSocket untuk real-time', 'Menggunakan pub/sub untuk event broadcasting', 'Membangun chat fitur real-time'], en: ['Understand GraphQL subscriptions', 'Implement WebSocket for real-time', 'Use pub/sub for event broadcasting', 'Build a real-time chat feature'] },
  10: { id: ['Memahami cursor-based pagination', 'Menggunakan Relay Connection specification', 'Mengimplementasi pageInfo dan edges', 'Membandingkan offset vs cursor pagination'], en: ['Understand cursor-based pagination', 'Use Relay Connection specification', 'Implement pageInfo and edges', 'Compare offset vs cursor pagination'] },
  11: { id: ['Menangani error di GraphQL', 'Menggunakan custom error types', 'Implementing input validation', 'Menggunakan middleware untuk error handling'], en: ['Handle errors in GraphQL', 'Use custom error types', 'Implement input validation', 'Use middleware for error handling'] },
  12: { id: ['Mengimplementasi authentication di GraphQL', 'Menggunakan context untuk user information', 'Menerapkan authorization di resolver level', 'Menggunakan directive untuk permission checks'], en: ['Implement authentication in GraphQL', 'Use context for user information', 'Apply authorization at resolver level', 'Use directives for permission checks'] },
  13: { id: ['Menggunakan DataLoader untuk batching', 'Implementing caching layer', 'Memahami N+1 query problem', 'Mengoptimasi resolver performance'], en: ['Use DataLoader for batching', 'Implement caching layer', 'Understand N+1 query problem', 'Optimize resolver performance'] },
  14: { id: ['Memahami GraphQL Federation', 'Menggunakan Apollo Federation untuk microservices', 'Mendefinisikan federated schema', 'Menggabungkan multiple subgraphs'], en: ['Understand GraphQL Federation', 'Use Apollo Federation for microservices', 'Define federated schema', 'Combine multiple subgraphs'] },
  15: { id: ['Menulis test untuk GraphQL resolvers', 'Menggunakan Apollo Server testing utilities', 'Testing queries, mutations, dan subscriptions', 'Memahami integration testing'], en: ['Write tests for GraphQL resolvers', 'Use Apollo Server testing utilities', 'Test queries, mutations, and subscriptions', 'Understand integration testing'] },
  16: { id: ['Membangun GraphQL API lengkap', 'Menggabungkan semua konsep GraphQL', 'Mengimplementasi authentication dan authorization', 'Mempersiapkan deployment API'], en: ['Build a complete GraphQL API', 'Combine all GraphQL concepts', 'Implement authentication and authorization', 'Prepare API for deployment'] },
};

const CODE = {
  1: `const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql\`
  type Query {
    hello: String
  }
\`;

const resolvers = {
  Query: {
    hello: () => 'Hello, GraphQL!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log('Server ready at ' + url));`,
  2: `type Query {
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
}`,
  3: `query GetUser {
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
}`,
  4: `mutation CreateUser($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
    name
    email
  }
}

mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
  }
}`,
  5: `const resolvers = {
  Query: {
    user: (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUserById(id);
    },
  },
  User: {
    posts: (user, _, { dataSources }) => {
      return dataSources.postAPI.getPostsByUserId(user.id);
    },
  },
};`,
  6: `type Query {
  user(id: ID!): User
  users(limit: Int = 10, offset: Int = 0): [User!]!
  searchUsers(query: String!): [User!]!
}`,
  7: `query GetUserWithPosts {
  user(id: "1") {
    name
    posts {
      title
      comments {
        body
        author {
          name
        }
      }
    }
  }
}

query GetUserAndName {
  userDetails: user(id: "1") {
    name
  }
  userName: user(id: "1") {
    name
  }
}`,
  8: `fragment UserFields on User {
  id
  name
  email
}

query GetUsers {
  users {
    ...UserFields
  }
}

interface Node {
  id: ID!
}

union SearchResult = User | Post | Comment`,
  9: `type Subscription {
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
};`,
  10: `type Query {
  users(first: Int!, after: String): UserConnection!
}

type UserConnection {
  edges: [UserEdge!]!
  pageInfo: PageInfo!
}

type UserEdge {
  cursor: String!
  node: User!
}

type PageInfo {
  hasNextPage: Boolean!
  endCursor: String
}`,
  11: `const resolvers = {
  Query: {
    user: (_, { id }) => {
      if (!id) {
        throw new UserInputError('ID is required', { invalidArgs: ['id'] });
      }
      return getUser(id);
    },
  },
};`,
  12: `const resolvers = {
  Query: {
    user: async (_, { id }, { user }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      if (user.role !== 'admin') throw new ForbiddenError('Admin only');
      return getUser(id);
    },
  },
};`,
  13: `const DataLoader = require('dataloader');

const userLoader = new DataLoader(async (keys) => {
  const users = await db.users.findMany({ where: { id: { in: keys } } });
  return keys.map(key => users.find(u => u.id === key));
});`,
  14: `const { buildSubgraphSchema } = require('@apollo/subgraph');

const typeDefs = gql\`
  extend schema @link(url: "https://specs.apollo.dev/federation/v2.0")

  type User @key(fields: "id") {
    id: ID!
    name: String!
  }
\`;`,
  15: `const { ApolloServerTestClient } = require('apollo-server-testing');

test('returns user by id', async () => {
  const result = await server.executeOperation({
    query: 'query { user(id: "1") { name } }',
  });
  expect(result.data.user.name).toBe('Budi');
});`,
  16: `# Full GraphQL API
# - Schema with types, queries, mutations, subscriptions
# - Resolvers with DataLoader for batching
# - Authentication and authorization
# - Pagination with cursor-based approach
# - Error handling and validation
# - Federation-ready schema
# - Test coverage`,
};

function generateFile(mod, isId) {
  const lang = isId ? 'id' : 'en';
  const title = isId ? mod.lid : mod.len;
  const programTitle = isId ? mod.pid : mod.pen;
  const obj = OBJ[mod.id];
  const objectives = (isId ? obj.id : obj.en).map(o => '- ' + o).join('\n');
  const code = CODE[mod.id];
  const nextModule = MODULES.find(m => m.id === mod.id + 1);
  const nextWeek = nextModule
    ? (isId ? mod.id + 1 + '. ' + nextModule.lid : nextModule.len)
    : (isId ? 'Selesai! 🎉' : 'Complete! 🎉');

  const summary = isId
    ? `Modul ${mod.id} dari 16: **${mod.lid}**. GraphQL adalah bahasa query API yang fleksibel dan efisien. Minggu depan: **${nextWeek}**.`
    : `Module ${mod.id} of 16: **${mod.len}**. GraphQL is a flexible and efficient API query language. Next week: **${nextWeek}**.`;

  return '# ' + title + '\n\n'
    + '> GraphQL | ' + (isId ? 'Modul ' + mod.id : 'Module ' + mod.id) + '\n\n'
    + '## ' + (isId ? 'Tujuan Pembelajaran' : 'Learning Objectives') + '\n\n'
    + objectives + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Program' : 'Program') + ': ' + programTitle + '\n\n'
    + '```graphql\n' + code + '\n```\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Penjelasan' : 'Explanation') + '\n\n'
    + (isId
      ? 'GraphQL adalah bahasa query untuk API yang memungkinkan client menentukan data yang dibutuhkan.\nSchema mendefinisikan tipe data dan operasi yang tersedia.\nResolver menghubungkan field dalam schema ke data source.\nGraphQL menggantikan REST dengan single endpoint dan fleksibilitas query.'
      : 'GraphQL is a query language for APIs that allows clients to specify exactly what data they need.\nSchema defines the data types and operations available.\nResolvers connect schema fields to data sources.\nGraphQL replaces REST with a single endpoint and query flexibility.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Eksperimen' : 'Experiments') + '\n\n'
    + '- ' + (isId ? 'Ubah query dan lihat perubahan response' : 'Change the query and see the response change') + '\n'
    + '- ' + (isId ? 'Tambah tipe baru ke schema' : 'Add a new type to the schema') + '\n'
    + '- ' + (isId ? 'Coba nested query untuk data hierarkis' : 'Try nested query for hierarchical data') + '\n\n'
    + '---\n\n'
    + '## ' + (isId ? 'Tantangan' : 'Challenge') + '\n\n'
    + (isId
      ? 'Buat GraphQL API lengkap dengan query, mutation, dan subscription.\nImplementasi authentication dan pagination.'
      : 'Build a complete GraphQL API with queries, mutations, and subscriptions.\nImplement authentication and pagination.')
    + '\n\n---\n\n'
    + '## ' + (isId ? 'Ringkasan' : 'Summary') + '\n\n'
    + summary + '\n';
}

if (!fs.existsSync(BASE)) {
  fs.mkdirSync(path.join(BASE, 'id'), { recursive: true });
  fs.mkdirSync(path.join(BASE, 'en'), { recursive: true });
}

for (const mod of MODULES) {
  const idContent = generateFile(mod, true);
  const enContent = generateFile(mod, false);
  fs.writeFileSync(path.join(BASE, 'id', 'week' + mod.id + '-' + mod.f + '.md'), idContent, 'utf8');
  fs.writeFileSync(path.join(BASE, 'en', 'week' + mod.id + '-' + mod.f + '.md'), enContent, 'utf8');
  console.log('  ' + mod.id + '. ' + mod.lid + ' / ' + mod.len);
}

console.log('\n✓ Generated ' + (MODULES.length * 2) + ' GraphQL curriculum files (' + MODULES.length + ' modules × 2 languages)');
console.log('  Output: ' + BASE);