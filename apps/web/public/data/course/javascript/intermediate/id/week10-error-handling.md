# Error Handling — Alarm Warung Tidak Panik

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 10:** Error Handling

## Tujuan Pembelajaran

- `try { ... } catch (err) { ... } finally { ... }` — coba, jika gagal tangkap, akhirnya tutup
- `throw new Error("stok habis")` buat alarm sendiri
- `async try/catch` untuk `await fetch`

---

## Kenapa Ini Penting Buat Kamu?

Tanpa `try/catch`, `JSON.parse` data rusak → warung crash, layar putih. Dengan `try`, tampil "Data rusak, coba lagi" — tidak panik.

---

## Program: Kasir Anti-Crash

```javascript
function parseStok(json){
  try {
    const data = JSON.parse(json); // bisa gagal jika json rusak
    if (!data.nama) throw new Error("Nama wajib");
    console.log("Sukses:", data);
    return data;
  } catch (err) {
    console.log("Gagal:", err.message);
    return { nama: "Tidak diketahui", stok: 0 };
  } finally {
    console.log("Selesai cek");
  }
}

parseStok('{"nama":"Beras","stok":10}');
parseStok('rusak{');
parseStok('{"stok":10}'); // tanpa nama → throw

async function ambil(){
  try {
    const res = await fetch("https://api.warung.com/produk");
    if (!res.ok) throw new Error("Gagal fetch " + res.status);
    const data = await res.json();
    console.log(data);
  } catch (err){
    console.log("Ambil gagal:", err.message);
  }
}
```

---

## Konsep Kunci

### `try/catch/finally`
`try` coba, `catch` tangkap error, `finally` selalu jalan (tutup pintu).

### `throw`
Buat error sendiri `throw new Error("stok habis")`.

### `async` + `try`
`await` yang gagal harus `try/catch`, tidak `.catch` saja.

---

## Penjelasan untuk Pemula

### Analogi: Alarm Kebakaran
- **`try` = coba masak**, **`catch` = jika kompor meledak, padamkan**, **`finally` = matikan gas**.

---

## Tantangan

**Warung Aman:** `function hitung(harga,qty){ if(qty<=0) throw new Error("Qty salah"); return harga*qty }` → `try { hitung(62000,0)} catch(e){ console.log(e.message)}`.

---

## Ringkasan

Minggu 10: **Alarm Anti-Panik** — `try/catch` biar warung tidak crash.
