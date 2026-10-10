# Lifecycle & Watchers

> **Kategori:** Vue | **Level:** Menengah | **Minggu 7:** Lifecycle & Watchers

## Tujuan Pembelajaran

- onMounted: fetch data setelah komponen muncul
- onUnmounted: cleanup (unsubscribe, clear timer)
- watch: reaktif terhadap specific data changes
- watchEffect: auto-track dependencies
- Lifecycle: onUpdated, onBeforeMount

---

## Program: Data Fetching

```vue
// Lifecycle hooks = functions di tahap tertentu lifecycle komponen
const { createApp, ref, onMounted, onUnmounted, watch, watchEffect } = Vue;
const app = createApp({
  setup() {
    const users = ref([]); const loading = ref(true); const search = ref(''); const filteredUsers = ref([]);
    onMounted(() => { console.log('Mounted!'); fetchUsers(); });
    onUnmounted(() => { console.log('Unmounted!'); });
    watch(search, (newVal) => { filteredUsers.value = users.value.filter((u) => u.name.toLowerCase().includes(newVal.toLowerCase())); });
    watchEffect(() => { console.log('Search:', search.value); });
    function fetchUsers() { setTimeout(() => { users.value = [{ id: 1, name: 'Budi' }, { id: 2, name: 'Siti' }]; loading.value = false; }, 1000); }
    return { users, loading, search, filteredUsers };
  },
});
app.mount('#app');
console.log('Lifecycle & Watchers siap digunakan');
```

---

## Konsep Kunci

### Lifecycle Hooks
onMounted = setelah mount (fetch data).
onUnmounted = sebelum unmount (cleanup).

### Watch
Specific: watch(source, callback).

### WatchEffect
Auto-track semua dependencies.

---

## Eksperimen

- Buat timer dengan onMounted/onUnmounted
- Implementasikan debounce search
- Watch nested object dengan deep: true
- Bandingkan watch vs watchEffect

---

## Tantangan

Buat user directory: fetch users, search filter, loading state, error handling.

---

## Ringkasan

Minggu 7 dari 12: **Lifecycle & Watchers** (Level: Menengah). Minggu depan: **Provide/Inject & Teleport**.
