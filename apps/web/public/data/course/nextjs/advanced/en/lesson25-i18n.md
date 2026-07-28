# Internationalization (i18n)

> Next.js | Advanced | Lesson 25

## Learning Objectives

- Set up i18n routing with middleware
- Create dictionary translations
- Use dynamic segments [locale]
- Handle RTL and local formats

---

## Program: Internationalization (i18n)

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

## Explanation

## i18n Routing
Use `app/[locale]/` + middleware for language detection. Middleware redirects based on Accept-Language header or cookie.

## Dictionary
Create `dictionaries/id.json` and `en.json` files. Import in Server Component based on params.locale. `const dict = await getDictionary(locale)`.

## Date & Number Format
Use `Intl.DateTimeFormat` and `Intl.NumberFormat` for local formatting. Don't hardcode date formats.

## RTL
For Arabic/Hebrew: add `dir="rtl"` to HTML. Use logical CSS properties (`margin-inline-start` instead of `margin-left`).

---

## Experiments

1. **i18n Routing**
2. **Dictionary**
3. **Date & Number Format**
4. **RTL**

---

## Challenge

Build a bilingual (ID/EN) website with i18n routing. Middleware for language detection. Dictionary for all text. Local date formatting.

---

## Summary

i18n routing with [locale] + middleware. JSON dictionary. Intl API for local formatting. RTL support with logical CSS.
