# useReducer: Arsitektur State Machine & Transisi Terprediksi

> **Kategori:** React | **Level:** Side Effects, Context & Arsitektur Reducer | **Minggu 7:** useReducer: Arsitektur State Machine & Transisi Terprediksi

## Tujuan Pembelajaran

- Memahami kapan harus beralih dari useState ke useReducer untuk state kompleks
- Menguasai anatomi Reducer: fungsi murni (State, Action) => NewState
- Menstandarkan format Action Object menggunakan pola type dan payload
- Mengimplementasikan fitur Undo/Redo dengan menyimpan snapshot riwayat state
- Memisahkan logika bisnis mutasi state dari tampilan antarmuka visual secara elegan

---

## Program: Mesin Reducer Editor Blok Dokumen Notion-Style

```jsx
import { useReducer } from "react";

// 1. Initial State
const stateAwal = {
  dokumenId: "DOC-99",
  judul: "Spesifikasi Fitur v2",
  blokList: [
    { id: "b1", tipe: "HEADING", isi: "Pendahuluan Arsitektur" },
    { id: "b2", tipe: "TEKS", isi: "Sistem menggunakan arsitektur modular terdesentralisasi." }
  ],
  riwayatUndo: []
};

// 2. Reducer Function: Pure function (State, Action) => NewState
function editorReducer(state, action) {
  switch (action.type) {
    case "TAMBAH_BLOK": {
      const blokBaru = {
        id: `b-${Date.now()}`,
        tipe: action.payload.tipe || "TEKS",
        isi: action.payload.isi || ""
      };
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: [...state.blokList, blokBaru]
      };
    }

    case "UPDATE_ISI_BLOK": {
      return {
        ...state,
        blokList: state.blokList.map((b) =>
          b.id === action.payload.id ? { ...b, isi: action.payload.isi } : b
        )
      };
    }

    case "HAPUS_BLOK": {
      return {
        ...state,
        riwayatUndo: [...state.riwayatUndo, state.blokList],
        blokList: state.blokList.filter((b) => b.id !== action.payload.id)
      };
    }

    case "UNDO": {
      if (state.riwayatUndo.length === 0) return state;
      const snapshotSebelumnya = state.riwayatUndo[state.riwayatUndo.length - 1];
      return {
        ...state,
        blokList: snapshotSebelumnya,
        riwayatUndo: state.riwayatUndo.slice(0, -1)
      };
    }

    default:
      throw new Error(`Aksi tidak dikenali: ${action.type}`);
  }
}

// 3. Komponen Editor Kanvas
export default function CanvasReducerEditor() {
  const [state, dispatch] = useReducer(editorReducer, stateAwal);

  return (
    <div style={{ maxWidth: "550px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>{state.judul}</h3>
        <div>
          <button
            onClick={() => dispatch({ type: "UNDO" })}
            disabled={state.riwayatUndo.length === 0}
            style={{ padding: "6px 12px", cursor: state.riwayatUndo.length > 0 ? "pointer" : "not-allowed" }}
          >
            ↶ Undo ({state.riwayatUndo.length})
          </button>
          <button
            onClick={() => dispatch({ type: "TAMBAH_BLOK", payload: { tipe: "TEKS", isi: "Catatan baru..." } })}
            style={{ marginLeft: "8px", padding: "6px 12px", background: "#2563eb", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            + Blok Teks
          </button>
        </div>
      </div>

      <div style={{ marginTop: "16px", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px" }}>
        {state.blokList.map((blok) => (
          <div key={blok.id} style={{ display: "flex", gap: "8px", marginBottom: "8px", alignItems: "center" }}>
            <span style={{ fontSize: "11px", color: "#64748b", width: "60px" }}>{blok.tipe}</span>
            <input
              type="text"
              value={blok.isi}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_ISI_BLOK",
                  payload: { id: blok.id, isi: e.target.value }
                })
              }
              style={{ flex: 1, padding: "6px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
            />
            <button
              onClick={() => dispatch({ type: "HAPUS_BLOK", payload: { id: blok.id } })}
              style={{ background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: "4px", padding: "6px 10px", cursor: "pointer" }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Konsep Kunci

### Mengapa useReducer Mengubah Permainan?
Ketika komponen Anda memiliki:
1. State objek bersarang (*nested state*).
2. Perubahan satu nilai state bergantung pada nilai state lainnya.
3. Logika pembaruan yang kompleks (tambah, edit, hapus, susun ulang, undo, redo).
Menggunakan banyak `useState` akan membuat kode Anda berantakan dan rawan *race conditions*.
`useReducer` memisahkan **APA yang terjadi (*Action*)** dari **BAGAIMANA state diubah (*Reducer*)**.

### Prinsip Reducer Murni
Fungsi reducer **wajib merupakan pure function**:
- Tidak boleh memanggil API di dalam reducer.
- Tidak boleh memanggil `Math.random()` atau `Date.now()` di dalam reducer (masukkan via payload).
- Dilarang memutasi state asli secara langsung; selalu kembalikan salinan objek baru (`...state`).

### Pasangan Sempurna: useReducer + useContext
Ketika Anda menggabungkan `useReducer` di dalam `Context.Provider`, Anda dapat mengoper fungsi `dispatch` ke komponen anak di level berapapun. Ini adalah pondasi arsitektur state management ala Redux tanpa perlu menginstal library eksternal apapun!

---

---

## Penjelasan untuk Pemula

### Analogi: Akuntan Perusahaan & Formulir Transaksi
1. **useState** seperti mengambil uang langsung dari dompet: Anda bebas mengeluarkan lembaran uang kapan saja tanpa catatan resmi.
2. **useReducer** seperti kasir bank: Anda tidak boleh menyentuh brankas langsung. Anda mengisi slip setoran (*Action Object* bertipe 'SETOR_DANA'), menyerahkannya ke teller (*Dispatch*), dan petugas akuntan bank (*Reducer*) memproses pembukuan secara resmi dan rapi.

## Eksperimen

- Hapus sebuah blok, lalu klik tombol "Undo" dan perhatikan blok yang terhapus kembali secara ajaib.
- Coba kirimkan aksi dengan tipe yang salah dispatch({ type: "AKSI_PALSU" }) dan lihat penanganan erornya.
- Tambahkan aksi baru "PINDAH_BLOK_ATAS" yang menukar urutan blok di dalam array.
- Simpan riwayat aksi (action logs) di dalam state untuk keperluan audit pengguna.

---

## Tantangan

Tambahkan aksi "REDO" pada `editorReducer` yang memungkinkan pengguna membatalkan operasi Undo sebelumnya menggunakan stack riwayat `riwayatRedo`.

---

## Ringkasan

Kamu telah menguasai useReducer, arsitektur Action-Reducer terprediksi, dan snapshot state undo. Minggu depan kita memasuki Level 3: Optimasi Performa dengan useMemo dan useCallback.
