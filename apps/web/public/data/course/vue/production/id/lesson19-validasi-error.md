# Validasi Form & Error Handling

> Vue | Production-Grade | Pelajaran 19

## Tujuan Pembelajaran

- Memvalidasi form dengan computed errors
- Menampilkan error saat blur (touched)
- Membuat ErrorBoundary dengan onErrorCaptured
- Menangani error global dengan app.config.errorHandler

---

## Program: Validasi Form & Error Handling

```vue
<script setup>
import { ref, computed } from 'vue'
import ErrorBoundary from './components/ErrorBoundary.vue'
import ProfileForm from './components/ProfileForm.vue'
</script>

<template>
  <h1>Validasi & Error Handling</h1>
  <ErrorBoundary>
    <ProfileForm />
  </ErrorBoundary>
</template>

```

---

## Penjelasan

## Validasi = Turunan State
Errors dihitung dari state (computed), bukan disimpan terpisah — satu sumber kebenaran. Pola `errors` objek + `touched` membedakan "belum diisi" vs "sudah disentuh lalu salah".

## Kapan Tampil Error
Tampilkan error hanya setelah blur (user meninggalkan field) atau submit gagal — bukan saat masih mengetik (mengganggu). Tombol submit disabled saat ada error (`:disabled="!isValid"`).

## ErrorBoundary
`onErrorCaptured` di komponen menangkap error dari komponen anak dan mengganti UI dengan fallback (mencegah layar putih). Kembalikan `false` untuk menghentikan propagasi. Pola ini meniru error boundary di framework lain.

## Error Global
`app.config.errorHandler = (err) => ...` menangkap error yang tidak tertangkap komponen (fetch gagal di composable, dsb). Kombinasi: ErrorBoundary per area penting + errorHandler global untuk logging.

---

## Eksperimen

1. **Validasi = Turunan State**
2. **Kapan Tampil Error**
3. **ErrorBoundary**
4. **Error Global**

---

## Tantangan

Buat form checkout lengkap: nama, email, alamat, kode pos (validasi 5 digit), nomor telepon (min 10 digit). Semua error computed. Tampilkan ringkasan error di atas form setelah submit gagal. Bungkus dengan ErrorBoundary yang melempar error manual (throw) untuk diuji.

---

## Ringkasan

Errors = computed dari state. Tampil saat touched/blur. ErrorBoundary (onErrorCaptured) + errorHandler global. Lanjut: transisi & teleport.
