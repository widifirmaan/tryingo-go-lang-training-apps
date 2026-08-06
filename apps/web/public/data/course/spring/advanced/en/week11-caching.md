# Caching

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 11:** Caching

## Learning Objectives

- @EnableCaching to enable Spring caching
- @Cacheable to cache method results
- @CachePut and @CacheEvict to update/remove cache
- Redis as cache store
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

## Key Concepts

### Caching
Store frequently accessed data in memory to reduce database load.

### @Cacheable
Cache method results. Return cached value if key exists.

### @CachePut
Always execute method and update cache.

### @CacheEvict
Remove entries from cache.

### Redis
In-memory data store for fast, distributed caching.

---

## Experiments

- Create cache for frequently called methods
- Experiment with different TTLs per cache
- Try conditional caching with #result
- Create cache manager with multiple stores
- Experiment with cache statistics

---

## Challenge

Build a caching layer for Product API: cache products, cache individual product, evict on update/delete.

---

## Summary

Week 11 of 14: **Caching** (Level: Advanced). Performance and scalability. Next week: **Async & Scheduling**.
