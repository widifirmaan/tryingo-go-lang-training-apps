// ============================================================================
// generate-docker-materials.mjs
// Docker track: 16 lessons x 2 languages (id/en) -> 32 markdown files.
// Structure (4 phases) based on bootcamp/curriculum research (2026):
//   Foundations      : container-as-process mental model first, CLI essentials
//   Images           : run flags, image layers, Dockerfile, layer-thinking debug
//   Multi-Container  : volumes, networking (3-stage), Compose, real stack
//   Production       : Dockerfile best practices, minimal images, registry/CI-CD,
//                      orchestration decision (Compose -> Swarm -> K8s) + capstone
// Each lesson's first code block (```docker) is a runnable script executed by
// the in-app DockerPlayground (browser Docker CLI simulator, src/utils/dockerSim.ts).
// ============================================================================
import fs from 'fs';
import path from 'path';

const BASE = new URL('../public/data/course/docker', import.meta.url).pathname;
const BASE_DIR = process.platform === 'win32' ? BASE.slice(1) : BASE;

const PHASES = [
  { phase: 1, id: 'foundations', nameId: 'Fondasi', nameEn: 'Foundations' },
  { phase: 2, id: 'images', nameId: 'Image & Container', nameEn: 'Images & Containers' },
  { phase: 3, id: 'multicontainer', nameId: 'Multi-Container', nameEn: 'Multi-Container' },
  { phase: 4, id: 'production', nameId: 'Produksi', nameEn: 'Production' },
];

