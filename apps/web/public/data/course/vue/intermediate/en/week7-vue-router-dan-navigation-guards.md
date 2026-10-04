# Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)

> **Kategori:** Vue | **Level:** Composables, Pinia & Vue Router | **Minggu 7:** Vue Router 4: Dynamic Routes, Nested Routes & Navigation Guards (beforeEach)
> ⏱️ **Estimated Time:** 45 Minutes (15m theory, 30m practice) | 🔗 **Pace:** Structured (Step-by-step)


## Learning Objectives

- Configure Vue Router 4 utilizing clean HTML5 createWebHistory() sans hash (#) symbols
- Enforce route-level Lazy Loading with dynamic import expressions () => import(...) shrinking startup bundles
- Attach route meta fields encoding authorization claims (requiresAuth, role)
- Harden sensitive route boundaries deploying Global Navigation Guards (router.beforeEach)
- Inject dynamic URL parameters (:id) directly as component props via props: true

---

## Program: Enterprise CRM Navigation with RBAC Route Guards & Lazy Loading

```js
// ============================================================================
// File: router/index.js (Vue Router 4 dengan Navigasi Proteksi RBAC)
// ============================================================================
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/LoginView.vue"), // Lazy Loading Chunk
    meta: { public: true }
  },
  {
    path: "/",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardView.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/leads/:id",
    name: "LeadDetail",
    component: () => import("../views/LeadDetailView.vue"),
    props: true, // Inject route.params.id langsung sebagai props komponen!
    meta: { requiresAuth: true, role: "SALES" }
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation Guard Global: Berjalan sebelum setiap perpindahan halaman
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("nusa_crm_token");
  const userRole = localStorage.getItem("nusa_crm_role") || "GUEST";

  console.log(`[Router Guard] Navigasi dari ${from.path} menuju ${to.path}`);

  if (to.meta.requiresAuth && !token) {
    // Belum login: Lempar ke login
    next({ name: "Login", query: { redirect: to.fullPath } });
  } else if (to.meta.role && to.meta.role !== userRole && userRole !== "ADMIN") {
    // Role tidak mencukupi
    alert("Akses Ditolak: Anda tidak memiliki izin untuk halaman ini.");
    next(false); // Batalkan navigasi
  } else {
    next(); // Izinkan navigasi berlanjut
  }
});

export default router;
```

---

## Key Concepts

### Single Page Application (SPA) Routing
Within SPAs, route transitions never trigger hard full-page browser refreshes. Vue Router intercepts link clicks, mutates the URL bar through the HTML5 History API, and dynamically swaps view components inside `<RouterView />`.

### Route-Level Lazy Loading
Avoid importing all view templates statically at the head of your router configuration.
Writing `component: () => import('../views/Detail.vue')` instructs Vite to split that view into an isolated JavaScript chunk. The browser downloads the chunk on-demand only when a user navigates to that path!

### The Power of `router.beforeEach`
Navigation guards serve as identity gates. You evaluate JWT tokens before allowing routes like `/dashboard` to mount. Unauthenticated visitors redirect to `/login` immediately without exposing confidential views.

---

---

## Beginner Friendly Explanation

### Analogy: Smart Elevator Terminals & VIP Access Checkpoints
1. **Vue Router** is a high-speed elevator terminal in a skyscraper: pressing floor 14 whisks you to floor 14 without leaving the building to re-enter the front revolving door.
2. **beforeEach Guard** is a security guard stationed before executive elevator banks: before doors open onto the boardroom floor (*admin route*), security inspects badges (*meta.requiresAuth*). Invalid badges send passengers back down to the lobby.

## Experiments

- Navigate to /dashboard lacking localStorage tokens to observe automated redirection to /login.
- Simulate successful login by setting localStorage.setItem("nusa_crm_token", "jwt") and reload dashboard.
- Navigate to /leads/L-101 and verify the view component receives prop id = "L-101" directly.
- Hit an unmapped URL path to verify the catch-all NotFound wildcard route renders.

---

## Challenge

Integrate a visual top-bar loading indicator using NProgress triggered across `router.beforeEach` (start) and `router.afterEach` (done) hooks.

---

## Visual Mental Model & Architecture Flow

![Diagram Reaktivitas Komponen & Data Flow Vue](/diagrams/react-data-flow.svg)

```diagram
┌──────────────────────────────────────────────────────────┐
│ PROXY REAKTIVITAS VUE 3                                  │
│                                                          │
│  State: ref(0) / reactive({...})                         │
│       │                                                  │
│       ▼ (Trigger Mutation)                               │
│  Effect Dependency Tracker                               │
│       │                                                  │
│       ▼                                                  │
│  Virtual DOM Diffing & Patching ──► Real DOM Re-render   │
└──────────────────────────────────────────────────────────┘
```

---

## Syntax Reference & Practical Guide (W3Schools Style)

Here is the comprehensive breakdown of syntax signatures, parameters, return behavior, and isolated runnable examples introduced in this module:

### 1. `const count = ref(0)`
- **Core Functionality:** State reaktif primitif Vue 3.
- **Parameters / Attributes:** `initialValue`.
- **System Behavior & Return:** Membungkus nilai ke dalam Reactive Ref. Di script diakses via `.value`, di template otomatis di-unwrap..
- **Practical Code Example:**
```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
</script>
```
- **Expected Execution Output:**
```text
Nilai count bertambah secara reaktif
```

### 2. `const double = computed(() => count.value * 2)`
- **Core Functionality:** Komputasi nilai turunan ber-cache.
- **Parameters / Attributes:** `Getter function`.
- **System Behavior & Return:** Menghitung nilai baru secara otomatis hanya ketika dependensi reaktifnya berubah..
- **Practical Code Example:**
```vue
<script setup>
import { ref, computed } from 'vue';
const count = ref(5);
const double = computed(() => count.value * 2);
</script>
```
- **Expected Execution Output:**
```text
double otomatis bernilai 10
```

### 3. `defineProps<{ title: string }>()`
- **Core Functionality:** Declaration of kontrak Props komponen anak.
- **Parameters / Attributes:** `Generic Type Schema`.
- **System Behavior & Return:** Menerima kiriman data dari parent komponen dengan validasi tipe statis..
- **Practical Code Example:**
```vue
<script setup>
defineProps<{
  title: string;
  inStock?: boolean;
}>();
</script>
```
- **Expected Execution Output:**
```text
Komponen siap menerima atribut title dari parent
```

### 4. `v-model="message"`
- **Core Functionality:** Two-way data binding dua arah.
- **Parameters / Attributes:** `Target state variable`.
- **System Behavior & Return:** Menghubungkan nilai elemen input form dengan state JavaScript secara sinkron..
- **Practical Code Example:**
```vue
<template>
  <input v-model="username" placeholder="Ketik nama..." />
  <p>Halo, {{ username }}</p>
</template>
```
- **Expected Execution Output:**
```text
Input teks sinkron seketika ke paragraf tampilan
```

---

## Common Pitfalls & Debugging Tips

### 1. Destructuring Loss of Reactivity
- **Symptom / Issue:** Unpacking fields from `reactive()` breaks Vue reactivity linkage.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Apply `toRefs(state)` prior to destructuring inside the Composition API.

### 2. Directly Mutating Child Component Props
- **Symptom / Issue:** Generates console warnings and violates unidirectional data flow.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Emit events `emit('update:modelValue', value)` back to the parent component.

### 3. Omitting `.value` in Script Setup
- **Symptom / Issue:** Passes the wrapper Ref object instead of the underlying value into calculations.
- **Root Cause:** Common mistaken assumptions during early development.
- **Fix / Best Practice:** Remember `.value` is mandatory in script blocks and auto-unwrapped in `<template>`.

---

## Summary

You have mastered Vue Router 4, lazy loading, and navigation guards. Next week, we enter Level 3: Advanced Slots, Teleport, and CRM Capstone.
