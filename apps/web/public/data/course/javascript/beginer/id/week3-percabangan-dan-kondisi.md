# Percabangan dan Pengambilan Keputusan

> **Kategori:** JavaScript | **Level:** Dasar JavaScript & Logika | **Minggu 3:** Percabangan dan Pengambilan Keputusan
> ⏱️ **Estimasi Belajar:** 45 Menit | 🔗 **Tingkat:** Terstruktur (Step-by-step)

## Tujuan Pembelajaran

- Menguasai struktur percabangan logika if, else if, dan else
- Menerapkan ternary operator (kondisi ? nilaiA : nilaiB) untuk ekspresi ringkas
- Menggunakan struktur switch-case dan klausa break untuk evaluasi banyak opsi
- Memahami konsep nilai Truthy dan Falsy dalam evaluasi boolean
- Menggunakan nullish coalescing operator (??) untuk nilai default yang aman

---

## 1. Struktur Percabangan `if...else if...else`

Percabangan memungkinkan program mengambil keputusan berbeda berdasarkan kondisi logika boolean:

```javascript
const nilai = 82;

if (nilai >= 85) {
  console.log("Grade: A");
} else if (nilai >= 70) {
  console.log("Grade: B");
} else if (nilai >= 55) {
  console.log("Grade: C");
} else {
  console.log("Grade: D (Perlu Perbaikan)");
}
```

---

## 2. Ternary Operator (Kondisi Ringkas)

Gunakan ternary operator untuk menetapkan nilai variabel dalam satu baris ekspresi:

```javascript
// Format: kondisi ? nilaiJikaTrue : nilaiJikaFalse
const statusAkses = usia >= 18 ? "Diizinkan Masuk" : "Dilarang Masuk";
```

---

## 3. Truthy vs Falsy Values

Dalam JavaScript, setiap nilai secara inheren dievaluasi sebagai `true` (Truthy) atau `false` (Falsy) saat berada di dalam kondisi `if`:

### 8 Nilai Falsy (Selalu Menghasilkan `false`):
1. `false`
2. `0` dan `-0`
3. `0n` (BigInt nol)
4. `""` (String kosong)
5. `null`
6. `undefined`
7. `NaN` (Not-a-Number)

*Seluruh nilai selain kedelapan nilai di atas adalah **Truthy** (termasuk array kosong `[]` dan objek kosong `{}`!)*

---

## 4. Nullish Coalescing (`??`) vs Logical OR (`||`)

- **`||` (Logical OR)**: Mengambil fallback jika nilai di sebelah kiri adalah **Falsy** (termasuk `0` atau `""`).
- **`??` (Nullish Coalescing)**: Mengambil fallback **hanya jika** nilai di sebelah kiri adalah `null` atau `undefined`:

```javascript
const skorPemain = 0;

const hasilOR = skorPemain || 10;  // 10! (Karena 0 dianggap falsy, padahal 0 skor valid!)
const hasilNullish = skorPemain ?? 10; // 0! (Benar, 0 bukan null atau undefined)
```

---

