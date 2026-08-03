# Mail & Notifications

> Laravel | Auth & Middleware | Pelajaran 11

## Tujuan Pembelajaran

- Mengirim email transaksional dengan Mailable (envelope, content, view)
- Membuat Notification multi-channel: mail + database sekaligus
- Menyimpan dan membaca notifikasi database (unreadNotifications)
- Menulis email template Blade dengan data model

---

## Program: Mail & Notifications

```php
<?php

namespace App\Notifications;

use App\Models\Artikel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ArtikelDiterbitkan extends Notification
{
    use Queueable;

    public function __construct(public Artikel $artikel)
    {
    }

    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->greeting('Halo '.$notifiable->nama.'!')
            ->line('Artikel baru sudah terbit: '.$this->artikel->judul)
            ->action('Baca Artikel', url('/artikel/'.$this->artikel->id))
            ->line('Terima kasih sudah belajar bersama Tryngo.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'artikel_id' => $this->artikel->id,
            'judul' => $this->artikel->judul,
        ];
    }
}

```

---

## Penjelasan

## Dua Jalur Mengirim
Mail::to()->send(new ArtikelTerbitMailable($artikel)) = email PRIBADI satu kali (invoice, welcome). ->notify(new ArtikelDiterbitkan($artikel)) = notifikasi yang bisa punya BANYAK channel sekaligus. via() memutuskan channel: ['mail', 'database'] = dikirim ke keduanya. Bedanya: notification punya keabadian (database), email tidak.
## Mailable: Surat dengan Kontrak
envelope() = metadata (subject). content() = view yang dipakai. PHP 8: parameter constructor public Artikel $artikel otomatis jadi properti - tersedia langsung di view email. MAIL_MAILER=log: email "dikirim" ke log file - sempurna untuk development tanpa SMTP.
## Notification Database: Riwayat yang Bisa Dibaca
Channel 'database' menyimpan baris di tabel notifications (dibuat dari migration morphs: bisa dipakai user/penjual/admin apa pun). unreadNotifications = relasi bawaan Notifiable trait. data[] = array JSON yang bisa ditampilkan apa adanya di UI.
## Pola Pikir: Satu Kejadian, Banyak Pengirim
Terbit artikel -> email ke penulis + notifikasi database -> nanti bisa ditambah channel lain (WhatsApp, Slack) cukup menambah method di kelas notification yang sama. Satu kejadian domain, nol perubahan di controller.

---

## Eksperimen

1. **Dua Jalur Mengirim**
2. **Mailable: Surat dengan Kontrak**
3. **Notification Database: Riwayat yang Bisa Dibaca**
4. **Pola Pikir: Satu Kejadian, Banyak Pengirim**

---

## Tantangan

Bangun sistem notifikasi lengkap: (1) buat Mailable ArtikelDihapusMailable dan Notification ArtikelDihapus (mail+database) yang terkirim saat artikel dihapus, (2) tambah tombol "Tandai semua dibaca" (auth()->user()->unreadNotifications->markAsRead()), (3) tampilkan badge jumlah unread di navbar, (4) ganti MAIL_MAILER ke smtp dengan Mailtrap (gratis) dan isi MAIL_HOST/MAIL_USERNAME di .env - buktikan email benar-benar terkirim.

---

## Ringkasan

Mailable = email personal. Notification = banyak channel. Database channel = riwayat. Lanjut: file storage & uploads.
