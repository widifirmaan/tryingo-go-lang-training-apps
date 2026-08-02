# Dictionary, Set & Comprehensions

> Python | Koleksi & Fungsi | Pelajaran 7

## Tujuan Pembelajaran

- Menyelesaikan masalah parallel lists dengan dict
- Melakukan CRUD dan memahami KeyError + .get()
- Mengiterasi keys, values, items
- Memakai set untuk unique & membership
- Menulis list/dict comprehensions

---

## Program: Dictionary, Set & Comprehensions

```python
# ===== Masalah: parallel lists (MIT OCW) =====
nama = ["Ayu", "Budi", "Citra"]
nilai = [90, 78, 85]
# Menjaga 2 list sinkron itu rapuh -- DICTIONARY lebih bersih.

# ===== Dictionary: key -> value =====
nilai_siswa = {"Ayu": 90, "Budi": 78, "Citra": 85}
print(f"Nilai Ayu: {nilai_siswa['Ayu']}")
nilai_siswa["Dewi"] = 92          # tambah
nilai_siswa["Ayu"] = 95           # update
del nilai_siswa["Budi"]           # hapus
print(f"Setelah update: {nilai_siswa}")

# ===== KeyError & .get() =====
# nilai_siswa["Zainal"]  -> KeyError! (error dict paling umum)
print(f"get() aman: {nilai_siswa.get('Zainal')}")
print(f"get() + default: {nilai_siswa.get('Zainal', 0)}")
print(f"Cek key: {'Ayu' in nilai_siswa}")

# ===== Iterasi: keys, values, items =====
for nama_siswa in nilai_siswa:
    print(f"Key: {nama_siswa}")
for nama_siswa, nilai_angka in nilai_siswa.items():
    print(f"{nama_siswa}: {nilai_angka}")

# ===== Set: unik + membership cepat =====
warna = {"merah", "biru", "hijau", "merah"}
print(f"Set (duplikat hilang): {warna}")
print(f"'merah' in warna: {'merah' in warna}")
# {} membuat DICT kosong, bukan set!
set_kosong = set()
print(f"set() kosong: {set_kosong}, type: {type(set_kosong)}")

# ===== Word frequency (contoh klasik MIT) =====
lirik = "kita semua saudara kita semua sama kita satu"
kata_list = lirik.split()
frekuensi = {}
for kata in kata_list:
    frekuensi[kata] = frekuensi.get(kata, 0) + 1
print(f"Frekuensi kata: {frekuensi}")

# ===== Comprehensions =====
kuadrat = [n * n for n in range(1, 6)]
print(f"Kuadrat: {kuadrat}")
genap = [n for n in range(1, 11) if n % 2 == 0]
print(f"Genap: {genap}")
dua_kali = {n: n * 2 for n in range(3)}
print(f"Dict comp: {dua_kali}")

```

---

## Penjelasan

## Motivasi: Parallel Lists
Tiga list paralel (nama, nilai) harus berubah bersamaan di setiap operasi — rapuh (MIT OCW Lecture 14). Dict menggabungkan data yang berelasi: `nilai_siswa["Ayu"]` langsung dapat nilai tanpa mencari index. Ordering: Python 3.7+ dict mempertahankan insertion order.

## KeyError & .get()
KeyError adalah error dict paling umum (datafield.dev): typo case-sensitive (`"torch"` vs `"Torch"`), mengasumsikan key ada, `1` vs `"1"` beda key. `.get()` untuk key yang boleh tidak ada (counting, config opsional); `dict[key]` saat key WAJIB ada — error lebih baik daripada bug diam-diam.

## Iterasi Dictionary
`for k in d` = keys. `.items()` untuk (key, value) — unpacking dua nama. Jangan `.keys()`+`.values()` terpisah jika bisa `.items()`.

## Set
Set = koleksi unik tanpa urutan; `in` O(1). `{}` membuat dict kosong — gotcha terkenal: set kosong wajib `set()`. Urutan tidak dijamin — jangan andalkan.

## Comprehensions
`[ekspresi for x in iterable if kondisi]` — ringkas dan idiomatis, transfer langsung dari for-first. Jangan memaksa: if/else kompleks atau nested loop -> pakai for biasa (datafield: "readability always wins").

## Pilih Struktur Data yang Tepat
Urutan + posisi -> list. Immutable -> tuple. Key-value lookup cepat -> dict. Unik + membership -> set. Hitung kemunculan -> dict + get(). Hapus duplikat -> set(list).

---

## Eksperimen

1. **Motivasi: Parallel Lists**
2. **KeyError & .get()**
3. **Iterasi Dictionary**
4. **Set**
5. **Comprehensions**
6. **Pilih Struktur Data yang Tepat**

---

## Tantangan

Buat program penghitung kata unik: (1) baca kalimat, split, hitung frekuensi tiap kata dengan dict, (2) tampilkan 3 kata teratas urut frekuensi (sorted dengan key=lambda), (3) daftar kata unik dengan set, (4) buat inverted index sederhana: {kata: [indeks kalimat]}.

---

## Ringkasan

Dict = key-value lookup, KeyError/.get(), iterasi items, set unik, comprehensions. Siap untuk modul & error handling. Lanjut: Contact Book.
