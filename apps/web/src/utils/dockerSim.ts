// ============================================================================
// dockerSim.ts — Browser Docker CLI simulator for the Tryngo Docker track.
// Simulates a realistic subset of the Docker CLI (engine state lives in memory:
// images, containers, networks, volumes, compose projects). No Docker needed.
// ============================================================================

interface SimImage {
  id: string; // short sha256
  repo: string;
  tag: string;
  sizeMB: number;
  layers: number;
  created: string;
  base: string; // final FROM for history/description
}

interface SimContainer {
  id: string;
  name: string;
  image: string; // repo:tag
  command: string;
  status: 'running' | 'exited' | 'created' | 'paused';
  exitCode: number;
  createdLabel: string;
  ports: { host: string; container: string }[];
  env: Record<string, string>;
  network: string; // network name
  volume: string | null; // named volume mounted at /data
  foregroundOutput: string[]; // logs produced by the process
  process: string; // friendly process name e.g. "nginx", "node", "postgres"
}

interface SimNetwork {
  name: string;
  driver: string;
  scope: string;
  subnet: string;
  dns: boolean; // custom bridge has embedded DNS
}

interface SimVolume {
  name: string;
  driver: string;
  files: string[];
}

interface ComposeProject {
  name: string;
  services: { name: string; image: string; ports?: string; command?: string; env?: Record<string, string>; healthcheck?: boolean; volumes?: string; scale?: number }[];
  composeYaml: string;
  projectDir: string; // dockerfile dir for build context
}

interface BuildProject {
  dir: string;
  dockerfile: string; // shown by `docker build` as steps
  base: string;
  finalTag: string;
  sizeMB: number;
  layers: number;
}

// --- helpers ----------------------------------------------------------------

let seq = 0;
const hex = (n = 12) => {
  let s = '';
  const chars = '0123456789abcdef';
  for (let i = 0; i < n; i++) s += chars[(seq++ + i * 7) % 16];
  return s;
};

const pad = (s: string, n: number) => (s + ' '.repeat(n)).slice(0, n);
const nowLabel = () => 'just now';

const formatTable = (headers: string[], rows: string[][]): string => {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => (r[i] || '').length)));
  const line = (cells: string[]) => cells.map((c, i) => pad(c, widths[i])).join('   ').trimEnd();
  return [line(headers), ...rows.map(line)].join('\n');
};

