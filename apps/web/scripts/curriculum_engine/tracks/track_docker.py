import sys
import os

def get_track():
    levels = [
        {
            'levelId': 'beginer',
            'nameId': 'Fondasi Kontainerisasi & Optimasi Image',
            'nameEn': 'Containerization Foundations & Image Optimization',
            'descId': 'Arsitektur Docker Engine (Namespaces & cgroups), Dockerfile modern, Multi-Stage Builds hemat ukuran, manajemen volume, dan jaringan bridge.',
            'descEn': 'Docker Engine architecture (Namespaces & cgroups), modern Dockerfiles, lightweight Multi-Stage Builds, volume persistence, and bridge networks.',
        },
        {
            'levelId': 'intermediate',
            'nameId': 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
            'nameEn': 'Multi-Container Orchestration & Production Hardening',
            'descId': 'Docker Compose v2, healthcheck inter-service dependencies, audit keamanan non-root, Linux capability drops, dan capstone microservice cluster.',
            'descEn': 'Docker Compose v2, healthcheck inter-service dependencies, non-root security audits, Linux capability drops, and microservice cluster capstone.',
        }
    ]

    modules = [
        # WEEK 1
        {
            'week': 1,
            'level': 'beginer',
            'levelNameId': 'Fondasi Kontainerisasi & Optimasi Image',
            'levelNameEn': 'Containerization Foundations & Image Optimization',
            'topicId': 'arsitektur-docker-engine-dan-cli-operasional',
            'titleId': 'Arsitektur Docker Engine, Linux Primitives & CLI Dasar',
            'titleEn': 'Docker Engine Architecture, Linux Primitives & Core CLI',
            'language': 'bash',
            'programId': 'Manajemen Siklus Hidup Kontainer, Isolasi Port, dan Pemeriksaan Metrik Sumber Daya',
            'programEn': 'Container Lifecycle Management, Port Mapping, and Resource Inspection',
            'code': """# 1. Run an isolated, background container with explicit port mapping and memory limits
docker run -d \\
  --name web_gateway \\
  -p 8080:80 \\
  --memory="256m" \\
  --cpus="1.0" \\
  --restart unless-stopped \\
  nginx:alpine

# 2. Inspect active containers and resource utilization in real time
docker ps --format "table {{.ID}}\\t{{.Names}}\\t{{.Status}}\\t{{.Ports}}"
docker stats --no-stream web_gateway

# 3. Execute interactive debugging shell inside the running container (exec)
docker exec -it web_gateway sh -c "echo 'Container is healthy' && nginx -v"

# 4. Stream real-time container log stdout/stderr
docker logs --tail 50 -f web_gateway

# 5. Inspect low-level JSON metadata, Linux namespaces, and networking configuration
docker inspect --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' web_gateway

# 6. Graceful container shutdown and cleanup lifecycle
docker stop -t 10 web_gateway
docker rm web_gateway

# Prune dangling layers and unused images to reclaim disk space
docker system df
docker system prune -f
""",
            'objectivesId': [
                'Memahami perbedaan arsitektur mendasar antara Virtual Machine (Hypervisor) vs Docker Container (Shared OS Kernel)',
                'Mengetahui peran primitif Linux Kernel di balik kontainer: Namespaces (Isolasi) dan Control Groups / cgroups (Limitasi Sumber Daya)',
                'Menguasai perintah CLI operasional harian: run, ps, exec, logs, stop, rm, dan system prune',
                'Mengonfigurasi pembatasan memori, CPU, dan pemetaan port (Port Mapping Host ke Kontainer)'
            ],
            'objectivesEn': [
                'Understand architectural distinctions between Virtual Machines (Hypervisors) vs Docker Containers (Shared Kernel)',
                'Master underlying Linux Kernel primitives: Namespaces (Isolation) and Control Groups / cgroups (Resource Constraints)',
                'Operate daily production CLI workflows: run, ps, exec, logs, stop, rm, and system prune',
                'Configure CPU/memory hardware resource limits and network port mappings (Host-to-Container)'
            ],
            'explanationId': """### Virtual Machine vs Docker Container
- **Virtual Machine (VM)**: Setiap VM menyertakan Guest OS lengkap (beberapa gigabyte), kernel sendiri, dan berjalan di atas layer Hypervisor. Booting memakan waktu beberapa menit dan boros RAM.
- **Docker Container**: Kontainer berbagi **satu Linux Kernel induk yang sama** dengan Host OS. Kontainer hanyalah sebuah proses OS biasa yang diisolasi secara ketat. Ukurannya hanya puluhan megabyte dan dapat dinyalakan dalam hitungan milidetik (*sub-second startup*).

### Primitif Inti Linux: Namespaces & cgroups
Docker tidak memiliki teknologi virtualisasi sihir; ia memanfaatkan dua fitur bawaan kernel Linux:
1. **Linux Namespaces**: Menyediakan dinding isolasi virtual sehingga proses di dalam kontainer merasa memiliki dunianya sendiri:
   - `PID Namespace`: Menjadikan proses utama kontainer sebagai PID 1.
   - `NET Namespace`: Memberikan interface jaringan dan IP address privat tersendiri.
   - `MNT Namespace`: Mengisolasi sistem file disk.
2. **Control Groups (cgroups)**: Membatasi jatah penggunaan sumber daya perangkat keras fisik. Parameter `--memory="256m" --cpus="1.0"` memastikan kontainer tidak dapat mengonsumsi lebih dari 256MB RAM atau 1 core CPU, mencegah satu kontainer nakal melumpuhkan seluruh server host.

### Peran containerd dan OCI Runtimes (runc)
Arsitektur Docker modern bersifat modular standar OCI (*Open Container Initiative*):
Aplikasi klien Docker CLI berbicara dengan daemon `dockerd`, yang meneruskan instruksi ke `containerd`. Selanjutnya, `containerd` memanggil runtime tingkat rendah `runc` untuk berinteraksi langsung dengan kernel Linux guna melahirkan kontainer baru.""",
            'explanationEn': """### Virtual Machines vs Docker Containers
- **Virtual Machines (VM)**: Every VM bundles a redundant Guest Operating System (multiple gigabytes), standalone kernel, and virtualized hardware abstractions managed by a Hypervisor. Cold boots incur multi-minute startup delays and consume severe RAM overhead.
- **Docker Containers**: Containers execute directly on the **shared Host Linux Kernel**. A container is essentially an isolated Linux process sandbox. Booting is instantaneous (milliseconds), with footprints measured in tens of megabytes.

### Underlying Linux Primitives: Namespaces and cgroups
Docker is powered by two foundational Linux kernel mechanisms:
1. **Linux Namespaces**: Erects strict isolation barriers creating the illusion of dedicated system resources:
   - `PID Namespace`: Isolates process trees, making the container entry point PID 1.
   - `NET Namespace`: Provisions private virtual network stacks, route tables, and IP interfaces.
   - `MNT Namespace`: Isolates file system mount points.
2. **Control Groups (cgroups)**: Regulates physical hardware resource consumption ceilings. Flags like `--memory="256m" --cpus="1.0"` instruct the kernel scheduler to hard-throttle processes exceeding memory allocations, preventing single rogue containers from exhausting server nodes.

### containerd and OCI Runtimes (runc)
The contemporary Docker Engine is strictly decoupled following OCI (*Open Container Initiative*) standards:
The Docker CLI communicates with the `dockerd` daemon, which delegates lifecycle management to `containerd`. In turn, `containerd` invokes the low-level OCI reference runtime `runc` to interface directly with the kernel to spawn containers.""",
            'beginnerId': """Bayangkan Virtual Machine seperti membangun rumah terpisah lengkap dengan instalasi listrik, genset, dan pipa air sendiri untuk setiap tamu (sangat mahal dan butuh tanah luas). 

Docker Container seperti gedung apartemen: seluruh penghuni kamar berbagi fondasi bangunan dan pipa air yang sama (Shared OS Kernel), namun setiap kamar memiliki pintu terkunci rapat sendiri-sendiri (Namespaces) dan meteran listrik yang membatasi daya maksimal tiap kamar (cgroups)!""",
            'beginnerEn': """Think of a Virtual Machine like constructing an entire detached house complete with its own private generator and plumbing system for every guest (expensive, heavy, and slow to build).

A Docker Container is like a modern apartment building: all residents share the same structural foundation and utility grid (Shared OS Kernel), but each apartment features an impenetrable locked door (Namespaces) and an electrical fuse box capping maximum wattage (cgroups)!""",
            'experimentsId': [
                'Jalankan kontainer nginx di port 8080, buka browser pada http://localhost:8080, lalu amati access log di terminal via docker logs -f',
                'Masuk ke dalam kontainer yang sedang berjalan menggunakan docker exec -it web_gateway sh dan periksa daftar proses dengan ps aux (perhatikan PID 1)',
                'Gunakan docker stats untuk memantau penggunaan RAM saat kontainer diberi beban request HTTP',
                'Jalankan docker run dengan flag --rm dan amati kontainer otomatis terhapus saat prosesnya berhenti'
            ],
            'experimentsEn': [
                'Launch an nginx container on port 8080, access http://localhost:8080, and observe access logs stream via docker logs -f',
                'Enter the running container shell via docker exec -it web_gateway sh and inspect process tables with ps aux (notice PID 1)',
                'Run docker stats to monitor real-time RAM metrics as the container handles incoming HTTP requests',
                'Execute docker run specifying the --rm flag and observe automated container cleanup upon process termination'
            ],
            'challengeId': 'Jalankan kontainer Alpine Linux interaktif, batasi memorinya maksimal hanya 64MB (`--memory="64m"`), dan coba alokasikan memori melebihi 64MB di dalamnya untuk melihat bagaimana mekanisme Linux OOM-Killer (Out-Of-Memory) menghentikan kontainer.',
            'challengeEn': 'Spin up an interactive Alpine Linux container capped at 64MB RAM (`--memory="64m"`), intentionally allocating memory beyond the ceiling to observe the Linux OOM-Killer terminate the container.',
            'summaryId': 'Anda telah memahami arsitektur Docker Engine, mekanisme isolasi kernel Linux (Namespaces & cgroups), perintah CLI operasional, serta batasan sumber daya kontainer.',
            'summaryEn': 'You have mastered Docker Engine architecture, Linux kernel primitives (Namespaces & cgroups), foundational operational CLI workflows, and hardware resource boundaries.'
        },

        # WEEK 2
        {
            'week': 2,
            'level': 'beginer',
            'levelNameId': 'Fondasi Kontainerisasi & Optimasi Image',
            'levelNameEn': 'Containerization Foundations & Image Optimization',
            'topicId': 'anatomi-dockerfile-dan-layer-caching',
            'titleId': 'Anatomi Dockerfile & Strategi Layer Caching',
            'titleEn': 'Dockerfile Anatomy & Layer Caching Strategies',
            'language': 'dockerfile',
            'programId': 'Dockerfile Produksi dengan Urutan Instruksi Optimal untuk Memaksimalkan Build Cache',
            'programEn': 'Production Dockerfile Structured to Maximize Build Cache Hit Rates',
            'code': """# Production-Ready Dockerfile demonstrating Layer Caching Strategy
# Base Image: Use explicit, immutable semantic version tags (NEVER use 'latest' in production!)
FROM node:22-alpine

# Set non-interactive environment variables
ENV NODE_ENV=production \\
    PORT=3000

# Set explicit working directory inside the container
WORKDIR /app

# CACHE OPTIMIZATION STEP 1: Copy ONLY package dependency manifests first!
# Dependency manifests rarely change, allowing Docker to cache the expensive 'npm ci' layer!
COPY package.json package-lock.json ./

# Run installation of strictly production dependencies
# 'npm ci' guarantees reproducible installs based on package-lock.json
RUN npm ci --only=production && \\
    npm cache clean --force

# CACHE OPTIMIZATION STEP 2: Copy application source code LAST!
# Application code changes frequently. Placing it after 'npm ci' ensures that code edits
# do NOT invalidate the cached node_modules layer!
COPY src/ ./src/
COPY tsconfig.json ./

# Security best practice: Create unprivileged system user instead of running as root (UID 0)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \\
    chown -R appuser:appgroup /app

# Switch to unprivileged user
USER appuser

# Document exposed runtime port (informational metadata)
EXPOSE 3000

# Exec Form of ENTRYPOINT and CMD (Ensures process runs as PID 1 to receive UNIX SIGTERM signals)
CMD ["node", "src/server.js"]
""",
            'objectivesId': [
                'Memahami konsep Immutable Image Layers dan mekanisme Copy-On-Write (CoW)',
                'Menghindari invalidasi cache dini dengan memisahkan instalasi dependensi (package.json) dari kode sumber',
                'Membedakan sintaks Shell Form vs Exec Form pada instruksi CMD dan ENTRYPOINT',
                'Menggunakan file `.dockerignore` untuk mencegah kebocoran secret, file `.git`, dan folder lokal node_modules'
            ],
            'objectivesEn': [
                'Understand Immutable Image Layers and the Copy-On-Write (CoW) storage driver mechanism',
                'Prevent premature cache invalidation by segregating dependency manifests from source code',
                'Differentiate Shell Form vs Exec Form semantics across CMD and ENTRYPOINT instructions',
                'Enforce comprehensive `.dockerignore` rules eliminating `.git`, secrets, and local node_modules'
            ],
            'explanationId': """### Bagaimana Docker Image Dibangun? Konsep Layer Caching
Setiap instruksi di dalam Dockerfile (`FROM`, `RUN`, `COPY`) menghasilkan satu **Lapisan Gambar (Image Layer)** baru yang bersifat kekal (*read-only / immutable*). 
Ketika Anda menjalankan perintah `docker build`, Docker memeriksa apakah instruksi tersebut beserta file yang disalin memiliki perubahan:
- Jika tidak ada perubahan, Docker menggunakan **Build Cache** (*CACHED*) dan melompati proses dalam waktu 0 detik!
- Begitu satu layer berubah (misal Anda mengubah sebaris kode di `src/`), **seluruh layer setelahnya akan dinyatakan tidak valid (cache invalidated)** dan terpaksa di-build ulang dari awal.

### Aturan Emas Urutan Dockerfile
Jangan pernah menulis `COPY . .` sebelum perintah `RUN npm install`! 
Jika Anda melakukannya, setiap kali Anda mengubah sebaris komentar pada kode sumber, Docker akan menganggap seluruh direktori berubah dan mengunduh ulang ribuan dependensi `node_modules` selama bermenit-menit. Pisahkan penyalinan `package.json` terlebih dahulu, jalankan `npm ci`, baru salin kode sumber di langkah terakhir.

### Shell Form vs Exec Form pada CMD
- **Shell Form** (`CMD node server.js`): Docker membungkus perintah di dalam sub-shell `/bin/sh -c`. Akibatnya, `/bin/sh` menjadi PID 1 dan aplikasi Anda menjadi child process. Sinyal penghentian `SIGTERM` dari Docker tidak akan diteruskan ke aplikasi Anda, menyebabkan shutdown kontainer menggantung selama 10 detik lalu dimatikan paksa (*SIGKILL*).
- **Exec Form** (`CMD ["node", "server.js"]`): Format JSON array wajib digunakan. Aplikasi Anda langsung menjadi PID 1 sejati dan menangkap sinyal *graceful shutdown* seketika.""",
            'explanationEn': """### How Docker Images are Built: Layer Caching Mechanics
Every command in a Dockerfile (`FROM`, `RUN`, `COPY`) generates an immutable, read-only **Image Layer**.
During `docker build`, the BuildKit engine computes cryptographic checksums over instructions and modified files:
- If instructions and file hashes match existing cache trees, the engine marks the step as *CACHED*, executing in zero seconds.
- The microsecond an instruction invalidates (e.g. source code changed in a `COPY`), **every subsequent downstream layer is invalidated**, forcing a clean rebuild from scratch.

### The Golden Rule of Dockerfile Ordering
Never execute `COPY . .` prior to `RUN npm install`!
Doing so ensures that modifying a single line of application code invalidates the entire cache, forcing Docker to download gigabytes of `node_modules` on every commit. Isolate `package.json` manifests first, execute `npm ci`, and copy mutable source code as the penultimate layer.

### Shell Form vs Exec Form Dynamics
- **Shell Form** (`CMD node server.js`): Wraps execution inside `/bin/sh -c`. The shell becomes PID 1, relegating your application to a child process. Consequently, kernel `SIGTERM` shutdown signals are swallowed by the shell, forcing Docker to time out for 10 seconds before issuing an ungraceful `SIGKILL`.
- **Exec Form** (`CMD ["node", "server.js"]`): The JSON array syntax is mandatory. Your application executes directly as genuine PID 1, intercepting `SIGTERM` signals for instant graceful teardowns.""",
            'beginnerId': """Bayangkan membangun Docker Image seperti menumpuk kue lapis. Lapisan dasar adalah piring (OS Alpine), lapisan kedua adalah tepung dan telur (package.json dan npm install), dan lapisan teratas adalah meses cokelat (kode program aplikasi Anda).

Jika Anda ingin mengganti warna meses cokelat (edit kode), Anda cukup mengganti taburan meses di lapisan paling atas tanpa perlu membuang dan memanggang ulang kue lapis di bawahnya!""",
            'beginnerEn': """Think of building a Docker Image like baking a multi-tiered layer cake. The bottom foundation is the plate (Alpine OS), the middle layer is the baked sponge cake (dependencies from npm install), and the topmost topping is chocolate sprinkles (your application source code).

If you decide to change the color of the sprinkles (editing code), you simply scrape off the top topping and re-sprinkle, without having to discard and re-bake the entire cake foundation from scratch!""",
            'experimentsId': [
                'Build Dockerfile di atas, lalu ubah 1 kata di file src/server.js, build ulang, dan amati bahwa langkah npm ci tetap berstatus CACHED',
                'Buat file .dockerignore yang mengecualikan node_modules dan .git, lalu periksa ukuran build context yang dikirim ke daemon',
                'Ubah format CMD menjadi shell form CMD node src/server.js, jalankan docker stop, dan amati jeda 10 detik sebelum kontainer mati',
                'Inspeksi riwayat ukuran masing-masing layer image menggunakan perintah docker history <image-id>'
            ],
            'experimentsEn': [
                'Build the Dockerfile, edit a comment inside src/server.js, rebuild, and observe that npm ci evaluates as CACHED',
                'Author a .dockerignore excluding node_modules and .git, noting the drastic reduction in transferred build context',
                'Switch CMD to shell form (CMD node src/server.js), execute docker stop, and observe the 10-second SIGKILL timeout delay',
                'Inspect the byte footprint of individual image layers using docker history <image-id>'
            ],
            'challengeId': 'Buat file `.dockerignore` berstandar keamanan tinggi yang secara default mengabaikan seluruh file (`*`), lalu menyertakan secara selektif (`!src`, `!package*.json`, `!tsconfig.json`) hanya file yang benar-benar dibutuhkan aplikasi.',
            'challengeEn': 'Craft a zero-trust `.dockerignore` ignoring everything by default (`*`), explicitly allowing strictly whitelist patterns (`!src`, `!package*.json`, `!tsconfig.json`) needed for the build.',
            'summaryId': 'Anda telah menguasai anatomi Dockerfile, pemaksimalan efisiensi Build Cache, keharusan sintaks Exec Form untuk graceful shutdown, dan sanitasi konteks dengan .dockerignore.',
            'summaryEn': 'You have mastered Dockerfile anatomy, build cache optimization, Exec Form syntax for graceful shutdowns, and build context sanitation via .dockerignore.'
        },

        # WEEK 3
        {
            'week': 3,
            'level': 'beginer',
            'levelNameId': 'Fondasi Kontainerisasi & Optimasi Image',
            'levelNameEn': 'Containerization Foundations & Image Optimization',
            'topicId': 'multi-stage-builds-dan-keamanan-distroless',
            'titleId': 'Multi-Stage Builds & Citra Minimalis Distroless',
            'titleEn': 'Multi-Stage Builds & Minimalist Distroless Images',
            'language': 'dockerfile',
            'programId': 'Penyusutan Ukuran Image Go/Node.js dari 1.2GB Menjadi 25MB Menggunakan Multi-Stage Builds',
            'programEn': 'Shrinking Go/Node.js Images from 1.2GB to 25MB Using Multi-Stage Distroless Builds',
            'code': """# ==============================================================================
# STAGE 1: Build & Compilation Environment (Heavyweight image with compilers)
# ==============================================================================
FROM golang:1.24-alpine AS builder

WORKDIR /build

# Install build-time dependencies (compilers, git, certificates)
RUN apk add --no-cache git ca-certificates

# Cache dependencies layer
COPY go.mod go.sum ./
RUN go mod download

# Copy application source
COPY . .

# Compile binary statically (CGO_ENABLED=0 disables C bindings, creating pure standalone binary)
# -ldflags="-w -s" strips debugging symbols to shrink binary footprint by 40%!
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build \\
    -ldflags="-w -s" \\
    -o /build/api-server .

# ==============================================================================
# STAGE 2: Production Distroless Runtime (Ultra-secure, minimal image)
# Contains ZERO package managers (no apk/apt), ZERO shells (no /bin/sh / /bin/bash)
# ==============================================================================
# gcr.io/distroless/static-debian12 contains strictly CA certificates and tzdata
FROM gcr.io/distroless/static-debian12:nonroot

WORKDIR /app

# Copy ONLY the compiled binary artifact from the builder stage!
# Compilers, SDKs, caches, and intermediate source code are COMPLETELY LEFT BEHIND!
COPY --from=builder /build/api-server /app/api-server

# Distroless 'nonroot' image runs by default under unprivileged UID 65532
USER nonroot:nonroot

EXPOSE 8080

ENTRYPOINT ["/app/api-server"]
""",
            'objectivesId': [
                'Memahami konsep Multi-Stage Builds untuk memisahkan lingkungan kompilasi dari lingkungan runtime',
                'Menyusutkan ukuran Docker Image secara drastis (dari 1GB+ menjadi kurang dari 30MB)',
                'Meningkatkan keamanan dengan mengeliminasi compiler, package manager, dan shell pada image runtime',
                'Menggunakan citra basis Distroless (`gcr.io/distroless/*`) dan menjalankan proses sebagai pengguna nonroot'
            ],
            'objectivesEn': [
                'Master Multi-Stage Builds decoupling build-time compiler toolchains from runtime distributions',
                'Drastically shrink container image sizes (from 1GB+ down to under 30MB)',
                'Harden security posture by stripping compilers, package managers, and shells from runtime images',
                'Deploy Google Distroless base images (`gcr.io/distroless/*`) running under unprivileged nonroot users'
            ],
            'explanationId': """### Mengapa Multi-Stage Builds Sangat Revolusioner?
Sebelum ada fitur **Multi-Stage Builds**, developer kerap menyertakan seluruh SDK bahasa (compiler Go, Rust, Node.js, Python build tools, git, gcc) di dalam image produksi. Akibatnya:
1. Ukuran image membengkak hingga **1GB - 2GB**, memperlambat proses deployment CI/CD dan menyita bandwidth jaringan.
2. Membuka **permukaan serangan (*attack surface*) yang sangat lebar**. Jika peretas menemukan celah RCE (*Remote Code Execution*), mereka memiliki akses langsung ke compiler `gcc` atau package manager `apt-get` untuk mengunduh malware di dalam server Anda.

### Sintaks Multi-Stage: `AS builder` dan `COPY --from=builder`
Dengan Multi-Stage Builds:
- **Stage 1 (Builder)**: Menggunakan image lengkap (`golang:alpine` atau `node:alpine`) untuk mengunduh library, mengompilasi TypeScript ke JavaScript, atau membangun binary biner mesin.
- **Stage 2 (Runtime)**: Dimulai dengan instruksi `FROM` baru. Seluruh file mentah di Stage 1 dibuang. Anda hanya menyalin file executable hasil kompilasi menggunakan instruksi `COPY --from=builder /build/api-server /app/api-server`.

### Keamanan Ekstrem Citra Distroless
Citra **Distroless** (dibuat oleh Google) adalah standar emas keamanan kontainer. Image ini hanya berisi dependensi minimal mutlak yang dibutuhkan aplikasi Anda untuk berjalan (seperti sertifikat SSL root `ca-certificates` dan zona waktu). Di dalam Distroless, **tidak ada shell (`/bin/sh` atau `/bin/bash`) dan tidak ada package manager (`apt`, `apk`)**. Peretas yang menyusup tidak dapat mengeksekusi perintah shell apapun!""",
            'explanationEn': """### The Multi-Stage Revolution
Prior to **Multi-Stage Builds**, production images inevitably bundled complete development SDKs (Go compilers, Rust toolchains, npm, gcc, git). This caused two severe liabilities:
1. Bloated image footprints (**1GB to 2GB**), strangling CI/CD pipeline deployment speeds and saturating container registry storage.
2. An unacceptably wide **attack surface**. If an attacker achieves Remote Code Execution (RCE), they discover compilers (`gcc`) and package managers (`apk/apt`) readily available to download and compile malicious rootkits.

### Anatomy of Multi-Stage Builds
- **Stage 1 (Builder)**: Utilizes a heavy build image (`AS builder`) equipped with complete toolchains to compile assets, run linters, or produce statically linked binaries.
- **Stage 2 (Runtime)**: Declares a fresh `FROM` line. Intermediate caches, build scripts, and compilers are discarded. The runtime selectively copies strictly the production binary via `COPY --from=builder /build/binary /app/binary`.

### Extreme Security with Google Distroless
**Distroless** base images (maintained by Google) define the industry security standard. They package strictly runtime dependencies (such as root SSL `ca-certificates` and `glibc/musl`). Crucially, Distroless images contain **zero package managers and zero shells (`/bin/sh` or `/bin/bash`)**. Even if a remote exploit is achieved, attackers cannot spawn a shell or download binaries!""",
            'beginnerId': """Bayangkan Anda membangun sebuah mobil balap Formula 1. 
Stage 1 (Builder) adalah pabrik bengkel raksasa lengkap dengan mesin las, mesin bubut, forklift, dan tumpukan besi kotor seberat 10 ton.
Stage 2 (Runtime) adalah lintasan sirkuit balap. 

Anda tidak membawa seluruh mesin las dan forklift 10 ton ke sirkuit balap; Anda hanya membawa mobil balap jadi seberat 500kg yang siap melesat kencang!""",
            'beginnerEn': """Think of constructing a Formula 1 racing car.
Stage 1 (Builder) is the industrial manufacturing plant filled with 10-ton hydraulic presses, welders, raw metal shavings, and toolkits.
Stage 2 (Runtime) is the Grand Prix racetrack.

You don't tow the 10-ton hydraulic welders and factory tools onto the racetrack; you only bring the finished, ultra-lightweight racing car onto the track!""",
            'experimentsId': [
                'Bandingkan ukuran image menggunakan perintah docker images: bandingkan single-stage (1GB+) vs multi-stage distroless (<30MB)',
                'Coba jalankan docker exec -it <container> sh pada kontainer distroless dan amati error bahwa executable sh tidak ditemukan',
                'Gunakan tool scanning keamanan open-source Trivy (trivy image <name>) untuk melihat penurunan drastis celah CVE',
                'Uji kompilasi dengan flag CGO_ENABLED=0 untuk memastikan binary Go tidak bergantung pada library C sistem'
            ],
            'experimentsEn': [
                'Compare image sizes using docker images: observe the variance between single-stage (1GB+) versus multi-stage distroless (<30MB)',
                'Attempt running docker exec -it <container> sh against a distroless container and observe the executable not found error',
                'Scan the images using Trivy (trivy image <name>) and observe the massive drop in detectable CVE vulnerabilities',
                'Verify CGO_ENABLED=0 compilation to ensure the compiled Go binary has zero dynamic C library dependencies'
            ],
            'challengeId': 'Terapkan Multi-Stage Build untuk aplikasi frontend React/Vite: Stage 1 menjalankan `npm run build` di Node.js, dan Stage 2 menyalin folder `dist/` ke dalam web server `nginx:alpine` tanpa menyertakan Node.js sama sekali.',
            'challengeEn': 'Architect a Multi-Stage Build for a React/Vite frontend: Stage 1 executes `npm run build` in Node.js, and Stage 2 copies the compiled `dist/` folder into `nginx:alpine`, stripping Node.js entirely.',
            'summaryId': 'Anda telah menguasai Multi-Stage Builds, penyusutan ukuran image dari gigabyte ke puluhan megabyte, eliminasi permukaan serangan dengan Distroless, dan penegakan eksekusi pengguna nonroot.',
            'summaryEn': 'You have mastered Multi-Stage Builds, shrinking images from gigabytes to tens of megabytes, neutralizing attack surfaces with Distroless, and enforcing nonroot execution.'
        },

        # WEEK 4
        {
            'week': 4,
            'level': 'beginer',
            'levelNameId': 'Fondasi Kontainerisasi & Optimasi Image',
            'levelNameEn': 'Containerization Foundations & Image Optimization',
            'topicId': 'manajemen-volume-dan-jaringan-docker',
            'titleId': 'Manajemen Volume, Persistensi Data & Jaringan Bridge',
            'titleEn': 'Volume Persistence, Storage Drivers & Bridge Networks',
            'language': 'bash',
            'programId': 'Persistensi Database PostgreSQL dengan Named Volume dan Komunikasi Jaringan Kustom',
            'programEn': 'PostgreSQL Persistence with Named Volumes and Custom Bridge Network Routing',
            'code': """# 1. Create dedicated user-defined Bridge Network
# User-defined bridges provide automatic DNS resolution between containers by container name!
docker network create --driver bridge app_isolated_net

# 2. Create durable Named Volume for database storage persistence
# Bypasses the slow Copy-On-Write storage driver, writing at raw host disk speed!
docker volume create pgdata_production

# 3. Launch PostgreSQL container attached to network and volume
docker run -d \\
  --name db_postgres \\
  --network app_isolated_net \\
  -e POSTGRES_DB=commerce_db \\
  -e POSTGRES_USER=admin \\
  -e POSTGRES_PASSWORD=SuperSecretPass2026! \\
  -v pgdata_production:/var/lib/postgresql/data \\
  postgres:17-alpine

# 4. Launch backend application attached to the SAME network
# Notice the database host in URL uses the container name 'db_postgres' resolved via Docker DNS!
docker run -d \\
  --name api_server \\
  --network app_isolated_net \\
  -p 4000:4000 \\
  -e DATABASE_URL="postgresql://admin:SuperSecretPass2026!@db_postgres:5432/commerce_db" \\
  node:22-alpine sleep 3600

# 5. Verify Inter-Container DNS resolution and connectivity
docker exec -it api_server ping -c 2 db_postgres

# 6. Test Data Persistence across container destruction
docker stop db_postgres && docker rm db_postgres
# Notice: Container is DELETED, but physical volume remains completely intact!
docker volume ls

# Launch a NEW container pointing to the existing volume: All historical data is preserved!
docker run -d \\
  --name db_postgres_v2 \\
  --network app_isolated_net \\
  -v pgdata_production:/var/lib/postgresql/data \\
  postgres:17-alpine
""",
            'objectivesId': [
                'Memahami sifat Ephemeral (sementara) sistem file kontainer dan pentingnya penyimpanan persisten',
                'Membedakan jenis mount: Named Volumes (dikelola Docker di /var/lib/docker/volumes/) vs Bind Mounts (path host lokal)',
                'Memahami perbedaan Default Bridge Network vs User-Defined Bridge Network (resolusi DNS otomatis)',
                'Menghubungkan beberapa kontainer dalam satu jaringan terisolasi tanpa membuka port database ke publik'
            ],
            'objectivesEn': [
                'Understand the Ephemeral lifecycle of container filesystems and the necessity of persistent storage',
                'Differentiate storage mounts: Named Volumes (Docker-managed) vs Bind Mounts (Host directory bindings)',
                'Compare Default Bridge vs User-Defined Bridge networks (automated container DNS service discovery)',
                'Isolate inter-container communications on private networks without exposing database ports to the host interface'
            ],
            'explanationId': """### Sifat Ephemeral Sistem File Kontainer
Secara default, seluruh sistem file di dalam kontainer bersifat **sementara (*ephemeral*)**. Ketika Anda membuat tabel di database atau mengunggah file di dalam kontainer, data tersebut ditulis ke layer tipis *writable layer* kontainer. Saat kontainer dimatikan dan dihapus (`docker rm`), seluruh data tersebut akan **musnah selamanya**.

### Named Volumes vs Bind Mounts
1. **Named Volumes** (`-v nama_volume:/path/kontainer`): Dikelola sepenuhnya oleh Docker di direktori aman host (`/var/lib/docker/volumes/`). Named volume melewati layer *Copy-On-Write* (CoW) dan menulis langsung ke disk host pada kecepatan I/O native. Merupakan standar emas untuk PostgreSQL, MySQL, dan Redis.
2. **Bind Mounts** (`-v /path/di/laptop:/path/kontainer`): Menautkan folder fisik di laptop pengembang ke dalam kontainer. Sangat ideal untuk *Hot-Reloading* saat pengembangan lokal, namun tidak disarankan di lingkungan produksi karena ketergantungan pada struktur path OS host.

### Keajaiban DNS pada User-Defined Bridge Network
Secara default, jika Anda tidak menentukan jaringan, kontainer masuk ke `default bridge network`. Jaringan default ini memiliki kelemahan: tidak mendukung pencarian nama servis (*Service Discovery*).
Sebaliknya, pada **User-Defined Bridge Network** (`docker network create ...`), Docker menyediakan server DNS internal. Kontainer `api_server` dapat menghubungi database cukup dengan memanggil hostname nama kontainernya: `db_postgres:5432`, tanpa pernah perlu memusingkan IP address kontainer yang dinamis.""",
            'explanationEn': """### Ephemeral Lifecycles vs State Durability
By default, the writable layer of any container is strictly **ephemeral**. When records are inserted into a database running in a bare container, state is written to the container's top-level copy-on-write storage driver. Executing `docker rm` irreversibly **destroys all underlying data**.

### Storage Mount Architectures: Named Volumes vs Bind Mounts
1. **Named Volumes** (`-v volume_name:/path`): Formally managed by Docker within the host storage engine (`/var/lib/docker/volumes/`). Volumes bypass Copy-On-Write drivers, writing directly to disk blocks at bare-metal I/O throughput. Non-negotiable for databases (PostgreSQL, MySQL, Redis).
2. **Bind Mounts** (`-v /local/host/dir:/container/path`): Mounts host directory trees directly into the container filesystem. Indispensable for live source-code hot-reloading during local development, but dangerous in production due to host filesystem path coupling.

### Automated Service Discovery on User-Defined Bridges
The unconfigured `default bridge` network lacks embedded DNS service discovery.
Conversely, on **User-Defined Bridge Networks** (`docker network create`), Docker embeds an internal 127.0.0.11 DNS resolver. Applications reach peer containers using their literal container identifier as a hostname (e.g. `db_postgres:5432`), rendering volatile dynamic IP addressing irrelevant.""",
            'beginnerId': """Bayangkan kontainer seperti kamar hotel yang Anda sewa selama semalam. Jika Anda meninggalkan baju di lemari kamar hotel dan check-out, petugas kebersihan akan membuang baju Anda (Ephemeral).

Named Volume seperti brankas penitipan permanen di stasiun kereta: Anda bisa check-in di hotel mana pun, kapan pun, dan brankas penitipan barang Anda tetap utuh tidak tersentuh. 
User-Defined Network seperti interkom telepon antar-kamar di hotel: Anda cukup menekan tombol 'Resepsionis' atau 'Koki' (DNS Container Name) tanpa perlu tahu nomor HP pribadi mereka!""",
            'beginnerEn': """Think of a container like a hotel room rented for a night. If you leave your luggage in the closet and check out, the cleaning staff discards everything (Ephemeral).

A Named Volume is like a permanent bank safety deposit box: you can move across different hotel rooms over time, but your vault contents remain safe and untouched.
A User-Defined Network is like an internal intercom phone connecting hotel suites: you simply dial 'Front Desk' or 'Kitchen' (Container DNS Name) without needing to look up their personal mobile phone numbers!""",
            'experimentsId': [
                'Buat tabel dan isi data di postgres, hapus kontainernya, buat kontainer baru dengan volume yang sama, dan buktikan datanya masih ada',
                'Inspeksi lokasi fisik volume di host menggunakan docker volume inspect pgdata_production',
                'Coba ping kontainer lain di default bridge network dan buktikan bahwa DNS name lookup gagal',
                'Gunakan docker network inspect app_isolated_net untuk melihat daftar seluruh IP kontainer yang tergabung'
            ],
            'experimentsEn': [
                'Seed tables in PostgreSQL, delete the container, spin up a new container on the same volume, and verify data survives',
                'Inspect physical host storage coordinates using docker volume inspect pgdata_production',
                'Attempt pinging peer containers on the default bridge and verify that DNS resolution fails',
                'Run docker network inspect app_isolated_net to view the list of dynamically assigned container IP addresses'
            ],
            'challengeId': 'Konfigurasi arsitektur multi-network: buat `frontend_net` dan `backend_net`. Pastikan kontainer Web terhubung ke kedua network, namun kontainer Database HANYA terhubung ke `backend_net` sehingga terisolasi total dari internet.',
            'challengeEn': 'Architect dual-network isolation: provision `frontend_net` and `backend_net`. Place Web on both networks, while restricting Database strictly to `backend_net` achieving zero internet ingress.',
            'summaryId': 'Anda telah menguasai manajemen persistensi data kontainer menggunakan Named Volumes, bind mounts untuk development, serta arsitektur jaringan User-Defined Bridge dengan DNS service discovery otomatis.',
            'summaryEn': 'You have mastered container persistence via Named Volumes, local development bind mounts, and isolated User-Defined Bridge networks featuring automatic DNS service discovery.'
        },

        # WEEK 5
        {
            'week': 5,
            'level': 'intermediate',
            'levelNameId': 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
            'levelNameEn': 'Multi-Container Orchestration & Production Hardening',
            'topicId': 'orkestrasi-docker-compose-v2-dan-service-dependencies',
            'titleId': 'Docker Compose v2 & Manajemen Dependensi Servis',
            'titleEn': 'Docker Compose v2 & Service Dependency Management',
            'language': 'yaml',
            'programId': 'Stack Multi-Kontainer Produksi: Web Gateway, API, Redis & PostgreSQL dengan Healthchecks',
            'programEn': 'Production Multi-Container Stack: Web Gateway, API, Redis & PostgreSQL with Healthchecks',
            'code': """# Modern Docker Compose v2 Specification (compose.yaml)
# Note: The obsolete 'version:' key is deprecated and omitted in Compose v2+
services:
  # 1. Reverse Proxy & Static Asset Gateway
  gateway:
    image: nginx:alpine
    container_name: web_gateway
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy # Wait until API healthcheck passes!
    networks:
      - edge_network

  # 2. Core Node.js API Service
  api:
    build:
      context: ./apps/api
      dockerfile: Dockerfile
    container_name: core_api
    environment:
      NODE_ENV: production
      DATABASE_URL: postgres://pguser:SecretPass2026@postgres:5432/core_db
      REDIS_URL: redis://cache:6379
    depends_on:
      postgres:
        condition: service_healthy # Guarantees DB is accepting connections before API boots!
      cache:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/healthz"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 5s
    networks:
      - edge_network
      - internal_network

  # 3. High-Throughput In-Memory Cache
  cache:
    image: redis:7-alpine
    container_name: app_cache
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "256mb"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - internal_network

  # 4. Primary Relational Storage
  postgres:
    image: postgres:17-alpine
    container_name: app_database
    environment:
      POSTGRES_DB: core_db
      POSTGRES_USER: pguser
      POSTGRES_PASSWORD: SecretPass2026
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pguser -d core_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - internal_network

volumes:
  pgdata:
    driver: local

networks:
  edge_network:
    driver: bridge
  internal_network:
    driver: bridge
    internal: true # Forbids all outbound internet ingress/egress for maximum security!
""",
            'objectivesId': [
                'Menguasai spesifikasi modern Docker Compose v2 (file `compose.yaml` tanpa deklarasi version usang)',
                'Mencegah crash aplikasi saat booting menggunakan dependensi kondisi: `condition: service_healthy`',
                'Mengonfigurasi pemeriksaan kesehatan mandiri (`healthcheck`) pada PostgreSQL, Redis, dan HTTP endpoint',
                'Mengamankan database internal dari akses internet publik menggunakan `internal: true` network'
            ],
            'objectivesEn': [
                'Master modern Docker Compose v2 specifications (using `compose.yaml` without obsolete version keys)',
                'Prevent cold-boot application startup crashes via `depends_on` pairing with `condition: service_healthy`',
                'Configure resilient container healthchecks across PostgreSQL, Redis, and HTTP endpoints',
                'Isolate internal persistence tiers from public routing using `internal: true` bridge networks'
            ],
            'explanationId': """### Mengapa Docker Compose v2?
Menjalankan 5 perintah `docker run` dengan 20 flag parameter di terminal sangat rentan salah tik dan tidak dapat dikontrol versinya (*unreproducible*). **Docker Compose v2** (diakses melalui perintah `docker compose` tanpa tanda strip) memungkinkan orkestrasi seluruh arsitektur multi-kontainer didefinisikan secara deklaratif dalam satu file `compose.yaml`.

### Masalah Klasik depends_on dan Solusi service_healthy
Pada konfigurasi lama, deklarasi `depends_on: [postgres]` hanya menunggu kontainer PostgreSQL *mulai menyala (running)*. Padahal, database butuh waktu 5-10 detik untuk menginisialisasi tabel disk dan membuka port 5432. Akibatnya, API yang menyala cepat langsung crash karena koneksi database ditolak (*Connection Refused*).
**Solusi Produksi**:
Gunakan `condition: service_healthy` yang dipasangkan dengan perintah `healthcheck` native (`pg_isready -U ...`). Docker Compose menjamin servis API tidak akan pernah dinyalakan sebelum PostgreSQL benar-benar siap menerima kueri SQL.

### Jaringan Internal Terisolasi (internal: true)
Kelemahan keamanan fatal banyak tim adalah membuka port database ke publik (`ports: ["5432:5432"]`). Dengan arsitektur dua jaringan:
- `edge_network`: Hanya menghubungkan Gateway ke API.
- `internal_network` dengan opsi `internal: true`: Menghubungkan API ke Database dan Redis. Database tidak memiliki akses ke internet luar dan tidak dapat diakses dari luar, memangkas risiko peretasan hingga nol.""",
            'explanationEn': """### Why Docker Compose v2?
Manually dispatching disparate `docker run` commands littered with dozen of flags across terminal shells is error-prone and unversioned. **Docker Compose v2** (invoked as `docker compose`, superseding legacy python-based `docker-compose`) enables declarative infrastructure-as-code orchestration defined cleanly inside `compose.yaml`.

### The depends_on Trap and service_healthy
Historically, `depends_on: [postgres]` merely awaited the container transition to a *running* state. However, databases require 5-10 seconds of disk replay before accepting socket traffic on port 5432. Downstream API containers starting instantly immediately crashed with *Connection Refused* exceptions.
**The Production Solution**:
Pairing `depends_on` with `condition: service_healthy` anchored to deterministic healthchecks (`pg_isready`). Docker Compose freezes API instantiation until the database passes real SQL socket readiness probes.

### Network Segmentation via internal: true
Exposing database ports directly to host interfaces (`ports: ["5432:5432"]`) is a severe security vulnerability. Employing dual-tier networks:
- `edge_network`: Bridges public ingress from the Gateway to the API.
- `internal_network` declared with `internal: true`: Connects API to Database and Redis. The persistence tier is physically air-gapped with zero route to the public internet.""",
            'beginnerId': """Bayangkan Docker Compose seperti seorang konduktor orkestra musik. 
Tanpa konduktor, pemain drum, gitaris, dan penyanyi mulai bermain sendiri-sendiri tanpa aba-aba dan lagunya hancur berantakan (API menyala sebelum database siap).

Konduktor memastikan pemain drum (PostgreSQL) selesai menyetem drumnya dan memberi tanda jempol (`service_healthy`), barulah sang penyanyi (API Server) mulai bernyanyi di depan panggung!""",
            'beginnerEn': """Think of Docker Compose like an orchestra conductor.
Without a conductor, the drummer, guitarist, and vocalist start playing at random intervals, collapsing the performance (the API boots before the database is ready).

The conductor watches the drummer (PostgreSQL) tune their kit, waiting for a definitive thumbs-up signal (`service_healthy`), before cueing the lead singer (API Server) to step up to the microphone!""",
            'experimentsId': [
                'Jalankan seluruh stack dengan perintah docker compose up -d dan amati urutan startup kontainer yang tertib',
                'Periksa status kesehatan seluruh servis menggunakan docker compose ps dan pastikan kolom STATUS bertuliskan (healthy)',
                'Hentikan kontainer postgres dan amati status API berubah dan gateway menangkap kegagalan healthcheck',
                'Gunakan docker compose logs -f api untuk memantau log gabungan secara terpusat'
            ],
            'experimentsEn': [
                'Spin up the complete stack with docker compose up -d and observe the orchestrated startup sequence',
                'Inspect health statuses via docker compose ps, confirming the STATUS column displays (healthy)',
                'Stop the postgres container and observe API health status degrade accordingly',
                'Aggregate real-time service telemetry using docker compose logs -f api'
            ],
            'challengeId': 'Kembangkan `compose.yaml` dengan menambahkan skala horizontal: jalankan servis API dengan 3 replika (`deploy.replicas: 3`) dan konfigurasikan reverse proxy Nginx agar melakukan load balancing Round-Robin ke ketiga replika tersebut.',
            'challengeEn': 'Extend `compose.yaml` with horizontal scaling: deploy the API across 3 replicas (`deploy.replicas: 3`) and configure Nginx to round-robin balance traffic across all instances.',
            'summaryId': 'Anda telah menguasai orkestrasi Docker Compose v2, eliminasi race condition booting dengan condition: service_healthy, konfigurasi healthcheck database, dan isolasi jaringan bertingkat.',
            'summaryEn': 'You have mastered Docker Compose v2 orchestration, boot race condition elimination via condition: service_healthy, database healthchecks, and multi-tier network isolation.'
        },

        # WEEK 6
        {
            'week': 6,
            'level': 'intermediate',
            'levelNameId': 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
            'levelNameEn': 'Multi-Container Orchestration & Production Hardening',
            'topicId': 'pemantauan-kesehatan-restart-policies-dan-logging',
            'titleId': 'Healthcheck, Kebijakan Restart & Logging Drivers',
            'titleEn': 'Healthchecks, Restart Policies & Logging Drivers',
            'language': 'bash',
            'programId': 'Konfigurasi Kontainer Tahan Banting: Otomasi Pemulihan Diri dan Rotasi Log',
            'programEn': 'Resilient Container Configuration: Self-Healing Automation and Log Rotation',
            'code': """# 1. Run a self-healing container with advanced healthcheck and restart policy
docker run -d \\
  --name resilient_worker \\
  --restart on-failure:5 \\
  --health-cmd="curl -f http://localhost:8080/live || exit 1" \\
  --health-interval=10s \\
  --health-timeout=3s \\
  --health-retries=3 \\
  --health-start-period=15s \\
  --log-driver json-file \\
  --log-opt max-size=10m \\
  --log-opt max-file=3 \\
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
""",
            'objectivesId': [
                'Merancang parameter HEALTHCHECK: interval, timeout, retries, dan start-period',
                'Memilih kebijakan restart yang tepat: no, on-failure[:max-retries], always, dan unless-stopped',
                'Mencegah bahaya Server Disk Full akibat log kontainer liar menggunakan Logging Driver max-size dan max-file',
                'Memahami perbedaan Liveness Probe (apakah proses hidup) vs Readiness Probe (apakah siap terima trafik)'
            ],
            'objectivesEn': [
                'Fine-tune HEALTHCHECK parameters: interval, timeout, retries, and start-period',
                'Select appropriate restart policies: no, on-failure[:max-retries], always, and unless-stopped',
                'Prevent disk exhaustion disasters from unconstrained logs using Logging Driver max-size and max-file caps',
                'Distinguish Liveness Probes (process liveness) from Readiness Probes (traffic ingress readiness)'
            ],
            'explanationId': """### Anatomi Empat Parameter HEALTHCHECK
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
Mengonfigurasi `--log-opt max-size=10m --log-opt max-file=3` membatasi ukuran maksimal setiap file log menjadi 10MB dengan retensi maksimal 3 file putar (*log rotation*).""",
            'explanationEn': """### The Four HEALTHCHECK Parameters Deconstructed
The `HEALTHCHECK` directive instructs Docker on assessing internal application health:
1. `--health-interval=10s`: The frequency interval between probe executions.
2. `--health-timeout=3s`: Maximum execution duration before a probe is judged timed-out.
3. `--health-retries=3`: Consecutive failure threshold required before declaring the container `unhealthy`.
4. `--health-start-period=15s`: Boot initialization grace window; probe faults during this warmup duration do not decrement retry budgets.

### The Restart Policy Spectrum
- `no`: Default behavior. Containers remain stopped upon process exit.
- `on-failure:5`: Restarts containers strictly upon non-zero exit codes (crashes), capped at 5 consecutive attempts.
- `unless-stopped`: Restarts upon crashes or daemon reboots, EXCEPT when explicitly stopped by an administrator (`docker stop`). The industry standard for production services.
- `always`: Unconditionally restarts containers under all circumstances, even manual stops, risking disruptive reboot loops.

### Neutralizing the Unconstrained Log Disk-Full Catastrophe
By default, Docker captures `stdout` and `stderr` to JSON files on the host root filesystem. Lacking bounds, verbose applications emit **50GB to 100GB** of logs, completely exhausting host disk capacity and causing kernel panic crashes.
Configuring `--log-opt max-size=10m --log-opt max-file=3` caps log segments to 10MB while rotating across a strict ceiling of 3 historical files.""",
            'beginnerId': """Bayangkan Anda memiliki robot pelayan di toko.
HEALTHCHECK seperti dokter yang datang memeriksa denyut nadi robot setiap 10 detik. Jika robot pingsan 3 kali berturut-turut, dokter meniup peluit tanda darurat.

Restart Policy `unless-stopped` seperti tombol reset otomatis di punggung robot: jika robot terpeleset jatuh, ia otomatis bangkit kembali, kecuali jika Anda sendiri yang menekan tombol matikan. Sedangkan pembatasan log seperti tong sampah daur ulang: jika tempat sampah penuh 10 lembar, kertas paling lama otomatis dihancurkan agar sampah tidak menggunung ke langit-langit toko!""",
            'beginnerEn': """Think of a container like an automated factory robot.
HEALTHCHECK is like a paramedic checking the robot's pulse every 10 seconds. If the robot faints three consecutive times, the paramedic sounds an alarm.

Restart Policy `unless-stopped` is like an automatic spring: if the robot stumbles, it automatically jumps back on its feet, unless the manager explicitly flips the power switch. Log rotation is like a compact shredder: once 10 pages accumulate, the oldest pages are shredded so paper never overflows across the factory floor!""",
            'experimentsId': [
                'Jalankan kontainer dengan healthcheck ke endpoint yang sengaja mengembalikan status 500 dan amati status kontainer berubah menjadi (unhealthy)',
                'Jalankan kontainer dengan restart policy on-failure, matikan prosesnya dengan kill -9, dan amati kontainer otomatis hidup kembali',
                'Buat skrip yang menulis 100MB string ke stdout dan buktikan bahwa file log tidak melebihi batas max-size yang ditentukan',
                'Gunakan docker inspect untuk memeriksa bagian ExitCode dan RestartCount'
            ],
            'experimentsEn': [
                'Deploy a container with a healthcheck probing an intentional 500 HTTP endpoint and observe it transition to (unhealthy)',
                'Run a container with on-failure restart policy, terminate it via kill -9, and observe automated reboot',
                'Run a script piping 100MB to stdout and verify physical log files remain strictly bounded by max-size',
                'Inspect the low-level ExitCode and RestartCount telemetry inside docker inspect'
            ],
            'challengeId': 'Konfigurasikan daemon Docker global (`/etc/docker/daemon.json`) agar seluruh kontainer baru di server host otomatis mewarisi kebijakan logging `max-size: 20m` dan `max-file: 3` tanpa perlu diketik manual di setiap perintah.',
            'challengeEn': 'Configure the global Docker daemon (`/etc/docker/daemon.json`) so all newly launched containers inherit `max-size: 20m` and `max-file: 3` logging rules automatically.',
            'summaryId': 'Anda telah menguasai ketahanan kontainer produksi: konfigurasi empat parameter HEALTHCHECK, kebijakan restart unless-stopped, dan pencegahan disk penuh dengan rotasi logging drivers.',
            'summaryEn': 'You have mastered production container resilience: four-tier HEALTHCHECK configuration, unless-stopped restart policies, and disk exhaustion defense via log rotation drivers.'
        },

        # WEEK 7
        {
            'week': 7,
            'level': 'intermediate',
            'levelNameId': 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
            'levelNameEn': 'Multi-Container Orchestration & Production Hardening',
            'topicId': 'keamanan-kontainer-produksi-dan-audit-trivy',
            'titleId': 'Keamanan Kontainer: Non-Root, Drop Capabilities & Trivy',
            'titleEn': 'Container Hardening: Non-Root, Drop Capabilities & Trivy',
            'language': 'bash',
            'programId': 'Pengerasan Keamanan Kontainer Menyeluruh: Read-Only Filesystem dan Eliminasi Hak Akses Root',
            'programEn': 'Comprehensive Container Hardening: Read-Only Root Filesystem and Dropping Linux Capabilities',
            'code': """# 1. Run ultra-hardened production container applying Zero-Trust principles
docker run -d \\
  --name hardened_api \\
  --read-only \\
  --cap-drop=ALL \\
  --cap-add=NET_BIND_SERVICE \\
  --security-opt=no-new-privileges:true \\
  --tmpfs /tmp:rw,noexec,nosuid,size=64m \\
  --user 10001:10001 \\
  -p 8080:8080 \\
  my-production-api:v1

# Explanation of Security Flags:
# --read-only: Root filesystem is 100% IMMUTABLE! Attackers CANNOT download rootkits or write scripts!
# --cap-drop=ALL: Strips all Linux Kernel capabilities (chown, kill, net_admin, sys_admin)
# --cap-add=NET_BIND_SERVICE: Grants strictly the permission to bind low ports (if needed)
# --security-opt=no-new-privileges:true: Blocks processes from gaining privileges via SUID binaries
# --tmpfs /tmp: Provides temporary, RAM-only writable scratchpad with noexec flag
# --user 10001: Forces non-root unprivileged UID

# 2. Automated Vulnerability Auditing with Trivy CLI
# Scans OS packages and application dependencies (npm, pip, go) for known CVEs
trivy image --severity HIGH,CRITICAL my-production-api:v1

# 3. Docker Scout: Real-time CVE recommendations
docker scout quickview my-production-api:v1
docker scout cves --only-severity critical my-production-api:v1
""",
            'objectivesId': [
                'Menerapkan prinsip Zero-Trust pada runtime kontainer Docker di lingkungan produksi',
                'Mengunci sistem file menjadi immutable menggunakan flag `--read-only` dan alokasi `--tmpfs` aman',
                'Memangkas hak istimewa kernel Linux menggunakan `--cap-drop=ALL` dan `--security-opt=no-new-privileges`',
                'Mengintegrasikan pemindaian kerentanan CVE otomatis menggunakan Trivy dan Docker Scout di pipeline CI/CD'
            ],
            'objectivesEn': [
                'Enforce Zero-Trust security principles across production Docker container runtimes',
                'Lock filesystems into immutable states utilizing `--read-only` paired with restricted `--tmpfs` mounts',
                'Strip kernel capabilities via `--cap-drop=ALL` and enforce `--security-opt=no-new-privileges`',
                'Integrate automated vulnerability scanning via Trivy and Docker Scout within CI/CD pipelines'
            ],
            'explanationId': """### Bahaya Menjalankan Kontainer Sebagai Root (UID 0)
Secara default, jika Anda tidak menentukan instruksi `USER`, proses di dalam kontainer berjalan sebagai pengguna **root (UID 0)**. Meskipun dibatasi oleh namespaces, jika penyerang berhasil menemukan celah *Container Breakout* (seperti celah kernel Linux pada `runc`), penyerang otomatis mendapatkan hak akses root atas seluruh server fisik host Anda! Menjalankan kontainer sebagai pengguna biasa unprivileged (`USER 10001`) membatasi potensi kerusakan.

### Sistem File Read-Only dan tmpfs Aman
Lebih dari 90% malware yang berhasil menembus aplikasi web akan berusaha mengunduh file biner jahat ke folder `/tmp` atau menimpa file konfigurasi di `/app`.
Dengan flag `--read-only`, sistem file kontainer dikunci mati (*immutable*). Bahkan perintah `touch test.txt` akan ditolak oleh sistem operasi. Jika aplikasi butuh tempat sementara untuk memproses buffer file kecil, gunakan `--tmpfs /tmp:rw,noexec,nosuid,size=64m`. Opsi `noexec` memastikan tidak ada file di dalam `/tmp` yang dapat dieksekusi sebagai program!

### Memangkas Linux Capabilities (`--cap-drop=ALL`)
Root di Linux tidak bersifat biner (semua atau tidak sama sekali). Hak akses dipecah menjadi puluhan **Capabilities** (misal: `CAP_SYS_ADMIN`, `CAP_NET_RAW`, `CAP_CHOWN`). 
Aplikasi web backend pada dasarnya tidak butuh mengubah kepemilikan file atau mengutak-atik routing kartu jaringan. Flag `--cap-drop=ALL` mencabut seluruh kemampuan tingkat kernel tersebut, menyisakan hanya kapabilitas minimal mutlak yang dibutuhkan.""",
            'explanationEn': """### The Peril of Running as Root (UID 0)
By default, failing to declare a `USER` directive causes container entry points to execute as **root (UID 0)**. While bounded by namespaces, should an attacker uncover a *Container Breakout* exploit (e.g. kernel vulnerabilities in `runc`), they instantaneously inherit root privileges over the entire physical host node! Forcing non-root execution (`USER 10001`) confines blast radiuses.

### Immutable Read-Only Filesystems & Hardened tmpfs
Over 90% of web exploit payloads attempt downloading malicious binary droppers into `/tmp` or overwriting binaries in `/app`.
Enforcing `--read-only` renders the container filesystem strictly immutable; even `touch exploit.sh` triggers permission-denied faults. When applications require scratch space, bind an ephemeral in-memory mount: `--tmpfs /tmp:rw,noexec,nosuid,size=64m`. Crucially, `noexec` forbids executing binary instructions from the scratchpad!

### Stripping Linux Capabilities (`--cap-drop=ALL`)
Linux root privileges are decomposed into granular **Capabilities** (e.g. `CAP_SYS_ADMIN`, `CAP_NET_RAW`, `CAP_CHOWN`).
Web services have zero legitimate requirement to forge network raw packets or alter hardware clocks. Deploying `--cap-drop=ALL` strips every kernel privilege entirely, selectively whitelisting only essential capabilities (`--cap-add=NET_BIND_SERVICE`).""",
            'beginnerId': """Bayangkan seorang tamu hotel yang menyewa kamar. 
Menjalankan kontainer sebagai root seperti memberi tamu tersebut kunci master seluruh gedung hotel! 

Hardening keamanan seperti:
1. Memberi tamu kartu kamar biasa yang hanya bisa membuka pintunya sendiri (Non-Root User).
2. Memaku mati seluruh perabotan dan melarang mengecat dinding kamar (`--read-only`).
3. Mengambil seluruh gunting, tang, dan obeng dari kantong tamu (`--cap-drop=ALL`) sehingga mereka tidak bisa membongkar instalasi listrik gedung!""",
            'beginnerEn': """Think of a guest checking into a hotel room.
Running a container as root is like handing the guest a universal master key that unlocks every utility closet, elevator shaft, and safe in the building!

Container hardening ensures:
1. The guest receives a standard keycard unlocking strictly their room (Non-Root User).
2. Hotel furniture is bolted to the floor and painting walls is prohibited (`--read-only`).
3. Wire cutters, blowtorches, and lockpicks are confiscated at the door (`--cap-drop=ALL`), guaranteeing they cannot tamper with building infrastructure!""",
            'experimentsId': [
                'Jalankan kontainer dengan flag --read-only dan coba buat file baru dengan touch /app/malware.sh untuk melihat penolakan Read-only file system',
                'Uji flag --cap-drop=ALL dan amati bagaimana perintah chown atau ping ditolak karena kehilangan Linux capabilities',
                'Jalankan pemindaian Trivy pada image node:latest vs node:alpine vs distroless dan bandingkan temuan CVE kritis',
                'Periksa apakah proses kontainer berjalan sebagai non-root menggunakan perintah id di dalam kontainer'
            ],
            'experimentsEn': [
                'Launch a container with --read-only and attempt touch /app/malware.sh to observe the Read-only file system rejection',
                'Test --cap-drop=ALL and observe that commands like chown or ping fail due to missing Linux capabilities',
                'Run a Trivy audit comparing node:latest against node:alpine against distroless to view CVE remediation drops',
                'Verify non-root process identities by executing the id command inside the running container'
            ],
            'challengeId': 'Konfigurasikan blok `security_opt` dan `cap_drop` di dalam file `compose.yaml`: terapkan `--read-only`, non-root user UID 10001, dan `--tmpfs /tmp` pada seluruh servis API.',
            'challengeEn': 'Incorporate `security_opt` and `cap_drop` directives inside a production `compose.yaml`: enforce `--read-only`, non-root UID 10001, and `--tmpfs /tmp` across all API services.',
            'summaryId': 'Anda telah menguasai pengerasan keamanan kontainer Docker: eksekusi non-root UID, pembekuan sistem file dengan --read-only dan tmpfs noexec, pemangkasan Linux capabilities, serta audit CVE dengan Trivy.',
            'summaryEn': 'You have mastered production container hardening: unprivileged non-root execution, immutable filesystems via --read-only and noexec tmpfs, Linux capability stripping, and Trivy CVE auditing.'
        },

        # WEEK 8 - CAPSTONE
        {
            'week': 8,
            'level': 'intermediate',
            'levelNameId': 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
            'levelNameEn': 'Multi-Container Orchestration & Production Hardening',
            'topicId': 'capstone-production-microservice-cluster-compose',
            'titleId': 'Capstone Project: Production Microservice Cluster Stack',
            'titleEn': 'Capstone Project: Production Microservice Cluster Stack',
            'language': 'yaml',
            'programId': 'Cluster Microservice Lengkap: Reverse Proxy Nginx, API Node.js, Worker Go, Redis & PostgreSQL',
            'programEn': 'Full Production Microservice Cluster: Nginx Proxy, Node.js API, Go Worker, Redis & PostgreSQL',
            'code': """# CAPSTONE PROJECT: Enterprise Multi-Stage Containerized Microservice Cluster
# Demonstrates: Multi-Stage Builds, Healthcheck Dependencies, Dual Isolated Networks, Non-Root Users

services:
  # ============================================================================
  # 1. Edge Ingress: Nginx Reverse Proxy with SSL Termination & Rate Limiting
  # ============================================================================
  ingress:
    image: nginx:1.27-alpine
    container_name: cluster_ingress
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infra/nginx/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      api:
        condition: service_healthy
    networks:
      - public_edge_net

  # ============================================================================
  # 2. Core Service: Node.js / TypeScript REST API (Hardened Container)
  # ============================================================================
  api:
    build:
      context: ./services/api
      dockerfile: Dockerfile
    container_name: service_api
    restart: unless-stopped
    read_only: true
    user: "10001:10001"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=64m
    environment:
      PORT: 3000
      DATABASE_URL: postgresql://app_user:SuperSecret2026!@postgres:5432/production_db
      REDIS_URL: redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "wget -qO- http://localhost:3000/health || exit 1"]
      interval: 10s
      timeout: 3s
      retries: 3
      start_period: 10s
    networks:
      - public_edge_net
      - private_cluster_net

  # ============================================================================
  # 3. Async Worker: Go Telemetry Event Processor (Distroless Binary)
  # ============================================================================
  worker:
    build:
      context: ./services/worker
      dockerfile: Dockerfile
    container_name: service_worker
    restart: on-failure:5
    read_only: true
    user: "65532:65532"
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - private_cluster_net

  # ============================================================================
  # 4. In-Memory Cache & Message Broker: Redis with Append-Only Durability
  # ============================================================================
  redis:
    image: redis:7.4-alpine
    container_name: cluster_redis
    restart: unless-stopped
    command: ["redis-server", "--appendonly", "yes", "--maxmemory", "512mb", "--maxmemory-policy", "allkeys-lru"]
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 2s
      retries: 3
    networks:
      - private_cluster_net

  # ============================================================================
  # 5. Primary Storage: PostgreSQL with Strict Connection Healthcheck
  # ============================================================================
  postgres:
    image: postgres:17-alpine
    container_name: cluster_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: production_db
      POSTGRES_USER: app_user
      POSTGRES_PASSWORD: SuperSecret2026!
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app_user -d production_db"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - private_cluster_net

volumes:
  postgres_data:
  redis_data:

networks:
  public_edge_net:
    driver: bridge
  private_cluster_net:
    driver: bridge
    internal: true # STRICT AIR-GAP: Zero direct route to/from public internet!
""",
            'objectivesId': [
                'Mengintegrasikan seluruh materi kurikulum Docker ke dalam satu capstone klaster microservice skala industri',
                'Mengisolasi tingkatan arsitektur jaringan secara fisik: Edge Publik vs Jaringan Internal Terisolasi (Air-Gapped)',
                'Menerapkan Multi-Stage Builds dan citra Distroless untuk seluruh servis kustom (Node.js API dan Go Worker)',
                'Mengunci kontainer dengan konfigurasi keamanan tertinggi: read_only, non-root user UID, no-new-privileges, dan cap_drop ALL'
            ],
            'objectivesEn': [
                'Synthesize all Docker containerization disciplines into an industrial-grade microservice cluster capstone',
                'Physically segment network tiers: Public Ingress Edge vs Private Air-Gapped Internal Networks',
                'Enforce Multi-Stage Builds and Distroless images across all custom services (Node.js API and Go Worker)',
                'Lock down containers with strict runtime security: read_only, non-root user UIDs, no-new-privileges, and cap_drop ALL'
            ],
            'explanationId': """### Arsitektur Capstone Production Microservice Cluster
Proyek capstone ini membangun fondasi infrastruktur kontainer kelas enterprise:
1. **Segmentasi Jaringan Berlapis (Air-Gapped Tiering)**: Hanya Nginx `cluster_ingress` yang membuka port 80/443 ke internet publik (`public_edge_net`). Seluruh database PostgreSQL, cache Redis, dan Go Worker berada di dalam `private_cluster_net` dengan konfigurasi `internal: true`. Peretas dari internet mustahil memindai atau menyerang database secara langsung.
2. **Koordinasi Booting Tanpa Balapan (*Zero Boot Race Conditions*)**: Nginx menunggu API berstatus sehat. API menunggu PostgreSQL dan Redis lulus uji `pg_isready` dan `redis-cli ping`. Seluruh klaster menyala secara tertib dan otomatis.
3. **Pengerasan Keamanan Maksimal (*Maximum Hardening*)**: Servis API dan Worker berjalan sebagai pengguna non-root biasa, menggunakan sistem file *read-only* dengan alokasi *tmpfs* aman, mencabut seluruh hak kernel Linux (`cap_drop: ALL`), dan memblokir eskalasi hak istimewa (`no-new-privileges: true`).""",
            'explanationEn': """### Capstone Production Microservice Cluster Architecture
This capstone implements an enterprise-grade containerized microservice topology:
1. **Air-Gapped Network Segmentation**: Strictly the Nginx `cluster_ingress` gateway exposes ports 80/443 to the public internet (`public_edge_net`). The PostgreSQL database, Redis cluster, and Go Worker reside exclusively inside `private_cluster_net` declared with `internal: true`. Hostile external actors cannot reach the persistence layer.
2. **Zero Boot Race Conditions**: Nginx defers initialization until API health checks pass. The API waits for PostgreSQL and Redis readiness probes (`pg_isready` and `redis-cli ping`). The entire cluster initializes reliably without uncoordinated boot crashes.
3. **Maximum Runtime Hardening**: API and Worker containers execute under unprivileged non-root UIDs, enforce immutable *read-only* root filesystems with restricted *tmpfs* scratchpads, strip all kernel capabilities (`cap_drop: ALL`), and block privilege escalation (`no-new-privileges: true`).""",
            'beginnerId': """Selamat! Anda telah membangun istana teknologi modern berstandar perbankan internasional. 

Pintu gerbang istana (Nginx Ingress) menyambut pengunjung dengan ramah. Di dalam istana, para juru masak dan kurir (API dan Go Worker) bekerja cepat tanpa saling berebut bahan karena ada jadwal yang tertib (Healthcheck). Dan yang paling hebat: brankas harta karun emas Anda (PostgreSQL dan Redis) tersimpan di ruang bawah tanah tersembunyi tanpa pintu keluar ke dunia luar (Internal Network), dijaga oleh satpam yang tidak bisa disuap!""",
            'beginnerEn': """Congratulations! You have constructed an enterprise-grade technology fortress meeting banking security standards.

The palace gatehouse (Nginx Ingress) greets public visitors cleanly. Inside, the chefs and couriers (API and Go Worker) coordinate seamlessly without collision thanks to orchestrated timing (Healthchecks). And most impressively: your gold vault (PostgreSQL and Redis) is concealed in an underground air-gapped cellar with zero egress to the outside world, guarded by unassailable security!""",
            'experimentsId': [
                'Nyalakan seluruh stack dengan docker compose up -d dan gunakan docker compose ps untuk melihat seluruh servis berstatus healthy',
                'Coba hubungi database postgres langsung dari komputer host Anda dan buktikan bahwa koneksi ditolak karena port tidak di-expose',
                'Lakukan docker exec ke dalam kontainer API dan coba buat file di direktori root untuk membuktikan aturan read-only bekerja',
                'Jalankan docker compose down -v untuk membersihkan seluruh stack beserta volumenya saat pengujian selesai'
            ],
            'experimentsEn': [
                'Launch the complete stack via docker compose up -d and verify with docker compose ps that all services achieve healthy states',
                'Attempt connecting to postgres directly from your local host machine to confirm port isolation',
                'Execute a shell inside the API container and attempt creating a file at the root filesystem to verify read-only enforcement',
                'Run docker compose down -v to cleanly teardown the entire cluster and volume allocations when finished'
            ],
            'challengeId': 'Tambahkan servis `monitoring` menggunakan Prometheus dan Grafana ke dalam `compose.yaml`: pantau metrik utilisasi CPU dan RAM dari seluruh kontainer di dalam cluster secara real-time.',
            'challengeEn': 'Integrate a `monitoring` observability service using Prometheus and Grafana into `compose.yaml`: visualize real-time CPU and RAM utilization metrics across all cluster containers.',
            'summaryId': 'Selamat! Anda telah menguasai seluruh kurikulum Docker: arsitektur engine & kernel Linux, optimasi Dockerfile & layer cache, Multi-Stage Builds hemat ukuran, volume & bridge networks, orkestrasi Docker Compose v2, healthchecks tahan banting, pengerasan keamanan non-root & capabilities, dan Capstone Microservice Cluster.',
            'summaryEn': 'Congratulations! You have mastered the comprehensive Docker curriculum: engine architecture & Linux primitives, Dockerfile & layer cache optimization, lightweight Multi-Stage Builds, storage volumes & bridge networks, Docker Compose v2 orchestration, resilient healthchecks, non-root & capability hardening, and a Production Microservice Cluster Capstone.'
        }
    ]

    return {
        'slug': 'docker',
        'track_name': 'Docker',
        'levels': levels,
        'modules': modules
    }
