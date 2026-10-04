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
┌──────────────────────────────────────────────────────────┐
│ PIPELINE PERMINTAAN NESTJS                               │
│                                                          │
│ HTTP Request ──► [Guards: Auth] ──► [Interceptors: Pre]  │
│                         │                                │
│                         ▼                                │
│              [Pipes: Validation DTO]                     │
│                         │                                │
│                         ▼                                │
│              [Controller: @Get/@Post]                    │
│                         │                                │
│                         ▼                                │
│              [Service: Business Logic]                   │
│                         │                                │
│                         ▼                                │
│ Response ◄── [Interceptors: Post] ◄── [Exception Filter] │
└──────────────────────────────────────────────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `@Controller('users')`
- **Fungsi Utama:** Dekorator pengenal rute API controller.
- **Parameter / Atribut:** `Base path string`.
- **Perilaku & Efek Sistem:** Memetakan request HTTP yang masuk ke handler method spesifik di dalam kelas controller..
- **Contoh Penggunaan Praktis:**
```typescript
@Controller('users')
export class UsersController {
  @Get(':id')
  findOne(@Param('id') id: string) { return { id }; }
}
```
- **Hasil Output yang Diharapkan:**
```output
Endpoint GET /users/:id siap diakses klien
```

### 2. `@Injectable()`
- **Fungsi Utama:** Dekorator penyedia layanan (Provider / Service).
- **Parameter / Atribut:** `Provider Scope (default: Singleton)`.
- **Perilaku & Efek Sistem:** Mendaftarkan class ke dalam IoC (Inversion of Control) Container NestJS untuk diinjeksi otomatis..
- **Contoh Penggunaan Praktis:**
```typescript
@Injectable()
export class UsersService {
  findAll() { return ['Alex', 'Budi']; }
}
```
- **Hasil Output yang Diharapkan:**
```output
Service siap diinjeksi ke Controller mana pun
```

### 3. `@Body() dto: CreateUserDto`
- **Fungsi Utama:** Ekstraksi dan validasi payload body.
- **Parameter / Atribut:** `DTO Class Schema`.
- **Perilaku & Efek Sistem:** Mengekstrak JSON body dari HTTP request dan memvalidasi aturan field via ValidationPipe..
- **Contoh Penggunaan Praktis:**
```typescript
@Post()
create(@Body() dto: CreateUserDto) {
  return this.usersService.create(dto);
}
```
- **Hasil Output yang Diharapkan:**
```output
Payload otomatis divalidasi sebelum logika dijalankan
```

### 4. `@Module({ controllers: [...], providers: [...] })`
- **Fungsi Utama:** Pengelompok modul arsitektur terstruktur.
- **Parameter / Atribut:** `controllers, providers, exports, imports`.
- **Perilaku & Efek Sistem:** Mengorganisasi aplikasi menjadi modul-modul independen dan kohesif..
- **Contoh Penggunaan Praktis:**
```typescript
@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```
- **Hasil Output yang Diharapkan:**
```output
Modul Users siap diimpor oleh modul utama AppModule
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
