# Forms & Data Fetching

> Svelte | Pelajaran 6

## Tujuan Pembelajaran

- Memahami form handling di Svelte dengan bind:value dan on:submit\n- Mengimplementasi form validation sederhana\n- Menggunakan preventDefault untuk mencegah page reload\n- Menampilkan conditional success message setelah submit

---

## Program: Svelte

```svelte
<script>
  let name = "";
  let email = "";
  let message = "";
  let submitted = false;
  let errors = {};

  function validate() {
    errors = {};
    if (!name.trim()) errors.name = "Nama wajib diisi";
    if (!email.trim() || !email.includes("@")) errors.email = "Email tidak valid";
    if (!message.trim()) errors.message = "Pesan wajib diisi";
    return Object.keys(errors).length === 0;
  }

  function handleSubmit() {
    if (validate()) {
      submitted = true;
      console.log({ name, email, message });
    }
  }
</script>

<h1>Svelte Forms & Data</h1>

{#if !submitted}
  <form on:submit|preventDefault={handleSubmit}>
    <label>Nama:</label>
    <input type="text" bind:value={name} />
    {#if errors.name}<span class="error">{errors.name}</span>{/if}

    <label>Email:</label>
    <input type="email" bind:value={email} />
    {#if errors.email}<span class="error">{errors.email}</span>{/if}

    <label>Pesan:</label>
    <textarea bind:value={message}></textarea>
    {#if errors.message}<span class="error">{errors.message}</span>{/if}

    <button type="submit">Kirim</button>
  </form>
{:else}
  <p>Terima kasih, {name}! Pesan Anda telah dikirim.</p>
{/if}
```

---

## Penjelasan

## Form Handling
on:submit|preventDefault={handleSubmit} — menangani submit tanpa page reload. bind:value={name} — two-way binding.
## Validation
Validasi dilakukan di JavaScript sebelum submit. Errors disimpan dalam object dan ditampilkan conditional.
## Data Fetching
fetch("https://api.example.com/data") — mengambil data dari API. Gunakan onMount untuk fetch saat component mount.
## Loading State
{#if loading}<p>Loading...</p>{/if} — menampilkan loading state selama data di-fetch.

---

## Eksperimen

1. **## Form Handling
on:submit|preventDefault={handleSubmit} — menangani submit tanpa page reload. bind:value={name} — two-way binding.
## Validation
Validasi dilakukan di JavaScript sebelum submit. Errors disimpan dalam object dan ditampilkan conditional.
## Data Fetching
fetch("https://api.example.com/data") — mengambil data dari API. Gunakan onMount untuk fetch saat component mount.
## Loading State
{#if loading}<p>Loading...</p>{/if} — menampilkan loading state selama data di-fetch.**

---

## Tantangan

Tingkatkan forms & data: (1) tambah form dengan validasi async (cek email duplikat via API), (2) buat form upload file dengan preview, (3) tambah data fetching dari public API (JSONPlaceholder), (4) buat form search dengan debounce.

---

## Ringkasan

Form = bind:value + on:submit|preventDefault. Validation = JS object. Fetch = onMount + fetch. Lanjut: komponen reusable.
