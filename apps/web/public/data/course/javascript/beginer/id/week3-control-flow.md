# Control Flow — Jika Stok Habis, Apa yang Dilakukan?

> **Kategori:** JavaScript | **Level:** Pemula | **Minggu 3:** Control Flow

## Tujuan Pembelajaran

- Putuskan jalur dengan `if / else if / else` — seperti cabang jalan
- Singkat dengan **ternary** `nilai >= 70 ? "Lulus" : "Gagal"`
- Banyak pilihan tetap dengan `switch` (hari Senin-Jumat)
- Ulangi kerja dengan **loop**: `for`, `while`, `for...of` (daftar), `for...in` (kartu)
- Hentikan/lompati dengan `break` & `continue`

---

## Kenapa Ini Penting Buat Kamu?

Warung: **jika stok habis → tampil "Habis", jika tidak → "Beli"**. Guru: **jika nilai 85 → B, 90 → A**. Tanpa `if`/`loop`, kamu tulis manual tiap kasus. Dengan control flow, komputer putuskan sendiri ribuan kali.

---

## Program: Penilaian & Stok Otomatis

```javascript
// ── 1. If Bertingkat — seperti filter nilai rapor ──
const nilai = 85;
if (nilai >= 90) {
  console.log("Grade: A — Istimewa!");
} else if (nilai >= 80) {
  console.log("Grade: B — Bagus");
} else if (nilai >= 70) {
  console.log("Grade: C — Cukup");
} else {
  console.log("Grade: D — Belajar lagi");
}

// Ternary — if 1 baris
const status = nilai >= 70 ? "Lulus ✅" : "Tidak Lulus ❌";
console.log("Status:", status);

// ── 2. Switch — cocok untuk pilihan tetap ──
const hari = "Jumat";
switch (hari) {
  case "Senin": console.log("Semangat Senin!"); break;
  case "Jumat": console.log("Besok libur!"); break;
  case "Sabtu":
  case "Minggu": console.log("Libur 🎉"); break;
  default: console.log("Hari kerja biasa");
}

// ── 3. For Loop — hitung 1 sampai 5 (seperti cap 5x) ──
console.log("\n=== For 1-5 ===");
for (let i = 1; i <= 5; i++) {
  console.log("Hitung:", i);
}

// ── 4. For...Of — untuk daftar (array) ──
const stok = ["beras", "minyak", "gula"];
console.log("\n=== Cek Stok ===");
for (const barang of stok) {
  console.log("Cek:", barang);
}

// ── 5. For...In — untuk kartu (object) ──
const profil = { nama: "Budi", umur: 25, kota: "Jakarta" };
console.log("\n=== Profil ===");
for (const kunci in profil) {
  console.log(kunci + ":", profil[kunci]);
}

// ── 6. While — selama masih ada stok ──
console.log("\n=== While ===");
let sisa = 3;
while (sisa > 0) {
  console.log("Sisa stok:", sisa);
  sisa--;
}

// ── 7. Break & Continue — seperti sortir apel busuk ──
console.log("\n=== Break & Continue ===");
for (let i = 1; i <= 10; i++) {
  if (i === 5) { console.log("Stop di 5 (break)"); break; }
  if (i % 2 === 0) continue; // skip genap
  console.log("Ganjil sebelum 5:", i);
}

// ── Gabungan nyata: hitung total belanja yang stok ada ──
const keranjang = [
  { nama: "Beras", harga: 62000, ada: true },
  { nama: "Gula", harga: 15000, ada: false },
  { nama: "Minyak", harga: 34000, ada: true },
];
let total = 0;
for (const item of keranjang) {
  if (!item.ada) continue;
  total += item.harga;
}
console.log("\nTotal yang bisa dibeli: Rp", total.toLocaleString("id-ID"));
```

---

## Konsep Kunci

### `if / else if / else` = Cabang Jalan
Cek dari atas, berhenti saat pertama `true`. `else` = jalan terakhir jika semua gagal.

### Ternary = If Mini
`kondisi ? jikaYa : jikaTidak` — untuk 1 baris.

### `switch` = Banyak Pintu dengan Label
Cocok jika bandingkan 1 variabel dengan banyak nilai tetap. **Jangan lupa `break`** kalau tidak akan "bocor" ke case bawah.

### Loop = Cap Berulang
- `for (let i=1; i<=5; i++)` — tahu jumlah pasti
- `while (sisa > 0)` — selama kondisi
- `for...of` — untuk array, `for...in` — untuk object

### `break` / `continue`
- `break` = **keluar** loop
- `continue` = **skip** 1 putaran, lanjut berikutnya

---

## Penjelasan untuk Pemula

### Analogi

- **`if` = penjaga toko**: "Jika stok >0, silakan beli. Jika tidak, maaf habis."
- **`switch` = papan hari**: Senin lakukan A, Jumat lakukan B — tanpa if bertingkat panjang.
- **`for` = cap stempel**: cap 5x dengan nomor berbeda `i=1..5`.
- **`for...of` = cek rak satu per satu**: ambil tiap barang di rak, cek satu-satu.
- **`break` = rem darurat**, `continue` = loncat 1 anak tangga.

### Cara Komputer Membaca

1. `if (nilai >= 90)` → cek 85>=90? false → lanjut `else if (85>=80)` true → cetak B → **stop**, tidak cek C/D.
2. `for (let i=1; i<=5; i++)` → `i=1` cetak, `i++` jadi 2, cek 2<=5 true → cetak, sampai `i=6` stop.

### 3 Istilah Wajib

1. **Kondisi**: pertanyaan ya/tidak (`nilai >= 70`)
2. **Loop**: ulang kerja
3. **break/continue**: kontrol loop

---

## Eksperimen

- **Hijau:** Ubah `nilai = 95` → Grade apa? Ubah `hari = "Minggu"` → apa?
- **Kuning:** Buat `for` dari 10 ke 1 mundur `for(let i=10; i>=1; i--)`
- **Merah:** Hapus `break` di `switch` Jumat → lihat "bocor" cetak 2 baris. Pasang lagi.

---

## Tantangan

**Tebak Angka Warung:** Komputer pilih `angkaRahasia = 7` (hardcode). Buat `for` 5x coba tebak dari array `[3,9,7]`, tiap coba: jika `tebakan === rahasia` → `break` dan cetak "Benar!", jika `tebakan < rahasia` → "Terlalu kecil", else "Terlalu besar". Jika loop habis tanpa benar → "Gagal 5x".

Bonus: pakai `continue` untuk skip tebakan `null`.

---

## Glosarium Mini

- **if/else**: cabang
- **switch**: banyak pilihan
- **loop**: perulangan
- **for...of/in**: loop daftar/kartu
- **break/continue**: hentikan/lompati

---

## Ringkasan

Minggu 3 dari 14: **Control Flow** (Level: Pemula). Kamu bisa putuskan jalur dan ulang kerja otomatis. Minggu depan: **Fungsi** — bikin resep yang bisa dipakai ulang tanpa tulis ulang.
