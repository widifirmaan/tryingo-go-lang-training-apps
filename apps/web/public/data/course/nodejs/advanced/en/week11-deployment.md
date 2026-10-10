# Deployment & DevOps

> **Kategori:** Node.js | **Level:** Advanced | **Minggu 11:** Deployment & DevOps

## Learning Objectives

- Docker: containerize Node.js applications
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

## Key Concepts

### Docker
Multi-stage builds with Alpine.

### CI/CD
Automated pipelines.

### PM2
Process management.

### Health Checks
Uptime monitoring.

---

## Experiments

- Create Dockerfile with multi-stage build
- Setup GitHub Actions workflow
- Implement health check endpoint
- Setup Winston logging

---

## Challenge

Deploy Node.js app to cloud: Dockerize, setup CI/CD, monitoring, and auto-scaling.

---

## Summary

Week 11 of 12: **Deployment & DevOps** (Level: Advanced). Next week: **Capstone Project**!
