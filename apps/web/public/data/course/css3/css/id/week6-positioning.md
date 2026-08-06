# Positioning

> **Kategori:** CSS3 | **Level:** CSS3 Lengkap | **Minggu 6:** Positioning

## Tujuan Pembelajaran

- position: static, relative, absolute, fixed, sticky
- Kapan menggunakan relative vs absolute
- z-index untuk kontrol layering
- Sticky positioning untuk header yang mengikuti scroll
- Fixed positioning untuk elemen yang selalu terlihat

---

## Program: Layout Positioning

```html
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>CSS Positioning</title>
    <style>
        body { font-family: sans-serif; padding: 20px; }

        .position-demo {
            position: relative;
            height: 200px;
            background: #f5f5f5;
            border: 2px dashed #ccc;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .box {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            border-radius: 6px;
        }

        /* Static (default) */
        .static { background: #9e9e9e; }

        /* Relative */
        .relative {
            position: relative;
            background: #4CAF50;
            top: 20px;
            left: 20px;
        }

        /* Absolute */
        .absolute {
            position: absolute;
            background: #e74c3c;
            top: 10px;
            right: 10px;
        }

        /* Fixed */
        .fixed-note {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #2196F3;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            z-index: 1000;
        }

        /* Sticky */
        .sticky-header {
            position: sticky;
            top: 0;
            background: #2E5B44;
            color: white;
            padding: 15px;
            z-index: 100;
            border-radius: 8px 8px 0 0;
        }

        .sticky-container {
            height: 300px;
            overflow-y: auto;
            background: #e8f5e9;
            border-radius: 0 0 8px 8px;
        }

        .sticky-container p {
            padding: 10px 20px;
        }

        /* Z-index */
        .z-container { position: relative; height: 150px; }
        .z1 { position: absolute; top: 0; left: 0; background: #e74c3c; z-index: 1; }
        .z2 { position: absolute; top: 20px; left: 20px; background: #4CAF50; z-index: 2; }
        .z3 { position: absolute; top: 40px; left: 40px; background: #2196F3; z-index: 3; }
    </style>
</head>
<body>
    <h1>CSS Positioning</h1>

    <h2>Relative + Absolute</h2>
    <div class="position-demo">
        <div class="box static">Static</div>
        <div class="box relative">Relative</div>
        <div class="box absolute">Absolute</div>
    </div>

    <h2>Z-Index Layering</h2>
    <div class="z-container">
        <div class="box z1">z:1</div>
        <div class="box z2">z:2</div>
        <div class="box z3">z:3</div>
    </div>

    <h2>Sticky Header</h2>
    <div class="sticky-container">
        <div class="sticky-header">Sticky Header (scroll down)</div>
        <p>Paragraf 1 — scroll ke bawah...</p>
        <p>Paragraf 2 — scroll ke bawah...</p>
        <p>Paragraf 3 — scroll ke bawah...</p>
        <p>Paragraf 4 — scroll ke bawah...</p>
        <p>Paragraf 5 — scroll ke bawah...</p>
        <p>Paragraf 6 — scroll ke bawah...</p>
        <p>Paragraf 7 — scroll ke bawah...</p>
        <p>Paragraf 8 — scroll ke bawah...</p>
    </div>

    <div class="fixed-note">Fixed: Selalu terlihat!</div>
</body>
</html>
```

---

## Konsep Kunci

### Position Values
`static` default, `relative` offset dari posisi normal, `absolute` relatif ke ancestor terdekat yang positioned, `fixed` relatif ke viewport, `sticky` hybrid relative+fixed.

### Relative + Absolute
Parent `relative`, child `absolute` — child relatif ke parent, bukan viewport.

### Z-Index
Nilai lebih tinggi = lebih depan. Hanya bekerja pada elemen positioned.

### Sticky
`position: sticky; top: 0` — relative sampai scroll mencapai top:0, lalu fixed.

### Fixed
Selalu di viewport — tidak terpengaruh scroll.

---

## Eksperimen

- Buat tooltip dengan relative + absolute
- Coba z-index dengan stacking context
- Eksperimen sticky sidebar
- Buat modal overlay dengan fixed
- Coba position absolute tanpa relative parent

---

## Tantangan

Buat halaman dengan: fixed navbar, sticky section header, absolute positioned badge, dan modal overlay.

---

## Ringkasan

Minggu 6 dari 12: **Positioning** (Level: CSS3 Lengkap). Kontrol posisi. Minggu depan: **Responsive Design**.
