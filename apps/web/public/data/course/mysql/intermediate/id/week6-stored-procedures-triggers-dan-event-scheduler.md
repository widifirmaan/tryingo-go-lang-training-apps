# Stored Procedures, Triggers & Event Scheduler

> **Kategori:** MySQL | **Level:** Konkurensi Transaksi, Replikasi & Skalabilitas Sharding | **Minggu 6:** Stored Procedures, Triggers & Event Scheduler

## Tujuan Pembelajaran

- Menguasai pemrograman prosedural MySQL dengan DELIMITER, variabel, dan handler kesalahan SQLEXCEPTION
- Membangun Trigger audit otomatis yang membandingkan nilai OLD dan NEW
- Mengimplementasikan Stored Procedure transaksi transfer dana dengan rollback otomatis
- Mengonfigurasi dan memonitor MySQL Event Scheduler untuk perawatan database otomatis

---

## Program: Sistem Maintenance Otomatis: Triggers Pembukuan dan Event Scheduler Purging

```sql
-- 1. Enable Event Scheduler in MySQL
SET GLOBAL event_scheduler = ON;

-- 2. Audit history table
CREATE TABLE wallet_balance_audit (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    wallet_id BIGINT UNSIGNED NOT NULL,
    old_balance DECIMAL(15, 2) NOT NULL,
    new_balance DECIMAL(15, 2) NOT NULL,
    changed_by VARCHAR(50) NOT NULL,
    changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- 3. Trigger tracking balance mutations automatically
DELIMITER $$
CREATE TRIGGER trg_wallet_balance_update
AFTER UPDATE ON user_wallets
FOR EACH ROW
BEGIN
    IF OLD.balance <> NEW.balance THEN
        INSERT INTO wallet_balance_audit (wallet_id, old_balance, new_balance, changed_by, changed_at)
        VALUES (NEW.id, OLD.balance, NEW.balance, CURRENT_USER(), NOW());
    END IF;
END$$
DELIMITER ;

-- 4. Stored Procedure with Transaction and SQLEXCEPTION Error Handler
DELIMITER $$
CREATE PROCEDURE sp_transfer_funds(
    IN p_sender_wallet_id BIGINT UNSIGNED,
    IN p_receiver_wallet_id BIGINT UNSIGNED,
    IN p_amount DECIMAL(15, 2),
    OUT p_status_code VARCHAR(20)
)
proc_body: BEGIN
    DECLARE v_sender_balance DECIMAL(15, 2);
    
    -- Error Handler: Automatically rollback on any SQL error
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_status_code = 'TRANSACTION_ERROR';
    END;

    IF p_amount <= 0 THEN
        SET p_status_code = 'INVALID_AMOUNT';
        LEAVE proc_body;
    END IF;

    START TRANSACTION;

    -- Lock sender wallet
    SELECT balance INTO v_sender_balance
    FROM user_wallets
    WHERE id = p_sender_wallet_id
    FOR UPDATE;

    IF v_sender_balance < p_amount THEN
        ROLLBACK;
        SET p_status_code = 'INSUFFICIENT_FUNDS';
        LEAVE proc_body;
    END IF;

    -- Debit sender
    UPDATE user_wallets 
    SET balance = balance - p_amount 
    WHERE id = p_sender_wallet_id;

    -- Credit receiver
    UPDATE user_wallets 
    SET balance = balance + p_amount 
    WHERE id = p_receiver_wallet_id;

    COMMIT;
    SET p_status_code = 'SUCCESS';
END$$
DELIMITER ;

-- 5. Automated Recurring Event Scheduler: Archive/Purge audit logs older than 90 days
DELIMITER $$
CREATE EVENT evt_purge_old_audit_logs
ON SCHEDULE EVERY 1 DAY
STARTS (CURRENT_TIMESTAMP + INTERVAL 1 HOUR)
DO
BEGIN
    DELETE FROM wallet_balance_audit
    WHERE changed_at < DATE_SUB(NOW(), INTERVAL 90 DAY);
END$$
DELIMITER ;
```

---

## Konsep Kunci

### Bahasa Prosedural MySQL dan Peran DELIMITER
Sintaks SQL standar menggunakan titik koma (`;`) sebagai akhir statement. Di dalam Stored Procedure atau Trigger yang terdiri dari banyak baris instruksi, parser MySQL akan salah mengartikan titik koma internal sebagai akhir dari seluruh blok. Perintah `DELIMITER $$` mengubah karakter pembatas perintah sementara menjadi `$$`, memungkinkan penulisan blok kode kompleks hingga dikembalikan ke `DELIMITER ;`.

### Penanganan Error dengan SQLEXCEPTION Handlers
Di dalam Stored Procedure enterprise, kegagalan di tengah proses tidak boleh meninggalkan data dalam kondisi setengah ter-update. Blok `DECLARE EXIT HANDLER FOR SQLEXCEPTION` bertindak seperti blok `catch` di bahasa pemrograman modern. Jika terjadi error constraint atau kegagalan query, handler otomatis menjalankan `ROLLBACK` dan mengembalikan kode status error yang bersih ke pemanggil.

### Otomasi dengan MySQL Event Scheduler
Alih-alih bergantung pada cron job Linux eksternal yang rentan putus koneksi jaringan, MySQL memiliki mesin penjadwal tugas bawaan: **Event Scheduler** (`SET GLOBAL event_scheduler = ON`). Event Scheduler mengeksekusi tugas pemeliharaan berkala langsung di dalam server database, seperti pembersihan data sementara (*purging*), agregasi data harian, dan rotasi partisi.

---

---

## Penjelasan untuk Pemula

Bayangkan Stored Procedure seperti mesin ATM. Anda tidak bisa menarik uang dari rekening A lalu kabur sebelum uang masuk ke rekening B. 

Mesin ATM memiliki mekanisme darurat (`SQLEXCEPTION HANDLER`): jika mesin macet atau kertas struk habis di tengah proses, seluruh proses transaksi langsung dibatalkan otomatis dan uang Anda tetap aman. Sedangkan Event Scheduler seperti alarm jam weker yang otomatis berbunyi setiap jam 2 pagi untuk menyapu sampah-sampah kertas struk yang sudah kedaluwarsa.

## Eksperimen

- Panggil procedure sp_transfer_funds dengan saldo pemicu INSUFFICIENT_FUNDS dan amati keluaran status code
- Lakukan update saldo secara manual dan verifikasi bahwa baris baru otomatis tercatat di wallet_balance_audit
- Inspeksi daftar event scheduler yang sedang aktif menggunakan query SHOW EVENTS
- Coba paksa error duplicate key di dalam procedure untuk menguji apakah EXIT HANDLER mengeksekusi ROLLBACK

---

## Tantangan

Kembangkan procedure `sp_transfer_funds` dengan menambahkan pencatatan entri debit dan kredit ke tabel `wallet_ledgers` secara atomic di dalam transaksi yang sama.

---

## Ringkasan

Anda telah menguasai logika server-side MySQL: Stored Procedures dengan exception handler, Triggers audit integritas, dan automasi penjadwalan dengan Event Scheduler.
