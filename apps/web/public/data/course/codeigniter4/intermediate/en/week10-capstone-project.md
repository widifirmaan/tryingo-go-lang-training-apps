# Capstone: Task Management API

> **Kategori:** CodeIgniter 4 | **Level:** Intermediate | **Minggu 10:** Capstone: Task Management API

## Learning Objectives

- Combine all concepts: MVC, validation, auth, REST, testing
- Task management domain: users, tasks, categories
- Full CRUD API with authentication
- Validation: task title, due date, status
- Testing: feature tests for all endpoints

---

## Program: Task Manager

```php
<?php
echo "=== Capstone: Task Management API ===<br><br>";

echo "=== Architecture ===<br>";
echo "Models: User, Task, Category<br>";
echo "Controllers: AuthController, TaskController, CategoryController<br>";
echo "Filters: AuthFilter, AdminFilter<br>";
echo "Migrations: users, tasks, categories<br>";
echo "Seeds: UserSeeder, TaskSeeder<br><br>";

echo "=== Features ===<br>";
echo "✓ User registration & login<br>";
echo "✓ JWT/Session authentication<br>";
echo "✓ CRUD tasks with validation<br>";
echo "✓ Task categories<br>";
echo "✓ Filter by status (pending/done)<br>";
echo "✓ Due date management<br>";
echo "✓ RESTful API endpoints<br>";
echo "✓ JSON responses<br>";
echo "✓ Testing (Feature + Unit)<br><br>";

echo "=== API Endpoints ===<br>";
$endpoints = [
    "POST /api/register" => "Register",
    "POST /api/login" => "Login",
    "GET /api/tasks" => "List tasks",
    "POST /api/tasks" => "Create task",
    "GET /api/tasks/(:num)" => "Task detail",
    "PUT /api/tasks/(:num)" => "Update task",
    "DELETE /api/tasks/(:num)" => "Delete task",
    "PATCH /api/tasks/(:num)/complete" => "Mark complete",
];

foreach ($endpoints as $endpoint => $desc) {
    echo "  $endpoint — $desc<br>";
}

echo "<br>=== Task Flow ===<br>";
echo "1. User registers → POST /api/register<br>";
echo "2. User logs in → POST /api/login → get token<br>";
echo "3. Create task → POST /api/tasks (with auth)<br>";
echo "4. List tasks → GET /api/tasks<br>";
echo "5. Update task → PUT /api/tasks/1<br>";
echo "6. Mark complete → PATCH /api/tasks/1/complete<br>";
echo "7. Delete task → DELETE /api/tasks/1<br><br>";

echo "=== Test Coverage ===<br>";
echo "✓ Auth: register, login, logout<br>";
echo "✓ Tasks: CRUD, validation errors<br>";
echo "✓ Filter: unauthorized access<br>";
echo "✓ Database: insert, update, delete<br>";
>
```

---

## Key Concepts

### Architecture
MVC + Filters. Controller → Model → Database. Auth filter protects routes.

### Task Flow
Register → Login → CRUD tasks → Filter/complete → Delete.

### Auth
Session-based or JWT. Filter protects task routes.

### Validation
Title required, due date valid, status in (pending/done).

### Testing
Feature test: `$this->post('/api/tasks', [...])`. Assert status, JSON, database.

---

## Experiments

- Add task priority (low/medium/high)
- Implement task search
- Create task statistics endpoint
- Add file attachment for tasks
- Create API documentation

---

## Challenge

Build a complete task management API: auth, CRUD tasks, categories, filtering, testing. Deploy to production.

---

## Summary

Week 10 of 10: **Capstone: Task Management API** (Level: Intermediate). Complete! 🎉 You've mastered CodeIgniter 4 from basics to production.
