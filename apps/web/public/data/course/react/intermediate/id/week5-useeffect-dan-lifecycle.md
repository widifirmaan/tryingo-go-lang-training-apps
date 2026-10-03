# useEffect: Siklus Hidup Reaktif, Cleanup Function & AbortController

> **Kategori:** React | **Level:** Side Effects, Context & Arsitektur Reducer | **Minggu 5:** useEffect: Siklus Hidup Reaktif, Cleanup Function & AbortController
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami filosofi Side Effects dalam React (operasi yang berkomunikasi dengan dunia luar browser)
- Menguasai Dependency Array useEffect: [] (mount only), [dep] (on change), dan tanpa array (setiap render)
- Menulis Cleanup Function untuk membersihkan event listeners, intervals, dan koneksi websocket
- Mencegah Race Conditions pada permintaan fetch asinkron menggunakan AbortController bawaan
- Menghindari infinite loop re-render yang disebabkan oleh ketergantungan objek/fungsi tidak stabil

---

## Program: Sinkronisasi Dokumen Cloud dengan Pembatalan Race Condition

```jsx
import { useState, useEffect } from "react";

function CloudDocumentSync({ documentId }) {
  const [konten, setKonten] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusJaringan, setStatusJaringan] = useState("Online");

  useEffect(() => {
    // 1. AbortController untuk mencegah race conditions saat documentId berganti cepat
    const controller = new AbortController();
    setLoading(true);

    console.log(`[Effect] Memulai pengambilan dokumen ID: ${documentId}`);

    // Simulasi pemanggilan API asinkron
    const timer = setTimeout(() => {
      setKonten({
        id: documentId,
        judul: `Dokumen Spesifikasi Teknis #${documentId}`,
        terakhirDiubah: new Date().toLocaleTimeString()
      });
      setLoading(false);
      console.log(`[Effect] Berhasil memuat dokumen ID: ${documentId}`);
    }, 1000);

    // 2. Event Listener Window dengan Cleanup
    const handleOnline = () => setStatusJaringan("Online");
    const handleOffline = () => setStatusJaringan("Offline");

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // 3. Cleanup Function: Dieksekusi sebelum effect berikutnya berjalan atau saat komponen unmount
    return () => {
      console.log(`[Cleanup] Membatalkan operasi untuk ID: ${documentId}`);
      controller.abort();
      clearTimeout(timer);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [documentId]); // Dependency Array: effect hanya dipicu ulang jika documentId berubah

  if (loading) {
    return <div style={{ padding: "16px", color: "#64748b" }}>Sedang mengambil data dokumen...</div>;
  }

  return (
    <div style={{ padding: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", maxWidth: "450px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <h4 style={{ margin: 0 }}>{konten?.judul}</h4>
        <span style={{ fontSize: "12px", color: statusJaringan === "Online" ? "green" : "red" }}>● {statusJaringan}</span>
      </div>
      <p style={{ fontSize: "13px", color: "#475569" }}>ID: {konten?.id} • Sinkronisasi: {konten?.terakhirDiubah}</p>
    </div>
  );
}

export default CloudDocumentSync;
```

---

## Konsep Kunci

### Apa itu Side Effect?
Komponen React yang ideal adalah *Pure Function*: menerima props, mengembalikan JSX tanpa efek samping. Namun aplikasi nyata membutuhkan **Side Effects**: memanggil REST API, berlangganan WebSocket, memanipulasi judul tab browser (`document.title`), atau mendaftarkan event window global.
`useEffect` adalah gerbang resmi untuk mengeksekusi efek-efek ini setelah browser menyelesaikan proses render DOM.

### Tiga Variasi Dependency Array
1. `useEffect(() => { ... })`: Tanpa array dependency. Efek dijalankan **setiap kali render selesai**. Berbahaya jika ada setter state di dalamnya (menyebabkan *infinite loop*).
2. `useEffect(() => { ... }, [])`: Array kosong. Efek hanya dijalankan **sekali saat komponen pertama kali dipasang (*mount*)**.
3. `useEffect(() => { ... }, [id, query])`: Efek dijalankan saat mount dan **setiap kali salah satu variabel dalam array mengalami perubahan nilai**.

### Mengapa Cleanup Function Wajib?
Jika Anda mendaftarkan `window.addEventListener("scroll", handler)` tanpa membersihkannya di return function `window.removeEventListener`, setiap kali komponen me-render ulang, event listener baru akan ditumpuk terus-menerus. Ini menyebabkan kebocoran memori (*memory leak*) parah yang dapat membekukan browser pengguna!

---

---

## Penjelasan untuk Pemula

### Analogi: Petugas Kebersihan Hotel & Sambungan Telepon
1. **useEffect** seperti panggilan telepon resepsionis hotel: begitu tamu check-in ke kamar (*mount*), resepsionis menelepon untuk memastikan lampu menyala dan AC dingin (*fetch data*).
2. **Cleanup Function** seperti petugas kebersihan hotel: begitu tamu check-out (*unmount* atau pindah kamar), petugas wajib membersihkan sprei dan mematikan AC agar kamar siap digunakan tamu baru tanpa meninggalkan sampah lama (*memory leak*).

## Eksperimen

- Ubah documentId dari 1 ke 2 secara cepat dan amati log konsol menunjukkan cleanup dokumen 1 sebelum dokumen 2 dimuat.
- Matikan koneksi WiFi laptop Anda dan amati indikator statusJaringan berubah menjadi Offline berkat window event.
- Hapus array dependency [] dan perhatikan log konsol meledak berulang kali.
- Ubah document.title browser di dalam useEffect agar menampilkan judul dokumen aktif.

---

## Tantangan

Buat hook effect yang mendengarkan ketukan tombol keyboard `Escape`. Saat tombol Escape ditekan, tutup jendela modal aktif dan pastikan event listener dibersihkan saat modal tertutup.

---

## Model Mental & Diagram Alur Visual

![Diagram Alur Data Satu Arah React (Props Down, Events Up)](/diagrams/react-data-flow.svg)

```diagram
     ┌────────────────────────┐
     │    PARENT COMPONENT    │ ◄─── Update State via Setter
     │  (Holds Single State)  │
     └───────────┬────────────┘
                 │ Props Turun (Data Flow 1 Arah ⬇)
     ┌───────────┴────────────┐
     ▼                        ▼
┌──────────────┐       ┌──────────────┐
│  Child Card  │       │ Action Btn   │ ─── Event Handler Naik (⬆)
│ (Reads Props)│       │ (Calls Prop) │
└──────────────┘       └──────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `const [state, setState] = useState(initialValue)`
- **Fungsi Utama:** Hook penyimpanan state lokal komponen.
- **Parameter / Atribut:** `initialValue`.
- **Perilaku & Efek Sistem:** Menyimpan data reaktif komponen. Memanggil setter memicu re-render UI secara otomatis dan terisolasi.
- **Contoh Penggunaan Praktis:**
```javascript
const [count, setCount] = useState(0);
// Memanggil: setCount(prev => prev + 1);
```
- **Hasil Output yang Diharapkan:**
```text
Komponen memperbarui angka count di layar
```

### 2. `useEffect(() => { ... }, [dependencies])`
- **Fungsi Utama:** Hook efek samping (Lifecycle, Data Fetching, Subscription).
- **Parameter / Atribut:** `Effect Callback, Dependency Array`.
- **Perilaku & Efek Sistem:** Menjalankan logika sampingan setelah komponen di-render dan membersihkannya saat unmount.
- **Contoh Penggunaan Praktis:**
```javascript
useEffect(() => {
  const timer = setInterval(() => console.log('Ping'), 1000);
  return () => clearInterval(timer);
}, []);
```
- **Hasil Output yang Diharapkan:**
```text
Timer berjalan 1x saat mount dan dibersihkan saat unmount
```

### 3. `function Component(props) { return <JSX /> }`
- **Fungsi Utama:** Deklarasi Komponen Fungsi Dasar.
- **Parameter / Atribut:** `props object`.
- **Perilaku & Efek Sistem:** Blok bangunan independen dan dapat digunakan kembali yang mengubah data props menjadi elemen visual.
- **Contoh Penggunaan Praktis:**
```javascript
function Badge({ label }: { label: string }) {
  return <span className="badge">{label}</span>;
}
```
- **Hasil Output yang Diharapkan:**
```text
Elemen visual badge ter-render dengan teks label
```

### 4. `useContext(MyContext)`
- **Fungsi Utama:** Konsumsi state global tanpa prop-drilling.
- **Parameter / Atribut:** `React Context Object`.
- **Perilaku & Efek Sistem:** Membaca nilai state dari Context Provider terdekat di pohon hierarki komponen.
- **Contoh Penggunaan Praktis:**
```javascript
const { theme, toggleTheme } = useContext(ThemeContext);
```
- **Hasil Output yang Diharapkan:**
```text
Mendapatkan akses instan ke nilai tema global
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Mutasi State Langsung (Direct Mutation)
- **Gejala / Masalah:** Komponen tidak melakukan re-render karena referensi memori tidak berubah.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan updater function dari setter state: `setCount(prev => prev + 1)` atau buat salinan baru.

### 2. Dependency Array useEffect yang Tidak Lengkap
- **Gejala / Masalah:** Terjadi stale closures (membaca nilai lama variabel) atau infinite re-render loop.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Cantumkan semua variabel luar yang dibaca di dalam useEffect ke dalam array dependency.

### 3. Lupa Memberi Unique 'key' pada List Rendering
- **Gejala / Masalah:** DOM reconciliation lambat dan status elemen input di dalam list bisa tertukar.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan ID unik database (`item.id`), jangan gunakan index array (`key={idx}`) jika list bisa diubah atau diurutkan.

---

## Ringkasan

Kamu telah menguasai siklus hidup useEffect, aturan dependensi, dan cleanup function. Minggu depan kita mempelajari Context API untuk manajemen state global.