const listImages = (filter?: string): string => {
  const rows = images
    .filter((i) => !filter || i.repo.includes(filter.replace(/^library\//, '')))
    .map((i) => [
      i.repo + ':' + i.tag,
      i.id,
      `${i.created} ago`,
      `${i.sizeMB}MB`,
    ]);
  return formatTable(['REPOSITORY', 'TAG', 'IMAGE ID', 'CREATED', 'SIZE'], rows.map((r) => [r[0].split(':')[0], r[0].split(':')[1] || 'latest', r[1], r[2], r[3]]));
};

const findImage = (ref: string): SimImage | undefined => {
  const [repo, tag] = ref.includes(':') ? ref.split(':') : [ref, 'latest'];
  return images.find((i) => i.repo === repo && i.tag === tag);
};

const findContainer = (ref: string): SimContainer | undefined =>
  containers.find((c) => c.name === ref || c.id.startsWith(ref));

// --- seed data ----------------------------------------------------------------

let images: SimImage[] = [];
let containers: SimContainer[] = [];
let networks: SimNetwork[] = [];
let volumes: SimVolume[] = [];
let loggedIn = false;
let currentProject: ComposeProject | null = null;

const SEED_IMAGES: Omit<SimImage, 'id'>[] = [
  { repo: 'nginx', tag: 'latest', sizeMB: 187, layers: 8, created: '2 weeks', base: 'debian:bookworm-slim' },
  { repo: 'nginx', tag: 'alpine', sizeMB: 45, layers: 7, created: '2 weeks', base: 'alpine:3.21' },
  { repo: 'node', tag: '20-alpine', sizeMB: 129, layers: 11, created: '3 weeks', base: 'alpine:3.21' },
  { repo: 'node', tag: '20-slim', sizeMB: 230, layers: 10, created: '3 weeks', base: 'debian:bookworm-slim' },
  { repo: 'python', tag: '3.12-slim', sizeMB: 145, layers: 9, created: '1 month', base: 'debian:bookworm-slim' },
  { repo: 'redis', tag: '7-alpine', sizeMB: 43, layers: 8, created: '1 month', base: 'alpine:3.21' },
  { repo: 'postgres', tag: '16-alpine', sizeMB: 240, layers: 12, created: '1 month', base: 'alpine:3.21' },
  { repo: 'ubuntu', tag: '24.04', sizeMB: 78, layers: 6, created: '2 months', base: 'scratch' },
  { repo: 'alpine', tag: '3.21', sizeMB: 8, layers: 4, created: '2 months', base: 'scratch' },
  { repo: 'golang', tag: '1.23-alpine', sizeMB: 280, layers: 13, created: '2 months', base: 'alpine:3.21' },
  { repo: 'hello-world', tag: 'latest', sizeMB: 9, layers: 3, created: '3 months', base: 'scratch' },
  { repo: 'busybox', tag: 'latest', sizeMB: 4, layers: 3, created: '3 months', base: 'scratch' },
];

const SEED_CONTAINERS: Omit<SimContainer, 'id'>[] = [
  {
    name: 'nginx-demo', image: 'nginx:alpine', command: '"nginx -g daemon off;"',
    status: 'running', exitCode: 0, createdLabel: '10 minutes',
    ports: [{ host: '8080', container: '80' }], env: { NGINX_VERSION: '1.27.0' },
    network: 'bridge', volume: null,
    foregroundOutput: ['/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration',
      '/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/',
      '10.0.0.2 - - [02/Aug/2026:09:15:22 +0000] "GET / HTTP/1.1" 200 612'],
    process: 'nginx',
  },
  {
    name: 'old-blog', image: 'python:3.12-slim', command: '"python app.py"',
    status: 'exited', exitCode: 0, createdLabel: '2 hours',
    ports: [], env: { PYTHONUNBUFFERED: '1' },
    network: 'bridge', volume: null, foregroundOutput: [' * Running on http://0.0.0.0:5000', '127.0.0.1 - - [02/Aug/2026:07:01:11 +0000] "GET / HTTP/1.1" 200 -'],
    process: 'python',
  },
];

const SEED_NETWORKS: SimNetwork[] = [
  { name: 'bridge', driver: 'bridge', scope: 'local', subnet: '172.17.0.0/16', dns: false },
  { name: 'host', driver: 'host', scope: 'local', subnet: 'host', dns: false },
  { name: 'none', driver: 'null', scope: 'local', subnet: 'null', dns: false },
];

const SEED_VOLUMES: SimVolume[] = [
  { name: 'pgdata', driver: 'local', files: ['PG_VERSION', 'base/', 'global/', 'pg_wal/', 'postgresql.conf'] },
];

const VOTE_PROJECT: ComposeProject = {
  name: 'vote',
  projectDir: 'vote',
  services: [
    { name: 'vote', image: 'dockersamples/examplevotingapp_vote:before', ports: '5000:80', env: { NODE_ENV: 'production' } },
    { name: 'redis', image: 'redis:7-alpine', env: { REDIS_PORT: '6379' } },
    { name: 'worker', image: 'dockersamples/examplevotingapp_worker:before' },
    { name: 'db', image: 'postgres:16-alpine', env: { POSTGRES_DB: 'votes', POSTGRES_USER: 'postgres' }, volumes: 'db-data:/var/lib/postgresql/data', healthcheck: true },
    { name: 'result', image: 'dockersamples/examplevotingapp_result:before', ports: '5001:80' },
  ],
  composeYaml: `services:
  vote:
    image: dockersamples/examplevotingapp_vote:before
    ports:
      - "5000:80"
    depends_on:
      - redis
  redis:
    image: redis:7-alpine
  worker:
    image: dockersamples/examplevotingapp_worker:before
  db:
    image: postgres:16-alpine
    volumes:
      - db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5
  result:
    image: dockersamples/examplevotingapp_result:before
    ports:
      - "5001:80"
volumes:
  db-data:`,
};

const SHOP_PROJECT: ComposeProject = {
  name: 'shop',
  projectDir: 'shop',
  services: [
    { name: 'web', image: 'tryngo/shop-web:1.0', ports: '8080:3000', env: { NODE_ENV: 'production' } },
    { name: 'api', image: 'tryngo/shop-api:1.0', env: { DB_URL: 'postgres://shop:shop@db:5432/shop', REDIS_URL: 'redis://cache:6379' }, healthcheck: true },
    { name: 'cache', image: 'redis:7-alpine' },
    { name: 'db', image: 'postgres:16-alpine', env: { POSTGRES_DB: 'shop', POSTGRES_USER: 'shop', POSTGRES_PASSWORD: 'shop' }, volumes: 'shop-db:/var/lib/postgresql/data', healthcheck: true },
  ],
  composeYaml: `services:
  web:
    build: ./web
    ports:
      - "8080:3000"
    depends_on:
      api:
        condition: service_healthy
  api:
    build: ./api
    environment:
      DB_URL: postgres://shop:shop@db:5432/shop
      REDIS_URL: redis://cache:6379
    depends_on:
      db:
        condition: service_healthy
      cache:
        condition: service_started
    healthcheck:
      test: ["CMD", "wget", "-qO-", "http://localhost:3000/healthz"]
      interval: 30s
      retries: 3
  cache:
    image: redis:7-alpine
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: shop
      POSTGRES_USER: shop
      POSTGRES_PASSWORD: shop
    volumes:
      - shop-db:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U shop"]
      interval: 10s
      retries: 5
volumes:
  shop-db:`,
};

const BUILD_PROJECTS: Record<string, BuildProject> = {
  web: {
    dir: 'web',
    dockerfile: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,
    base: 'node:20-alpine', finalTag: 'tryngo/shop-web:1.0', sizeMB: 48, layers: 9,
  },
  api: {
    dir: 'api',
    dockerfile: `FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "server.js"]`,
    base: 'node:20-alpine', finalTag: 'tryngo/shop-api:1.0', sizeMB: 135, layers: 11,
  },
  goproj: {
    dir: 'goproj',
    dockerfile: `FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server .

FROM scratch
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/server /server
ENTRYPOINT ["/server"]`,
    base: 'golang:1.23-alpine', finalTag: 'tryngo/server:1.0', sizeMB: 12, layers: 4,
  },
  broken: {
    dir: 'broken',
    dockerfile: `FROM ubuntu:24.04
RUN apt-get install -y curl`,
    base: 'ubuntu:24.04', finalTag: 'tryngo/broken:latest', sizeMB: 0, layers: 0,
  },
  fixed: {
    dir: 'fixed',
    dockerfile: `FROM ubuntu:24.04
RUN apt-get update && apt-get install -y --no-install-recommends curl && rm -rf /var/lib/apt/lists/*`,
    base: 'ubuntu:24.04', finalTag: 'tryngo/fixed:latest', sizeMB: 92, layers: 2,
  },
  single: {
    dir: 'single',
    dockerfile: `FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm run build
EXPOSE 80
CMD ["node", "server.js"]`,
    base: 'node:20-alpine', finalTag: 'tryngo/single:1.0', sizeMB: 131, layers: 6,
  },
};

// --- reset ---------------------------------------------------------------------

export function resetDocker(): void {
  seq = 0;
  images = SEED_IMAGES.map((i) => ({ ...i, id: hex(12) }));
  containers = SEED_CONTAINERS.map((c) => ({ ...c, id: hex(12) }));
  networks = SEED_NETWORKS.map((n) => ({ ...n }));
  volumes = SEED_VOLUMES.map((v) => ({ ...v, files: [...v.files] }));
  loggedIn = false;
  currentProject = null;
}

// --- mini shell used by `docker exec` -------------------------------------------

const execShell = (c: SimContainer, cmdLine: string): string => {
  const [cmd, ...args] = cmdLine.trim().split(/\s+/);
  switch (cmd) {
    case 'echo':
      return args.join(' ');
    case 'whoami':
      return 'root';
    case 'env':
      return Object.entries(c.env).map(([k, v]) => `${k}=${v}`).join('\n');
    case 'pwd':
      return '/';
    case 'ls':
      return 'app.js  Dockerfile  node_modules  package.json  public/  src/';
    case 'cat':
      return args.length
        ? args[0] === '/etc/os-release'
          ? `NAME="Alpine Linux"\nID=alpine\nVERSION_ID=3.21.0`
          : args[0] === '/etc/hostname'
            ? c.name
            : args[0].endsWith('PG_VERSION')
              ? `16.3`
              : args[0].startsWith('/data/')
                ? `\n# isi ${args[0]} (disimpan di volume, bukan di container)\n`
                : `(file tidak ditemukan: ${args[0]})`
        : '(isi argumen kosong)';
    case 'ping': {
      const target = args[0];
      if (!target) return 'usage: ping <host>';
      if (target === 'db' || target === 'redis' || target === 'cache' || target === 'api' || target === 'web' || target === 'result') {
        const net = networks.find((n) => n.name === c.network);
        if (net && net.dns) {
          return `PING ${target} (172.18.0.${4 + (target.length % 4)}): 56 data bytes\n64 bytes from 172.18.0.${4 + (target.length % 4)}: icmp_seq=0 ttl=64 time=0.104 ms\n--- ${target} ping statistics ---\n1 packets transmitted, 1 packets received, 0% packet loss`;
        }
        return `ping: bad address '${target}'  # ${c.network} (default bridge) TIDAK punya DNS internal`;
      }
      return `ping: bad address '${target}'`;
    }
    default:
      return `sh: ${cmd}: not found`;
  }
};

// --- command dispatch -------------------------------------------------------------

export function runDockerCommand(input: string): string {
  const line = input.trim().replace(/^\$?\s*/, '');
  if (!line) return '';
  const tokens = line.split(/\s+/);
  if (tokens[0] !== 'docker') return `bash: ${tokens[0]}: command not found`;
  const [sub, ...rest] = tokens.slice(1);
  if (!sub) return 'docker: "docker help" untuk daftar perintah.';

  switch (sub) {
    case 'version': {
      return `Client:
 Version:           27.3.1
 API version:       1.47
 Go version:        go1.23.2
 Git commit:        41e3ba8

Server:
 Engine:
  Version:          27.3.1
  API version:      1.47 (minimum version 1.24)
  Go version:       go1.23.2
  OS/Arch:          linux/amd64 (Docker Desktop: Linux VM di belakang layar)`;
    }

    case 'info': {
      return `Client:
 Context:    desktop-linux
 Debug Mode: false

Server:
 Containers: ${containers.length}
  Running: ${containers.filter((c) => c.status === 'running').length}
  Paused: ${containers.filter((c) => c.status === 'paused').length}
  Stopped: ${containers.filter((c) => c.status === 'exited').length}
 Images: ${images.length}
 Server Version: 27.3.1
 Storage Driver: overlay2
 Logging Driver: json-file
 Cgroup Driver: cgroupfs
 Plugins:
  Volume: local
  Network: bridge host ipvlan macvlan null overlay
 Swarm: inactive
 Runtimes: io.containerd.runc.v2 runc
 Default Runtime: runc
 Kernel Version: 6.10.14-linuxkit (Linux VM, bukan mesin host!)
 Operating System: Docker Desktop
 OSType: linux
 Architecture: x86_64
 CPUs: 6
 Total Memory: 15.61GiB
 Name: docker-desktop
 ID: ${hex(64)}`;
    }

    case 'help':
    case '--help': {
      return `Usage:  docker [OPTIONS] COMMAND

Container:
  run        Jalankan perintah di container baru
  ps         Daftar container
  start      Mulai satu atau lebih container yang berhenti
  stop       Hentikan satu atau lebih container yang berjalan
  restart    Restart satu atau lebih container
  kill       Kill satu atau lebih container secara paksa
  rm         Hapus satu atau lebih container
  logs       Ambil log dari container
  exec       Jalankan perintah di container yang berjalan
  inspect    Tampilkan detail container/image
  rename     Ganti nama container
  pause      Jeda semua proses di dalam container
  unpause    Lanjutkan proses di dalam container

Image:
  images     Daftar image
  pull       Ambil image dari registry
  push       Upload image ke registry
  build      Bangun image dari Dockerfile
  rmi        Hapus satu atau lebih image
  tag        Beri tag baru pada image
  history    Tampilkan riwayat layer image
  commit     Buat image baru dari perubahan container
  search     Cari image di Docker Hub

Network:
  network    Kelola network (ls, create, rm, connect, inspect)

Volume:
  volume     Kelola volume (ls, create, rm)

Compose:
  compose    Multi-container apps (up, down, ps, logs, config)

System:
  login/logout   Masuk/keluar Docker Hub
  version    Versi Docker
  info       Info sistem
  system     Kelola sistem (prune)

Ketik 'docker <COMMAND> --help' untuk detail perintah.`;
    }

    case 'clear':
      return '';

    case 'search': {
      const term = rest.join(' ').replace(/^--[a-z]+\s*/, '');
      const results: [string, string, string, string, string][] = [
        [term || 'nginx', 'Web server / reverse proxy resmi', '21000', '[OK]', ''],
        [term ? `${term}-alpine` : 'alpine', 'Versi alpine berukuran kecil', '0', '', ''],
      ];
      return formatTable(['NAME', 'DESCRIPTION', 'STARS', 'OFFICIAL', 'AUTOMATED'],
        results.map((r) => [r[0], r[1], r[2], r[3], r[4]]));
    }

    case 'login':
      loggedIn = true;
      return `Login Succeeded (${rest[0] || 'pengguna'} — simulasi)`;

    case 'logout':
      loggedIn = false;
      return 'Removing login credentials for https://index.docker.io/v1/';

    case 'pull': {
      const ref = rest.filter((t) => !t.startsWith('-')).join('').replace(/^library\//, '');
      if (!ref) return 'docker pull: "docker pull NAME[:TAG]" membutuhkan argumen image.';
      if (findImage(ref)) return `Using default tag: latest\n${ref.split(':')[0]}:${ref.split(':')[1] || 'latest'} already exists\nStatus: Image is up to date for ${ref}`;
      const repo = ref.split(':')[0];
      const tag = ref.split(':')[1] || 'latest';
      const fake: Omit<SimImage, 'id'> = { repo, tag, sizeMB: 20 + ((seq % 5) * 15), layers: 4 + (seq % 6), created: '1 hour', base: 'alpine:3.21' };
      const id = hex(12);
      images.push({ ...fake, id });
      return `Using default tag: ${tag}\n${tag}: Pulling from library/${repo}\n${[1, 2, 3, 4].map((n) => `Digest: sha256:${hex(64)}`).join('\n')}\nStatus: Downloaded newer image for ${repo}:${tag}\n${id}: Pull complete`;
    }

    case 'images': {
      const filter = rest.find((t) => !t.startsWith('-'));
      return listImages(filter);
    }

    case 'history': {
      const ref = rest[0];
      const img = findImage(ref || 'nginx:alpine');
      if (!img) return `Error: No such image: ${ref}`;
      const rows = Array.from({ length: img.layers }, (_, i) => {
        const layerCmd = i === img.layers - 1 ? `FROM ${img.base}` : `RUN (layer ke-${img.layers - i})`;
        return [
          `${img.id.slice(0, 12)}`,
          `sha256:${hex(64)}`,
          `${img.layers - i}`,
          `${Math.max(1, Math.round(img.sizeMB / img.layers))}MB`,
          layerCmd,
        ];
      });
      return formatTable(['IMAGE', 'CREATED BY', 'CREATED', 'SIZE', 'COMMENT'], rows);
    }

    case 'run': {
      // parse flags
      let detach = false, interactive = false, tty = false, rm = false, name = '', network = 'bridge';
      const ports: { host: string; container: string }[] = [];
      const env: Record<string, string> = {};
      let volume = null as string | null;
      let imageRef = '';
      let cmdArgs: string[] = [];
      for (let i = 0; i < rest.length; i++) {
        const t = rest[i];
        if (t === '-d') detach = true;
        else if (t === '-it' || t === '-i' || t === '-t') { interactive = true; tty = true; }
        else if (t === '--rm') rm = true;
        else if (t === '--name') name = rest[++i] || '';
        else if (t === '-p') {
          const spec = rest[++i];
          if (!spec) return 'docker run: "-p" membutuhkan spesifikasi port (mis. 8080:80).';
          const parts = spec.split(':');
          if (parts.length === 1) ports.push({ host: parts[0], container: parts[0] });
          else if (parts.length >= 2) ports.push({ host: parts[0], container: parts[parts.length - 1] });
        } else if (t === '-e') {
          const spec = rest[++i];
          if (!spec) return 'docker run: "-e" membutuhkan spesifikasi env (mis. FOO=bar).';
          const idx = spec.indexOf('=');
          const k = idx === -1 ? spec : spec.slice(0, idx);
          const v = idx === -1 ? '' : spec.slice(idx + 1);
          env[k] = v;
        } else if (t === '-v' || t === '--volume') {
          const spec = rest[++i];
          if (!spec) return 'docker run: "-v" membutuhkan spesifikasi volume (mis. /data atau volume:/data).';
          volume = spec.split(':')[0];
        } else if (t === '--network') network = rest[++i] || 'bridge';
        else if (t.startsWith('-')) { /* flag lain diabaikan */ }
        else if (!imageRef) imageRef = t;
        else cmdArgs.push(t);
      }
      if (!imageRef) return 'docker run: membutuhkan minimal 1 argumen (image).\n\nSee \'docker run --help\'.';
      const img = findImage(imageRef) || (() => { const repo = imageRef.split(':')[0]; const tag = imageRef.split(':')[1] || 'latest'; images.push({ repo, tag, id: hex(12), sizeMB: 25, layers: 5, created: '1 hour', base: 'alpine:3.21' }); return images[images.length - 1]; })();

      const cname = name || `${img.repo.replace(/[^a-z0-9]/g, '')}-${hex(6)}`;
      const process = img.repo === 'nginx' ? 'nginx' : img.repo === 'redis' ? 'redis-server' : img.repo === 'postgres' ? 'postgres' : img.repo === 'node' ? 'node' : img.repo === 'python' ? 'python' : img.repo === 'ubuntu' ? 'bash' : img.repo === 'alpine' ? 'sh' : img.repo === 'hello-world' ? '/hello' : 'app';

      if (findContainer(cname)) return `docker: Error response from daemon: Conflict. The container name "/${cname}" is already in use by container "${hex(12)}". You have to remove (or rename) that container to be able to reuse that name.`;

      const foreground = img.repo === 'hello-world' ? ['Hello from Docker!', 'This message shows that your installation appears to be working correctly.', '', 'To try something more ambitious, you can run an Ubuntu container with:', '  $ docker run -it ubuntu bash'] :
        cmdArgs.length ? [`${cmdArgs.join(' ')} (proses utama: ${process})`] :
        [`${process} berjalan di ${img.repo}:${img.tag} (PID ${1000 + (containers.length * 37) % 9000}, simulasi)`];

      const c: SimContainer = {
        id: hex(12), name: cname, image: `${img.repo}:${img.tag}`,
        command: cmdArgs.length ? JSON.stringify(cmdArgs.join(' ')) : process === 'nginx' ? '"nginx -g daemon off;"' : process === 'redis-server' ? '"redis-server"' : process === 'postgres' ? '"postgres" -D /var/lib/postgresql/data' : `"${process}"`,
        status: detach ? 'running' : 'exited',
        exitCode: 0, createdLabel: nowLabel(),
        ports, env, network, volume,
        foregroundOutput: foreground, process,
      };
      containers.unshift(c);

      if (detach) {
        return `${c.id}\n`;
      }
      if (rm) {
        containers = containers.filter((x) => x !== c);
        return foreground.join('\n') + `\n# (--rm: container otomatis dihapus saat proses berhenti)`;
      }
      return foreground.join('\n');
    }

    case 'ps': {
      const all = rest.includes('-a');
      const rows = containers
        .filter((c) => all || c.status === 'running')
        .map((c) => [
          c.id,
          c.image,
          c.command,
          c.createdLabel,
          c.status === 'running' ? 'Up ' + c.createdLabel : c.status === 'paused' ? 'Up ' + c.createdLabel + ' (Paused)' : c.status === 'created' ? 'Created' : `Exited (${c.exitCode}) ${c.createdLabel} ago`,
          c.ports.length ? c.ports.map((p) => `0.0.0.0:${p.host}->${p.container}/tcp`).join(', ') : '',
          c.name,
        ]);
      return formatTable(['CONTAINER ID', 'IMAGE', 'COMMAND', 'CREATED', 'STATUS', 'PORTS', 'NAMES'], rows);
    }

    case 'stop': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        if (c.status !== 'running') { out.push(`${c.name}`); continue; }
        c.status = 'exited'; c.exitCode = 0; c.createdLabel = '2 minutes';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'start': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        c.status = 'running'; c.createdLabel = 'seconds';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'restart': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        c.status = 'running'; c.createdLabel = 'seconds';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'kill': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        c.status = 'exited'; c.exitCode = 137; c.createdLabel = '3 seconds';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'rm': {
      const force = rest.includes('-f');
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        if (c.status === 'running' && !force) { out.push(`Error response from daemon: You cannot remove a running container ${c.id}. Stop the container before attempting removal or force remove`); continue; }
        containers = containers.filter((x) => x !== c);
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'rmi': {
      const force = rest.includes('-f');
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const img = findImage(ref);
        if (!img) { out.push(`Error: No such image: ${ref}`); continue; }
        const inUse = containers.find((c) => c.image === `${img.repo}:${img.tag}` && c.status !== 'exited');
        if (inUse && !force) {
          out.push(`Error response from daemon: conflict: unable to remove repository reference "${img.repo}:${img.tag}" (must force) - container ${inUse.id} is using its referenced image`);
          continue;
        }
        images = images.filter((i) => i !== img);
        out.push(`Untagged: ${img.repo}:${img.tag}\nDeleted: sha256:${hex(64)}`);
      }
      return out.join('\n');
    }

    case 'logs': {
      const ref = rest[0];
      const c = findContainer(ref);
      if (!c) return `Error: No such container: ${ref}`;
      return c.foregroundOutput.join('\n') + (c.volume ? `\n[volume] data di /data dipasang dari volume: ${c.volume} (tetap hidup setelah container dihapus)` : '');
    }

    case 'exec': {
      const idx = rest.findIndex((t) => !t.startsWith('-'));
      const ref = rest[idx];
      const cmdLine = rest.slice(idx + 1).join(' ');
      const c = findContainer(ref);
      if (!c) return `Error: No such container: ${ref}`;
      if (c.status !== 'running') return `Error response from daemon: Container ${c.id} is not running`;
      if (!cmdLine) return `docker exec: "docker exec [OPTIONS] CONTAINER COMMAND" membutuhkan perintah.`;
      return execShell(c, cmdLine);
    }

    case 'inspect': {
      const ref = rest[0];
      const c = findContainer(ref);
      const img = !c ? findImage(ref) : undefined;
      if (!c && !img) return `Error: No such object: ${ref}`;
      if (c) {
        return JSON.stringify({
          Id: 'sha256:' + c.id + hex(52),
          Name: '/' + c.name,
          State: { Status: c.status, Running: c.status === 'running', ExitCode: c.exitCode },
          Image: c.image,
          Config: { Env: Object.entries(c.env).map(([k, v]) => `${k}=${v}`), Cmd: [c.process] },
          NetworkSettings: { Networks: { [c.network]: { IPAddress: c.network === 'bridge' ? '172.17.0.' + (2 + (containers.indexOf(c) % 10)) : '172.18.0.' + (3 + (containers.indexOf(c) % 10)) } } },
          Mounts: c.volume ? [{ Type: 'volume', Name: c.volume, Destination: '/data' }] : [],
          Ports: c.ports.map((p) => ({ ContainerPort: Number(p.container), HostPort: Number(p.host), HostIp: '0.0.0.0' })),
        }, null, 2);
      }
      return JSON.stringify({
        Id: 'sha256:' + img!.id + hex(52),
        RepoTags: [`${img!.repo}:${img!.tag}`],
        Size: img!.sizeMB * 1024 * 1024,
        RootFS: { Type: 'layers', Layers: Array.from({ length: img!.layers }, () => 'sha256:' + hex(64)) },
      }, null, 2);
    }

    case 'tag': {
      const src = rest[0];
      const dst = rest[1];
      const img = findImage(src);
      if (!img) return `Error: No such image: ${src}`;
      const [repo, tag] = dst.split(':');
      images.push({ ...img, id: hex(12), repo, tag: tag || 'latest' });
      return '';
    }

    case 'commit': {
      const ref = rest.find((t) => !t.startsWith('-'));
      const c = findContainer(ref);
      if (!c) return `Error: No such container: ${ref}`;
      const newImg = { repo: 'patched', tag: 'latest', id: hex(12), sizeMB: 30, layers: c.image.includes('alpine') ? 5 : 9, created: 'just now', base: 'custom' };
      images.push(newImg);
      return `sha256:${hex(64)}`;
    }

    case 'rename': {
      const old = rest[0];
      const fresh = rest[1];
      const c = findContainer(old);
      if (!c) return `Error: No such container: ${old}`;
      c.name = fresh;
      return '';
    }

    case 'pause': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        c.status = 'paused';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'unpause': {
      const out: string[] = [];
      for (const ref of rest.filter((t) => !t.startsWith('-'))) {
        const c = findContainer(ref);
        if (!c) { out.push(`Error response from daemon: No such container: ${ref}`); continue; }
        c.status = 'running';
        out.push(c.name);
      }
      return out.join('\n');
    }

    case 'network': {
      const action = rest[0];
      const args = rest.slice(1).filter((t) => !t.startsWith('-'));
      if (action === 'ls') {
        const rows = networks.map((n) => [n.name, n.driver, n.scope]);
        return formatTable(['NETWORK ID', 'NAME', 'DRIVER', 'SCOPE'], rows.map((r, i) => [hex(12), r[0], r[1], r[2]]));
      }
      if (action === 'create') {
        const nname = args[0];
        if (!nname) return 'docker network create: nama network wajib diisi.';
        if (networks.find((n) => n.name === nname)) return `Error response from daemon: network with name ${nname} already exists`;
        networks.push({ name: nname, driver: 'bridge', scope: 'local', subnet: `172.18.0.0/16`, dns: true });
        return `${hex(12)}`;
      }
      if (action === 'rm') {
        const out: string[] = [];
        for (const nname of args) {
          const n = networks.find((x) => x.name === nname);
          if (!n) { out.push(`Error response from daemon: network ${nname} not found`); continue; }
          if (nname === 'bridge' || nname === 'host' || nname === 'none') { out.push(`Error response from daemon: operation not permitted on default networks`); continue; }
          networks = networks.filter((x) => x !== n);
          out.push(nname);
        }
        return out.join('\n');
      }
      if (action === 'connect') {
        const nname = args[0];
        const ref = args[1];
        const c = findContainer(ref);
        const n = networks.find((x) => x.name === nname);
        if (!n) return `Error response from daemon: network ${nname} not found`;
        if (!c) return `Error: No such container: ${ref}`;
        c.network = nname;
        return '';
      }
      if (action === 'inspect') {
        const n = networks.find((x) => x.name === args[0]);
        if (!n) return `Error: No such network: ${args[0]}`;
        return JSON.stringify({
          Name: n.name, Driver: n.driver, Scope: n.scope,
          Internal: false, EnableIPv6: false,
          IPAM: { Driver: 'default', Config: [{ Subnet: n.subnet }] },
          Options: n.dns ? { 'com.docker.network.bridge.enable_icc': 'true' } : {},
          Containers: containers.filter((c) => c.network === n.name).map((c) => ({ Name: c.name, IPv4Address: `172.18.0.${3 + (containers.indexOf(c) % 10)}/16` })),
          DNS: n.dns ? 'built-in DNS: container name → IP (salinan nama layanan)' : 'no built-in DNS on default bridge',
        }, null, 2);
      }
      return 'docker network: sub-perintah yang didukung: ls, create, rm, connect, inspect';
    }

    case 'volume': {
      const action = rest[0];
      const args = rest.slice(1).filter((t) => !t.startsWith('-'));
      if (action === 'ls') {
        const rows = volumes.map((v) => [v.name, v.driver, 'local']);
        return formatTable(['DRIVER', 'VOLUME NAME'], rows.map((r) => [r[1], r[0]]));
      }
      if (action === 'create') {
        const vname = args[0] || `vol-${hex(6)}`;
        if (!volumes.find((v) => v.name === vname)) volumes.push({ name: vname, driver: 'local', files: [] });
        return vname;
      }
      if (action === 'rm') {
        const out: string[] = [];
        for (const vname of args) {
          const v = volumes.find((x) => x.name === vname);
          if (!v) { out.push(`Error: No such volume: ${vname}`); continue; }
          if (containers.some((c) => c.volume === vname)) { out.push(`Error response from daemon: unable to remove volume ${vname}: volume is in use`); continue; }
          volumes = volumes.filter((x) => x !== v);
          out.push(vname);
        }
        return out.join('\n');
      }
      return 'docker volume: sub-perintah yang didukung: ls, create, rm';
    }

    case 'build': {
      const restTokens = [...rest];
      let dir = 'web';
      let tag = 'tryngo/app:latest';
      for (let i = 0; i < restTokens.length; i++) {
        const t = restTokens[i];
        if (t === '-t') { tag = restTokens[++i]; if (!tag) return 'docker build: "-t" membutuhkan nilai tag (mis. tryngo/app:latest).'; }
        else if (t === '--no-cache') { /* abaikan */ }
        else if (!t.startsWith('-')) dir = t;
      }
      const proj = BUILD_PROJECTS[dir];
      if (!proj) return `unable to prepare context: unable to evaluate symlinks in Dockerfile path: lstat /${dir}/Dockerfile: no such file or directory`;
      if (dir === 'broken') {
        return `[+] Building 1.2s (5/6) FINISHED\n => [internal] load build definition from Dockerfile\n => => transferring dockerfile: 62B\n => [1/1] FROM ubuntu:24.04\n => CACHED [2/2] RUN apt-get install -y curl\n => ERROR [2/2] RUN apt-get install -y curl\n------\n > [2/2] RUN apt-get install -y curl:\n0.450 E: Unable to locate package curl\n0.451 E: Package 'curl' has no installation candidate\n------\nDockerfile:2\n--------------------\n   1 |     FROM ubuntu:24.04\n   2 | >>> RUN apt-get install -y curl\n--------------------\nERROR: failed to solve: process "/bin/sh -c apt-get install -y curl" did not complete successfully: exit code: 100\n\n# Build GAGAL di layer 2. Ingat: tiap baris Dockerfile = 1 layer.\n# Fix: jalankan shell di layer terakhir yang sukses (layer 1), lalu coba perintahnya:\n#   docker run -it --entrypoint sh ubuntu:24.04\n#   # apt-get update && apt-get install -y curl`;
      }
      const steps = proj.dockerfile.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#') && !l.startsWith('  '));
      const n = steps.length;
      const stepLines = steps.map((s, i) => ` => [${i + 1}/${n}] ${s}`);
      const tagged = `[+] Building 6.4s (${n + 2}/${n + 2}) FINISHED\n => [internal] load build definition from Dockerfile\n => => transferring dockerfile: ${proj.dockerfile.length}B\n => [internal] load metadata for docker.io/library/${proj.base.split(':')[0]}:${proj.base.split(':')[1] || 'latest'}\n${stepLines.join('\n')}\n => exporting to image\n => => exporting layers\n => => writing image sha256:${hex(64)}\n => => naming to docker.io/${tag}\n\nView build details: docker-desktop://dashboard/build/desktop-linux/desktop-linux/${hex(6)}`;
      const parts = tag.split(':');
      images.push({ repo: parts[0], tag: parts[1] || 'latest', id: hex(12), sizeMB: proj.sizeMB, layers: proj.layers, created: 'just now', base: proj.finalTag });
      return tagged;
    }

    case 'push': {
      const ref = rest[0];
      if (!ref) return 'docker push: argumen image wajib diisi.';
      if (!loggedIn) return `unauthorized: access token expired\n\n# Belum login ke Docker Hub. Jalankan: docker login`;
      const repo = ref.split(':')[0];
      const tag = ref.split(':')[1] || 'latest';
      return `Using default tag: ${tag}\nThe push refers to repository [docker.io/${repo}]\n${Array.from({ length: 3 + (seq % 4) }, () => `sha256:${hex(64)}: Pushed`).join('\n')}\n${tag}: digest: sha256:${hex(64)} size: ${1000 + (seq * 13) % 5000}`;
    }

    case 'compose': {
      const restTokens = [...rest];
      const fIdx = restTokens.indexOf('-f');
      const fileArg = fIdx >= 0 ? restTokens[fIdx + 1] : null;
      const proj = fileArg && fileArg.includes('shop') ? SHOP_PROJECT : fileArg ? VOTE_PROJECT : currentProject || VOTE_PROJECT;
      const isFile = (t: string) => t.endsWith('.yml') || t.endsWith('.yaml');
      const nonFlag = restTokens.filter((t) => !t.startsWith('-') && !isFile(t));
      const action = nonFlag[0] || 'up';
      const args = nonFlag.slice(1);
      if (action === 'config') return proj.composeYaml;
      if (action === 'up') {
        const detached = rest.includes('-d');
        const sIdx = restTokens.indexOf('--scale');
        const scaleVal = sIdx >= 0 ? restTokens[sIdx + 1] : null;
        const scaleName = scaleVal ? scaleVal.split('=')[0] : null;
        const svcScale = scaleVal ? Math.min(Math.max(Number(scaleVal.split('=')[1]) || 1, 1), 20) : 1;
        const out: string[] = [];
        for (const s of proj.services) {
          const replicas = scaleName ? (s.name === scaleName ? svcScale : 1) : 1;
          for (let r = 0; r < replicas; r++) {
            const cname = `${proj.name}-${s.name}-${r + 1}`;
            if (findContainer(cname)) { out.push(`Container ${cname}  Running`); continue; }
            const img = findImage(s.image) || (() => { images.push({ repo: s.image.split(':')[0], tag: s.image.split(':')[1] || 'latest', id: hex(12), sizeMB: 50, layers: 8, created: '1 week', base: 'alpine:3.21' }); return images[images.length - 1]; })();
            const c: SimContainer = {
              id: hex(12), name: cname, image: s.image,
              command: s.command || (s.image.includes('redis') ? '"redis-server"' : s.image.includes('postgres') ? '"postgres"' : s.image.includes('vote') ? '"node index.js"' : s.image.includes('result') ? '"node server.js"' : s.image.includes('worker') ? '"node worker.js"' : '"node server.js"'),
              status: 'running', exitCode: 0, createdLabel: 'seconds',
              ports: s.ports ? [{ host: s.ports.split(':')[0], container: s.ports.split(':')[1] || '80' }] : [],
              env: s.env || {}, network: `${proj.name}_default`, volume: s.volumes ? s.volumes.split(':')[0] : null,
              foregroundOutput: [`${s.name} siap (service name "${s.name}" ter-resolve via DNS internal)`], process: s.name,
            };
            containers.unshift(c);
            out.push(`Container ${cname}  ${s.healthcheck ? 'Healthy' : 'Started'}`);
          }
          if (s.healthcheck) out.push(`Container ${proj.name}-${s.name}-1  Healthy`);
        }
        currentProject = proj;
        const netName = `${proj.name}_default`;
        if (!networks.find((n) => n.name === netName)) networks.push({ name: netName, driver: 'bridge', scope: 'local', subnet: `172.2${proj.name.charCodeAt(0) % 10}.0.0/16`, dns: true });
        for (const s of proj.services) {
          if (s.volumes) {
            const vname = s.volumes.split(':')[0];
            if (!volumes.find((v) => v.name === vname)) volumes.push({ name: vname, driver: 'local', files: [] });
          }
        }
        return out.join('\n') + `\nNetwork ${netName}  Created\n${proj.services.filter((s) => s.volumes).map((s) => `Volume ${s.volumes?.split(':')[0]}  Created`).join('\n')}`;
      }
      if (action === 'ps') {
        const rows = containers
          .filter((c) => c.name.startsWith(`${proj.name}-`))
          .map((c) => [c.name, c.image, c.status === 'running' ? 'Up ' + c.createdLabel : 'Exited', c.ports.map((p) => `0.0.0.0:${p.host}->${p.container}/tcp`).join(',') || '', c.volume ? `${c.volume}:/data` : '']);
        return formatTable(['NAME', 'IMAGE', 'COMMAND', 'SERVICE', 'CREATED', 'STATUS', 'PORTS'], rows.map((r) => [r[0], r[1], cname2cmd(r[0]), r[0].split('-')[1], '2 seconds', r[2], r[3]]));
      }
      if (action === 'logs') {
        const target = args[0];
        const list = containers.filter((c) => c.name.startsWith(`${proj.name}-`) && (!target || c.name.includes(target)));
        if (!list.length) return `Error: No such service: ${target || proj.name}`;
        return list.map((c) => `${c.name}  |  ${c.foregroundOutput[0]}`).join('\n');
      }
      if (action === 'down') {
        const removed = containers.filter((c) => c.name.startsWith(`${proj.name}-`));
        containers = containers.filter((c) => !c.name.startsWith(`${proj.name}-`));
        currentProject = null;
        return (removed.length ? removed.map((c) => `Container ${c.name}  Removed`).join('\n') : '') + `\nNetwork ${proj.name}_default  Removed`;
      }
      if (action === 'up') return '';
      return 'docker compose: sub-perintah yang didukung: up, down, ps, logs, config';
    }

    case 'system': {
      const action = rest[0];
      if (action === 'prune') {
        const force = rest.includes('-f');
        const stopped = containers.filter((c) => c.status === 'exited').length;
        const dangling = images.filter((i) => i.tag === 'latest' && i.created === '1 hour').length;
        if (!force) {
          return 'WARNING! This will remove:\n  - all stopped containers\n  - all networks not used by at least one container\n  - all dangling images\n  - unused build cache\n\nAre you sure you want to continue? [y/N]  (pakai: docker system prune -f)';
        }
        containers = containers.filter((c) => c.status !== 'exited');
        return `Deleted Containers:\n${stopped}\nDeleted Images:\n${dangling}\nDeleted build cache:\n0B\n\nTotal reclaimed space: ${(stopped * 3 + dangling * 20)}MB`;
      }
      return 'docker system: sub-perintah yang didukung: prune';
    }

    case 'swarm': {
      const action = rest[0];
      if (action === 'init') {
        return `Swarm initialized: current node (${hex(12)}) is now a manager.\n\nTo add a worker to this swarm, run the following command:\n\n    docker swarm join --token SWMTKN-1-${hex(24)} 172.18.0.1:2377\n\nTo add a manager, run 'docker swarm join-token manager' and follow the instructions.`;
      }
      if (action === 'leave') return 'Node left the swarm.';
      if (action === 'node' && rest[1] === 'ls') {
        return formatTable(['ID', 'HOSTNAME', 'STATUS', 'AVAILABILITY', 'MANAGER STATUS', 'ENGINE VERSION'],
          [[hex(12), 'docker-desktop', 'Ready', 'Active', 'Leader', '27.3.1']]);
      }
      return 'docker swarm: sub-perintah yang didukung: init, node ls, leave';
    }

    case 'service': {
      const action = rest[0];
      if (action === 'create') {
        let name = '', replicas = 1, publish = '';
        for (let i = 1; i < rest.length; i++) {
          if (rest[i] === '--name') name = rest[++i];
          else if (rest[i] === '--replicas') replicas = Number(rest[++i]);
          else if (rest[i] === '--publish') publish = rest[++i];
        }
        const imgRef = rest[rest.length - 1];
        return `overall progress: ${replicas} out of ${replicas} tasks\n1/1: running   [==================================================>] 100%\nverify: Service converged\n\n# service ${name} (${imgRef}) ter-distribusi ke semua node swarm`;
      }
      if (action === 'ls') {
        return formatTable(['ID', 'NAME', 'MODE', 'REPLICAS', 'IMAGE', 'PORTS'],
          [[hex(12), 'web', 'replicated', '3/3', 'nginx:alpine', '*:8080->80/tcp']]);
      }
      if (action === 'scale') {
        const eq = rest[1] || '';
        const [sname, replicas] = eq.split('=');
        if (!sname || !replicas) return 'docker service scale: format "docker service scale NAME=REPLICAS"';
        return `${sname} scaled to ${replicas}\noverall progress: ${replicas} out of ${replicas} tasks\nverify: Service converged`;
      }
      if (action === 'rm') return `${rest[1] || ''}\n# service dihapus dari swarm`;
      return 'docker service: sub-perintah yang didukung: create, ls, scale, rm';
    }

    default:
      return `docker: '${sub}' is not a docker command.\nSee 'docker --help'`;
  }
}

const cname2cmd = (name: string) => {
  const s = name.split('-')[1] || 'app';
  return s.includes('redis') ? '"redis-server"' : s.includes('postgres') || s === 'db' ? '"postgres"' : '"node server.js"';
};

// initialize
resetDocker();
