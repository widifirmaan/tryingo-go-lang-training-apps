# Registry, CI/CD & Deploy

> Docker | Produksi | Pelajaran 15

## Tujuan Pembelajaran

- Menjelaskan peran registry image (Docker Hub, GHCR, ECR)
- Login dan push image ke registry
- Memetakan pipeline CI/CD ke perintah Docker
- Menyusun strategi versi dan rollback

---

## Program: Registry, CI/CD & Deploy

```docker
# Login ke registry
docker login

# Tag image dengan namespace repo
docker tag tryngo/shop-web:2.0 tryngo/tryngo/shop-web:2.0
docker push tryngo/tryngo/shop-web:2.0

# Logout
docker logout
docker images
```

---

## Penjelasan

## Registry: Gudang Image
Registry adalah server penyimpan image (Docker Hub default, GHCR untuk GitHub, ECR di AWS, ACR di Azure). Nama image = registry + namespace + nama + tag. Push image = mengirimkannya ke registry; pull = mengunduh. Tanpa registry, deploy ke server lain tidak mungkin - image hanya ada di mesin lokal Anda.
## Pipeline CI/CD dalam Perintah Docker
CI/CD mengotomatiskan apa yang Anda ketik manual: CI (Continuous Integration) = setiap push ke git memicu build + test; CD (Continuous Delivery) = image yang lolos dideploy ke server. Pipeline ideal: build (docker build) -> test (jalankan image, cek healthcheck) -> push (docker push dengan tag unik) -> deploy (pull + run di server). Satu image per commit, tag = versi yang bisa dirujuk.
## Strategi Tag
Jangan timpa :latest di produksi. Praktik umum: tag = sha commit atau semver + timestamp, ditambah :latest hanya sebagai penanda konvensional. Keuntungan: audit trail (image mana yang berjalan di server?) dan rollback instan (pull tag lama).
## Deploy dan Rollback
Deploy = jalankan image baru di server (pull tag X, restart container). Rollback = jalankan lagi tag sebelumnya. Karena image immutable dan versi tercatat, rollback = perintah pull+run, bukan "revert kode". Ini alasan Docker mengubah cara deploy: artefak (image) dan kode terpisah.

---

## Eksperimen

1. **Registry: Gudang Image**
2. **Pipeline CI/CD dalam Perintah Docker**
3. **Strategi Tag**
4. **Deploy dan Rollback**

---

## Tantangan

Rancang pipeline CI/CD untuk tryngo/shop-web: tuliskan tahap-tahapnya sebagai daftar perintah Docker yang akan dijalankan otomatis di CI (mulai dari checkout kode sampai image dideploy di server). Sebutkan tag yang Anda pakai di tiap tahap dan bagaimana Anda melakukan rollback.

---

## Ringkasan

Registry = gudang image. CI/CD = build, test, push, deploy otomatis. Tag = versi yang bisa dirujuk, jangan timpa :latest. Rollback = pull tag lama. Lanjut: orkestrasi dan capstone.
