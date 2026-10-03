# RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail

> **Kategori:** Spring Boot & Java | **Level:** Pemula | **Minggu 4:** RESTful Web APIs: Spring MVC, Jakarta Validation & RFC 7807 ProblemDetail
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Membangun RESTful endpoint berstandar menggunakan `@RestController` dan `@RequestMapping`.
- Menerapkan validasi deklaratif dengan Jakarta Bean Validation (`@NotNull`, `@DecimalMin`, `@NotBlank`).
- Menggunakan fitur `ProblemDetail` bawaan Spring 6 / Spring Boot 3 yang mematuhi RFC 7807.
- Membuat `@RestControllerAdvice` terpusat untuk menangani exception di seluruh controller.

---

## Program: REST API Transfer Dana dengan Validasi Payload & Global Exception Handler

```java
package com.tryngo.banking.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.net.URI;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/transfers")
public class TransferController {

    @PostMapping
    public ResponseEntity<TransferResponse> executeTransfer(@Valid @RequestBody TransferRequest request) {
        // Simulasi validasi bisnis saldo
        if (request.amount().compareTo(new BigDecimal("50000000.00")) > 0) {
            throw new InsufficientBalanceException("Saldo harian tidak mencukupi untuk transfer di atas Rp 50.000.000!");
        }

        var response = new TransferResponse(
            "TRX-2026-" + System.currentTimeMillis(),
            request.sourceAccount(),
            request.targetAccount(),
            request.amount(),
            "SUCCESS",
            Instant.now()
        );

        return ResponseEntity
            .created(URI.create("/api/v1/transfers/" + response.transferId()))
            .body(response);
    }
}

// DTO Requests & Responses menggunakan Java Records
record TransferRequest(
    @NotBlank(message = "Nomor rekening asal tidak boleh kosong.")
    String sourceAccount,

    @NotBlank(message = "Nomor rekening tujuan tidak boleh kosong.")
    String targetAccount,

    @NotNull(message = "Nominal transfer wajib diisi.")
    @DecimalMin(value = "10000.00", message = "Minimal transfer adalah Rp 10.000,00.")
    @DecimalMax(value = "100000000.00", message = "Maksimal transfer per transaksi adalah Rp 100.000.000,00.")
    BigDecimal amount
) {}

record TransferResponse(String transferId, String from, String to, BigDecimal amount, String status, Instant timestamp) {}

// Custom Business Exception
class InsufficientBalanceException extends RuntimeException {
    public InsufficientBalanceException(String message) { super(message); }
}

// Global Exception Handler menggunakan Standar RFC 7807 ProblemDetail bawaan Spring 6
@RestControllerAdvice
class GlobalExceptionHandler {

    @ExceptionHandler(InsufficientBalanceException.class)
    public ProblemDetail handleInsufficientBalance(InsufficientBalanceException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, ex.getMessage());
        problem.setTitle("Kegagalan Validasi Saldo Perbankan");
        problem.setType(URI.create("https://tryngo.io/errors/insufficient-balance"));
        problem.setProperty("timestamp", Instant.now());
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationErrors(MethodArgumentNotValidException ex) {
        var problem = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, "Payload request tidak valid.");
        problem.setTitle("Kesalahan Validasi Data");
        
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(err -> 
            errors.put(err.getField(), err.getDefaultMessage())
        );
        problem.setProperty("fieldErrors", errors);
        return problem;
    }
}
```

---

## Konsep Kunci

Membangun Web API enterprise membutuhkan kontrak HTTP yang jelas, validasi input yang ketat sebelum menyentuh database, serta struktur respons error yang terstandarisasi.

### Spring MVC & RestController
Anotasi `@RestController` adalah kombinasi dari `@Controller` dan `@ResponseBody`. Ini memberitahu Spring bahwa setiap method akan langsung mengembalikan payload data (seperti JSON) yang diserialisasi secara otomatis oleh pustaka Jackson tanpa rendering template HTML.

### Jakarta Bean Validation
Alih-alih menulis puluhan kondisi `if (req.getAmount() < 10000)` di dalam controller, kita menggunakan anotasi Jakarta Bean Validation pada DTO record (`@DecimalMin`, `@NotBlank`). Anotasi `@Valid` pada parameter controller memicu validasi otomatis sebelum kode method dijalankan. Jika validasi gagal, Spring langsung melempar `MethodArgumentNotValidException`.

### Standar RFC 7807 ProblemDetail di Spring Boot 3
Spring Boot 3 mengadopsi spesifikasi standar **RFC 7807 Problem Details** secara native melalui kelas `org.springframework.http.ProblemDetail`. Melalui `@RestControllerAdvice`, kita dapat memetakan pengecualian bisnis menjadi format error JSON yang seragam dengan field `type`, `title`, `status`, `detail`, dan properti kustom seperti `fieldErrors`.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda mengisi formulir penarikan tunai di bank. Jika Anda lupa menulis nomor rekening atau menulis angka penarikan Rp 0, teller di loket (Jakarta Validation) langsung menolak formulir Anda dan melingkari bagian yang salah dengan spidol merah, sebelum formulir itu sempat masuk ke meja manajer kredit.

## Eksperimen

- Kirim payload POST dengan nilai amount `5000` dan perhatikan bagaimana validasi `@DecimalMin` menolak request.
- Kirim amount di atas 50 juta dan amati payload ProblemDetail yang dihasilkan oleh `InsufficientBalanceException`.
- Tambahkan header `Content-Type: application/problem+json` pada pengujian REST client.

---

## Tantangan

Buat custom validator annotation `@ValidAccountNumber` yang memverifikasi checksum nomor rekening perbankan menggunakan algoritma Modulo 10 (Luhn Algorithm).

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

Kamu telah menguasai REST Controllers, Jakarta Validation, dan ProblemDetail RFC 7807. Level 1 selesai! Di Level 2 kita mempelajari Spring Security, Concurrency Locking, dan Kafka.
