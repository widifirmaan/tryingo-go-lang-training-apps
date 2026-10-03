# Iterasi List, Algoritma Rekonsiliasi & Bahaya Menggunakan Index Sebagai Key

> **Kategori:** React | **Level:** Pondasi Komponen, JSX & State | **Minggu 3:** Iterasi List, Algoritma Rekonsiliasi & Bahaya Menggunakan Index Sebagai Key
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menggunakan Array.prototype.map() untuk me-render koleksi elemen JSX secara dinamis
- Memahami cara kerja Virtual DOM dan Algoritma Rekonsiliasi (Diffing) React
- Memahami peran krusial properti `key` sebagai identitas unik elemen antar-render
- Mengetahui mengapa menggunakan index array sebagai key menyebabkan bug visual dan state kebocoran mematikan
- Membangun antarmuka daftar dengan fitur reorder, sorting, dan delete yang stabil

---

## Program: Papan Kolom Status Kanban dengan Reordering Dinamis

```jsx
import { useState } from "react";

const DATA_KARTU_AWAL = [
  { id: "c-101", judul: "Setup Tailwind v4", tag: "Frontend" },
  { id: "c-102", judul: "Design Database PostgreSQL", tag: "Backend" },
  { id: "c-103", judul: "Implementasi OAuth JWT", tag: "Security" },
  { id: "c-104", judul: "Audit Aksesibilitas WCAG", tag: "QA" }
];

function KanbanTaskCard({ item, onGeserAtas, onHapus }) {
  // Local state untuk mendemonstrasikan bahaya index-as-key jika list di-reorder
  const [catatanCepat, setCatatanCepat] = useState("");

  return (
    <div style={{
      background: "white",
      padding: "12px",
      borderRadius: "6px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      marginBottom: "8px",
      borderLeft: "4px solid #3b82f6"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>{item.judul}</strong>
        <span style={{ fontSize: "11px", background: "#e0f2fe", color: "#0369a1", padding: "2px 6px", borderRadius: "4px" }}>
          {item.tag}
        </span>
      </div>

      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Tulis catatan internal..."
          value={catatanCepat}
          onChange={(e) => setCatatanCepat(e.target.value)}
          style={{ width: "90%", padding: "4px", fontSize: "12px", border: "1px solid #cbd5e1", borderRadius: "3px" }}
        />
      </div>

      <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
        <button onClick={onGeserAtas} style={{ fontSize: "11px", padding: "2px 6px", cursor: "pointer" }}>↑ Naik</button>
        <button onClick={onHapus} style={{ fontSize: "11px", padding: "2px 6px", background: "#fee2e2", color: "#b91c1c", border: "none", cursor: "pointer" }}>Hapus</button>
      </div>
    </div>
  );
}

function KanbanBoard() {
  const [tasks, setTasks] = useState(DATA_KARTU_AWAL);

  const geserKeAtas = (index) => {
    if (index === 0) return;
    setTasks((prev) => {
      const copy = [...prev];
      const target = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = target;
      return copy;
    });
  };

  const hapusTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ maxWidth: "450px", margin: "20px auto", fontFamily: "sans-serif", background: "#f1f5f9", padding: "16px", borderRadius: "8px" }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#0f172a" }}>Sprint Backlog ({tasks.length})</h3>
      
      {/* SELALU gunakan ID unik stabil sebagai KEY, BUKAN index array! */}
      {tasks.map((task, index) => (
        <KanbanTaskCard
          key={task.id}
          item={task}
          onGeserAtas={() => geserKeAtas(index)}
          onHapus={() => hapusTask(task.id)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
```

---

## Konsep Kunci

### Bagaimana React Me-render List?
React tidak me-refresh seluruh DOM saat data array berubah. React membandingkan pohon Virtual DOM lama dengan yang baru (*diffing*).
Untuk membedakan item mana yang baru ditambah, dihapus, atau ditukar posisinya, React membutuhkan tanda pengenal unik: **`key`**.

### Bahaya Fatal Menggunakan Index Sebagai Key (`key={index}`)
Banyak pengembang pemula tergoda menulis `tasks.map((item, index) => <Card key={index} />)`.
**Ini adalah anti-pattern berbahaya!**
Jika Anda memiliki 3 item, lalu Anda menghapus item pertama:
- Item ke-2 kini memiliki index 0.
- Item ke-3 kini memiliki index 1.
React mengira item ke-3 yang dihapus, dan item ke-1 hanya berubah props! Akibatnya: input form, animasi, dan local state anak akan tertukar secara kacau (*state leak bug*).
**Solusi Baku**: Selalu gunakan ID permanen dan stabil dari database atau UUID (`key={task.id}`).

---

---

## Penjelasan untuk Pemula

### Analogi: Label Nomor Dada Pelari Lomba
Bayangkan 100 pelari di garis start:
1. **ID Unik sebagai Key** seperti nomor dada pelari resmi (misal 'BIB-702'): meskipun pelari nomor 702 menyalip ke urutan 1 atau mundur ke urutan 5, juri tetap tahu pasti siapa orang tersebut.
2. **Index sebagai Key** seperti menunjuk 'siapa yang berdiri di baris depan': jika pelari nomor 1 tersandung dan keluar lintasan, orang di belakangnya tiba-tiba dipanggil dengan nama orang yang baru saja terjatuh!

## Eksperimen

- Ketik catatan di kartu pertama, lalu klik tombol "Naik" pada kartu kedua; amati bahwa catatan tetap melekat pada kartu aslinya karena key={task.id}.
- Ganti key={task.id} menjadi key={index}, ketik catatan di kartu nomor 1, lalu hapus kartu nomor 1. Perhatikan catatan melompat ke kartu yang tersisa!
- Tambahkan filter pencarian kartu berdasarkan teks tag.
- Coba masukkan dua item dengan id yang persis sama dan lihat peringatan duplicate key di konsol.

---

## Tantangan

Implementasikan fitur "Pindahkan ke Kolom Selesai" pada KanbanTaskCard yang memindahkan item dari state `backlog` ke state `completed` dengan mempertahankan key identitas unik.

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

Kamu telah menguasai render list, algoritma rekonsiliasi, dan integritas key. Minggu depan kita mempelajari Controlled Forms dan useRef.
