# Async & Scheduling

> **Kategori:** Spring Boot | **Level:** Lanjutan | **Minggu 12:** Async & Scheduling

## Tujuan Pembelajaran

- @Scheduled untuk task berjadwal
- Cron expression untuk scheduling
- fixedRate vs fixedDelay
- @Async untuk asynchronous execution
- CompletableFuture untuk async return

---

## Program: Scheduled Tasks

```java
// File: ScheduledTasks.java
package com.example.demo.scheduler;

import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
@EnableScheduling
@EnableAsync
public class ScheduledTasks {

    // Fixed rate: setiap 5 detik
    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        System.out.println("Waktu sekarang: " + java.time.LocalDateTime.now());
    }

    // Cron expression: setiap jam
    @Scheduled(cron = "0 0 * * * *")
    public void hourlyTask() {
        System.out.println("Task jam dieksekusi");
    }

    // Fixed delay: 3 detik setelah selesai
    @Scheduled(fixedDelay = 3000, initialDelay = 1000)
    public void cleanupTask() {
        System.out.println("Cleanup dijalankan");
    }

    // Async method
    @Async
    public CompletableFuture<String> processOrder(Long orderId) {
        // Simulasi proses async
        try { Thread.sleep(2000); } catch (InterruptedException e) {}
        return CompletableFuture.completedFuture("Order " + orderId + " processed");
    }

    @Async
    public void sendNotification(String message) {
        System.out.println("Notification: " + message);
    }
}

// File: AsyncService.java
/*
@Service
public class ReportService {

    @Async
    public CompletableFuture<Report> generateReport() {
        // Simulasi generate report yang lama
        Report report = new Report();
        // ... proses lama ...
        return CompletableFuture.completedFuture(report);
    }
}
*/

// Cron Expression Format:
// second minute hour day month weekday
// "0 0 * * * *" — setiap jam
// "0 0 0 * * *" — setiap hari tengah malam
// "0 */5 * * * *" — setiap 5 menit
```

---

## Konsep Kunci

### @Scheduled
Task berjadwal otomatis. Cron expression untuk fleksibilitas.

### Cron Expression
`second minute hour day month weekday`. `*` = setiap, `*/5` = setiap 5.

### fixedRate vs fixedDelay
- fixedRate: interval tetap dari start
- fixedDelay: interval dari selesai

### @Async
Method dijalankan di thread pool terpisah.

### CompletableFuture
Return value dari async method.

---

## Eksperimen

- Buat scheduled task dengan cron expression
- Eksperimen dengan fixedRate vs fixedDelay
- Coba @Async dengan CompletableFuture
- Buat async method dengan exception handling
- Eksperimen dengan custom TaskScheduler

---

## Tantangan

Buat sistem reporting: scheduled task generate report setiap jam, async process, email notification.

---

## Ringkasan

Minggu 12 dari 14: **Async & Scheduling** (Level: Lanjutan). Background processing. Minggu depan: **Deployment**.
