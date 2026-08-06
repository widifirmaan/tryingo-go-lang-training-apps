# List

> **Kategori:** Redis | **Level:** Pemula | **Minggu 3:** List

## Tujuan Pembelajaran

- LPUSH, RPUSH, LPOP, RPOP
- LRANGE untuk lihat list
- BLPOP untuk blocking queue
- LINSERT dan LTRIM
- LREM dan LINDEX

---

## Program: Operasi List Redis

```shell
# List: antrian/linkded list
LPUSH antrian:tasks "task1" "task2" "task3"
RPUSH antrian:tasks "task4" "task5"

# Lihat list
LRANGE antrian:tasks 0 -1

# Pop dari kiri (dequeue)
LPOP antrian:tasks

# Pop dari kanan
RPOP antrian:tasks

# Panjang list
LLEN antrian:tasks

# Blok sampai ada data (untuk queue)
BLPOP antrian:tasks 30  # Tunggu 30 detik

# Insert sebelum/sesudah
RPUSH mylist "a" "b" "c"
LINSERT mylist BEFORE "b" "x"
LRANGE mylist 0 -1

# Trim list
LTRIM mylist 0 2

# Set nilai by index
LSET mylist 0 "z"

# Remove element
RPUSH mylist "a" "b" "a" "c" "a"
LREM mylist 1 "a"  # Hapus 1 occurrence "a"

# Index of element
LINDEX mylist 0
```

---

## Konsep Kunci

### List
Linked list. Bisa untuk antrian dan stack.

### LPUSH & RPUSH
Tambah ke kiri atau kanan.

### BLPOP
Blocking pop: tunggu sampai ada data.

### LTRIM
Potong list ke range tertentu.

### LREM
Hapus element by value.

---

## Eksperimen

- Implementasi stack dengan list
- Reliable queue dengan BRPOPLPUSH
- Capped list dengan LTRIM
- List vs Stream

---

## Tantangan

Message queue: producer-consumer dengan list.

---

## Ringkasan

Minggu 3 dari 10: **List** (Pemula).
