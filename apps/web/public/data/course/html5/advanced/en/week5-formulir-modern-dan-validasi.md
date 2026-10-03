# Modern Forms: Input Types, Labeling & Native Validation

> **Kategori:** HTML5 | **Level:** Modern Forms, Accessibility & Web APIs | **Minggu 5:** Modern Forms: Input Types, Labeling & Native Validation

## Learning Objectives

- Explicitly pair <label> and <input> controls using matching for and id attributes
- Group related input clusters cleanly using <fieldset> and titled by <legend>
- Leverage rich HTML5 input specialized types: email, number, date, and inputmode
- Enforce native browser constraint validation: required, minlength, pattern (RegEx), min, and max
- Implement autocomplete attributes to optimize user experience during autofill operations

---

## Program: Enterprise Client Onboarding Form with Native Constraints

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registrasi Rekanan Bisnis — Nusa Digital</title>
</head>
<body>
  <main>
    <article>
      <h1>Pendaftaran Rekanan Bisnis Enterprise</h1>
      <p>Silakan isi formulir di bawah ini. Tanda bintang (<span aria-hidden="true">*</span>) menandakan kolom wajib.</p>

      <form action="/api/v1/partners" method="POST" novalidate>
        <fieldset>
          <legend>Informasi Perusahaan</legend>

          <p>
            <label for="company-name">Nama Legal Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="text" id="company-name" name="companyName" required minlength="3" maxlength="100" placeholder="PT Contoh Teknologi Nusantara" autocomplete="organization">
          </p>

          <p>
            <label for="work-email">Alamat Email Resmi Perusahaan: <span aria-hidden="true">*</span></label><br>
            <input type="email" id="work-email" name="workEmail" required placeholder="admin@perusahaan.co.id" autocomplete="email">
          </p>

          <p>
            <label for="tax-id">Nomor Pokok Wajib Pajak (16 Digit Angka): <span aria-hidden="true">*</span></label><br>
            <input type="text" id="tax-id" name="taxId" required pattern="\d{16}" title="NPWP harus terdiri dari tepat 16 digit angka tanpa spasi atau tanda titik." placeholder="1234567890123456" inputmode="numeric">
          </p>
        </fieldset>

        <fieldset>
          <legend>Kebutuhan Layanan & Skala Tim</legend>

          <p>
            <label for="team-size">Jumlah Pengguna Sistem:</label><br>
            <input type="number" id="team-size" name="teamSize" min="1" max="10000" value="10">
          </p>

          <p>
            <label for="target-date">Target Tanggal Peluncuran Sistem:</label><br>
            <input type="date" id="target-date" name="targetDate" min="2026-01-01">
          </p>

          <p>
            <label for="service-tier">Paket Layanan Prioritas:</label><br>
            <select id="service-tier" name="serviceTier" required>
              <option value="">-- Pilih Paket Layanan --</option>
              <option value="standard">Standard Cloud Instance</option>
              <option value="enterprise" selected>Enterprise Dedicated Cluster</option>
              <option value="custom">Bespoke Hybrid Architecture</option>
            </select>
          </p>

          <p>
            <label for="notes">Catatan Spesifikasi Tambahan:</label><br>
            <textarea id="notes" name="notes" rows="4" cols="50" placeholder="Tuliskan kebutuhan khusus infrastruktur Anda..."></textarea>
          </p>

          <p>
            <input type="checkbox" id="terms" name="agreeTerms" required>
            <label for="terms">Saya menyetujui Perjanjian Kerahasiaan (NDA) dan Kebijakan Privasi Data.</label>
          </p>
        </fieldset>

        <p>
          <button type="submit">Kirim Berkas Pendaftaran</button>
          <button type="reset">Bersihkan Formulir</button>
        </p>
      </form>
    </article>
  </main>
</body>
</html>
```

---

## Key Concepts

### Mandatory Pairing: Label and ID
Never render form fields without an explicit `<label>`. Associating `<label for="email">` with `<input id="email">` achieves two critical UX goals:
1. Clicking the text label focuses the designated input field immediately.
2. Assistive screen readers announce the exact field prompt upon entry.

### Fieldset & Legend Grouping
The `<fieldset>` element establishes logical enclosures between distinct form sections (e.g. "Identity" vs "Billing"), while `<legend>` provides the header read aloud whenever focus enters that subset.

### Native Constraint Validation
Modern browsers enforce validation rules without client-side JavaScript overhead:
- `required`: Blocks submission if the control is empty.
- `pattern="\d{16}"`: Enforces exact Regular Expression matching rules (e.g. exactly 16 digits).
- `min` & `max`: Constrains boundaries on numeric and calendar controls.
- `inputmode="numeric"`: Triggers virtual numeric keyboards on mobile devices.

---

---

## Beginner Friendly Explanation

### Analogy: A Passport Application Office
1. **`<label>`** is the printed instruction on the form: "LEGAL FULL NAME". Without labels, users face ambiguous blank boxes.
2. **`id` and `for`** create the invisible binding wire connecting the prompt to the physical box.
3. **`<fieldset>`** is the bordered grouping labeled "SECTION II: TRAVEL HISTORY".
4. **`required`** is the border officer returning your paperwork immediately if a mandatory starred line was left empty.

## Experiments

- Delete the for attribute on a label, click the text label in browser, and note the loss of automatic input focus.
- Attempt to submit the form without filling required inputs to witness native browser validation tooltip popups.
- Type 15 digits into the NPWP input and observe how the pattern="\d{16}" constraint halts submission with a mismatch message.
- Open the page in DevTools mobile simulation mode and click the numeric input to verify that a numeric pad is invoked.

---

## Challenge

Build a "Flight Reservation Form": include an identity fieldset (full name, 8-character passport, email), a flight itinerary fieldset (origin, destination via `<select>`, departure `type="date"`), a baggage agreement checkbox, and a submit button.

---

## Summary

You have mastered accessible interactive form design and client-side constraint validation. Next week, we dive into WCAG 2.1 AA accessibility standards and ARIA semantics.