// ===== PHASE 1: FOUNDATIONS (lessons 1-4) =====
const LESSONS_P1 = [
  {
    phase: 1, num: 1, topicId: 'pengenalan-docker',
    titleId: 'Pengenalan Docker: Masalah "Works on My Machine"', titleEn: 'Docker Intro: The "Works on My Machine" Problem',
    script: `# 1) Cek lingkungan Docker Anda
docker version
docker info

# 2) Image yang tersedia (blueprint aplikasi)
docker images

# 3) Container yang sedang berjalan
docker ps

# 4) Container pertama Anda
docker run hello-world
docker ps -a`,
    objId: [
      'Memahami akar masalah "works on my machine" dan mengapa container adalah jawabannya',
      'Membedakan image, container, dan registry',
      'Menjalankan container pertama dengan docker run',
      'Mengenal perintah dasar: version, info, images, ps',
    ],
    objEn: [
      'Understand the root of the "works on my machine" problem and why containers solve it',
      'Distinguish images, containers, and registries',
      'Run your first container with docker run',
      'Know the basic commands: version, info, images, ps',
    ],
    expId: `## Masalah "Works on My Machine"
Semua developer pernah mengalaminya: aplikasi jalan mulus di laptop kita, tapi error di laptop teman, di server staging, atau di production. Penyebabnya bukan "nasib sial" - itu environment drift: versi bahasa berbeda, dependency versi beda, konfigurasi OS beda. Docker menjawabnya dengan satu kalimat: aplikasi dikemas beserta seluruh lingkungannya.
## Image vs Container vs Registry
Image adalah blueprint hanya-baca: aplikasi + runtime + konfigurasi dalam satu paket. Container adalah instance image yang berjalan. Registry adalah gudang image (Docker Hub adalah yang terbesar). Analogi: image = kelas/recipe, container = objek/hidangan yang dimasak dari recipe itu, registry = buku resep dunia.
## Kenapa Container Penting di 2026
Riset menunjukkan sekitar 92% organisasi IT memakai container dan adopsi Docker mencapai sekitar 71% di kalangan developer. Bukan tren - container menjadi standar de facto untuk mengemas dan mendistribusikan software, dari laptop developer sampai production cluster.
## Yang Akan Anda Kuasai
Track ini 16 pelajaran: mental model container, image dan Dockerfile, data dan jaringan, compose dan orkestrasi. Setiap pelajaran punya skrip yang bisa langsung dijalankan di playground simulator di sebelah kanan - tanpa perlu menginstal Docker.`,
    expEn: `## The "Works on My Machine" Problem
Every developer has been there: the app runs flawlessly on our laptop, but breaks on a teammate's laptop, on staging, or in production. It is not bad luck - it is environment drift: different language versions, mismatched dependencies, different OS config. Docker's answer is one sentence: ship the application together with its entire environment.
## Image vs Container vs Registry
An image is a read-only blueprint: app + runtime + configuration in one package. A container is a running instance of an image. A registry is an image warehouse (Docker Hub is the biggest). Analogy: image = class/recipe, container = object/dish cooked from that recipe, registry = the world's cookbook.
## Why Containers Matter in 2026
Research shows roughly 92% of IT organizations use containers and Docker adoption sits near 71% among developers. It is not a trend - containers are the de facto standard for packaging and distributing software, from a dev laptop to production clusters.
## What You Will Master
This track has 16 lessons: container mental model, images and Dockerfile, data and networking, Compose and orchestration. Every lesson ships a script you can run right away in the simulator playground on the right - no Docker installation needed.`,
    chId: 'Jalankan skrip di playground dan amati output-nya. Lalu ketik manual: docker images, docker ps, dan docker run hello-world sekali lagi. Pertanyaan: kenapa docker run hello-world langsung selesai (bukan berjalan terus)? Tulis jawabanmu satu kalimat - jawabannya menjadi fondasi pelajaran 2.',
    chEn: 'Run the script in the playground and observe the output. Then type manually: docker images, docker ps, and docker run hello-world once more. Question: why does docker run hello-world finish immediately (instead of running forever)? Write a one-sentence answer - it is the foundation of lesson 2.',
    sumId: 'Masalah "works on my machine" berasal dari environment drift; Docker mengemas aplikasi + lingkungannya. Image = blueprint, container = instance, registry = gudang image. Lanjut: mental model container = proses.',
    sumEn: 'The "works on my machine" problem comes from environment drift; Docker packages app + environment together. Image = blueprint, container = instance, registry = warehouse. Next: the container-as-process mental model.',
  },
  {
    phase: 1, num: 2, topicId: 'container-adalah-proses',
    titleId: 'Mental Model: Container Adalah Proses', titleEn: 'Mental Model: A Container Is a Process',
    script: `# Container = PROSES, bukan VM kecil!
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
docker ps -a`,
    objId: [
      'Membangun mental model: container = proses Linux dengan view terisolasi',
      'Memahami kenapa container berhenti saat proses utamanya selesai',
      'Membedakan VM (mesin virtual) dan container (proses)',
      'Mempraktikkan siklus hidup container: run, ps, stop, rm',
    ],
    objEn: [
      'Build the mental model: a container is a Linux process with an isolated view',
      'Understand why a container stops when its main process exits',
      'Distinguish VMs (virtual machines) and containers (processes)',
      'Practice the container lifecycle: run, ps, stop, rm',
    ],
    expId: `## Container Bukan VM Kecil
Kesalahpahaman paling umum dan paling merusak: container dianggap sebagai VM mini - "komputer kecil" yang bisa di-SSH, diinstal alat debugging, dan ditinggali. Padahal container hanyalah proses biasa yang dijalankan di kernel host dengan view terbatas: filesystem sendiri (mount namespaces), jaringan sendiri (network namespaces), dan pohon proses sendiri (PID namespaces). Itu sebabnya container menyala dalam hitungan detik - tidak ada OS baru yang di-boot.
## Siklus Hidup: Lahir dan Mati
Container hidup selama proses utamanya hidup. Jalankan docker run alpine echo "halo": proses echo selesai dalam sekejap, container langsung berhenti. Jalankan nginx (server yang berjalan terus): container tetap Up. Stop container = kirim sinyal berhenti ke proses utama.
## Konsekuensi Mental Model Ini
Saat ini klik, semuanya menyusul: jangan "login" ke container dan menginstal barang di dalamnya - container adalah benda sekali pakai yang dibuang dan dibuat ulang. Kenapa data harus hidup di volume? Karena filesystem container ikut mati. Kenapa 2 proses dalam 1 container adalah anti-pattern? Karena yang menghidupkan container adalah SATU proses utama.
## Latihan Pikiran: VM vs Container
VM: hypervisor membagi hardware, setiap VM membawa OS sendiri (GB-an, boot menit). Container: kernel host dibagi, hanya aplikasi + runtime (MB-an, boot detik). Container bukan "lebih kecil dari VM" - container adalah kategori yang berbeda.`,
    expEn: `## Containers Are Not Small VMs
The most common and most damaging misconception: containers are treated as mini VMs - "small computers" you can SSH into, install debug tools on, and live inside. In reality a container is just a regular process running on the host kernel with a restricted view: its own filesystem (mount namespaces), its own network stack (network namespaces), and its own process tree (PID namespaces). That is why containers start in seconds - no new OS is booted.
## Lifecycle: Born and Die
A container lives as long as its main process lives. Run docker run alpine echo "hi": the echo process finishes in a blink and the container stops instantly. Run nginx (a long-running server): the container stays Up. Stopping a container sends a stop signal to the main process.
## Consequences of This Model
Once this clicks, everything follows: do not "log into" containers and install stuff inside - containers are throwaway objects you recreate. Why must data live in volumes? Because the container filesystem dies with it. Why is running 2 processes in one container an antipattern? Because ONE main process is what keeps the container alive.
## Thought Exercise: VM vs Container
VM: a hypervisor partitions hardware, every VM carries its own OS (gigabytes, minutes to boot). Container: the host kernel is shared, only app + runtime are packaged (megabytes, seconds to boot). A container is not "a smaller VM" - it is a different category entirely.`,
    chId: 'Jalankan skrip, lalu coba sendiri: docker run alpine echo "tes" - perhatikan container langsung keluar. Kemudian docker run -d --name coba2 nginx:alpine, stop, rm. Tulis dua kalimat: (1) apa yang menentukan container hidup/mati, (2) kenapa kita tidak perlu (dan tidak boleh) menginstal alat debugging di dalam container.',
    chEn: 'Run the script, then try it yourself: docker run alpine echo "test" - notice the container exits immediately. Then docker run -d --name coba2 nginx:alpine, stop it, rm it. Write two sentences: (1) what decides whether a container lives or dies, (2) why we should not install debug tools inside a container.',
    sumId: 'Container = proses Linux dengan view terisolasi (namespaces), hidup selama proses utamanya hidup. Bukan VM: tanpa OS baru, tanpa boot lambat. Container = benda sekali pakai. Lanjut: arsitektur Docker di balik layar.',
    sumEn: 'A container is a Linux process with an isolated view (namespaces), alive as long as its main process runs. Not a VM: no new OS, no slow boot. Containers are throwaway. Next: Docker architecture under the hood.',
  },
  {
    phase: 1, num: 3, topicId: 'arsitektur-docker',
    titleId: 'Arsitektur Docker & Linux VM', titleEn: 'Docker Architecture & the Linux VM',
    script: `# Arsitektur: client -> daemon -> containerd
docker version

# Di balik layar Docker Desktop: Linux VM kecil
docker info

# Ambil image dari registry
docker images
docker pull redis:7-alpine

# Jalankan Redis sebagai cache
docker run -d --name cache -p 6379:6379 redis:7-alpine
docker ps
docker stop cache
docker rm cache`,
    objId: [
      'Memahami arsitektur Docker: client, daemon, containerd, runtime',
      'Menjelaskan kenapa Docker Desktop menjalankan Linux VM di Mac/Windows',
      'Menarik image dari registry dengan docker pull',
      'Menjalankan layanan nyata (Redis) dalam container',
    ],
    objEn: [
      'Understand the Docker architecture: client, daemon, containerd, runtime',
      'Explain why Docker Desktop runs a Linux VM on Mac/Windows',
      'Pull images from a registry with docker pull',
      'Run a real service (Redis) in a container',
    ],
    expId: `## Client, Daemon, dan Containerd
Ketik docker <perintah> - yang berjalan adalah client CLI. Client berbicara dengan Docker daemon (dockerd) lewat API. Daemon tidak menjalankan container sendiri: ia meminta containerd (runtime) untuk menjalankan container sebagai proses. Pemisahan ini penting: Kubernetes zaman sekarang tidak berbicara dengan dockerd, melainkan langsung dengan containerd/CRI-O.
## Mengapa Ada Linux VM di Mac dan Windows
Container bergantung pada fitur kernel Linux (namespaces, cgroups). Kernel macOS/Windows tidak punya fitur itu. Solusinya: Docker Desktop menjalankan VM Linux kecil di belakang layar, dan semua container hidup di dalam VM itu. Karena itu di docker info tertulis OSType: linux meskipun laptop Anda Windows/Mac.
## Registry: Docker Hub
docker pull redis:7-alpine mengambil image dari Docker Hub (registry publik terbesar). Perhatikan: kita meminta versi spesifik (7-alpine), bukan latest - kebiasaan baik yang akan menjadi tema pelajaran 6. Image yang sudah ada tidak diunduh ulang; Docker memakai cache lokal.
## Ukuran: VM vs Container yang Sesungguhnya
Image redis:7-alpine hanya 43MB dan container-nya siap dipakai dalam hitungan detik - bandingkan dengan VM Linux yang minimal ratusan MB dan perlu menit untuk boot. Inilah mengapa aplikasi modern dikemas sebagai container, bukan VM image.`,
    expEn: `## Client, Daemon, and Containerd
Typing docker <command> runs the CLI client. The client talks to the Docker daemon (dockerd) over an API. The daemon does not run containers itself: it asks containerd (the runtime) to run containers as processes. This split matters: modern Kubernetes does not talk to dockerd - it talks to containerd/CRI-O directly.
## Why a Linux VM on Mac and Windows
Containers depend on Linux kernel features (namespaces, cgroups). macOS/Windows kernels lack them. The fix: Docker Desktop runs a small Linux VM in the background, and all containers live inside that VM. That is why docker info says OSType: linux even on a Windows/Mac laptop.
## The Registry: Docker Hub
docker pull redis:7-alpine fetches the image from Docker Hub (the largest public registry). Note that we asked for a specific version (7-alpine), not latest - a habit that becomes the theme of lesson 6. Images already present locally are not re-downloaded; Docker uses the local cache.
## Size: Real VM vs Real Container
The redis:7-alpine image is just 43MB and the container is usable in seconds - compare with a Linux VM that needs hundreds of MB and minutes to boot. This is why modern apps ship as containers, not VM images.`,
    chId: 'Jalankan skrip, lalu coba tarik image lain: docker pull python:3.12-slim dan jalankan docker run -d --name py python:3.12-slim (tanpa port mapping - amati bedanya di docker ps). Jelaskan satu kalimat: kenapa kolom PORTS kosong untuk container py?',
    chEn: 'Run the script, then pull another image: docker pull python:3.12-slim and run docker run -d --name py python:3.12-slim (no port mapping - observe the difference in docker ps). Explain in one sentence: why is the PORTS column empty for the py container?',
    sumId: 'Client, daemon, containerd: proses berlapis. Di Mac/Windows container hidup dalam Linux VM (Docker Desktop). Registry = sumber image; pull dengan versi spesifik. Lanjut: perintah-perintah esensial Docker.',
    sumEn: 'Client, daemon, containerd: layered processes. On Mac/Windows containers live inside a Linux VM (Docker Desktop). The registry is the image source; pull specific versions. Next: essential Docker commands.',
  },
  {
    phase: 1, num: 4, topicId: 'command-essensial',
    titleId: 'Perintah Esensial: ps, start, stop, logs, exec', titleEn: 'Essential Commands: ps, start, stop, logs, exec',
    script: `# Semua container, termasuk yang sudah berhenti
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
docker images`,
    objId: [
      'Menguasai siklus hidup: run, start, stop, restart, rm',
      'Membaca log container dengan docker logs',
      'Menjalankan perintah di dalam container dengan docker exec',
      'Membersihkan sumber daya dengan docker system prune',
    ],
    objEn: [
      'Master the lifecycle: run, start, stop, restart, rm',
      'Read container logs with docker logs',
      'Run commands inside a container with docker exec',
      'Clean up resources with docker system prune',
    ],
    expId: `## Stop Bukan Hapus
docker stop menghentikan proses utama (kirim SIGTERM, tunggu sebentar, lalu SIGKILL). Container berhenti tapi MASIH ADA - bisa dihidupkan lagi dengan docker start. docker rm menghapus container secara permanen. Bedanya seperti mematikan laptop (data tetap ada) vs membuang laptopnya.
## Logs: Jendela ke Dalam Container
Aplikasi yang mencetak ke stdout/stderr otomatis ditangkap Docker. docker logs <nama> menampilkannya tanpa perlu masuk ke container. Ini sumber pertama debugging: baca log sebelum apa pun.
## Exec: Masuk Tanpa "Masuk"
Ingat mental model pelajaran 2: kita tidak "login" ke container. Tapi kadang kita perlu menjalankan satu perintah di dalamnya untuk memeriksa - itulah docker exec. docker exec <container> whoami menjalankan whoami di dalam container yang sedang hidup. Singkat, sekali pakai, dan tidak mengubah container.
## System Prune: Rumah yang Rapi
Container yang berhenti, image yatim, cache build - semuanya menumpuk diam-diam. docker system prune -f menghapus semua yang tidak terpakai. Biasakan menjalankannya berkala; disk Anda berterima kasih.`,
    expEn: `## Stop Is Not Delete
docker stop halts the main process (SIGTERM, short wait, then SIGKILL). The container is stopped but STILL EXISTS - it can be restarted with docker start. docker rm deletes the container permanently. Think of turning off a laptop (data stays) vs throwing the laptop away.
## Logs: The Window Into a Container
Anything an app prints to stdout/stderr is captured by Docker. docker logs <name> shows it without entering the container. This is the first debugging source: read logs before anything else.
## Exec: Get In Without "Logging In"
Remember the lesson-2 mental model: we do not "log into" containers. But sometimes we need to run a single command inside one to inspect it - that is docker exec. docker exec <container> whoami runs whoami inside the live container. Short, throwaway, and it does not modify the container.
## System Prune: A Tidy House
Stopped containers, orphan images, build cache - they pile up silently. docker system prune -f deletes everything unused. Make it a habit; your disk will thank you.`,
    chId: 'Tanpa membaca materi: jalankan docker ps -a, pilih satu container yang berhenti, hidupkan dengan docker start, baca lognya dengan docker logs, jalankan docker exec untuk mencetak pesan Anda sendiri, lalu docker stop dan docker rm. Tuliskan urutan perintah yang Anda pakai.',
    chEn: 'Without re-reading the material: run docker ps -a, pick a stopped container, revive it with docker start, read its logs with docker logs, use docker exec to print your own message, then docker stop and docker rm. Write down the command sequence you used.',
    sumId: 'Siklus hidup: stop (berhenti, tetap ada) vs rm (hapus). Logs untuk membaca output aplikasi; exec untuk menjalankan satu perintah di dalam container; prune untuk bersih-bersih. Lanjut: docker run yang dalam.',
    sumEn: 'Lifecycle: stop (halts, still exists) vs rm (deletes). Logs read app output; exec runs one command inside a container; prune tidies up. Next: docker run in depth.',
  },
];

