import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Fondasi Skema & Eksekusi Query/Mutation',
            'nameEn': 'Schema Foundations & Query/Mutation Execution',
            'descId': 'Filosofi Schema-First SDL, Scalar & Object Types, penyusunan query/mutation, resolver execution tree, dan eliminasi N+1 problem dengan DataLoader.',
            'descEn': 'Schema-First SDL philosophy, Scalar & Object Types, query/mutation authoring, resolver execution trees, and N+1 elimination via DataLoader.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Real-Time Subscriptions, Keamanan & Federation',
            'nameEn': 'Real-Time Subscriptions, Security & Federation',
            'descId': 'WebSocket Subscriptions, Query Depth & Complexity limiting, autentikasi berbasis Context, Apollo Federation v2 multi-subgraph, dan capstone API Gateway.',
            'descEn': 'WebSocket Subscriptions, Query Depth & Complexity guards, Context-driven auth, Apollo Federation v2 multi-subgraphs, and API Gateway capstone.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Fondasi Skema & Eksekusi Query/Mutation',
            'levelNameEn': 'Schema Foundations & Query/Mutation Execution',
            'topicId': 'filosofi-graphql-sdl-dan-query-pertama',
            'titleId': 'Filosofi GraphQL vs REST: SDL, Scalar & Query Pertama',
            'titleEn': 'GraphQL vs REST Philosophy: SDL, Scalars & First Query',
            'language': 'typescript',
            'programId': 'Server GraphQL Mandiri dengan Apollo Server v4 dan Schema Definition Language',
            'programEn': 'Standalone GraphQL Server with Apollo Server v4 and Schema Definition Language',
            'code': """import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// 1. Schema Definition Language (SDL) defines strict contract
const typeDefs = `#graphql
  # Enumeration of order statuses
  enum OrderStatus {
    PENDING
    PAID
    SHIPPED
    CANCELLED
  }

  # Product entity
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    inStock: Boolean!
  }

  # Customer entity
  type Customer {
    id: ID!
    email: String!
    fullName: String!
  }

  # Root Query Type - Ingress entry point for all reads
  type Query {
    products(limit: Int): [Product!]!
    product(id: ID!): Product
    me: Customer
  }
`;

// Mock database storage
const PRODUCTS_DB = [
  { id: 'prod_1', sku: 'LAP-001', title: 'ThinkBook Ultra', price: 16500000.0, inStock: true },
  { id: 'prod_2', sku: 'MOU-002', title: 'Wireless Ergonomic Mouse', price: 350000.0, inStock: false },
];

// 2. Resolvers mirror schema shape
const resolvers = {
  Query: {
    products: (_parent: unknown, args: { limit?: number }) => {
      if (args.limit) {
        return PRODUCTS_DB.slice(0, args.limit);
      }
      return PRODUCTS_DB;
    },
    product: (_parent: unknown, args: { id: string }) => {
      return PRODUCTS_DB.find((p) => p.id === args.id) || null;
    },
    me: () => ({
      id: 'cust_99',
      email: 'alex.developer@example.com',
      fullName: 'Alex Iskandar',
    }),
  },
};

// 3. Instantiate and start Apollo Server 4
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 GraphQL Gateway ready at ${url}`);
""",
            'objectivesId': [
                'Memahami kelemahan arsitektur REST (Over-fetching dan Under-fetching) dan solusi GraphQL',
                'Menulis skema typeDefs menggunakan Schema Definition Language (SDL)',
                'Memahami sistem tipe bawaan GraphQL: Scalar (ID, String, Int, Float, Boolean) dan Non-Null modifier (!)',
                'Membangun server GraphQL mandiri dengan Apollo Server 4 dan fungsi resolver dasar'
            ],
            'objectivesEn': [
                'Understand architectural REST pitfalls (Over-fetching and Under-fetching) and GraphQL solutions',
                'Author rigorous contracts using Schema Definition Language (SDL)',
                'Master built-in GraphQL types: Scalar primitives (ID, String, Int, Float, Boolean) and Non-Null modifiers (!)',
                'Boot an Apollo Server 4 standalone runtime bound to foundational root query resolvers'
            ],
            'explanationId': """### Mengapa GraphQL Diciptakan? Solusi Over-fetching & Under-fetching
Pada arsitektur REST tradisional:
- **Over-fetching**: Klien seluler hanya butuh menampilkan nama produk, namun endpoint `GET /api/products/1` mengembalikan 50 field database yang boros kuota internet.
- **Under-fetching (Waterfall Network Requests)**: Untuk menampilkan halaman detail pesanan, aplikasi harus memanggil `GET /orders/123`, lalu `GET /customers/45`, lalu `GET /products/99`.
**GraphQL** membalik paradigma ini: Klien secara deklaratif meminta field persis yang mereka butuhkan dalam satu kali permintaan HTTP POST, dan server mengembalikan JSON dengan bentuk yang 100% identik dengan query klien.

### Schema-First Development dan SDL
GraphQL menganut prinsip kontrak yang ketat (*Strongly Typed*). **SDL (Schema Definition Language)** mendefinisikan bahasa kontrak universal antara frontend dan backend.
- `ID!`: Tipe pengidentifikasi unik (diserialisasi sebagai string). Tanda seru (`!`) berarti **Non-Null** (server menjamin field ini tidak akan pernah bernilai `null`).
- `[Product!]!`: Array yang tidak boleh bernilai null, dan elemen di dalamnya juga dijamin bukan null.

### Hubungan Tipe dan Resolver
Server GraphQL memetakan setiap field di dalam SDL ke sebuah fungsi eksekusi yang disebut **Resolver**. Resolver bertanggung jawab mengambil data dari sumber aslinya (database PostgreSQL, MongoDB, cache Redis, atau REST API pihak ketiga).""",
            'explanationEn': """### Why GraphQL Was Born: Neutralizing Over-fetching & Under-fetching
In legacy REST paradigms:
- **Over-fetching**: A lightweight mobile app widget requesting product titles receives 50 serialized relational database attributes over `GET /api/products/1`, wasting cellular bandwidth.
- **Under-fetching (Waterfall Network Requests)**: Rendering an order detail view forces clients into sequential HTTP round trips: `GET /orders/123`, then `GET /customers/45`, then `GET /products/99`.
**GraphQL** reverses client-server power dynamics: Clients declaratively request the exact fields required in a single HTTP POST round trip, and the server returns a JSON payload mirroring the query's structural shape.

### Schema-First Contracts and SDL
GraphQL enforces strict type safety. **SDL (Schema Definition Language)** defines an unambiguous API schema agnostic of backend implementation languages.
- `ID!`: Represents a unique identifier string. The exclamation mark (`!`) denotes **Non-Nullability** (the server guarantees this value is never null).
- `[Product!]!`: Signifies a non-null array where inner product elements are likewise guaranteed non-null.

### Mapping Schema to Resolvers
Every field declared in SDL corresponds to an execution function known as a **Resolver**. Resolvers encapsulate data fetching from arbitrary sources: PostgreSQL relations, MongoDB collections, Redis caches, or upstream microservices.""",
            'beginnerId': """Bayangkan REST API seperti memesan paket makanan cepat saji tetap: jika Anda memesan Paket A, Anda dipaksa menerima burger, kentang, dan minuman soda meskipun Anda hanya haus dan cuma butuh sedotan (Over-fetching).

GraphQL seperti restoran prasmanan mewah: Anda membawa piring kosong dan pelayan hanya mengambilkan apa yang Anda tunjuk dengan sendok takar yang tepat. Tidak ada makanan terbuang, dan Anda mendapatkan semua makanan di satu piring dalam satu kali jalan!""",
            'beginnerEn': """Imagine a REST API like ordering fixed combo meals at a drive-thru: ordering Combo #1 forces you to receive a burger, fries, and large soda even if you only wanted a glass of water (Over-fetching).

GraphQL is like an à la carte buffet: you hold a plate, and the chef ladles out strictly the items you point to. Nothing is wasted, and your complete meal is served on a single plate in one unified trip!""",
            'experimentsId': [
                'Buka Apollo Studio Sandbox di browser pada http://localhost:4000 dan jalankan query { products { title price } }',
                'Coba minta field yang tidak ada di skema (misal: description) dan amati validasi error kompilasi GraphQL',
                'Hapus tanda seru ! dari tipe Float pada skema dan amati bagaimana skema mengizinkan nilai null',
                'Uji query produk dengan argumen { products(limit: 1) { id title } }'
            ],
            'experimentsEn': [
                'Open Apollo Studio Sandbox at http://localhost:4000 and run query { products { title price } }',
                'Request an undeclared field (e.g. description) and observe GraphQL compile-time validation errors',
                'Remove the exclamation mark ! from Float and inspect how the schema permits nullable outputs',
                'Execute a parameterized query: { products(limit: 1) { id title } }'
            ],
            'challengeId': 'Tambahkan tipe `Category` pada SDL dengan relasi ke `Product`, dan implementasikan resolver untuk query `categories: [Category!]!` yang mengembalikan daftar kategori produk.',
            'challengeEn': 'Extend the SDL with a `Category` entity linked to `Product`, implementing root resolvers for `categories: [Category!]!` returning active product groupings.',
            'summaryId': 'Anda telah memahami perbedaan fundamental GraphQL vs REST, menulis kontrak SDL dengan scalar types dan non-null assertions, serta menjalankan server Apollo Server 4 mandiri.',
            'summaryEn': 'You have mastered GraphQL vs REST fundamentals, authored SDL contracts with scalars and non-null modifiers, and initialized an Apollo Server 4 standalone runtime.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Fondasi Skema & Eksekusi Query/Mutation',
            'levelNameEn': 'Schema Foundations & Query/Mutation Execution',
            'topicId': 'mutations-input-types-fragments-dan-directives',
            'titleId': 'Mutations, Input Types, Fragments & Directives',
            'titleEn': 'Mutations, Input Types, Fragments & Directives',
            'language': 'typescript',
            'programId': 'Operasi Mutasi CRUD dengan Input Types Terstruktur dan Fragment Reusable',
            'programEn': 'CRUD Mutation Operations with Structured Input Types and Reusable Fragments',
            'code': """import { ApolloServer } from '@apollo/server';

const typeDefs = `#graphql
  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
    stock: Int!
    createdAt: String!
  }

  # Input Types group arguments cleanly instead of long argument lists
  input CreateProductInput {
    sku: String!
    title: String!
    price: Float!
    stock: Int! = 0 # Default value
  }

  input UpdateStockInput {
    productId: ID!
    deltaQuantity: Int!
  }

  # Payload pattern: Return status and newly mutated entity
  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    product: Product
  }

  type Query {
    products: [Product!]!
  }

  # Root Mutation Type - Ingress for state-changing write operations
  type Mutation {
    createProduct(input: CreateProductInput!): MutationResponse!
    adjustInventory(input: UpdateStockInput!): MutationResponse!
  }
`;

interface ProductRecord {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  createdAt: string;
}

const productsStore: ProductRecord[] = [];

const resolvers = {
  Query: {
    products: () => productsStore,
  },
  Mutation: {
    createProduct: (
      _parent: unknown,
      { input }: { input: { sku: string; title: string; price: number; stock: number } }
    ) => {
      if (input.price < 0) {
        return {
          code: 'INVALID_PRICE',
          success: false,
          message: 'Product price cannot be negative.',
          product: null,
        };
      }

      const newProduct: ProductRecord = {
        id: `prod_${Date.now()}`,
        sku: input.sku,
        title: input.title,
        price: input.price,
        stock: input.stock,
        createdAt: new Date().toISOString(),
      };

      productsStore.push(newProduct);

      return {
        code: '201_CREATED',
        success: true,
        message: 'Product created successfully.',
        product: newProduct,
      };
    },
    adjustInventory: (
      _parent: unknown,
      { input }: { input: { productId: string; deltaQuantity: number } }
    ) => {
      const product = productsStore.find((p) => p.id === input.productId);
      if (!product) {
        return {
          code: 'NOT_FOUND',
          success: false,
          message: 'Product does not exist.',
          product: null,
        };
      }

      product.stock += input.deltaQuantity;

      return {
        code: '200_UPDATED',
        success: true,
        message: 'Stock updated.',
        product,
      };
    },
  },
};

export { typeDefs, resolvers };
""",
            'objectivesId': [
                'Merancang operasi perubahan data menggunakan Root Mutation Type',
                'Mengelompokkan parameter masukan yang bersih dan terstruktur dengan Input Types (`input ...`)',
                'Menerapkan Mutation Response Payload Pattern untuk penanganan error bisnis yang elegan',
                'Menggunakan GraphQL Fragments untuk berbagi kumpulan field antar komponen klien dan Directives (@include, @skip)'
            ],
            'objectivesEn': [
                'Design state-modifying write operations using the Root Mutation Type',
                'Encapsulate structured argument groups cleanly using Input Types (`input ...`)',
                'Implement the Mutation Response Payload Pattern for graceful domain error handling',
                'Leverage GraphQL Fragments to eliminate duplication across client queries and apply Directives (@include, @skip)'
            ],
            'explanationId': """### Arsitektur Root Mutation Type
Jika `Query` didesain untuk operasi pembacaan yang aman tanpa efek samping (*idempotent & side-effect free*), **Mutation** didesain khusus untuk operasi tulis yang mengubah state server (`INSERT`, `UPDATE`, `DELETE`). Berbeda dengan `Query` yang resolver-nya dapat dieksekusi secara paralel, spesifikasi GraphQL mewajibkan resolver di dalam `Mutation` dieksekusi secara **berurutan (serial)** untuk mencegah race condition.

### Input Types vs Object Types
Dalam skema GraphQL, Anda dilarang menggunakan tipe `type` standar sebagai argumen input sebuah mutation. Anda wajib menggunakan keyword **`input`**. Input types hanya boleh berisi scalar types, enums, atau input types bersarang lainnya (tidak boleh berisi interface atau union).

### Mutation Response Payload Pattern
Anti-pattern umum pada mutation adalah mengembalikan entitas secara telanjang (`createProduct(...): Product!`). Jika terjadi validasi gagal (misal harga negatif), server terpaksa melempar GraphQL error tingkat protokol yang menghentikan eksekusi. **Mutation Response Payload Pattern** membungkus entitas dengan field metadata (`code`, `success`, `message`, `product`), memungkinkan klien frontend menampilkan pesan toast error yang ramah pengguna.

### Reusabilitas dengan Fragments dan Directives
- **Fragments**: Blok field yang dapat digunakan kembali (misal `fragment ProductCard on Product { id title price }`).
- **Directives**: Kondisional dinamis pada query klien, seperti `@include(if: $withStock)` atau `@skip(if: $isMobile)`.""",
            'explanationEn': """### The Root Mutation Contract
While `Query` resolvers operate idempotently with zero side effects, **Mutations** exist specifically to mutate server state (`INSERT`, `UPDATE`, `DELETE`). Crucially, while GraphQL query field resolvers may evaluate concurrently in parallel, the GraphQL specification mandates that top-level mutation fields execute **serially in strict sequential order** to prevent write race conditions.

### Input Types vs Object Types
The GraphQL specification disallows utilizing standard object `type` declarations as mutation arguments. Developers must declare specialized **`input`** types. Input types are strictly constrained to scalar primitives, enums, or nested input types (excluding interfaces and unions).

### The Mutation Response Payload Pattern
A common anti-pattern is returning domain models directly (`createProduct(...): Product!`). In the event of domain validation faults, servers revert to protocol-level GraphQL errors. The **Mutation Response Payload Pattern** wraps mutations in an envelope (`code`, `success`, `message`, `product`), allowing client applications to handle business validation gracefully.

### Reusable Fragments and Conditional Directives
- **Fragments**: Encapsulate reusable field selections across components (e.g. `fragment ProductCard on Product { id title price }`).
- **Directives**: Apply runtime client conditional logic, such as `@include(if: $withStock)` or `@skip(if: $isMobile)`.""",
            'beginnerId': """Bayangkan Query seperti melihat daftar menu di restoran (Anda hanya membaca, tidak mengubah apa-apa). 

Mutation seperti menyerahkan nota pesanan ke koki dapur (Anda mengubah state: koki mulai memasak dan bahan makanan berkurang). 
Input Type seperti formulir pemesanan rapi: Anda mengisi nama, nomor meja, dan level pedas di satu kertas formulir terlipat rapi. Sedangkan Mutation Payload seperti kasir yang mengembalikan struk pembayaran ramah: 'Pesanan berhasil dibuat, ini nomor antrean dan struk Anda!'""",
            'beginnerEn': """Think of a Query like inspecting a restaurant menu (purely reading without changing anything).

A Mutation is like handing your order ticket to the chef (mutating server state: the chef begins cooking and inventory is depleted).
An Input Type is like a tidy order slip: you fill out name, table number, and spice level within one organized card. The Mutation Payload is like the waiter handing you a receipt: 'Success! Here is your order confirmation number and status!'""",
            'experimentsId': [
                'Jalankan mutation createProduct dengan harga negatif dan amati payload code: INVALID_PRICE',
                'Buat query dengan fragment: fragment CoreInfo on Product { id title price } lalu gunakan ...CoreInfo di query',
                'Uji directive @include(if: true) dan amati field yang diminta muncul secara bersyarat',
                'Jalankan dua mutation berurutan dalam satu request dan amati eksekusi serial sesuai spesifikasi'
            ],
            'experimentsEn': [
                'Execute createProduct with a negative price and inspect the INVALID_PRICE envelope',
                'Author a query utilizing fragments: fragment CoreInfo on Product { id title price } and apply ...CoreInfo',
                'Test the @include(if: true) directive and observe fields appearing conditionally',
                'Send dual mutations in a single payload to verify sequential serial evaluation order'
            ],
            'challengeId': 'Buat mutation `deleteProduct(id: ID!): MutationResponse!` yang memvalidasi keberadaan produk, menghapusnya dari store, dan mengembalikan pesan konfirmasi keberhasilan.',
            'challengeEn': 'Author a `deleteProduct(id: ID!): MutationResponse!` mutation that validates entity existence, removes it from memory, and returns a graceful confirmation payload.',
            'summaryId': 'Anda telah menguasai operasi penulisan data dengan Root Mutation, pengelompokan parameter dengan Input Types, Mutation Payload Pattern, serta Fragments dan Directives.',
            'summaryEn': 'You have mastered data writing via Root Mutations, structured parameter grouping with Input Types, the Mutation Payload Pattern, Fragments, and Directives.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Fondasi Skema & Eksekusi Query/Mutation',
            'levelNameEn': 'Schema Foundations & Query/Mutation Execution',
            'topicId': 'resolver-execution-tree-dan-context-autentikasi',
            'titleId': 'Resolver Execution Tree & Context Autentikasi',
            'titleEn': 'Resolver Execution Tree & Auth Context',
            'language': 'typescript',
            'programId': 'Pohon Eksekusi Resolver Bertingkat dengan Validasi JWT Context',
            'programEn': 'Nested Resolver Execution Tree with JWT Context Validation',
            'code': """import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

const typeDefs = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Review {
    id: ID!
    rating: Int!
    comment: String!
    author: User! # Nested relational field resolved independently!
  }

  type Item {
    id: ID!
    name: String!
    price: Float!
    reviews: [Review!]! # Nested array resolver
  }

  type Query {
    item(id: ID!): Item
  }
`;

// Context Interface injected per request
interface GraphQLContext {
  currentUser: { id: string; username: string; role: string } | null;
}

// 4-Tier Resolver Architecture: (parent, args, context, info)
const resolvers = {
  Query: {
    item: (_parent: unknown, args: { id: string }) => {
      // Root level query resolver fetches the Item
      return { id: args.id, name: 'Pro Wireless Keyboard', price: 890000.0 };
    },
  },
  Item: {
    // Nested resolver for Item.reviews: 'parent' is the Item object resolved above!
    reviews: (parent: { id: string }, _args: unknown, context: GraphQLContext) => {
      // Guard sensitive data with request context
      if (!context.currentUser) {
        throw new GraphQLError('Authentication required to view item reviews.', {
          extensions: { code: 'UNAUTHENTICATED', http: { status: 401 } },
        });
      }

      return [
        { id: 'rev_1', rating: 5, comment: 'Tactile switches feel incredible!', authorId: 'usr_88' },
        { id: 'rev_2', rating: 4, comment: 'Great battery life.', authorId: 'usr_99' },
      ];
    },
  },
  Review: {
    // Nested resolver for Review.author: 'parent' is the Review object!
    author: (parent: { authorId: string }) => {
      const USERS_DB: Record<string, { id: string; username: string; email: string }> = {
        usr_88: { id: 'usr_88', username: 'keyboard_enthusiast', email: 'ke@example.com' },
        usr_99: { id: 'usr_99', username: 'coder_budi', email: 'budi@example.com' },
      };
      return USERS_DB[parent.authorId];
    },
  },
};

export { typeDefs, resolvers, GraphQLContext };
""",
            'objectivesId': [
                'Memahami cara kerja pohon eksekusi resolver hierarkis (*Resolver Execution Tree*)',
                'Menguasai empat parameter resolver: parent (root), args, context, dan info',
                'Menginjeksikan metadata request (token JWT, session, connection) ke dalam GraphQL Context',
                'Melempar exception terstruktur dengan GraphQLError dan extension code'
            ],
            'objectivesEn': [
                'Understand hierarchical tree traversal in the GraphQL Resolver Execution Tree',
                'Master the four universal resolver arguments: parent (root), args, context, and info',
                'Inject request-scoped metadata (JWT tokens, user context, databases) via GraphQL Context',
                'Throw standardized, structured exceptions using GraphQLError and extension codes'
            ],
            'explanationId': """### Anatomi Empat Parameter Resolver
Setiap fungsi resolver di GraphQL menerima 4 parameter universal:
1. `parent` (atau `root`): Hasil data kembalian dari resolver satu tingkat di atasnya dalam pohon query hierarkis.
2. `args`: Parameter argumen yang dikirimkan oleh klien dalam query SDL (`args: { id: "..." }`).
3. `context`: Objek bersama (*shared object*) yang dibuat baru untuk setiap permintaan HTTP masuk. Tempat ideal menyimpan informasi otentikasi token JWT, koneksi database, atau loader.
4. `info`: Metadata AST (*Abstract Syntax Tree*) internal mengenai query yang sedang dieksekusi.

### Pohon Eksekusi Resolver (Execution Tree)
Resolver di GraphQL bekerja secara bertingkat seperti struktur pohon (*tree traversal*):
1. Query meminta: `item -> reviews -> author -> username`.
2. Pertama, resolver `Query.item` dieksekusi dan mengembalikan objek `{ id, name, price }`.
3. Kedua, GraphQL mengecek apakah field `reviews` meminta data. Resolver `Item.reviews` dipanggil dengan menerima objek `item` tadi sebagai parameter `parent`.
4. Ketiga, untuk setiap review di dalam array, resolver `Review.author` dipanggil secara mandiri dengan menerima review individual sebagai `parent`.

### Keamanan Berbasis Context
Otentikasi tidak boleh di-hardcode di tiap resolver. Middleware HTTP memvalidasi header `Authorization: Bearer <jwt>`, meng-decode payload pengguna, dan menyematkannya ke dalam `context.currentUser`. Resolver mana pun dalam pohon dapat memeriksa `context.currentUser` untuk otorisasi hak akses.""",
            'explanationEn': """### The Four Universal Resolver Arguments
Every GraphQL resolver adheres to an immutable 4-argument signature:
1. `parent` (or `root`): The resolved payload returned by the parent node immediately above in the execution hierarchy.
2. `args`: Field arguments supplied directly by the client in the incoming query document.
3. `context`: A request-scoped mutable object instantiated per incoming HTTP connection. The canonical location for decoded JWT claims, user identities, and database clients.
4. `info`: Internal AST (Abstract Syntax Tree) execution state describing requested field selections.

### The Resolver Execution Tree Dynamics
GraphQL resolves nested graph relationships via recursive tree traversal:
1. Client requests: `item -> reviews -> author -> username`.
2. First, `Query.item` executes, resolving root item attributes `{ id, name, price }`.
3. Second, the runtime inspects the `Item.reviews` selection, invoking its nested resolver with the parent item payload passed as `parent`.
4. Third, iterating over every review entry, the runtime dispatches `Review.author`, passing the child review as `parent` to fetch user profiles.

### Context-Driven Authorization Gates
Authentication logic belongs at the transport perimeter. HTTP gateway middleware verifies incoming `Authorization: Bearer <token>` headers, decoding claims into `context.currentUser`. Any downstream resolver down the graph inspects `context.currentUser` to enforce granular role-based authorization.""",
            'beginnerId': """Bayangkan pohon eksekusi resolver seperti silsilah keluarga. 
Kakek (`Query.item`) memanggil Ayah (`Item.reviews`). Saat Ayah berbicara, ia membawa nama Kakek sebagai `parent`. Lalu Ayah memanggil Cucu (`Review.author`). 

Context seperti udara di dalam ruangan rumah: semua orang dari Kakek, Ayah, hingga Cucu bisa menghirup udara yang sama. Jika udaranya beracun (token JWT tidak sah), seluruh anggota keluarga tahu saat itu juga!""",
            'beginnerEn': """Think of the resolver execution tree like a family tree.
The Grandfather (`Query.item`) calls the Father (`Item.reviews`). When the Father speaks, he carries the Grandfather's identity as `parent`. Next, the Father calls the Grandson (`Review.author`).

The Context is like the atmosphere inside the family home: every member from Grandfather to Grandson breathes the identical air. If someone locks the front door (an unauthenticated token), every family member senses it immediately!""",
            'experimentsId': [
                'Uji query tanpa header otentikasi dan verifikasi kemunculan error UNAUTHENTICATED',
                'Kirim header otentikasi valid pada Context dan amati ulasan produk berhasil dimuat',
                'Cetak parameter parent di console pada resolver Review.author untuk melihat data review yang diteruskan',
                'Periksa struktur parameter info untuk melihat field AST yang diminta klien'
            ],
            'experimentsEn': [
                'Execute the query omitting authentication headers and verify the UNAUTHENTICATED error envelope',
                'Inject valid authentication credentials via Context and verify successful review retrieval',
                'Log the parent argument inside Review.author to inspect the incoming review entity',
                'Inspect the info argument to observe the compiled Abstract Syntax Tree of the requested query'
            ],
            'challengeId': 'Buat directive kustom `@auth(requires: ADMIN)` atau middleware context guard yang memblokir akses ke field email pengguna jika peran (`role`) di dalam JWT bukan administrator.',
            'challengeEn': 'Implement a custom `@auth(requires: ADMIN)` schema directive or context guard restricting user email visibility unless the decoded JWT role equals administrator.',
            'summaryId': 'Anda telah menguasai arsitektur pohon eksekusi resolver bertingkat, empat parameter utama (parent, args, context, info), serta penegakan keamanan autentikasi melalui GraphQL Context.',
            'summaryEn': 'You have mastered the hierarchical resolver execution tree, the four core resolver arguments (parent, args, context, info), and context-driven authentication guards.'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Fondasi Skema & Eksekusi Query/Mutation',
            'levelNameEn': 'Schema Foundations & Query/Mutation Execution',
            'topicId': 'masalah-n-plus-1-dan-batching-dataloader',
            'titleId': 'Masalah N+1 Query & Batching dengan DataLoader',
            'titleEn': 'The N+1 Query Problem & DataLoader Batching',
            'language': 'typescript',
            'programId': 'Eliminasi N+1 Problem Menggunakan Batching dan Caching DataLoader',
            'programEn': 'N+1 Problem Elimination Utilizing DataLoader Batching and In-Memory Caching',
            'code': """import DataLoader from 'dataloader';

interface Author {
  id: string;
  name: string;
}

// Simulated relational database lookup function
const batchGetAuthorsFromDB = async (authorIds: readonly string[]): Promise<(Author | Error)[]> => {
  console.log(`[SQL QUERY] SELECT * FROM authors WHERE id IN (${authorIds.map((id) => `'${id}'`).join(', ')});`);

  const AUTHORS_MOCK: Record<string, Author> = {
    auth_1: { id: 'auth_1', name: 'Robert C. Martin' },
    auth_2: { id: 'auth_2', name: 'Martin Fowler' },
    auth_3: { id: 'auth_3', name: 'Kent Beck' },
  };

  // DataLoader requires: Array MUST have same length and same ordering as authorIds input!
  return authorIds.map((id) => AUTHORS_MOCK[id] || new Error(`Author ${id} not found`));
};

// 1. Factory function creating a fresh DataLoader instance PER HTTP REQUEST
export const createLoaders = () => ({
  authorLoader: new DataLoader<string, Author>((keys) => batchGetAuthorsFromDB(keys), {
    cache: true, // Request-level memoization cache
  }),
});

// 2. Demonstration: Resolving 10 books written by 2 authors
// Without DataLoader: Triggers 10 individual SQL queries! (The N+1 Problem)
// With DataLoader: Automatically batches all 10 calls into 1 single SQL query!
const simulateResolvers = async () => {
  const loaders = createLoaders();

  const books = [
    { title: 'Clean Code', authorId: 'auth_1' },
    { title: 'Clean Architecture', authorId: 'auth_1' },
    { title: 'Refactoring', authorId: 'auth_2' },
    { title: 'TDD by Example', authorId: 'auth_3' },
    { title: 'Clean Craftsmanship', authorId: 'auth_1' },
  ];

  console.log('Resolving books and authors in parallel...');

  // Concurrent resolver invocations across nested tree
  const resolvedBooks = await Promise.all(
    books.map(async (book) => ({
      title: book.title,
      author: await loaders.authorLoader.load(book.authorId), // Coalesces keys into one tick!
    }))
  );

  console.log('Successfully resolved:', resolvedBooks);
};

simulateResolvers();
""",
            'objectivesId': [
                'Mendiagnosis bahaya mematikan N+1 Query Problem pada arsitektur pohon resolver GraphQL',
                'Memahami cara kerja batching berbasis Event Loop tick menggunakan library DataLoader',
                'Menjaga integritas kontrak batch function: ukuran array output wajib sama dan terurut sesuai kunci input',
                'Mencegah kebocoran data antar-pengguna dengan menginisialisasi instance DataLoader baru di setiap request HTTP Context'
            ],
            'objectivesEn': [
                'Diagnose the catastrophic N+1 Query Problem inherent to GraphQL nested execution trees',
                'Understand event-loop microtask coalescing with the DataLoader batching library',
                'Enforce the strict batch contract: output arrays must match input key lengths and ordering',
                'Prevent cross-request data leaks by instantiating fresh DataLoader factories per HTTP Request Context'
            ],
            'explanationId': """### Bahaya Mematikan Masalah N+1 Query
Kelemahan terbesar GraphQL ada pada pohon eksekusi resolver mandirinya:
Jika seorang pengguna meminta daftar 100 buku beserta nama penulisnya:
1. `Query.books` menjalankan 1 query SQL untuk mengambil 100 buku.
2. Namun untuk setiap buku, GraphQL mengeksekusi resolver `Book.author` secara terpisah.
3. Hasilnya: Server mengeksekusi $1 + 100 = 101$ query database! Jika ada 1.000 buku, server database Anda akan kehabisan koneksi pool dan crash seketika. Ini dikenal sebagai **The N+1 Problem**.

### Solusi DataLoader: Coalescing dalam Satu Tick Event Loop
Library **DataLoader** (dibuat oleh Facebook/Meta) memecahkan masalah ini melalui mekanisme cerdas berbasis *Node.js Event Loop Microtasks*:
1. Saat resolver memanggil `authorLoader.load('auth_1')`, DataLoader tidak langsung menembak database.
2. DataLoader menunda eksekusi selama pecahan milidetik (satu *tick* event loop), mengumpulkan (*batching*) seluruh ID yang diminta oleh resolver lain di waktu yang sama menjadi sebuah array: `['auth_1', 'auth_2', 'auth_3']`.
3. DataLoader mengeksekusi **satu query SQL gabungan tunggal**: `SELECT * FROM authors WHERE id IN (...)`.

### Dua Aturan Wajib DataLoader
1. **Ukuran dan Urutan Array**: Batch function Anda wajib mengembalikan array dengan panjang elemen yang persis sama dan urutan indeks yang persis sama dengan array kunci yang masuk.
2. **Scoping per Request**: Instance DataLoader **wajib dibuat baru untuk setiap request HTTP** di dalam fungsi GraphQL Context. Jika Anda membuat instance DataLoader secara global, pengguna A bisa melihat data privat pengguna B yang tersimpan di memori cache internal loader!""",
            'explanationEn': """### The Catastrophic N+1 Query Dilemma
The defining liability of GraphQL execution trees is uncoordinated independent resolver dispatch:
When querying 100 books alongside their author profiles:
1. `Query.books` executes 1 SQL query returning 100 records.
2. For each individual book, the runtime dispatches `Book.author` in isolation.
3. Result: The database suffers $1 + 100 = 101$ discrete network queries! Across high-traffic collections, database connection pools are saturated instantly. This is the notorious **N+1 Problem**.

### The DataLoader Solution: Event Loop Tick Coalescing
Developed by Facebook, **DataLoader** solves this via Node.js Event Loop microtask batching:
1. When a resolver invokes `authorLoader.load('auth_1')`, DataLoader defers execution.
2. It pauses across a single event loop tick, coalescing all concurrent `.load()` keys into a unified deduplicated batch array: `['auth_1', 'auth_2', 'auth_3']`.
3. It dispatches **one consolidated bulk database query**: `SELECT * FROM authors WHERE id IN (...)`.

### Two Non-Negotiable DataLoader Laws
1. **Length and Ordering Invariant**: The batch loading function must return an array of values of the exact same length and corresponding index order as the incoming array of keys.
2. **Request Scoping**: DataLoader instances **must be freshly instantiated per HTTP request** within the GraphQL context factory. Global DataLoader instances cause cross-user data leakage through memoization caching!""",
            'beginnerId': """Bayangkan Anda tinggal di asrama mahasiswa bersama 20 teman. 
Tanpa DataLoader (Masalah N+1): 20 mahasiswa berjalan satu per satu ke minimarket di ujung gang untuk membeli 1 kaleng soda yang sama. Minimarket didatangi 20 kali bolak-balik (capek dan boros bensin).

Dengan DataLoader: Mahasiswa pertama menaruh kotak kardus di lobi selama 1 menit. Setiap orang yang butuh soda menuliskan pesanannya di kotak itu. Satu kurir membawa kotak itu ke minimarket sekali jalan, membeli 20 soda sekaligus, lalu membagikannya ke masing-masing kamar!""",
            'beginnerEn': """Imagine living in a dormitory with 20 roommates.
Without DataLoader (The N+1 Problem): 20 students walk one after another to the corner store to purchase the identical soda. The store handles 20 individual trips back and forth (exhausting and wasteful).

With DataLoader: The first student sets a cardboard box in the lounge for 60 seconds. Everyone needing soda drops their request note in the box. A single runner heads to the market, buys all 20 sodas in one unified batch, and distributes them on arrival!""",
            'experimentsId': [
                'Jalankan skrip simulasi dan verifikasi di console log bahwa hanya ada 1 query SQL yang terpanggil untuk 5 buku',
                'Coba minta author yang sama 3 kali (auth_1) dan perhatikan DataLoader hanya menyertakan auth_1 satu kali dalam array batch SQL (deduplication)',
                'Sengaja kembalikan array hasil batch dengan panjang yang berbeda dari keys dan amati error yang dilempar DataLoader',
                'Uji fitur priming cache: panggil loader.prime(key, value) sebelum load dipanggil'
            ],
            'experimentsEn': [
                'Execute the simulation script and verify console output demonstrates strictly 1 SQL query for 5 book entities',
                'Request auth_1 three times concurrently and confirm DataLoader deduplicates keys into a single entry',
                'Intentionally return a batch array with mismatched length and observe the DataLoader runtime exception',
                'Experiment with cache priming: invoke loader.prime(key, value) prior to calling load'
            ],
            'challengeId': 'Implementasikan `ordersByCustomerLoader`: buat DataLoader untuk relasi One-to-Many di mana satu customerId mengembalikan array `Order[]`, dan pastikan pemetaan array-nya benar.',
            'challengeEn': 'Author an `ordersByCustomerLoader`: implement a DataLoader for One-to-Many relationships mapping a single customerId to an array of `Order[]` records with correct ordering.',
            'summaryId': 'Anda telah menguasai diagnosis dan resolusi masalah N+1 Query: coalescing microtask event loop dengan DataLoader, aturan pemetaan batch array, dan isolasi cache per request.',
            'summaryEn': 'You have mastered N+1 Query problem diagnostics and remediation: event loop microtask coalescing with DataLoader, batch array invariants, and request-scoped cache isolation.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Real-Time Subscriptions, Keamanan & Federation',
            'levelNameEn': 'Real-Time Subscriptions, Security & Federation',
            'topicId': 'real-time-subscriptions-websocket-dan-pubsub',
            'titleId': 'Real-Time Subscriptions, WebSockets & PubSub',
            'titleEn': 'Real-Time Subscriptions, WebSockets & PubSub',
            'language': 'typescript',
            'programId': 'Implementasi GraphQL Subscriptions Menggunakan Protokol graphql-ws dan PubSub Engine',
            'programEn': 'GraphQL Subscriptions Implementation Using graphql-ws Protocol and PubSub Engine',
            'code': """import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PubSub } from 'graphql-subscriptions';

// In-Memory PubSub Engine (In production, replace with RedisPubSub for multi-instance scaling)
const pubsub = new PubSub();
const ORDER_STATUS_UPDATED = 'ORDER_STATUS_UPDATED';

const typeDefs = `#graphql
  type Order {
    id: ID!
    total: Float!
    status: String!
  }

  type Query {
    activeOrders: [Order!]!
  }

  type Mutation {
    updateOrderStatus(orderId: ID!, newStatus: String!): Order!
  }

  # Root Subscription Type - Server pushes updates down WebSocket
  type Subscription {
    orderStatusChanged(orderId: ID!): Order!
  }
`;

const ordersDb = new Map<string, { id: string; total: number; status: string }>([
  ['ord_101', { id: 'ord_101', total: 450000, status: 'PROCESSING' }],
]);

const resolvers = {
  Query: {
    activeOrders: () => Array.from(ordersDb.values()),
  },
  Mutation: {
    updateOrderStatus: (_: unknown, { orderId, newStatus }: { orderId: string; newStatus: string }) => {
      const order = ordersDb.get(orderId);
      if (!order) throw new Error('Order not found');

      order.status = newStatus;

      // Publish event to topic
      pubsub.publish(ORDER_STATUS_UPDATED, {
        orderStatusChanged: order,
      });

      return order;
    },
  },
  Subscription: {
    orderStatusChanged: {
      // AsyncIterator subscribed to PubSub channel
      subscribe: () => pubsub.asyncIterableIterator([ORDER_STATUS_UPDATED]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Setup dual HTTP + WebSocket transport server
const httpServer = createServer();
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
});

// Bind graphql-ws protocol server
useServer({ schema }, wsServer);

httpServer.listen(4000, () => {
  console.log('🚀 HTTP & WebSocket Subscription server running on port 4000');
});
""",
            'objectivesId': [
                'Memahami arsitektur GraphQL Subscriptions melalui protokol WebSocket dua arah (graphql-ws)',
                'Membedakan peran Query (Read over HTTP), Mutation (Write over HTTP), dan Subscription (Push over WS)',
                'Menggunakan PubSub Engine untuk mempublikasikan dan mengonsumsi event streaming (AsyncIterator)',
                'Menyaring notifikasi subscriber spesifik menggunakan filter helper function (withFilter)'
            ],
            'objectivesEn': [
                'Understand GraphQL Subscriptions architecture over bidirectional WebSockets (graphql-ws)',
                'Differentiate Query (HTTP Read), Mutation (HTTP Write), and Subscription (WebSocket Push)',
                'Implement PubSub engines to publish and stream events via AsyncIterators',
                'Filter targeted subscriber events using functional predicates (withFilter)'
            ],
            'explanationId': """### Arsitektur GraphQL Subscriptions
Berbeda dengan Query dan Mutation yang beroperasi menggunakan siklus Request-Response standar di atas HTTP POST, **GraphQL Subscriptions** mempertahankan koneksi dua arah (*persistent bidirectional connection*) berbasis **WebSocket**. 
Ketika klien melakukan subscription (misal memantau status pesanan), koneksi tetap terbuka. Saat mutasi terjadi di server, server secara proaktif mendorong (*push*) data perubahan ke seluruh klien yang berlangganan secara real-time.

### Protokol Modern: graphql-ws vs subscriptions-transport-ws
Library lama `subscriptions-transport-ws` telah berstatus *deprecated* (usang). Standar industri modern saat ini adalah protokol **`graphql-ws`** (RFC-compliant) yang lebih aman, ringan, dan menangani terminasi soket serta reconnection ping/pong dengan jauh lebih stabil.

### PubSub Engine dan Filter Tertarget
- **PubSub**: Abstraksi kanal perantara penerbit-pelanggan. Di lingkungan development, in-memory `PubSub` sudah cukup. Di lingkungan production multi-container (Docker/Kubernetes), Anda wajib menggunakan **RedisPubSub** agar event yang dipicu di Kontainer A dapat disebarkan ke subscriber yang tersambung di Kontainer B.
- **withFilter**: Mencegah spam data ke seluruh pengguna. Dengan `withFilter`, server hanya mengirimkan event ke subscriber jika `payload.orderId === args.orderId`.""",
            'explanationEn': """### GraphQL Subscriptions Architecture
Unlike Queries and Mutations operating over stateless HTTP POST Request-Response lifecycles, **GraphQL Subscriptions** establish persistent, full-duplex **WebSocket** connections.
When a client registers a subscription (e.g. streaming live parcel tracking), the connection remains alive. Upon server-side state mutations, the engine actively pushes updated payloads down the socket stream in real time.

### Transport Standards: graphql-ws vs Deprecated Protocols
The legacy `subscriptions-transport-ws` protocol is formally deprecated. The contemporary industry standard is the RFC-compliant **`graphql-ws`** protocol, offering superior socket reconnection resilience, heartbeats, and resource teardown ergonomics.

### PubSub Mechanics and Targeted Filtering
- **PubSub**: Decouples event emission from socket dispatch. In-memory `PubSub` suffices for single nodes. Multi-node containerized deployments mandate **RedisPubSub** to propagate events seamlessly across independent cluster nodes.
- **withFilter**: Eliminates broadcast notification spam. Utilizing `withFilter`, the subscription engine only pushes events down sockets where client arguments match mutation payloads (`payload.orderId === args.orderId`).""",
            'beginnerId': """Bayangkan Query seperti menelepon restoran setiap 1 menit untuk bertanya: 'Apakah pesanan saya sudah matang?' (Polling yang melelahkan).

Subscription seperti membawa pager alarm getar dari restoran: Anda duduk tenang di meja Anda. Saat makanan selesai dimasak oleh koki, pager Anda otomatis bergetar dan berbunyi (Push Notification langsung lewat kabel tak terlihat)!""",
            'beginnerEn': """Think of Queries like calling a pizza parlor every 60 seconds asking: 'Is my pizza out of the oven yet?' (Exhausting polling loop).

Subscriptions are like holding a restaurant buzzer pager: you relax quietly at your table. The moment the chef finishes your meal, your buzzer vibrates and lights up (instant push notification over a persistent wireless channel)!""",
            'experimentsId': [
                'Buka Apollo Sandbox dan hubungkan ke tab Subscription dengan protokol WebSocket ws://localhost:4000/graphql',
                'Jalankan mutation updateOrderStatus di tab HTTP dan amati data terdorong instan ke tab Subscription',
                'Implementasikan withFilter agar user hanya menerima notifikasi untuk orderId tertentu',
                'Putuskan koneksi WebSocket di browser untuk melihat bagaimana server menangani socket disconnect'
            ],
            'experimentsEn': [
                'Open Apollo Sandbox and establish a WebSocket subscription connection to ws://localhost:4000/graphql',
                'Execute updateOrderStatus in an HTTP tab and observe instant payload arrival in the Subscription window',
                'Apply withFilter to restrict event delivery to a matching orderId parameter',
                'Sever the WebSocket connection in browser devtools to observe server cleanup handling'
            ],
            'challengeId': 'Implementasikan sistem Live Chat Room dengan Subscriptions: schema `messageSent(roomId: ID!): Message!` dan gunakan `withFilter` agar pesan hanya terkirim ke klien yang sedang membuka ruangan chat tersebut.',
            'challengeEn': 'Build a Live Chat Room with Subscriptions: declare `messageSent(roomId: ID!): Message!` and employ `withFilter` routing messages exclusively to clients viewing that room.',
            'summaryId': 'Anda telah menguasai komunikasi data real-time dua arah menggunakan GraphQL Subscriptions, protokol standar graphql-ws, arsitektur PubSub, dan filtering notifikasi dengan withFilter.',
            'summaryEn': 'You have mastered real-time full-duplex communication via GraphQL Subscriptions, the standard graphql-ws protocol, PubSub architectures, and targeted notifications via withFilter.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Real-Time Subscriptions, Keamanan & Federation',
            'levelNameEn': 'Real-Time Subscriptions, Security & Federation',
            'topicId': 'keamanan-graphql-depth-limiting-dan-complexity',
            'titleId': 'Keamanan GraphQL: Query Depth, Complexity & Introspection',
            'titleEn': 'GraphQL Security: Query Depth, Complexity & Introspection',
            'language': 'typescript',
            'programId': 'Proteksi API GraphQL dari Serangan DoS Melalui Validasi Depth Limiting dan Cost Analysis',
            'programEn': 'GraphQL API DoS Shielding via Depth Limiting and Query Cost Analysis Validation',
            'code': """import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';

// 1. Cyclic Graph Schema Vulnerable to Circular DoS Attacks:
// user -> friends -> friends -> friends -> ... (Infinite recursion crashing server!)
const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    friends: [User!]!
  }

  type Query {
    users: [User!]!
  }
`;

// 2. Custom AST Validation Rule: Query Depth Limiting
// Traverses AST to ensure nested query depth NEVER exceeds maximum threshold (e.g. 4)
const depthLimitRule = (maxDepth: number) => {
  return (context: any) => ({
    Field: {
      enter(node: any) {
        // Compute nesting depth from AST ancestors
        const depth = context.getAncestors().filter((a: any) => a.kind === 'Field').length;
        if (depth > maxDepth) {
          context.reportError(
            new GraphQLError(`Query depth limit of ${maxDepth} exceeded! Current depth: ${depth}`, {
              nodes: [node],
              extensions: { code: 'BAD_USER_INPUT' },
            })
          );
        }
      },
    },
  });
};

// 3. Secure Production Apollo Server Configuration
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: { users: () => [] },
  },
  // Disable schema introspection and Apollo Sandbox in production to prevent schema leakage
  introspection: process.env.NODE_ENV !== 'production',
  validationRules: [
    depthLimitRule(4), // Reject circular queries deeper than 4 levels
  ],
});

console.log('🛡️ GraphQL Security Gateway hardened against DoS and Introspection scraping.');
export { depthLimitRule };
""",
            'objectivesId': [
                'Mengidentifikasi vektor serangan khas GraphQL: Serangan Rekursi Siklus (Circular Query DoS)',
                'Menerapkan aturan validasi AST kustom untuk Query Depth Limiting',
                'Mengonfigurasi analisis kompleksitas query (Query Cost Analysis) untuk membatasi pemrosesan CPU',
                'Mengamankan lingkungan production: Mematikan Introspection Schema dan menonaktifkan error stack traces'
            ],
            'objectivesEn': [
                'Identify distinctive GraphQL attack vectors: Circular Recursive Query Denial of Service (DoS)',
                'Implement custom AST validation rules enforcing strict Query Depth Limiting',
                'Configure Query Cost Complexity Analysis to bound CPU and database execution footprints',
                'Harden production environments: Disable Schema Introspection and suppress leak-prone error traces'
            ],
            'explanationId': """### Mengapa GraphQL Sangat Rentan Terhadap Serangan DoS?
Fleksibilitas GraphQL adalah pisau bermata dua. Pada API REST, endpoint dikunci oleh backend. Pada GraphQL, klien memiliki kendali penuh atas query yang dikirimkan.
Jika skema memiliki relasi dua arah (`User.friends: [User]`), seorang penyerang dapat mengirimkan query rekursif tak terbatas:
`query { users { friends { friends { friends { friends { ... } } } } } }`.
Query berukuran beberapa kilobyte ini akan memaksa server mengeksekusi miliaran operasi join database, menghabiskan 100% CPU, dan menumbangkan server dalam hitungan detik (**Billion Laughs / Circular DoS Attack**).

### Tiga Pilar Keamanan GraphQL
1. **Query Depth Limiting**: Memeriksa pohon AST (*Abstract Syntax Tree*) query sebelum dieksekusi. Jika kedalaman query melebihi ambang batas aman (misal 5 tingkat), query langsung ditolak mentah-mentah pada tahap validasi tanpa pernah menyentuh database.
2. **Query Cost Analysis (Complexity)**: Menetapkan skor poin pada setiap field (misal: field biasa bernilai 1, field list dengan perkalian `limit: 100` bernilai 100). Jika total skor query melebihi 500 poin, query dibatalkan.
3. **Disable Introspection di Production**: Fitur *Introspection* memungkinkan alat penyerang memetakan seluruh skema database Anda secara otomatis. Di server production, `introspection: false` wajib diaktifkan.""",
            'explanationEn': """### Why GraphQL is Inherently Vulnerable to DoS
GraphQL flexibility is a double-edged sword. In REST, endpoints are strictly bounded by backend implementations. In GraphQL, clients dictate graph traversal queries arbitrarily.
If a schema declares recursive relationships (`User.friends: [User]`), an attacker can dispatch a deeply nested query:
`query { users { friends { friends { friends { friends { ... } } } } } }`.
A payload under 2KB forces the database into billions of recursive joins, starving CPU and crashing backend nodes within seconds (**Circular Recursive DoS**).

### The Three Pillars of GraphQL Hardening
1. **Query Depth Limiting**: Traverses the Abstract Syntax Tree (AST) before execution. If query nesting breaches safe thresholds (e.g. depth > 5), the engine rejects the request at the validation phase before dispatching resolvers.
2. **Query Cost Complexity Analysis**: Assigns weight to attributes (e.g. scalars cost 1 point, pagination multipliers scale points by `first: 100`). If aggregate complexity breaches the ceiling, execution aborts.
3. **Disabling Introspection in Production**: Schema Introspection enables reverse-engineering tools to map your internal entities. Enforcing `introspection: false` in production is a mandatory security baseline.""",
            'beginnerId': """Bayangkan Anda membuka restoran dengan peraturan: 'Pengunjung boleh memesan burger dengan lapisan apa pun sesukanya'.
Orang iseng datang dan memesan burger dengan 10.000 lapisan keju dan daging (Circular Query DoS). Dapur Anda langsung kehabisan bahan dan koki pingsan kelelahan.

Depth Limiting seperti aturan tegas di pintu masuk: 'Maksimal pesanan burger hanya boleh 4 lapisan!'. Jika memesan lebih dari itu, pelayan langsung menolak sebelum koki mulai menyalakan kompor!""",
            'beginnerEn': """Imagine opening a burger joint with the policy: 'Customers may customize burgers with arbitrary layers'.
A rogue patron orders a burger featuring 10,000 layers of bacon and cheese (Circular Query DoS). Your kitchen burns through all inventory and chefs collapse from exhaustion.

Depth Limiting is like putting a bold sign at the register: 'Maximum 4 toppings per burger!'. Any order violating this is rejected by the cashier before the grill is even lit!""",
            'experimentsId': [
                'Kirim query dengan nesting 5 tingkat dan amati error Query depth limit of 4 exceeded!',
                'Uji perilaku introspection query: jalankan { __schema { types { name } } } saat introspection dimatikan',
                'Atur format error di Apollo Server untuk menyembunyikan stack trace internal database dari response klien',
                'Simulasikan query complexity calculator yang menghitung bobot query berdasarkan argumen pagination'
            ],
            'experimentsEn': [
                'Dispatch a 5-level nested query and verify rejection: Query depth limit of 4 exceeded!',
                'Test introspection behavior: execute { __schema { types { name } } } when introspection is disabled',
                'Configure Apollo Server formatError to sanitize database stack traces from client responses',
                'Simulate a complexity calculator weighting query costs dynamically based on pagination bounds'
            ],
            'challengeId': 'Tulis rule validasi AST GraphQL kustom yang membatasi jumlah alias (`aliasLimitRule`): tolak query jika pengguna menyertakan lebih dari 10 aliases dalam satu query untuk mencegah serangan Password Brute-Force via Aliasing.',
            'challengeEn': 'Author a custom GraphQL AST validation rule bounding aliases (`aliasLimitRule`): reject payloads containing over 10 aliases to block Password Brute-Forcing via Query Aliasing.',
            'summaryId': 'Anda telah menguasai perlindungan keamanan GraphQL: pencegahan serangan DoS siklik dengan Query Depth Limiting, analisis kompleksitas query, penutupan Introspection, dan sanitasi pesan error.',
            'summaryEn': 'You have mastered GraphQL security engineering: mitigating recursive DoS attacks with Query Depth Limiting, Query Complexity Analysis, Introspection lockdowns, and error sanitization.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Real-Time Subscriptions, Keamanan & Federation',
            'levelNameEn': 'Real-Time Subscriptions, Security & Federation',
            'topicId': 'apollo-federation-v2-arsitektur-subgraph',
            'titleId': 'Apollo Federation v2 & Arsitektur Microservices',
            'titleEn': 'Apollo Federation v2 & Microservices Architecture',
            'language': 'typescript',
            'programId': 'Deklarasi Subgraph Federasi dengan Directive @key dan Ekstensi Entitas Lintas Layanan',
            'programEn': 'Federated Subgraph Declaration with @key Directives and Cross-Service Entity Extensions',
            'code': """// ============================================================================
// SUBGRAPH 1: Products Service (Runs as independent Microservice on Port 4001)
// ============================================================================
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';

const productsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key", "@shareable"])

  # Product is a federated Entity keyed by its primary identifier 'id'
  type Product @key(fields: "id") {
    id: ID!
    sku: String!
    title: String!
    price: Float!
  }

  type Query {
    products: [Product!]!
  }
`;

const productsResolvers = {
  Query: {
    products: () => [
      { id: 'prod_001', sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 },
    ],
  },
  Product: {
    // Reference Resolver: Resolves entity when queried across OTHER subgraphs!
    __resolveReference: (reference: { id: string }) => {
      return { id: reference.id, sku: 'MCK-01', title: 'Mechanical Keyboard Pro', price: 1200000 };
    },
  },
};

const productsServer = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs: productsTypeDefs, resolvers: productsResolvers }),
});

// ============================================================================
// SUBGRAPH 2: Reviews Service (Runs independently on Port 4002)
// Extends Product entity without touching Products database!
// ============================================================================
const reviewsTypeDefs = gql`
  extend schema
    @link(url: "https://specs.apollo.dev/federation/v2.0", import: ["@key"])

  # Extend Product entity by adding reviews field
  type Product @key(fields: "id") {
    id: ID!
    reviews: [Review!]!
  }

  type Review {
    id: ID!
    rating: Int!
    body: String!
  }
`;

const reviewsResolvers = {
  Product: {
    reviews: (parent: { id: string }) => {
      return [{ id: 'rev_101', rating: 5, body: 'Superb tactile feedback!' }];
    },
  },
};

export { productsTypeDefs, productsResolvers, reviewsTypeDefs, reviewsResolvers };
""",
            'objectivesId': [
                'Memahami evolusi dari GraphQL Monolith menuju arsitektur GraphQL Terdistribusi (Apollo Federation v2)',
                'Mendefinisikan Federated Entities menggunakan directive `@key(fields: "...")`',
                'Mengimplementasikan Reference Resolver `__resolveReference` untuk resolusi entitas lintas layanan',
                'Memperluas entitas dari subgraph lain tanpa memicu keterikatan langsung (loose coupling)'
            ],
            'objectivesEn': [
                'Understand the architectural shift from monolithic GraphQL to distributed Apollo Federation v2',
                'Define Federated Entities leveraging the `@key(fields: "...")` directive',
                'Implement reference resolvers via `__resolveReference` for cross-boundary entity hydration',
                'Extend remote subgraph entities cleanly while preserving strict service isolation'
            ],
            'explanationId': """### Mengapa Apollo Federation v2?
Dalam organisasi skala besar dengan puluhan tim pengembang (misal: Tim Produk, Tim Pembayaran, Tim Ulasan), membangun satu server GraphQL monolitik raksasa menimbulkan kekacauan: konflik *merge* repositori, peluncuran deployment yang saling tergantung, dan kegagalan satu fungsi dapat melumpuhkan seluruh API.
**Apollo Federation v2** memecah skema besar menjadi layanan-layanan mikro mandiri yang disebut **Subgraphs**. Sebuah **Router Gateway** pintar menyatukan seluruh subgraph menjadi satu **Supergraph** terpadu yang tampak seperti satu API tunggal bagi klien frontend.

### Entitas Terdistribusi dan Directive @key
Di Federation, sebuah tipe data dapat dimiliki oleh satu subgraph dan diperluas oleh subgraph lainnya.
- `@key(fields: "id")`: Menandai tipe `Product` sebagai **Federated Entity**. Kunci `id` adalah pengenal unik entitas ini di seluruh ekosistem microservices.
- **Subgraph Products**: Bertanggung jawab atas data inti produk (`sku, title, price`).
- **Subgraph Reviews**: Mengembangkan tipe `Product` yang sama dengan menambahkan field `reviews`, tanpa perlu mengakses database produk secara langsung!

### Cara Kerja Gateway dan __resolveReference
Saat klien meminta: `{ products { title reviews { rating } } }`:
1. Gateway meminta `title` dan `id` produk ke Subgraph Products.
2. Gateway mengambil daftar `id` tersebut dan mengirimkannya ke Subgraph Reviews.
3. Subgraph Reviews menjalankan fungsi `__resolveReference` untuk melengkapi (*hydrate*) field ulasan berdasarkan `id` yang diterima.
Seluruh proses koordinasi jaringan ini ditangani otomatis oleh Gateway secara transparan.""",
            'explanationEn': """### Why Apollo Federation v2?
In enterprise organizations with distributed engineering teams (e.g. Core Products, Payments, Inventory, Reviews), a monolithic GraphQL server quickly becomes a deployment bottleneck: git merge collisions, uncoordinated releases, and single points of failure.
**Apollo Federation v2** decomposes monolithic graphs into autonomous microservices known as **Subgraphs**. A high-performance **Router Gateway** composes them into a unified **Supergraph**, presenting an integrated API surface to frontend clients.

### Distributed Entities and the @key Directive
In Federation, domain models transcend service boundaries:
- `@key(fields: "id")`: Flags `Product` as an **Entity**. The `id` attribute acts as the universal entity key across microservices.
- **Products Subgraph**: Authority over product core metadata (`sku, title, price`).
- **Reviews Subgraph**: Extends the `Product` entity by appending `reviews: [Review!]!`, completely decoupled from the products database.

### Gateway Orchestration and __resolveReference
When clients query: `{ products { title reviews { rating } } }`:
1. The Gateway requests product `id` and `title` from the Products Subgraph.
2. The Gateway extracts the returned entity representations and routes them to the Reviews Subgraph.
3. The Reviews Subgraph dispatches `__resolveReference` to hydrate the requested reviews against the resolved entity keys.
Orchestration plans are compiled and executed transparently by the Gateway runtime.""",
            'beginnerId': """Bayangkan Apollo Federation seperti majalah mingguan bergengsi.
Tim Jurnalis menulis artikel utama (Subgraph Produk). Tim Fotografer menyediakan foto-foto keren (Subgraph Ulasan). 
Masing-masing tim bekerja di gedungnya sendiri-sendiri tanpa saling mengganggu.

Sebelum majalah dicetak dan sampai ke tangan pembaca, Pemimpin Redaksi (Router Gateway) menyatukan teks jurnalis dan foto fotografer ke dalam satu lembar majalah yang utuh dan indah!""",
            'beginnerEn': """Think of Apollo Federation like an international news magazine.
The Journalism Bureau writes the lead articles (Products Subgraph). The Photography Studio supplies the visual imagery (Reviews Subgraph).
Both teams work in distinct physical headquarters without stepping on each other's toes.

Before the magazine hits the newsstand, the Managing Editor (Router Gateway) binds the writing and photography into one cohesive issue!""",
            'experimentsId': [
                'Inspeksi skema Supergraph hasil komposisi menggunakan tool rover subgraph check / compose',
                'Simulasikan resolver __resolveReference dengan memanggil query entity representation secara manual',
                'Gunakan directive @shareable agar field dapat diselesaikan oleh lebih dari satu subgraph secara sah',
                'Amati query execution plan di Apollo Router yang menampilkan pemecahan query ke dua subgraph terpisah'
            ],
            'experimentsEn': [
                'Inspect the composed Supergraph schema using rover subgraph check and compose tooling',
                'Simulate __resolveReference execution by manually testing entity representation query structures',
                'Apply the @shareable directive to allow fields to be resolved legitimately across multiple subgraphs',
                'Inspect the compiled query execution plan within Apollo Router visualizing multi-subgraph dispatch'
            ],
            'challengeId': 'Buat Subgraph ke-3: `Users Subgraph` yang memiliki entity `User @key(fields: "id")`. Perluas tipe `Review` di Reviews Subgraph agar field `author` merujuk ke entity `User` federasi.',
            'challengeEn': 'Author a 3rd subgraph: `Users Subgraph` declaring `User @key(fields: "id")`. Extend the `Review` entity in the Reviews Subgraph so `author` references the federated `User` entity.',
            'summaryId': 'Anda telah menguasai arsitektur GraphQL terdistribusi Apollo Federation v2: deklarasi entitas dengan @key, penyusunan subgraph mandiri, orkestrasi __resolveReference, dan komposisi supergraph.',
            'summaryEn': 'You have mastered distributed Apollo Federation v2 architecture: entity declarations via @key, decoupled subgraph design, __resolveReference resolution, and supergraph composition.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Real-Time Subscriptions, Keamanan & Federation',
            'levelNameEn': 'Real-Time Subscriptions, Security & Federation',
            'topicId': 'capstone-unified-federated-api-gateway',
            'titleId': 'Capstone Project: Unified Federated E-Commerce Gateway',
            'titleEn': 'Capstone Project: Unified Federated E-Commerce Gateway',
            'language': 'typescript',
            'programId': 'Gateway E-Commerce Terpadu: DataLoader, JWT Auth Context, dan Live Order Subscriptions',
            'programEn': 'Unified E-Commerce Gateway: DataLoader, JWT Auth Context, and Live Order Subscriptions',
            'code': """// CAPSTONE PROJECT: Unified Enterprise GraphQL API Gateway
// Integrates: SDL Contracts, Nested Resolvers, DataLoader Batching, JWT Auth Context, and Subscriptions

import { ApolloServer } from '@apollo/server';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import DataLoader from 'dataloader';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
const ORDER_SHIPPED_TOPIC = 'ORDER_SHIPPED';

// 1. Comprehensive Schema Definition Language
const typeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type Product {
    id: ID!
    sku: String!
    title: String!
    price: Float!
  }

  type OrderItem {
    id: ID!
    product: Product!
    quantity: Int!
    unitPrice: Float!
  }

  type Order {
    id: ID!
    customer: User!
    items: [OrderItem!]!
    totalAmount: Float!
    status: String!
    createdAt: String!
  }

  input CreateOrderInput {
    items: [OrderItemInput!]!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
  }

  type Query {
    myOrders: [Order!]!
    order(id: ID!): Order
  }

  type Mutation {
    placeOrder(input: CreateOrderInput!): Order!
    markOrderShipped(orderId: ID!): Order!
  }

  type Subscription {
    orderStatusUpdated(orderId: ID!): Order!
  }
`;

// 2. DataLoaders for High-Throughput Batching
const batchGetProducts = async (ids: readonly string[]) => {
  const MOCK_PRODS: Record<string, { id: string; sku: string; title: string; price: number }> = {
    p_1: { id: 'p_1', sku: 'M3-PRO', title: 'MacBook Pro 16 M3', price: 38000000 },
    p_2: { id: 'p_2', sku: 'M3-AIR', title: 'MacBook Air 15 M3', price: 21000000 },
  };
  return ids.map((id) => MOCK_PRODS[id] || null);
};

const createLoaders = () => ({
  productLoader: new DataLoader(batchGetProducts),
});

// 3. Robust Resolver Implementation
const ordersMemory: any[] = [];

const resolvers = {
  Query: {
    myOrders: (_: unknown, __: unknown, context: any) => {
      if (!context.user) throw new Error('Unauthenticated');
      return ordersMemory.filter((o) => o.customerId === context.user.id);
    },
  },
  Order: {
    customer: (parent: any) => ({
      id: parent.customerId,
      email: 'alex@example.com',
      name: 'Alex Iskandar',
    }),
  },
  OrderItem: {
    product: (parent: any, _: unknown, context: any) => {
      // Coalesces multiple order items into a single batched database lookup!
      return context.loaders.productLoader.load(parent.productId);
    },
  },
  Mutation: {
    placeOrder: (_: unknown, { input }: any, context: any) => {
      if (!context.user) throw new Error('Unauthenticated');

      const newOrder = {
        id: `ord_${Date.now()}`,
        customerId: context.user.id,
        items: input.items.map((item: any) => ({
          id: `item_${Math.random()}`,
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: 38000000,
        })),
        totalAmount: 38000000,
        status: 'PROCESSING',
        createdAt: new Date().toISOString(),
      };

      ordersMemory.push(newOrder);
      return newOrder;
    },
    markOrderShipped: (_: unknown, { orderId }: any) => {
      const order = ordersMemory.find((o) => o.id === orderId);
      if (!order) throw new Error('Order not found');

      order.status = 'SHIPPED';
      pubsub.publish(ORDER_SHIPPED_TOPIC, { orderStatusUpdated: order });
      return order;
    },
  },
  Subscription: {
    orderStatusUpdated: {
      subscribe: () => pubsub.asyncIterableIterator([ORDER_SHIPPED_TOPIC]),
    },
  },
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

console.log('🚀 Capstone Unified Federated E-Commerce Gateway compiled successfully.');
export { schema, createLoaders };
""",
            'objectivesId': [
                'Mengintegrasikan seluruh kurikulum GraphQL ke dalam satu capstone API Gateway e-commerce siap produksi',
                'Menggabungkan DataLoader batching untuk mengeliminasi masalah N+1 pada relasi produk dan item pesanan',
                'Mengisolasi otentikasi JWT dan pembuatan DataLoader per request context',
                'Menghubungkan operasi mutasi dengan notifikasi real-time Subscription berbasis WebSockets'
            ],
            'objectivesEn': [
                'Synthesize all GraphQL disciplines into a production-ready enterprise E-Commerce API Gateway capstone',
                'Harmonize DataLoader batching eliminating N+1 queries across order items and product lookups',
                'Enforce request-scoped context initialization isolating JWT security credentials and DataLoader caches',
                'Couple transactional mutation workflows with real-time WebSocket event dispatching'
            ],
            'explanationId': """### Arsitektur Capstone Unified E-Commerce Gateway
Proyek capstone ini memadukan seluruh fondasi GraphQL modern ke dalam satu arsitektur terintegrasi:
1. **Perlindungan N+1 Skala Tinggi**: Saat klien meminta daftar pesanan beserta seluruh item belanja dan spesifikasi produknya, pemanggilan resolver `OrderItem.product` dialihkan melalui `productLoader.load()`. Ratusan request produk otomatis digabungkan (*coalesced*) menjadi satu pemanggilan database massal.
2. **Keamanan Konteks Per Permintaan**: Setiap permintaan HTTP menginisialisasi konteks baru yang memvalidasi token JWT pengguna dan membuat instans DataLoader terisolasi, menjamin tidak ada data pribadi yang bocor antar-klien.
3. **Penyatuan Mutasi dan Real-Time Subscription**: Ketika admin memperbarui status pesanan menjadi `SHIPPED` melalui `markOrderShipped`, event langsung dipublikasikan ke kanal PubSub dan dikirimkan via koneksi WebSocket yang aktif ke aplikasi seluler pembeli.""",
            'explanationEn': """### Capstone Unified E-Commerce Gateway Architecture
This capstone fuses the spectrum of contemporary GraphQL engineering into a unified production architecture:
1. **High-Throughput N+1 Immunity**: When clients query order histories alongside line items and product details, `OrderItem.product` resolvers delegate to `productLoader.load()`. Hundreds of independent item lookups coalesce into a single batched database query.
2. **Request-Scoped Security & Cache Boundaries**: Every HTTP invocation instantiates an isolated context verifying JWT claims and allocating dedicated DataLoader caches, eliminating cross-tenant cache contamination.
3. **Full-Duplex Mutation & Subscription Synthesis**: When fulfillment teams update orders to `SHIPPED` via `markOrderShipped`, the mutation atomically publishes to PubSub, streaming live updates down active WebSocket channels to customer mobile clients.""",
            'beginnerId': """Selamat! Anda telah membangun gerbang API modern untuk platform e-commerce raksasa. 
Mulai dari kasir yang cepat dan tidak pernah salah mencatat menu (Schema SDL), kurir pintar yang mengangkut barang secara borongan agar tidak bolak-balik (DataLoader), gembok keamanan yang memeriksa tiket tanda pengenal setiap tamu (JWT Context), hingga layar TV live yang otomatis menyala saat kurir mengantarkan paket ke rumah Anda (Subscriptions)!""",
            'beginnerEn': """Congratulations! You have constructed a cutting-edge API Gateway for a global e-commerce enterprise.
From an unambiguous contract guaranteeing accurate order payloads (Schema SDL), to a smart courier batching deliveries in one trip (DataLoader), to a security officer inspecting credentials at the gate (JWT Context), up to an automated live screen alerting you the exact second your order ships (Subscriptions)!""",
            'experimentsId': [
                'Buat pesanan baru dengan placeOrder mutation dan verifikasi pesanan tersimpan di memori',
                'Lakukan query myOrders dengan 10 order items dan amati bagaimana DataLoader menggabungkan seluruh query produk menjadi satu query SQL',
                'Buka koneksi subscription orderStatusUpdated di WebSocket, trigger markOrderShipped, dan amati event terdorong ke subscriber',
                'Uji query tanpa header otentikasi untuk memverifikasi penolakan akses'
            ],
            'experimentsEn': [
                'Create an order via placeOrder mutation and verify persistence in memory',
                'Query myOrders with 10 nested order items and confirm DataLoader coalesces product lookups into a single batch',
                'Connect a WebSocket subscription on orderStatusUpdated, fire markOrderShipped, and observe the live pushed event',
                'Dispatch a query omitting authentication headers to verify immediate security rejection'
            ],
            'challengeId': 'Terapkan Query Complexity Calculation pada gateway capstone: tetapkan bobot 1 untuk scalar, bobot 5 untuk order items, dan tolak query jika total kompleksitas melebihi ambang batas 50 poin.',
            'challengeEn': 'Incorporate Query Complexity Calculation into the capstone gateway: assign weight 1 to scalars, weight 5 to order items, and reject queries exceeding a 50-point budget.',
            'summaryId': 'Selamat! Anda telah menguasai seluruh kurikulum GraphQL: filosofi SDL, Query & Mutation, Nested Resolvers, mitigasi N+1 dengan DataLoader, Real-Time Subscriptions via WebSockets, Keamanan Query Depth & Complexity, Apollo Federation v2, dan Capstone Federated API Gateway.',
            'summaryEn': 'Congratulations! You have mastered the entire GraphQL continuum: SDL philosophy, Queries & Mutations, Nested Resolvers, N+1 elimination via DataLoader, Real-Time Subscriptions, Query Depth & Complexity security, Apollo Federation v2, and a Federated API Gateway Capstone.'
        }
    ]

    return {
        'slug': 'graphql',
        'track_name': 'GraphQL',
        'levels': levels,
        'modules': modules
    }
