# Async & Scheduling

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 12:** Async & Scheduling

## Learning Objectives

- @Scheduled for scheduled tasks
- Cron expressions for scheduling
- fixedRate vs fixedDelay
- @Async for asynchronous execution
- CompletableFuture for async returns

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

## Key Concepts

### @Scheduled
Automated scheduled tasks with cron expressions.

### Cron Expressions
Flexible scheduling with standard cron format.

### fixedRate vs fixedDelay
fixedRate: interval from start. fixedDelay: interval from completion.

### @Async
Methods run in separate thread pool.

### CompletableFuture
Return values from async methods.

---

## Experiments

- Create scheduled task with cron expression
- Experiment with fixedRate vs fixedDelay
- Try @Async with CompletableFuture
- Create async method with exception handling
- Experiment with custom TaskScheduler

---

## Challenge

Build a reporting system: scheduled task generates report every hour, async processing, email notification.

---

## Summary

Week 12 of 14: **Async & Scheduling** (Level: Advanced). Background processing. Next week: **Deployment**.
