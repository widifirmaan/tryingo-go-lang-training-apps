# Fungsi & Trigger — Resep Otomatis Gudang PostgreSQL

> **Kategori:** PostgreSQL | **Level:** Pemula | **Minggu 5:** Fungsi & Trigger
> **Prasyarat:** Minggu 4 — **Index & Optimasi**.

## Tujuan Pembelajaran

- `CREATE FUNCTION hitung_pajak(harga) RETURNS DECIMAL ... LANGUAGE plpgsql` resep di gudang (sumber: postgresql.org/docs/plpgsql)
- `CREATE TRIGGER ... BEFORE INSERT` alarm otomatis tiap tambah barang

---

## Kenapa Ini Penting Buat Kamu?

Hitung pajak 11% di 10 tempat (JS, Python, laporan) → 1 tempat lupa, total beda. Dengan `FUNCTION` di DB, semua pakai rumus sama. Trigger cegah `stok` minus otomatis — tanpa andalkan aplikasi.

---

## Program: Resep & Alarm Gudang

```sql
-- 1. Fungsi: resep pajak (sekali simpan, pakai selamanya)
CREATE OR REPLACE FUNCTION hitung_total_pajak(harga DECIMAL, persen DECIMAL DEFAULT 11)
RETURNS DECIMAL AS $$
BEGIN
  RETURN harga + (harga * persen / 100);
END;
$$ LANGUAGE plpgsql;

SELECT nama, harga, hitung_total_pajak(harga) AS total FROM produk;

-- 2. Trigger: alarm tolak stok minus
CREATE OR REPLACE FUNCTION tolak_stok_minus()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stok < 0 THEN
    RAISE EXCEPTION 'Stok % tidak boleh minus!', NEW.nama;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cek_stok
BEFORE INSERT OR UPDATE ON produk
FOR EACH ROW EXECUTE FUNCTION tolak_stok_minus();

-- Coba langgar!
UPDATE produk SET stok = -5 WHERE id = 1;
-- ERROR: Stok Beras tidak boleh minus!
```

---

## Konsep Kunci

### `FUNCTION` = Resep di Gudang
`CREATE FUNCTION ... RETURNS ... AS $$ BEGIN ... END; $$ LANGUAGE plpgsql` — panggil seperti `hitung_total_pajak(harga)`.

### `TRIGGER` = Alarm Otomatis
`BEFORE INSERT OR UPDATE ... FOR EACH ROW` → cek tiap baris → `RAISE EXCEPTION` tolak.

### `NEW` = Barang Baru
`NEW.stok` nilai yang mau masuk. `RETURN NEW` loloskan, `RAISE` tolak.

---

## Penjelasan untuk Pemula

### Analogi: Resep Dinding & Alarm
- **Function = resep ditempel**: semua kasir pakai rumus sama.
- **Trigger = alarm pintu**: barang minus → bunyi, tolak.

### Langkah 0 — Siapkan Device
- Sama W1: Supabase SQL Editor / `psql`.

### Cara Komputer Membaca
1. `SELECT hitung_total_pajak(62000)` → jalankan `BEGIN...END` → 68820.
2. `UPDATE stok=-5` → trigger `BEFORE` → `RAISE` → batal + pesan.

### 3 Istilah Wajib
1. **Function/plpgsql**: resep/bahasa-resep
2. **Trigger/NEW**: alarm/barang-baru

---

## Eksperimen

- **Hijau:** `SELECT hitung_total_pajak(100000, 10)` → 110000?
- **Kuning:** `UPDATE stok = 0` (tidak minus) → lolos?
- **Merah:** `DROP FUNCTION hitung_total_pajak` → query laporan error? Buat lagi.

---

## Tantangan

**Gudang Otomatis:** Function `diskon(harga, persen)` + trigger tolak `harga <= 0` + `SELECT` 3 produk pakai function. **Selesai Beginner PostgreSQL!**

---

## Glosarium Mini

- **Function/Trigger/RAISE**: resep/alarm/tolak

---

## Ringkasan

Minggu 5 dari 5: **Resep & Alarm Otomatis** (Level: Pemula). **Selesai Beginner PostgreSQL!** Lanjut: **Window Functions** (Menengah).
