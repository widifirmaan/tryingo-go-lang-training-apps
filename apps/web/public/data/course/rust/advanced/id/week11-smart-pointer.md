# Smart Pointer: Box, Rc, RefCell

> Kategori: Rust, Bahasa Pemrograman | Level: Lanjutan | Week 11

## Tujuan Pembelajaran

- Menggunakan Box<T> untuk alokasi heap
- Membuat tipe rekursif dengan Box
- Menerapkan Rc<T> untuk reference counting
- Menggunakan RefCell<T> untuk interior mutability
- Memahami trait Drop untuk cleanup

---

## Program: Manajemen Memori

```rust
use std::rc::Rc;
use std::cell::RefCell;

struct Node {
    nama: String,
    children: Vec<Rc<RefCell<Node>>>,
}

impl Node {
    fn baru(nama: &str) -> Rc<RefCell<Node>> {
        Rc::new(RefCell::new(Node {
            nama: String::from(nama),
            children: vec![],
        }))
    }

    fn tambah_anak(parent: &Rc<RefCell<Node>>, child: Rc<RefCell<Node>>) {
        parent.borrow_mut().children.push(child);
    }
}

fn main() {
    let root = Node::baru("root");
    let a = Node::baru("A");
    let b = Node::baru("B");

    Node::tambah_anak(&root, a);
    Node::tambah_anak(&root, b);

    println!("Jumlah anak node root: {}", root.borrow().children.len());
    println!("Reference count root: {}", Rc::strong_count(&root));

    let data = RefCell::new(42);
    *data.borrow_mut() += 10;
    println!("Nilai RefCell: {}", data.borrow());
}

impl Drop for Node {
    fn drop(&mut self) {
        println!("Drop node: {}", self.nama);
    }
}
```

Jalankan program di samping untuk melihat output. Kode ini mendemonstrasikan semua konsep minggu ini.

---

## Penjelasan

### Box<T>

`Box::new()` — alokasi heap. Esensial untuk tipe rekursif dan data besar. `Deref` trait memungkinkan penggunaan seperti referensi biasa.

### Rc<T>

`Rc` — Reference Counting untuk multiple ownership di single thread. `clone()` increment reference counter. `strong_count()` untuk melihat jumlah referensi.

### RefCell<T>

Interior mutability: mutasi melalui referensi immutable. `borrow()` dan `borrow_mut()` dengan runtime check. Panik jika aturan borrowing dilanggar di runtime.

### Drop

`Drop` trait — cleanup saat nilai keluar scope. `drop()` dipanggil otomatis. Berguna untuk resource management.

---

## Eksperimen

Coba modifikasi kode di samping:

1. **Tambah node** — tambahkan anak ketiga ke root tree
2. **RefCell vs Cell** — ubah `RefCell` jadi `Cell` dan lihat perbedaan API
3. **Tanpa Rc** — coba tanpa Rc (akan gagal karena multiple ownership)

---

## Tantangan

Buat binary tree sederhana: struct `Tree<T>` dengan method `insert` dan `contains`. Gunakan Box untuk node anak. Implementasi Drop trait yang mencetak pesan saat node di-drop.

---

## Ringkasan

Box<T> untuk heap allocation dan tipe rekursif. Rc<T> untuk reference counting (multiple ownership). RefCell<T> untuk interior mutability dengan runtime check. Drop trait untuk cleanup otomatis. Minggu depan: concurrency (thread, Arc, Mutex).
