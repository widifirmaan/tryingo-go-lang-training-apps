# Validasi — Satpam Formulir CI4

> **Kategori:** CodeIgniter | **Level:** Menengah | **Minggu 6:** Validasi

## Tujuan Pembelajaran

- `$validation->setRules(['nama'=>'required|min_length[3]'])` cek, `withInput()->with('errors')` jika gagal

---

## Program

```php
public function simpan(){
  $valid = $this->validate([
    'nama' => 'required|min_length[3]',
    'harga' => 'required|numeric|greater_than[0]'
  ]);
  if(!$valid) return redirect()->back()->withInput()->with('errors', $this->validator->getErrors());
  (new ProdukModel())->save($this->request->getPost());
  return redirect()->to('/produk');
}
```

View: `<?= session('errors.nama') ?>` tampil error.

---

## Ringkasan

Minggu 6: **Satpam Formulir** — validasi CI4.
