# Healthcheck, Kebijakan Restart & Logging Drivers

> **Kategori:** Docker | **Level:** Orkestrasi Multi-Kontainer & Keamanan Produksi | **Minggu 6:** Healthcheck, Kebijakan Restart & Logging Drivers

## Tujuan Pembelajaran

- Merancang parameter HEALTHCHECK: interval, timeout, retries, dan start-period
- Memilih kebijakan restart yang tepat: no, on-failure[:max-retries], always, dan unless-stopped
- Mencegah bahaya Server Disk Full akibat log kontainer liar menggunakan Logging Driver max-size dan max-file
- Memahami perbedaan Liveness Probe (apakah proses hidup) vs Readiness Probe (apakah siap terima trafik)

---

## Program: Konfigurasi Kontainer Tahan Banting: Otomasi Pemulihan Diri dan Rotasi Log

```bash
# 1. Run a self-healing container with advanced healthcheck and restart policy
docker run -d \
  --name resilient_worker \
  --restart on-failure:5 \
  --health-cmd="curl -f http://localhost:8080/live || exit 1" \
  --health-interval=10s \
  --health-timeout=3s \
  --health-retries=3 \
  --health-start-period=15s \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  my-worker-image:v1

# 2. Inspect container health transition (starting -> healthy -> unhealthy)
docker inspect --format='{{json .State.Health}}' resilient_worker | jq

# 3. Simulate process degradation / failure to trigger restart policy
# docker exec -it resilient_worker kill -9 1

# 4. View structured Docker daemon logging configuration (/etc/docker/daemon.json)
cat << 'EOF' > /tmp/daemon-sample.json
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "5"
  },
  "default-ulimits": {
    "nofile": {
      "Name": "nofile",
      "Hard": 65536,
      "Soft": 65536
    }
  }
}
EOF
```

---

## Konsep Kunci

### Anatomi Empat Parameter HEALTHCHECK
Instruksi `HEALTHCHECK` memberitahu Docker cara memeriksa kesehatan internal aplikasi:
1. `--health-interval=10s`: Jeda waktu antar pemeriksaan kesehatan.
2. `--health-timeout=3s`: Batas waktu maksimum respon perintah healthcheck sebelum dianggap gagal.
3. `--health-retries=3`: Berapa kali kegagalan berturut-turut yang ditoleransi sebelum kontainer resmi berstatus `unhealthy`.
4. `--health-start-period=15s`: Waktu jeda pemanasan saat aplikasi pertama kali boot; kegagalan selama periode ini tidak dihitung dalam batas retries.

### Matriks Kebijakan Restart
- `no`: Kontainer tidak akan pernah dinyalakan ulang otomatis saat crash.
- `on-failure:5`: Hanya menyalakan ulang kontainer jika proses keluar dengan exit code bukan 0 (kegagalan/crash), dengan batas maksimal 5 kali pengulangan.
- `unless-stopped`: Kontainer selalu dinyalakan ulang saat crash atau saat server reboot, KECUALI jika kontainer sengaja dihentikan secara eksplisit oleh administrator (`docker stop`). Sangat direkomendasikan untuk beban produksi.
- `always`: Selalu menyalakan ulang kontainer, bahkan jika administrator mematikannya secara manual (bisa memicu restart loop yang mengganggu).

### Bahaya Fatal Log Kontainer dan Rotasi Otomatis
Secara default, Docker menulis seluruh output `stdout` dan `stderr` ke file JSON di disk host. Tanpa konfigurasi batas, aplikasi yang menghasilkan jutaan log dapat menghasilkan file log berukuran **50GB - 100GB** dan membuat disk server 100% penuh, melumpuhkan seluruh sistem operasi host!
Mengonfigurasi `--log-opt max-size=10m --log-opt max-file=3` membatasi ukuran maksimal setiap file log menjadi 10MB dengan retensi maksimal 3 file putar (*log rotation*).

---

---

## Penjelasan untuk Pemula

Bayangkan Anda memiliki robot pelayan di toko.
HEALTHCHECK seperti dokter yang datang memeriksa denyut nadi robot setiap 10 detik. Jika robot pingsan 3 kali berturut-turut, dokter meniup peluit tanda darurat.

Restart Policy `unless-stopped` seperti tombol reset otomatis di punggung robot: jika robot terpeleset jatuh, ia otomatis bangkit kembali, kecuali jika Anda sendiri yang menekan tombol matikan. Sedangkan pembatasan log seperti tong sampah daur ulang: jika tempat sampah penuh 10 lembar, kertas paling lama otomatis dihancurkan agar sampah tidak menggunung ke langit-langit toko!

## Eksperimen

- Jalankan kontainer dengan healthcheck ke endpoint yang sengaja mengembalikan status 500 dan amati status kontainer berubah menjadi (unhealthy)
- Jalankan kontainer dengan restart policy on-failure, matikan prosesnya dengan kill -9, dan amati kontainer otomatis hidup kembali
- Buat skrip yang menulis 100MB string ke stdout dan buktikan bahwa file log tidak melebihi batas max-size yang ditentukan
- Gunakan docker inspect untuk memeriksa bagian ExitCode dan RestartCount

---

## Tantangan

Konfigurasikan daemon Docker global (`/etc/docker/daemon.json`) agar seluruh kontainer baru di server host otomatis mewarisi kebijakan logging `max-size: 20m` dan `max-file: 3` tanpa perlu diketik manual di setiap perintah.

---

## Ringkasan

Anda telah menguasai ketahanan kontainer produksi: konfigurasi empat parameter HEALTHCHECK, kebijakan restart unless-stopped, dan pencegahan disk penuh dengan rotasi logging drivers.
