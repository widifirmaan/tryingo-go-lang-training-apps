# File Storage & Upload

> Laravel | Auth & Middleware | Pelajaran 12

## Tujuan Pembelajaran

- Mengunggah file dari form (enctype multipart, input file)
- Menyimpan file dengan $request->file()->store() ke disk public
- Memvalidasi upload (image, mimes, ukuran maksimum)
- Menampilkan file dengan Storage::url() dan memahami storage:link

---

## Program: File Storage & Upload

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilController extends Controller
{
    public function edit()
    {
        $user = auth()->user();

        return view('profil.edit', [
            'user' => $user,
            'avatarUrl' => $user->avatar ? Storage::disk('public')->url($user->avatar) : null,
        ]);
    }

    public function update(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,webp', 'max:2048'],
        ]);

        if ($request->hasFile('avatar')) {
            $data['avatar'] = $request->file('avatar')->store('avatar', 'public');
        }

        $user->update($data);

        return back()->with('sukses', 'Profil berhasil diperbarui.');
    }
}

```

---

## Penjelasan

## Form: Tiga Syarat Upload
enctype="multipart/form-data" (form), input type="file" (elemen), method POST/PUT. Tanpa enctype, browser mengirim nama file saja, bukan isi file. Validasi 'image' = cek MIME asli (bukan ekstensi), 'max:2048' = kilobita, 'mimes' = whitelist ekstensi.
## store(): Satu Baris untuk Simpan
$request->file('avatar')->store('avatar', 'public') = upload, beri nama unik, simpan di storage/app/public/avatar/. Dua argumen: folder tujuan + disk. hasFile() mengecek file benar-benar terkirim (jangan dipakai untuk validasi!).
## Disk & Public
Disk 'public' (storage/app/public) bisa diakses publik. storage:link membuat symlink public/storage -> storage/app/public. URL file: Storage::disk('public')->url($path) = /storage/avatar/abc.jpg. Di webcontainers symlink mungkin tidak jalan - cukup pahami alurnya untuk deployment sungguhan.
## Strategi Produksi
Lokal: disk public. Produksi: S3/Cloudflare R2 dengan driver s3 - kode SAMA, cukup ganti FILESYSTEM_DISK di .env. Inilah kekuatan abstraction: app tidak tahu di mana file disimpan.

---

## Eksperimen

1. **Form: Tiga Syarat Upload**
2. **store(): Satu Baris untuk Simpan**
3. **Disk & Public**
4. **Strategi Produksi**

---

## Tantangan

Bangun galeri foto: (1) buat model + migration Foto (judul, path, user_id FK) dan halaman /galeri yang menampilkan semua foto, (2) form upload galeri: validator harus menerima max:5 file sekaligus (name="fotos[]", validasi 'array' + tiap item image), (3) tampilkan tombol hapus per foto yang menghapus file dari disk dan baris dari database (Storage::delete), (4) tambah validasi dimensi (dimensions:min_width=200) untuk anti gambar terlalu kecil.

---

## Ringkasan

Upload = multipart + validasi + store(). Disk public = file terpublikasi. S3 = disk yang sama. Lanjut: Sanctum API tokens.
