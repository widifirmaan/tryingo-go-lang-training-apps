# GraphQL Modern: Pendekatan Code-First, Resolvers & Mutations

> **Kategori:** NestJS Enterprise Architecture | **Level:** Menengah | **Minggu 6:** GraphQL Modern: Pendekatan Code-First, Resolvers & Mutations
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami pendekatan Code-First vs Schema-First pada NestJS GraphQL.
- Menggunakan decorator GraphQL: `@ObjectType`, `@Field`, `@Resolver`, `@Query`, dan `@Mutation`.
- Mencegah over-fetching dan under-fetching data pada aplikasi e-commerce modern.
- Menghasilkan skema SDL `schema.gql` secara otomatis dari kelas TypeScript.

---

## Program: GraphQL Product Resolver dengan FieldResolvers & Relasi Dinamis

```typescript
// Menggunakan @nestjs/graphql, @apollo/server, dan graphql
// Pendekatan Code-First: Skema GraphQL digenerate otomatis dari TypeScript Classes

import { Field, ObjectType, ID, Float, Int, Resolver, Query, Mutation, Args } from '@nestjs/graphql';

// 1. GraphQL Object Type (Model Data Skema)
@ObjectType()
export class ProductType {
  @Field(() => ID)
  id!: string;

  @Field()
  sku!: string;

  @Field()
  name!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => Int)
  stock!: number;

  @Field(() => Boolean)
  inStock!: boolean;
}

// 2. GraphQL Resolver (Pengganti Controller pada REST)
@Resolver(() => ProductType)
export class ProductResolver {
  private products: ProductType[] = [
    { id: '1', sku: 'SKU-001', name: 'Mechanical Keyboard RGB', price: 1250000, stock: 15, inStock: true },
    { id: '2', sku: 'SKU-002', name: 'Ultra-wide Curved Monitor', price: 6800000, stock: 0, inStock: false },
  ];

  @Query(() => [ProductType], { name: 'products', description: 'Ambil semua daftar produk katalog' })
  async getProducts(): Promise<ProductType[]> {
    return this.products;
  }

  @Query(() => ProductType, { name: 'productBySku', nullable: true })
  async getProductBySku(@Args('sku') sku: string): Promise<ProductType | undefined> {
    return this.products.find(p => p.sku === sku);
  }

  @Mutation(() => ProductType, { name: 'updateStock' })
  async updateStock(
    @Args('id', { type: () => ID }) id: string,
    @Args('newStock', { type: () => Int }) newStock: number
  ): Promise<ProductType> {
    const product = this.products.find(p => p.id === id);
    if (!product) throw new Error(`Produk dengan ID ${id} tidak ditemukan.`);

    product.stock = newStock;
    product.inStock = newStock > 0;
    return product;
  }
}

console.log('=== GRAPHQL CODE-FIRST RESOLVER TERDEFINISI ===');
console.log('Skema schema.gql digenerate otomatis saat aplikasi NestJS dinyalakan.');
```

---

## Konsep Kunci

Pada aplikasi mobile e-commerce, REST API sering kali memboroskan kuota internet pengguna karena mengirimkan seluruh field produk (over-fetching) atau mengharuskan aplikasi memanggil 3 endpoint terpisah untuk menampilkan satu layar (under-fetching). GraphQL memecahkan masalah ini dengan mengizinkan client meminta persis field yang dibutuhkannya.

### Pendekatan Code-First di NestJS
NestJS mendukung dua metode GraphQL:
1. **Schema-First**: Menulis file skema `.graphql` secara manual, lalu membuat resolver yang cocok.
2. **Code-First (Standar Industri)**: Menulis kelas TypeScript murni yang didekorasi dengan `@ObjectType()` dan `@Field()`. NestJS secara otomatis mengompilasi kelas ini menjadi file skema GraphQL (`schema.gql`). Keuntungannya: Single Source of Truth—tidak ada lagi desinkronisasi antara tipe TypeScript dan skema GraphQL.

### Resolvers dan Mutations
- `@Query()`: Digunakan untuk operasi pembacaan data (ekuivalen dengan GET pada REST).
- `@Mutation()`: Digunakan untuk operasi perubahan state atau mutasi data (ekuivalen dengan POST, PUT, DELETE).
- `@ResolveField()`: Memungkinkan pemuatan data relasional secara dinamis hanya jika field tersebut benar-benar diminta oleh kueri GraphQL client.


---

---

## Penjelasan untuk Pemula

Bayangkan memesan nasi tumpeng di restoran. REST API seperti paket nasi tumpeng kaku yang sudah ditentukan isinya (Anda terpaksa menerima ayam, telur, tempe, dan sambal meskipun Anda alergi telur). GraphQL seperti prasmanan: Anda memilih sendiri hanya ingin nasi kuning dan ayam bakar ke dalam piring Anda.

## Eksperimen

- Buka GraphQL Playground / Apollo Sandbox di browser pada `http://localhost:3000/graphql`.
- Jalankan kueri `{ products { name price } }` dan buktikan field stock dan id tidak dikirimkan ke client.
- Tambahkan decorator `@ResolveField(() => [ReviewType])` untuk memuat review produk secara lazy.

---

## Tantangan

Gunakan library `DataLoader` di dalam FieldResolver untuk memecahkan masalah N+1 Query Problem saat mengambil data kategori untuk 50 produk sekaligus.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Scope Provider Default vs Request Scope
- **Gejala / Masalah:** Menggunakan Request Scope pada service membuat performa anjlok drastis karena bean dibuat ulang setiap request.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pertahankan Singleton Scope default kecuali jika benar-benar membutuhkan data spesifik per HTTP request.

### 2. Lupa Mendaftarkan Module di `imports: []`
- **Gejala / Masalah:** Error `Nest can't resolve dependencies of the Service` saat aplikasi dijalankan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pastikan module yang mengekspor provider tersebut telah dicantumkan di array `imports` pada modul pemanggil.

### 3. Lupa Mengaktifkan ValidationPipe Global
- **Gejala / Masalah:** Payload DTO tidak divalidasi dan data kotor masuk ke database tanpa tersaring.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu pasang `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))` di `main.ts`.

---

## Ringkasan

Kamu telah menguasai GraphQL Code-First, Resolvers, dan Mutations di NestJS. Minggu depan kita mempelajari Caching Terdistribusi dengan Redis dan Interceptors.
