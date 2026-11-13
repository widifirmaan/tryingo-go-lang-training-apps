# Actions & Forms

## Learning Objectives

- Form actions: ?/create, ?/delete
- +page.server.js for server actions
- Form data with request.formData()
- Enhance form for progressive enhancement
- Return data from action

---

## Program: Actions on +page.server.ts

Progressive enhancement: the form works without JavaScript thanks to server actions.

```svelte
<!-- src/routes/checkout/+page.server.ts -->
import { fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name')?.toString() ?? '';
    const qty = Number(data.get('qty') ?? 0);

    if (!name) return fail(400, { error: 'Name is required' });
    if (qty < 1 || qty > 50) return fail(400, { error: 'Qty must be 1-50' });

    // ... store to database ...
    return { success: true, orderId: 'TR-1201' };
  },
};

<!-- src/routes/checkout/+page.svelte -->
<script>
  let { form } = $props();     // latest action return value
</script>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}

<form method="POST" use:enhance>
  <input name="name" placeholder="Recipient name" />
  <input name="qty" type="number" min="1" max="50" value="1" />
  <button>Submit order</button>
</form>
```

---

## Key Concepts

### Named vs default actions

actions = { default } untuk satu form; `actions = { update, delete }` untuk beberapa form: action="/checkout?/update".

### fail() vs redirect

fail(400, { error }) mempertahankan halaman + mengirim data validasi ke `form`; redirect() pergi ke URL lain.

### use:enhance

SvelteKit mengintervensi submit form: tidak reload, mengelola loading state, dan mengirim kembali hasil action variable ke `form`.

### Progressive enhancement

Tanpa JavaScript form tetap berjalan (server action + reload penuh); dengan JS, use:enhance membuatnya halus tanpa reload.

---

## Experiments

- Add an ?/gift action with a distinct form button.
- Validate qty against a fake stock (hardoced 999).
- Disable the submit button while pending.

---

## Challenge

Design a two-step form wizard using a second action ?/step2 with hidden inputs carrying state across steps.

---

## Summary

This week's material has been covered: Actions on +page.server.ts. Continue to the following week to deepen.
