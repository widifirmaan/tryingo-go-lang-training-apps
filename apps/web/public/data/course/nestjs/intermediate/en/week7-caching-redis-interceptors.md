# Distributed Caching: CacheModule, Redis Store & Cache Invalidation

> **Kategori:** NestJS Enterprise Architecture | **Level:** Intermediate | **Minggu 7:** Distributed Caching: CacheModule, Redis Store & Cache Invalidation

## Learning Objectives

- Configure NestJS `CacheModule` backed by distributed Redis instances.
- Apply the Cache-Aside pattern for read-heavy catalog workloads.
- Deploy `CacheInterceptor` for automated response caching across GET endpoints.
- Manage Cache Invalidation workflows during data-mutating events (POST, PUT, DELETE).

---

## Program: Redis Distributed Caching for Product Catalog & Automated Invalidation

```typescript
// Menggunakan @nestjs/cache-manager dan cache-manager-redis-yet
import {
  Injectable, Controller, Get, Post, Param, Body, UseInterceptors
} from '@nestjs/common';

// Simulasi Antarmuka CacheManager
interface CacheStore {
  get<T>(key: string): Promise<T | undefined>;
  set(key: string, value: unknown, ttlMs?: number): Promise<void>;
  del(key: string): Promise<void>;
}

@Injectable()
export class MockCacheService implements CacheStore {
  private store = new Map<string, { val: unknown; expires: number }>();

  async get<T>(key: string): Promise<T | undefined> {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      this.store.delete(key);
      return undefined;
    }
    return entry.val as T;
  }

  async set(key: string, value: unknown, ttlMs = 60000): Promise<void> {
    this.store.set(key, { val: value, expires: Date.now() + ttlMs });
  }

  async del(key: string): Promise<void> {
    this.store.delete(key);
  }
}

// Service Katalog dengan Pola Cache-Aside
@Injectable()
export class CachedCatalogService {
  constructor(private readonly cache: MockCacheService) {}

  async getProductDetails(productId: string) {
    const cacheKey = `product:details:${productId}`;

    // 1. Periksa Cache Hit
    const cached = await this.cache.get(cacheKey);
    if (cached) {
      console.log(`[CACHE HIT] Mengembalikan data ${productId} langsung dari Redis.`);
      return { ...cached as object, source: 'REDIS_CACHE' };
    }

    // 2. Cache Miss: Ambil dari Database PostgreSQL
    console.log(`[CACHE MISS] Mengkueri database PostgreSQL untuk produk: ${productId}...`);
    const dbResult = { id: productId, name: 'Premium Mechanical Keyboard', price: 1500000 };

    // Simpan ke Redis dengan TTL 60 detik
    await this.cache.set(cacheKey, dbResult, 60000);
    return { ...dbResult, source: 'POSTGRES_DB' };
  }

  async updateProductPrice(productId: string, newPrice: number) {
    console.log(`[DB UPDATE] Memperbarui harga produk ${productId} menjadi Rp ${newPrice}...`);
    // Invalidate cache agar pengguna tidak melihat data kadaluarsa
    const cacheKey = `product:details:${productId}`;
    await this.cache.del(cacheKey);
    console.log(`[CACHE INVALIDATED] Kunci ${cacheKey} berhasil dihapus dari Redis.`);
    return { success: true, updatedPrice: newPrice };
  }
}

console.log('=== POLA DISTRIBUTED CACHE-ASIDE DENGAN REDIS TERKONFIGURASI ===');
```

---

## Key Concepts

During flash-sale promotional bursts, millions of consumers simultaneously browse identical product catalog listings. If every request triggers relational SQL queries against PostgreSQL, connection pools exhaust rapidly, cascading into system-wide outages.

### The Cache-Aside Paradigm
The **Cache-Aside** architecture operates as follows:
1. Inbound requests query the Redis distributed cache. Upon a **Cache Hit**, data returns within sub-milliseconds.
2. Upon a **Cache Miss**, the service fetches data from PostgreSQL, populates Redis configured with a Time-To-Live (TTL), and fulfills the request.

### The Invalidation Challenge
"There are only two hard things in Computer Science: cache invalidation and naming things." (Phil Karlton).
When merchants update product pricing or inventory stock, the stale Redis cache entry must be purged synchronously (`await cache.del(...)`) to prevent customers from purchasing items with superseded pricing.


---

---

## Beginner Friendly Explanation

Imagine a bakery display case. The merchant displays popular pastries in the front window (Redis Cache) so shoppers view them instantly without waitstaff jogging to the rear bakery ovens (PostgreSQL Database). If a recipe changes, staff must immediately clear the display case and showcase the fresh recipe (Cache Invalidation).

## Experiments

- Invoke `getProductDetails("1")` twice and verify the second invocation returns `source: "REDIS_CACHE"`.
- Invoke `updateProductPrice("1", 2000000)` and verify subsequent lookups incur a fresh cache miss.
- Decorate a controller handler with `@UseInterceptors(CacheInterceptor)`.

---

## Challenge

Author a custom `@InvalidateCache("product:details:*")` decorator purging related pattern keys upon successful execution of mutating handlers.

---

## Summary

You have mastered CacheModule, Redis Store, and Cache Invalidation strategies. Level 2 complete! Level 3 covers Microservices, Testing, and our E-Commerce Capstone.
