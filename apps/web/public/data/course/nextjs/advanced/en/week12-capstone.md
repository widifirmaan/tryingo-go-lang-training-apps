# Capstone: SaaS App

> **Kategori:** Next.js | **Level:** Advanced | **Minggu 12:** Capstone: SaaS App

## Learning Objectives

- Combine all concepts: routing, data fetching, server actions, auth
- SaaS architecture: multi-tenant, role-based access
- Payment integration (Stripe simulation)
- Admin panel with role-based access
- Production-ready: monitoring, error handling, SEO

---

## Program: Course Platform

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

## Key Concepts

### Architecture
Full-stack Next.js: App Router + Prisma + NextAuth.

### SaaS Pattern
Multi-tenant with role-based access.

### Payments
Stripe for subscriptions and payments.

### Production
Monitoring, error tracking, SEO, performance.

---

## Experiments

- Add payment integration
- Create admin dashboard
- Implement progress tracking
- Add search and filter courses

---

## Challenge

Build a complete SaaS app: course platform with auth, payments, admin panel, progress tracking. Deploy to Vercel.

---

## Summary

Week 12 of 12: **Capstone: SaaS App** (Level: Advanced). Complete! 🎉 You've mastered Next.js from scratch to production-ready.