// ===== PHASE 2: IMAGES & CONTAINERS (lessons 5-8) =====
const LESSONS_P2 = [
  {
    phase: 2, num: 5, topicId: 'docker-run-dalam',
    titleId: 'docker run dalam: Port, Env, Interaktif', titleEn: 'docker run Deep Dive: Ports, Env, Interactive',
    script: `# Port mapping: host 8080 -> container 80
docker run -d --name web -p 8080:80 nginx:alpine
docker ps
# Buka http://localhost:8080 di browser Anda!

# Environment variables: -e
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine
docker exec db env

# --rm: otomatis hapus saat berhenti
docker run --rm hello-world
docker ps -a

# -it: interaktif (stdin tetap terbuka)
docker run -it --name shell alpine sh
docker stop shell
docker rm shell`,
    objId: [
      'Memetakan port container ke host dengan -p',
      'Memberikan konfigurasi lewat environment variables (-e)',
      'Memahami --rm untuk container sekali pakai',
      'Menggunakan -it untuk sesi interaktif',
    ],
    objEn: [
      'Map container ports to the host with -p',
      'Pass configuration via environment variables (-e)',
      'Understand --rm for throwaway containers',
      'Use -it for interactive sessions',
    ],
    expId: `## Port Mapping: -p HOST:CONTAINER
Aplikasi di dalam container mendengar di port sendiri (nginx di 80, Postgres di 5432). Port itu tidak otomatis terbuka ke laptop Anda. -p 8080:80 berarti: terima trafik di port 8080 host, teruskan ke port 80 di dalam container. Tanpa mapping, container tetap jalan - Anda hanya tidak bisa mengaksesnya dari luar. Ingat: EXPOSE di Dockerfile HANYA dokumentasi; -p yang benar-benar mempublikasikan.
## Konfigurasi Tanpa Hardcode: -e
Image resmi (postgres, redis, mysql) dikonfigurasi lewat environment variables: POSTGRES_PASSWORD, POSTGRES_DB, dan lain-lain. Nilai diberikan saat run dengan -e NAMA=nilai, dibaca aplikasi di dalam container. Ini pola "config dari luar image" - image tetap sama, konfigurasi berbeda per lingkungan (dev/staging/prod).
## --rm: Sekali Pakai
Container yang dipakai untuk satu tugas singkat (test, eksperimen) sebaiknya dijalankan dengan --rm: begitu proses selesai, container dihapus otomatis. Tidak menumpuk sampah. Perhatikan di docker ps -a: tidak ada jejaknya.
## -it: Interaktif
-it menggabungkan -i (stdin tetap terbuka) dan -t (pseudo-TTY). Dipakai saat kita ingin masuk ke shell container - misalnya untuk eksplorasi cepat. Tapi ingat mental model: eksplorasi sesekali, bukan "tinggal di dalam".`,
    expEn: `## Port Mapping: -p HOST:CONTAINER
The app inside a container listens on its own port (nginx on 80, Postgres on 5432). That port is not automatically open on your laptop. -p 8080:80 means: accept traffic on host port 8080, forward it to port 80 inside the container. Without mapping the container still runs - you just cannot reach it from outside. Remember: EXPOSE in a Dockerfile is only documentation; -p is what actually publishes.
## Configuration Without Hardcoding: -e
Official images (postgres, redis, mysql) are configured via environment variables: POSTGRES_PASSWORD, POSTGRES_DB, etc. Values are given at run time with -e NAME=value and read by the app inside. This is the "config from outside the image" pattern - the image stays identical while configuration differs per environment (dev/staging/prod).
## --rm: Single Use
Containers used for one short task (tests, experiments) should run with --rm: as soon as the process finishes, the container is deleted automatically. No junk piles up. Note in docker ps -a: there is no trace of it.
## -it: Interactive
-it combines -i (keep stdin open) and -t (pseudo-TTY). It is used when we want to drop into a container shell - e.g., quick exploration. But remember the mental model: occasional exploration, not "living inside".`,
    chId: 'Jalankan skrip. Lalu buat sendiri: container nginx kedua dengan nama web2 yang memetakan port host 9090, env var APP_ENV=production. Cek dengan docker ps dan docker exec web2 env. Hapus semua container yang Anda buat. Tulis perintah-perintahnya.',
    chEn: 'Run the script. Then build on your own: a second nginx container named web2 mapping host port 9090, with env var APP_ENV=production. Check with docker ps and docker exec web2 env. Remove all containers you created. Write down the commands.',
    sumId: '-p mempublikasikan port; -e memberi konfigurasi dari luar; --rm untuk sekali pakai; -it untuk sesi interaktif. Image tetap sama, konfigurasi berbeda per lingkungan. Lanjut: image dan layer.',
    sumEn: '-p publishes ports; -e feeds config from outside; --rm for single-use; -it for interactive sessions. The image stays the same while config varies per environment. Next: images and layers.',
  },
  {
    phase: 2, num: 6, topicId: 'image-dan-layer',
    titleId: 'Image & Layer: Mengapa Image Tersusun', titleEn: 'Images & Layers: What Images Are Made Of',
    script: `# Pull image = unduh lapisan demi lapisan
docker pull nginx:alpine

# Setiap image = tumpukan layer
docker history nginx:alpine

# Tag = nama dan versi image
docker tag nginx:alpine nginx:myweb
docker images

# Jangan pakai :latest di produksi - pin versi!
docker pull node:20-alpine
docker images

# Hapus image
docker rmi nginx:myweb
docker images`,
    objId: [
      'Memahami image sebagai tumpukan layer hanya-baca',
      'Membaca riwayat layer dengan docker history',
      'Memberi nama versi image dengan docker tag',
      'Menjelaskan risiko tag :latest dan pentingnya pin versi',
    ],
    objEn: [
      'Understand an image as a stack of read-only layers',
      'Read layer history with docker history',
      'Name image versions with docker tag',
      'Explain the risk of :latest tags and why version pinning matters',
    ],
    expId: `## Image = Tumpukan Layer
Image bukan satu file raksasa - ia tumpukan layer hanya-baca. Saat container dijalankan, Docker menambahkan satu layer tulis tipis di atasnya. Semua perubahan di dalam container hidup di layer tulis itu; hapus container, layer itu hilang. Image tidak pernah berubah - immutable. Perubahan = image baru (layer baru).
## Docker History: Membaca Arsip
docker history nginx:alpine memperlihatkan layer demi layer: base OS, lalu instruksi build selanjutnya. Ini alat forensik: kenapa image ini besar? Layer mana yang menyumbang ukuran? Ini juga yang membuat Dockerfile bisa di-debug secara ilmiah (pelajaran 8).
## Layer dan Cache
Karena layer di-cache, membangun ulang image tidak mengulang semuanya: hanya layer yang berubah (dan setelahnya) yang dibangun ulang. Konsekuensi praktisnya: urutkan instruksi Dockerfile dari yang jarang berubah ke yang sering berubah (dependency dulu, source belakangan). Ini kunci build cepat - dibahas dalam pelajaran 13.
## Tag dan Pinning
Tag = nama versi (nginx:alpine, node:20-alpine). Tag :latest itu "mengambang": hari ini berisi versi A, bulan depan versi B - build Anda bisa rusak tanpa perubahan kode apa pun. Di produksi, pin versi spesifik (bahkan digest sha256 untuk keamanan maksimal).`,
    expEn: `## An Image Is a Stack of Layers
An image is not one giant file - it is a stack of read-only layers. When a container starts, Docker adds one thin writable layer on top. Every change inside the container lives in that writable layer; delete the container and that layer is gone. Images never change - they are immutable. A change means a new image (new layers).
## Docker History: Reading the Archive
docker history nginx:alpine shows layer after layer: the base OS, then each subsequent build instruction. This is forensic tooling: why is this image big? Which layer contributes the size? It is also what makes Dockerfiles scientifically debuggable (lesson 8).
## Layers and Cache
Because layers are cached, rebuilding an image does not redo everything: only changed layers (and those after them) are rebuilt. The practical consequence: order Dockerfile instructions from least-changing to most-changing (dependencies first, source last). This is the key to fast builds - covered in lesson 13.
## Tags and Pinning
A tag is a version name (nginx:alpine, node:20-alpine). The :latest tag is "floating": today it holds version A, next month version B - your builds can break with zero code changes. In production, pin specific versions (even sha256 digests for maximum supply-chain safety).`,
    chId: 'Jalankan skrip. Lalu bandingkan dua image Node: docker history node:20-alpine dan docker history node:20-slim (pull dulu jika perlu). Image mana yang lebih banyak layer-nya? Mengapa? Tulis jawaban satu paragraf singkat.',
    chEn: 'Run the script. Then compare two Node images: docker history node:20-alpine and docker history node:20-slim (pull them first if needed). Which image has more layers? Why? Write a short paragraph.',
    sumId: 'Image = layer hanya-baca + layer tulis saat runtime. history membaca arsip layer; tag memberi nama versi; :latest mengambang dan berbahaya - pin versi. Lanjut: menulis Dockerfile.',
    sumEn: 'An image = read-only layers plus a writable layer at runtime. history reads the layer archive; tag names versions; :latest floats and is risky - pin versions. Next: writing a Dockerfile.',
  },
  {
    phase: 2, num: 7, topicId: 'dockerfile-dasar',
    titleId: 'Dockerfile: Membangun Image Sendiri', titleEn: 'Dockerfiles: Building Your Own Images',
    script: `# Bangun image dari Dockerfile (proyek web: multi-stage)
docker build -t tryngo/shop-web:1.0 web

# Image baru muncul di daftar
docker images

# Jalankan hasil build
docker run -d --name shop-web -p 8080:80 tryngo/shop-web:1.0
docker ps
docker exec shop-web ls /usr/share/nginx/html

# CMD bisa di-override saat run
docker run --rm tryngo/shop-web:1.0 echo "CMD diganti saat run!"

# Bersihkan
docker stop shop-web
docker rm shop-web`,
    objId: [
      'Menulis Dockerfile dengan FROM, WORKDIR, COPY, RUN, EXPOSE, CMD',
      'Membangun image dengan docker build',
      'Membedakan CMD dan ENTRYPOINT',
      'Mengenali pola multi-stage sejak dini',
    ],
    objEn: [
      'Write a Dockerfile with FROM, WORKDIR, COPY, RUN, EXPOSE, CMD',
      'Build an image with docker build',
      'Distinguish CMD and ENTRYPOINT',
      'Recognize the multi-stage pattern early',
    ],
    expId: `## Anatomi Dockerfile
Dockerfile = resep build, dieksekusi baris demi baris dari atas ke bawah, tiap baris menjadi satu layer. FROM = base image (jangan dari scratch kecuali Anda tahu alasannya). WORKDIR = direktori kerja (jangan lupa - COPY dan RUN berjalan relatif dari sini). COPY = salin file dari build context. RUN = eksekusi perintah build (install dependency, compile).
## Ekspos vs Publikasikan
EXPOSE 80 di Dockerfile hanyalah dokumentasi: "aplikasi ini mendengarkan di port 80". Ia TIDAK mempublikasikan apa pun. Publikasi terjadi saat run dengan -p, atau di Compose dengan ports. Jangan bingung - ini pertanyaan klasik di wawancara kerja DevOps.
## CMD vs ENTRYPOINT
CMD = perintah default, BISA di-override saat run: docker run image echo "halo" menggantikan CMD. ENTRYPOINT = perintah tetap, tidak bisa di-override (argumennya bisa ditambah). Pola umum: ENTRYPOINT untuk executable aplikasi, CMD untuk argumen default. Contoh di skrip: CMD nginx diganti saat run - terlihat di output.
## Multi-stage Sekilas
FROM dua kali dalam satu Dockerfile: stage pertama membangun (toolchain lengkap), stage kedua hanya menyalin hasilnya ke base minimal (nginx:alpine). Hasilnya image kecil dan aman tanpa toolchain build. Detail lengkapnya di pelajaran 13-14.`,
    expEn: `## Dockerfile Anatomy
A Dockerfile is a build recipe, executed line by line top to bottom; each line becomes one layer. FROM = base image (do not start from scratch unless you know why). WORKDIR = working directory (do not skip it - COPY and RUN are relative to it). COPY = copy files from the build context. RUN = execute build commands (install dependencies, compile).
## Expose vs Publish
EXPOSE 80 in a Dockerfile is documentation only: "this app listens on port 80". It publishes nothing. Publishing happens at run time with -p, or in Compose with ports. Do not confuse them - a classic DevOps interview question.
## CMD vs ENTRYPOINT
CMD = the default command, overridable at run time: docker run image echo "hi" replaces CMD. ENTRYPOINT = the fixed command, not overridable (its arguments can be appended). Common pattern: ENTRYPOINT for the app executable, CMD for default arguments. In the script you see CMD nginx being replaced at run time.
## Multi-stage at a Glance
Two FROMs in one Dockerfile: the first stage builds (full toolchain), the second only copies the artifacts into a minimal base (nginx:alpine). The result: a small, safe image without build toolchain. Full details in lessons 13-14.`,
    chId: 'Jalankan skrip dan amati output build: berapa langkah, apa yang terjadi tiap langkah. Lalu docker run --rm tryngo/shop-web:1.0 ls / - bandingkan dengan docker exec shop-web ls /usr/share/nginx/html (jalankan container dulu). Apa perbedaan isi filesystem image build vs image runtime?',
    chEn: 'Run the script and watch the build output: how many steps, what happens at each. Then docker run --rm tryngo/shop-web:1.0 ls / - compare with docker exec shop-web ls /usr/share/nginx/html (run the container first). How does the build image filesystem differ from the runtime one?',
    sumId: 'Dockerfile = resep layer demi layer. EXPOSE hanya dokumentasi; -p yang mempublikasikan. CMD bisa di-override, ENTRYPOINT tetap. Multi-stage = build kecil, runtime kecil. Lanjut: debug build dengan layer thinking.',
    sumEn: 'A Dockerfile is a layer-by-layer recipe. EXPOSE is documentation; -p publishes. CMD is overridable, ENTRYPOINT is fixed. Multi-stage = small build, small runtime. Next: debugging builds with layer thinking.',
  },
  {
    phase: 2, num: 8, topicId: 'debug-build-layer',
    titleId: 'Debug Build dengan Layer Thinking', titleEn: 'Debugging Builds with Layer Thinking',
    script: `# Build yang GAGAL - perhatikan layer mana yang error
docker build -t tryngo/broken:latest broken

# Fix: apt-get update dulu, satu RUN, bersihkan cache
docker build -t tryngo/fixed:latest fixed
docker images

# Debug layer: jalankan shell di layer terakhir yang sukses
docker run -it --entrypoint sh ubuntu:24.04`,
    objId: [
      'Menganalisis error build dengan layer thinking',
      'Memperbaiki Dockerfile yang rusak secara sistematis',
      'Men-debug dengan shell di layer terakhir yang sukses',
      'Menerapkan pola apt-get update && install dalam satu RUN',
    ],
    objEn: [
      'Analyze build errors with layer thinking',
      'Fix a broken Dockerfile systematically',
      'Debug by shelling into the last successful layer',
      'Apply the apt-get update && install pattern in one RUN',
    ],
    expId: `## Tiap Baris Dockerfile = Satu Layer
Ini kunci debug build: Docker mengeksekusi instruksi satu per satu, masing-masing menjadi layer. Ketika build gagal di layer ke-N, semua layer sebelumnya sudah jadi - dan masih ada di cache. Pertanyaan yang tepat bukan "kenapa gagal?", melainkan "di layer MANA gagalnya?".
## Membaca Error Build
Build broken gagal di RUN apt-get install -y curl: "Unable to locate package curl". Penyebabnya klasik: image base ubuntu:24.04 fresh tidak punya daftar paket (apt lists) - harus apt-get update DULU sebelum install. Solusinya digabung dalam satu RUN: apt-get update && apt-get install -y --no-install-recommends curl.
## Debug di Layer Terakhir yang Sukses
Jangan Googling dulu. Jalankan shell di layer terakhir yang sukses: docker run -it --entrypoint sh ubuntu:24.04, lalu eksekusi manual perintah yang gagal di dalamnya. Anda melihat langsung pesan errornya di lingkungan yang sama persis dengan build. Ini keterampilan yang membedakan engineer yang mengerti vs yang menyalin dari Stack Overflow.
## Cache Busting dan Kebersihan
apt-get update && apt-get install dalam SATU RUN memastikan daftar paket segar tiap kali layer dibangun ulang (update sendirian di layer terpisah akan di-cache dan basi). Bersihkan cache apt di RUN yang sama (rm -rf /var/lib/apt/lists/*) agar layer tidak membawa sampah. Pola yang sama berlaku untuk npm/pip.`,
    expEn: `## Every Dockerfile Line Is One Layer
This is the key to debugging builds: Docker executes instructions one by one, each becoming a layer. When a build fails at layer N, all previous layers are already built - and still cached. The right question is not "why did it fail?" but "WHICH layer failed?".
## Reading Build Errors
The broken build fails at RUN apt-get install -y curl: "Unable to locate package curl". The cause is classic: a fresh ubuntu:24.04 base has no package lists yet - you must apt-get update BEFORE installing. The fix combines both in one RUN: apt-get update && apt-get install -y --no-install-recommends curl.
## Debug in the Last Successful Layer
Do not Google first. Shell into the last successful layer: docker run -it --entrypoint sh ubuntu:24.04, then manually run the failing command inside it. You see the real error in the exact same environment as the build. This skill separates engineers who understand from those who copy Stack Overflow.
## Cache Busting and Cleanliness
apt-get update && apt-get install in ONE RUN ensures fresh package lists each time the layer rebuilds (an isolated update in its own layer would be cached and go stale). Clean the apt cache in the same RUN (rm -rf /var/lib/apt/lists/*) so the layer carries no junk. The same pattern applies to npm/pip.`,
    chId: 'Latihan dari trainer bootcamp: buat Dockerfile dengan 4 bug sengaja - (1) RUN install tanpa update, (2) COPY path yang salah, (3) EXPOSE tidak cocok dengan port aplikasi, (4) CMD merujuk file yang tidak ada. Bangun, temukan layer yang gagal, perbaiki satu per satu. Tuliskan bug yang Anda temukan dan perbaikannya.',
    chEn: 'The bootcamp-trainer exercise: write a Dockerfile with 4 deliberate bugs - (1) RUN install without update, (2) a wrong COPY path, (3) EXPOSE that does not match the app port, (4) a CMD referencing a missing file. Build, find the failing layer, fix them one by one. Write down the bugs you found and their fixes.',
    sumId: 'Layer thinking: cari layer yang gagal, bukan pesan errornya. Debug dengan shell di layer terakhir yang sukses. apt-get update && install dalam satu RUN + bersihkan cache. Lanjut: volume dan persistensi data.',
    sumEn: 'Layer thinking: find the failing layer, not the error message. Debug by shelling into the last successful layer. apt-get update && install in one RUN, then clean the cache. Next: volumes and data persistence.',
  },
];

