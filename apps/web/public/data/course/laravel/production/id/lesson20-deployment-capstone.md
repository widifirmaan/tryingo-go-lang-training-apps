# Deployment & Capstone

> Laravel | Testing & Produksi | Pelajaran 20

## Tujuan Pembelajaran

- Merangkai capstone: auth + CRUD + validasi + otorisasi pemilik
- Menyusun checklist deployment produksi yang aman
- Memahami perbedaan environment development vs produksi
- Menilai kualitas project: apa yang membuatnya siap produksi

---

## Program: Deployment & Capstone

```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        return view('posts.index', ['posts' => Post::with('penulis')->latest()->get()]);
    }

    public function create()
    {
        return view('posts.create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        Post::create($data + ['penulis_id' => auth()->id()]);

        return redirect('/posts')->with('sukses', 'Postingan dibuat!');
    }

    public function show(Post $post)
    {
        return view('posts.show', compact('post'));
    }

    public function edit(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        return view('posts.edit', compact('post'));
    }

    public function update(Request $request, Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $data = $request->validate([
            'judul' => ['required', 'string', 'max:200'],
            'isi' => ['required', 'string'],
        ]);

        $post->update($data);

        return redirect('/posts/'.$post->id)->with('sukses', 'Postingan diperbarui!');
    }

    public function destroy(Post $post)
    {
        abort_unless($post->penulis_id === auth()->id(), 403);

        $post->delete();

        return redirect('/posts')->with('sukses', 'Postingan dihapus.');
    }
}

```

---

## Penjelasan

## Capstone: Semua Konsep dalam Satu App
20 pelajaran diringkas di sini: auth session (Hash, regenerate), validasi, route model binding, relasi Eloquent, blade (auth/guest, forelse, session), dan otorisasi pemilik. Pola yang dipakai di produksi: redirect()->intended() (pengalaman pengguna), abort_unless 403 (keamanan), tombol hapus dengan konfirmasi (UI). Perhatikan BETAPA BANYAK pekerjaan yang tadinya manual sekarang gratis.
## Otorisasi Pemilik: Dua Lapis
abort_unless($post->penulis_id === auth()->id(), 403) di controller = keamanan sungguhan. @if ($post->penulis_id === auth()->id()) di blade = kenyamanan UI. Ingat pelajaran 10: ini versi inline dari Policy. Untuk skala lebih besar, pindahkan ke Policy resmi.
## Deployment: Perbedaan Lingkungan
Produksi: APP_DEBUG=false (jangan bocorkan stack trace!), APP_KEY di-generate, cache config+route (kecepatan), migrate --force, worker jalan terus, HTTPS, backup. Development: semuanya fleksibel. Kode TIDAK berubah antar lingkungan - konfigurasi yang berubah.
## Kapan Project Siap?
Bukan saat fitur selesai - saat: (1) test menutupi jalur kritis, (2) README bisa diikuti orang asing, (3) deployment bisa diulang (CI/CD), (4) kegagalan terpantau (log, monitoring). Satu project yang selesai dan ter-deploy lebih bernilai dari lima yang setengah jalan.

---

## Eksperimen

1. **Capstone: Semua Konsep dalam Satu App**
2. **Otorisasi Pemilik: Dua Lapis**
3. **Deployment: Perbedaan Lingkungan**
4. **Kapan Project Siap?**

---

## Tantangan

Bawa capstone ke level berikutnya: (1) tambah halaman profil yang menampilkan semua postingan user + statistik jumlah, (2) tambah komentar: model Komentar (post_id FK, isi, nama penulis) + CRUD dengan otorisasi yang sama, (3) tulis 5 feature test: tamu dilarang membuat postingan (redirect login), non-pemilik dapat 403 saat edit, pemilik berhasil update, postingan tidak ditemukan 404, validasi judul wajib, (4) deploy ke platform gratis (Fly.io/Render + MySQL/PostgreSQL + Redis) dan bagikan URL-nya di README.

---

## Ringkasan

Capstone merangkum: auth, CRUD, validasi, otorisasi, deployment. Kode sama, lingkungan berbeda. Anda siap Laravel!
