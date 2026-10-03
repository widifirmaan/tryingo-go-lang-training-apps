# Ketahanan & Caching: Spring Data Redis & Resilience4j Circuit Breaker

> **Kategori:** Spring Boot & Java | **Level:** Lanjutan | **Minggu 9:** Ketahanan & Caching: Spring Data Redis & Resilience4j Circuit Breaker
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Mengonfigurasi Spring Cache Abstraction dengan backend terdistribusi Spring Data Redis.
- Menerapkan anotasi caching: `@Cacheable`, `@CachePut`, dan `@CacheEvict`.
- Mengintegrasikan Resilience4j: Retry, Circuit Breaker, dan Rate Limiter.
- Menulis strategi Graceful Fallback untuk menjaga kelangsungan operasional sistem saat pihak ketiga mengalami gangguan.

---

## Program: Pipeline Kurs Valuta Asing Terproteksi Caching Redis & Circuit Breaker

```java
package com.tryngo.banking.resilience;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import io.github.resilience4j.retry.annotation.Retry;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ForeignExchangeService {

    // 1. Caching Terdistribusi dengan Redis (@Cacheable)
    @Cacheable(value = "exchangeRates", key = "#currencyPair")
    @CircuitBreaker(name = "fxServiceBreaker", fallbackMethod = "getFallbackExchangeRate")
    @Retry(name = "fxServiceRetry")
    public BigDecimal getExchangeRate(String currencyPair) {
        System.out.println("[FX PROVIDER CALL] Menghubungi penyedia kurs valuta asing global untuk: " + currencyPair);
        
        // Simulasi kegagalan koneksi ke Bank Sentral
        if ("USD/IDR".equals(currencyPair)) {
            throw new RuntimeException("Koneksi timeout ke FX Gateway Internasional!");
        }

        return new BigDecimal("16250.00");
    }

    // Fallback Method: Dipanggil saat Circuit Breaker terbuka atau retry habis
    public BigDecimal getFallbackExchangeRate(String currencyPair, Throwable ex) {
        System.err.println("[CIRCUIT BREAKER OPEN / FALLBACK TRIGGERED] Menggunakan kurs darurat offline! Alasan: " + ex.getMessage());
        return new BigDecimal("16000.00"); // Kurs darurat yang aman
    }

    // Pembersihan Cache saat ada pembaruan kurs manual dari admin
    @CacheEvict(value = "exchangeRates", key = "#currencyPair")
    public void invalidateRateCache(String currencyPair) {
        System.out.println("[CACHE EVICT] Cache kurs untuk " + currencyPair + " berhasil dibersihkan dari Redis.");
    }
}
```

---

## Konsep Kunci

Dalam arsitektur perbankan, layanan kita sering kali bergantung pada API eksternal (seperti kurs mata uang asing, gateway pembayaran, atau verifikasi biometrik). Jika sistem eksternal tersebut down atau lambat, aplikasi kita tidak boleh ikut tumbang (Cascading Failure).

### Spring Cache Abstraction & Redis
Anotasi `@Cacheable(value = "exchangeRates", key = "#currencyPair")` memeriksa apakah data sudah tersedia di Redis. Jika ada (Cache Hit), Spring langsung mengembalikan data tanpa mengeksekusi body method. Jika data belum ada (Cache Miss), method dieksekusi dan hasilnya otomatis disimpan ke Redis dengan Time-To-Live (TTL) yang ditentukan.

### Ketahanan Sistem dengan Resilience4j
Resilience4j adalah pustaka toleransi kesalahan (fault-tolerance library) ringan untuk Java yang dirancang berdasarkan fungsional pemrograman. Dua fitur utamanya:
1. **Retry Pattern**: Mencoba ulang panggilan API yang gagal dengan jeda eksponensial (Exponential Backoff).
2. **Circuit Breaker**: Memantau tingkat kegagalan panggilan. Ketika tingkat kegagalan melebihi 50%, sirkuit beralih ke status **OPEN**. Seluruh panggilan berikutnya langsung dialihkan ke `fallbackMethod` tanpa membebani jaringan eksternal. Begitu sistem eksternal pulih, sirkuit beralih ke status **HALF-OPEN** untuk menguji pemulihan sebelum kembali ke status **CLOSED**.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda pemilik toko yang butuh info harga sembako harian dari pasar induk. Daripada menelpon pasar induk 100 kali setiap ada pembeli (membebani sambungan telepon), Anda mencatat harga pagi hari di papan tulis toko (Redis Cache). Jika kabel telepon pasar induk putus, Anda menggunakan harga standar kemarin daripada membatalkan transaksi pembeli (Circuit Breaker Fallback).

## Eksperimen

- Ubah properti `failureRateThreshold` Resilience4j menjadi 50% di `application.yml` dan amati transisi status sirkuit.
- Panggil method berulang kali dan pantau metrik Micrometer di `/actuator/circuitbreakers`.
- Uji pembuktian cache hit dengan memeriksa keys di redis-cli (`KEYS exchangeRates*`).

---

## Tantangan

Konfigurasikan Resilience4j `RateLimiter` yang membatasi pemanggilan API valuta asing maksimal 10 request per detik per user ID.

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Circular Dependency antar Service Bean
- **Gejala / Masalah:** Aplikasi Spring Boot gagal start dengan pesan `BeanCurrentlyInCreationException`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Rancang ulang arsitektur menggunakan mediator pattern, atau gunakan `@Lazy` sebagai solusi transisi.

### 2. Transaksi Database Tidak Berjalan pada Panggilan Internal
- **Gejala / Masalah:** Anotasi `@Transactional` diabaikan saat dipanggil dari method dalam class yang sama.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pahami bahwa Spring bekerja melalui AOP Proxy; panggil method transaksional melalui bean terinjeksi.

### 3. N+1 Query Problem pada JPA Hibernate
- **Gejala / Masalah:** Database menerima ratusan query SQL individual saat mengambil entitas relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `JOIN FETCH` pada JPQL query atau tentukan `@EntityGraph` pada repository interface.

---

## Ringkasan

Kamu telah menguasai Redis Caching dan ketahanan sistem dengan Resilience4j. Minggu depan adalah Capstone Final: Multi-Tenant Banking Ledger Microservice!
