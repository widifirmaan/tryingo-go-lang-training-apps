# Keamanan GraphQL: Query Depth, Complexity & Introspection

> **Kategori:** GraphQL | **Level:** Real-Time Subscriptions, Keamanan & Federation | **Minggu 6:** Keamanan GraphQL: Query Depth, Complexity & Introspection

## Tujuan Pembelajaran

- Mengidentifikasi vektor serangan khas GraphQL: Serangan Rekursi Siklus (Circular Query DoS)
- Menerapkan aturan validasi AST kustom untuk Query Depth Limiting
- Mengonfigurasi analisis kompleksitas query (Query Cost Analysis) untuk membatasi pemrosesan CPU
- Mengamankan lingkungan production: Mematikan Introspection Schema dan menonaktifkan error stack traces

---

## Program: Proteksi API GraphQL dari Serangan DoS Melalui Validasi Depth Limiting dan Cost Analysis

```typescript
import { ApolloServer } from '@apollo/server';
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
```

---

## Konsep Kunci

### Mengapa GraphQL Sangat Rentan Terhadap Serangan DoS?
Fleksibilitas GraphQL adalah pisau bermata dua. Pada API REST, endpoint dikunci oleh backend. Pada GraphQL, klien memiliki kendali penuh atas query yang dikirimkan.
Jika skema memiliki relasi dua arah (`User.friends: [User]`), seorang penyerang dapat mengirimkan query rekursif tak terbatas:
`query { users { friends { friends { friends { friends { ... } } } } } }`.
Query berukuran beberapa kilobyte ini akan memaksa server mengeksekusi miliaran operasi join database, menghabiskan 100% CPU, dan menumbangkan server dalam hitungan detik (**Billion Laughs / Circular DoS Attack**).

### Tiga Pilar Keamanan GraphQL
1. **Query Depth Limiting**: Memeriksa pohon AST (*Abstract Syntax Tree*) query sebelum dieksekusi. Jika kedalaman query melebihi ambang batas aman (misal 5 tingkat), query langsung ditolak mentah-mentah pada tahap validasi tanpa pernah menyentuh database.
2. **Query Cost Analysis (Complexity)**: Menetapkan skor poin pada setiap field (misal: field biasa bernilai 1, field list dengan perkalian `limit: 100` bernilai 100). Jika total skor query melebihi 500 poin, query dibatalkan.
3. **Disable Introspection di Production**: Fitur *Introspection* memungkinkan alat penyerang memetakan seluruh skema database Anda secara otomatis. Di server production, `introspection: false` wajib diaktifkan.

---

---

## Penjelasan untuk Pemula

Bayangkan Anda membuka restoran dengan peraturan: 'Pengunjung boleh memesan burger dengan lapisan apa pun sesukanya'.
Orang iseng datang dan memesan burger dengan 10.000 lapisan keju dan daging (Circular Query DoS). Dapur Anda langsung kehabisan bahan dan koki pingsan kelelahan.

Depth Limiting seperti aturan tegas di pintu masuk: 'Maksimal pesanan burger hanya boleh 4 lapisan!'. Jika memesan lebih dari itu, pelayan langsung menolak sebelum koki mulai menyalakan kompor!

## Eksperimen

- Kirim query dengan nesting 5 tingkat dan amati error Query depth limit of 4 exceeded!
- Uji perilaku introspection query: jalankan { __schema { types { name } } } saat introspection dimatikan
- Atur format error di Apollo Server untuk menyembunyikan stack trace internal database dari response klien
- Simulasikan query complexity calculator yang menghitung bobot query berdasarkan argumen pagination

---

## Tantangan

Tulis rule validasi AST GraphQL kustom yang membatasi jumlah alias (`aliasLimitRule`): tolak query jika pengguna menyertakan lebih dari 10 aliases dalam satu query untuk mencegah serangan Password Brute-Force via Aliasing.

---

## Ringkasan

Anda telah menguasai perlindungan keamanan GraphQL: pencegahan serangan DoS siklik dengan Query Depth Limiting, analisis kompleksitas query, penutupan Introspection, dan sanitasi pesan error.
