# Capstone: E-Commerce API — Spring Shop Grand Opening

> **Kategori:** Spring Boot | **Level:** Advanced | **Minggu 14:** Capstone: E-Commerce API

## Learning Objectives

- Combine W1-W13: `JPA` racks + `Security` guards + `REST` doors + `Cache` drawer + `Actuator` panel + `Docker` box into 1 online store

---

## Why This Matters (Non-IT)

13 separate weeks — capstone proves the combined product: list → login → order → pay → notify. Your "production-ready Spring" portfolio for jobs.

---

## Program: Complete Spring Store (Capstone Checklist)

Combined structure of all weeks:
```
src/main/java/com/shop/
  ShopApplication.java     (W1: @SpringBootApplication + @EnableCaching + @EnableScheduling + @EnableAsync)
  products/ (W4: Entity + Repo + W3: Controller + W5: DTO)
  security/ (W6: SecurityConfig)
  orders/ (W10: Event + Async)
  reports/ (W12: @Scheduled)
```

Required features (check 1 by 1):
- [ ] `GET /api/v1/products` + `POST` (W3+W5) + `validation` (W8)
- [ ] `SecurityConfig` `/admin` login (W6) + green `test` (W7)
- [ ] `@Cacheable` list (W11) + `/actuator/health` UP (W9)
- [ ] `Dockerfile` + `docker run` (W13) + `Railway` deploy
- [ ] `README.md` how-to-run + screenshot

```bash
./mvnw test          # all green?
./mvnw package       # jar done?
docker build -t shop:1.0 . && docker run -p 8080:8080 shop:1.0
curl localhost:8080/actuator/health  # {"status":"UP"}?
```

**Capstone task:** Public deploy + 2-min video (list → login → order → health check) + `README`.

---

## Key Concepts

### Capstone = Combine 13 Weeks
Racks + guards + doors + drawer + panel + box = 1 store.

---

## Beginner Friendly Explanation

### Analogy: Mall Grand Opening
- **W1-W5 foundation** (building, racks), **W6-W10 engine** (guards, messages), **W11-W13 finishing** (drawer, box), **W14 = open mall**.

### Step 0 — Prepare Device
- JDK 17 + built project + deploy target ready.

### How the Computer Reads It
1. Checklist top-to-bottom → production Spring store.
2. Public URL + video → portfolio done.

### 3 Must-Know Terms
1. **Capstone/deploy/README**: combine/open/guide

---

## Experiments

- **Green:** All checklist items pass?
- **Yellow:** `/actuator/health` DOWN → which component? Fix.
- **Red:** Untested deploy → hidden bug? Test first.

---

## Challenge

**Grand Opening:** All-green checklist + public URL + video. **Spring 0→Expert DONE!** 🎉

---

## Mini Glossary

- **Capstone/deploy**: combine/open

---

## Summary

Week 14 of 14: **Grand Opening** (Level: Advanced). **Spring 0→Expert from zero DONE!** 🎉
