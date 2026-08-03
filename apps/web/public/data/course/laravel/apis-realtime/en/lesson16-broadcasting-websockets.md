# Broadcasting & WebSockets

> Laravel | APIs & Real-time | Lesson 16

## Learning Objectives

- Understand the broadcast vs polling pattern for real-time data
- Create a ShouldBroadcast Event with a channel and broadcastAs
- Run the Reverb WebSocket server and the Laravel Echo client
- Choose public vs private/presence channels

---

## Program: Broadcasting & WebSockets

```php
<?php

namespace App\Events;

use App\Models\Pesanan;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class PesananBaru implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Pesanan $pesanan)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel('pesanan')];
    }

    public function broadcastAs(): string
    {
        return 'pesanan.baru';
    }
}

```

---

## Explanation

## Real-time: Two Approaches
Polling = the client asks every 5 seconds (wasteful, late). WebSockets = a permanent connection, the server PUSHES when something happens (instant, efficient). Laravel broadcasting = the layer that lets your app push without knowing the protocol: Reverb locally, Pusher/Soketi in production.
## Event: ShouldBroadcast
class PesananBaru implements ShouldBroadcast = "this occurrence must be broadcast". broadcastOn() = the destination channel (Channel('pesanan') = public). broadcastAs() = the client-side event name ('.pesanan.baru' with a dot = don't add the default namespace). dispatch() from the controller = broadcast to every channel listener.
## Server & Client
Server: php artisan reverb:start (a Laravel-native WebSocket server, Pusher-compatible protocol). Client: Laravel Echo + pusher.js in the browser. Echo.channel('pesanan').listen('.pesanan.baru', cb) - the callback fires EVERY time the event publishes, no refresh needed.
## Choosing a Channel
Channel = public (Channel). PrivateChannel = authorized users only (routes/channels.php: the auth callback). PresenceChannel = private + a live list of who is online. Start public, move to private as soon as personal data is involved.

---

## Experiments

1. **Real-time: Two Approaches**
2. **Event: ShouldBroadcast**
3. **Server & Client**
4. **Choosing a Channel**

---

## Challenge

Build deeper real-time: (1) switch to a PrivateChannel pesanan.{user} - add routes/channels.php with an auth callback that verifies the user, and Echo.private('pesanan.' + userId) on the client, (2) build a presence channel with an "X people viewing the panel" counter (Echo.join('presensi.panel')), (3) add a terkirim_at column to pesanans and fire a second PesananDiproses event 5 seconds later (delayed via queue), (4) README: explain deployment differences - Reverb on your own server vs managed Pusher.

---

## Summary

Broadcast = server push, not polling. Reverb = server, Echo = client. Public vs private channels. Next: PHPUnit testing.
