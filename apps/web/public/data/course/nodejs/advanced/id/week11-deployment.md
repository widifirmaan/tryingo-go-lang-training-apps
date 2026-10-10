# Deployment & DevOps

> **Kategori:** Node.js | **Level:** Lanjutan | **Minggu 11:** Deployment & DevOps

## Tujuan Pembelajaran

- Docker: containerize aplikasi Node.js
- CI/CD pipeline: GitHub Actions, GitLab CI
- Process manager: PM2, Docker Compose
- Environment: production config, secrets
- Monitoring: logging, APM, health checks

---

## Program: CI/CD Pipeline

```javascript
console.log("=== Deployment Strategies ===");

console.log("\n1. Docker:");
console.log("  FROM node:18-alpine");
console.log("  WORKDIR /app");
console.log("  COPY package*.json ./");
console.log("  RUN npm ci --production");
console.log("  COPY . .");
console.log("  EXPOSE 3000");
console.log("  CMD ['node', 'server.js']");

console.log("\n2. Environment Variables:");
console.log("  NODE_ENV=production");
console.log("  npm ci (bukan npm install)");
console.log("  process.env.PORT || 3000");

console.log("\n3. CI/CD Pipeline:");
console.log("  1. Push to main branch");
console.log("  2. Run tests (npm test)");
console.log("  3. Build Docker image");
console.log("  4. Push to registry");
console.log("  5. Deploy to production");

console.log("\n4. Process Manager:");
console.log("  pm2 start server.js -i max");
console.log("  pm2 monit");
console.log("  pm2 logs");

console.log("\n5. Health Check:");
console.log("  GET /health -> { status: 'ok', uptime: process.uptime() }");

console.log("\n=== Monitoring ===");
console.log("  - Logging: Winston, Pino");
console.log("  - APM: New Relic, DataDog");
console.log("  - Uptime: Pingdom, UptimeRobot");
```

---

## Konsep Kunci

### Docker
Multi-stage build, alpine image, npm ci untuk reproducible.

### CI/CD
Automated test -> build -> deploy.

### PM2
Process manager dengan load balancing (cluster mode).

### Health Check
Endpoint untuk monitoring uptime dan status.

---

## Eksperimen

- Buat Dockerfile dengan multi-stage build
- Setup GitHub Actions workflow
- Implementasikan health check endpoint
- Setup Winston logging

---

## Tantangan

Deploy aplikasi Node.js ke cloud: Dockerize, setup CI/CD, monitoring, dan auto-scaling.

---

## Ringkasan

Minggu 11 dari 12: **Deployment & DevOps** (Level: Lanjutan). Minggu depan: **Capstone Project**!