// ===== PHASE 3: MULTI-CONTAINER (lessons 9-12) =====
const LESSONS_P3 = [
  {
    phase: 3, num: 9, topicId: 'volume-persistensi',
    titleId: 'Volume: Data Bertahan Hidup', titleEn: 'Volumes: Data That Survives',
    script: `# Buat volume bernama
docker volume create pgdata
docker volume ls

# Jalankan Postgres dengan volume
docker run -d --name db -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db cat /var/lib/postgresql/data/PG_VERSION

# Hapus container - data AMAN di volume
docker stop db
docker rm db

# Jalankan lagi dengan volume yang sama - data masih ada!
docker run -d --name db2 -e POSTGRES_PASSWORD=rahasia123 -v pgdata:/var/lib/postgresql/data postgres:16-alpine
docker exec db2 cat /var/lib/postgresql/data/PG_VERSION

# Bersihkan
docker stop db2
docker rm db2
docker volume rm pgdata`,
    objId: [
      'Menjelaskan mengapa data di container tidak bertahan',
      'Membuat dan memakai named volume dengan -v',
      'Membuktikan data bertahan setelah container dihapus',
      'Mengelola siklus hidup volume',
    ],
    objEn: [
      'Explain why container data does not survive',
      'Create and use a named volume with -v',
      'Prove data survives container deletion',
      'Manage the volume lifecycle',
    ],
    expId: `## Masalah: Container itu Ephemeral
Layer tulis container dihapus bersama containernya. Database tanpa volume = kehilangan semua data saat container restart atau dihapus. Solusi: volume - penyimpanan yang hidup di luar siklus hidup container. Dockerfile menyimpan "resep"; volume menyimpan "data".
## Named Volume
-v pgdata:/var/lib/postgresql/data memasang volume pgdata ke direktori data Postgres di dalam container. Nama (pgdata) membuatnya bisa dipakai ulang: container kedua, misal db2, memasang volume yang sama dan melihat data yang sama. Perhatikan di skrip: PG_VERSION (dibuat oleh Postgres saat init) masih terbaca setelah container pertama dihapus.
## Kenapa Nama Direktori Berbeda
Gunakan jalur yang BENAR-BENAR dipakai aplikasi untuk menyimpan datanya. Postgres: /var/lib/postgresql/data. Nginx: /usr/share/nginx/html. Redis: /data. Salah pasang = aplikasi jalan tapi datanya tidak pernah masuk volume (dan hilang). Cek dokumentasi image resmi untuk jalur resminya.
## Siklus Hidup Volume
docker volume ls melihat daftar, docker volume rm menghapus. Penting: menghapus container TIDAK menghapus volume. Volume yatim (tidak dipakai container) menumpuk disk - awasi dengan docker volume ls. Bind mount (pelajaran 12) adalah alternatif untuk direktori host tertentu, tapi untuk produksi, named volume lebih portabel.`,
    expEn: `## The Problem: Containers Are Ephemeral
A container's writable layer is deleted with the container. A database without a volume means losing all data whenever the container restarts or is deleted. The solution: volumes - storage that lives outside the container lifecycle. The Dockerfile stores the "recipe"; volumes store the "data".
## Named Volumes
-v pgdata:/var/lib/postgresql/data mounts the pgdata volume to Postgres's data directory inside the container. The name (pgdata) makes it reusable: a second container, e.g. db2, mounts the same volume and sees the same data. Note in the script: PG_VERSION (written by Postgres during init) is still readable after the first container is deleted.
## Why the Directory Name Matters
Mount the path the app ACTUALLY uses to store its data. Postgres: /var/lib/postgresql/data. Nginx: /usr/share/nginx/html. Redis: /data. A wrong mount = the app runs but data never lands in the volume (and is lost). Check official image docs for the canonical paths.
## Volume Lifecycle
docker volume ls lists volumes, docker volume rm deletes them. Important: deleting a container does NOT delete its volume. Orphaned volumes (not used by any container) eat disk - watch them with docker volume ls. Bind mounts (lesson 12) are the alternative for specific host directories, but for production, named volumes are more portable.`,
    chId: 'Jalankan skrip. Lalu buktikan sendiri: setelah menulis data ke volume (buat file dengan docker exec db2 sh -c "echo halo > /var/lib/postgresql/data/test.txt"), hapus container, jalankan container baru dengan volume yang sama, dan baca file itu. Mengapa ini penting untuk database?',
    chEn: 'Run the script. Then prove it yourself: after writing data to the volume (create a file with docker exec db2 sh -c "echo hi > /var/lib/postgresql/data/test.txt"), delete the container, run a new container with the same volume, and read that file. Why does this matter for databases?',
    sumId: 'Container ephemeral, volume bertahan. Named volume dipasang dengan -v nama:jalur. Pasang jalur yang benar-benar dipakai aplikasi. Volume tidak ikut terhapus bersama container. Lanjut: networking antar container.',
    sumEn: 'Containers are ephemeral, volumes survive. Named volumes mount with -v name:path. Mount the path the app really uses. Volumes are not deleted with their container. Next: networking between containers.',
  },
  {
    phase: 3, num: 10, topicId: 'networking-dasar',
    titleId: 'Networking: Container Saling Bicara', titleEn: 'Networking: Containers Talking to Each Other',
    script: `# Buat network khusus
docker network create mynet
docker network ls

# Jalankan dua container di network yang sama
docker run -d --name web --network mynet -p 8080:80 nginx:alpine
docker run -d --name db --network mynet -e POSTGRES_PASSWORD=rahasia123 postgres:16-alpine

# DNS internal: web bisa "ping db" cuma dengan namanya
docker exec web ping db

# Network inspect: lihat anggota
docker network inspect mynet

# Hapus network
docker network rm mynet`,
    objId: [
      'Membuat network sendiri dengan docker network create',
      'Menjelaskan DNS internal: container dipanggil dengan namanya',
      'Memeriksa anggota network dengan docker network inspect',
      'Memahami kenapa --link sudah usang',
    ],
    objEn: [
      'Create your own network with docker network create',
      'Explain internal DNS: containers are addressed by name',
      'Inspect network members with docker network inspect',
      'Understand why --link is deprecated',
    ],
    expId: `## Jalan Buntu: Localhost Tidak Akan Pernah Sampai
"localhos" di dalam container adalah container itu sendiri. Aplikasi web yang memanggil http://localhost:5432 TIDAK akan pernah mencapai database di container lain. Kedua container harus berada di network yang sama, dan aplikasi memanggil nama container: http://db:5432.
## DNS Internal: Nama = Alamat
Di network khusus, Docker menyediakan DNS: container bisa dipanggil dengan NAMAnya. web bisa ping db tanpa tahu IP-nya. Ini menyelesaikan masalah besar: IP container berubah setiap kali dijalankan ulang, nama tidak. Aplikasi dikonfigurasi dengan nama, bukan IP.
## Mengapa Network Khusus
Mengapa tidak semua container di default network saja? Isolasi dan keamanan: network membatasi siapa bisa bicara dengan siapa. DB hanya terhubung ke web, tidak ke setiap container acak di mesin. Prinsip jaringan produksi: segmen, bukan satu kabel besar.
## --link dan Sejarah
Dulu ada docker run --link web:web untuk menghubungkan container. Ia dianggap legacy dan tidak direkomendasikan - DNS network menggantikannya. Jawaban wawancara yang bagus: "--link membuat entri /etc/hosts statis; network menyediakan DNS dinamis yang mengikuti container ke mana pun IP-nya berubah."`,
    expEn: `## The Dead End: Localhost Never Reaches
"localhost" inside a container is that container itself. An app calling http://localhost:5432 will NEVER reach a database in another container. Both containers must be on the same network, and the app calls the container name: http://db:5432.
## Internal DNS: Name = Address
On a custom network, Docker provides DNS: containers are addressable by NAME. web can ping db without knowing its IP. This solves a big problem: container IPs change on every restart, names do not. Configure apps with names, not IPs.
## Why a Custom Network
Why not put every container on the default network? Isolation and security: a network limits who can talk to whom. The DB only connects to web, not to every random container on the machine. The production networking principle: segments, not one big cable.
## --link and History
There used to be docker run --link web:web to connect containers. It is legacy and not recommended - network DNS replaced it. A good interview answer: "--link writes a static /etc/hosts entry; networks provide dynamic DNS that follows the container wherever its IP moves."`,
    chId: 'Jalankan skrip. Lalu coba modifikasi: hapus db dari network dengan docker network disconnect mynet db, lalu ping db lagi dari web. Apa yang terjadi? Hubungkan kembali dengan docker network connect mynet db dan ping lagi. Tuliskan hasilnya.',
    chEn: 'Run the script. Then experiment: remove db from the network with docker network disconnect mynet db, then ping db from web again. What happens? Reconnect with docker network connect mynet db and ping again. Write down the results.',
    sumId: 'Container di network yang sama bicara lewat NAMA (DNS internal), bukan IP. Buat network khusus untuk isolasi. localhost tidak akan pernah mencapai container lain. Lanjut: Docker Compose.',
    sumEn: 'Containers on the same network talk via NAME (internal DNS), not IP. Create custom networks for isolation. localhost never reaches another container. Next: Docker Compose.',
  },
  {
    phase: 3, num: 11, topicId: 'docker-compose',
    titleId: 'Docker Compose: Infrastruktur sebagai Kode', titleEn: 'Docker Compose: Infrastructure as Code',
    script: `# Lihat definisi stack (vote: web + redis + db)
docker compose -f compose/vote/docker-compose.yml config

# Jalankan seluruh stack sekali jalan
docker compose -f compose/vote/docker-compose.yml up -d
docker ps

# Log semua service
docker compose -f compose/vote/docker-compose.yml logs

# Perbesar skala worker
docker compose -f compose/vote/docker-compose.yml up -d --scale worker=3
docker ps

# Matikan stack, network & volume ikut dibersihkan
docker compose -f compose/vote/docker-compose.yml down`,
    objId: [
      'Membaca definisi service di docker-compose.yml',
      'Menjalankan seluruh stack dengan compose up',
      'Melihat log semua service dengan compose logs',
      'Menjelaskan perbedaan up, down, dan stop',
    ],
    objEn: [
      'Read service definitions in docker-compose.yml',
      'Bring up an entire stack with compose up',
      'View logs of all services with compose logs',
      'Explain the difference between up, down, and stop',
    ],
    expId: `## Dari 5 Perintah ke 1 File
Menjalankan stack multi-container tanpa Compose = menghafal urutan 5+ perintah: buat network, jalankan web dengan flag -p dan -v, jalankan db dengan env, dll. Compose menggantikannya dengan SATU file YAML: service mana, image apa, port apa, env apa, volume mana, network mana. Infrastruktur menjadi kode: bisa di-version-control, di-review, di-reproduksi.
## Anatomi docker-compose.yml
services: daftar service, masing-masing dengan image (atau build), ports, environment, volumes, networks, depends_on. Compose otomatis membuat network untuk stack, dan service dipanggil dengan namanya (web, db, redis) - DNS internal yang sama dari pelajaran 10.
## up, down, stop - Bukan Hal yang Sama
compose up = bangun dan mulai semua (idempotent: yang sudah jalan dibiarkan, yang berubah di-update). compose down = HENTIKAN SEMUA + hapus container, network, dan (dengan -v) volume. compose stop = hentikan container tapi jangan hapus apa pun. down -v di praktik baik jarang dipakai - volume data dibiarkan hidup.
## depends_on: Urutan Bukan Kesiapan
depends_on hanya menjamin URUTAN start, bukan bahwa service SUDAH SIAP. Postgres yang baru pertama kali init butuh detik; app yang start lebih cepat akan gagal konek. Solusi modern: healthcheck + condition: service_healthy (pelajaran 12).`,
    expEn: `## From 5 Commands to 1 File
Running a multi-container stack without Compose means memorizing a sequence of 5+ commands: create a network, run web with -p and -v flags, run db with env, etc. Compose replaces all of it with ONE YAML file: which services, what images, which ports, env, volumes, networks. Infrastructure becomes code: version-controlled, reviewable, reproducible.
## docker-compose.yml Anatomy
services: a list of services, each with image (or build), ports, environment, volumes, networks, depends_on. Compose automatically creates a network for the stack, and services are addressed by name (web, db, redis) - the same internal DNS from lesson 10.
## up, down, stop - Not the Same
compose up = build and start everything (idempotent: running ones are left alone, changed ones are updated). compose down = STOP EVERYTHING + delete containers, network, and (with -v) volumes. compose stop = stop containers but delete nothing. down -v is rarely used in good practice - data volumes are left alive.
## depends_on: Order Is Not Readiness
depends_on only guarantees the START ORDER, not that a service is READY. A fresh Postgres takes seconds to initialize; an app starting sooner will fail to connect. The modern solution: healthcheck + condition: service_healthy (lesson 12).`,
    chId: 'Jalankan skrip, amati urutan container yang dibuat. Lalu coba: docker compose -f compose/vote/docker-compose.yml ps sebelum up - apa yang terjadi? Setelah up, ubah isi docker-compose.yml (misalnya port web) dan up lagi - apa yang berubah? Tuliskan pengamatan Anda.',
    chEn: 'Run the script and watch the order in which containers appear. Then try: docker compose -f compose/vote/docker-compose.yml ps before up - what happens? After up, edit docker-compose.yml (e.g., the web port) and up again - what changes? Write down your observations.',
    sumId: 'Compose = satu file YAML menggantikan rantai perintah. up membuat, down menghapus semuanya, stop menghentikan saja. depends_on = urutan, bukan kesiapan. Lanjut: stack nyata dengan healthcheck.',
    sumEn: 'Compose = one YAML file replacing a command chain. up creates, down removes everything, stop only halts. depends_on = order, not readiness. Next: a real stack with healthchecks.',
  },
  {
    phase: 3, num: 12, topicId: 'stack-nyata',
    titleId: 'Stack Nyata: Web + API + DB + Redis', titleEn: 'A Real Stack: Web + API + DB + Redis',
    script: `# Stack shop: web, api, redis, db - lihat definisinya
docker compose -f compose/shop/docker-compose.yml config

# Naikkan stack dengan healthcheck
docker compose -f compose/shop/docker-compose.yml up -d
docker ps
docker compose -f compose/shop/docker-compose.yml ps

# Log tiap service
docker compose -f compose/shop/docker-compose.yml logs api

# Skala horizontal: 2 replika API
docker compose -f compose/shop/docker-compose.yml up -d --scale api=2
docker compose -f compose/shop/docker-compose.yml ps

# Matikan semuanya
docker compose -f compose/shop/docker-compose.yml down`,
    objId: [
      'Menggunakan healthcheck + depends_on: service_healthy',
      'Menjalankan stack 4 service dengan satu perintah',
      'Membaca log service tertentu',
      'Menskala service secara horizontal',
    ],
    objEn: [
      'Use healthcheck + depends_on: service_healthy',
      'Run a 4-service stack with one command',
      'Read logs of a specific service',
      'Scale a service horizontally',
    ],
    expId: `## Pola Aplikasi Modern
Aplikasi web nyata jarang satu service: web server (frontend/nginx), API backend, database (Postgres), cache (Redis). Masing-masing image resmi + konfigurasi masing-masing. Compose menyatukan semuanya dalam satu file - siklus hidup stack = satu perintah.
## healthcheck: Kesiapan yang Sebenarnya
depends_on: db saja tidak cukup (pelajaran 11). Compose modern mendukung depends_on: db: condition: service_healthy. healthcheck mendefinisikan perintah pemeriksaan (misal pg_isready atau wget ke /health). Compose menunggu service sehat SEBELUM memulai dependennya. Ini perbedaan antara "app crash 3 detik lalu berhasil" dan "app mulai saat DB benar-benar siap".
## Membaca dan Memfilter Log
compose logs menampilkan log semua service; compose logs api hanya log API. Log terstruktur (JSON, key=value) jauh lebih mudah dicari daripada log bebas. Ini juga yang dipakai platform observasi produksi.
## Skala Horizontal dengan --scale
--scale api=2 membuat 2 replika service yang sama (naming: api_1, api_2...). Untuk API tanpa state (stateless), ini cara murah menambah kapasitas. Perhatikan: Postgres TIDAK boleh di-scale - database dengan state tidak bisa diduplikasi begitu saja. "Container stateless di-scale, stateful di-hormati".`,
    expEn: `## The Modern App Pattern
Real web apps are rarely a single service: a web server (frontend/nginx), a backend API, a database (Postgres), a cache (Redis). Each gets its own official image and its own configuration. Compose unifies them in one file - the stack's lifecycle is one command.
## healthcheck: Real Readiness
depends_on: db alone is not enough (lesson 11). Modern Compose supports depends_on: db: condition: service_healthy. healthcheck defines a probe command (e.g. pg_isready or wget to /health). Compose waits until the service is healthy BEFORE starting its dependents. This is the difference between "the app crashed for 3 seconds then worked" and "the app starts when the DB is actually ready".
## Reading and Filtering Logs
compose logs shows logs from all services; compose logs api shows only API logs. Structured logs (JSON, key=value) are far easier to search than freeform text. This is also what production observability platforms consume.
## Horizontal Scaling with --scale
--scale api=2 creates 2 replicas of the same service (named api_1, api_2...). For a stateless API, this is the cheap way to add capacity. Note: Postgres must NOT be scaled - a database with state cannot simply be duplicated. "Stateless containers scale; stateful ones get respect."`,
    chId: 'Modifikasi: tambahkan healthcheck pada api di compose/shop/docker-compose.yml (bukan web), lalu perhatikan urutan start di docker ps saat up. Naikkan api ke 3 replika, periksa dengan compose ps, lalu turunkan kembali ke 1. Tuliskan apa yang Anda pelajari tentang orkestrasi.',
    chEn: 'Modify: add a healthcheck to api in compose/shop/docker-compose.yml (not web), then watch the startup order in docker ps during up. Scale api up to 3 replicas, inspect with compose ps, then scale back to 1. Write down what you learned about orchestration.',
    sumId: 'Stack nyata = web + api + db + redis dalam satu file. healthcheck + service_healthy = kesiapan sejati. Stateless bisa di-scale, stateful tidak. Lanjut: best practices Dockerfile.',
    sumEn: 'A real stack = web + api + db + redis in one file. healthcheck + service_healthy = true readiness. Stateless scales; stateful does not. Next: Dockerfile best practices.',
  },
];

