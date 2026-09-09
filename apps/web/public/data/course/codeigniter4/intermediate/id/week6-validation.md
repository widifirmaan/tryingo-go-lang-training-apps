# Validasi — Satpam Formulir CI4 Resmi

> **Kategori:** CodeIgniter | **Level:** Menengah | **Minggu 6:** Validation & Form Handling
> **Prasyarat:** Minggu 5 — **Migrations & Seeds**.

## Tujuan Pembelajaran

- `$this->validate(['nama' => 'required|min_length[3]'])` cek + `redirect()->back()->withInput()` kembalikan isian (sumber: codeigniter.com/user_guide/libraries/validation)
- `validation_list_errors()` tampilkan + `old('nama')` isi lagi

---

## Kenapa Ini Penting Buat Kamu?

Tanpa validasi, nama kosong masuk DB → laporan rusak. Tanpa `withInput`, gagal 1 kolom → 10 kolom diketik ulang (pelanggan kabur!). `min_length[3]` cegah "X".

---

## Program: Satpam Warung CI4

```php
// Controller: app/Controllers/Produk.php
public function simpan() {
  if (!$this->validate([
    'nama' => 'required|min_length[3]',
    'harga' => 'required|numeric|greater_than[0]',
  ])) {
    return redirect()->back()->withInput(); // kembalikan + error!
  }
  (new \App\Models\ProdukModel())->save($this->request->getPost());
  return redirect()->to('/produk');
}
```

```php
<!-- View: tampilkan error + isi lama -->
<?php if (session('errors')): ?>
  <ul><?php foreach (session('errors') as $e): ?><li><?= esc($e) ?></li><?php endforeach; ?></ul>
<?php endif; ?>
<form method="post" action="/produk/simpan">
  <input name="nama" value="<?= old('nama') ?>" placeholder="Nama">
  <input name="harga" value="<?= old('harga') ?>" placeholder="Harga">
  <button>Simpan</button>
</form>
```

---

## Konsep Kunci

### `validate([...])` = Periksa Sekaligus
`required|min_length[3]` pipa aturan. Gagal → `false` + error di session.

### `withInput()` + `old()` = Jangan Ulangi
Kembalikan isian → `old('nama')` tampil lagi.

---

## Penjelasan untuk Pemula

### Analogi: Satpam + Fotokopi Formulir
- **validate = satpam cek**, **withInput = fotokopi** formulir yang ditolak (tidak isi ulang).

### Langkah 0 — Siapkan Device
- Sama CI4 W1: `php spark serve` di `8080`.

### Cara Komputer Membaca
1. POST → `validate` → gagal? Simpan error + input ke session → `back()`.
2. View baca `session('errors')` + `old('nama')`.

### 3 Istilah Wajib
1. **validate/withInput**: cek/kembalikan
2. **old/errors**: isi-lama/salah

---

## Eksperimen

- **Hijau:** Kirim kosong → error + isian kembali?
- **Kuning:** `greater_than[0]` + harga -5 → ditolak?
- **Merah:** Tanpa `withInput` → isian hilang (kesal)? Pasang.

---

## Tantangan

**Warung Bersatpam:** `nama` + `harga` + `stok` validasi + error list + `old()` semua + screenshot gagal & lolos.
- **Sambungan (Minggu 5 — Migrations & Seeds):** pasang hasil tantangan ini ke alur itu; pastikan ujung-ke-ujung jalan.

---
## Glosarium Mini

- **validate/withInput/old**: cek/kembali/isi-lama

---

## Ringkasan

Minggu 6 dari 10: **Satpam Formulir** (Level: Menengah). Gagal tidak mengulang. Minggu depan: **Auth**.
