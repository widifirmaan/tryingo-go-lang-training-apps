# Mail & Notifications

> Laravel | Auth & Middleware | Lesson 11

## Learning Objectives

- Send transactional emails with a Mailable (envelope, content, view)
- Build a multi-channel Notification: mail + database at once
- Store and read database notifications (unreadNotifications)
- Write Blade email templates with model data

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

## Explanation

## Two Delivery Paths
Mail::to()->send(new ArtikelTerbitMailable($artikel)) = a PERSONAL one-off email (invoice, welcome). ->notify(new ArtikelDiterbitkan($artikel)) = a notification that can have MANY channels at once. via() decides the channels: ['mail', 'database'] = sent through both. The difference: notifications have persistence (database), emails do not.
## Mailable: A Letter with a Contract
envelope() = metadata (subject). content() = which view to render. PHP 8: the public Artikel $artikel constructor parameter becomes a property automatically - available directly in the email view. MAIL_MAILER=log: emails are "sent" to a log file - perfect for development without SMTP.
## Database Notifications: Readable History
The 'database' channel stores a row in the notifications table (built by the migration with morphs: usable for users/vendors/admins alike). unreadNotifications = a built-in relation from the Notifiable trait. data[] = a JSON array you can render as-is in the UI.
## Mindset: One Event, Many Senders
Article published -> email to the author + database notification -> later add other channels (WhatsApp, Slack) by just adding a method to the same notification class. One domain event, zero controller changes.

---

## Experiments

1. **Two Delivery Paths**
2. **Mailable: A Letter with a Contract**
3. **Database Notifications: Readable History**
4. **Mindset: One Event, Many Senders**

---

## Challenge

Build a complete notification system: (1) create an ArtikelDihapusMailable and an ArtikelDihapus Notification (mail+database) sent when an article is deleted, (2) add a "Mark all as read" button (auth()->user()->unreadNotifications->markAsRead()), (3) show an unread-count badge in the navbar, (4) switch MAIL_MAILER to smtp with Mailtrap (free) and fill MAIL_HOST/MAIL_USERNAME in .env - prove the email really sends.

---

## Summary

Mailables = personal emails. Notifications = many channels. Database channel = history. Next: file storage & uploads.
