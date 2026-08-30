# Actions & Forms — Stempel & Formulir Svelte

> **Kategori:** Svelte | **Level:** Menengah | **Minggu 7:** Actions & Forms

## Tujuan Pembelajaran

- `use:action` stempel di elemen, `bind:value` + `on:submit|preventDefault` untuk form warung tanpa reload

---

## Program: Form Warung Svelte

```svelte
<script>
  let nama = "";
  let daftar = [];
  function tambah(){ if(!nama.trim()) return; daftar = [...daftar, { id: Date.now(), nama }]; nama = ""; }
  function klikLuar(node){
    function handle(e){ if(!node.contains(e.target)) node.dispatchEvent(new CustomEvent("klikLuar")); }
    document.addEventListener("click", handle);
    return { destroy(){ document.removeEventListener("click", handle); } };
  }
</script>

<form on:submit|preventDefault={tambah}>
  <input bind:value={nama} placeholder="Nama produk" />
  <button>Tambah</button>
</form>

<div use:klikLuar on:klikLuar={() => console.log("klik luar")}>
  <p>Klik di luar kotak ini → log</p>
</div>

<ul>{#each daftar as p}<li>{p.nama}</li>{/each}</ul>
```

---

## Ringkasan

Minggu 7: **Stempel & Form** — `use:` dan `bind`.
