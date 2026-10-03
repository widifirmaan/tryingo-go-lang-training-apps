# Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable

> **Kategori:** Ruby on Rails 8 | **Level:** Menengah | **Minggu 5:** Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai aksi manipulasi DOM Turbo Streams: `append`, `prepend`, `replace`, `update`, dan `remove`.
- Memahami Rails 8 Solid Cable (server WebSocket bawaan berbasis database berkinerja tinggi tanpa dependensi Redis).
- Menggunakan makro model `broadcasts_to` untuk reaktivitas multi-user instan dengan 1 baris kode.
- Membangun antarmuka kolaborasi tim real-time tanpa menulis satu baris pun kode JavaScript klien.

---

## Program: Papan Kolaborasi Tugas Real-Time Multi-User dengan Turbo Streams & Solid Cable

```ruby
# app/models/task.rb (Real-Time Broadcasting Lifecycle Callbacks)
class Task < ApplicationRecord
  belongs_to :project

  # Rails 8: Otomatis broadcast pembaruan ke seluruh browser tim via Solid Cable!
  # Action: append (tambah ke list), replace (update kartu), remove (hapus dari DOM)
  broadcasts_to ->(task) { [task.project, :tasks] }, inserts_by: :prepend

  # broadcasts_to setara dengan:
  # after_create_commit  -> { broadcast_prepend_to [project, :tasks], target: "tasks_list" }
  # after_update_commit  -> { broadcast_replace_to [project, :tasks] }
  # after_destroy_commit -> { broadcast_remove_to  [project, :tasks] }
end

# app/views/projects/show.html.erb (Berlangganan Stream WebSocket)
# Tag turbo_stream_from membuka koneksi WebSocket Solid Cable di background
<%= turbo_stream_from @project, :tasks %>

<div class="kanban-board">
  <h2>Daftar Tugas Proyek: <%= @project.name %></h2>

  <!-- Kontainer tempat tugas baru otomatis disisipkan secara real-time -->
  <div id="tasks_list" class="space-y-2">
    <%= render @project.tasks %>
  </div>
</div>

# Format Respons Turbo Stream di Controller (tasks_controller.rb):
# respond_to do |format|
#   format.turbo_stream
#   format.html { redirect_to @project }
# end

puts "=== RAILS 8 SOLID CABLE & TURBO STREAMS BROADCASTING ACTIVE ==="
```

---

## Konsep Kunci

Selama lebih dari satu dekade, menambahkan fitur real-time (seperti live chat atau papan kolaborasi tim multi-pengguna) di web membutuhkan pengaturan server Redis yang rumit, dependensi Pusher berbayar, dan ratusan baris kode state management di frontend (Redux / Zustand).

### Revolusi Rails 8 Solid Cable
Di Rails 8, Rails memperkenalkan **Solid Cable**: mesin backend WebSockets berkinerja tinggi yang ditenagai langsung oleh database PostgreSQL atau SQLite Anda menggunakan fitur polling I/O modern. Anda **tidak perlu menginstal server Redis** terpisah hanya untuk fitur WebSockets!

### Keajaiban broadcasts_to pada Turbo Streams
Cukup dengan menambahkan satu baris di model Task:
`broadcasts_to ->(task) { [task.project, :tasks] }`
Ketika Pengguna A membuat atau menggeser tugas di laptopnya, model Task secara otomatis memancarkan frame WebSocket via Solid Cable ke browser Pengguna B di belahan dunia lain. Browser Pengguna B langsung menyisipkan atau memperbarui elemen kartu tugas di layar dalam hitungan milidetik secara mulus!


---

---

## Penjelasan untuk Pemula

Bayangkan papan pengumuman bandara internasional. Ketika status pesawat berubah menjadi "Boarding", petugas tidak mendatangi satu per satu 2.000 penumpang di ruang tunggu. Layar monitor digital besar di dinding (Solid Cable & Turbo Streams) otomatis berganti warna dari kuning menjadi hijau di depan mata seluruh penumpang secara bersamaan.

## Eksperimen

- Buka dua jendela browser berbeda pada halaman proyek yang sama, buat tugas baru di jendela A, dan saksikan tugas langsung muncul di jendela B.
- Periksa tab Network (bagian WS / WebSockets) di browser DevTools untuk melihat pesan Turbo Stream yang ditransmisikan.
- Gunakan method manual `task.broadcast_replace_to(...)` di konsol Rails untuk memperbarui tampilan kartu browser dari terminal.

---

## Tantangan

Tambahkan Turbo Stream toast notification: ketika anggota tim lain memindahkan tugas ke status "Completed", tampilkan notifikasi alert hijau di pojok kanan bawah layar seluruh anggota proyek.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const / let variabel`
- **Fungsi Utama:** Deklarasi variabel modern lingkup blok (Block Scope).
- **Parameter / Atribut:** `Identifier, Initial Value`.
- **Perilaku & Efek Sistem:** `const` untuk referensi konstan yang tidak dapat di-reassign; `let` untuk variabel nilai dinamis.
- **Contoh Penggunaan Praktis:**
```javascript
const appName = 'Tryngo';
let counter = 0;
counter += 1;
console.log(appName, counter);
```
- **Hasil Output yang Diharapkan:**
```text
Tryngo 1
```

### 2. `() => { ... } (Arrow Function)`
- **Fungsi Utama:** Sintaks fungsi ringkas dengan lexical 'this'.
- **Parameter / Atribut:** `Parameters, Function Body`.
- **Perilaku & Efek Sistem:** Menyederhanakan penulisan fungsi dan mempertahankan konteks `this` dari lingkup pembungkus luar.
- **Contoh Penggunaan Praktis:**
```javascript
const multiply = (a, b) => a * b;
console.log(multiply(6, 7));
```
- **Hasil Output yang Diharapkan:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Fungsi Utama:** Penanganan operasi asinkron berbasis Promise.
- **Parameter / Atribut:** `URL string, RequestInit options`.
- **Perilaku & Efek Sistem:** Menulis kode asinkron dengan alur linier layaknya kode sinkron tanpa callback hell.
- **Contoh Penggunaan Praktis:**
```javascript
async function fetchUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  const data = await res.json();
  return data;
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan objek data JSON terurai dari server
```

### 4. `Array.prototype.map() / filter()`
- **Fungsi Utama:** Transformasi array fungsional tanpa mutasi data asal.
- **Parameter / Atribut:** `callback(item, index, array)`.
- **Perilaku & Efek Sistem:** `map` menghasilkan array baru dari hasil transformasi; `filter` menyaring elemen berdasarkan kondisi boolean.
- **Contoh Penggunaan Praktis:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const doubledEvens = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2);
console.log(doubledEvens);
```
- **Hasil Output yang Diharapkan:**
```text
[4, 8]
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. N+1 Queries pada Active Record
- **Gejala / Masalah:** Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading.

### 2. Migrasi Database yang Mengubah Kolom Tanpa Reversibility
- **Gejala / Masalah:** Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis.

### 3. Menyimpan Credential Sensitif di Direktori Publik
- **Gejala / Masalah:** API key pihak ketiga bocor ke publik melalui repositori git.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.

---

## Ringkasan

Kamu telah menguasai Turbo Streams dan Rails 8 Solid Cable WebSockets. Minggu depan kita mempelajari interaktivitas sisi klien dengan Stimulus JS.
