# Mental Model: Container Adalah Proses

> Docker | Fondasi | Pelajaran 2

## Tujuan Pembelajaran

- Membangun mental model: container = proses Linux dengan view terisolasi
- Memahami kenapa container berhenti saat proses utamanya selesai
- Membedakan VM (mesin virtual) dan container (proses)
- Mempraktikkan siklus hidup container: run, ps, stop, rm

---

## Program: Mental Model: Container Adalah Proses

```docker
# Container = PROSES, bukan VM kecil!
# Proses selesai -> container selesai (berhenti)
docker run alpine echo "Halo dari dalam container!"

# Proses berjalan lama -> jalankan di background
docker run -d --name web1 -p 8080:80 nginx:alpine
docker ps

# Container adalah proses dengan view terisolasi
docker exec web1 whoami
docker exec web1 cat /etc/hostname

# Container sekali pakai: stop, lalu rm
docker stop web1
docker rm web1
docker ps -a
```

---

## Penjelasan

## Container Bukan VM Kecil
Kesalahpahaman paling umum dan paling merusak: container dianggap sebagai VM mini - "komputer kecil" yang bisa di-SSH, diinstal alat debugging, dan ditinggali. Padahal container hanyalah proses biasa yang dijalankan di kernel host dengan view terbatas: filesystem sendiri (mount namespaces), jaringan sendiri (network namespaces), dan pohon proses sendiri (PID namespaces). Itu sebabnya container menyala dalam hitungan detik - tidak ada OS baru yang di-boot.
## Siklus Hidup: Lahir dan Mati
Container hidup selama proses utamanya hidup. Jalankan docker run alpine echo "halo": proses echo selesai dalam sekejap, container langsung berhenti. Jalankan nginx (server yang berjalan terus): container tetap Up. Stop container = kirim sinyal berhenti ke proses utama.
## Konsekuensi Mental Model Ini
Saat ini klik, semuanya menyusul: jangan "login" ke container dan menginstal barang di dalamnya - container adalah benda sekali pakai yang dibuang dan dibuat ulang. Kenapa data harus hidup di volume? Karena filesystem container ikut mati. Kenapa 2 proses dalam 1 container adalah anti-pattern? Karena yang menghidupkan container adalah SATU proses utama.
## Latihan Pikiran: VM vs Container
VM: hypervisor membagi hardware, setiap VM membawa OS sendiri (GB-an, boot menit). Container: kernel host dibagi, hanya aplikasi + runtime (MB-an, boot detik). Container bukan "lebih kecil dari VM" - container adalah kategori yang berbeda.

---

## Eksperimen

1. **Container Bukan VM Kecil**
2. **Siklus Hidup: Lahir dan Mati**
3. **Konsekuensi Mental Model Ini**
4. **Latihan Pikiran: VM vs Container**

---

## Tantangan

Jalankan skrip, lalu coba sendiri: docker run alpine echo "tes" - perhatikan container langsung keluar. Kemudian docker run -d --name coba2 nginx:alpine, stop, rm. Tulis dua kalimat: (1) apa yang menentukan container hidup/mati, (2) kenapa kita tidak perlu (dan tidak boleh) menginstal alat debugging di dalam container.

---

## Ringkasan

Container = proses Linux dengan view terisolasi (namespaces), hidup selama proses utamanya hidup. Bukan VM: tanpa OS baru, tanpa boot lambat. Container = benda sekali pakai. Lanjut: arsitektur Docker di balik layar.
