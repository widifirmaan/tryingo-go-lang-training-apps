# Object & Interface

> TypeScript | Modul 4

## Tujuan Pembelajaran

- Membuat interface untuk shape objek
- Menggunakan type alias vs interface
- Menerapkan readonly dan optional properties
- Meng-extend interface dan intersection type
- Menggunakan index signatures

---

## Program: Katalog Produk

```typescript
// Interface — object shape contract
interface Product {
  id: number;
  name: string;
  price: number;
  readonly sku: string;      // cannot be changed
  stock?: number;            // optional
}

const laptop: Product = {
  id: 1,
  name: 'Laptop Pro',
  price: 15000000,
  sku: 'LAP-001',
};

laptop.price = 14000000;  // OK
// laptop.sku = 'NEW-SKU'; // Error: readonly

// Extending interfaces
interface Electronics extends Product {
  warrantyYears: number;
  powerConsumption: number;
}

const monitor: Electronics = {
  id: 2,
  name: 'Monitor 4K',
  price: 5000000,
  sku: 'MON-001',
  warrantyYears: 3,
  powerConsumption: 65,
};

// Type alias — alternative to interface
type Category = {
  id: number;
  name: string;
  parentId?: number;
};

// Intersection type
type DetailedProduct = Product & { category: Category };

const item: DetailedProduct = {
  ...laptop,
  category: { id: 1, name: 'Elektronik' },
};

console.log('Monitor:', monitor);
console.log('Item:', item);

// Index signature
interface Dictionary {
  [key: string]: string;
}
const translations: Dictionary = { hello: 'halo', world: 'dunia' };
console.log('Translate:', translations['hello']);

```

---

## Penjelasan

`interface` mendefinisikan bentuk objek. `type` alias bisa untuk union/intersection. `readonly` mencegah modifikasi properti. `?` untuk properti opsional. `extends` mewarisi interface lain. Index signature `[key: string]: Tipe` untuk properti dinamis.

---

## Eksperimen

- Ubah tipe data di setiap fungsi dan lihat error kompilasi
- Tambah properti baru ke interface dan update implementasinya
- Ganti `any` dengan `unknown` dan tambahkan type guard
- Coba kombinasi union dan intersection type yang berbeda

---

## Tantangan

Buat program yang menerapkan konsep minggu ini dalam studi kasus nyata. Gunakan type annotation eksplisit di setiap variable dan function. Pastikan tidak ada `any`. Tambahkan komentar yang menjelaskan tipe yang digunakan.

---

## Ringkasan

Modul 4 dari 16: **Object & Interface**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **5. Union, Intersection & Literal**.