// ===== PHASE 4: PRODUCTION (lessons 13-16) =====
const LESSONS_P4 = [
  {
    phase: 4, num: 13, topicId: 'best-practices-dockerfile',
    titleId: 'Best Practices Dockerfile', titleEn: 'Dockerfile Best Practices',
    script: `# Build "single" (satu stage) vs "web" (multi-stage)
docker build -t tryngo/single:1.0 single
docker build -t tryngo/shop-web:2.0 web

# Bandingkan ukuran image
docker images

# Build ulang = cache layer dipakai (perhatikan output)
docker build -t tryngo/shop-web:2.1 web

# .dockerignore: build context tetap kecil
docker build -t tryngo/shop-web:2.2 web`,
    objId: [
      'Menerapkan urutan instruksi yang ramah cache',
      'Membandingkan image single-stage vs multi-stage',
      'Menjelaskan peran .dockerignore',
      'Menggunakan tag yang deskriptif dan tidak floating',
    ],
    objEn: [
      'Apply cache-friendly instruction ordering',
      'Compare single-stage vs multi-stage images',
      'Explain the role of .dockerignore',
      'Use descriptive, non-floating tags',
    ],
    expId: `## Urutkan Instruksi dari yang Jarang Berubah
Cache layer bekerja per instruksi: layer hanya dibangun ulang jika instruksinya berubah ATAU semua yang di bawahnya berubah. Karena itu salin dependency dulu (package.json / requirements.txt / go.mod), RUN install-nya, baru COPY source. Ubah satu baris kode = hanya layer terakhir yang dibangun ulang. Salin source dulu, install belakangan = setiap commit membangun ulang dependency yang mahal.
## Satu Tujuan per Layer vs Layer Kurus
Dulu: "setiap RUN satu tool". Sekarang: gabung perintah terkait dalam satu RUN (apt-get update && install) dan bersihkan cache di RUN yang sama. Layer kurus = image kecil dan aman (tidak ada artefak sisa). Dua aturan praktik: (1) gabungkan install + cleanup, (2) pisahkan hal yang frekuensi perubahannya berbeda.
## Multi-stage: Toolchain vs Runtime
Perbandingan di skrip menunjukkan intinya: single membawa seluruh toolchain build (ukuran besar), web (multi-stage) hanya menyalin hasil build ke base minimal. Ukuran image runtime menentukan: kecepatan pull, serangan supply-chain, biaya storage registry. Rencana produksi: stage build (node/rust/go), stage runtime (alpine/scratch).
## .dockerignore dan Konteks Bersih
COPY . menyalin build context - semua yang bukan .dockerignore. node_modules, .git, dist, file env masuk image? .dockerignore (pola seperti .gitignore) menjaga konteks tetap kecil dan mencegah rahasia lokal masuk image.`,
    expEn: `## Order Instructions from Least-Changing
Layer caching works per instruction: a layer rebuilds only if its instruction changed OR something below it changed. So copy dependencies first (package.json / requirements.txt / go.mod), RUN install, then COPY source. One changed code line = only the last layer rebuilds. Copy source first, install later = every commit rebuilds expensive dependencies.
## One Purpose per Layer vs Skinny Layers
Old advice: "one RUN per tool". Now: combine related commands in one RUN (apt-get update && install) and clean caches in the same RUN. Skinny layers = small, safe images (no leftover artifacts). Two practical rules: (1) combine install + cleanup, (2) separate things with different change frequencies.
## Multi-stage: Toolchain vs Runtime
The comparison in the script shows the point: single carries the whole build toolchain (large), web (multi-stage) copies only the build result into a minimal base. The runtime image size drives: pull speed, supply-chain attack surface, registry storage cost. Production plan: build stage (node/rust/go), runtime stage (alpine/scratch).
## .dockerignore and a Clean Context
COPY . copies the build context - everything not excluded by .dockerignore. node_modules, .git, dist, env files ending up in images? .dockerignore (patterned after .gitignore) keeps the context small and keeps local secrets out of the image.`,
    chId: 'Hitung sendiri: apa perbedaan ukuran tryngo/single:1.0 vs tryngo/shop-web:2.0? Mengapa? Lalu salin isi proyek single ke folder baru, tambahkan .dockerignore yang mengecualikan README.md, bangun ulang, dan bandingkan ukuran image. Tuliskan hasilnya.',
    chEn: 'Calculate it yourself: what is the size difference between tryngo/single:1.0 and tryngo/shop-web:2.0? Why? Then copy the single project to a new folder, add a .dockerignore excluding README.md, rebuild, and compare image sizes. Write down the results.',
    sumId: 'Dependency dulu, source belakangan (cache). Layer kurus dengan install+cleanup. Multi-stage: toolchain di build, hasil di runtime. .dockerignore = konteks bersih. Lanjut: image produksi.',
    sumEn: 'Dependencies first, source last (cache). Skinny layers with install+cleanup. Multi-stage: toolchain in build, result in runtime. .dockerignore = clean context. Next: production images.',
  },
  {
    phase: 4, num: 14, topicId: 'image-produksi',
    titleId: 'Image Produksi: Alpine, Slim, Distroless', titleEn: 'Production Images: Alpine, Slim, Distroless',
    script: `# Program Go: build statis -> image tiny
docker build -t tryngo/goproj:1.0 goproj
docker images
docker history tryngo/goproj:1.0

# Jalankan binary statis
docker run --rm tryngo/goproj:1.0

# Bandingkan dengan image toolchain
docker run --rm golang:1.22-alpine ls /usr/local/go/bin`,
    objId: [
      'Membedakan alpine, slim, distroless, dan scratch',
      'Membangun image Go yang sangat kecil (binary statis)',
      'Membaca jejak layer image produksi',
      'Menilai trade-off toolchain vs runtime di image',
    ],
    objEn: [
      'Distinguish alpine, slim, distroless, and scratch',
      'Build a very small Go image (static binary)',
      'Read the layer trace of a production image',
      'Weigh toolchain vs runtime trade-offs in images',
    ],
    expId: `## Spektrum Base Image
Dari besar ke kecil: distribusi penuh (ubuntu/debian), slim (debian tanpa toolchain), alpine (musl, sangat kecil), distroless (hanya runtime, tanpa shell), scratch (kosong total). Aturan: pakai base seminimal mungkin yang masih bisa menjalankan aplikasi. image kecil = pull cepat, permukaan serangan kecil.
## Go: Kasus Ideal
Go dikompilasi statis: binary tidak butuh runtime di image. FROM scratch + COPY binary = image yang hanya berisi aplikasi Anda. Docker history goproj memperlihatkan: base kosong, binary disalin, selesai. Image Go yang bagus bisa ~10MB vs ~800MB base ubuntu.
## Kenapa Tidak Selalu Scratch
Binary statis butuh CA cert (HTTPS), zona waktu, user non-root - semua bisa disalin sebagai file ke scratch. Tapi jika aplikasi butuh shell (debug, entrypoint script), distroless atau alpine lebih praktis. Distroless menjalankan aplikasi sebagai non-root SECARA DEFAULT - menutup satu kelas kerentanan container escape.
## Trade-off yang Perlu Diingat
Alpine memakai musl, bukan glibc - beberapa library C native bisa bermasalah. Distroless tidak punya shell - tidak bisa docker exec sh (dan itu bagus untuk keamanan). Pilihan base image adalah keputusan keamanan DAN debugging: dokumentasikan alasan Anda memilih base di README.`,
    expEn: `## The Base Image Spectrum
From large to small: full distros (ubuntu/debian), slim (debian without toolchain), alpine (musl, very small), distroless (runtime only, no shell), scratch (completely empty). Rule: use the smallest base that still runs your app. Small images = fast pulls, small attack surface.
## Go: The Ideal Case
Go compiles statically: the binary needs no runtime in the image. FROM scratch + COPY binary = an image containing only your app. docker history goproj shows it: empty base, copy binary, done. A good Go image can be ~10MB vs ~800MB ubuntu base.
## Why Not Always Scratch
Static binaries need CA certs (HTTPS), timezone data, a non-root user - all copyable as files into scratch. But if the app needs a shell (debugging, entrypoint scripts), distroless or alpine is more practical. Distroless runs apps as non-root BY DEFAULT - closing one whole class of container-escape vulnerabilities.
## Trade-offs to Remember
Alpine uses musl, not glibc - some native C libraries can misbehave. Distroless has no shell - no docker exec sh (which is good for security). Base image choice is a security AND debugging decision: document your reasoning in the README.`,
    chId: 'Jalankan skrip. Lalu coba: ubah Dockerfile goproj untuk memakai alpine (FROM alpine:3.20, tambahkan RUN apk add --no-cache ca-certificates), bangun sebagai tryngo/goproj:alpine. Bandingkan ukuran dan jalankan keduanya. Mana yang Anda pilih untuk produksi dan mengapa?',
    chEn: 'Run the script. Then try: change the goproj Dockerfile to use alpine (FROM alpine:3.20, add RUN apk add --no-cache ca-certificates), build it as tryngo/goproj:alpine. Compare sizes and run both. Which would you choose for production and why?',
    sumId: 'Base minimal: slim < alpine < distroless < scratch. Go statis = scratch ideal (~10MB). Non-root default di distroless. Setiap base punya trade-off keamanan/debug. Lanjut: registry, CI/CD, deploy.',
    sumEn: 'Minimal bases: slim < alpine < distroless < scratch. Static Go = scratch is ideal (~10MB). Non-root by default in distroless. Every base has security/debug trade-offs. Next: registries, CI/CD, deploy.',
  },
  {
    phase: 4, num: 15, topicId: 'registry-cicd-deploy',
    titleId: 'Registry, CI/CD & Deploy', titleEn: 'Registry, CI/CD & Deployment',
    script: `# Login ke registry
docker login

# Tag image dengan namespace repo
docker tag tryngo/shop-web:2.0 tryngo/tryngo/shop-web:2.0
docker push tryngo/tryngo/shop-web:2.0

# Logout
docker logout
docker images`,
    objId: [
      'Menjelaskan peran registry image (Docker Hub, GHCR, ECR)',
      'Login dan push image ke registry',
      'Memetakan pipeline CI/CD ke perintah Docker',
      'Menyusun strategi versi dan rollback',
    ],
    objEn: [
      'Explain the role of image registries (Docker Hub, GHCR, ECR)',
      'Login and push images to a registry',
      'Map a CI/CD pipeline to Docker commands',
      'Design a versioning and rollback strategy',
    ],
    expId: `## Registry: Gudang Image
Registry adalah server penyimpan image (Docker Hub default, GHCR untuk GitHub, ECR di AWS, ACR di Azure). Nama image = registry + namespace + nama + tag. Push image = mengirimkannya ke registry; pull = mengunduh. Tanpa registry, deploy ke server lain tidak mungkin - image hanya ada di mesin lokal Anda.
## Pipeline CI/CD dalam Perintah Docker
CI/CD mengotomatiskan apa yang Anda ketik manual: CI (Continuous Integration) = setiap push ke git memicu build + test; CD (Continuous Delivery) = image yang lolos dideploy ke server. Pipeline ideal: build (docker build) -> test (jalankan image, cek healthcheck) -> push (docker push dengan tag unik) -> deploy (pull + run di server). Satu image per commit, tag = versi yang bisa dirujuk.
## Strategi Tag
Jangan timpa :latest di produksi. Praktik umum: tag = sha commit atau semver + timestamp, ditambah :latest hanya sebagai penanda konvensional. Keuntungan: audit trail (image mana yang berjalan di server?) dan rollback instan (pull tag lama).
## Deploy dan Rollback
Deploy = jalankan image baru di server (pull tag X, restart container). Rollback = jalankan lagi tag sebelumnya. Karena image immutable dan versi tercatat, rollback = perintah pull+run, bukan "revert kode". Ini alasan Docker mengubah cara deploy: artefak (image) dan kode terpisah.`,
    expEn: `## Registry: The Image Warehouse
A registry is an image storage server (Docker Hub by default, GHCR for GitHub, ECR on AWS, ACR on Azure). An image name = registry + namespace + name + tag. Pushing an image uploads it to the registry; pulling downloads it. Without a registry, deploying to another server is impossible - the image exists only on your local machine.
## CI/CD Pipelines in Docker Commands
CI/CD automates what you type manually: CI (Continuous Integration) = every push to git triggers build + test; CD (Continuous Delivery) = images that pass get deployed to servers. Ideal pipeline: build (docker build) -> test (run the image, check the healthcheck) -> push (docker push with a unique tag) -> deploy (pull + run on the server). One image per commit, tag = the version you can refer back to.
## Tagging Strategy
Do not overwrite :latest in production. Common practice: tag = commit sha or semver + timestamp, keeping :latest only as a conventional marker. Benefits: audit trail (which image is running on the server?) and instant rollback (pull the old tag).
## Deploy and Rollback
Deploy = run the new image on the server (pull tag X, restart the container). Rollback = run the previous tag again. Because images are immutable and versions are recorded, rollback is a pull+run command, not "revert the code". This is why Docker changed deployment: artifacts (images) and code are separate.`,
    chId: 'Rancang pipeline CI/CD untuk tryngo/shop-web: tuliskan tahap-tahapnya sebagai daftar perintah Docker yang akan dijalankan otomatis di CI (mulai dari checkout kode sampai image dideploy di server). Sebutkan tag yang Anda pakai di tiap tahap dan bagaimana Anda melakukan rollback.',
    chEn: 'Design a CI/CD pipeline for tryngo/shop-web: write its stages as a list of Docker commands that CI would run automatically (from code checkout to the image deployed on a server). State the tags you use at each stage and how you roll back.',
    sumId: 'Registry = gudang image. CI/CD = build, test, push, deploy otomatis. Tag = versi yang bisa dirujuk, jangan timpa :latest. Rollback = pull tag lama. Lanjut: orkestrasi dan capstone.',
    sumEn: 'A registry = image warehouse. CI/CD = automated build, test, push, deploy. Tags = referable versions, never overwrite :latest. Rollback = pull the old tag. Next: orchestration and the capstone.',
  },
  {
    phase: 4, num: 16, topicId: 'orkestrasi-capstone',
    titleId: 'Orkestrasi & Capstone: Compose ke Swarm, K8s', titleEn: 'Orchestration & Capstone: Compose to Swarm, K8s',
    script: `# Capstone: seluruh stack shop dari satu server
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
docker compose -f compose/shop/docker-compose.yml down`,
    objId: [
      'Menjelaskan perbedaan Compose, Swarm, dan Kubernetes',
      'Menginisialisasi swarm dan melihat node',
      'Membuat service dengan replika dan skala',
      'Menyelesaikan capstone: deploy stack nyata',
    ],
    objEn: [
      'Explain the difference between Compose, Swarm, and Kubernetes',
      'Initialize a swarm and list nodes',
      'Create services with replicas and scaling',
      'Complete the capstone: deploy a real stack',
    ],
    expId: `## Compose vs Swarm vs Kubernetes
Compose = definisi stack untuk SATU host (file YAML, siklus hidup container). Swarm = orkestrasi multi-host bawaan Docker (service + replika + load balancing). Kubernetes = standar industri (pod, deployment, service, ingress - jauh lebih kuat dan kompleks). Kurva keputusan: 1 host = Compose; beberapa host tanpa tim SRE = Swarm; kebutuhan enterprise (auto-scaling, self-healing, multi-cloud) = Kubernetes.
## Swarm Mode
docker swarm init mengubah mesin menjadi node manager; docker node ls melihat cluster. Unit kerja Swarm adalah SERVICE: declarative (inginkan 2 replika web - Swarm menjaganya tetap 2 selamanya, termasuk restart otomatis bila ada replika mati). docker service scale mengubah jumlahnya secara dinamis. Tidak ada perintah "run container" - semua deklaratif.
## Capstone: Dari Nol ke Produksi
Capstone Anda: gunakan semua yang dipelajari - bangun image stack shop (docker build), jalankan dengan Compose + healthcheck (up -d), skala API (--scale), amati log, lalu bayangkan server kedua bergabung ke swarm. Anda telah menempuh jalan dari "works on my machine" ke mental model produksi: image immutable + orchestration declarative.
## Setelah Kursus Ini
Repositori tryngo memuat tantangan lanjutan: tambah service monitoring ke stack, tulis Dockerfile multi-stage untuk aplikasi bahasa lain, atau buat pipeline CI/CD di GitHub Actions. Dokumentasikan keputusan Anda - seperti kurikulum ini: dari nol sampai siap produksi.`,
    expEn: `## Compose vs Swarm vs Kubernetes
Compose = a stack definition for ONE host (YAML file, container lifecycle). Swarm = Docker's built-in multi-host orchestration (services + replicas + load balancing). Kubernetes = the industry standard (pods, deployments, services, ingress - far more powerful and complex). The decision curve: 1 host = Compose; several hosts without an SRE team = Swarm; enterprise needs (auto-scaling, self-healing, multi-cloud) = Kubernetes.
## Swarm Mode
docker swarm init turns a machine into a manager node; docker node ls lists the cluster. Swarm's unit of work is a SERVICE: declarative (want 2 replicas of web - Swarm keeps them at 2 forever, including automatic restarts if a replica dies). docker service scale changes the count dynamically. There is no "run container" command - everything is declarative.
## Capstone: From Zero to Production
Your capstone: use everything you learned - build the shop stack images (docker build), run with Compose + healthcheck (up -d), scale the API (--scale), watch the logs, then imagine a second server joining the swarm. You have walked the path from "works on my machine" to a production mental model: immutable images + declarative orchestration.
## After This Course
The tryngo repo holds further challenges: add a monitoring service to the stack, write multi-stage Dockerfiles for other languages, or build a CI/CD pipeline on GitHub Actions. Document your decisions - like this curriculum: from zero to production-ready.`,
    chId: 'Capstone final: deploy stack shop penuh dengan skenario produksi - scale api ke 3, ubah satu baris konfigurasi, up ulang, dan verifikasi dengan ps dan logs bahwa service baru sehat sebelum menggantikan yang lama. Kemudian inisialisasi swarm, buat service tryngo/web:2.0 dengan 3 replika, dan turunkan semuanya dengan bersih. Dokumentasikan seluruh prosesnya sebagai runbook (daftar perintah + komentar).',
    chEn: 'Final capstone: deploy the full shop stack with a production scenario - scale api to 3, change one config line, up again, and verify with ps and logs that the new service is healthy before replacing the old one. Then initialize a swarm, create a service tryngo/web:2.0 with 3 replicas, and tear everything down cleanly. Document the whole process as a runbook (command list + comments).',
    sumId: 'Compose = 1 host, Swarm = multi-host declarative, K8s = standar enterprise. Service menjaga replika tetap hidup. Capstone: dari nol ke stack produksi. Anda siap Docker. Selamat!',
    sumEn: 'Compose = 1 host, Swarm = declarative multi-host, K8s = the enterprise standard. Services keep replicas alive. Capstone: from zero to a production stack. You are Docker-ready. Congratulations!',
  },
];

