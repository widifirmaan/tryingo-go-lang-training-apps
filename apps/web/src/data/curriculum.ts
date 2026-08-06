export interface WeekInfo {
  week: number;
  topicId: string;
  titleId: string;
  titleEn: string;
}

export interface LevelInfo {
  levelId: string;
  nameId: string;
  nameEn: string;
  descId: string;
  descEn: string;
  weeks: WeekInfo[];
}

// Default fallback curriculum (used when no custom curriculum exists)
const DEFAULT_CURRICULUM: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula',
    nameEn: 'Beginner',
    descId: 'Tidak perlu pengalaman coding. Mulai dari nol.',
    descEn: 'No coding experience needed. Start from zero.',
    weeks: [
      { week: 1, topicId: 'pengenalan', titleId: 'Pengenalan & Persiapan Lingkungan', titleEn: 'Introduction & Environment Setup' },
      { week: 2, topicId: 'dasar-pemrograman', titleId: 'Dasar-dasar Pemrograman', titleEn: 'Programming Fundamentals' },
      { week: 3, topicId: 'struktur-data', titleId: 'Struktur Data & Algoritma Dasar', titleEn: 'Data Structures & Basic Algorithms' },
      { week: 4, topicId: 'proyek-mini', titleId: 'Proyek Mini: Aplikasi Pertama', titleEn: 'Mini Project: First Application' },
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah',
    nameEn: 'Intermediate',
    descId: 'Sudah bisa coding dasar. Saatnya naik level.',
    descEn: 'Already know basics. Time to level up.',
    weeks: [
      { week: 5, topicId: 'konsep-lanjutan', titleId: 'Konsep Lanjutan', titleEn: 'Advanced Concepts' },
      { week: 6, topicId: 'api-integrasi', titleId: 'API & Integrasi', titleEn: 'API & Integration' },
      { week: 7, topicId: 'database', titleId: 'Database & Penyimpanan', titleEn: 'Database & Storage' },
      { week: 8, topicId: 'testing', titleId: 'Testing & Debugging', titleEn: 'Testing & Debugging' },
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan',
    nameEn: 'Advanced',
    descId: 'Konsep kompleks dan arsitektur enterprise.',
    descEn: 'Complex concepts and enterprise architecture.',
    weeks: [
      { week: 9, topicId: 'arsitektur', titleId: 'Arsitektur & Pattern', titleEn: 'Architecture & Patterns' },
      { week: 10, topicId: 'performansi', titleId: 'Optimasi Performansi', titleEn: 'Performance Optimization' },
      { week: 11, topicId: 'keamanan', titleId: 'Keamanan Aplikasi', titleEn: 'Application Security' },
      { week: 12, topicId: 'deployment', titleId: 'Deployment & CI/CD', titleEn: 'Deployment & CI/CD' },
    ],
  },
  {
    levelId: 'pro',
    nameId: 'Profesional',
    nameEn: 'Professional',
    descId: 'Siap kerja di industri teknologi.',
    descEn: 'Ready for the tech industry.',
    weeks: [
      { week: 13, topicId: 'microservices', titleId: 'Microservices & Skalabilitas', titleEn: 'Microservices & Scalability' },
      { week: 14, topicId: 'system-design', titleId: 'System Design & Architecture', titleEn: 'System Design & Architecture' },
      { week: 15, topicId: 'devops', titleId: 'DevOps & Monitoring', titleEn: 'DevOps & Monitoring' },
      { week: 16, topicId: 'final-project', titleId: 'Proyek Akhir: Production App', titleEn: 'Final Project: Production App' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Generated curricula — each generator creates its own .ts file in curricula/
// ─────────────────────────────────────────────────────────────────────────────
import { html5Curriculum } from './curricula/html5';
import { golangCurriculum } from './curricula/golang';
import { rustCurriculum } from './curricula/rust';
import { css3Curriculum } from './curricula/css3';
import { javascriptCurriculum } from './curricula/javascript';
import { typescriptCurriculum } from './curricula/typescript';
import { nextjsCurriculum } from './curricula/nextjs';
import { reactCurriculum } from './curricula/react';
import { pythonCurriculum } from './curricula/python';
import { vueCurriculum } from './curricula/vue';
import { dockerCurriculum } from './curricula/docker';
import { nodejsCurriculum } from './curricula/nodejs';
import { nestjsCurriculum } from './curricula/nestjs';
import { djangoCurriculum } from './curricula/django';
import { laravelCurriculum } from './curricula/laravel';
import { phpCurriculum } from './curricula/php';
import { codeigniter4Curriculum } from './curricula/codeigniter4';
import { angularCurriculum } from './curricula/angular';
import { svelteCurriculum } from './curricula/svelte';
import { railsCurriculum } from './curricula/rails';
import { postgresqlCurriculum } from './curricula/postgresql';
import { graphqlCurriculum } from './curricula/graphql';
import { csharpCurriculum } from './curricula/csharp';
import { springCurriculum } from './curricula/spring';
import { mysqlCurriculum } from './curricula/mysql';
import { mongodbCurriculum } from './curricula/mongodb';
import { redisCurriculum } from './curricula/redis';

const CUSTOM_CURRICULA: Record<string, LevelInfo[]> = {
  html5: html5Curriculum,
  golang: golangCurriculum,
  rust: rustCurriculum,
  css3: css3Curriculum,
  javascript: javascriptCurriculum,
  typescript: typescriptCurriculum,
  nextjs: nextjsCurriculum,
  react: reactCurriculum,
  python: pythonCurriculum,
  vue: vueCurriculum,
  docker: dockerCurriculum,
  nodejs: nodejsCurriculum,
  nestjs: nestjsCurriculum,
  django: djangoCurriculum,
  laravel: laravelCurriculum,
  php: phpCurriculum,
  codeigniter4: codeigniter4Curriculum,
  angular: angularCurriculum,
  svelte: svelteCurriculum,
  rails: railsCurriculum,
  postgresql: postgresqlCurriculum,
  graphql: graphqlCurriculum,
  csharp: csharpCurriculum,
  spring: springCurriculum,
  mysql: mysqlCurriculum,
  mongodb: mongodbCurriculum,
  redis: redisCurriculum,
};

export function getCurriculum(slug: string): LevelInfo[] {
  return CUSTOM_CURRICULA[slug] || DEFAULT_CURRICULUM;
}

// ─────────────────────────────────────────────────────────────────────────────
// Level badge colors — auto-generated from track data, not hardcoded
// ─────────────────────────────────────────────────────────────────────────────
export const LEVEL_BADGE_COLORS: Record<string, string> = {
  beginer: 'bg-emerald-500 text-white',
  intermediate: 'bg-amber-500 text-white',
  advanced: 'bg-orange-500 text-white',
  pro: 'bg-red-500 text-white',
};
