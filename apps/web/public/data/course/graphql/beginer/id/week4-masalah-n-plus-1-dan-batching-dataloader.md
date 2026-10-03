# Masalah N+1 Query & Batching dengan DataLoader

> **Kategori:** GraphQL | **Level:** Fondasi Skema & Eksekusi Query/Mutation | **Minggu 4:** Masalah N+1 Query & Batching dengan DataLoader
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mendiagnosis bahaya mematikan N+1 Query Problem pada arsitektur pohon resolver GraphQL
- Memahami cara kerja batching berbasis Event Loop tick menggunakan library DataLoader
- Menjaga integritas kontrak batch function: ukuran array output wajib sama dan terurut sesuai kunci input
- Mencegah kebocoran data antar-pengguna dengan menginisialisasi instance DataLoader baru di setiap request HTTP Context

---

## Program: Eliminasi N+1 Problem Menggunakan Batching dan Caching DataLoader

```typescript
import DataLoader from 'dataloader';

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
```

---

## Konsep Kunci

### Bahaya Mematikan Masalah N+1 Query
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
2. **Scoping per Request**: Instance DataLoader **wajib dibuat baru untuk setiap request HTTP** di dalam fungsi GraphQL Context. Jika Anda membuat instance DataLoader secara global, pengguna A bisa melihat data privat pengguna B yang tersimpan di memori cache internal loader!

---

---

## Penjelasan untuk Pemula

Bayangkan Anda tinggal di asrama mahasiswa bersama 20 teman. 
Tanpa DataLoader (Masalah N+1): 20 mahasiswa berjalan satu per satu ke minimarket di ujung gang untuk membeli 1 kaleng soda yang sama. Minimarket didatangi 20 kali bolak-balik (capek dan boros bensin).

Dengan DataLoader: Mahasiswa pertama menaruh kotak kardus di lobi selama 1 menit. Setiap orang yang butuh soda menuliskan pesanannya di kotak itu. Satu kurir membawa kotak itu ke minimarket sekali jalan, membeli 20 soda sekaligus, lalu membagikannya ke masing-masing kamar!

## Eksperimen

- Jalankan skrip simulasi dan verifikasi di console log bahwa hanya ada 1 query SQL yang terpanggil untuk 5 buku
- Coba minta author yang sama 3 kali (auth_1) dan perhatikan DataLoader hanya menyertakan auth_1 satu kali dalam array batch SQL (deduplication)
- Sengaja kembalikan array hasil batch dengan panjang yang berbeda dari keys dan amati error yang dilempar DataLoader
- Uji fitur priming cache: panggil loader.prime(key, value) sebelum load dipanggil

---

## Tantangan

Implementasikan `ordersByCustomerLoader`: buat DataLoader untuk relasi One-to-Many di mana satu customerId mengembalikan array `Order[]`, dan pastikan pemetaan array-nya benar.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Query Bersarang Tanpa Batas (Denial of Service)
- **Gejala / Masalah:** Pengguna jahat mengirim query rekursif tak terhingga yang merubuhkan server backend.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Terapkan middleware pembatas kedalaman (*depth limiting*) dan kalkulasi biaya query (*query complexity*).

### 2. N+1 Problem pada Resolver Lapangan
- **Gejala / Masalah:** Resolver anak memanggil database secara berulang untuk setiap objek induk dalam array.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan pustaka `DataLoader` untuk menggabungkan (*batching*) dan menyimpan cache pemanggilan database.

### 3. Menyerahkan Seluruh Error Internal ke Klien
- **Gejala / Masalah:** Stack trace sensitif database dan password dapat terbaca oleh publik di response error.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Filter pesan error di tingkat server formatError sebelum dikirimkan kembali ke klien.

---

## Ringkasan

Anda telah menguasai diagnosis dan resolusi masalah N+1 Query: coalescing microtask event loop dengan DataLoader, aturan pemetaan batch array, dan isolasi cache per request.
