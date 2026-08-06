# Caching

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 11:** Caching

## Tujuan Pembelajaran

- @EnableCaching untuk aktifkan Spring caching
- @Cacheable untuk cache method result
- @CachePut dan @CacheEvict untuk update/hapus cache
- Redis sebagai cache store
- Cache configuration: TTL, key strategy

---

## Program: Redis Cache

```java
// File: CacheConfig.java
package com.example.demo.config;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;

import java.time.Duration;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
            .entryTtl(Duration.ofMinutes(10))
            .disableCachingNullValues();

        return RedisCacheManager.builder(factory)
            .cacheDefaults(config)
            .withCacheConfiguration("products",
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(5)))
            .withCacheConfiguration("users",
                RedisCacheConfiguration.defaultCacheConfig()
                    .entryTtl(Duration.ofMinutes(30)))
            .build();
    }
}

// File: ProductService.java (dengan caching)
/*
@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Cacheable(value = "products", key = "#id")
    public Optional<Product> getProductById(Long id) {
        System.out.println("Fetching from database...");
        return productRepository.findById(id);
    }

    @Cacheable(value = "products", key = "'all'")
    public List<Product> getAllProducts() {
        System.out.println("Fetching all from database...");
        return productRepository.findAll();
    }

    @CachePut(value = "products", key = "#product.id")
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    @CacheEvict(value = "products", key = "#id")
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @CacheEvict(value = "products", allEntries = true)
    public void clearCache() {
        System.out.println("Cache cleared");
    }
}
*/

// Caching Annotations:
// @EnableCaching — aktifkan caching
// @Cacheable — cache result method
// @CachePut — update cache
// @CacheEvict — hapus cache
// @CacheConfig — shared config di class level
```

---

## Konsep Kunci

### Caching
Simpan data yang sering di-access di memory (Redis) untuk mengurangi database load.

### @Cacheable
Cache result method. Jika key sudah ada di cache, return cached value tanpa execute method.

### @CachePut
Selalu execute method dan update cache.

### @CacheEvict
Hapus entry dari cache. `allEntries = true` untuk clear semua.

### Redis
In-memory data store. Fast, support TTL, distributed cache.

---

## Eksperimen

- Buat cache untuk method yang sering dipanggil
- Eksperimen dengan TTL berbeda per cache
- Coba conditional caching dengan #result
- Buat cache manager dengan multiple stores
- Eksperimen dengan cache statistics

---

## Tantangan

Buat caching layer untuk Product API: cache products, cache individual product, evict on update/delete.

---

## Ringkasan

Minggu 11 dari 14: **Caching** (Level: Lanjutan). Performa dan skalabilitas. Minggu depan: **Async & Scheduling**.
