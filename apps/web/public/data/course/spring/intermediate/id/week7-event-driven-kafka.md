# Arsitektur Event-Driven: Spring for Apache Kafka & Audit Streaming

> **Kategori:** Spring Boot & Java | **Level:** Menengah | **Minggu 7:** Arsitektur Event-Driven: Spring for Apache Kafka & Audit Streaming
> ⏱️ **Estimasi Belajar:** 45 Menit (15m teori, 30m praktik) | 🔗 **Tingkat:** Terstruktur (Step-by-step)


## Tujuan Pembelajaran

- Memahami konsep dasar Apache Kafka: Topics, Partitions, Consumer Groups, dan Offsets.
- Menggunakan `KafkaTemplate` untuk mempublikasikan event domain secara non-blocking.
- Menerapkan partition keying untuk menjamin urutan event (Ordering Guarantee) per nasabah.
- Mengonsumsi event secara asinkron menggunakan `@KafkaListener` dengan penanganan Dead Letter Topic (DLT).

---

## Program: Publikasi Event Mutasi & Konsumen Deteksi Fraud dengan Kafka

```java
package com.tryngo.banking.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;

@Configuration
class KafkaTopicConfig {
    @Bean
    public NewTopic transactionsTopic() {
        return TopicBuilder.name("banking.transactions.v1")
            .partitions(3)
            .replicas(1)
            .build();
    }
}

// 1. Produsen Event: Menerbitkan event mutasi ke Kafka
@Service
public class TransactionEventProducer {

    private final KafkaTemplate<String, TransactionAuditMessage> kafkaTemplate;

    public TransactionEventProducer(KafkaTemplate<String, TransactionAuditMessage> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishTransactionEvent(String txId, String fromAcc, String toAcc, BigDecimal amount) {
        var message = new TransactionAuditMessage(txId, fromAcc, toAcc, amount, Instant.now());
        
        // Gunakan fromAcc sebagai Kafka Partition Key agar mutasi akun yang sama selalu masuk ke partisi yang sama
        kafkaTemplate.send("banking.transactions.v1", fromAcc, message)
            .whenComplete((result, ex) -> {
                if (ex == null) {
                    System.out.printf("[KAFKA SENT] Tx %s published to Partition %d with Offset %d%n",
                        txId, result.getRecordMetadata().partition(), result.getRecordMetadata().offset());
                } else {
                    System.err.println("[KAFKA ERROR] Failed to publish audit event: " + ex.getMessage());
                }
            });
    }
}

// 2. Konsumen Event: Deteksi Fraud & Anti-Pencucian Uang (AML)
@Service
class FraudDetectionConsumer {

    @KafkaListener(topics = "banking.transactions.v1", groupId = "fraud-detection-group")
    public void evaluateFraud(TransactionAuditMessage event) {
        System.out.println("[FRAUD CONSUMER] Analyzing transaction: " + event.transactionId());
        
        if (event.amount().compareTo(new BigDecimal("50000000.00")) >= 0) {
            System.err.printf("[FRAUD ALERT] High-risk transaction detected! Tx: %s | Amount: Rp %,.2f%n",
                event.transactionId(), event.amount());
        } else {
            System.out.println("[FRAUD CLEARED] Transaction passed safety heuristics.");
        }
    }
}

public record TransactionAuditMessage(
    String transactionId,
    String fromAccount,
    String toAccount,
    BigDecimal amount,
    Instant timestamp
) {}
```

---

## Konsep Kunci

Dalam arsitektur perbankan modern, mutasi transfer uang tidak boleh menunggu sistem audit, pelaporan pajak, dan sistem anti-fraud selesai memeriksa transaksi. Seluruh sistem downstream harus dihubungkan secara asinkron melalui **Apache Kafka**.

### Mengapa Apache Kafka?
Kafka adalah distributed commit log berkecepatan tinggi yang mampu menangani jutaan event per detik. Tidak seperti message broker tradisional (RabbitMQ), Kafka menyimpan event secara persisten di disk, memungkinkan konsumen membaca ulang pesan lama (Event Replay) jika terjadi audit forensik.

### Pentingnya Partition Key
Sebuah topik Kafka dibagi menjadi beberapa **Partitions** untuk memungkinkan pemrosesan paralel. Kafka menjamin urutan pesan (Strict Ordering) hanya di dalam satu partisi yang sama. Dengan menggunakan nomor rekening (`fromAcc`) sebagai partition key, seluruh transaksi dari rekening tersebut dijamin selalu masuk ke partisi yang sama dan diproses secara berurutan.

### Consumer Groups dan Skalabilitas
Dengan mendefinisikan `groupId = "fraud-detection-group"`, beberapa instance service fraud detection dapat berbagi beban pembacaan partisi secara otomatis. Jika satu instance mati, Kafka secara otomatis melakukan Rebalance ke instance yang masih hidup tanpa kehilangan data.


---

---

## Penjelasan untuk Pemula

Bayangkan kantor pos pusat dengan banyak loket (Kafka Partitions). Surat untuk kota Bandung selalu masuk ke loket 1, surat untuk Surabaya masuk ke loket 2 (Partition Key). Tim kurir di Surabaya (Consumer Group) bisa membawa dan mengantarkan surat-surat tersebut secara bersamaan tanpa saling mengganggu kurir di Bandung.

## Eksperimen