## Program: Sistem Penilaian Kelulusan dan Evaluasi Hak Akses

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Percabangan Logika</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #F8FAF9;
      color: #2D3748;
      padding: 32px;
      line-height: 1.5;
    }

    .card {
      max-width: 480px;
      margin: 0 auto;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.04);
    }

    h3 {
      color: #2E5B44;
      font-size: 20px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 16px;
    }

    label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #CBD5E0;
      border-radius: 6px;
      font-size: 14px;
    }

    .btn-eval {
      width: 100%;
      background-color: #2E5B44;
      color: white;
      border: none;
      padding: 10px;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .result-box {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
      display: none;
    }

    .result-pass {
      background-color: #E2F2E9;
      color: #2E5B44;
      border: 1px solid #C6E6D5;
    }

    .result-fail {
      background-color: #FED7D7;
      color: #9B2C2C;
      border: 1px solid #FEB2B2;
    }
  </style>
</head>
<body>

  <div class="card">
    <h3>Evaluasi Kelulusan Siswa</h3>

    <div class="form-group">
      <label for="skor-input">Skor Ujian (0 - 100):</label>
      <input type="number" id="skor-input" value="78" min="0" max="100">
    </div>

    <div class="form-group">
      <label for="kehadiran-input">Persentase Kehadiran (%):</label>
      <input type="number" id="kehadiran-input" value="85" min="0" max="100">
    </div>

    <button class="btn-eval" onclick="evaluasi()">Evaluasi Status</button>

    <div id="result" class="result-box"></div>
  </div>

  <script>
    function evaluasi() {
      const skor = Number(document.getElementById("skor-input").value);
      const kehadiran = Number(document.getElementById("kehadiran-input").value);
      const resultBox = document.getElementById("result");

      // 1. Menentukan Huruf Mutu (if-else if-else)
      let grade = "E";
      let keterangan = "";

      if (skor >= 85) {
        grade = "A";
        keterangan = "Istimewa (Sangat Memuaskan)";
      } else if (skor >= 75) {
        grade = "B";
        keterangan = "Baik (Memuaskan)";
      } else if (skor >= 60) {
        grade = "C";
        keterangan = "Cukup (Lulus Standar)";
      } else {
        grade = "D";
        keterangan = "Kurang (Tidak Memenuhi Standar)";
      }

      // 2. Evaluasi Kelulusan Multi-Kondisi dengan Operator Logika (&&)
      const syaratLulus = (skor >= 60) && (kehadiran >= 75);

      // 3. Menentukan Pesan Akhir dengan Ternary Operator
      const statusTeks = syaratLulus ? "LULUS" : "TIDAK LULUS";

      // 4. Render Hasil ke DOM
      resultBox.style.display = "block";
      resultBox.className = "result-box " + (syaratLulus ? "result-pass" : "result-fail");

      resultBox.innerHTML = `
        <strong>STATUS: ${statusTeks}</strong><br>
        Grade Nilai: <strong>${grade}</strong> (${keterangan})<br>
        Skor: ${skor} | Kehadiran: ${kehadiran}%<br>
        ${!syaratLulus && kehadiran < 75 ? "<em>Peringatan: Kehadiran di bawah batas minimum 75%!</em>" : ""}
      `;
    }

    evaluasi();
  </script>

</body>
</html>
```

---

## Bedah Detail Kode Program

- `Number(document.getElementById("...").value)`: Mengonversi nilai input teks form menjadi tipe number agar perbandingan numerik akurat.
- `if (skor >= 85) ... else if ...`: Mengevaluasi rentang skor dari yang tertinggi ke terendah secara berurutan.
- `(skor >= 60) && (kehadiran >= 75)`: Menggunakan operator logika AND (`&&`) di mana kedua syarat wajib terpenuhi agar dinyatakan lulus.
- `syaratLulus ? "LULUS" : "TIDAK LULUS"`: Menggunakan ternary operator untuk menentukan string status secara ringkas.
- `resultBox.className = ...`: Mengubah kelas CSS secara dinamis untuk memberikan warna latar hijau (lulus) atau merah (tidak lulus).

---

## Eksperimen di Playground

1. Ubah nilai variabel, parameter, atau teks pada kode program di Playground dan amati perubahan hasil outputnya secara langsung.
2. Coba tambahkan kondisi logika atau fungsi baru sesuai skenario kebutuhan Anda.
3. Periksa Developer Console di browser (tekan F12) untuk melihat alur eksekusi console.log runtime.

---

## Tantangan Praktik

Terapkan konsep Minggu 3 ini pada file main.js proyek Anda. Pastikan penggunaan const dan let tepat, tangani kemungkinan nilai null/undefined, dan gunakan penamaan variabel yang deskriptif.

---

## Jebakan Umum & Debugging (Common Pitfalls)

- Lupa mengonversi nilai input ke Number: Nilai dari <input> selalu bertipe string ("80"). Jika dibandingkan secara string, "9" > "80" adalah true!
- Urutan kondisi if-else terbalik: Menulis if (skor >= 60) di baris pertama akan membuat siswa dengan skor 90 langsung berhenti di kondisi pertama tanpa pernah mencapai grade A.
- Menggunakan = alih-alih ===: Menulis if (skor = 100) adalah operasi penugasan (assignment), bukan perbandingan, sehingga kondisi selalu bernilai truthy.
- Lupa klausa break pada switch-case: Tanpa break, eksekusi akan jatuh bebas (fall-through) ke case berikutnya hingga akhir switch.

---

## Ringkasan

- Modul Minggu 3 (Percabangan dan Pengambilan Keputusan) melatih pemahaman logika pemrograman dan komputasi JavaScript secara praktis.
- Seluruh kode program mematuhi standar ECMAScript murni dan dapat langsung dijalankan serta diuji di browser maupun CodePlayground.
- Pada modul berikutnya, kita akan melanjutkan penambahan kemampuan logika hingga aplikasi web interaktif utuh terselesaikan.
