# Security Hardening: Rate Limiting, Header Security & Graceful Shutdown

> **Kategori:** Node.js Backend | **Level:** Advanced | **Minggu 9:** Security Hardening: Rate Limiting, Header Security & Graceful Shutdown
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Harden HTTP headers conforming to Helmet security standards (CSP, HSTS, `X-Content-Type-Options`).
- Implement rate-limiting algorithms: Token Bucket versus Leaky Bucket.
- Handle OS termination signals (`SIGTERM`, `SIGINT`) executing graceful connection draining.
- Deploy `unref()` on fallback shutdown timeouts preventing event loop hanging.

---

## Program: Node.js API Gateway Defense Stack with Token Bucket & Graceful Teardown

```javascript
import http from 'node:http';

// 1. In-Memory Token Bucket Rate Limiter
class TokenBucketRateLimiter {
  constructor(capacity = 5, refillRatePerSec = 1) {
    this.capacity = capacity;
    this.refillRate = refillRatePerSec;
    this.buckets = new Map();
  }

  isAllowed(clientId) {
    const now = Date.now();
    let bucket = this.buckets.get(clientId);

    if (!bucket) {
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(clientId, bucket);
    } else {
      // Tambahkan token berdasarkan waktu yang telah berlalu
      const elapsedSec = (now - bucket.lastRefill) / 1000;
      bucket.tokens = Math.min(this.capacity, bucket.tokens + elapsedSec * this.refillRate);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    return false;
  }
}

const rateLimiter = new TokenBucketRateLimiter(3, 1); // 3 token, isi ulang 1 token/detik

// 2. Server HTTP dengan Security Headers (Mirip modul Helmet)
const server = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress || '127.0.0.1';

  // Terapkan Security Headers Penting
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Periksa Rate Limiting
  if (!rateLimiter.isAllowed(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': '2' });
    return res.end(JSON.stringify({ error: 'TOO_MANY_REQUESTS', message: 'Rate limit terlampaui. Harap tunggu.' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ status: 'OK', message: 'Akses gateway diizinkan' }));
});

// 3. Graceful Shutdown Handlers (Mencegah Pemutusan Paksa Saat Deployment)
function setupGracefulShutdown(serverInstance) {
  const signals = ['SIGTERM', 'SIGINT'];

  signals.forEach((signal) => {
    process.on(signal, () => {
      console.log(`\n[SIGNAL RECEIVED: ${signal}] Memulai proses Graceful Shutdown...`);

      // Berhenti menerima koneksi baru
      serverInstance.close(() => {
        console.log('[HTTP SERVER CLOSED] Seluruh koneksi HTTP aktif telah diselesaikan.');
        // Tutup koneksi database / Redis di sini
        console.log('[RESOURCES RELEASED] Database pool & socket terputus bersih.');
        process.exit(0);
      });

      // Paksa shutdown jika proses tersangkut melebihi 10 detik
      setTimeout(() => {
        console.error('[FORCE EXIT] Waktu timeout shutdown habis. Memaksa proses keluar.');
        process.exit(1);
      }, 10000).unref();
    });
  });
}

setupGracefulShutdown(server);
console.log('=== GATEWAY DEFENSE STACK INITIALIZED (RATE LIMITER & SECURITY HEADERS) ===');
```

---

## Key Concepts

Public-facing backend applications constantly withstand distributed DDoS surges, cross-site script injections, and dropped client transactions during cluster rolling deployments.

### Critical Security Headers
- `X-Content-Type-Options: nosniff`: Inhibits browser MIME-sniffing, preventing executable scripts disguised as media uploads.
- `Content-Security-Policy (CSP)`: Enforces strict origin boundaries for scripts, stylesheets, and frames, neutralizing Cross-Site Scripting (XSS).
- `Strict-Transport-Security (HSTS)`: Compels clients to interact exclusively via encrypted HTTPS channels.

### Token Bucket Rate Limiting Mechanics
Unlike rigid fixed-window counters, the **Token Bucket** algorithm accommodates legitimate bursts: clients draw down accumulated tokens during traffic spikes while bounding sustainable long-term request rates via steady refill intervals.

### Graceful Shutdown in Cloud Orchestration
During rolling deployments, Kubernetes signals pods with `SIGTERM`. Abrupt process termination causes inflight HTTP calls to drop abruptly, generating 502 Bad Gateway errors. Graceful teardowns:
1. Cease accepting new inbound connections (`server.close()`).
2. Drain and complete all inflight requests.
3. Disconnect database pools and Redis sockets cleanly before exiting with code 0.


---

---

## Beginner Friendly Explanation

Imagine a cafe closing at 10 PM. The host flips the door sign to "CLOSED" (server.close) so no new patrons enter. However, customers already seated at tables are permitted to finish their meals and desserts comfortably before the kitchen turns off the lights (Graceful Shutdown).

## Experiments

- Issue 5 consecutive HTTP calls in 1 second and observe the 429 Too Many Requests payload.
- Emit a simulated `process.emit("SIGINT")` and trace the clean shutdown logs in the console.
- Audit response headers via `curl -I http://localhost:3000` to verify security headers.

---

## Challenge

Integrate a Redis-backed rate limiter (`INCR` and `EXPIRE`) sharing request quotas consistently across multi-pod container clusters.

---

## Syntax Cheatsheet & Quick Reference

| Syntax / Keyword | Purpose & Practical Pattern |
| :--- | :--- |
| **Declaration & Setup** | Initialize data structures, type constraints, and dependencies |
| **Core Processing** | Algorithm execution, control flow, and data transformation |
| **Defensive Validation** | Verify data invariants and handle errors explicitly |
| **Return / Output** | Deliver deterministic output ready for consumption |

---

## Common Pitfalls & Debugging Tips

### 1. Event Loop Blocking on Heavy Computation
- **Symptom / Issue:** Freezes response handling for all concurrent user requests.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Delegate CPU-heavy tasks to Worker Threads or external background queues.

### 2. Uncaught Asynchronous Exceptions
- **Symptom / Issue:** Kills the Node.js process abruptly and terminates the service.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Handle async errors with try-catch and attach `process.on('unhandledRejection')` handlers.

### 3. EventEmitter Listener Leak
- **Symptom / Issue:** Generates `MaxListenersExceededWarning` and leaks memory across long-lived servers.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Detach obsolete event handlers using `emitter.off()` or `emitter.removeListener()`.

---

## Summary

You have mastered Security Headers, Token Bucket Rate Limiting, and Graceful Shutdown. Next week is our Final Capstone: High-Throughput Real-Time Telemetry & Notification Gateway!