const LESSONS = [...LESSONS_P1, ...LESSONS_P2, ...LESSONS_P3, ...LESSONS_P4];

// ===== GENERATE =====
for (const lesson of LESSONS) {
  const phase = PHASES.find((p) => p.phase === lesson.phase);
  const levelDir = phase.id;
  const mdDir = path.join(BASE_DIR, levelDir);

  const objListId = lesson.objId.map((o) => `- ${o}`).join('\n');
  const objListEn = lesson.objEn.map((o) => `- ${o}`).join('\n');

  for (const lang of ['id', 'en']) {
    const isId = lang === 'id';
    const title = isId ? lesson.titleId : lesson.titleEn;
    const phaseName = isId ? phase.nameId : phase.nameEn;
    const objList = isId ? objListId : objListEn;
    const exp = isId ? lesson.expId : lesson.expEn;
    const ch = isId ? lesson.chId : lesson.chEn;
    const sum = isId ? lesson.sumId : lesson.sumEn;
    const lessonLabel = isId ? `Pelajaran ${lesson.num}` : `Lesson ${lesson.num}`;

    const langDir = path.join(mdDir, lang);
    fs.mkdirSync(langDir, { recursive: true });

    const script = lesson.script || '';
    const filename = `lesson${lesson.num}-${lesson.topicId}.md`;
    const content = `# ${title}

> Docker | ${phaseName} | ${lessonLabel}

## ${isId ? 'Tujuan Pembelajaran' : 'Learning Objectives'}

${objList}

---

## Program: ${title}

\`\`\`docker
${script}
\`\`\`

---

## ${isId ? 'Penjelasan' : 'Explanation'}

${exp}

---

## ${isId ? 'Eksperimen' : 'Experiments'}

${exp.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('##')).map((h, i) => `${i + 1}. **${h.replace(/^#+\s*/, '')}**`).join('\n')}

---

## ${isId ? 'Tantangan' : 'Challenge'}

${ch}

---

## ${isId ? 'Ringkasan' : 'Summary'}

${sum}
`;

    fs.writeFileSync(path.join(langDir, filename), content);
  }

  console.log(`  ${lesson.num}. ${lesson.titleId} / ${lesson.titleEn}`);
}

const total = LESSONS.length * 2;
console.log(`\n✓ Generated ${total} Docker curriculum files (${LESSONS.length} lessons × 2 languages)`);
console.log(`  Output: ${BASE_DIR}`);



