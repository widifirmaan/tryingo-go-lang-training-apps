# Capstone: Enterprise API

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 12:** Capstone: Enterprise API

## Tujuan Pembelajaran

- Menggabungkan semua konsep: Controllers, Services, Modules, DI
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

## Konsep Kunci

### Arsitektur
Modular: setiap domain (Users, Projects, Tasks) punya module sendiri.

### Auth
JWT + Guards + Roles untuk protect routes.

### Database
TypeORM dengan relations dan migrations.

### Real-time
WebSocket untuk notifications.

### Testing
Unit test untuk services, E2E untuk endpoints.

---

## Eksperimen

- Tambah file upload dengan S3
- Implementasikan full-text search dengan Elasticsearch
- Buat event-driven architecture dengan RabbitMQ
- Tambah API rate limiting dan throttling

---

## Tantangan

Buat Task Management API lengkap: auth, projects, tasks, notifications, tests, Docker.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: Enterprise API** (Level: Lanjutan). Selesai! Anda sudah menguasai NestJS dari nol hingga production-ready.
