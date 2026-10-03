import type { LevelInfo } from '../curriculum';

// Go curriculum — product-driven research-backed structure
export const golangCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pondasi Go & Sistem Tipe Statis',
    nameEn: 'Go Foundations & Static Type System',
    descId: 'Filosofi kesederhanaan Go: packages, variabel, multiple returns, error handling eksplisit, slices, maps, structs, dan pointer.',
    descEn: 'Go simplicity philosophy: packages, variables, multiple returns, explicit error handling, slices, maps, structs, and pointers.',
    weeks: [
      { week: 1, topicId: 'sintaks-dasar-dan-tipe-data', titleId: 'Arsitektur Package Go: main, Variabel, Zero Values & Multiple Returns', titleEn: 'Go Package Architecture: main, Variables, Zero Values & Multiple Returns' },
      { week: 2, topicId: 'control-flow-dan-error-handling', titleId: 'Control Flow Idiomatik: if with Short Statement, switch & Error Handling Eksplisit', titleEn: 'Idiomatic Control Flow: if with Short Statements, switch & Explicit Errors' },
      { week: 3, topicId: 'slices-arrays-dan-maps', titleId: 'Struktur Data Inti: Slices (Header, Len, Cap), make, append & Hash Maps', titleEn: 'Core Data Structures: Slices (Pointer, Len, Cap), make, append & Maps' },
      { week: 4, topicId: 'structs-pointers-dan-methods', titleId: 'Structs, Pointer Memori (& dan *) & Value vs Pointer Receivers', titleEn: 'Structs, Memory Pointers (& and *) & Value vs Pointer Receivers' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Interface, Konkurensi & Channel Pipes',
    nameEn: 'Interfaces, Concurrency & Channel Pipes',
    descId: 'Duck typing implisit, jutaan goroutines ringan, channels, select multiplexing, sync.Mutex, dan propagasi context.Context.',
    descEn: 'Implicit duck typing, millions of lightweight goroutines, channels, select multiplexing, sync.Mutex, and context propagation.',
    weeks: [
      { week: 5, topicId: 'interfaces-dan-duck-typing', titleId: 'Interfaces & Duck Typing: Komposisi Implisit, Type Assertions & Tipe any', titleEn: 'Interfaces & Duck Typing: Implicit Contracts, Type Assertions & any' },
      { week: 6, topicId: 'goroutines-dan-sync', titleId: 'Konkurensi: Jutaan Goroutines (go), sync.WaitGroup, Mutex & Race Detector', titleEn: 'Concurrency: Millions of Goroutines, sync.WaitGroup, Mutex & Race Detector' },
      { week: 7, topicId: 'channels-dan-select', titleId: 'Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts', titleEn: 'Channels & Multiplexing: Buffered vs Unbuffered Channels, select & Timeouts' },
      { week: 8, topicId: 'context-dan-cancellation', titleId: 'context.Context: Propagasi Batas Waktu (WithTimeout), Pembatalan & Metadata', titleEn: 'context.Context: Timeout Propagation (WithTimeout), Cancellation & Metadata' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'HTTP Server, Profiling & Capstone Gateway',
    nameEn: 'HTTP Server, Profiling & Gateway Capstone',
    descId: 'Arsitektur net/http murni, rantai middleware, benchmarking, profiling memori pprof, dan capstone distributed rate limiter gateway.',
    descEn: 'Pure net/http architecture, middleware chains, benchmarking, pprof memory profiling, and the distributed rate limiter gateway.',
    weeks: [
      { week: 9, topicId: 'net-http-dan-middleware', titleId: 'Arsitektur net/http Murni: Custom Handlers, Chaining Middleware & REST Routing', titleEn: 'Pure net/http Architecture: Custom Handlers, Middleware Chaining & REST' },
      { week: 10, topicId: 'testing-dan-benchmarking', titleId: 'Testing Idiomatik & Benchmarking: Table-Driven Tests, Subtests & testing.B', titleEn: 'Idiomatic Testing & Benchmarking: Table-Driven Tests, Subtests & testing.B' },
      { week: 11, topicId: 'profiling-pprof-dan-optimasi', titleId: 'Profiling Produksi: net/http/pprof, Heap Allocation & Escape Analysis', titleEn: 'Production Profiling: net/http/pprof, Heap Analysis & Escape Analysis' },
      { week: 12, topicId: 'capstone-distributed-gateway', titleId: 'Capstone: High-Throughput Distributed Rate Limiter & Reverse Proxy API Gateway', titleEn: 'Capstone: Production High-Throughput Distributed Rate Limiter & Reverse Proxy' }
    ],
  }
];
