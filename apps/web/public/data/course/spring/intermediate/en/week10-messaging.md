# Messaging

> **Kategori:** Spring Boot | **Level:** Intermediate | **Minggu 10:** Messaging

## Learning Objectives

- Spring Events: ApplicationEventPublisher and @EventListener
- @Async for asynchronous method execution
- CompletableFuture for async return values
- RabbitMQ integration with Spring AMQP
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

## Key Concepts

### Spring Events
Event-driven communication between components.

### @Async
Methods run in separate threads.

### CompletableFuture
Represent asynchronous results.

### RabbitMQ
Message broker for async communication.

### Event-Driven
Loose coupling between publishers and listeners.

---

## Experiments

- Create custom events and listeners
- Experiment with @Async and CompletableFuture
- Try RabbitMQ with @RabbitListener
- Create event-driven order processing
- Experiment with transactional events

---

## Challenge

Build an order system with event-driven architecture: OrderCreated event, email notification listener, SMS notification listener.

---

## Summary

Week 10 of 14: **Messaging** (Level: Intermediate). Intermediate phase complete! Next week: **Caching** (Advanced).
