# Manajemen Volume, Persistensi Data & Jaringan Bridge

> **Kategori:** Docker | **Level:** Fondasi Kontainerisasi & Optimasi Image | **Minggu 4:** Manajemen Volume, Persistensi Data & Jaringan Bridge

## Tujuan Pembelajaran

- Memahami sifat Ephemeral (sementara) sistem file kontainer dan pentingnya penyimpanan persisten
- Membedakan jenis mount: Named Volumes (dikelola Docker di /var/lib/docker/volumes/) vs Bind Mounts (path host lokal)
- Memahami perbedaan Default Bridge Network vs User-Defined Bridge Network (resolusi DNS otomatis)
- Menghubungkan beberapa kontainer dalam satu jaringan terisolasi tanpa membuka port database ke publik

---

## Program: Persistensi Database PostgreSQL dengan Named Volume dan Komunikasi Jaringan Kustom

```bash
# 1. Create dedicated user-defined Bridge Network
# User-defined bridges provide automatic DNS resolution between containers by container name!
docker network create --driver bridge app_isolated_net

# 2. Create durable Named Volume for database storage persistence
# Bypasses the slow Copy-On-Write storage driver, writing at raw host disk speed!
docker volume create pgdata_production

# 3. Launch PostgreSQL container attached to network and volume
docker run -d \
  --name db_postgres \
  --network app_isolated_net \
  -e POSTGRES_DB=commerce_db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=SuperSecretPass2026! \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine

# 4. Launch backend application attached to the SAME network
# Notice the database host in URL uses the container name 'db_postgres' resolved via Docker DNS!
docker run -d \
  --name api_server \
  --network app_isolated_net \
  -p 4000:4000 \
  -e DATABASE_URL="postgresql://admin:SuperSecretPass2026!@db_postgres:5432/commerce_db" \
  node:22-alpine sleep 3600

# 5. Verify Inter-Container DNS resolution and connectivity
docker exec -it api_server ping -c 2 db_postgres

# 6. Test Data Persistence across container destruction
docker stop db_postgres && docker rm db_postgres
# Notice: Container is DELETED, but physical volume remains completely intact!
docker volume ls

# Launch a NEW container pointing to the existing volume: All historical data is preserved!
docker run -d \
  --name db_postgres_v2 \
  --network app_isolated_net \
  -v pgdata_production:/var/lib/postgresql/data \
  postgres:17-alpine
```

---

## Konsep Kunci

### Sifat Ephemeral Sistem File Kontainer
Secara default, seluruh sistem file di dalam kontainer bersifat **sementara (*ephemeral*)**. Ketika Anda membuat tabel di database atau mengunggah file di dalam kontainer, data tersebut ditulis ke layer tipis *writable layer* kontainer. Saat kontainer dimatikan dan dihapus (`docker rm`), seluruh data tersebut akan **musnah selamanya**.

### Named Volumes vs Bind Mounts
1. **Named Volumes** (`-v nama_volume:/path/kontainer`): Dikelola sepenuhnya oleh Docker di direktori aman host (`/var/lib/docker/volumes/`). Named volume melewati layer *Copy-On-Write* (CoW) dan menulis langsung ke disk host pada kecepatan I/O native. Merupakan standar emas untuk PostgreSQL, MySQL, dan Redis.
2. **Bind Mounts** (`-v /path/di/laptop:/path/kontainer`): Menautkan folder fisik di laptop pengembang ke dalam kontainer. Sangat ideal untuk *Hot-Reloading* saat pengembangan lokal, namun tidak disarankan di lingkungan produksi karena ketergantungan pada struktur path OS host.

### Keajaiban DNS pada User-Defined Bridge Network
Secara default, jika Anda tidak menentukan jaringan, kontainer masuk ke `default bridge network`. Jaringan default ini memiliki kelemahan: tidak mendukung pencarian nama servis (*Service Discovery*).
Sebaliknya, pada **User-Defined Bridge Network** (`docker network create ...`), Docker menyediakan server DNS internal. Kontainer `api_server` dapat menghubungi database cukup dengan memanggil hostname nama kontainernya: `db_postgres:5432`, tanpa pernah perlu memusingkan IP address kontainer yang dinamis.

---

---

## Penjelasan untuk Pemula

Bayangkan kontainer seperti kamar hotel yang Anda sewa selama semalam. Jika Anda meninggalkan baju di lemari kamar hotel dan check-out, petugas kebersihan akan membuang baju Anda (Ephemeral).

Named Volume seperti brankas penitipan permanen di stasiun kereta: Anda bisa check-in di hotel mana pun, kapan pun, dan brankas penitipan barang Anda tetap utuh tidak tersentuh. 
User-Defined Network seperti interkom telepon antar-kamar di hotel: Anda cukup menekan tombol 'Resepsionis' atau 'Koki' (DNS Container Name) tanpa perlu tahu nomor HP pribadi mereka!

## Eksperimen

- Buat tabel dan isi data di postgres, hapus kontainernya, buat kontainer baru dengan volume yang sama, dan buktikan datanya masih ada
- Inspeksi lokasi fisik volume di host menggunakan docker volume inspect pgdata_production
- Coba ping kontainer lain di default bridge network dan buktikan bahwa DNS name lookup gagal
- Gunakan docker network inspect app_isolated_net untuk melihat daftar seluruh IP kontainer yang tergabung

---

## Tantangan

Konfigurasi arsitektur multi-network: buat `frontend_net` dan `backend_net`. Pastikan kontainer Web terhubung ke kedua network, namun kontainer Database HANYA terhubung ke `backend_net` sehingga terisolasi total dari internet.

---

## Ringkasan

Anda telah menguasai manajemen persistensi data kontainer menggunakan Named Volumes, bind mounts untuk development, serta arsitektur jaringan User-Defined Bridge dengan DNS service discovery otomatis.
