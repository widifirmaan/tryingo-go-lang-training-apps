import type { LevelInfo } from '../curriculum';

// Python Backend & Automation curriculum — product-driven research-backed structure
export const pythonCurriculum: LevelInfo[] = [
  {
    levelId: 'beginer',
    nameId: 'Pemula (Modern Python 3.12+ & Asyncio)',
    nameEn: 'Beginner (Modern Python 3.12+ & Asyncio)',
    descId: 'Sintaks Python 3.12+ modern, type hints ketat, structural pattern matching, context managers, dan konkurensi asyncio.',
    descEn: 'Modern Python 3.12+ syntax, strict type hints, structural pattern matching, context managers, and asyncio concurrency.',
    weeks: [
      { week: 1, topicId: 'python-modern-syntax-type-hints', titleId: 'Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching', titleEn: 'Modern Python 3.12+: Strict Type Hints, Dataclasses & Pattern Matching' },
      { week: 2, topicId: 'data-structures-functional', titleId: 'Struktur Data Lanjutan, Collections & Pipeline Fungsional', titleEn: 'Advanced Data Structures, Collections & Functional Pipelines' },
      { week: 3, topicId: 'oop-dunder-context-managers', titleId: 'OOP Tingkat Lanjut, Magic Methods & Custom Context Managers', titleEn: 'Advanced OOP, Magic Methods & Custom Context Managers' },
      { week: 4, topicId: 'asyncio-event-loop-concurrency', titleId: 'Konkurensi Modern: Asyncio, Event Loop & TaskGroup di Python 3.11+', titleEn: 'Modern Concurrency: Asyncio, Event Loop & TaskGroup in Python 3.11+' }
    ],
  },
  {
    levelId: 'intermediate',
    nameId: 'Menengah (FastAPI, Pydantic v2 & DuckDB Analytics)',
    nameEn: 'Intermediate (FastAPI, Pydantic v2 & DuckDB Analytics)',
    descId: 'Web API berkecepatan tinggi dengan FastAPI, validasi Pydantic v2, analitik data secepat kilat dengan DuckDB, dan async web scraping.',
    descEn: 'High-throughput Web APIs with FastAPI, Pydantic v2 validation, lightning-fast DuckDB analytics, and async web intelligence.',
    weeks: [
      { week: 5, topicId: 'pydantic-fastapi-foundations', titleId: 'FastAPI & Pydantic v2: Validasi Performa Tinggi & REST API Asinkron', titleEn: 'FastAPI & Pydantic v2: High-Performance Validation & Async REST APIs' },
      { week: 6, topicId: 'databases-duckdb-sqlalchemy', titleId: 'Penyimpanan Analitik: DuckDB Embedded & Async SQLAlchemy 2.0', titleEn: 'Analytics Storage: Embedded DuckDB & Async SQLAlchemy 2.0' },
      { week: 7, topicId: 'web-scraping-httpx-parsel', titleId: 'Web Intelligence Asinkron: HTTPX (HTTP/2), Parsel & Ethical Scraping', titleEn: 'Async Web Intelligence: HTTPX (HTTP/2), Parsel & Ethical Scraping' }
    ],
  },
  {
    levelId: 'advanced',
    nameId: 'Lanjutan (Distributed Workers, Testing & Intelligence Engine Capstone)',
    nameEn: 'Advanced (Distributed Workers, Testing & Intelligence Engine Capstone)',
    descId: 'Task queues Redis/Celery, pengujian async komprehensif pytest, dan mesin agregasi sentimen pasar keuangan production-ready.',
    descEn: 'Redis/Celery task queues, comprehensive async testing with pytest, and production market intelligence sentiment engine.',
    weeks: [
      { week: 8, topicId: 'background-tasks-celery-redis', titleId: 'Task Queue Terdistribusi: Redis, Celery & Asynchronous Background Workers', titleEn: 'Distributed Task Queues: Redis, Celery & Asynchronous Background Workers' },
      { week: 9, topicId: 'production-packaging-pytest', titleId: 'Arsitektur Pengujian Asinkron: Pytest, Mocks & Testcontainers', titleEn: 'Async Testing Architecture: Pytest, Mocks & Testcontainers' },
      { week: 10, topicId: 'capstone-market-intelligence', titleId: 'Capstone: Mesin Intelijen & Sentimen Pasar Keuangan Real-Time Production-Ready', titleEn: 'Capstone: Production-Ready Real-Time Financial Market Intelligence Engine' }
    ],
  }
];
