# Class di TypeScript

> TypeScript | Modul 10

## Tujuan Pembelajaran

- Membuat class dengan typed properties
- Menggunakan public, private, protected
- Menerapkan implements untuk contract
- Membuat abstract class dan method
- Menggunakan parameter properties

---

## Program: Sistem Peminjaman

```typescript
// Class dengan typed properties
class Animal {
  constructor(
    public name: string,      // parameter property
    private age: number,
    protected species: string
  ) {}

  public speak(): string {
    return `${this.name} makes a sound`;
  }

  protected getAge(): number {
    return this.age;
  }
}

const dog = new Animal('Dog', 3, 'Canine');
console.log(dog.speak());
// dog.age; // Error: private

// Abstract class
abstract class Vehicle {
  constructor(public brand: string) {}
  abstract start(): string;
  abstract stop(): string;
  info(): string { return `Vehicle: ${this.brand}`; }
}

class Car extends Vehicle {
  start(): string { return 'Engine started'; }
  stop(): string { return 'Engine stopped'; }
}

const myCar = new Car('Toyota');
console.log(myCar.info());
console.log(myCar.start());

// implements — contract from interface
interface Flyable {
  fly(): string;
  land(): string;
}

class Airplane implements Flyable {
  fly(): string { return 'Flying at 30,000 ft'; }
  land(): string { return 'Landing gear deployed'; }
}

// Static typed property
class Config {
  static readonly VERSION: string = '1.0.0';
  static getAppName(): string { return 'Tryngo App'; }
}
console.log(Config.VERSION);
console.log(Config.getAppName());

```

---

## Penjelasan

Class TypeScript: properti harus dideklarasikan dengan tipe. Access modifiers: `public`, `private`, `protected`. Parameter properties: `constructor(public nama: string)`. `implements` memaksa class mengikuti interface. Abstract class tidak bisa diinstansiasi langsung.

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

Modul 10 dari 16: **Class di TypeScript**. TypeScript memberikan type safety tanpa mengorbankan fleksibilitas JavaScript. Minggu depan: **11. Module & Deklarasi**.
