# Persistensi Relasional: Spring Data JPA, Hibernate 6 & Entity Auditing

> **Kategori:** Spring Boot & Java | **Level:** Pemula | **Minggu 3:** Persistensi Relasional: Spring Data JPA, Hibernate 6 & Entity Auditing

## Tujuan Pembelajaran

- Mengonfigurasi entitas relasional menggunakan spesifikasi Jakarta Persistence (JPA).
- Menggunakan Hibernate 6 sebagai engine ORM berkinerja tinggi di Spring Boot 3.
- Memanfaatkan Spring Data JPA Derived Query Methods (`findByAccountNumber`).
- Menulis kueri JPQL (Java Persistence Query Language) yang type-safe dan aman dari SQL Injection.

---

## Program: Entitas Rekening & Ledger Transaksi dengan Repositori Spring Data JPA

```java
package com.tryngo.banking.entity;

import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

// 1. Entitas Rekening Bank (JPA + Hibernate 6)
@Entity
@Table(name = "bank_accounts")
@EntityListeners(AuditingEntityListener.class)
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "account_number", unique = true, nullable = false, length = 32)
    private String accountNumber;

    @Column(name = "holder_name", nullable = false, length = 120)
    private String holderName;

    @Column(name = "balance", nullable = false, precision = 19, scale = 4)
    private BigDecimal balance;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    // Default constructor untuk JPA
    protected BankAccount() {}

    public BankAccount(String accountNumber, String holderName, BigDecimal initialBalance) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = initialBalance;
    }

    // Getters
    public Long getId() { return id; }
    public String getAccountNumber() { return accountNumber; }
    public String getHolderName() { return holderName; }
    public BigDecimal getBalance() { return balance; }
    public void setBalance(BigDecimal balance) { this.balance = balance; }
}

// 2. Spring Data JPA Repository
@Repository
public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {

    // Derived Query Method (Spring secara otomatis membuat SQL berdasarkan nama method)
    Optional<BankAccount> findByAccountNumber(String accountNumber);

    // Custom JPQL Query
    @Query("SELECT a FROM BankAccount a WHERE a.balance >= :minBalance ORDER BY a.balance DESC")
    List<BankAccount> findHighNetWorthAccounts(@Param("minBalance") BigDecimal minBalance);
}
```

---

## Konsep Kunci

Mengakses database dengan JDBC mentah memerlukan penulisan puluhan baris kode boilerplate untuk mapping ResultSet ke objek Java. Spring Data JPA menyederhanakan akses database secara dramatis.

### JPA Specification vs Hibernate Implementation
Jakarta Persistence (JPA) adalah antarmuka standar Java untuk memetakan objek ke tabel relasional. **Hibernate 6** adalah implementasi konkrit (ORM engine) bawaan di Spring Boot. Hibernate menerjemahkan anotasi seperti `@Entity`, `@Table`, dan `@Column` menjadi skema database SQL secara otomatis.

### Kekuatan Derived Query Methods
Dengan mendefinisikan interface `BankAccountRepository extends JpaRepository<BankAccount, Long>`, Spring Data JPA secara ajaib mengimplementasikan method CRUD dasar (`save`, `findById`, `delete`, `findAll`) saat aplikasi startup. Lebih dari itu, method bernama `findByAccountNumber(String acc)` secara otomatis diterjemahkan oleh Spring menjadi kueri SQL:
`SELECT * FROM bank_accounts WHERE account_number = ?`.

### Keamanan Moneter: Precision dan Scale
Dalam sistem perbankan, nilai moneter tidak boleh disimpan dengan tipe data `float` atau `double`. Kita menggunakan `@Column(precision = 19, scale = 4) BigDecimal balance` yang dipetakan ke tipe data `NUMERIC(19, 4)` di PostgreSQL/MySQL untuk menjamin akurasi desimal hingga 4 angka di belakang koma.


---

---

## Penjelasan untuk Pemula

Bayangkan Anda punya formulir pendaftaran nasabah fisik (Objek Java) dan ingin menyimpannya ke lemari arsip baja (Database SQL). JPA/Hibernate adalah petugas kearsipan cerdas yang langsung memfotokopi dan memasukkan formulir Anda ke map arsip yang tepat tanpa Anda perlu repot membuka laci lemari besi sendiri.

## Eksperimen

- Ubah konfigurasi database ke H2 in-memory di `application.properties` dan amati skema tabel yang digenerate Hibernate.
- Tambahkan kueri method `findByHolderNameContainingIgnoreCase(String name)` dan lakukan pengujian.
- Aktifkan `@EnableJpaAuditing` pada kelas konfigurasi dan amati nilai `createdAt` yang otomatis terisi.

---

## Tantangan

Tambahkan entitas relasi `@OneToMany List<TransactionRecord> transactions` pada `BankAccount` dengan opsi `CascadeType.ALL` dan `FetchType.LAZY`, lalu buat query repository untuk mengambil mutasi 30 hari terakhir.

---

## Ringkasan

Kamu telah menguasai JPA, Hibernate 6, dan Spring Data JPA Repositories. Minggu depan kita membangun REST Controllers dengan validasi Jakarta.
