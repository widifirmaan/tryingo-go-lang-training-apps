# Real-Time Reactivity: Turbo Streams & Rails 8 Solid Cable

> **Kategori:** Ruby on Rails 8 | **Level:** Intermediate | **Minggu 5:** Real-Time Reactivity: Turbo Streams & Rails 8 Solid Cable
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Master Turbo Stream DOM action primitives: `append`, `prepend`, `replace`, `update`, and `remove`.
- Understand Rails 8 Solid Cable (high-throughput database-backed WebSockets retiring Redis dependencies).
- Deploy the `broadcasts_to` model macro provisioning instant multi-user reactivity in one line of code.
- Construct collaborative real-time team interfaces with zero client-side JavaScript overhead.

---

## Program: Multi-User Collaborative Task Board with Turbo Streams & Solid Cable

```ruby
# app/models/task.rb (Real-Time Broadcasting Lifecycle Callbacks)
class Task < ApplicationRecord
  belongs_to :project

  # Rails 8: Otomatis broadcast pembaruan ke seluruh browser tim via Solid Cable!
  # Action: append (tambah ke list), replace (update kartu), remove (hapus dari DOM)
  broadcasts_to ->(task) { [task.project, :tasks] }, inserts_by: :prepend

  # broadcasts_to setara dengan:
  # after_create_commit  -> { broadcast_prepend_to [project, :tasks], target: "tasks_list" }
  # after_update_commit  -> { broadcast_replace_to [project, :tasks] }
  # after_destroy_commit -> { broadcast_remove_to  [project, :tasks] }
end

# app/views/projects/show.html.erb (Berlangganan Stream WebSocket)
# Tag turbo_stream_from membuka koneksi WebSocket Solid Cable di background
<%= turbo_stream_from @project, :tasks %>

<div class="kanban-board">
  <h2>Daftar Tugas Proyek: <%= @project.name %></h2>

  <!-- Kontainer tempat tugas baru otomatis disisipkan secara real-time -->
  <div id="tasks_list" class="space-y-2">
    <%= render @project.tasks %>
  </div>
</div>

# Format Respons Turbo Stream di Controller (tasks_controller.rb):
# respond_to do |format|
#   format.turbo_stream
#   format.html { redirect_to @project }
# end

puts "=== RAILS 8 SOLID CABLE & TURBO STREAMS BROADCASTING ACTIVE ==="
```

---

## Key Concepts

Historically, provisioning multi-user collaborative reactivity (live chat, collaborative Kanban boards) mandated complex Redis clusters, third-party Pusher subscriptions, and labyrinthine client state machinery (Redux/Zustand).

### The Rails 8 Solid Cable Revolution
Rails 8 introduces **Solid Cable**: a high-throughput, database-backed WebSocket architecture executing directly atop PostgreSQL or SQLite via modern non-blocking I/O polling. It **retires the requirement for Redis** merely to operate real-time WebSockets!

### Zero-JS Reactivity with broadcasts_to
Appending a single line to the Task model:
`broadcasts_to ->(task) { [task.project, :tasks] }`
orchestrates continuous reactivity. When Member A inserts or mutates a task on their workstation, Active Record lifecycle hooks dispatch a Turbo Stream payload through Solid Cable to Member B across the globe. Member B's browser updates its local DOM tree in single-digit milliseconds—powered by 100% server-rendered HTML!


---

---

## Beginner Friendly Explanation

Imagine an international airport departure board. When a flight transitions to "Boarding", gate agents do not walk up to 2,000 waiting passengers individually. The master electronic flight board (Solid Cable & Turbo Streams) flashes from yellow to green before everyone's eyes simultaneously.

## Experiments

- Open two browser windows displaying the same project: create a task in Window A and watch it materialize in Window B.
- Audit the browser Network WS tab inspecting incoming Turbo Stream HTML fragment frames.
- Execute `task.broadcast_replace_to(...)` inside `bin/rails console` updating live browser viewports from your terminal.

---

## Challenge

Add a Turbo Stream toast alert: when a team member shifts a task to "Completed", stream a green toast banner to the bottom-right corner of all online peer screens.

---

## Visual Mental Model & Architecture Flow

```diagram
┌──────────────┐      Call Stack Empty?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Frames)│                             │  (Coordinator) │
└──────┬───────┘                             └───────▲────────┘
       │ Async Operations (Fetch / Timer)            │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Ready ──────►  │ TASK / PROMISE │
│ (Background) │                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const / let variables`
- **Core Functionality:** Modern block-scoped variable declarations.
- **Parameters / Attributes:** `Identifier, Initial Value`.
- **System Behavior & Return:** `const` defines immutable references; `let` defines reassignable state variables bounded to enclosing blocks.
- **Practical Code Example:**
```javascript
const title = 'Tryngo Learning';
let counter = 0;
counter += 1;
console.log(title, counter);
```
- **Expected Execution Output:**
```text
Tryngo Learning 1
```

### 2. `() => { ... } (Arrow Function)`
- **Core Functionality:** Compact function expression with lexical 'this'.
- **Parameters / Attributes:** `Parameters, Function Body`.
- **System Behavior & Return:** Provides concise function syntax while retaining the lexical `this` binding of the outer enclosing scope.
- **Practical Code Example:**
```javascript
const double = (n) => n * 2;
console.log(double(21));
```
- **Expected Execution Output:**
```text
42
```

### 3. `async / await & fetch(url)`
- **Core Functionality:** Linear asynchronous Promise resolution.
- **Parameters / Attributes:** `URL string, RequestInit options`.
- **System Behavior & Return:** Author asynchronous asynchronous workflows sequentially without callback pyramids.
- **Practical Code Example:**
```javascript
async function getUser(id) {
  const res = await fetch(`https://api.example.com/users/${id}`);
  return await res.json();
}
```
- **Expected Execution Output:**
```text
Returns resolved JSON object from server
```

### 4. `Array.prototype.map() / filter()`
- **Core Functionality:** Pure functional array transformation.
- **Parameters / Attributes:** `callback(item, index, array)`.
- **System Behavior & Return:** `map` returns transformed values; `filter` removes non-matching elements without mutating the original array.
- **Practical Code Example:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);
```
- **Expected Execution Output:**
```text
[2, 4]
```


---

## Common Pitfalls & Debugging Tips

### 1. N+1 Active Record Queries
- **Symptom / Issue:** Iterating through associations fires repeated queries per record.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Eager load required associations using `includes(:association)`.

### 2. Irreversible Database Migrations
- **Symptom / Issue:** Running `rails db:rollback` fails when migration direction is ambiguous.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Write explicit `up` and `down` migration methods for complex column changes.

### 3. Checking Secrets into Public Version Control
- **Symptom / Issue:** Third-party tokens and database credentials get leaked.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Use encrypted credentials via `rails credentials:edit`.

---

## Summary

You have mastered Turbo Streams and Rails 8 Solid Cable WebSockets. Next week we explore client-side interactivity with Stimulus JS.
