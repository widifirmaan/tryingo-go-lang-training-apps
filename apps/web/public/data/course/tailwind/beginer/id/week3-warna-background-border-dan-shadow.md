# Warna, Latar Belakang, Border, dan Shadow

> **Kategori:** Tailwind CSS | **Level:** Dasar Utility-First & Tipografi | **Minggu 3:** Warna, Latar Belakang, Border, dan Shadow

## Tujuan Pembelajaran

- Memahami palet warna Tailwind (50 hingga 950 untuk setiap rona warna)
- Mengatur warna latar belakang (bg-white, bg-indigo-600, bg-slate-100)
- Mengatur radius sudut (rounded, rounded-lg, rounded-xl, rounded-full)
- Menambahkan border ketebalan dan warna (border, border-2, border-slate-200)
- Menerapkan bayangan elevasi (shadow-sm, shadow, shadow-md, shadow-lg)

---

## Program: Kartu Produk dengan Visual Tokens

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 p-8 flex justify-center">
  <div class="w-80 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
    <!-- Header Badge Visual -->
    <div class="bg-indigo-600 px-4 py-3 text-white flex justify-between items-center">
      <span class="text-xs uppercase tracking-wider font-semibold">Toko Elektronik</span>
      <span class="bg-indigo-700 text-xs px-2 py-0.5 rounded-full">Stok 12</span>
    </div>

    <!-- Body Info -->
    <div class="p-5">
      <h3 class="text-lg font-bold text-slate-800 mb-1">Keyboard Mekanikal TKL</h3>
      <p class="text-xs text-slate-500 mb-4">Switch red, koneksi USB-C kabel braided.</p>
      
      <!-- Price & Button -->
      <div class="flex items-center justify-between pt-3 border-t border-slate-100">
        <div>
          <span class="text-xs text-slate-400 block">Harga</span>
          <span class="text-lg font-extrabold text-slate-900">Rp 450.000</span>
        </div>
        <button class="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm">
          Beli Sekarang
        </button>
      </div>
    </div>
  </div>
</body>
</html>
```

---

## Konsep Kunci

### Sistem Palet Warna
Tailwind menyertakan rona seperti `slate`, `gray`, `red`, `amber`, `emerald`, `indigo`, dll. Setiap rona memiliki tingkat kegelapan dari 50 (sangat terang) sampai 950 (sangat gelap).

### Border & Radius
- Ketebalan: `border` (1px), `border-2` (2px), `border-4` (4px)
- Radius: `rounded-sm` (2px), `rounded` (4px), `rounded-lg` (8px), `rounded-full` (lingkaran penuh)

### Box Shadow
- `shadow-sm`: elevasi subtle untuk tombol
- `shadow-md`: elevasi kartu standar
- `shadow-lg` / `shadow-xl`: modal popup atau dropdown

---

## Eksperimen

- Ganti bg-indigo-600 menjadi bg-rose-600 pada banner atas
- Ubah shadow-md menjadi shadow-xl untuk efek mengambang lebih tinggi
- Ganti rounded-xl menjadi rounded-none untuk gaya sudut siku tajam
- Ubah warna tombol beli dari emerald-600 ke sky-500

---

## Tantangan

Buat kartu kupon diskon dengan border putus-putus (border-dashed), background kuning lembut (bg-amber-50), dan tombol klaim berwarna oranye.

---

## Ringkasan

Minggu 3 dari 9: **Warna, Latar Belakang, Border, dan Shadow**. Anda menguasai token visual dasar. Minggu depan: **Tata Letak Flexbox dengan Tailwind**.
