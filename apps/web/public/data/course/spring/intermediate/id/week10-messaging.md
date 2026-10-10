# Messaging

> **Kategori:** Spring Boot | **Level:** Menengah | **Minggu 10:** Messaging

## Tujuan Pembelajaran

- Spring Events: ApplicationEventPublisher dan @EventListener
- @Async untuk asynchronous method execution
- CompletableFuture untuk async return value
- RabbitMQ integration dengan Spring AMQP
- Event-driven architecture pattern

---

## Program: Async & Events

```java
// File: OrderEvent.java
package com.example.demo.event;

public record OrderEvent(Long orderId, String status, String customerEmail) {}

// File: OrderEventPublisher.java
/*
@Component
public class OrderEventPublisher {

    private final ApplicationEventPublisher eventPublisher;

    public OrderEventPublisher(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void publishOrderCreated(OrderEvent event) {
        eventPublisher.publishEvent(event);
    }
}
*/

// File: OrderEventListener.java
/*
@Component
public class OrderEventListener {

    @EventListener
    @Async
    public void handleOrderCreated(OrderEvent event) {
        System.out.println("Order created: " + event.orderId());
        // Kirim email notifikasi
    }

    @EventListener
    public void handleOrderCancelled(OrderEvent event) {
        System.out.println("Order cancelled: " + event.orderId());
        // Refund payment
    }
}
*/

// File: AsyncConfig.java
/*
@Configuration
@EnableAsync
public class AsyncConfig {

    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}
*/

// File: AsyncService.java
/*
@Service
public class NotificationService {

    @Async
    public CompletableFuture<String> sendEmail(String to, String subject) {
        // Simulasi kirim email
        Thread.sleep(1000);
        return CompletableFuture.completedFuture("Email sent to " + to);
    }

    @Async
    public void sendSMS(String phone, String message) {
        // Simulasi kirim SMS
        System.out.println("SMS sent to " + phone);
    }
}
*/

// Dependencies:
/*
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
*/
```

---

## Konsep Kunci

### Spring Events
Event-driven communication antar component. `publishEvent()` dan `@EventListener`.

### @Async
Method dijalankan di thread terpisah. Return void atau CompletableFuture.

### CompletableFuture
Representasi hasil async. `completedFuture()`, `supplyAsync()`.

### RabbitMQ
Message broker untuk async communication. `@RabbitListener` untuk consume.

### Event-Driven
Loose coupling antar component. Event publisher tidak tahu siapa listener.

---

## Eksperimen

- Buat custom event dan listener
- Eksperimen dengan @Async dan CompletableFuture
- Coba RabbitMQ dengan @RabbitListener
- Buat event-driven order processing
- Eksperimen dengan transactional events

---

## Tantangan

Buat sistem order dengan event-driven: OrderCreated event, email notification listener, SMS notification listener.

---

## Ringkasan

Minggu 10 dari 14: **Messaging** (Level: Menengah). Selesai fase Intermediate! Minggu depan: **Caching** (Advanced).
