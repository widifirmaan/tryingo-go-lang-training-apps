import type { LevelInfo } from '../curriculum';

// Angular curriculum — product-driven research-backed structure
export const angularCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Standalone Components, Signals & Kontrol Alur Modern',
    nameEn: 'Standalone Components, Signals & Modern Control Flow',
    descId: 'Angular modern (v17-v19): Standalone components, reaktivitas Signals (signal, computed), sintaks kontrol @if/@for, dan @defer.',
    descEn: 'Modern Angular (v17-v19): Standalone components, Signals reactivity (signal, computed), @if/@for control flow, and @defer.',
    weeks: [
      { week: 1, topicId: 'standalone-components-dan-signals', titleId: 'Angular Modern: Standalone Components, Tanpa NgModule & Sinyal Reaktif signal()', titleEn: 'Modern Angular: Standalone Components, Zero NgModule & Reactive signal()' },
      { week: 2, topicId: 'modern-control-flow-dan-computed', titleId: 'Kontrol Alur Modern (@if, @for, @empty) & Sinyal Komputasi computed()', titleEn: 'Modern Control Flow (@if, @for, @empty) & computed() Signals' },
      { week: 3, topicId: 'input-output-dan-component-interaction', titleId: 'Komunikasi Komponen Modern: input(), input.required() & output() Signals', titleEn: 'Modern Component Communication: input(), input.required() & output() Signals' },
      { week: 4, topicId: 'deferrable-views-dan-loading', titleId: 'Deferrable Views: Optimasi Pemuatan Malas (@defer, @placeholder, @loading, @error)', titleEn: 'Deferrable Views: Lazy Loading Optimization with @defer & Triggers' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Dependency Injection, Reactive Forms & RxJS',
    nameEn: 'Dependency Injection, Reactive Forms & RxJS',
    descId: 'Injeksi dependensi modern via inject(), formulir reaktif bertipe ketat (Reactive Forms), dan integrasi HttpClient dengan RxJS toSignal().',
    descEn: 'Modern Dependency Injection via inject(), strongly-typed Reactive Forms, and HttpClient integration with RxJS toSignal().',
    weeks: [
      { week: 5, topicId: 'dependency-injection-dan-services', titleId: 'Dependency Injection Modern: Fungsi inject() & Layanan Rekam Medis (providedIn)', titleEn: 'Modern Dependency Injection: The inject() Function & ProvidedIn Services' },
      { week: 6, topicId: 'reactive-forms-dan-validation', titleId: 'Reactive Forms: Formulir Ber-Tipe Ketat (Typed Forms), Validasi & Custom Async Validators', titleEn: 'Reactive Forms: Strongly-Typed Forms, Validations & Custom Async Validators' },
      { week: 7, topicId: 'rxjs-dan-httpclient', titleId: 'Integrasi RxJS Modern & HttpClient: switchMap, debounceTime & Jembatan toSignal()', titleEn: 'Modern RxJS & HttpClient: switchMap, debounceTime & The toSignal() Bridge' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Routing Fungsional, Interceptors & Capstone RS',
    nameEn: 'Functional Routing, Interceptors & Hospital Capstone',
    descId: 'Router guards fungsional (CanActivateFn), HTTP interceptors modern, efek sinyal effect(), dan capstone sistem manajemen rumah sakit.',
    descEn: 'Functional router guards (CanActivateFn), modern HTTP interceptors, signal effect(), and the enterprise hospital system capstone.',
    weeks: [
      { week: 8, topicId: 'angular-router-dan-guards', titleId: 'Angular Router Modern: Functional CanActivateFn, Resolvers & Lazy Routes', titleEn: 'Modern Angular Router: Functional CanActivateFn, Resolvers & Lazy Routes' },
      { week: 9, topicId: 'http-interceptors-dan-signals-effects', titleId: 'Functional HTTP Interceptors (withInterceptors) & Sinyal Efek effect()', titleEn: 'Functional HTTP Interceptors (withInterceptors) & Signal effect()' },
      { week: 10, topicId: 'capstone-enterprise-hospital-system', titleId: 'Capstone: Sistem Manajemen Klinis & Penjadwalan Rumah Sakit Enterprise', titleEn: 'Capstone: Enterprise Multi-Tier Hospital Clinical Management System' }
    ],
  }
];
