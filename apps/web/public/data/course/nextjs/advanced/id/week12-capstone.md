# Capstone: SaaS App

> **Kategori:** Next.js | **Level:** Lanjutan | **Minggu 12:** Capstone: SaaS App

## Tujuan Pembelajaran

- Menggabungkan semua konsep: routing, data fetching, server actions, auth
- SaaS architecture: multi-tenant, role-based access
- Payment integration (Stripe simulasi)
- Admin panel dengan role-based access
- Production-ready: monitoring, error handling, SEO

---

## Program: Platform Kursus

```jsx
// Capstone: SaaS Course Platform
// Menggabungkan semua konsep Next.js

// ── Architecture ──
// - Next.js App Router
// - Prisma + PostgreSQL
// - NextAuth (Google + Credentials)
// - Server Actions untuk mutations
// - Stripe untuk payments (simulasi)
// - Vercel deployment

// ── Database Schema ──
// model User { id, email, name, role, courses[] }
// model Course { id, title, description, price, lessons[] }
// model Lesson { id, title, content, courseId, order }
// model Enrollment { id, userId, courseId, progress }

// ── Routes ──
// / = Landing page
// /courses = Course catalog
// /courses/[id] = Course detail
// /learn/[id] = Learning interface
// /dashboard = User dashboard
// /admin = Admin panel (role-based)

// ── app/page.js (Landing) ──
export default function LandingPage() {
  const features = [
    { title: "Interactive Learning", desc: "Belajar dengan coding langsung" },
    { title: "Progress Tracking", desc: "Pantau kemajuan belajar" },
    { title: "Certificate", desc: "Dapatkan sertifikat setelah selesai" },
  ];

  return (
    <div>
      <section className="hero">
        <h1>Tryngo — Belajar Coding dari Nol</h1>
        <p>Platform pembelajaran coding interaktif</p>
        <a href="/courses">Mulai Belajar</a>
      </section>
      <section className="features">
        {features.map((f, i) => (
          <div key={i}>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

// ── Server Action: Enroll Course ──
// "use server";
// export async function enrollCourse(courseId) {
//   const session = await getServerSession();
//   if (!session) throw new Error("Unauthorized");
//   await prisma.enrollment.create({
//     data: { userId: session.user.id, courseId, progress: 0 },
//   });
//   revalidatePath("/dashboard");
// }

console.log("SaaS Course Platform siap digunakan!");
```

---

## Konsep Kunci

### Architecture
Full-stack Next.js: App Router + Prisma + NextAuth.

### SaaS Pattern
Multi-tenant: user punya data sendiri. Role: admin, user.

### Payments
Stripe: subscription, one-time payment, webhook.

### Production
Monitoring, error tracking, SEO, performance.

---

## Eksperimen

- Tambah payment integration
- Buat admin dashboard
- Implementasikan progress tracking
- Tambah search dan filter courses

---

## Tantangan

Buat SaaS app lengkap: course platform dengan auth, payments, admin panel, progress tracking. Deploy ke Vercel.

---

## Ringkasan

Minggu 12 dari 12: **Capstone: SaaS App** (Level: Lanjutan). Selesai! 🎉 Anda sudah menguasai Next.js dari nol hingga production-ready.
