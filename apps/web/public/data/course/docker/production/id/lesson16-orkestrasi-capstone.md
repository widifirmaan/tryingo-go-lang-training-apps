# Orkestrasi & Capstone: Compose ke Swarm, K8s

> Docker | Produksi | Pelajaran 16

## Tujuan Pembelajaran

- Menjelaskan perbedaan Compose, Swarm, dan Kubernetes
- Menginisialisasi swarm dan melihat node
- Membuat service dengan replika dan skala
- Menyelesaikan capstone: deploy stack nyata

---

## Program: Orkestrasi & Capstone: Compose ke Swarm, K8s

```docker
# Capstone: seluruh stack shop dari satu server
docker compose -f compose/shop/docker-compose.yml up -d
docker compose -f compose/shop/docker-compose.yml ps

# Inisialisasi swarm mode
docker swarm init
docker node ls

# Service: unit orkestrasi (bukan container tunggal)
docker service create --name web --replicas 2 -p 8080:80 nginx:alpine
docker service ls

# Skala service
docker service scale web=4
docker service ls

# Hentikan service, tinggalkan swarm
docker service rm web
docker swarm leave --force

# Capstone selesai: turunkan stack
docker compose -f compose/shop/docker-compose.yml down
```

---

## Penjelasan

## Compose vs Swarm vs Kubernetes
Compose = definisi stack untuk SATU host (file YAML, siklus hidup container). Swarm = orkestrasi multi-host bawaan Docker (service + replika + load balancing). Kubernetes = standar industri (pod, deployment, service, ingress - jauh lebih kuat dan kompleks). Kurva keputusan: 1 host = Compose; beberapa host tanpa tim SRE = Swarm; kebutuhan enterprise (auto-scaling, self-healing, multi-cloud) = Kubernetes.
## Swarm Mode
docker swarm init mengubah mesin menjadi node manager; docker node ls melihat cluster. Unit kerja Swarm adalah SERVICE: declarative (inginkan 2 replika web - Swarm menjaganya tetap 2 selamanya, termasuk restart otomatis bila ada replika mati). docker service scale mengubah jumlahnya secara dinamis. Tidak ada perintah "run container" - semua deklaratif.
## Capstone: Dari Nol ke Produksi
Capstone Anda: gunakan semua yang dipelajari - bangun image stack shop (docker build), jalankan dengan Compose + healthcheck (up -d), skala API (--scale), amati log, lalu bayangkan server kedua bergabung ke swarm. Anda telah menempuh jalan dari "works on my machine" ke mental model produksi: image immutable + orchestration declarative.
## Setelah Kursus Ini
Repositori tryngo memuat tantangan lanjutan: tambah service monitoring ke stack, tulis Dockerfile multi-stage untuk aplikasi bahasa lain, atau buat pipeline CI/CD di GitHub Actions. Dokumentasikan keputusan Anda - seperti kurikulum ini: dari nol sampai siap produksi.

---

## Eksperimen

1. **Compose vs Swarm vs Kubernetes**
2. **Swarm Mode**
3. **Capstone: Dari Nol ke Produksi**
4. **Setelah Kursus Ini**

---

## Tantangan

Capstone final: deploy stack shop penuh dengan skenario produksi - scale api ke 3, ubah satu baris konfigurasi, up ulang, dan verifikasi dengan ps dan logs bahwa service baru sehat sebelum menggantikan yang lama. Kemudian inisialisasi swarm, buat service tryngo/web:2.0 dengan 3 replika, dan turunkan semuanya dengan bersih. Dokumentasikan seluruh prosesnya sebagai runbook (daftar perintah + komentar).

---

## Ringkasan

Compose = 1 host, Swarm = multi-host declarative, K8s = standar enterprise. Service menjaga replika tetap hidup. Capstone: dari nol ke stack produksi. Anda siap Docker. Selamat!
