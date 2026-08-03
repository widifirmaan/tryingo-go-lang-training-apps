# WebSockets: Real-time Chat

> NestJS | Production & Capstone | Lesson 14

## Learning Objectives

- Explain WebSocket vs HTTP (two-way vs one-way)
- Write a gateway with @WebSocketGateway
- Handle events with @SubscribeMessage
- Broadcast in real time to all clients

---

## Program: WebSockets: Real-time Chat

```ts
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// Gateway: endpoint WebSocket - komunikasi dua arah & realtime
@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server; // server Socket.IO, bisa broadcast ke semua client

  handleConnection(client: Socket) {
    console.log(`Client terhubung: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client terputus: ${client.id}`);
  }

  @SubscribeMessage('kirimPesan')
  kirimPesan(@MessageBody() pesan: string): void {
    // broadcast ke SEMUA client yang terhubung
    this.server.emit('pesanBaru', {
      dari: 'server',
      pesan,
      waktu: new Date().toISOString(),
    });
  }
}
```

---

## Explanation

## WebSocket vs HTTP: Why Two-Way Matters
HTTP: the client asks, the server answers, done - the server CANNOT reach out first. Chat, notifications, and live dashboards need push: the server must send as soon as something happens. WebSocket = a TCP connection that stays open, two-way, low latency. Socket.IO (behind @nestjs/websockets) adds resilience (auto-reconnect, rooms, broadcast).
## Gateways: WebSocket as a Nest Provider
ChatGateway is registered as a regular provider (in ChatModule) - but with decorators it becomes a WebSocket endpoint. @WebSocketServer() injects the Socket.IO server instance. handleConnection/handleDisconnect = lifecycle: who joined/left. Gateways can also inject other services - sharing business logic with HTTP (e.g., saving messages to a database).
## @SubscribeMessage: Events the Client Sends
The client sends socket.emit('kirimPesan', 'halo') → the server runs kirimPesan(@MessageBody() pesan). The server then broadcasts: server.emit('pesanBaru', data) to ALL clients - each client listens with socket.on('pesanBaru', ...). This is the classic chat pattern; for private chat there are rooms (client.join('ruangA') + server.to('ruangA').emit(...)).
## When WebSocket, When REST
REST for request-response (CRUD, authentication). WebSocket for data that CHANGES without being asked: chat, collaboration, notifications, live tracking, games. Real apps use BOTH: REST for the API, WebSocket for the real-time stream - like a chat with history (REST) plus new messages (WS).

---

## Experiments

1. **WebSocket vs HTTP: Why Two-Way Matters**
2. **Gateways: WebSocket as a Nest Provider**
3. **@SubscribeMessage: Events the Client Sends**
4. **When WebSocket, When REST**

---

## Challenge

Extend the chat: (1) add rooms: a joinRuang event (client.join) and kirimPesanKeRuang broadcasting to one room (server.to(ruang).emit), (2) have the server welcome a new user with a selamatDatang event to THAT client only (client.emit, not server.emit), (3) integrate JwtAuthGuard: verify the token on connection (gateway guard via APP_GUARD or manual validation in handleConnection), (4) show the online client count in the UI (an event with server.engine.clientsCount).

---

## Summary

WebSocket = two-way, realtime. Gateways = decorated providers. Broadcast & rooms. REST + WS side by side. Next: Docker & CI/CD.