- Jalankan Kafka lokal via Docker Compose dan kirim 10 pesan dengan partition key berbeda.
- Amati di terminal bagaimana pesan didistribusikan ke partisi 0, 1, dan 2 secara merata.
- Konfigurasikan Dead Letter Topic (DLT) untuk menampung pesan yang gagal didecode oleh consumer.

---

## Tantangan

Buat konfigurasi `ConcurrentKafkaListenerContainerFactory` dengan `SeekToCurrentErrorHandler` yang mencoba membaca ulang pesan yang error sebanyak 3 kali dengan interval 2 detik sebelum mengirimnya ke topik `.DLT`.

---

## Model Mental & Diagram Alur Visual

```diagram
┌──────────────┐     Call Stack Kosong?      ┌────────────────┐
│  CALL STACK  │ ◄─────────────────────────  │   EVENT LOOP   │
│ (Sync Code)  │                             │  (Pemeriksa)   │
└──────┬───────┘                             └───────▲────────┘
       │ Operasi Async (Fetch / Timer)               │
       ▼                                             │
┌──────────────┐                             ┌───────┴────────┐
│  WEB APIs    │ ─── Callback Selesai ────►  │ TASK / PROMISE │
│  (Background)│                             │     QUEUE      │
└──────────────┘                             └────────────────┘
```

---

## Panduan Sintaks & Referensi Lengkap (W3Schools Style)

Berikut adalah rincian sintaks, parameter, nilai kembalian, dan contoh penggunaan praktis yang diperkenalkan pada modul ini:

### 1. `var x int / x := 42`
- **Fungsi Utama:** Deklarasi variabel statis dan deklarasi pendek (Short Declaration).
- **Parameter / Atribut:** `Identifier, Type / Value`.
- **Perilaku & Efek Sistem:** `:=` menginferensi tipe data secara otomatis di dalam fungsi; `var` digunakan untuk deklarasi paket atau nilai default.
- **Contoh Penggunaan Praktis:**
```javascript
age := 25
name := "Alex Iskandar"
fmt.Printf("%s berusia %d tahun
", name, age);
```
- **Hasil Output yang Diharapkan:**
```text
Alex Iskandar berusia 25 tahun
```

### 2. `func (r Receiver) Method() ReturnType`
- **Fungsi Utama:** Penerapan Method pada Struct (OOP ala Go).
- **Parameter / Atribut:** `Receiver (value/pointer), Parameters`.
- **Perilaku & Efek Sistem:** Menghubungkan fungsi khusus ke tipe struct untuk membentuk perilaku objek tanpa class inheritance hierarki.
- **Contoh Penggunaan Praktis:**
```javascript
type User struct { Name string }
func (u User) Greet() string {
  return "Halo, " + u.Name
}
```
- **Hasil Output yang Diharapkan:**
```text
Mengembalikan string sapaan personal
```

### 3. `go func() { ... }()`
- **Fungsi Utama:** Eksekusi thread ringan konkuren (Goroutine).
- **Parameter / Atribut:** `Fungsi anonim / fungsi bernama`.
- **Perilaku & Efek Sistem:** Menjalankan komputasi di thread runtime Go yang sangat ringan (hanya ~2KB memori awal).
- **Contoh Penggunaan Praktis:**
```javascript
go func() {
  fmt.Println("Berjalan konkuren di goroutine terpisah!")
}()
```
- **Hasil Output yang Diharapkan:**
```text
Dieksekusi asinkron tanpa memblokir alur utama program
```

### 4. `ch := make(chan string); ch <- val; val := <-ch`
- **Fungsi Utama:** Saluran komunikasi antar goroutine (Channel).
- **Parameter / Atribut:** `Tipe data channel, kapasitas buffer`.
- **Perilaku & Efek Sistem:** Mengirim dan menerima data antar goroutine dengan sinkronisasi bawaan tanpa perlu lock/mutex manual.
- **Contoh Penggunaan Praktis:**
```javascript
ch := make(chan int)
go func() { ch <- 100 }()
result := <-ch
fmt.Println("Diterima:", result);
```
- **Hasil Output yang Diharapkan:**
```text
Diterima: 100
```


---

## Jebakan Umum & Debugging (Common Pitfalls)

### 1. Circular Dependency antar Service Bean
- **Gejala / Masalah:** Aplikasi Spring Boot gagal start dengan pesan `BeanCurrentlyInCreationException`.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Rancang ulang arsitektur menggunakan mediator pattern, atau gunakan `@Lazy` sebagai solusi transisi.

### 2. Transaksi Database Tidak Berjalan pada Panggilan Internal
- **Gejala / Masalah:** Anotasi `@Transactional` diabaikan saat dipanggil dari method dalam class yang sama.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Pahami bahwa Spring bekerja melalui AOP Proxy; panggil method transaksional melalui bean terinjeksi.

### 3. N+1 Query Problem pada JPA Hibernate
- **Gejala / Masalah:** Database menerima ratusan query SQL individual saat mengambil entitas relasi.
- **Penyebab Utama:** Logika atau asumsi yang sering keliru pada tahap awal implementasi.
- **Solusi Tepat:** Gunakan `JOIN FETCH` pada JPQL query atau tentukan `@EntityGraph` pada repository interface.

---

## Ringkasan

Kamu telah menguasai arsitektur event-driven dengan Apache Kafka. Level 2 selesai! Di Level 3 kita menaklukkan Virtual Threads, Resilience4j, dan Proyek Capstone.
