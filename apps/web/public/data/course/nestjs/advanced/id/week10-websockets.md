# WebSockets & Real-time

> **Kategori:** NestJS | **Level:** Lanjutan | **Minggu 10:** WebSockets & Real-time

## Tujuan Pembelajaran

- WebSocketGateway decorator
- @SubscribeMessage untuk handle events
- @WebSocketServer untuk emit
- Rooms dan namespaces
- Real-time patterns: chat, notifications, live updates

---

## Program: Chat Gateway

```javascript
import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private users = new Map<string, string>();

  handleConnection(client: Socket) {
    console.log('Client connected: ' + client.id);
  }

  handleDisconnect(client: Socket) {
    this.users.delete(client.id);
    console.log('Client disconnected: ' + client.id);
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { username: string }, @ConnectedSocket() client: Socket) {
    this.users.set(client.id, data.username);
    this.server.emit('message', { system: true, text: data.username + ' joined' });
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { text: string }, @ConnectedSocket() client: Socket) {
    const username = this.users.get(client.id) || 'Anonymous';
    this.server.emit('message', { username, text: data.text, time: new Date() });
  }
}

console.log('NestJS WebSockets:');
console.log('');
console.log('=== Gateway Setup ===');
console.log('@WebSocketGateway({ cors: { origin: "*" } })');
console.log('export class ChatGateway {');
console.log('  @WebSocketServer() server: Server');
console.log('}');
console.log('');
console.log('=== Events ===');
console.log("@SubscribeMessage('join')");
console.log("@SubscribeMessage('message')");
console.log("@SubscribeMessage('typing')");
console.log('');
console.log('=== Emit ===');
console.log('this.server.emit("message", data)  // all clients');
console.log('client.broadcast.emit("message", data)  // except sender');
console.log('client.emit("message", data)  // only sender');
console.log('');
console.log('=== Client (Browser) ===');
console.log("const socket = io('http://localhost:3000')");
console.log("socket.emit('join', { username: 'Budi' })");
console.log("socket.on('message', (data) => console.log(data))");
```

---

## Konsep Kunci

### Gateway
@WebSocketGateway() untuk create WebSocket server.

### Events
@SubscribeMessage('event') untuk handle incoming events.

### Emit
this.server.emit() untuk broadcast ke semua client.

### Rooms
client.join('room1'), this.server.to('room1').emit() untuk targeted emit.

---

## Eksperimen

- Buat room-based chat (multiple rooms)
- Implementasikan typing indicator
- Tambah presence (online/offline status)
- Buat real-time notification system

---

## Tantangan

Buat real-time chat app: rooms, typing indicators, presence, message history.

---

## Ringkasan

Minggu 10 dari 12: **WebSockets & Real-time** (Level: Lanjutan). Minggu depan: **Microservices**.
