# WebSockets & Real-time

> **Kategori:** NestJS | **Level:** Advanced | **Minggu 10:** WebSockets & Real-time

## Learning Objectives

- WebSocketGateway decorator
- @SubscribeMessage for event handling
- @WebSocketServer for emitting
- Rooms and namespaces
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

## Key Concepts

### Gateway
WebSocket server setup.

### Events
Handle incoming events.

### Emit
Broadcast to clients.

### Rooms
Targeted messaging.

---

## Experiments

- Create room-based chat
- Implement typing indicator
- Add presence (online/offline status)
- Create real-time notification system

---

## Challenge

Build real-time chat app: rooms, typing indicators, presence, message history.

---

## Summary

Week 10 of 12: **WebSockets & Real-time** (Level: Advanced). Next week: **Microservices**.
