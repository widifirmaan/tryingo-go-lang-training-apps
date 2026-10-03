import type { LevelInfo } from '../curriculum';

// Next.js curriculum — product-driven research-backed structure
export const nextjsCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'App Router, RSC & Fondasi Streaming',
    nameEn: 'App Router, RSC & Streaming Foundations',
    descId: 'Arsitektur Next.js modern: App Router, React Server Components (RSC) vs Client Components, routing dinamis, dan data fetching.',
    descEn: 'Modern Next.js architecture: App Router, React Server Components (RSC) vs Client Components, dynamic routes, and data fetching.',
    weeks: [
      { week: 1, topicId: 'app-router-dan-rsc', titleId: "App Router: React Server Components (RSC) vs Client Components ('use client')", titleEn: "App Router: React Server Components (RSC) vs Client Components ('use client')" },
      { week: 2, topicId: 'routing-dinamis-dan-layouts', titleId: 'Routing Berbasis Berkas: Dynamic Segments ([slug]), Nested Layouts & Not-Found', titleEn: 'File-System Routing: Dynamic Segments ([slug]), Nested Layouts & Not-Found' },
      { week: 3, topicId: 'data-fetching-dan-caching', titleId: 'Data Fetching Modern: Native fetch(), Extended Caching & ISR (Incremental Static Regeneration)', titleEn: 'Modern Data Fetching: Extended fetch(), Cache Policies & ISR' },
      { week: 4, topicId: 'streaming-ssr-dan-suspense', titleId: 'Streaming SSR, React Suspense & File loading.tsx', titleEn: 'Streaming SSR, React Suspense & The loading.tsx Boundary' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Server Actions, Route Handlers & Edge Auth',
    nameEn: 'Server Actions, Route Handlers & Edge Auth',
    descId: 'Mutasi data langsung dengan Server Actions, Route Handlers (route.ts), otentikasi Edge Middleware, dan revalidasi cache.',
    descEn: 'Direct data mutations via Server Actions, Route Handlers (route.ts), Edge Middleware auth, and cache revalidation.',
    weeks: [
      { week: 5, topicId: 'server-actions-dan-mutasi', titleId: "Server Actions ('use server'): Mutasi Data, useActionState & Revalidasi Cache", titleEn: "Server Actions ('use server'): Data Mutations, useActionState & Revalidation" },
      { week: 6, topicId: 'route-handlers-rest-api', titleId: 'Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks', titleEn: 'Route Handlers (route.ts): REST API, NextRequest/NextResponse & Webhooks' },
      { week: 7, topicId: 'middleware-dan-autentikasi', titleId: 'Edge Middleware: Verifikasi Sesi JWT, Protected Routes & Header Rewrites', titleEn: 'Edge Middleware: JWT Session Verification, Protected Routes & Rewrites' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'SEO Dinamis, Optimasi & Capstone E-Commerce',
    nameEn: 'Dynamic SEO, Optimizations & E-Commerce Capstone',
    descId: 'Metadata API dinamis, OpenGraph images, optimasi next/image & core web vitals, dan proyek storefront e-commerce lengkap.',
    descEn: 'Dynamic Metadata API, OpenGraph images, next/image & core web vitals optimization, and full e-commerce storefront capstone.',
    weeks: [
      { week: 8, topicId: 'metadata-api-dan-seo-og', titleId: 'Dynamic Metadata API, OpenGraph Image Generation & SEO Terstruktur', titleEn: 'Dynamic Metadata API, OpenGraph Generation & Structured SEO' },
      { week: 9, topicId: 'optimasi-image-font-dan-scripts', titleId: 'Optimasi Performa: next/image, next/font & Metrik Core Web Vitals (LCP, CLS, INP)', titleEn: 'Performance Optimization: next/image, next/font & Core Web Vitals' },
      { week: 10, topicId: 'capstone-headless-ecommerce', titleId: 'Capstone: Headless E-Commerce Storefront dengan App Router & Server Actions', titleEn: 'Capstone: Production Headless E-Commerce Storefront Architecture' }
    ],
  }
];
