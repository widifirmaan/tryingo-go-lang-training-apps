# Perintah Esensial: ps, start, stop, logs, exec

> Docker | Fondasi | Pelajaran 4

## Tujuan Pembelajaran

- Menguasai siklus hidup: run, start, stop, restart, rm
- Membaca log container dengan docker logs
- Menjalankan perintah di dalam container dengan docker exec
- Membersihkan sumber daya dengan docker system prune

---

## Program: Perintah Esensial: ps, start, stop, logs, exec

```docker
# Semua container, termasuk yang sudah berhenti
docker ps -a

# Bangkitkan lagi container yang berhenti
docker start old-blog
docker ps

# Lihat log dan jalankan perintah di dalam container yang hidup
docker logs old-blog
docker exec old-blog echo "exec berjalan di dalam container yang hidup"

# Hentikan, lalu hapus
docker stop old-blog
docker rm old-blog
docker ps -a

# Bersihkan artefak yang tidak terpakai
docker system prune -f
docker images
```

---

## Penjelasan

## Stop Bukan Hapus
docker stop menghentikan proses utama (kirim SIGTERM, tunggu sebentar, lalu SIGKILL). Container berhenti tapi MASIH ADA - bisa dihidupkan lagi dengan docker start. docker rm menghapus container secara permanen. Bedanya seperti mematikan laptop (data tetap ada) vs membuang laptopnya.
## Logs: Jendela ke Dalam Container
Aplikasi yang mencetak ke stdout/stderr otomatis ditangkap Docker. docker logs <nama> menampilkannya tanpa perlu masuk ke container. Ini sumber pertama debugging: baca log sebelum apa pun.
## Exec: Masuk Tanpa "Masuk"
Ingat mental model pelajaran 2: kita tidak "login" ke container. Tapi kadang kita perlu menjalankan satu perintah di dalamnya untuk memeriksa - itulah docker exec. docker exec <container> whoami menjalankan whoami di dalam container yang sedang hidup. Singkat, sekali pakai, dan tidak mengubah container.
## System Prune: Rumah yang Rapi
Container yang berhenti, image yatim, cache build - semuanya menumpuk diam-diam. docker system prune -f menghapus semua yang tidak terpakai. Biasakan menjalankannya berkala; disk Anda berterima kasih.

---

## Eksperimen

1. **Stop Bukan Hapus**
2. **Logs: Jendela ke Dalam Container**
3. **Exec: Masuk Tanpa "Masuk"**
4. **System Prune: Rumah yang Rapi**

---

## Tantangan

Tanpa membaca materi: jalankan docker ps -a, pilih satu container yang berhenti, hidupkan dengan docker start, baca lognya dengan docker logs, jalankan docker exec untuk mencetak pesan Anda sendiri, lalu docker stop dan docker rm. Tuliskan urutan perintah yang Anda pakai.

---

## Ringkasan

Siklus hidup: stop (berhenti, tetap ada) vs rm (hapus). Logs untuk membaca output aplikasi; exec untuk menjalankan satu perintah di dalam container; prune untuk bersih-bersih. Lanjut: docker run yang dalam.
