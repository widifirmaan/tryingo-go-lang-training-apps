# Hash

## Kenapa Materi Ini Penting

Redis adalah database in-memory secepat kilat - dipakai semua sistem besar untuk cache, leaderboard, session, dan rate limit. Satu fitur kecil "tambah cache Redis" sering menghemat biaya server lebih banyak dari refactor berbulan-bulan.

Program latihan: *"Operasi Hash Redis"*. Jalankan kode di Playground untuk mempelajari alur kerjanya.


## Tujuan Pembelajaran

- HSET dan HGET
- HMSET dan HMGET
- HGETALL, HKEYS, HVALS
- HINCRBY
- HSETNX dan HDEL

---

## Program: Operasi Hash: Kartu Profil Mahasiswa

Hash menyimpan field-value dalam satu kunci. Program membangun CRUD kartu pelajar penuh, termasuk membaca beberapa field sekaligus.

```redis
# === Kartu Mahasiswa sebagai Hash ===
HSET student:42 nim "2201234" nama "Budi Santoso" ipk 3.75 semester 5
HMGET student:42 nama ipk
HGETALL student:42

# === Inkrement kecil: naikkan semester lewat HINCRBY ===
HINCRBY student:42 semester 1
HGET student:42 semester

# === HSETNX: buat field hanya bila belum ada ===
HSETNX student:42 status "aktif"
HGET student:42 status

# === HDEL dan HLEN ===
HDEL student:42 nim
HLEN student:42
HKEYS student:42

# === Hash kedua ===
DEL student:133
HSET student:133 nama "Siti Rahma" ipk 3.9 semester 3
HGETALL student:133
```

---

## Konsep Kunci

### Field-level access

HSET/HGET memutasi satu field tanpa membaca seluruh objek - lebih hemat bandwidth ketimbang menaruh kunci per field.

### Incremental semantics

HINCRBY bekerja untuk nilai integer; HSETNX membuat field hanya bila belum ada (mencegah beberapa worker salin menimpa satu sama lain).

### Kelebihan & kelemahan

Hash melayani akses field parsial dengan murah, tetapi HGETALL menyerialisasi seluruh objek: untuk profil yang sangat besar, pecah ke beberapa hash.

### Object caching

Hash + EXPIRE memberi pola cache objek: data panas di Redis (big TTL), source of truth tetap di database.

---

## Eksperimen

- Buat kartu student:43 dengan semester=1 lalu naikkan menjadi 8 langkah demi langkah.
- Simulasikan kelulusan: HDEL status lalu HSET status "lulus".
- Tulis HMGET berisi hanya field numerik (ipk, semester) dan baca hasilnya.

---

## Tantangan

Buat hash "leaderboard:kelas" berisi nama dan nilai terbaik tiap kelas (field per kelas): gunakan HGETALL lalu bayangkan cara agregasinya di aplikasi.

---

## Ringkasan

Materi minggu ini telah dibahas: Operasi Hash: Kartu Profil Mahasiswa. Lanjut ke pekan berikutnya untuk memperdalam.
