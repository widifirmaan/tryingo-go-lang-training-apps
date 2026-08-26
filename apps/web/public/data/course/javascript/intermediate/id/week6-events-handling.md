# Events Lanjutan — Telinga yang Lebih Pintar

> **Kategori:** JavaScript | **Level:** Menengah | **Minggu 6:** Events & Event Handling

## Tujuan Pembelajaran

- Bedakan `click`, `input`, `submit`, `keydown` — telinga untuk aksi beda
- `addEventListener` dengan `preventDefault()` (jangan reload) dan `stopPropagation()` (jangan bocor ke induk)
- **Delegation**: 1 telinga di `ul` untuk 100 `li` (hemat, tidak pasang 100 telinga)
- `once` dan lepas `removeEventListener` (telinga sekali pakai)

---

## Kenapa Ini Penting Buat Kamu?

Warung list 100 produk — pasang 100 `addEventListener` di tiap `li` → berat, lupa lepas → bocor. Delegation = **1 satpam di pintu lobi**, cek `e.target` siapa yang klik. `preventDefault` = cegah form reload.

---

## Program: Kasir Delegation

```html
<ul id="daftar"><li data-id="1">Beras <button class="hapus">Hapus</button></li><li data-id="2">Bayam <button class="hapus">Hapus</button></li></ul>
<form id="form"><input id="nama" placeholder="Nama"><button>Tambah</button></form>
```
```javascript
const daftar = document.getElementById("daftar");
const form = document.getElementById("form");
const input = document.getElementById("nama");

// 1. Delegation: 1 telinga di ul untuk semua tombol hapus
daftar.addEventListener("click", (e) => {
  if (e.target.matches(".hapus")) {
    const li = e.target.closest("li");
    console.log("Hapus id:", li.dataset.id);
    li.remove(); // hapus 1 li
  }
});

// 2. preventDefault: jangan reload saat submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = input.value.trim();
  if (!nama) return;
  const li = document.createElement("li");
  li.innerHTML = `${nama} <button class="hapus">Hapus</button>`;
  li.dataset.id = Date.now();
  daftar.appendChild(li);
  input.value = "";
});

// 3. Sekali pakai
let promo = document.createElement("button");
promo.textContent = "Klaim Promo (sekali)";
promo.addEventListener("click", () => alert("Promo diklaim!"), { once: true });
document.body.appendChild(promo);

// 4. Keyboard
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") console.log("Enter ditekan");
});
```

---

## Konsep Kunci

### `e.target` vs `e.currentTarget`
- `target` = yang diklik (tombol hapus), `currentTarget` = yang pasang telinga (ul).

### Delegation = 1 Satpam untuk 100 Pintu
`ul.addEventListener("click", e => if(e.target.matches(".hapus")) ...)` — hemat, otomatis untuk `li` baru.

### `preventDefault` vs `stopPropagation`
- `preventDefault()` = cegah aksi default (form reload, link pindah).
- `stopPropagation()` = jangan bocor ke induk (klik tombol tidak trigger klik `li`).

---

## Penjelasan untuk Pemula

### Analogi: Satpam Lobi

- **100 telinga = 100 satpam di tiap kamar** → boros.
- **Delegation = 1 satpam di lobi**: tamu klik `Hapus` di kamar 5 → satpam lobi cek `e.target` ID 5 → hapus.

---

## Eksperimen

- **Hijau:** Klik `Hapus` Bayam → `li` hilang? Tambah produk baru → Hapus-nya tetap jalan tanpa pasang ulang?
- **Kuning:** Hapus `e.preventDefault()` di submit → form reload? Pasang lagi.
- **Merah:** Ganti `e.target.matches(".hapus")` jadi `e.target.tagName === "BUTTON"` → masih jalan?

---

## Tantangan

**Warung Delegation:** `ul` 20 produk via `for` + `innerHTML`, 1 `addEventListener` di `ul` untuk `Hapus` dan `Edit` (2 tombol per `li` beda class). Tambah produk via `form submit` — delegation tetap jalan tanpa `addEventListener` baru.

Kriteria: 1 telinga di parent, pakai `closest` + `dataset.id`, dan `preventDefault`.

---

## Glosarium Mini

- **Delegation**: 1 telinga untuk banyak anak
- **preventDefault/stopPropagation**: cegah default/bocor
- **once**: sekali pakai

---

## Ringkasan

Minggu 6 dari 14: **Events Lanjutan** (Level: Menengah). Bisa 1 satpam untuk 100 pintu. Minggu depan: **Async** — pesan antar tanpa tunggu.
