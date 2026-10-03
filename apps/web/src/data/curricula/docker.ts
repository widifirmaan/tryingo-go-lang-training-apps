import type { LevelInfo } from '../curriculum';

// Docker curriculum — product-driven research-backed structure
export const dockerCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Fondasi Kontainerisasi & Optimasi Image',
    nameEn: 'Containerization Foundations & Image Optimization',
    descId: 'Arsitektur Docker Engine (Namespaces & cgroups), Dockerfile modern, Multi-Stage Builds hemat ukuran, manajemen volume, dan jaringan bridge.',
    descEn: 'Docker Engine architecture (Namespaces & cgroups), modern Dockerfiles, lightweight Multi-Stage Builds, volume persistence, and bridge networks.',
    weeks: [
      { week: 1, topicId: 'arsitektur-docker-engine-dan-cli-operasional', titleId: 'Arsitektur Docker Engine, Linux Primitives & CLI Dasar', titleEn: 'Docker Engine Architecture, Linux Primitives & Core CLI' },
      { week: 2, topicId: 'anatomi-dockerfile-dan-layer-caching', titleId: 'Anatomi Dockerfile & Strategi Layer Caching', titleEn: 'Dockerfile Anatomy & Layer Caching Strategies' },
      { week: 3, topicId: 'multi-stage-builds-dan-keamanan-distroless', titleId: 'Multi-Stage Builds & Citra Minimalis Distroless', titleEn: 'Multi-Stage Builds & Minimalist Distroless Images' },
      { week: 4, topicId: 'manajemen-volume-dan-jaringan-docker', titleId: 'Manajemen Volume, Persistensi Data & Jaringan Bridge', titleEn: 'Volume Persistence, Storage Drivers & Bridge Networks' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Orkestrasi Multi-Kontainer & Keamanan Produksi',
    nameEn: 'Multi-Container Orchestration & Production Hardening',
    descId: 'Docker Compose v2, healthcheck inter-service dependencies, audit keamanan non-root, Linux capability drops, dan capstone microservice cluster.',
    descEn: 'Docker Compose v2, healthcheck inter-service dependencies, non-root security audits, Linux capability drops, and microservice cluster capstone.',
    weeks: [
      { week: 5, topicId: 'orkestrasi-docker-compose-v2-dan-service-dependencies', titleId: 'Docker Compose v2 & Manajemen Dependensi Servis', titleEn: 'Docker Compose v2 & Service Dependency Management' },
      { week: 6, topicId: 'pemantauan-kesehatan-restart-policies-dan-logging', titleId: 'Healthcheck, Kebijakan Restart & Logging Drivers', titleEn: 'Healthchecks, Restart Policies & Logging Drivers' },
      { week: 7, topicId: 'keamanan-kontainer-produksi-dan-audit-trivy', titleId: 'Keamanan Kontainer: Non-Root, Drop Capabilities & Trivy', titleEn: 'Container Hardening: Non-Root, Drop Capabilities & Trivy' },
      { week: 8, topicId: 'capstone-production-microservice-cluster-compose', titleId: 'Capstone Project: Production Microservice Cluster Stack', titleEn: 'Capstone Project: Production Microservice Cluster Stack' }
    ],
  }
];
