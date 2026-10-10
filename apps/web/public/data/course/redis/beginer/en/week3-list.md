# Lists

> **Kategori:** Redis | **Level:** Beginner | **Minggu 3:** Lists

## Learning Objectives

- LPUSH, RPUSH, LPOP, RPOP
- LRANGE to view lists
- BLPOP for blocking queues
- LINSERT and LTRIM
- LREM and LINDEX

---

## Program: Redis List Operations

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

## Key Concepts

### Lists
Linked lists. For queues and stacks.

### LPUSH & RPUSH
Add to left or right.

### BLPOP
Blocking pop: wait until data available.

### LTRIM
Trim list to range.

### LREM
Remove elements by value.

---

## Experiments

- Stack with lists
- Reliable queue with BRPOPLPUSH
- Capped lists with LTRIM
- Lists vs Streams

---

## Challenge

Message queue: producer-consumer with lists.

---

## Summary

Week 3 of 10: **Lists** (Beginner).
