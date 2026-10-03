# Action Controller: Strong Parameters, Flash Alerts & Alur RESTful

> **Kategori:** Ruby on Rails 8 | **Level:** Pemula | **Minggu 3:** Action Controller: Strong Parameters, Flash Alerts & Alur RESTful
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Menguasai 7 aksi RESTful standar di Rails: `index`, `show`, `new`, `create`, `edit`, `update`, `destroy`.
- Mengamankan controller dari serangan Mass Assignment menggunakan **Strong Parameters** (`require` dan `permit`).
- Menggunakan lifecycle filter `before_action` untuk prinsip DRY (Don't Repeat Yourself).
- Memahami status HTTP semantik (`:unprocessable_entity`, `:see_other`) yang wajib untuk integrasi Hotwire Turbo.

---

## Program: Controller Manajemen Tugas RESTful dengan Proteksi Strong Parameters

```ruby
# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  before_action :set_project, only: [:create]
  before_action :set_task, only: [:update, :destroy]

  # POST /projects/:project_id/tasks
  def create
    @task = @project.tasks.build(task_params)

    if @task.save
      redirect_to @project, notice: "Tugas '#{@task.title}' berhasil ditambahkan ke papan proyek!"
    else
      # Kembalikan HTTP 422 Unprocessable Entity untuk kompatibilitas Hotwire Turbo
      render "projects/show", status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/:id
  def update
    if @task.update(task_params)
      redirect_to @task.project, notice: "Status tugas berhasil diperbarui."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/:id
  def destroy
    project = @task.project
    @task.destroy
    redirect_to project, notice: "Tugas berhasil dihapus.", status: :see_other
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_task
    @task = Task.find(params[:id])
  end

  # Strong Parameters: Whitelist atribut untuk mematikan celah Mass Assignment Attack
  def task_params
    params.require(:task).permit(:title, :status, :priority, :due_date, :assignee_id)
  end
end

puts "=== ACTION CONTROLLER WITH STRONG PARAMETERS INITIALIZED ==="
```

---

## Konsep Kunci

Di masa awal Rails, pengguna dapat mengirimkan form dan langsung menyimpannya dengan `User.create(params[:user])`. Ini memicu celah fatal **Mass Assignment**: peretas cukup menyisipkan input tersembunyi `admin=true` pada form pendaftaran untuk mengangkat dirinya menjadi Super Administrator.

### Pertahanan Mutlak: Strong Parameters
Rails Action Controller mewajibkan penggunaan **Strong Parameters**:
`params.require(:task).permit(:title, :status, :priority)`
Hanya atribut yang secara eksplisit dicantumkan di dalam method `.permit()` yang diizinkan masuk ke database. Jika ada atribut liar yang dikirimkan, Rails membuangnya secara otomatis.

### Pentingnya HTTP Status Codes untuk Turbo
Ketika validasi form gagal, controller harus mengembalikan status `status: :unprocessable_entity` (HTTP 422). Jika controller hanya mengembalikan 200 biasa, Hotwire Turbo di browser tidak akan merespons dan form error tidak akan muncul di layar pengguna. Begitu pula saat menghapus data (`destroy`), status `:see_other` (HTTP 303) wajib digunakan untuk redirect yang mulus.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda memesan paket makanan lewat ojek online. Strong Parameters seperti petugas kasir yang memeriksa daftar pesanan Anda: jika Anda diam-diam menyelipkan tulisan pensil "Bonus Emas Batangan Gratis", kasir mencoret tulisan pensil tersebut dan hanya memasukkan makanan yang sah ke dalam kantong kresek Anda.

## Eksperimen

- Kirim payload POST dengan atribut `is_admin: true` dan amati bahwa atribut tersebut dibuang oleh Strong Parameters.
- Hapus opsi `status: :unprocessable_entity` saat validasi gagal dan perhatikan mengapa form error tidak muncul di Hotwire.
- Gunakan flash alert `flash.now[:alert]` untuk pesan kesalahan yang hanya berlaku pada render saat ini.

---

## Tantangan

Buat nested strong parameters yang mengizinkan pembuatan sebuah Task sekaligus melampirkan beberapa file dokumen attachment menggunakan Active Storage (`permit(:title, documents: [])`).

---

## Ringkasan Sintaks & Quick Reference

| Perintah / Sintaks | Fungsi & Contoh Praktik |
| :--- | :--- |
| **Deklarasi & Inisialisasi** | Menyiapkan variabel, tipe data, atau struktur komponen awal |
| **Logika & Pemrosesan** | Menjalankan algoritma, kontrol alur, dan transformasi data |
| **Error Handling & Validasi** | Memastikan input valid dan menangani kegagalan sistem secara elegan |
| **Return / Output** | Mengembalikan hasil komputasi yang siap dikonsumsi pengguna/sistem |

---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. N+1 Queries pada Active Record
- **Gejala / Masalah:** Me-render tampilan tabel memicu puluhan query SQL tambahan yang memperlambat respon.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method `includes(:relation)` pada controller query untuk melakukan eager loading.

### 2. Migrasi Database yang Mengubah Kolom Tanpa Reversibility
- **Gejala / Masalah:** Perintah `rails db:rollback` gagal dieksekusi saat proses deployment dibatalkan.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan method migrasi eksplisit `up` dan `down` jika operasi kolom tidak dapat dibalik secara otomatis.

### 3. Menyimpan Credential Sensitif di Direktori Publik
- **Gejala / Masalah:** API key pihak ketiga bocor ke publik melalui repositori git.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Manfaatkan sistem enkripsi `rails credentials:edit` untuk menyimpan API key produksi.

---

## Ringkasan

Kamu telah menguasai Action Controller, Strong Parameters, dan HTTP Status Codes untuk Turbo. Minggu depan kita mempelajari Hotwire Turbo Drive dan Turbo Frames.
