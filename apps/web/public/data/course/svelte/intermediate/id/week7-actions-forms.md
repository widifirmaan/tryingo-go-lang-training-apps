# Actions & Forms

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 7:** Actions & Forms

## Tujuan Pembelajaran

- Form actions: ?/create, ?/delete
- +page.server.js untuk server actions
- Form data dengan request.formData()
- Enhance form untuk progressive enhancement
- Return data dari action

---

## Program: Actions pada +page.server.ts

Progressive enhancement: formulir tetap bekerja tanpa JavaScript berkat action di server.

```svelte
<!-- src/routes/checkout/+page.server.ts -->
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString() ?? '';
    const qty = Number(data.get('qty') ?? 0);

    if (!name) return fail(400, { error: 'Nama wajib diisi' });
    if (qty < 1 || qty > 50) return fail(400, { error: 'Qty 1-50' });

    // ... simpan ke database ...
    return { success: true, orderId: 'TR-1201' };
  },
};

<!-- src/routes/checkout/+page.svelte -->
<script>
  let { form } = $props();     // hasil kembalian action (terbaru)
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="POST" use:enhance>
  <input name="name" placeholder="Nama penerima" />
  <input name="qty" type="number" min="1" max="50" value="1" />
  <button>Kirim Pesanan</button>
</form>
```

---

## Konsep Kunci

### Named vs default actions

actions = { default } untuk satu form; `actions = { update, delete }` untuk beberapa form: action="/checkout?/update".

### fail() vs redirect

fail(400, { error }) mempertahankan halaman + mengirim data validasi ke `form`; redirect() pergi ke URL lain.

### use:enhance

SvelteKit mengintervensi submit form: tidak reload, mengelola loading state, dan mengirim kembali hasil action variable ke `form`.

### Progressive enhancement

Tanpa JavaScript form tetap berjalan (server action + reload penuh); dengan JS, use:enhance membuatnya halus tanpa reload.

---

## Eksperimen

- Tambahkan action ?/gift dengan tombol form terpisah.
- Validasi qty terhadap stok palsu (hardcode 999) di dalam action.
- Tombol kirim dimatikan bila masih pending.

---

## Tantangan

Rancang wizard dua langkah: action kedua ?/step2 dibantu hidden input yang membawa state antar langkah.

---

## Ringkasan

Materi minggu ini telah dibahas: Actions pada +page.server.ts. Lanjut ke pekan berikutnya untuk memperdalam.
