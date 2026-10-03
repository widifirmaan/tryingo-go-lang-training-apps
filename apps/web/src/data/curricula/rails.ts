import type { LevelInfo } from '../curriculum';

// Ruby on Rails 8 curriculum — product-driven research-backed structure
export const railsCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Rails 8 Foundations & Hotwire Turbo)',
    nameEn: 'Beginner (Rails 8 Foundations & Hotwire Turbo)',
    descId: 'Arsitektur Rails 8 modern, Active Record associations, RESTful routing, dan Hotwire Turbo Frames.',
    descEn: 'Modern Rails 8 architecture, Active Record associations, RESTful routing, and Hotwire Turbo Frames.',
    weeks: [
      { week: 1, topicId: 'rails8-convention-omakase-scaffolding', titleId: 'Modern Rails 8: Konvensi Omakase, Propshaft & Struktur Proyek', titleEn: 'Modern Rails 8: Omakase Conventions, Propshaft & Project Structure' },
      { week: 2, topicId: 'active-record-validations-associations', titleId: 'Active Record Lanjutan: Asosiasi Kompleks, Scopes & Enums', titleEn: 'Advanced Active Record: Complex Associations, Scopes & Enums' },
      { week: 3, topicId: 'controllers-routing-restful', titleId: 'Action Controller: Strong Parameters, Flash Alerts & Alur RESTful', titleEn: 'Action Controller: Strong Parameters, Flash Alerts & RESTful Workflows' },
      { week: 4, topicId: 'hotwire-turbo-drive-frames', titleId: 'Frontend Modern Tanpa SPA: Hotwire Turbo Drive & Turbo Frames', titleEn: 'Modern Frontend Without SPAs: Hotwire Turbo Drive & Turbo Frames' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (Turbo Streams, Stimulus JS & Solid Stack)',
    nameEn: 'Intermediate (Turbo Streams, Stimulus JS & Solid Stack)',
    descId: 'WebSockets real-time dengan Turbo Streams & Solid Cable, Stimulus JS, dan background jobs dengan Solid Queue.',
    descEn: 'Real-time WebSockets with Turbo Streams & Solid Cable, Stimulus JS, and background jobs with Solid Queue.',
    weeks: [
      { week: 5, topicId: 'turbo-streams-solid-cable', titleId: 'Reaktivitas Real-Time: Turbo Streams & Rails 8 Solid Cable', titleEn: 'Real-Time Reactivity: Turbo Streams & Rails 8 Solid Cable' },
      { week: 6, topicId: 'stimulus-js-controllers', titleId: 'Interaktivitas Sisi Klien: Stimulus JS, Targets, Values & Drag-and-Drop', titleEn: 'Client-Side Interactivity: Stimulus JS, Targets, Values & Drag-and-Drop' },
      { week: 7, topicId: 'solid-queue-background-jobs', titleId: 'Tugas Latar Belakang: Rails 8 Solid Queue & Active Job Asinkron', titleEn: 'Background Tasks: Rails 8 Solid Queue & Asynchronous Active Job' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Solid Cache, Native Auth & Workspace Capstone)',
    nameEn: 'Advanced (Solid Cache, Native Auth & Workspace Capstone)',
    descId: 'Solid Cache, Russian Doll Caching, sistem autentikasi native Rails 8, deployment Kamal 2, dan platform kolaborasi tim.',
    descEn: 'Solid Cache, Russian Doll Caching, Rails 8 native auth, Kamal 2 deployment, and team collaboration platform.',
    weeks: [
      { week: 8, topicId: 'solid-cache-performance', titleId: 'Performa & Caching: Rails 8 Solid Cache & Russian Doll Caching', titleEn: 'Performance & Caching: Rails 8 Solid Cache & Russian Doll Caching' },
      { week: 9, topicId: 'authentication-security-kamal', titleId: 'Autentikasi Native Rails 8, CurrentAttributes & Deployment Kamal 2', titleEn: 'Rails 8 Native Authentication, CurrentAttributes & Kamal 2 Deployment' },
      { week: 10, topicId: 'capstone-collaborative-workspace', titleId: 'Capstone: Platform Kolaborasi Tim & Manajemen Proyek Real-Time Production-Ready', titleEn: 'Capstone: Production-Ready Full-Scale Real-Time Collaborative Team Workspace Platform' }
    ],
  }
];
