# Actions & Forms

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 7:** Actions & Forms

## Tujuan Pembelajaran

- Form actions: ?/create, ?/delete
- +page.server.js untuk server actions
- Form data dengan request.formData()
- Enhance form untuk progressive enhancement
- Return data dari action

---

## Program: Form & API

```svelte
<!-- SvelteKit Actions: form submission ke server -->
<!-- +page.server.js -->
// export const actions = {
//   create: async ({ request }) => {
//     const data = await request.formData();
//     const name = data.get('name');
//     return { success: true, message: 'Berhasil' };
//   }
// };
<!-- +page.svelte (Form) -->
<script>
  export let form; // hasil dari action
</script>
<form method="POST" action="?/create">
  <input name="name" placeholder="Nama">
  <button type="submit">Simpan</button>
</form>
{#if form?.success}<p>{form.message}</p>{/if}
```

---

## Konsep Kunci

### Actions
+page.server.js: actions object. ?/create = create action.

### Form Data
request.formData() = parse form submission.

### Progressive Enhancement
Tanpa JS tetap jalan. Dengan JS lebih baik.

---

## Eksperimen

- Buat form dengan multiple actions
- Implementasikan form validation server-side
- Tambah enhance untuk no-reload
- Buat delete confirmation

---

## Tantangan

Buat CRUD app dengan SvelteKit actions: create, read, update, delete posts.

---

## Ringkasan

Minggu 7 dari 10: **Actions & Forms** (Level: Menengah). Minggu depan: **Lifecycle & Context**.
