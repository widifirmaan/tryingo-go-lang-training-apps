# Capstone: Enterprise API

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 12:** Capstone: Enterprise API

## Learning Objectives

- Combine all concepts: Controllers, Services, Modules, DI
- Auth: JWT, Guards, Roles
- Database: TypeORM, Relations, Migrations
- Real-time: WebSocket notifications
- Testing: Unit + E2E, Deployment: Docker

---

## Program: Task Management API

```javascript
console.log('=== Capstone: Task Management API ===');
console.log('Menggabungkan semua konsep NestJS');
console.log('');

const project = {
  name: 'Task Management API',
  features: [
    'Users: register, login, JWT auth, roles',
    'Projects: CRUD, members, permissions',
    'Tasks: CRUD, assignee, status, priority',
    'Comments: nested comments on tasks',
    'Notifications: real-time via WebSocket',
    'File uploads: task attachments',
    'Search: full-text search across tasks',
    'Pagination: cursor-based pagination',
    'Caching: Redis for frequent queries',
    'Testing: unit + e2e with 85%+ coverage',
  ],
};

console.log('Features:');
for (const f of project.features) console.log('  - ' + f);

console.log('');
console.log('=== Architecture ===');
console.log('AppModule');
console.log('  |-- AuthModule (JWT, Guards)');
console.log('  |-- UsersModule (CRUD, Roles)');
console.log('  |-- ProjectsModule (CRUD, Members)');
console.log('  |-- TasksModule (CRUD, Comments)');
console.log('  |-- NotificationsModule (WebSocket)');
console.log('  |-- DatabaseModule (TypeORM)');
console.log('  |-- CacheModule (Redis)');
console.log('');
console.log('=== API Endpoints ===');
const endpoints = [
  { method: 'POST', path: '/auth/register', desc: 'Register' },
  { method: 'POST', path: '/auth/login', desc: 'Login, get JWT' },
  { method: 'GET', path: '/projects', desc: 'List projects' },
  { method: 'POST', path: '/projects', desc: 'Create project' },
  { method: 'GET', path: '/projects/:id/tasks', desc: 'List tasks' },
  { method: 'POST', path: '/tasks', desc: 'Create task' },
  { method: 'PATCH', path: '/tasks/:id/status', desc: 'Update status' },
];
for (const e of endpoints) console.log('  ' + e.method + ' ' + e.path + ' -> ' + e.desc);
console.log('');
console.log('=== Deployment ===');
console.log('  Docker + Docker Compose');
console.log('  CI/CD: GitHub Actions');
console.log('  Monitoring: PM2 + Winston');
console.log('  Database: PostgreSQL');
```

---

## Key Concepts

### Architecture
Modular domain-driven design.

### Auth
JWT + Guards + Roles.

### Database
TypeORM with relations.

### Real-time
WebSocket notifications.

### Testing
Unit + E2E tests.

---

## Experiments

- Add file upload with S3
- Implement full-text search with Elasticsearch
- Create event-driven architecture with RabbitMQ
- Add API rate limiting and throttling

---

## Challenge

Build complete Task Management API: auth, projects, tasks, notifications, tests, Docker.

---

## Summary

Week 12 of 12: **Capstone: Enterprise API** (Level: Advanced). Complete! You've mastered NestJS from scratch to production-ready.
