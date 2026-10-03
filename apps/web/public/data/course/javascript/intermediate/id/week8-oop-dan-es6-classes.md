# Object-Oriented JavaScript: ES6 Classes, Prototype & Pewarisan

> **Kategori:** JavaScript | **Level:** DOM, Event & Arsitektur Objek | **Minggu 8:** Object-Oriented JavaScript: ES6 Classes, Prototype & Pewarisan
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami paradigma OOP di JavaScript: constructor, methods, getters, dan setters pada kelas ES6
- Menerapkan enkapsulasi data privat sejati menggunakan private fields (#saldo)
- Memahami mekanisme pewarisan (Inheritance) menggunakan extends dan super()
- Memahami Polimorfisme: meng-override method kelas induk di kelas anak
- Memahami keterkaitan kelas ES6 dengan arsitektur Prototypes bawaan JavaScript

---

## Program: Sistem Model Rekening Perbankan Berbasis Kelas ES6

```javascript
class RekeningBank {
  #saldo;
  #nomorRekening;

  constructor(pemilik, nomorRekening, saldoAwal = 0) {
    this.pemilik = pemilik;
    this.#nomorRekening = nomorRekening;
    this.#saldo = Math.max(0, saldoAwal);
  }

  get saldoSaatIni() {
    return this.#saldo;
  }

  get nomorRekeningPublik() {
    return "REK-***" + this.#nomorRekening.slice(-4);
  }

  setor(jumlah) {
    if (jumlah <= 0) throw new Error("Nominal setoran tidak valid.");
    this.#saldo += jumlah;
    return this.#saldo;
  }

  tarik(jumlah) {
    if (jumlah <= 0 || jumlah > this.#saldo) throw new Error("Saldo tidak mencukupi.");
    this.#saldo -= jumlah;
    return this.#saldo;
  }
}

class RekeningBisnis extends RekeningBank {
  constructor(pemilik, nomorRekening, saldoAwal, limitOverdraft = 5000000) {
    super(pemilik, nomorRekening, saldoAwal);
    this.limitOverdraft = limitOverdraft;
  }

  tarik(jumlah) {
    if (jumlah > (this.saldoSaatIni + this.limitOverdraft)) {
      throw new Error("Penarikan melebihi plafon limit bisnis.");
    }
    return super.tarik(jumlah);
  }
}

const akun = new RekeningBisnis("PT Nusa Digital", "1234567890", 10000000);
akun.setor(2500000);
console.log("Pemilik   :", akun.pemilik);
console.log("Rekening  :", akun.nomorRekeningPublik);
console.log("Saldo     : Rp", akun.saldoSaatIni.toLocaleString("id-ID"));
```

---

## Konsep Kunci

### Kelas ES6 & Private Fields (#)
ES6 menghadirkan sintaks `class` yang bersih di atas sistem Prototype JavaScript.
Dengan **Private Fields (`#properti`)**, data diisolasi secara mutlak di tingkat engine. Mengakses `akun.#saldo` langsung dari luar kelas akan memicu SyntaxError!

---

---

## Penjelasan untuk Pemula

### Analogi: Brankas Mesin ATM
Private field `#saldo` seperti brankas tertutup di dalam mesin ATM: pengguna hanya bisa bertransaksi melalui tombol menu `.tarik()` dan `.setor()`, bukan mencongkel brankas uangnya langsung.

## Eksperimen

- Coba akses akun.#saldo langsung di konsol dan amati SyntaxError pelindung private field.
- Lakukan penarikan melebihi saldo untuk menguji lemparan error.
- Gunakan akun instanceof RekeningBank untuk membuktikan rantai pewarisan prototype.
- Tambahkan static method pada kelas untuk fungsi utilitas bersama.

---

## Tantangan

Buat kelas induk `Kendaraan` dan kelas turunan `MobilListrik` dengan private field `#kapasitasBaterai` serta method `isiDaya()`.

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

### 1. Perilaku Equality Lemah (== vs ===)
- **Gejala / Masalah:** Coercion tipe data tak terduga (misal `0 == ''` bernilai `true`).
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu gunakan operator strict equality (`===` dan `!==`).

### 2. Mutasi Objek & Array secara Langsung
- **Gejala / Masalah:** Perubahan state tidak terdeteksi oleh reactive framework atau memicu bug sampingan tak terduga.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan spread operator (`{ ...obj }`, `[...arr]`) atau metode immutable seperti `.map()`, `.filter()`, dan `.toSorted()`.

### 3. Unhandled Promise Rejection & Async/Await tanpa Try-Catch
- **Gejala / Masalah:** Aplikasi crash atau thread backend macet tanpa log error yang jelas.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Selalu bungkus `await` dalam blok `try { ... } catch (err) { ... }`.

---

## Ringkasan

Kamu telah menguasai pemrograman berorientasi objek dengan kelas ES6. Minggu depan kita memasuki Level 3: Event Loop V8 dan pemrograman asinkron.
