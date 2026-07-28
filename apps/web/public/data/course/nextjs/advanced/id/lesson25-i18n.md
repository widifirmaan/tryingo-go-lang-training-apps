# Internationalisasi (i18n)

> Next.js | Lanjutan | Pelajaran 25

## Tujuan Pembelajaran

- Mengatur i18n routing dengan middleware
- Membuat dictionary translations
- Menggunakan dynamic segments [locale]
- Mengelola RTL dan format lokal

---

## Program: Internationalisasi (i18n)

```tsx
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const locales = ['id', 'en'];
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(l => pathname.startsWith('/' + l));
  if (hasLocale) return NextResponse.next();
  const locale = request.headers.get('accept-language')?.startsWith('id') ? 'id' : 'en';
  return NextResponse.redirect(new URL('/' + locale + pathname, request.url));
}
export const config = { matcher: ['/((?!api|_next|.*\..*).*)'] };
```

---

## Penjelasan

## i18n Routing
Gunakan `app/[locale]/` + middleware untuk deteksi bahasa. Middleware redirect berdasarkan Accept-Language header atau cookie.

## Dictionary
Buat file `dictionaries/id.json` dan `en.json`. Import di Server Component berdasarkan params.locale. `const dict = await getDictionary(locale)`.

## Date & Number Format
Gunakan `Intl.DateTimeFormat` dan `Intl.NumberFormat` untuk format lokal. Jangan hardcode format tanggal.

## RTL
Untuk bahasa Arab/Ibrani: tambahkan `dir="rtl"` di HTML. Gunakan logical CSS properties (`margin-inline-start` bukan `margin-left`).

---

## Eksperimen

1. **i18n Routing**
2. **Dictionary**
3. **Date & Number Format**
4. **RTL**

---

## Tantangan

Buat website bilingual (ID/EN) dengan i18n routing. Middleware deteksi bahasa. Dictionary untuk semua teks. Format tanggal lokal.

---

## Ringkasan

i18n routing dengan [locale] + middleware. Dictionary JSON. Intl API untuk format lokal. RTL support dengan logical CSS.
