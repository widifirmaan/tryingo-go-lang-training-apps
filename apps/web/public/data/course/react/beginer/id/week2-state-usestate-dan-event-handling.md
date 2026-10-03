# Reaktivitas State: useState, Immutability & Lifting State Up

> **Kategori:** React | **Level:** Pondasi Komponen, JSX & State | **Minggu 2:** Reaktivitas State: useState, Immutability & Lifting State Up

## Tujuan Pembelajaran

- Memahami konsep State sebagai memori internal komponen yang memicu re-render otomatis saat berubah
- Menggunakan hook useState dengan benar termasuk updater function (prev => ...)
- Mematuhi prinsip Immutability mutlak pada array dan objek (tidak memutasi langsung)
- Menangani Synthetic Events React: onChange, onClick, onSubmit
- Menerapkan pola Lifting State Up saat dua atau lebih komponen perlu berbagi data

---

## Program: Penghitung Blok Konten & Editor Status Dokumen Real-Time

```jsx
import { useState } from "react";

function BlockEditorItem({ nomor, onHapus }) {
  const [isiTeks, setIsiTeks] = useState("");
  const [tipeBlok, setTipeBlok] = useState("PARAGRAF");

  return (
    <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "8px",
      borderBottom: "1px solid #e2e8f0"
    }}>
      <span style={{ color: "#94a3b8", fontSize: "12px", width: "24px" }}>#{nomor}</span>
      
      <select
        value={tipeBlok}
        onChange={(e) => setTipeBlok(e.target.value)}
        style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
      >
        <option value="PARAGRAF">Teks Biasa</option>
        <option value="HEADING">Judul Besar</option>
        <option value="KODE">Blok Kode</option>
      </select>

      <input
        type="text"
        placeholder="Ketik konten dokumen di sini..."
        value={isiTeks}
        onChange={(e) => setIsiTeks(e.target.value)}
        style={{
          flex: 1,
          padding: "6px 10px",
          borderRadius: "4px",
          border: "1px solid #cbd5e1",
          fontWeight: tipeBlok === "HEADING" ? "bold" : "normal",
          fontFamily: tipeBlok === "KODE" ? "monospace" : "inherit"
        }}
      />

      <button
        onClick={onHapus}
        style={{ background: "#ef4444", color: "white", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
      >
        ✕
      </button>
    </div>
  );
}

function DocumentCanvas() {
  const [blokList, setBlokList] = useState([
    { id: 1 },
    { id: 2 }
  ]);

  const tambahBlok = () => {
    // Immutability: Selalu buat array baru dengan spread operator
    setBlokList((prev) => [...prev, { id: Date.now() }]);
  };

  const hapusBlok = (idTarget) => {
    // Lifting State Up: Logika penghapusan dikelola di parent
    setBlokList((prev) => prev.filter((b) => b.id !== idTarget));
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h2>Editor Lembar Kerja ({blokList.length} Blok)</h2>
        <button
          onClick={tambahBlok}
          style={{ background: "#2563eb", color: "white", border: "none", borderRadius: "6px", padding: "8px 16px", cursor: "pointer" }}
        >
          + Tambah Blok Baru
        </button>
      </div>

      <div style={{ border: "1px solid #cbd5e1", borderRadius: "8px", background: "#f8fafc" }}>
        {blokList.map((item, index) => (
          <BlockEditorItem
            key={item.id}
            nomor={index + 1}
            onHapus={() => hapusBlok(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default DocumentCanvas;
```

---

## Konsep Kunci

### Mengapa Variabel Biasa Tidak Cukup?
Jika Anda menulis `let counter = 0; function tambah() { counter++; }`, nilai angka di memori memang bertambah, tetapi **React tidak tahu bahwa perubahan itu terjadi sehingga tampilan layar tidak pernah diperbarui**.
`useState` memberikan dua hal:
1. Nilai state saat ini.
2. Fungsi setter (`setCount`) yang memberi tahu React: *"Data berubah, jadwalkan render ulang komponen ini!"*.

### Aturan Emas: Immutability (Jangan Pernah Mutasi Langsung!)
Di React, Anda **dilarang keras** melakukan mutasi langsung seperti:
`array.push(item)` atau `user.nama = 'Budi'`.
React mendeteksi perubahan state menggunakan perbandingan referensi memori (*shallow equality `===`*). Jika Anda memutasi array asli di tempat, referensi memorinya tetap sama, dan React mengira tidak ada perubahan!
Gunakan selalu spread operator atau metode non-mutating:
- Tambah item: `setList(prev => [...prev, newItem])`
- Hapus item: `setList(prev => prev.filter(item => item.id !== targetId))`
- Update item: `setList(prev => prev.map(item => item.id === targetId ? { ...item, aktif: true } : item))`

### Lifting State Up
Ketika komponen saudara (*siblings*) membutuhkan data yang sama atau perlu saling memengaruhi, pindahkan state tersebut ke komponen induk (*common parent*) terdekat, lalu alirkan state dan fungsi callback ke bawah via props.

---

---

## Penjelasan untuk Pemula

### Analogi: Sakelar Lampu Cerdas & Papan Skor
1. **useState** seperti sakelar lampu pintar: begitu Anda menekan tombol sakelar (*setter function*), sinyal dikirim ke komputer rumah (*React Engine*), dan lampu seketika menyala terang (*re-render UI*).
2. **Immutability** seperti buku mutasi bank: jika Anda mentransfer uang, kasir tidak menghapus saldo lama dengan karet penghapus, melainkan mencetak baris transaksi baru di lembar berikutnya.

## Eksperimen

- Coba ganti setBlokList([...]) dengan blokList.push({}) dan amati bahwa layar menolak me-render blok baru.
- Ubah tipe blok ke HEADING dan perhatikan font input otomatis menebal secara instan.
- Hapus semua blok hingga kosong dan amati penanganan antarmuka.
- Gunakan setter dengan callback function: setBlokList(prev => [...prev, { id: Date.now() }]).

---

## Tantangan

Tambahkan tombol "Duplikat Blok" pada `BlockEditorItem` yang menyalin isi teks dan tipe blok persis di bawah posisi blok saat ini menggunakan teknik manipulasi array immutable.

---

## Ringkasan

Kamu telah menguasai useState reaktif, hukum immutability mutlak, dan Lifting State Up. Minggu depan kita mendalami Render List dan pentingnya reconciliation Key.
